import type { LabeledIcon } from "@/types/LabeledIcon.ts";
import * as Animated from "@/assets/icons/animated/index.ts";
import * as Static from "@/assets/icons/static/index.ts";

type IconVariant = "animated" | "static";
type IconName = keyof typeof Animated & keyof typeof Static;

interface WeatherCondition {
  label: string;
  icon: IconName;
  dayLabel?: string;
  dayIcon?: IconName;
}

const ICON_SETS = { animated: Animated, static: Static };

const CLEAR: WeatherCondition = { label: "Clear", icon: "ClearNight", dayLabel: "Sunny", dayIcon: "ClearDay" };
const MOSTLY_CLEAR: WeatherCondition = { label: "Mostly Clear", icon: "ClearNight", dayLabel: "Mostly Sunny", dayIcon: "ClearDay" };
const PARTLY_CLOUDY: WeatherCondition = { label: "Partly Cloudy", icon: "PartlyCloudyNight", dayIcon: "PartlyCloudyDay" };
const CLOUDY: WeatherCondition = { label: "Cloudy", icon: "Cloudy" };
const FOG: WeatherCondition = { label: "Fog", icon: "Fog" };
const DRIZZLE: WeatherCondition = { label: "Drizzle", icon: "Drizzle" };
const FREEZING_DRIZZLE: WeatherCondition = { label: "Freezing Drizzle", icon: "Sleet" };
const RAIN: WeatherCondition = { label: "Rain", icon: "Rain" };
const HEAVY_RAIN: WeatherCondition = { label: "Heavy Rain", icon: "HeavyRain" };
const FREEZING_RAIN: WeatherCondition = { label: "Freezing Rain", icon: "Sleet" };
const SNOW: WeatherCondition = { label: "Snow", icon: "Snow" };
const HEAVY_SNOW: WeatherCondition = { label: "Heavy Snow", icon: "HeavySnow" };
const THUNDERSTORM: WeatherCondition = { label: "Thunderstorm", icon: "Thunderstorm" };
const NOT_AVAILABLE: WeatherCondition = { label: "—", icon: "NotAvailable" };

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

export function lookupWeatherCondition(code: number, isDay: boolean): { label: string, icon: IconName } {
  const condition = CONDITIONS_BY_CODE[code];

  if (!condition) return NOT_AVAILABLE;

  const conditionLabel = isDay && condition.dayLabel ? condition.dayLabel : condition.label;
  const conditionIcon = isDay && condition.dayIcon ? condition.dayIcon : condition.icon;

  return { label: conditionLabel, icon: conditionIcon };
}

export function getWeatherConditionIcon(code: number, isDay: boolean, variant: IconVariant): LabeledIcon {
  const { label, icon } = lookupWeatherCondition(code, isDay);

  return { label, icon: ICON_SETS[variant][icon] };
}