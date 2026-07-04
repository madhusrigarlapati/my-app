export function calculateEmi(principal: number, annualRatePct: number, years: number) {
  const months = years * 12;
  const monthlyRate = annualRatePct / 12 / 100;

  if (principal <= 0 || months <= 0) {
    return { emi: 0, totalPayment: 0, totalInterest: 0 };
  }

  let emi: number;
  if (monthlyRate === 0) {
    emi = principal / months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    emi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = emi * months;
  return { emi, totalPayment, totalInterest: totalPayment - principal };
}

export function calculateCompoundInterest(
  principal: number,
  annualRatePct: number,
  years: number,
  frequency: number
) {
  const r = annualRatePct / 100;
  const n = frequency || 1;
  const futureValue = principal * Math.pow(1 + r / n, n * years);
  return { futureValue, totalInterest: futureValue - principal };
}
