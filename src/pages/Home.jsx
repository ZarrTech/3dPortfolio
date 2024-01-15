import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import Loader from "../components/Loader"
import Island from '../models/Island'
import Sky from "../models/Sky"
import Bird from "../models/Bird"
import Plane from "../models/Plane"
import HomeInfo from "../components/HomeInfo"

function Home() {
  const [isRotating, setIsRotating] = useState(false);
   const [currentStage, setCurrentStage] = useState(null);
  // ajust screenSize for island
  const ajustIslandToScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    {
      screenScale < 768
        ? (screenScale = [0.9, 0.9, 0.9])
        : (screenScale = [1, 1, 1]);
    }
    return { screenPosition, screenScale, rotation };
  };

  // ajust screenSize for plane
  const ajustPlaneToScreenSize = () => {
    let planeScale, planePosition;

    {
      planeScale && planePosition < 768
        ? ((planeScale = [0.1, 0.1, 0.1]), (planePosition = [0, -1.5, 0]))
        : ((planeScale = [3, 3, 3]), (planePosition = [0, -4, -4]));
    }
    return { planePosition, planeScale };
  };

  // distructoring from ajust screenSize for island
  const { screenPosition, screenScale, rotation } = ajustIslandToScreenSize();

  // distructoring from ajust screenSize for plane
  const { planePosition, planeScale } = ajustPlaneToScreenSize();

  return (
    <section className="relative w-full h-screen">
      <div className=" absolute top-28 right-0 left-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[4, 1, 1]} intensity={3} />
          <ambientLight intensity={0.4} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />

          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            position={screenPosition}
            scale={screenScale}
            rotation={rotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            rotation={[0, 20, 0]}
            planePositionposition={planePosition}
            planeScalescale={planeScale}
          />
        </Suspense>
      </Canvas>
    </section>
  );
}
export default Home