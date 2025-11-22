"use client";

import { motion } from "framer-motion";
import { Activity, EyeOff } from "lucide-react";

export default function Metamorphosis() {
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-300 rounded-full blur-3xl opacity-30" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-10 max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-6xl font-black mb-4 text-gray-900/80 tracking-tight uppercase" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>BIOLOGY & TRUTH</h2>
                    <p className="text-2xl text-gray-600 font-medium" style={{fontFamily: 'var(--font-inter), sans-serif'}}>Living Longer in a Fractured Reality</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-2xl relative overflow-hidden group shadow-lg border border-gray-200"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Activity className="w-12 h-12 text-gray-700 mb-6 relative z-10" strokeWidth={1.5} />
                        <h4 className="text-3xl font-black mb-4 text-gray-900 relative z-10" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>Longevity Escape Velocity</h4>
                        <p className="text-base text-gray-600 leading-relaxed relative z-10" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                            Science adding &gt;1 year of life for every year lived by 2030. The beginning of the end of aging.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 rounded-2xl relative overflow-hidden group shadow-lg border border-gray-200"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <EyeOff className="w-12 h-12 text-gray-700 mb-6 relative z-10" strokeWidth={1.5} />
                        <h4 className="text-3xl font-black mb-4 text-gray-900 relative z-10" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>Epistemic Fragmentation</h4>
                        <p className="text-base text-gray-600 leading-relaxed relative z-10" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                            The end of "Shared Truth" as AI customizes your reality bubble. We will live in different worlds.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
