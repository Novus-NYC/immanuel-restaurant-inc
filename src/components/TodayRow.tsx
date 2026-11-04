'use client';
import { useEffect, useState } from 'react';

// Highlights today's row in New York time after hydration (the server cannot know "today").
export function TodayRow({ dayIndex, children }: { dayIndex: number; children: React.ReactNode }) {
  const [today, setToday] = useState(false);
  useEffect(() => {
    const name = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'America/New_York' }).format(new Date());
    const idx = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(name);
    setToday(idx === dayIndex);
  }, [dayIndex]);
  return <tr className={today ? 'is-today' : undefined}>{children}</tr>;
}
