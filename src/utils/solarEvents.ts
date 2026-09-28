import type { LabeledIcon } from "@/types/LabeledIcon.ts";
import { Sunrise, Sunset } from "@/assets/icons/static/index.ts";

export type SolarEvent = "sunrise" | "sunset";

const SUNRISE: LabeledIcon = { label: "Sunrise", icon: Sunrise };
const SUNSET: LabeledIcon = { label: "Sunset", icon: Sunset };

const EVENTS_BY_NAME: Record<SolarEvent, LabeledIcon> = {
  sunrise: SUNRISE,
  sunset: SUNSET,
};

export function getSolarEvent(name: SolarEvent): LabeledIcon {
  return EVENTS_BY_NAME[name];
}