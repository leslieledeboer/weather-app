import type { LabeledIcon } from "@/types/LabeledIcon.ts";
import { Sunrise, Sunset } from "@/assets/icons/static/index.ts";

export type SolarEvent = "sunrise" | "sunset";

const SUNRISE: LabeledIcon = { label: "Sunrise", icon: Sunrise };
const SUNSET: LabeledIcon = { label: "Sunset", icon: Sunset };

const SOLAR_EVENTS = { sunrise: SUNRISE, sunset: SUNSET };

export function getSolarEventIcon(name: SolarEvent): LabeledIcon {
  return SOLAR_EVENTS[name];
}