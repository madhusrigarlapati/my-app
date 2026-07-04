export function calculateTip(bill: number, tipPercent: number, people: number) {
  const tip = bill * (tipPercent / 100);
  const total = bill + tip;
  const peopleCount = Math.max(1, people || 1);
  return { tipAmount: tip, total, perPerson: total / peopleCount };
}

function diffYmd(start: Date, end: Date) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export function calculateDateDiff(startDateStr: string, endDateStr: string) {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return null;
  }

  const [from, to] = start <= end ? [start, end] : [end, start];
  const { years, months, days } = diffYmd(from, to);
  const totalDays = Math.round(
    (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
  );

  return { years, months, days, totalDays };
}
