import { useState, useEffect } from "react";

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

const params = new URLSearchParams({
    latitude: String(32.71742),
    longitude: String(-117.162772),
    // latitude: String(-32.71742),
    // longitude: String(62.837228),
    current: "temperature_2m,is_day",
    daily: "sunrise,sunset,sunshine_duration,daylight_duration",
    temperature_unit: "fahrenheit",
    timezone: "auto",
    forecast_days: String(1),
});

const url = `https://api.open-meteo.com/v1/forecast?${params}`;

export function useWeather(): { data: WeatherData | null; loading: boolean; error: string | null } {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error — status: ${response.status}`);
                }

                const result: OpenMeteoData = await response.json();
                const mappedData = mapData(result);

                setData(mappedData);

            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                    setError(error.message);
                } else {
                    console.error("An unexpected error occurred", error);
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    return { data, loading, error };
}