'use client'

import { getDictionary } from '@/app/[lang]/dictionaries';
import { WEBSITE_NAME } from '@/constants/text'

const Footer = async ({ lang }: { lang: string }) => {
  const dict = await getDictionary(lang);
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">
              {'Rental Management Platform'}
            </h3>
            <p className="text-gray-400">
              {'Professional solution for property management'}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4">{dict.home.contactUs}</h4>
            <p className="text-gray-400">support@rentalplatform.com</p>
            <p className="text-gray-400">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Rental Management Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer