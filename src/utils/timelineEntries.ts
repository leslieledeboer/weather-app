import { DateTime } from "luxon";
import type { SolarEvent } from "@/utils/solarEvents.ts";
import type { HourlyWeather } from "@/hooks/useWeather.ts";

interface WeatherEntry {
  readonly type: "weather";
  readonly time: DateTime;
  readonly temp: number;
  readonly code: number;
  readonly isDay: boolean;
}

interface SolarEventEntry {
  readonly type: SolarEvent;
  readonly time: DateTime;
}

export type TimelineEntry = WeatherEntry | SolarEventEntry;

const SORT_ORDER_BY_ENTRY_TYPE: Record<TimelineEntry["type"], number> = {
  sunrise: 0,
  weather: 1,
  sunset: 2,
};

// Open-Meteo API returns 00:00 when the sun doesn't rise or set that day (midnight sun or polar night)
const isValidEventTime = (eventTime: DateTime): boolean => {
  return eventTime.hour !== 0 || eventTime.minute !== 0;
};

const inHourlyRange = (eventTime: DateTime, hourly: HourlyWeather[]): boolean => {
  return eventTime >= hourly[0].time && eventTime <= hourly[hourly.length - 1].time;
};

export function buildTimelineEntries(hourly: HourlyWeather[], nextSunrise: DateTime | undefined, nextSunset: DateTime | undefined): TimelineEntry[] {
  if (hourly.length === 0) return [];

  const entries: TimelineEntry[] = hourly.map(hour => ({
    type: "weather",
    time: hour.time,
    temp: hour.temp,
    code: hour.code,
    isDay: hour.isDay,
  }));

  if (nextSunrise && isValidEventTime(nextSunrise) && inHourlyRange(nextSunrise, hourly)) {
    entries.push({ type: "sunrise", time: nextSunrise });
  }

  if (nextSunset && isValidEventTime(nextSunset) && inHourlyRange(nextSunset, hourly)) {
    entries.push({ type: "sunset", time: nextSunset });
  }

  entries.sort((a, b) => a.time.toMillis() - b.time.toMillis() || SORT_ORDER_BY_ENTRY_TYPE[a.type] - SORT_ORDER_BY_ENTRY_TYPE[b.type]);

  return entries;
}