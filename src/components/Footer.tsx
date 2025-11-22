"use client";

import { ArrowRight, Download } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-white to-gray-100 py-16 border-t border-gray-200">
            <div className="container mx-auto px-6 text-center max-w-5xl">
                <h2 className="text-5xl md:text-6xl font-black mb-12 tracking-tight text-gray-900" style={{fontFamily: 'var(--font-work-sans), sans-serif'}}>
                    Don't Just Watch. <span className="text-gray-600">Prepare.</span>
                </h2>

                <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
                    <button className="flex items-center justify-center gap-3 px-10 py-4 bg-gray-900 text-white rounded-full font-bold text-base hover:bg-gray-800 transition-colors shadow-lg" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                        <Download className="w-5 h-5" />
                        Download Full White Paper (PDF)
                    </button>
                    <button className="flex items-center justify-center gap-3 px-10 py-4 border-2 border-gray-900 text-gray-900 rounded-full font-bold text-base hover:bg-gray-50 transition-colors" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                        Bibliography
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="text-gray-600 text-sm" style={{fontFamily: 'var(--font-inter), sans-serif'}}>
                    <p>
                        Copyright © 2025 Deven Spear Research.
                    </p>
                </div>
            </div>
        </footer>
    );
}
