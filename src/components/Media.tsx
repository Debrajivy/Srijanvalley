import { useState } from "react";
import { Maximize, Newspaper, X } from "lucide-react";
import pressImage from "../assets/media.webp";
import m1 from "../assets/m1.webp";
import m2 from "../assets/m2.webp";
import m3 from "../assets/m3.webp";
import m4 from "../assets/m4.webp";
import new1 from "../assets/new1.jpeg";
import new2 from "../assets/new2.jpeg";
import new3 from "../assets/new3.jpeg";
import Db from "../assets/Db.jpeg";
import Dj from "../assets/Dj.jpeg";
import Hindusthan from "../assets/Hindusthan.jpeg";
import Db1 from "../assets/Dv1.jpeg";
import Dj1 from "../assets/Dj1.jpeg";
import aaj from "../assets/aajj.jpeg";
import djj from "../assets/djj.jpeg";
import pk from "../assets/pk.jpeg";
import news1 from "../assets/news1.jpeg";
import news2 from "../assets/news2.jpeg";
import news3 from "../assets/news3.jpeg";
import news4 from "../assets/news4.jpeg";
import news5 from "../assets/news5.jpeg";
import news6 from "../assets/news6.jpeg";

const pressCoverage = [
    { image: pressImage, publication: "Dainik Bhaskar Feature" },
    { image: m1, publication: "School Infrastructure Feature" },
    { image: m2, publication: "Academic Excellence Recognition" },
    { image: m3, publication: "Co-curricular Activities Coverage" },
    { image: m4, publication: "Community Engagement Events" },
    { image: new1, publication: "Dainik Jagran" },
    { image: new2, publication: "Prabhat Khabar" },
    { image: new3, publication: "Dainik Bhaskar" },
    { image: Db, publication: "Dainik Bhaskar" },
    { image: Dj, publication: "Dainik Jagran" },
    { image: Hindusthan, publication: "Hindusthan" },
    { image: Db1, publication: "Dainik Bhaskar" },
    { image: Dj1, publication: "Dainik Jagran" },
    { image: aaj, publication: "Aaj News" },
    { image: djj, publication: "Dainik Jagran" },
    { image: pk, publication: "Prabhat Khabar" },
    { image: news1, publication: "Dainik Bhaskar" },
    { image: news2, publication: "Hindusthan" },
    { image: news3, publication: "Birsa Bani Samvad Data" },
    { image: news4, publication: "Loktantra Samvad Data" },
    { image: news5, publication: "Aaj" },
    { image: news6, publication: "Divya Dinkar News" },
];

const Media = () => {
    const [selected, setSelected] = useState<(typeof pressCoverage)[number] | null>(null);

    return (
        <section id="media" className="bg-gray-50 py-14 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="mx-auto mb-10 max-w-3xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-bold uppercase tracking-widest text-[#d2530f]">
                        <Newspaper className="h-4 w-4" />
                        In the news
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        Press <span className="text-[#d2530f]">Coverage</span>
                    </h2>
                    <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
                        Srijan Valley School’s parent-teacher meeting and student art exhibition featured across leading local newspapers.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {pressCoverage.map((item) => (
                        <button
                            key={`${item.publication}-${item.image}`}
                            type="button"
                            onClick={() => setSelected(item)}
                            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                            aria-label={`Open ${item.publication} press clipping`}
                        >
                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                <img src={item.image} alt={`${item.publication} coverage of Srijan Valley School`} className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]" />
                                <span className="absolute right-3 top-3 rounded-full bg-black/65 p-2 text-white opacity-0 transition group-hover:opacity-100">
                                    <Maximize className="h-4 w-4" />
                                </span>
                            </div>
                            <div className="border-t border-gray-100 p-4 text-center">
                                <h3 className="text-lg font-bold text-gray-900">{item.publication}</h3>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#d2530f]">Press Coverage</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {selected && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-3 sm:p-6" onClick={() => setSelected(null)}>
                    <div className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white" onClick={(event) => event.stopPropagation()}>
                        <div className="flex items-center justify-between border-b px-4 py-3">
                            <h3 className="font-bold text-gray-900">{selected.publication}</h3>
                            <button type="button" onClick={() => setSelected(null)} className="rounded-full p-2 text-gray-600 hover:bg-gray-100" aria-label="Close image">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="min-h-0 flex-1 overflow-auto bg-gray-900 p-2">
                            <img src={selected.image} alt={`${selected.publication} press clipping`} className="mx-auto max-h-[85vh] max-w-full object-contain" />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Media;
