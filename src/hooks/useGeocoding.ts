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
  readonly id: number;
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly population: number;
  readonly feature_code: string;
}

interface ApiResponse {
  readonly results?: ApiResult[];
}

const normalize = (s: string) => {
  return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
};

const mapData = (input: ApiResponse, query: string): ApiResult[] => {
  if (!input.results) return [];

  return input.results
    .filter(r => r.feature_code.startsWith("PPL") || r.feature_code === "STLMT")
    .filter(r => normalize(r.name).startsWith(normalize(query)))
    .sort((a, b) => b.population - a.population);
};

export function useGeocoding(query: string): GeocodingStatus {
  const [status, setStatus] = useState<GeocodingStatus>({ status: "idle" });

  useEffect(() => {
    if (!query) {
      setStatus({ status: "idle" });
      return;
    }

    const params = new URLSearchParams({
      name: query,
    });

    const url = `https://geocoding-api.open-meteo.com/v1/search?${params}`;

    const controller = new AbortController();

    const getResults = async () => {
      setStatus({ status: "pending" });

      try {
        const response = await fetch(url, { signal: controller.signal });

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
        if (error instanceof DOMException && error.name === "AbortError") return;

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

    return () => controller.abort();

  }, [query]);

  return status;
}