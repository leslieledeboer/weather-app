interface WeatherCondition {
  label: string;
  icon?: string;
  dayLabel?: string;
  dayIcon?: string;
}

const CLEAR: WeatherCondition = { label: "Clear", dayLabel: "Sunny" };
const MOSTLY_CLEAR: WeatherCondition = { label: "Mostly Clear", dayLabel: "Mostly Sunny" };
const PARTLY_CLOUDY: WeatherCondition = { label: "Partly Cloudy" };
const CLOUDY: WeatherCondition = { label: "Cloudy" };
const FOG: WeatherCondition = { label: "Fog" };
const DRIZZLE: WeatherCondition = { label: "Drizzle" };
const FREEZING_DRIZZLE: WeatherCondition = { label: "Freezing Drizzle" };
const RAIN: WeatherCondition = { label: "Rain" };
const HEAVY_RAIN: WeatherCondition = { label: "Heavy Rain" };
const FREEZING_RAIN: WeatherCondition = { label: "Freezing Rain" };
const SNOW: WeatherCondition = { label: "Snow" };
const HEAVY_SNOW: WeatherCondition = { label: "Heavy Snow" };
const THUNDERSTORM: WeatherCondition = { label: "Thunderstorm" };

const CONDITIONS_BY_CODE: Record<number, WeatherCondition> = {
  0: CLEAR,
  1: MOSTLY_CLEAR,
  2: PARTLY_CLOUDY,
  3: CLOUDY,
  45: FOG,
  48: FOG,
  51: DRIZZLE,
  53: DRIZZLE,
  55: DRIZZLE,
  56: FREEZING_DRIZZLE,
  57: FREEZING_DRIZZLE,
  61: RAIN,
  63: RAIN,
  65: HEAVY_RAIN,
  66: FREEZING_RAIN,
  67: FREEZING_RAIN,
  71: SNOW,
  73: SNOW,
  75: HEAVY_SNOW,
  77: SNOW,
  80: RAIN,
  81: RAIN,
  82: HEAVY_RAIN,
  85: SNOW,
  86: HEAVY_SNOW,
  95: THUNDERSTORM,
  96: THUNDERSTORM,
  99: THUNDERSTORM,
};

export function getCondition(code: number, isDay: boolean): { label: string } {
  const condition = CONDITIONS_BY_CODE[code];

  if (!condition) return { label: "—" };

  if (isDay && condition.dayLabel) return { label: condition.dayLabel };

  return { label: condition.label };
}