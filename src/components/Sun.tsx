import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

export default function Sun() {
    const meshRef = useRef<Mesh>(null!); // non-null assertion

    useFrame((state, delta) => {
        if (meshRef.current !== null) { // runtime check
            meshRef.current.rotation.x += delta;
            meshRef.current.rotation.y += delta;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1]} />
            <meshStandardMaterial color={"yellow"} />
        </mesh>
    );
}