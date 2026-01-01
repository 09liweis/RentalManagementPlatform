interface HowItWorksProps {
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

export default function HowItWorks({ dict }: HowItWorksProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {dict.home.howItWorksTitle}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Get started in minutes and transform your property management
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <div className="absolute top-0 left-0 -mt-2 -ml-2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              1
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 pt-10">
              <h3 className="text-xl font-bold mb-3">{dict.home.step1}</h3>
              <p className="text-gray-600">{dict.home.step1Desc}</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-0 left-0 -mt-2 -ml-2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              2
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 pt-10">
              <h3 className="text-xl font-bold mb-3">{dict.home.step2}</h3>
              <p className="text-gray-600">{dict.home.step2Desc}</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-0 left-0 -mt-2 -ml-2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              3
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 pt-10">
              <h3 className="text-xl font-bold mb-3">{dict.home.step3}</h3>
              <p className="text-gray-600">{dict.home.step3Desc}</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-0 left-0 -mt-2 -ml-2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              4
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 pt-10">
              <h3 className="text-xl font-bold mb-3">{dict.home.step4}</h3>
              <p className="text-gray-600">{dict.home.step4Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
