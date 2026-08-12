import type { GeolocationStatus } from "@/hooks/useGeolocation.ts";

export default function LocationView({ geolocation }: { geolocation: GeolocationStatus }) {
    if (geolocation.status === "pending") {
        return <p className="text-center text-balance">Detecting your location ...</p>;
    } else if (geolocation.status === "failed") {
        return <p className="text-center text-balance">{geolocation.message}</p>;
    }
}