import { useState, useEffect } from "react";

interface Idle {
  status: "idle";
}

interface Pending {
  status: "pending";
}

interface Succeeded {
  status: "succeeded";
  data: ApiResult[];
}

interface Failed {
  status: "failed";
  message: string;
}

export type GeocodingStatus = Idle | Pending | Succeeded | Failed;

interface ApiResult {
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly population: number;
}

interface ApiResponse {
  readonly results?: ApiResult[];
}

const mapData = (input: ApiResponse, query: string): ApiResult[] => {
  if (!input.results) return [];

  return input.results
    .filter(r => r.name.startsWith(query))
    .sort((a, b) => b.population - a.population);
};

export function useGeocoding(query: string): GeocodingStatus {
  const [status, setStatus] = useState<GeocodingStatus>({ status: "idle" });

  useEffect(() => {
    if (!query) return;

    const params = new URLSearchParams({
      name: query,
    });

    const url = `https://geocoding-api.open-meteo.com/v1/search?${params}`;

    const getResults = async () => {
      setStatus({ status: "pending" });

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error — status: ${response.status}`);
        }

        const responseData: ApiResponse = await response.json();

        const mappedData = mapData(responseData, query);

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

    getResults();

  }, [query]);

  return status;
}