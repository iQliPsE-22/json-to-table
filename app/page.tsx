"use client";

import Link from "next/link";
import { ChevronRight, Zap, Shield, Layout, Code2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-purple-500/30 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <main className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-500/20">
              T
            </div>
            <span className="text-xl font-bold tracking-tight">table-core</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link
              href="#features"
              className="hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link href="#usage" className="hover:text-white transition-colors">
              Usage
            </Link>
            <Link
              href="/demo"
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all flex items-center gap-2"
            >
              View Demo
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-20 pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
            <Zap className="w-3 h-3" /> v0.1.0 is now live
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            Powerful. Headless. <br />
            <span className="text-gradient">Pure Logic.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
            Transform raw JSON into high-performance table models. No UI
            coupling, just composable functions built for speed and type-safety.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/demo"
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-xl shadow-purple-500/20"
            >
              Get Started{" "}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
              Documentation
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="container mx-auto px-6 py-32 border-t border-white/5"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Layout,
                title: "100% Headless",
                desc: "No CSS, no JSX, no assumptions. Works with React, Vue, Svelte or Vanilla JS.",
              },
              {
                icon: Shield,
                title: "Type Safe",
                desc: "Built with TypeScript for rock-solid developer experience and autocomplete.",
              },
              {
                icon: Zap,
                title: "Composable",
                desc: "Chain filters, sorting, and pagination effortlessly with the functional pipe.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Section */}
        <section id="usage" className="container mx-auto px-6 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">
                Simple yet <br />
                <span className="text-gradient">Extremely Powerful</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                The core engine treats table state as a series of data
                transformations. Keep your components lean and your logic
                centralized.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                  </div>
                  Pure functional data pipeline
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                  </div>
                  Zero external dependencies
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                  </div>
                  Optimized for large datasets
                </li>
              </ul>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition" />
              <div className="relative p-6 rounded-3xl bg-[#0a0a0a] border border-white/10 font-mono text-sm leading-relaxed overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  <div className="ml-auto flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                    <Code2 className="w-3 h-3" /> Usage Example
                  </div>
                </div>
                <div className="space-y-1">
                  <p>
                    <span className="text-purple-400">const</span> tableModel ={" "}
                    <span className="text-indigo-400">pipe</span>(
                  </p>
                  <p className="pl-4">rawData,</p>
                  <p className="pl-4">
                    (data) =&gt;{" "}
                    <span className="text-indigo-400">applyFilters</span>(data,
                    filters),
                  </p>
                  <p className="pl-4">
                    (data) =&gt;{" "}
                    <span className="text-indigo-400">applySorting</span>(data,
                    sortConfig),
                  </p>
                  <p className="pl-4">
                    (data) =&gt;{" "}
                    <span className="text-indigo-400">applyPagination</span>
                    (data, paginationConfig),
                  </p>
                  <p className="pl-4">
                    (data) =&gt;{" "}
                    <span className="text-indigo-400">createTableModel</span>
                    (columns, data)
                  </p>
                  <p>);</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>© 2025 table-core project. Built with passion for better UIs.</p>
        </footer>
      </main>
    </div>
  );
}
