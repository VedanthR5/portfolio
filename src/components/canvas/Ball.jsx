import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, OrbitControls, Preload, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";

// ... existing code ...
const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <>
      <ambientLight intensity={0.15} /> {/* Reduced intensity */}
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 0]} /> {/* Reduced detail level */}
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {/* Consider removing or simplifying the Decal if not necessary */}
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </>
  );
};
// ... existing code ...

const BallCanvas = ({ icon, link }) => {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  if (!link) {
    return (
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls enableZoom={false} />
          <Ball imgUrl={icon} />
        </Suspense>

        <Preload all />
      </Canvas>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls enableZoom={false} />
          <Ball imgUrl={icon} />
        </Suspense>

        <Preload all />
      </Canvas>
    </a>
  );
};

export default BallCanvas;

//2 * Math.PI, 0, 6.25
