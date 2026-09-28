import type { Icon, LabeledIcon } from "@/types/LabeledIcon.ts";
import * as Animated from "@/assets/icons/animated/index.ts";
import * as Static from "@/assets/icons/static/index.ts";

type IconVariant = "animated" | "static";
type IconPair = Record<IconVariant, Icon>;

interface WeatherCondition {
  label: string;
  icon: IconPair;
  dayLabel?: string;
  dayIcon?: IconPair;
}

const NOT_AVAILABLE: IconPair = { animated: Animated.NotAvailable, static: Static.NotAvailable };

const CLEAR: WeatherCondition = {
  label: "Clear",
  icon: { animated: Animated.ClearNight, static: Static.ClearNight },
  dayLabel: "Sunny",
  dayIcon: { animated: Animated.ClearDay, static: Static.ClearDay },
};

const MOSTLY_CLEAR: WeatherCondition = {
  label: "Mostly Clear",
  icon: { animated: Animated.ClearNight, static: Static.ClearNight },
  dayLabel: "Mostly Sunny",
  dayIcon: { animated: Animated.ClearDay, static: Static.ClearDay },
};

const PARTLY_CLOUDY: WeatherCondition = {
  label: "Partly Cloudy",
  icon: { animated: Animated.PartlyCloudyNight, static: Static.PartlyCloudyNight },
  dayIcon: { animated: Animated.PartlyCloudyDay, static: Static.PartlyCloudyDay },
};

const CLOUDY: WeatherCondition = {
  label: "Cloudy",
  icon: { animated: Animated.Cloudy, static: Static.Cloudy },
};

const FOG: WeatherCondition = {
  label: "Fog",
  icon: { animated: Animated.Fog, static: Static.Fog },
};

const DRIZZLE: WeatherCondition = {
  label: "Drizzle",
  icon: { animated: Animated.Drizzle, static: Static.Drizzle },
};

const FREEZING_DRIZZLE: WeatherCondition = {
  label: "Freezing Drizzle",
  icon: { animated: Animated.Sleet, static: Static.Sleet },
};

const RAIN: WeatherCondition = {
  label: "Rain",
  icon: { animated: Animated.Rain, static: Static.Rain },
};

const HEAVY_RAIN: WeatherCondition = {
  label: "Heavy Rain",
  icon: { animated: Animated.HeavyRain, static: Static.HeavyRain },
};

const FREEZING_RAIN: WeatherCondition = {
  label: "Freezing Rain",
  icon: { animated: Animated.Sleet, static: Static.Sleet },
};

const SNOW: WeatherCondition = {
  label: "Snow",
  icon: { animated: Animated.Snow, static: Static.Snow },
};

const HEAVY_SNOW: WeatherCondition = {
  label: "Heavy Snow",
  icon: { animated: Animated.HeavySnow, static: Static.HeavySnow },
};

const THUNDERSTORM: WeatherCondition = {
  label: "Thunderstorm",
  icon: { animated: Animated.Thunderstorm, static: Static.Thunderstorm },
};

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

export function getWeatherCondition(code: number, isDay: boolean, variant: IconVariant): LabeledIcon {
  const condition = CONDITIONS_BY_CODE[code];

  if (!condition) return { label: "—", icon: NOT_AVAILABLE[variant] };

  const conditionLabel = isDay && condition.dayLabel ? condition.dayLabel : condition.label;
  const conditionIcon = isDay && condition.dayIcon ? condition.dayIcon[variant] : condition.icon[variant];

  return { label: conditionLabel, icon: conditionIcon };
}