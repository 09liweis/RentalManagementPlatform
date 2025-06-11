'use client';
import LinkText from '@/components/common/LinkText';
import Image from 'next/image';
import { getDictionary } from '../dictionaries';
import styles from './page.module.css';

// Mock screenshot components
const LandlordDashboardScreenshot = ({ lang }: { lang: string }) => {
  const currencySymbol = lang === 'zh-CN' ? '¥' : '$';
  const names = lang === 'zh-CN' ? 
    ['张明 - A栋3室', '李华 - B栋2室', '水电费 - A栋'] :
    ['John Smith - Apt 301', 'Sarah Johnson - Apt 205', 'Utilities - Building A'];
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="bg-blue-600 text-white p-3 rounded-t-lg">
        <div className="text-lg font-bold">{lang === 'zh-CN' ? '房东仪表板' : 'Landlord Dashboard'}</div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between">
          <div className="bg-blue-100 p-3 rounded-lg w-1/3 mr-2">
            <div className="text-sm text-gray-500">{lang === 'zh-CN' ? '总物业' : 'Total Properties'}</div>
            <div className="text-2xl font-bold">12</div>
          </div>
          <div className="bg-green-100 p-3 rounded-lg w-1/3 mr-2">
            <div className="text-sm text-gray-500">{lang === 'zh-CN' ? '总收入' : 'Total Income'}</div>
            <div className="text-2xl font-bold">{currencySymbol}24,500</div>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg w-1/3">
            <div className="text-sm text-gray-500">{lang === 'zh-CN' ? '入住率' : 'Occupancy Rate'}</div>
            <div className="text-2xl font-bold">92%</div>
          </div>
        </div>
        <div className="border rounded-lg p-3">
          <div className="text-sm font-medium mb-2">{lang === 'zh-CN' ? '最近交易' : 'Recent Transactions'}</div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{names[0]}</span>
              <span className="text-green-600">+{currencySymbol}3,500</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{names[1]}</span>
              <span className="text-green-600">+{currencySymbol}2,800</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{names[2]}</span>
              <span className="text-red-600">-{currencySymbol}1,200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TenantManagementScreenshot = ({ lang }: { lang: string }) => {
  const tenants = lang === 'zh-CN' ? 
    [
      { name: '张明', apt: 'A栋3室', date: '2024-06-30' },
      { name: '李华', apt: 'B栋2室', date: '2024-08-15' },
      { name: '王芳', apt: 'A栋1室', date: '2024-05-20' }
    ] :
    [
      { name: 'John Smith', apt: 'Apt 301', date: 'Jun 30, 2024' },
      { name: 'Sarah Johnson', apt: 'Apt 205', date: 'Aug 15, 2024' },
      { name: 'Michael Brown', apt: 'Apt 110', date: 'May 20, 2024' }
    ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="bg-indigo-600 text-white p-3 rounded-t-lg">
        <div className="text-lg font-bold">{lang === 'zh-CN' ? '租户管理' : 'Tenant Management'}</div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">
            {lang === 'zh-CN' ? '共12位租户' : '12 Tenants'}
          </div>
          <div className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
            {lang === 'zh-CN' ? '添加租户' : 'Add Tenant'}
          </div>
        </div>
        <div className="space-y-3">
          {tenants.map((tenant, index) => (
            <div key={index} className="flex items-center p-2 border rounded-lg">
              <div className="rounded-full mr-3 p-2">
                <div className="text-xs text-gray-500">
                  {tenant.apt} | {lang === 'zh-CN' ? '合同到期: ' : 'Lease ends: '}{tenant.date}
                </div>
              </div>
              <div className={`ml-auto text-xs ${index < 2 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} px-2 py-1 rounded`}>
                {lang === 'zh-CN' ? (index < 2 ? '已付款' : '待付款') : (index < 2 ? 'Paid' : 'Pending')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RentTrackingScreenshot = ({ lang }: { lang: string }) => {
  const currencySymbol = lang === 'zh-CN' ? '¥' : '$';
  const tenants = lang === 'zh-CN' ? 
    [
      { name: 'A栋3室 - 张明', amount: '3,500' },
      { name: 'B栋2室 - 李华', amount: '2,800' },
      { name: 'A栋1室 - 王芳', amount: '3,200' }
    ] :
    [
      { name: 'Apt 301 - John Smith', amount: '3,500' },
      { name: 'Apt 205 - Sarah Johnson', amount: '2,800' },
      { name: 'Apt 110 - Michael Brown', amount: '3,200' }
    ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="bg-green-600 text-white p-3 rounded-t-lg">
        <div className="text-lg font-bold">{lang === 'zh-CN' ? '租金跟踪' : 'Rent Tracking'}</div>
      </div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="text-sm font-medium">
            {lang === 'zh-CN' ? '2023年10月收入' : 'October 2023 Income'}
          </div>
          <div className="text-lg font-bold text-green-600">{currencySymbol}24,500</div>
        </div>
        <div className="h-32 flex items-end space-x-2 mb-4">
          <div className="bg-green-500 w-1/6 h-1/3 rounded-t"></div>
          <div className="bg-green-500 w-1/6 h-1/2 rounded-t"></div>
          <div className="bg-green-500 w-1/6 h-3/4 rounded-t"></div>
          <div className="bg-green-500 w-1/6 h-full rounded-t"></div>
          <div className="bg-green-500 w-1/6 h-2/3 rounded-t"></div>
          <div className="bg-green-500 w-1/6 h-1/2 rounded-t"></div>
        </div>
        <div className="space-y-2">
          {tenants.map((tenant, index) => (
            <div key={index} className="flex justify-between text-sm p-2 border-b">
              <span>{tenant.name}</span>
              <span className="font-medium">{currencySymbol}{tenant.amount}</span>
              <span className={index < 2 ? 'text-green-600' : 'text-yellow-600'}>
                {lang === 'zh-CN' ? (index < 2 ? '已付款' : '待付款') : (index < 2 ? 'Paid' : 'Pending')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 ${styles.heroBackground}`}>
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`text-left ${styles.heroContent}`}>
              <h1 className={`text-4xl font-extrabold sm:text-5xl md:text-6xl leading-tight ${styles.heroTitle} ${styles.animate}`}>
                {dict.home.heroTitle}
              </h1>
              <p className={`mt-6 text-xl text-blue-100 ${styles.heroSubtitle} ${styles.animate} ${styles.animateDelay1}`}>
                {dict.home.heroSubtitle}
              </p>
              <div className={`mt-10 flex gap-4 ${styles.animate} ${styles.animateDelay2}`}>
                <LinkText 
                  href={`/signup`}
                  text={dict.home.getStarted}
                  className={`px-8 py-4 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-50 transition shadow-lg ${styles.focusRing}`}
                />
                <LinkText
                  href={`/login`}
                  text={dict.home.login}
                  className={`px-8 py-4 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-600 transition ${styles.focusRing}`}
                />
              </div>
              <div className="mt-8 flex items-center space-x-4 text-sm">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {lang === 'zh-CN' ? '无需信用卡' : 'No credit card required'}
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {lang === 'zh-CN' ? '14天免费试用' : '14-day free trial'}
                </span>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="relative w-full h-[600px] rounded-lg shadow-2xl overflow-hidden">
                <Image
                  src="/images/backgroundImage.jpg"
                  alt={lang === 'zh-CN' ? '平台仪表板预览' : 'Platform Dashboard Preview'}
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
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center ${styles.trustBadges}`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600">
                {lang === 'zh-CN' ? '活跃用户' : 'Active Users'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">
                {lang === 'zh-CN' ? '管理的物业' : 'Properties Managed'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {lang === 'zh-CN' ? '¥20亿+' : '$2B+'}
              </div>
              <div className="text-sm text-gray-600">
                {lang === 'zh-CN' ? '处理的租金' : 'Rent Processed'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">99%</div>
              <div className="text-sm text-gray-600">
                {lang === 'zh-CN' ? '客户满意度' : 'Customer Satisfaction'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {dict.home.featuresTitle}
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              {lang === 'zh-CN' ? 
                '为您的租赁物业管理提供所需的一切功能' : 
                'Everything you need to manage your rental properties efficiently'}
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
              <h3 className="text-xl font-bold text-gray-900">{dict.home.landlordFeature}</h3>
              <p className="mt-4 text-gray-600">{dict.home.landlordDesc}</p>
            </div>

            {/* Property Management */}
            <div className="relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{dict.home.tenantFeature}</h3>
              <p className="mt-4 text-gray-600">{dict.home.tenantDesc}</p>
            </div>

            {/* Rent Management */}
            <div className="relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{dict.home.rentFeature}</h3>
              <p className="mt-4 text-gray-600">{dict.home.rentDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${styles.animate}`}>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {dict.home.screenshotsTitle}
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              {lang === 'zh-CN' ? 
                '探索我们为物业所有者和管理者设计的直观界面' : 
                'Explore our intuitive interface designed for property owners and managers'}
            </p>
          </div>
          
          <div className={`mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 ${styles.screenshotGrid}`}>
            <div className={`${styles.screenshotCard} ${styles.animate} ${styles.animateDelay1}`}>
              <h3 className="text-xl font-bold text-center mb-4">{dict.home.landlordScreenshot}</h3>
              <LandlordDashboardScreenshot lang={lang} />
            </div>
            <div className={`${styles.screenshotCard} ${styles.animate} ${styles.animateDelay2}`}>
              <h3 className="text-xl font-bold text-center mb-4">{dict.home.tenantScreenshot}</h3>
              <TenantManagementScreenshot lang={lang} />
            </div>
            <div className={`${styles.screenshotCard} ${styles.animate} ${styles.animateDelay3}`}>
              <h3 className="text-xl font-bold text-center mb-4">{dict.home.rentScreenshot}</h3>
              <RentTrackingScreenshot lang={lang} />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${styles.animate}`}>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {dict.home.howItWorksTitle}
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              {lang === 'zh-CN' ? 
                '几分钟内开始使用，改变您的物业管理方式' : 
                'Get started in minutes and transform your property management'}
            </p>
          </div>
          
          <div className={`mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 ${styles.howItWorksGrid}`}>
            <div className="relative">
              <div className="absolute top-0 left-0 -mt-2 -ml-2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">1</div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 pt-10">
                <h3 className="text-xl font-bold mb-3">{dict.home.step1}</h3>
                <p className="text-gray-600">{dict.home.step1Desc}</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-0 left-0 -mt-2 -ml-2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">2</div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 pt-10">
                <h3 className="text-xl font-bold mb-3">{dict.home.step2}</h3>
                <p className="text-gray-600">{dict.home.step2Desc}</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-0 left-0 -mt-2 -ml-2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">3</div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 pt-10">
                <h3 className="text-xl font-bold mb-3">{dict.home.step3}</h3>
                <p className="text-gray-600">{dict.home.step3Desc}</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-0 left-0 -mt-2 -ml-2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">4</div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 pt-10">
                <h3 className="text-xl font-bold mb-3">{dict.home.step4}</h3>
                <p className="text-gray-600">{dict.home.step4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${styles.animate}`}>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {dict.home.testimonialsTitle}
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              {lang === 'zh-CN' ? 
                '受到全球数千位物业所有者和管理者的信赖' : 
                'Trusted by thousands of property owners and managers worldwide'}
            </p>
          </div>
          
          <div className={`mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 ${styles.testimonialGrid}`}>
            <div className={`bg-white p-8 rounded-xl shadow-lg border border-gray-100 ${styles.testimonialCard} ${styles.animate} ${styles.animateDelay1}`}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full mr-4"></div>
                <div>
                  <div className="text-lg font-bold">{dict.home.testimonial1Author}</div>
                </div>
              </div>
              <p className="text-gray-600 italic">&quot;{dict.home.testimonial1}&quot;</p>
            </div>
            <div className={`bg-white p-8 rounded-xl shadow-lg border border-gray-100 ${styles.testimonialCard} ${styles.animate} ${styles.animateDelay2}`}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full mr-4"></div>
                <div>
                  <div className="text-lg font-bold">{dict.home.testimonial2Author}</div>
                </div>
              </div>
              <p className="text-gray-600 italic">&quot;{dict.home.testimonial2}&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white ${styles.ctaSection}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${styles.animate}`}>
            {dict.home.getStarted}
          </h2>
          <div className={`flex flex-wrap justify-center gap-4 ${styles.animate} ${styles.animateDelay1}`}>
            <LinkText
              href={`/signup`}
              text={dict.home.signup}
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300"
            />
            <LinkText
              href={`/login`}
              text={dict.home.login}
              className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-300"
            />
          </div>
        </div>
      </section>
    </div>
  );
}