"use client";

const timeline = [
    {
        year: "2026",
        title: "THE SILENT FREEZE",
        vibe: "Anxiety and Friction",
        details: [
            "Junior hiring freezes",
            "GPT-5 automates slide decks",
            "AI News feeds curate reality",
            "AI Tutors replace humans"
        ]
    },
    {
        year: "2027",
        title: "THE PHYSICAL BREACH",
        vibe: "The screen barrier breaks",
        details: [
            "You are now an 'AI Shepherd'",
            "Smart Glasses replace phones",
            "Robots deliver packages",
            "AI scans detect disease instantly"
        ]
    },
    {
        year: "2028",
        title: "THE ENERGY PIVOT",
        vibe: "Power is the new gold",
        details: [
            "Stargate supercomputer online",
            "Splinternet blocks China",
            "Machines trade with machines",
            "Banking automated by agents"
        ]
    },
    {
        year: "2029",
        title: "BIOLOGICAL RENAISSANCE",
        vibe: "Immortality vs. Obsolescence",
        details: [
            "Daily longevity cocktails",
            "Biological age reversal",
            "Gig work verifying humanity",
            "eVTOLs replace Uber Black"
        ]
    },
    {
        year: "2030",
        title: "THE NEW OPERATING SYSTEM",
        vibe: "Radical Abundance",
        details: [
            "Cost of living collapses",
            "Work is optional",
            "Sovereign Personal AI earns for you",
            "Society bifurcates"
        ]
    }
];

export default function DayInLife() {
    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10 max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-4 uppercase" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>
                        A DAY IN THE LIFE
                    </h2>
                    <p className="text-2xl text-gray-600 font-medium" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                        Scroll horizontally to witness the evolution
                    </p>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="overflow-x-auto pb-6 -mx-6 px-6">
                    <div className="flex gap-8 w-max">
                        {timeline.map((item, index) => (
                            <div
                                key={index}
                                className="relative h-[400px] w-[450px] flex-shrink-0 rounded-2xl bg-white p-8 border border-gray-200 shadow-lg flex flex-col"
                            >
                                {/* Year at top */}
                                <div className="relative mb-4">
                                    <span className="text-6xl font-black text-gray-200 block leading-none" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>
                                        {item.year}
                                    </span>
                                </div>

                                {/* Content below year */}
                                <h3 className="text-2xl font-black mb-2 text-gray-900 tracking-tight leading-tight" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>
                                    {item.title}
                                </h3>
                                <p className="text-base text-gray-600 mb-4 font-bold" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                                    {item.vibe}
                                </p>

                                <ul className="space-y-2 flex-grow">
                                    {item.details.map((detail, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                                            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full flex-shrink-0 mt-1.5" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
