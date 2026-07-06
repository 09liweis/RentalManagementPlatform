"use client";
import { motion } from "framer-motion";

interface WorkflowStepsProps {
  dict: {
    home: {
      howItWorksTitle: string;
      step1: string;
      step1Desc: string;
      step2: string;
      step2Desc: string;
      step3: string;
      step3Desc: string;
      step4: string;
      step4Desc: string;
    };
  };
}

const steps = [
  {
    stepKey: "step1",
    descKey: "step1Desc",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    stepKey: "step2",
    descKey: "step2Desc",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    stepKey: "step3",
    descKey: "step3Desc",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    stepKey: "step4",
    descKey: "step4Desc",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

export default function WorkflowSteps({ dict }: WorkflowStepsProps) {
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
            How It Works
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl tracking-tight">
            {dict.home.howItWorksTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.stepKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="relative group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gray-200 group-hover:bg-gray-300 transition-colors" />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="relative z-10 w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-sm font-bold">{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {(dict.home as Record<string, string>)[step.stepKey]}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  {(dict.home as Record<string, string>)[step.descKey]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
