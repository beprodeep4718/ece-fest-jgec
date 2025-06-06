import React, { useEffect } from "react";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/assets/techtronics.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.transparent = false;
        child.material.opacity = 1;
        child.material.depthWrite = true;
        child.material.depthTest = true;
        child.material.side = THREE.DoubleSide;

        if (child.material.map) {
          child.material.map.encoding = THREE.sRGBEncoding;
        }
      }
    });
  }, [scene]);

  return (
    <primitive object={scene} scale={0.0025} position={[-0.23, -0.98, 0]} />
  );
}

export const ModelView = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.7], fov: 15 }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 6, 2]} intensity={1} />
      <Model />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={false} />
      <Environment preset="sunset" background={false} />
    </Canvas>
  );
};
