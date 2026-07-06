"use client";
import { motion } from "framer-motion";

interface TestimonialCardsProps {
  dict: {
    home: {
      testimonialsTitle: string;
      testimonial1: string;
      testimonial1Author: string;
      testimonial2: string;
      testimonial2Author: string;
    };
  };
}

const testimonials = [
  {
    quoteKey: "testimonial1",
    authorKey: "testimonial1Author",
    initials: "JD",
    role: "Property Owner",
  },
  {
    quoteKey: "testimonial2",
    authorKey: "testimonial2Author",
    initials: "SM",
    role: "Tenant",
  },
];

export default function TestimonialCards({ dict }: TestimonialCardsProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 bg-gray-200/70 text-gray-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl tracking-tight">
            {dict.home.testimonialsTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.quoteKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="bg-white rounded-2xl border border-gray-100 p-8 relative"
            >
              <svg className="w-8 h-8 text-gray-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-600 leading-relaxed mb-6 italic">
                {(dict.home as Record<string, string>)[t.quoteKey]}
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {(dict.home as Record<string, string>)[t.authorKey]}
                  </div>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
