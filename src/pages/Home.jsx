import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import Loader from "../components/Loader"
import Island from '../models/Island'

function Home() {

  const ajustIslandToScreenSize = () => {
    let screenSale = null
    let screenPosition = [0, -6.5, -43]
    let rotation = [0.1, 4.7, 0]

    { screenSale  < 768
      ? screenSale= [0.9, 0.9, 0.9] 
      : screenSale=[1, 1, 1];
    }
    return {screenPosition, screenSale, rotation}
  }

  const {screenPosition, screenSale, rotation} = ajustIslandToScreenSize()


  return (
    <section className=" w-full h-screen relative">
      <Canvas
        className='w-full h-screen bg-transparent'
        camera={{near: 0.1, far: 1000}}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight />
          <ambientLight />
          <pointLight />
          <spotLight />
          <hemisphereLight />
          
          <Island
            position={screenPosition}
            scale={screenSale}
            rotation={rotation}
          />
        </Suspense>


      </Canvas>
      
 </section>
  )
}
export default Home