"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function House3D(props) {
	const { scene } = useGLTF("/3d-models/house.glb");

	useFrame((state, delta) => {
		scene.rotation.y += delta;
	});

	return <primitive object={scene} {...props} />;
}
