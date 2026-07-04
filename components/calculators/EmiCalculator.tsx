"use client";

import { useMemo } from "react";
import Field from "@/components/ui/Field";
import { ResultRow, ResultsPanel } from "@/components/ui/ResultRow";
import ShareLinkButton from "@/components/ShareLinkButton";
import { validateNumber } from "@/lib/validation";
import { useShareableParams } from "@/lib/useShareableParams";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function EmiCalculator() {
  const [params, update] = useShareableParams({
    principal: "250000",
    rate: "7.5",
    years: "20",
  });
  const { principal, rate, years } = params;

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
          onChange={(v) => update({ principal: v })}
          unit="$"
          min={0}
          error={principalError}
        />
        <Field
          label="Annual interest rate"
          value={rate}
          onChange={(v) => update({ rate: v })}
          unit="%"
          step={0.01}
          min={0}
          error={rateError}
        />
        <Field
          label="Loan tenure"
          value={years}
          onChange={(v) => update({ years: v })}
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
      <ShareLinkButton params={params} />
    </div>
  );
}
