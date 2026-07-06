import { useState, useEffect, useCallback } from "react";

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
      setStatus({ status: "failed", message: "geolocation is not available" });
      return;
    }

    const getGeolocation = async () => {
      try {
        const position: GeolocationPosition = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setStatus({
          status: "succeeded",
          data: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
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

    getGeolocation();

  }, []);

  useEffect(() => {
    detectGeolocation();

  }, [detectGeolocation]);

  return [status, detectGeolocation] as const;
}