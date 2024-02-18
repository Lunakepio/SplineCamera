export const CameraSpline = ({ jsonPath, speedFactor }) => {
  const { points, loading, error } = useSpline(jsonPath);
  const cam = useRef();
  const lookAtTarget = useRef();
  const [currentPoint, setCurrentPoint] = useState(0);

  useFrame(() => {
    const camera = cam.current;
    if (currentPoint < points.length - 1) {
      camera.position.lerp(points[currentPoint], speedFactor);
      camera.lookAt(points[currentPoint + 1]);

      if (camera.position.distanceTo(points[currentPoint]) < 0.1) {
        setCurrentPoint(currentPoint + 1);
      }
    } else {
      setCurrentPoint(0);
    }
  });
  return (
    <>
      <PerspectiveCamera ref={cam} makeDefault position={[0, 0, 0]} />
      <mesh ref={lookAtTarget}></mesh>
    </>
  );
};
