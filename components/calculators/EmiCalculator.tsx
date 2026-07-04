"use client";

import { useMemo, useState } from "react";
import Field from "@/components/ui/Field";
import { ResultRow, ResultsPanel } from "@/components/ui/ResultRow";
import { validateNumber } from "@/lib/validation";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState("250000");
  const [rate, setRate] = useState("7.5");
  const [years, setYears] = useState("20");

  const { emi, totalPayment, totalInterest } = useMemo(() => {
    const p = Number(principal) || 0;
    const annualRate = Number(rate) || 0;
    const months = (Number(years) || 0) * 12;
    const monthlyRate = annualRate / 12 / 100;

    if (p <= 0 || months <= 0) {
      return { emi: 0, totalPayment: 0, totalInterest: 0 };
    }

    let monthlyEmi: number;
    if (monthlyRate === 0) {
      monthlyEmi = p / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);
      monthlyEmi = (p * monthlyRate * factor) / (factor - 1);
    }

    const total = monthlyEmi * months;
    return {
      emi: monthlyEmi,
      totalPayment: total,
      totalInterest: total - p,
    };
  }, [principal, rate, years]);

  const principalError = validateNumber(principal, { min: 0 });
  const rateError = validateNumber(rate, { min: 0 });
  const yearsError = validateNumber(years, { min: 0 });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Field
          label="Loan amount"
          value={principal}
          onChange={setPrincipal}
          unit="$"
          min={0}
          error={principalError}
        />
        <Field
          label="Annual interest rate"
          value={rate}
          onChange={setRate}
          unit="%"
          step={0.01}
          min={0}
          error={rateError}
        />
        <Field
          label="Loan tenure"
          value={years}
          onChange={setYears}
          unit="years"
          min={0}
          error={yearsError}
        />
      </div>
      <ResultsPanel>
        <ResultRow label="Monthly EMI" value={currency.format(emi)} emphasize />
        <ResultRow label="Total payment" value={currency.format(totalPayment)} />
        <ResultRow label="Total interest" value={currency.format(totalInterest)} />
      </ResultsPanel>
    </div>
  );
}
