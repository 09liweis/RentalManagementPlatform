import useAppStore from "@/stores/appStore";
import Button from "../common/Button";

export default function RentCard({rent, handleClick, handleDeleteRent}:any) {
  const { _id, amount, startDate, status, statusTxt } = rent;
  const { t } = useAppStore();
  return (
    <article className="card">
      <p className="rent-date">{startDate}</p>
      <div className="flex justify-between items-center my-2">
        <p className="text-xl font-semibold">${amount}</p>
        <p className={`rent-status ${statusTxt}`}>{t(statusTxt)}</p>
      </div>
      <div className="flex justify-between">
        <Button
          tl={t("dashboard.Edit")}
          handleClick={handleClick}
        />
        <Button
          tp="danger"
          tl={t("dashboard.Delete")}
          handleClick={handleDeleteRent}
        />
      </div>
    </article>
  );
}
