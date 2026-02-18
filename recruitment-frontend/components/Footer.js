export default function Footer() {
    return (
        <footer className="relative border-t border-white/10 bg-black/60 backdrop-blur-xl pt-20 pb-10 overflow-hidden mt-20">

            {/* Ambient Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-20">

                    {/* Column 1: Brand */}
                    <div className="md:col-span-2">
                        <h2 className="text-3xl font-bold tracking-tighter text-white mb-6">HIREHUB<span className="text-zinc-600 text-lg align-top font-light">©</span></h2>
                        <p className="text-zinc-400 max-w-sm text-lg font-light leading-relaxed">
                            Refining the recruitment process for the modern era. We connect visionaries with the world's best talent.
                        </p>
                    </div>

                    {/* Column 2: Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 tracking-wide uppercase text-xs">Platform</h3>
                        <ul className="space-y-4 text-zinc-500">
                            {["Browse Jobs", "For Recruiters", "Pricing", "Manifesto"].map((item) => (
                                <li key={item}>
                                    <a href={item === "Browse Jobs" ? "/jobs" : "#"} className="flex items-center gap-2 hover:text-white transition-all duration-300 group w-fit">
                                        <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-white transition-colors"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Legal/Social */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 tracking-wide uppercase text-xs">Connect</h3>
                        <ul className="space-y-4 text-zinc-500">
                            {["Twitter / X", "LinkedIn", "Instagram", "Contact Support"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="flex items-center gap-2 hover:text-white transition-all duration-300 group w-fit">
                                        <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-white transition-colors"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-600 text-sm font-mono">
                        © {new Date().getFullYear()} HIREHUB SYSTEMS INC.
                    </p>
                    <div className="flex gap-6 text-xs text-zinc-600 font-mono uppercase tracking-wider">
                        <a href="#" className="hover:text-zinc-400">Privacy</a>
                        <a href="#" className="hover:text-zinc-400">Terms</a>
                        <a href="#" className="hover:text-zinc-400">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
