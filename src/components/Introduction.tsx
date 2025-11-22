"use client";

import { motion } from "framer-motion";

export default function Introduction() {
    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-10"
                >
                    <h2 className="text-base font-bold tracking-[0.3em] text-gray-500 uppercase" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                        A Message from Deven Spear
                    </h2>

                    <div className="space-y-8">
                        <p className="text-4xl md:text-5xl font-bold leading-tight text-gray-900" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>
                            "If you feel like the world is updating faster than you can download the patch, you're not crazy—you're finally seeing the code."
                        </p>

                        <p className="text-2xl text-gray-700 leading-relaxed" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                            We're crossing a historical threshold where two massive forces are colliding: a <span className="font-bold text-gray-900">Technological Singularity</span> and an <span className="font-bold text-gray-900">Economic Singularity</span>. AI agents, robotics, blockchains, synthetic biology, and new financial rails aren't just "emerging tech" anymore—they're rewiring how we work, trade, govern, and even define what it means to be human.
                        </p>

                        <p className="text-2xl text-gray-700 leading-relaxed" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                            As a kid, I was obsessed with <span className="font-bold text-gray-900">Star Trek</span>—Gene Roddenberry's wild bet that humanity could grow beyond scarcity, fear, and petty conflict. Star Trek is one of the reasons I became a futurist. It taught me that the future isn't something that just happens to us; it's something we architect.
                        </p>

                        <p className="text-2xl text-gray-700 leading-relaxed" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                            Now, for the first time, we're watching pieces of that Star Trek reality materialize in real time: conversational computers, universal translators, replicator-style manufacturing, planetary networks of intelligence. The gap between sci‑fi and product roadmap is collapsing.
                        </p>

                        <p className="text-2xl text-gray-700 leading-relaxed" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                            I started <span className="font-bold text-gray-900">Convergence 2030</span> because most leaders and citizens still underestimate the speed and violence of this shift. We're moving from the <span className="font-bold text-gray-900">age of tools</span> to the <span className="font-bold text-gray-900">age of agents and autonomous systems</span>—and the decisions we make between now and 2030 will determine who thrives, who gets automated, and what kind of civilization we become.
                        </p>

                        <p className="text-2xl text-gray-700 leading-relaxed" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                            For years I've tracked these waves through my work in AI, blockchain, robotics, and my Disruption Weekly research. This project is my attempt to give you a clear, grounded briefing on what's coming—and how to position yourself on the right side of the curve.
                        </p>

                        <p className="text-2xl text-gray-700 leading-relaxed border-l-4 border-gray-400 pl-8 italic bg-gray-100 py-6 rounded-r-lg" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                            Working with a network of futurists, founders, Silicon Valley insiders, and global economic analysts, I've synthesized one highly probable scenario for the world between now and 2030. Don't read this to be afraid. Read it to be awake, aligned, and prepared to build the kind of future Star Trek promised—on purpose, not by accident.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
