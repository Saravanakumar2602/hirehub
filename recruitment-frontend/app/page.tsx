"use client";

import Link from "next/link";
import { BackgroundCircles } from "@/components/ui/background-circles";
import { Sparkles, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

// Minimal Fade Up Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" }, // Blur for that premium feel
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] // Custom refined ease
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger delays
      delayChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-white selection:bg-white selection:text-black overflow-hidden relative font-sans">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-20 z-10 px-4 overflow-hidden">

        {/* Background Animation Layer - Contained in Hero */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
          <BackgroundCircles variant="septenary" className="" />
        </div>

        {/* Advanced Background Effects - Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

        {/* Spotlight Glow behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[8000ms]"></div>


        <motion.div
          className="container mx-auto relative z-10 text-center max-w-5xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >

          {/* Main Title - Ultra Premium Silver Gradient */}
          <motion.h1
            variants={fadeUp}
            className="text-7xl md:text-[10rem] font-bold tracking-tighter mb-6 bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent drop-shadow-2xl leading-none select-none"
          >
            HIREHUB
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 font-light tracking-wide leading-relaxed"
          >
            The minimal, AI-driven recruitment platform for <span className="text-white font-medium">visionaries</span> and <span className="text-white font-medium">elite talent</span>.
          </motion.p>

          {/* CTA Buttons - Premium Glass Pill Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex justify-center gap-6 flex-col md:flex-row items-center"
          >
            <Link
              href="/register"
              className="px-10 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] border border-transparent"
            >
              Start Hiring
            </Link>
            <Link
              href="/jobs"
              className="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-zinc-300 rounded-full font-medium hover:bg-white/10 hover:text-white transition-all hover:border-white/30"
            >
              Find Openings
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section - Glass Cards & Grid Background */}
      <section className="py-24 relative z-10 overflow-hidden">

        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <motion.div
          className="container mx-auto px-4 relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Curated Talent",
                desc: "Access the top 1% of creative professionals through our rigorous vetting process.",
                icon: <Sparkles className="w-8 h-8 text-zinc-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
              },
              {
                title: "Seamless Hires",
                desc: "Automated workflows that just work. From application to offer in days, not weeks.",
                icon: <Zap className="w-8 h-8 text-zinc-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
              },
              {
                title: "Future Proof",
                desc: "Built on next-gen architecture for speed, security, and scalability.",
                icon: <ShieldCheck className="w-8 h-8 text-zinc-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
              }
            ].map((feature, i) => (
              <div key={i} className="group p-10 border border-white/5 rounded-3xl bg-zinc-900/40 backdrop-blur-sm hover:bg-zinc-800/60 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-2xl relative overflow-hidden">
                {/* Inner Glow */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-colors duration-500"></div>

                <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit border border-white/5 group-hover:border-white/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white transition-colors">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-lg group-hover:text-zinc-400 font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          className="text-center mt-32 mb-10 px-4 relative z-10"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">Ready to shape the future?</h2>

          <Link href="/register" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-all text-xl font-light group">
            <span className="border-b border-zinc-700 group-hover:border-white pb-1 transition-colors">Create your free account today</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
