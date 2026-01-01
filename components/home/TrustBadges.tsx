interface TrustBadgesProps {
  lang: string;
}

export default function TrustBadges({ lang }: TrustBadgesProps) {
  return (
    <section className="bg-gray-50 py-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">10K+</div>
            <div className="text-sm text-gray-600">
              {lang === "zh-CN" ? "活跃用户" : "Active Users"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">50K+</div>
            <div className="text-sm text-gray-600">
              {lang === "zh-CN" ? "管理的物业" : "Properties Managed"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {lang === "zh-CN" ? "¥20亿+" : "$2B+"}
            </div>
            <div className="text-sm text-gray-600">
              {lang === "zh-CN" ? "处理的租金" : "Rent Processed"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">99%</div>
            <div className="text-sm text-gray-600">
              {lang === "zh-CN" ? "客户满意度" : "Customer Satisfaction"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
