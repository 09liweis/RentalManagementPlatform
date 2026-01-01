import styles from "../../app/[lang]/(home)/page.module.css";

interface ScreenshotsProps {
  dict: {
    home: {
      screenshotsTitle: string;
      landlordScreenshot: string;
      tenantScreenshot: string;
      rentScreenshot: string;
    };
  };
  lang: string;
}

const LandlordDashboardScreenshot = ({ lang }: { lang: string }) => {
  const currencySymbol = lang === "zh-CN" ? "¥" : "$";
  const names =
    lang === "zh-CN"
      ? ["张明 - A栋3室", "李华 - B栋2室", "水电费 - A栋"]
      : [
          "John Smith - Apt 301",
          "Sarah Johnson - Apt 205",
          "Utilities - Building A",
        ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="bg-blue-600 text-white p-3 rounded-t-lg">
        <div className="text-lg font-bold">
          {lang === "zh-CN" ? "房东仪表板" : "Landlord Dashboard"}
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between">
          <div className="bg-blue-100 p-3 rounded-lg w-1/3 mr-2">
            <div className="text-sm text-gray-500">
              {lang === "zh-CN" ? "总物业" : "Total Properties"}
            </div>
            <div className="text-2xl font-bold">12</div>
          </div>
          <div className="bg-green-100 p-3 rounded-lg w-1/3 mr-2">
            <div className="text-sm text-gray-500">
              {lang === "zh-CN" ? "总收入" : "Total Income"}
            </div>
            <div className="text-2xl font-bold">{currencySymbol}24,500</div>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg w-1/3">
            <div className="text-sm text-gray-500">
              {lang === "zh-CN" ? "入住率" : "Occupancy Rate"}
            </div>
            <div className="text-2xl font-bold">92%</div>
          </div>
        </div>
        <div className="border rounded-lg p-3">
          <div className="text-sm font-medium mb-2">
            {lang === "zh-CN" ? "最近交易" : "Recent Transactions"}
          </div>
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
  const tenants =
    lang === "zh-CN"
      ? [
          { name: "张明", apt: "A栋3室", date: "2024-06-30" },
          { name: "李华", apt: "B栋2室", date: "2024-08-15" },
          { name: "王芳", apt: "A栋1室", date: "2024-05-20" },
        ]
      : [
          { name: "John Smith", apt: "Apt 301", date: "Jun 30, 2024" },
          { name: "Sarah Johnson", apt: "Apt 205", date: "Aug 15, 2024" },
          { name: "Michael Brown", apt: "Apt 110", date: "May 20, 2024" },
        ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="bg-indigo-600 text-white p-3 rounded-t-lg">
        <div className="text-lg font-bold">
          {lang === "zh-CN" ? "租户管理" : "Tenant Management"}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">
            {lang === "zh-CN" ? "共12位租户" : "12 Tenants"}
          </div>
          <div className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
            {lang === "zh-CN" ? "添加租户" : "Add Tenant"}
          </div>
        </div>
        <div className="space-y-3">
          {tenants.map((tenant, index) => (
            <div
              key={index}
              className="flex items-center p-2 border rounded-lg"
            >
              <div className="rounded-full mr-3 p-2">
                <div className="text-xs text-gray-500">
                  {tenant.apt} |{" "}
                  {lang === "zh-CN" ? "合同到期: " : "Lease ends: "}
                  {tenant.date}
                </div>
              </div>
              <div
                className={`ml-auto text-xs ${
                  index < 2
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                } px-2 py-1 rounded`}
              >
                {lang === "zh-CN"
                  ? index < 2
                    ? "已付款"
                    : "待付款"
                  : index < 2
                  ? "Paid"
                  : "Pending"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RentTrackingScreenshot = ({ lang }: { lang: string }) => {
  const currencySymbol = lang === "zh-CN" ? "¥" : "$";
  const tenants =
    lang === "zh-CN"
      ? [
          { name: "A栋3室 - 张明", amount: "3,500" },
          { name: "B栋2室 - 李华", amount: "2,800" },
          { name: "A栋1室 - 王芳", amount: "3,200" },
        ]
      : [
          { name: "Apt 301 - John Smith", amount: "3,500" },
          { name: "Apt 205 - Sarah Johnson", amount: "2,800" },
          { name: "Apt 110 - Michael Brown", amount: "3,200" },
        ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="bg-green-600 text-white p-3 rounded-t-lg">
        <div className="text-lg font-bold">
          {lang === "zh-CN" ? "租金跟踪" : "Rent Tracking"}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="text-sm font-medium">
            {lang === "zh-CN" ? "2023年10月收入" : "October 2023 Income"}
          </div>
          <div className="text-lg font-bold text-green-600">
            {currencySymbol}24,500
          </div>
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
            <div
              key={index}
              className="flex justify-between text-sm p-2 border-b"
            >
              <span>{tenant.name}</span>
              <span className="font-medium">
                {currencySymbol}
                {tenant.amount}
              </span>
              <span
                className={index < 2 ? "text-green-600" : "text-yellow-600"}
              >
                {lang === "zh-CN"
                  ? index < 2
                    ? "已付款"
                    : "待付款"
                  : index < 2
                  ? "Paid"
                  : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Screenshots({ dict, lang }: ScreenshotsProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${styles.animate}`}>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {dict.home.screenshotsTitle}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {lang === "zh-CN"
              ? "探索我们为物业所有者和管理者设计的直观界面"
              : "Explore our intuitive interface designed for property owners and managers"}
          </p>
        </div>

        <div
          className={`mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 ${styles.screenshotGrid}`}
        >
          <div
            className={`${styles.screenshotCard} ${styles.animate} ${styles.animateDelay1} p-4 border-2 border-purple-100 rounded-xl shadow-lg hover:shadow-xl hover:border-purple-300 transition-all duration-300 hover:scale-[1.02]`}
          >
            <h3 className="text-xl font-bold text-center mb-4 text-purple-800">
              {dict.home.landlordScreenshot}
            </h3>
            <LandlordDashboardScreenshot lang={lang} />
          </div>
          <div
            className={`${styles.screenshotCard} ${styles.animate} ${styles.animateDelay2} p-4 border-2 border-purple-100 rounded-xl shadow-lg hover:shadow-xl hover:border-purple-300 transition-all duration-300 hover:scale-[1.02]`}
          >
            <h3 className="text-xl font-bold text-center mb-4 text-purple-800">
              {dict.home.tenantScreenshot}
            </h3>
            <TenantManagementScreenshot lang={lang} />
          </div>
          <div
            className={`${styles.screenshotCard} ${styles.animate} ${styles.animateDelay3} p-4 border-2 border-purple-100 rounded-xl shadow-lg hover:shadow-xl hover:border-purple-300 transition-all duration-300 hover:scale-[1.02]`}
          >
            <h3 className="text-xl font-bold text-center mb-4 text-purple-800">
              {dict.home.rentScreenshot}
            </h3>
            <RentTrackingScreenshot lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}
