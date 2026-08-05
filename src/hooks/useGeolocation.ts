import { useState, useEffect, useCallback } from "react";
import { getGeolocationMessage } from "@/utils/geolocationMessages.ts";

interface Pending {
  status: "pending";
}

interface Succeeded {
  status: "succeeded";
  data: GeoCoordinates;
}

interface Failed {
  status: "failed";
  message: string;
}

export type GeolocationStatus = Pending | Succeeded | Failed;

export interface GeoCoordinates {
  readonly latitude: number;
  readonly longitude: number;
}

export function useGeolocation() {
  const [status, setStatus] = useState<GeolocationStatus>({ status: "pending" });

  const detectGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus({ status: "failed", message: "Geolocation is not available — search for a city instead" });
      return;
    }

    const getGeolocation = async () => {
      try {
        const position: GeolocationPosition = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            maximumAge: 300000, // 5 minutes (accepts recent cache)
            timeout: 10000, // 10 seconds for device to respond
            enableHighAccuracy: false, // city-level accuracy is enough
          });
        });

        setStatus({
          status: "succeeded",
          data: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });

      } catch (error) {
        const deniedByUser = error instanceof GeolocationPositionError && error.code === GeolocationPositionError.PERMISSION_DENIED;

        if (!deniedByUser) console.error(error);

        setStatus({ status: "failed", message: getGeolocationMessage(error) });
      }
    };

    getGeolocation();

  }, []);

  useEffect(() => {
    detectGeolocation();

  }, [detectGeolocation]);

  return [status, detectGeolocation] as const;
}