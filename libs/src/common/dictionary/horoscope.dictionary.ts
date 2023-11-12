export const zodiacSigns: {
  start: { month: number; day: number };
  end: { month: number; day: number };
  sign: string;
}[] = [
  { start: { month: 3, day: 21 }, end: { month: 4, day: 19 }, sign: 'Aries' },
  { start: { month: 4, day: 20 }, end: { month: 5, day: 20 }, sign: 'Taurus' },
  { start: { month: 5, day: 21 }, end: { month: 6, day: 21 }, sign: 'Gemini' },
  { start: { month: 6, day: 22 }, end: { month: 7, day: 22 }, sign: 'Cancer' },
  { start: { month: 7, day: 23 }, end: { month: 8, day: 22 }, sign: 'Leo' },
  { start: { month: 8, day: 23 }, end: { month: 9, day: 22 }, sign: 'Virgo' },
  { start: { month: 9, day: 23 }, end: { month: 10, day: 23 }, sign: 'Libra' },
  {
    start: { month: 10, day: 24 },
    end: { month: 11, day: 21 },
    sign: 'Scorpio',
  },
  {
    start: { month: 11, day: 22 },
    end: { month: 12, day: 21 },
    sign: 'Sagittarius',
  },
  {
    start: { month: 12, day: 22 },
    end: { month: 1, day: 19 },
    sign: 'Capricorn',
  },
  {
    start: { month: 1, day: 20 },
    end: { month: 2, day: 18 },
    sign: 'Aquarius',
  },
  { start: { month: 2, day: 19 }, end: { month: 3, day: 20 }, sign: 'Pisces' },
];

export const findZodiac = (month: number, date: number) => {
  const matchingSign = zodiacSigns.find((sign) => {
    const start = new Date(2000, sign.start.month - 1, sign.start.day);
    const end = new Date(2000, sign.end.month - 1, sign.end.day);

    const targetDate = new Date(2000, month - 1, date);

    return targetDate >= start && targetDate <= end;
  });

  return matchingSign ? matchingSign.sign : 'Tidak ditemukan zodiak';
};
