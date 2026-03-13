interface YearlyRentIncomeProps {
  stat?: Record<number, number>;
}

export default function YearlyRentIncome({ stat }: YearlyRentIncomeProps) {
  if (!stat || Object.keys(stat).length === 0) {
    return null;
  }

  return (
    <div className="mt-3 space-y-1">
      <p className="text-xs text-gray-500 font-medium">Yearly Rent Income:</p>
      {Object.entries(stat)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, amount]) => (
          <div key={year} className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{year}</span>
            <span className="font-medium text-emerald-600">${amount.toLocaleString()}</span>
          </div>
        ))}
    </div>
  );
}
