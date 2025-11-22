"use client";

import { motion } from "framer-motion";
import { Brain, Server, Zap } from "lucide-react";

const drivers = [
    {
        title: "The Intelligence Explosion",
        icon: Brain,
        description: "AGI by 2027 based on 'Orders of Magnitude' math. (Source: Leopold Aschenbrenner).",
    },
    {
        title: "Project Stargate",
        icon: Server,
        description: "The $100 Billion supercomputer being built by Microsoft/OpenAI.",
    },
    {
        title: "The Energy Wall",
        icon: Zap,
        description: "Why data centers will consume more power than the steel industry, driving a nuclear renaissance.",
    },
];

export default function Drivers() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10 max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-6xl font-black mb-4 text-gray-900 tracking-tight uppercase" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>THE DRIVERS (2025-2027)</h2>
                    <p className="text-2xl text-gray-600 font-medium" style={{fontFamily: 'var(--font-inter), sans-serif'}}>We Are Building a New Species of Intelligence</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {drivers.map((driver, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-bl-full transition-transform group-hover:scale-150" />

                            <driver.icon className="w-12 h-12 mb-6 text-gray-700 relative z-10" strokeWidth={1.5} />

                            <h3 className="text-2xl font-black mb-4 text-gray-900 relative z-10" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>{driver.title}</h3>
                            <p className="text-base text-gray-600 leading-relaxed relative z-10" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                                {driver.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
