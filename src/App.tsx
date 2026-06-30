import { useGeolocation } from "./hooks/useGeolocation.ts";
import { useWeather } from "./hooks/useWeather.ts";

export default function App() {
  const geolocation = useGeolocation();

  const coordinates = geolocation.status === "succeeded" ? geolocation.data : null;

  const weather = useWeather(coordinates);

  if (geolocation.status === "pending") {
    return <p>Detecting your location ...</p>;
  }

  if (geolocation.status === "failed") {
    return <p>Could not get your location: {geolocation.message}</p>;
  }

  if (weather.status === "idle" || weather.status === "pending") {
    return <p>Loading weather data ...</p>;
  }

  if (weather.status === "failed") {
    return <p>Could not get weather data: {weather.message}</p>;
  }

  const now = new Date();

  const formattedDate = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const formattedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "numeric", hour12: true });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-4 text-center">
      <div className="py-1 rounded text-3xl bg-gray-200">
        {formattedDate}
      </div>

      <div className="py-1 rounded text-6xl bg-gray-200">
        {formattedTime}
      </div>

      <div className="py-1 rounded text-xl bg-gray-200">
        {`(${geolocation.data.latitude}, ${geolocation.data.longitude})`}
      </div>

      <div className="scrollbar-hidden overflow-x-auto flex gap-6 p-4 rounded bg-gray-200">
        {weather.data.hourly.map((h, i) => (
          <div key={i} className="aspect-square flex flex-col shrink-0 justify-center w-24 rounded bg-gray-400">
            <p>{h.time.toLocaleTimeString("en-US", { hour: "numeric", hour12: true })}</p>
            <p>{h.temp}</p>
            <p>{h.code}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 p-4 rounded bg-gray-200">
        <div className="p-4 rounded bg-gray-400">
          <p>Temperature: {weather.data.currentTemp}</p>
          <p>Weather Code: {weather.data.currentCode}</p>
          <p>Is Day: {String(weather.data.isDay)}</p>
          <p>Next Sunrise: {weather.data.sunrise?.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}</p>
          <p>Next Sunset: {weather.data.sunset?.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}</p>
        </div>

        <div className="p-4 rounded bg-gray-400">

        </div>

        <div className="p-4 rounded bg-gray-400">

        </div>
      </div>
    </div>
  );
}