import { Suspense, useState, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import Loader from "../components/Loader"
import Island from '../models/Island'
import Sky from "../models/Sky"
import Bird from "../models/Bird"
import Plane from "../models/Plane"
import HomeInfo from "../components/HomeInfo"
import sakura from '../assets/sakura.mp3'
import { soundoff, soundon } from "../assets/icons"
function Home() {
  const audioRef = useRef(new Audio(sakura))
  audioRef.current.volume = 0.3
  audioRef.current.loop = true
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRotating, setIsRotating] = useState(false);
   const [currentStage, setCurrentStage] = useState(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    }
    return ()=>{audioRef.current.pause()}
  }, [isPlaying])
  
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
            position={planePosition}
            scale={planeScale}
          />
        </Suspense>
      </Canvas>

      <div className=" absolute bottom-2 left-2">
        <img src={!isPlaying ? soundoff : soundon} alt="sound"
        className="w-10 h-10" onClick={()=>setIsPlaying(!isPlaying)}/>
      </div>
    </section>
  );
}
export default Home