import { describe, test, expect } from "vitest";
import { lookupWeatherCondition, getWeatherConditionIcon } from "@/utils/weatherConditions.ts";
import * as Animated from "@/assets/icons/animated/index.ts";
import * as Static from "@/assets/icons/static/index.ts";

describe("lookupWeatherCondition", () => {
  test("returns the day label and day icon when it is day", () => {
    expect(lookupWeatherCondition(0, true)).toEqual({ label: "Sunny", icon: "ClearDay" });
  });

  test("returns the default label and default icon when it is night", () => {
    expect(lookupWeatherCondition(0, false)).toEqual({ label: "Clear", icon: "ClearNight" });
  });

  test("returns the default label and day icon when there is no day label", () => {
    expect(lookupWeatherCondition(2, true)).toEqual({ label: "Partly Cloudy", icon: "PartlyCloudyDay" });
  });

  test("returns the same result day and night when there is no day label or icon", () => {
    expect(lookupWeatherCondition(3, true)).toEqual(lookupWeatherCondition(3, false));
  });

  test("returns the placeholder when the code is unknown", () => {
    expect(lookupWeatherCondition(100, true)).toEqual({ label: "—", icon: "NotAvailable" });
  });
});

describe("getWeatherConditionIcon", () => {
  test("returns the icon component from the icon set named by the variant", () => {
    expect(getWeatherConditionIcon(0, true, "animated").icon).toBe(Animated.ClearDay);
    expect(getWeatherConditionIcon(0, true, "static").icon).toBe(Static.ClearDay);
  });
});