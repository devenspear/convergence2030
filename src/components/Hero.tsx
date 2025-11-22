"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-white">
            {/* Background Image with Dark Overlay */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <Image
                    src="/hero.jpg"
                    alt="Convergence 2030"
                    fill
                    className="object-cover scale-105"
                    priority
                />
                {/* Dark overlay to make image darker */}
                <div className="absolute inset-0 bg-black/70" />

                {/* Very pronounced radial ripple effect from center - much more visible */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 50%)',
                        mixBlendMode: 'overlay',
                    }}
                    animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.5, 0.9, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(100,180,255,0.3) 0%, transparent 40%)',
                        mixBlendMode: 'screen',
                    }}
                    animate={{
                        scale: [1, 2.2, 1],
                        opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                    }}
                />

                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(150,200,255,0.25) 0%, transparent 30%)',
                        mixBlendMode: 'overlay',
                    }}
                    animate={{
                        scale: [1, 3, 1],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.6,
                    }}
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tighter mb-8 text-white uppercase leading-none px-4" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>
                        CONVERGENCE
                        <br />
                        2030
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-12"
                >
                    <div className="inline-block backdrop-blur-sm bg-white/10 px-6 md:px-10 py-4 md:py-6 rounded-full border border-white/30 shadow-2xl max-w-4xl mx-4">
                        <p className="text-lg md:text-2xl font-medium text-white tracking-wide" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                            A Strategic Roadmap for the Next 5 Years of Human History
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Animated Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold tracking-widest uppercase text-white" style={{fontFamily: 'var(--font-inter), sans-serif'}}>Scroll</span>
                    <div className="w-[1px] h-16 bg-white/50 overflow-hidden">
                        <motion.div
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="w-full h-1/2 bg-white"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
