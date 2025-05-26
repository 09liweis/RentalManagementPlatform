import useAppStore from "@/stores/appStore";
import Button from "../common/Button";

export default function RentCard({ rent, handleClick, handleDeleteRent }: any) {
  const { _id, amount, startDate, status, statusTxt } = rent;
  const { t } = useAppStore();
  return (
    <article className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 p-6 border border-gray-100/80 hover:border-gray-200 group">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
        <p className="text-sm font-medium text-gray-600 tracking-wide">
          {startDate}
        </p>
      </div>

      <div className="flex justify-between items-center mb-5">
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-gray-500">$</span>
          <p className="text-2xl font-bold text-gray-900">{amount}</p>
        </div>
        <div
          className={`
          px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300
          ${statusTxt === "paid" ? "bg-emerald-100 text-emerald-700" : ""}
          ${statusTxt === "pending" ? "bg-amber-100 text-amber-700" : ""}
          ${statusTxt === "overdue" ? "bg-rose-100 text-rose-700" : ""}
          ${statusTxt === "partial" ? "bg-blue-100 text-blue-700" : ""}
        `}
        >
          {t(statusTxt)}
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <Button tl={t("dashboard.Edit")} handleClick={handleClick} />
        <Button
          tp="danger"
          tl={t("dashboard.Delete")}
          handleClick={handleDeleteRent}
        />
      </div>
    </article>
  );
}
