import { useWeather } from "./hooks/useWeather.ts";

export default function App() {
  const { data, loading, error } = useWeather();

  // guard clause approach: check loading, then error, then data

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) { // if error is not null, because null is falsy
    return <p>{error}</p>;
  }

  if (!data) { // narrows type from WeatherData | null to WeatherData
    return <p>data is null</p>;
  }

  return (
    <>
      <p>{data.temperature}</p>
      <p>{data.isDay}</p>
      <p>{data.sunrise}</p>
      <p>{data.sunset}</p>
      <p>{data.sunshineSeconds}</p>
      <p>{data.daylightSeconds}</p>
    </>
  );
}