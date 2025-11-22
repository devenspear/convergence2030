"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[110vh] bg-gradient-to-b from-white to-gray-50">
            <div className="sticky top-0 flex flex-col h-screen overflow-hidden pt-44">
                {/* Sticky Top Left Heading */}
                <div className="absolute left-8 md:left-16 top-12 z-20 pointer-events-none">
                    <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-4" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>
                        A DAY IN THE LIFE
                    </h2>
                    <p className="text-lg text-gray-600 font-medium mb-6" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                        Scroll to witness the evolution →
                    </p>
                </div>

                {/* Scrolling Cards */}
                <motion.div style={{ x }} className="flex gap-8 pl-8 md:pl-16 pr-8">
                    {timeline.map((item, index) => (
                        <div
                            key={index}
                            className="relative min-h-[400px] h-[400px] w-[85vw] md:w-[450px] flex-shrink-0 rounded-2xl bg-white p-8 border border-gray-200 shadow-lg flex flex-col"
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
                </motion.div>
            </div>
        </section>
    );
}
