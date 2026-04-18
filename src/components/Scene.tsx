import Sun from "./Sun";
import Moon from "./Moon";

export default function Scene({ isDay }: { isDay: boolean }) {
    return (
        <>
            {isDay ? <Sun /> : <Moon />}
        </>
    );
}