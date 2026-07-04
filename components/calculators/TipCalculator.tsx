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

export default function TipCalculator() {
  const [params, update] = useShareableParams({
    bill: "50",
    tipPercent: "18",
    people: "2",
  });
  const { bill, tipPercent, people } = params;

  const { tipAmount, total, perPerson } = useMemo(() => {
    const billValue = Number(bill) || 0;
    const tip = billValue * ((Number(tipPercent) || 0) / 100);
    const totalValue = billValue + tip;
    const peopleCount = Math.max(1, Number(people) || 1);
    return {
      tipAmount: tip,
      total: totalValue,
      perPerson: totalValue / peopleCount,
    };
  }, [bill, tipPercent, people]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Field
          label="Bill amount"
          value={bill}
          onChange={(v) => update({ bill: v })}
          unit="$"
          min={0}
          error={validateNumber(bill, { min: 0 })}
        />
        <Field
          label="Tip percentage"
          value={tipPercent}
          onChange={(v) => update({ tipPercent: v })}
          unit="%"
          min={0}
          error={validateNumber(tipPercent, { min: 0 })}
        />
        <Field
          label="Number of people"
          value={people}
          onChange={(v) => update({ people: v })}
          min={1}
          error={validateNumber(people, { min: 1 })}
        />
      </div>
      <ResultsPanel>
        <ResultRow label="Tip amount" value={currency.format(tipAmount)} />
        <ResultRow label="Total bill" value={currency.format(total)} />
        <ResultRow label="Per person" value={currency.format(perPerson)} emphasize />
      </ResultsPanel>
      <ShareLinkButton params={params} />
    </div>
  );
}
