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
        <section ref={targetRef} className="relative h-[300vh] bg-gradient-to-b from-white to-gray-50">
            <div className="sticky top-0 flex h-screen items-start overflow-hidden pt-8">
                {/* Sticky Top Left Heading */}
                <div className="absolute left-8 md:left-16 top-8 z-20 pointer-events-none">
                    <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-3" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>
                        A DAY IN THE LIFE
                    </h2>
                    <p className="text-lg text-gray-600 font-medium" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                        Scroll to witness the evolution →
                    </p>
                </div>

                {/* Scrolling Cards */}
                <motion.div style={{ x }} className="flex gap-8 pl-8 md:pl-16 pr-8 items-center h-full pt-20">
                    {timeline.map((item, index) => (
                        <div
                            key={index}
                            className="relative h-auto w-[85vw] md:w-[450px] flex-shrink-0 rounded-2xl bg-white p-8 border border-gray-200 shadow-lg"
                        >
                            {/* Year at top with corner fold */}
                            <div className="relative">
                                <div className="absolute -top-8 -right-8 w-16 h-16 bg-gray-200 transform rotate-45 origin-bottom-left"></div>
                                <span className="text-7xl font-black text-gray-200 block mb-4" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>
                                    {item.year}
                                </span>
                            </div>

                            {/* Content below year */}
                            <h3 className="text-3xl font-black mb-2 text-gray-900 tracking-tight" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>
                                {item.title}
                            </h3>
                            <p className="text-lg text-gray-600 mb-6 font-bold" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                                {item.vibe}
                            </p>

                            <ul className="space-y-3">
                                {item.details.map((detail, i) => (
                                    <li key={i} className="flex items-start gap-3 text-base text-gray-700" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full flex-shrink-0 mt-2" />
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
