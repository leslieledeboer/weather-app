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

  return (
    <>
      <p>Latitude: {geolocation.data.latitude}</p>
      <p>Longitude: {geolocation.data.longitude}</p>
      <p>Timezone: {weather.data.timezoneLong}</p>
      <p>Timezone Abbreviation: {weather.data.timezoneShort}</p>
      <p>Temperature: {weather.data.temperature}</p>
      <p>Is Day: {String(weather.data.isDay)}</p>
      <p>Sunrise: {weather.data.sunrise}</p>
      <p>Sunset: {weather.data.sunset}</p>
      <p>Seconds of sunshine: {weather.data.sunshineSeconds}</p>
      <p>Seconds of daylight: {weather.data.daylightSeconds}</p>
    </>
  );
}