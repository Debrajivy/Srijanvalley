import { ArrowRight, CalendarDays, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const ADMISSION_FORM_EVENT = 'open-admission-form';
const POPUP_DELAY_MS = 15_000;
const POPUP_AUTO_CLOSE_MS = 8_000;

const AdmissionTicker = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [hasPopupShown, setHasPopupShown] = useState(false);

  const openAdmissionForm = useCallback(() => {
    setIsPopupVisible(false);
    window.dispatchEvent(new Event(ADMISSION_FORM_EVENT));
  }, []);

  useEffect(() => {
    let removeScrollListener: (() => void) | undefined;

    const delayTimer = window.setTimeout(() => {
      const showPopupOnScroll = () => {
        setIsPopupVisible(true);
        setHasPopupShown(true);
        window.removeEventListener('scroll', showPopupOnScroll);
      };

      window.addEventListener('scroll', showPopupOnScroll, { passive: true });
      removeScrollListener = () => window.removeEventListener('scroll', showPopupOnScroll);
    }, POPUP_DELAY_MS);

    return () => {
      window.clearTimeout(delayTimer);
      removeScrollListener?.();
    };
  }, []);

  useEffect(() => {
    if (!isPopupVisible) return;

    const autoCloseTimer = window.setTimeout(
      () => setIsPopupVisible(false),
      POPUP_AUTO_CLOSE_MS,
    );

    return () => window.clearTimeout(autoCloseTimer);
  }, [isPopupVisible]);

  return (
    <>
      <section
        aria-labelledby="admission-heading"
        className="relative overflow-hidden bg-gradient-to-r from-orange-700 via-orange-600 to-amber-500 px-4 py-8 text-white shadow-lg sm:px-6 lg:px-8"
      >
        <div className="absolute -left-16 -top-20 h-52 w-52 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-amber-300/20" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row md:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur-sm">
              <CalendarDays className="h-7 w-7" aria-hidden="true" />
            </div>
            <div>
              <p className="mb-1 text-sm font-bold uppercase tracking-[0.2em] text-orange-100">
                Enrolment now open
              </p>
              <h2 id="admission-heading" className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                Admission Open for the Session 2027–28
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={openAdmissionForm}
            className="group inline-flex min-w-44 items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-orange-700 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
          >
            Apply Now
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </section>

      {isPopupVisible && hasPopupShown && (
        <aside
          role="dialog"
          aria-modal="false"
          aria-labelledby="admission-popup-heading"
          className="admission-popup fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:mx-0"
        >
          <div className="h-1.5 bg-gradient-to-r from-orange-700 via-orange-500 to-amber-400" />
          <div className="relative p-5 pr-14 sm:p-6 sm:pr-16">
            <button
              type="button"
              onClick={() => setIsPopupVisible(false)}
              aria-label="Close admission notice"
              className="absolute right-3 top-3 rounded-full p-2 text-gray-500 transition hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
              Enrolment now open
            </p>
            <h2 id="admission-popup-heading" className="mt-1 text-xl font-extrabold text-gray-900 sm:text-2xl">
              Admission Open for the Session 2027–28
            </h2>
            <button
              type="button"
              onClick={openAdmissionForm}
              className="group mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 font-bold text-white shadow-md transition hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
            >
              Apply Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
};

export default AdmissionTicker;
