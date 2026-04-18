import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useWeather } from "./hooks/useWeather";
import Scene from "./components/Scene";

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
      <p>Timezone: {data.timezoneLong}</p>
      <p>Timezone Abbreviation: {data.timezoneShort}</p>
      <p>Temperature: {data.temperature}</p>
      <p>Is Day: {data.isDay ? "true" : "false"}</p>
      <p>Sunrise: {data.sunrise}</p>
      <p>Sunset: {data.sunset}</p>
      <p>Seconds of sunshine: {data.sunshineSeconds}</p>
      <p>Seconds of daylight: {data.daylightSeconds}</p>

      <div className="h-dvh">
        <Canvas>
          <Suspense fallback={null}>
            <Scene isDay={data.isDay} />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}