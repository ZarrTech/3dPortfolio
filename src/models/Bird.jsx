import { useAnimations, useGLTF } from '@react-three/drei'
import birdscene from '../assets/3d/bird.glb'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber';


function Bird() {
     const birdRef = useRef();
    const { scene, animations } = useGLTF(birdscene)
    const {actions} = useAnimations(animations, birdRef)
   

    useEffect(() => {
        actions['Take 001'].play();
    },[])

    useFrame(({clock, camera}) => {
        // update the Y position to simulate bird like motion using sine wave
        birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2

        // check if the bird reached a certain endpoint relative to the camera
        if (birdRef.current.position.x > camera.position.x + 10) {
            // change direction to backwards and rotate the bird 180 degree on the y-axis
            birdRef.current.rotation.y = Math.PI
        } else if (birdRef.current.position.x < camera.position.x - 10) {
            // chnage direction to forward and reset te bird rotation
            birdRef.current.rotation.y = 0
        }

        // update the x and z positions based on the direction
        if (birdRef.current.rotation.y === 0) {
            // moving forward
            birdRef.current.position.x += 0.01
            birdRef.current.position.z -= 0.01;
        } else {
          // moving backwards
          birdRef.current.position.x -= 0.01;
          birdRef.current.position.z += 0.01;
        }
    })

  return (
      <mesh ref={birdRef} position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]}>
          <primitive object={scene}/>
    </mesh>
  )
}
export default Bird