"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, Coins } from "lucide-react";

const impacts = [
    {
        title: "The Death of the Junior",
        icon: Briefcase,
        description: "Why entry-level white-collar jobs are vanishing first.",
    },
    {
        title: "The 'AI Shepherd'",
        icon: Users,
        description: "The new career path—managing swarms of agents rather than doing the work.",
    },
    {
        title: "Universal Basic Compute",
        icon: Coins,
        description: "The proposed economic solution to replace wages with owned compute assets.",
    },
];

export default function Impact() {
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #9ca3af 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <div className="text-center mb-10 max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight text-gray-900/80 uppercase" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>THE IMPACT</h2>
                    <p className="text-2xl text-gray-600 font-medium" style={{fontFamily: 'var(--font-inter), sans-serif'}}>The End of Labor as We Know It</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {impacts.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="flex flex-col items-start gap-4 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all border border-gray-200"
                        >
                            <div className="p-3 bg-gray-100 rounded-lg">
                                <item.icon className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black mb-3 text-gray-900" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>{item.title}</h3>
                                <p className="text-base text-gray-600 leading-relaxed" style={{fontFamily: 'var(--font-inter), sans-serif'}}>{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
