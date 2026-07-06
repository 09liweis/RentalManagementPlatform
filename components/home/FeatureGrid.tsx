"use client";
import { motion } from "framer-motion";

interface FeatureGridProps {
  dict: {
    home: {
      featuresTitle: string;
      landlordFeature: string;
      landlordDesc: string;
      tenantFeature: string;
      tenantDesc: string;
      rentFeature: string;
      rentDesc: string;
    };
  };
}

const features = [
  {
    titleKey: "landlordFeature",
    descKey: "landlordDesc",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50 text-blue-600",
  },
  {
    titleKey: "tenantFeature",
    descKey: "tenantDesc",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50 text-emerald-600",
  },
  {
    titleKey: "rentFeature",
    descKey: "rentDesc",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    color: "from-violet-500 to-violet-600",
    bg: "bg-violet-50 text-violet-600",
  },
];

export default function FeatureGrid({ dict }: FeatureGridProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Features
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl tracking-tight">
            {dict.home.featuresTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative bg-white rounded-2xl border border-gray-100 p-8 hover:border-gray-200 hover:shadow-lg transition-all"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bg} mb-5 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {(dict.home as Record<string, string>)[feature.titleKey]}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {(dict.home as Record<string, string>)[feature.descKey]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
