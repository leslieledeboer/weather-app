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
  readonly temperature_2m: number;
  readonly relative_humidity_2m: number;
  readonly wind_speed_10m: number;
  readonly weather_code: number;
  readonly is_day: number;
}

interface ApiDaily {
  readonly sunrise: string[];
  readonly sunset: string[];
}

interface ApiHourly {
  readonly temperature_2m: number[];
  readonly relative_humidity_2m: number[];
  readonly wind_speed_10m: number[];
  readonly weather_code: number[];
  readonly time: string[];
}

interface ApiResponse {
  readonly current: ApiCurrent;
  readonly daily: ApiDaily;
  readonly hourly: ApiHourly;
}

export interface CurrentWeather {
  readonly temp: number;
  readonly apparentTemp: number;
  readonly code: number;
  readonly isDay: boolean;
  readonly nextSunrise: Date | undefined;
  readonly nextSunset: Date | undefined;
}

export interface HourlyWeather {
  readonly temp: number;
  readonly apparentTemp: number;
  readonly code: number;
  readonly time: Date;
}

interface Weather {
  readonly current: CurrentWeather;
  readonly hourly: HourlyWeather[];
}

const calcWindChill = (temp: number, wind: number): number => {
  const windPow016 = wind ** 0.16;

  return 35.74 + (0.6215 * temp) - (35.75 * windPow016) + (0.4275 * temp * windPow016);
};

const calcHeatIndex = (temp: number, rh: number): number => {
  const steadman = 0.5 * (temp + 61 + ((temp - 68) * 1.2) + (rh * 0.094));

  if ((steadman + temp) / 2 < 80) return steadman;

  let heatIndex =
    -42.379 +
    (2.04901523 * temp) +
    (10.14333127 * rh) -
    (0.22475541 * temp * rh) -
    (0.00683783 * temp * temp) -
    (0.05481717 * rh * rh) +
    (0.00122874 * temp * temp * rh) +
    (0.00085282 * temp * rh * rh) -
    (0.00000199 * temp * temp * rh * rh);

  if (rh < 13 && temp >= 80 && temp <= 112) {
    heatIndex -= ((13 - rh) / 4) * Math.sqrt((17 - Math.abs(temp - 95)) / 17);
  } else if (rh > 85 && temp >= 80 && temp <= 87) {
    heatIndex += ((rh - 85) / 10) * ((87 - temp) / 5);
  }

  return heatIndex;
};

const calcApparentTemp = (temp: number, rh: number, wind: number): number => {
  if (temp <= 50 && wind > 3) return calcWindChill(temp, wind);

  if (temp >= 80) return Math.max(temp, calcHeatIndex(temp, rh));

  return temp;
};

const mapData = (input: ApiResponse): Weather => {
  const now = new Date();
  const c = input.current;
  const d = input.daily;
  const h = input.hourly;

  return {
    current: {
      temp: Math.round(c.temperature_2m),
      apparentTemp: Math.round(calcApparentTemp(c.temperature_2m, c.relative_humidity_2m, c.wind_speed_10m)),
      code: c.weather_code,
      isDay: c.is_day === 1,
      nextSunrise: d.sunrise.map(s => new Date(s)).find(d => d > now),
      nextSunset: d.sunset.map(s => new Date(s)).find(d => d > now),
    },
    hourly: h.temperature_2m.map((temp, i) => ({
      temp: Math.round(temp),
      apparentTemp: Math.round(calcApparentTemp(temp, h.relative_humidity_2m[i], h.wind_speed_10m[i])),
      code: h.weather_code[i],
      time: new Date(h.time[i]),
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
      current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day",
      daily: "sunrise,sunset",
      hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
      temperature_unit: "fahrenheit",
      wind_speed_unit: "mph",
      timezone: "auto",
      forecast_days: "2", // second day is used to find next sunrise/sunset if today's have passed
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

        const responseData: ApiResponse = await response.json();

        const mappedData = mapData(responseData);

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