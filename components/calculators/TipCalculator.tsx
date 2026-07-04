"use client";

import { useMemo, useState } from "react";
import Field from "@/components/ui/Field";
import { ResultRow, ResultsPanel } from "@/components/ui/ResultRow";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function TipCalculator() {
  const [bill, setBill] = useState("50");
  const [tipPercent, setTipPercent] = useState("18");
  const [people, setPeople] = useState("2");

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
        <Field label="Bill amount" value={bill} onChange={setBill} unit="$" min={0} />
        <Field
          label="Tip percentage"
          value={tipPercent}
          onChange={setTipPercent}
          unit="%"
          min={0}
        />
        <Field
          label="Number of people"
          value={people}
          onChange={setPeople}
          min={1}
        />
      </div>
      <ResultsPanel>
        <ResultRow label="Tip amount" value={currency.format(tipAmount)} />
        <ResultRow label="Total bill" value={currency.format(total)} />
        <ResultRow label="Per person" value={currency.format(perPerson)} emphasize />
      </ResultsPanel>
    </div>
  );
}
