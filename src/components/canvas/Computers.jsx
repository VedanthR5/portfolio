import { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const meshRef = useRef();

  // Memoize scale and position to prevent unnecessary re-renders
  const { scale, position } = useMemo(
    () => ({
      scale: isMobile ? 0.3 : 0.8,
      position: isMobile ? [0, -2.5, -2.2] : [0, -2.25, 1],
    }),
    [isMobile]
  );

  // Optimize materials for performance
  useEffect(() => {
    if (computer.scene) {
      computer.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false;
          child.receiveShadow = false;
          if (child.material) {
            child.material.transparent = false;
            child.material.alphaTest = 0;
            child.material.needsUpdate = false;
          }
        }
      });
    }
  }, [computer]);

  return (
    <mesh ref={meshRef}>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.6}
        castShadow={false}
      />
      <primitive
        object={computer.scene}
        scale={scale}
        position={position}
        rotation={[-0.01, -0.3, -0.1]}
        castShadow={false}
        receiveShadow={false}
      />
    </mesh>
  );
};

Computers.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef();

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) {
    return (
      <div
        ref={canvasRef}
        className="absolute top-16 right-0 w-1/2 h-[calc(100%-4rem)]"
      />
    );
  }

  return (
    <div
      ref={canvasRef}
      className="absolute top-16 right-0 w-1/2 h-[calc(100%-4rem)]"
    >
      <Canvas
        frameloop="never"
        shadows={false}
        dpr={[0.5, 1]}
        camera={{ position: [20, 3, 5], fov: 35 }}
        gl={{
          preserveDrawingBuffer: false,
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: false,
        }}
        performance={{ min: 0.1, max: 0.5, debounce: 200 }}
        onCreated={(state) => {
          state.gl.setClearColor(0x000000, 0);
          state.gl.physicallyCorrectLights = false;
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate={false}
            enableDamping={false}
          />
          <Computers isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
