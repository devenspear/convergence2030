"use client";

import { motion } from "framer-motion";

const scenarios = [
    {
        title: "The Gentle Singularity",
        probability: "30%",
        description: "Abundance, Fusion, Health. (Sam Altman's view)",
    },
    {
        title: "The Turbulent Displacement",
        probability: "50%",
        description: "Inequality, Unrest, Digital Feudalism. (Emad Mostaque's warning)",
    },
    {
        title: "The Stalled Engine",
        probability: "20%",
        description: "Stagnation, Tech Bubble Burst. (Gary Marcus's view)",
    },
];

export default function Scenarios() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10 max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-6xl font-black mb-4 text-gray-900 tracking-tight uppercase" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>SCENARIOS: CHOOSE YOUR FUTURE</h2>
                    <p className="text-2xl text-gray-600 font-medium" style={{fontFamily: 'var(--font-inter), sans-serif'}}>Three possible paths forward</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {scenarios.map((scenario, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative p-8 rounded-2xl border border-gray-200 overflow-hidden group hover:shadow-lg transition-all bg-white"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-black max-w-[70%] text-gray-900" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>{scenario.title}</h3>
                                <span className="text-4xl font-black text-gray-500" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>{scenario.probability}</span>
                            </div>

                            <p className="text-base text-gray-600 leading-relaxed" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                                {scenario.description}
                            </p>

                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-100 rounded-tl-full" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
