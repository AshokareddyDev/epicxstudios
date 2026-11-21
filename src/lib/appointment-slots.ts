export const SLOT_TIMES = ["10:00", "11:30", "14:00", "15:30", "17:00"] as const;

export type SlotTime = (typeof SLOT_TIMES)[number];

export const HORIZON_DAYS = 28;

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function kolkataToday(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function addDays(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function weekdayIndex(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

export function isSlotTime(value: string): value is SlotTime {
  return (SLOT_TIMES as readonly string[]).includes(value);
}

export function isOpenDay(iso: string, today = kolkataToday()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const weekday = weekdayIndex(iso);
  if (weekday === 0 || weekday === 6) return false;
  if (iso < today) return false;
  return iso <= addDays(today, HORIZON_DAYS);
}

export function monthLabel(year: number, month: number) {
  return `${MONTHS[month]} ${year}`;
}

export function dayName(iso: string) {
  const index = weekdayIndex(iso);
  const mondayFirst = index === 0 ? 6 : index - 1;
  return WEEKDAYS[mondayFirst];
}

export function longDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${dayName(iso)} ${day} ${MONTHS[month - 1]} ${year}`;
}

export const WEEK_LABELS = WEEKDAYS;
