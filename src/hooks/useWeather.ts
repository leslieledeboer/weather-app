import { useState, useEffect } from "react";
import type { GeoCoordinates } from "./useGeolocation.ts";

interface Idle {
  status: "idle";
}

interface Pending {
  status: "pending";
}

interface Succeeded {
  status: "succeeded";
  data: WeatherData;
}

interface Failed {
  status: "failed";
  message: string;
}

export type WeatherStatus = Idle | Pending | Succeeded | Failed;

interface Current {
  readonly temperature_2m: number;
  readonly is_day: number;
}

interface Daily {
  readonly sunrise: string[];
  readonly sunset: string[];
  readonly sunshine_duration: number[];
  readonly daylight_duration: number[];
}

interface OpenMeteoData {
  readonly timezone: string;
  readonly timezone_abbreviation: string;
  readonly current: Current;
  readonly daily: Daily;
}

interface WeatherData {
  readonly timezoneLong: string;
  readonly timezoneShort: string;
  readonly temperature: number;
  readonly isDay: boolean;
  readonly sunrise: string;
  readonly sunset: string;
  readonly sunshineSeconds: number;
  readonly daylightSeconds: number;
}

const mapData = (input: OpenMeteoData): WeatherData => ({
  timezoneLong: input.timezone,
  timezoneShort: input.timezone_abbreviation,
  temperature: input.current.temperature_2m,
  isDay: input.current.is_day === 1,
  sunrise: input.daily.sunrise[0],
  sunset: input.daily.sunset[0],
  sunshineSeconds: input.daily.sunshine_duration[0],
  daylightSeconds: input.daily.daylight_duration[0],
});

export function useWeather(coordinates: GeoCoordinates | null): WeatherStatus {
  const [status, setStatus] = useState<WeatherStatus>({ status: "idle" });

  useEffect(() => {
    if (!coordinates) return;

    const params = new URLSearchParams({
      latitude: String(coordinates.latitude),
      longitude: String(coordinates.longitude),
      current: "temperature_2m,is_day",
      daily: "sunrise,sunset,sunshine_duration,daylight_duration",
      temperature_unit: "fahrenheit",
      timezone: "auto",
      forecast_days: "1",
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params}`;

    const getWeather = async () => {
      setStatus({ status: "pending" });

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error — status: ${response.status}`);
        }

        const result: OpenMeteoData = await response.json();
        const mappedData = mapData(result);

        setStatus({
          status: "succeeded",
          data: mappedData,
        });

      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setStatus({ status: "failed", message: error.message });
        } else {
          console.error("An unexpected error occurred", error);
          setStatus({ status: "failed", message: "An unexpected error occurred" });
        }
      }
    };

    getWeather();

  }, [coordinates]);

  return status;
}