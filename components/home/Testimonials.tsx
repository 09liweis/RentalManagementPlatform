interface TestimonialsProps {
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

export default function Testimonials({ dict }: TestimonialsProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {dict.home.testimonialsTitle}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Trusted by thousands of property owners and managers worldwide
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full mr-4"></div>
              <div>
                <div className="text-lg font-bold">
                  {dict.home.testimonial1Author}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              &quot;{dict.home.testimonial1}&quot;
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full mr-4"></div>
              <div>
                <div className="text-lg font-bold">
                  {dict.home.testimonial2Author}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              &quot;{dict.home.testimonial2}&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
