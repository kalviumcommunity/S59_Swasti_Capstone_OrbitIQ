import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import mercuryTexture from "/8k_mercury.jpg";
import venusTexture from "/Venus.jpeg";
import earthTexture from "/Earth_Img.jpg";
import sunTexture from "/8k_sun.jpg";
import marsTexture from "/8k_mars.jpg"
import jupiterTexture from "/8k_jupiter.jpg"
import saturnTexture from "/8k_saturn.jpg"
import uranusTexture from "/2k_uranus.jpg"
import neptuneTexture from "/2k_neptune.jpg"
import saturnRingTexture from "/8k_saturn_ring.png"

const SolarSystem = () => {
  const containerRef = useRef(null);
  const cameraRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let scene, camera, renderer;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 50;
      cameraRef.current = camera;

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(renderer.domElement);

      const sunGeometry = new THREE.SphereGeometry(7, 32, 32);
      const sunTextureImage = new THREE.TextureLoader().load(sunTexture);
      const sunMaterial = new THREE.MeshPhongMaterial({ map: sunTextureImage });
      const sun = new THREE.Mesh(sunGeometry, sunMaterial);
      scene.add(sun);

      const createPlanet = (radius, texturePath, distance, speed) => {
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const texture = new THREE.TextureLoader().load(texturePath);
        const material = new THREE.MeshPhongMaterial({ map: texture });
        const planet = new THREE.Mesh(geometry, material);
        planet.distance = distance;
        planet.speed = speed;
        scene.add(planet);
        return planet;
      };

      const planets = [
        createPlanet(0.4, mercuryTexture, 11, 3),
        createPlanet(0.8, venusTexture, 14, 1.62),
        createPlanet(1, earthTexture, 18, 1),
        createPlanet(0.6, marsTexture, 22, 0.53),
        createPlanet(4, jupiterTexture, 28, 0.084),
        createPlanet(3.6, saturnTexture, 34, 0.034),
        createPlanet(1.6, uranusTexture, 40, 0.012),
        createPlanet(1.6, neptuneTexture, 46, 0.030)
      ];

      const ringGeometry = new THREE.RingGeometry(7, 10, 40);
      const ringTexture = new THREE.TextureLoader().load(saturnRingTexture);
      const ringMaterial = new THREE.MeshBasicMaterial({ map: ringTexture, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      planets[5].add(ring);

      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
      directionalLight.position.set(0, 0, 1).normalize();
      scene.add(directionalLight);

      const animate = () => {
        requestAnimationFrame(animate);
        planets.forEach(planet => {
          planet.position.x = Math.cos(Date.now() * planet.speed / 1000) * planet.distance;
          planet.position.z = Math.sin(Date.now() * planet.speed / 1000) * planet.distance;
        });
        renderer.render(scene, cameraRef.current);
      };
      animate();
    };

    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          cameraRef.current.position.x -= 5;
          break;
        case 'ArrowRight':
          cameraRef.current.position.x += 5;
          break;
        case 'ArrowUp':
          cameraRef.current.position.z -= 5;
          break;
        case 'ArrowDown':
          cameraRef.current.position.z += 5;
          break;
        case '+':
        case '=':
          cameraRef.current.position.y -= 5;
          break;
        case '-':
        case '_':
          cameraRef.current.position.y += 5;
          break;
        default:
          break;
      }
    };

    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current = { x: mouseX, y: mouseY };
    };

    init();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const updateCameraPosition = () => {
      const { x, y } = mouseRef.current;
      cameraRef.current.position.x = x * 10;
      cameraRef.current.position.y = y * 10;
    };

    window.addEventListener('mousemove', updateCameraPosition);

    
  }, []);

  return <div className="sol" style={{ height: "100vh", backgroundSize: "cover", backgroundRepeat: 'no-repeat' }} ref={containerRef} />;
};

export default SolarSystem;
