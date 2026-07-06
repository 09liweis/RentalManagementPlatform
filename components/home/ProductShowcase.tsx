"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProductShowcaseProps {
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

const tabs = [
  { key: "landlordScreenshot", labelEn: "Dashboard", labelZh: "仪表板", color: "bg-blue-600" },
  { key: "tenantScreenshot", labelEn: "Tenants", labelZh: "租户", color: "bg-emerald-600" },
  { key: "rentScreenshot", labelEn: "Rent Tracking", labelZh: "租金跟踪", color: "bg-violet-600" },
] as const;

const DashboardPreview = ({ lang }: { lang: string }) => {
  const currency = lang === "zh-CN" ? "¥" : "$";
  const names =
    lang === "zh-CN"
      ? ["张明 - A栋3室", "李华 - B栋2室", "水电费 - A栋"]
      : ["John Smith - Apt 301", "Sarah Johnson - Apt 205", "Utilities - Building A"];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: lang === "zh-CN" ? "总物业" : "Properties", value: "12", bg: "bg-blue-50", text: "text-blue-700" },
          { label: lang === "zh-CN" ? "月收入" : "Monthly Income", value: `${currency}24,500`, bg: "bg-emerald-50", text: "text-emerald-700" },
          { label: lang === "zh-CN" ? "入住率" : "Occupancy", value: "92%", bg: "bg-violet-50", text: "text-violet-700" },
        ].map((card) => (
          <div key={card.label} className={`${card.bg} rounded-xl p-3`}>
            <div className="text-xs text-gray-500">{card.label}</div>
            <div className={`text-lg font-bold ${card.text}`}>{card.value}</div>
          </div>
        ))}
      </div>
      <div className="border border-gray-100 rounded-xl p-4">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          {lang === "zh-CN" ? "最近交易" : "Recent Transactions"}
        </div>
        <div className="space-y-2.5">
          {[
            { name: names[0], amount: `${currency}3,500`, positive: true },
            { name: names[1], amount: `${currency}2,800`, positive: true },
            { name: names[2], amount: `-${currency}1,200`, positive: false },
          ].map((tx, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-gray-600">{tx.name}</span>
              <span className={`font-medium ${tx.positive ? "text-emerald-600" : "text-red-500"}`}>
                {tx.positive ? "+" : ""}{tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TenantPreview = ({ lang }: { lang: string }) => {
  const tenants =
    lang === "zh-CN"
      ? [
          { name: "张明", unit: "A栋3室", status: "已付款" },
          { name: "李华", unit: "B栋2室", status: "已付款" },
          { name: "王芳", unit: "A栋1室", status: "待付款" },
        ]
      : [
          { name: "John Smith", unit: "Apt 301", status: "Paid" },
          { name: "Sarah Johnson", unit: "Apt 205", status: "Paid" },
          { name: "Michael Brown", unit: "Apt 110", status: "Pending" },
        ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-gray-700">
          {lang === "zh-CN" ? "共12位租户" : "12 Tenants"}
        </div>
        <div className="text-xs bg-gray-900 text-white px-3 py-1 rounded-full font-medium">
          {lang === "zh-CN" ? "+ 添加" : "+ Add"}
        </div>
      </div>
      {tenants.map((t, i) => (
        <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
              {t.name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{t.name}</div>
              <div className="text-xs text-gray-400">{t.unit}</div>
            </div>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${t.status === "Paid" || t.status === "已付款" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
            {t.status}
          </span>
        </div>
      ))}
    </div>
  );
};

const RentPreview = ({ lang }: { lang: string }) => {
  const currency = lang === "zh-CN" ? "¥" : "$";
  const items =
    lang === "zh-CN"
      ? [
          { name: "A栋3室 - 张明", amount: "3,500", paid: true },
          { name: "B栋2室 - 李华", amount: "2,800", paid: true },
          { name: "A栋1室 - 王芳", amount: "3,200", paid: false },
        ]
      : [
          { name: "Apt 301 - John Smith", amount: "3,500", paid: true },
          { name: "Apt 205 - Sarah Johnson", amount: "2,800", paid: true },
          { name: "Apt 110 - Michael Brown", amount: "3,200", paid: false },
        ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            {lang === "zh-CN" ? "本月收入" : "This Month"}
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{currency}24,500</div>
        </div>
      </div>
      <div className="h-28 flex items-end gap-1.5">
        {[0.3, 0.5, 0.75, 1, 0.65, 0.45].map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="flex-1 bg-gray-200 rounded-t origin-bottom"
            style={{ height: `${h * 100}%` }}
          />
        ))}
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm py-2 border-b border-gray-50">
            <span className="text-gray-600">{item.name}</span>
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-900">{currency}{item.amount}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.paid ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                {lang === "zh-CN" ? (item.paid ? "已付" : "待付") : (item.paid ? "Paid" : "Pending")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProductShowcase({ dict, lang }: ProductShowcaseProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-3 py-1 bg-gray-200/70 text-gray-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Product
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl tracking-tight">
            {dict.home.screenshotsTitle}
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === i
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {lang === "zh-CN" ? tab.labelZh : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Preview Panel */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className={`${tabs[activeTab].color} text-white px-5 py-3 flex items-center gap-2`}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
              </div>
              <div className="text-sm font-semibold ml-3">
                {lang === "zh-CN"
                  ? tabs[activeTab].labelZh
                  : tabs[activeTab].labelEn}
              </div>
            </div>
            <div className="p-6">
              {activeTab === 0 && <DashboardPreview lang={lang} />}
              {activeTab === 1 && <TenantPreview lang={lang} />}
              {activeTab === 2 && <RentPreview lang={lang} />}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
