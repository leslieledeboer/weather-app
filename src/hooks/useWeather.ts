import { useState, useEffect } from "react";
import type { GeoCoordinates } from "@/hooks/useGeolocation.ts";

interface Idle {
  status: "idle";
}

interface Pending {
  status: "pending";
}

interface Succeeded {
  status: "succeeded";
  data: Weather;
}

interface Failed {
  status: "failed";
  message: string;
}

export type WeatherStatus = Idle | Pending | Succeeded | Failed;

interface ApiCurrent {
  readonly apparent_temperature: number;
  readonly weather_code: number;
  readonly is_day: number;
}

interface ApiDaily {
  readonly sunrise: string[];
  readonly sunset: string[];
}

interface ApiHourly {
  readonly apparent_temperature: number[];
  readonly weather_code: number[];
  readonly time: string[];
}

interface ApiResponse {
  readonly current: ApiCurrent;
  readonly daily: ApiDaily;
  readonly hourly: ApiHourly;
}

export interface HourlyWeather {
  readonly temp: number;
  readonly code: number;
  readonly time: Date;
}

interface Weather {
  readonly currentTemp: number;
  readonly currentCode: number;
  readonly isDay: boolean;
  readonly sunrise: Date | undefined;
  readonly sunset: Date | undefined;
  readonly hourly: HourlyWeather[];
}

const mapData = (input: ApiResponse): Weather => {
  const now = new Date();

  return {
    currentTemp: Math.round(input.current.apparent_temperature),
    currentCode: input.current.weather_code,
    isDay: input.current.is_day === 1,
    sunrise: input.daily.sunrise.map(s => new Date(s)).find(d => d > now),
    sunset: input.daily.sunset.map(s => new Date(s)).find(d => d > now),
    hourly: input.hourly.apparent_temperature.map((temp, i) => ({
      temp: Math.round(temp),
      code: input.hourly.weather_code[i],
      time: new Date(input.hourly.time[i]),
    })),
  };
};

export function useWeather(coordinates: GeoCoordinates | null): WeatherStatus {
  const [status, setStatus] = useState<WeatherStatus>({ status: "idle" });

  useEffect(() => {
    if (!coordinates) return;

    const params = new URLSearchParams({
      latitude: String(coordinates.latitude),
      longitude: String(coordinates.longitude),
      current: "apparent_temperature,weather_code,is_day",
      daily: "sunrise,sunset",
      hourly: "apparent_temperature,weather_code",
      temperature_unit: "fahrenheit",
      timezone: "auto",
      forecast_days: "2",
      forecast_hours: "24",
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params}`;

    const getWeather = async () => {
      setStatus({ status: "pending" });

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error — status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();

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