'use client';
import LinkText from '@/components/common/LinkText';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl leading-tight">
                Professional Property Management Made Simple
              </h1>
              <p className="mt-6 text-xl text-blue-100">
                Streamline your rental property business with our comprehensive management platform. Track income, manage tenants, and grow your portfolio.
              </p>
              <div className="mt-10 flex gap-4">
                <LinkText 
                  href="/signup"
                  text="Start Free Trial"
                  className="px-8 py-4 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-50 transition shadow-lg"
                />
                <LinkText
                  href="/login"
                  text="Book a Demo"
                  className="px-8 py-4 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-600 transition"
                />
              </div>
              <div className="mt-8 flex items-center space-x-4 text-sm">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No credit card required
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  14-day free trial
                </span>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="relative w-full h-[600px] rounded-lg shadow-2xl overflow-hidden">
                <Image
                  src="/images/backgroundImage.jpg"
                  alt="Platform Dashboard Preview"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Properties Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">$2B+</div>
              <div className="text-sm text-gray-600">Rent Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">99%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powerful Features for Modern Landlords
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to manage your rental properties efficiently
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Financial Management */}
            <div className="relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Financial Management</h3>
              <p className="mt-4 text-gray-600">
                Track income and expenses, generate financial reports, and manage your cash flow with ease. Automate rent collection and late fees.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Automated rent collection
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Expense tracking
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Financial reporting
                </li>
              </ul>
            </div>

            {/* Property Management */}
            <div className="relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Property Management</h3>
              <p className="mt-4 text-gray-600">
                Manage all your properties in one place. Track maintenance, store documents, and monitor property performance.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Maintenance tracking
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Document storage
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Property analytics
                </li>
              </ul>
            </div>

            {/* Tenant Management */}
            <div className="relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Tenant Management</h3>
              <p className="mt-4 text-gray-600">
                Streamline tenant communications, lease management, and maintenance requests in one central location.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Online applications
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lease management
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Maintenance requests
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 lg:py-16">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Start Managing Your Properties Like a Pro
                </h2>
                <p className="mt-4 text-xl text-blue-100">
                  Join thousands of successful landlords who are growing their rental business with our platform.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <LinkText
                    href="/signup"
                    text="Start Your Free Trial"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 md:text-lg shadow-lg"
                  />
                  <LinkText
                    href="/contact"
                    text="Schedule a Demo"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white border-2 border-white hover:bg-white hover:text-blue-600 md:text-lg"
                  />
                </div>
                <p className="mt-6 text-sm text-blue-100">
                  No credit card required • 14-day free trial • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}