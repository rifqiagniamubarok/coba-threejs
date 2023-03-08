import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { angleToRadians } from '../../utils/angle';
import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

const Three = () => {
  // const [keyPressed, setKeyPressed] = useState(false);
  // const [yCor, setYCor] = useState(0);
  // const [xCor, setXCor] = useState(0);
  const orbitControlRef = useRef(null);
  const ballRef = useRef(null);

  useEffect(() => {
    document.onkeydown = function (event) {
      // switch (event.keyCode) {
      //   case 37:
      //     setYCor(yCor - 0.1);
      //     break;
      //   case 38:
      //     setXCor(xCor + 0.1);
      //     break;
      //   case 39:
      //     setYCor(yCor + 0.1);
      //     break;
      //   case 40:
      //     setXCor(xCor - 0.1);
      //     break;
      // }
      if (event.keyCode == 32) {
        const timeline = gsap.timeline({ paused: true });
        timeline.to(ballRef.current.position, {
          y: 4,
          duration: 1,
          ease: 'power1',
        });
        timeline.to(ballRef.current.position, {
          y: 0.5,
          duration: 2,
          ease: 'bounce.out',
        });
        timeline.play();
      }
    };
  }, [document]);

  useFrame((state) => {
    // console.log(state.mouse);
    if (!!orbitControlRef.current) {
      const { x, y } = state.mouse;
      orbitControlRef.current.setAzimuthalAngle(-x * angleToRadians(45));
      orbitControlRef.current.setPolarAngle((y + 0.5) * angleToRadians(90 - 3));
      orbitControlRef.current.update();
    }
  });

  useEffect(() => {
    if (!!orbitControlRef.current) {
      console.log(orbitControlRef.current);
    }
  }, [orbitControlRef.current]);

  // Animation
  // useEffect(() => {
  //   if (!!ballRef.current) {
  //     console.log(ballRef.current);

  //     const timeline = gsap.timeline({ paused: true });
  //     timeline.to(ballRef.current.position, {
  //       x: 1,
  //       duration: 2,
  //       ease: 'power2.out',
  //     });
  //     timeline.to(
  //       ballRef.current.position,
  //       {
  //         y: 0.5,
  //         duration: 1.5,
  //         ease: 'bounce.out',
  //       },
  //       '<'
  //     );
  //     timeline.play();
  //   }
  // }, [ballRef.current]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 6]} />
      <OrbitControls ref={orbitControlRef} />

      <mesh position={[0.5, 0.5, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      <mesh rotation={[-290, 0, 0]} receiveShadow>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color="#1ea3d8" />
      </mesh>
      <ambientLight args={['#ffffff', 0.232]} />
      <spotLight
        args={['#ffffff', 6, 7, angleToRadians(30), 0.4]}
        position={[-4, 1, 0]}
        castShadow
      />
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color="#2266cc" side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  );
};
export default Three;
