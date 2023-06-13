import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  const formattedProgress = progress.toFixed(2);

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        marginTop: 100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#F1F1F1",
      }}
    >
      <span className="canvas-loader"></span>
      <p
        style={{
          fontSize: 14,
          color: "#b05fd9",
          fontWeight: 800,
          marginTop: 60,
        }}
      >
        Booting up my computer... {formattedProgress}%
      </p>
    </Html>
  );
};

export default CanvasLoader;
