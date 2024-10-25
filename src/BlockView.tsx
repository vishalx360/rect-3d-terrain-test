import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import stringToColor from "string-to-color";

const data = [
  { 'value': 57, 'label': 'good', 'color': '#FAEBD7' },
  { 'value': 96, 'label': 'thank', 'color': '#FAEBD7' },
  { 'value': 203, 'label': 'nifco', 'color': '#FAEBD7' },
  { 'value': 227, 'label': '2024', 'color': '#FAEBD7' },
  { 'value': 98, 'label': 'amto:', 'color': '#FAEBD7' },
  { 'value': 107, 'label': 'pmto:', 'color': '#FAEBD7' },
  { 'value': 103, 'label': 'report', 'color': '#FAEBD7' },
  { 'value': 126, 'label': 'need', 'color': '#FAEBD7' },
  { 'value': 66, 'label': 'get', 'color': '#FAEBD7' },
  { 'value': 67, 'label': 'robinett', 'color': '#FAEBD7' },
  { 'value': 101, 'label': 'canal', 'color': '#FAEBD7' },
  { 'value': 123, 'label': 'winchester,', 'color': '#FAEBD7' },
  { 'value': 59, 'label': 'orders', 'color': '#FAEBD7' },
  { 'value': 57, 'label': 'alvidrez,', 'color': '#FAEBD7' },
  { 'value': 60, 'label': 'coral', 'color': '#FAEBD7' },
  { 'value': 74, 'label': 'customer', 'color': '#FAEBD7' },
  { 'value': 60, 'label': 'de', 'color': '#FAEBD7' },
  { 'value': 59, 'label': 'email', 'color': '#FAEBD7' },
  { 'value': 97, 'label': 'oracle', 'color': '#FAEBD7' },
  { 'value': 97, 'label': 'dove', 'color': '#FAEBD7' },
  { 'value': 90, 'label': 'access', 'color': '#FAEBD7' },
  { 'value': 89, 'label': 'ncm', 'color': '#FAEBD7' },
  { 'value': 104, 'label': 'america', 'color': '#FAEBD7' },
  { 'value': 56, 'label': 'august', 'color': '#FAEBD7' },
  { 'value': 52, 'label': 'request', 'color': '#FAEBD7' },
  { 'value': 58, 'label': 'order', 'color': '#FAEBD7' },
  { 'value': 111, 'label': 'numbers', 'color': '#FAEBD7' },
  { 'value': 90, 'label': 'new', 'color': '#FAEBD7' },
  { 'value': 58, 'label': 'horn,', 'color': '#FAEBD7' },
  { 'value': 59, 'label': 'tracy', 'color': '#FAEBD7' },
  { 'value': 55, 'label': 'supplier', 'color': '#FAEBD7' },
  { 'value': 5, 'label': 'parkway', 'color': '#FAEBD7' },
  { 'value': 80, 'label': 'label', 'color': '#FAEBD7' },
  { 'value': 60, 'label': '(tbmnc)', 'color': '#FAEBD7' },
  { 'value': 57, 'label': 'tonya', 'color': '#FAEBD7' }
];

const Box = ({ position, size, color, label, value }) => {
  const meshRef = useRef();

  return (
    <group position={position}>
      <mesh ref={meshRef} position={[0, size / 2, 0]}>
        <boxGeometry args={[1, size, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, -0.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.3}
        color="black"
      >
        {label}
      </Text>
      <Text
        position={[0, size + 0.2, 0]}
        fontSize={0.3}
        color="black"
      >
        {value}
      </Text>
    </group>
  );
};

const BlockView = () => {
  // Calculate grid dimensions
  const gridSize = Math.ceil(Math.sqrt(data.length));
  const maxValue = Math.max(...data.map(d => d.value));
  const scale = 5 / maxValue; // Scale factor to normalize heights

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [10, 10, 10], fov: 60 }}
        style={{ background: '#f0f0f0' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
        />
        <group position={[-gridSize / 2, 0, -gridSize / 2]}>
          {data.map((item, index) => {
            const row = Math.floor(index / gridSize);
            const color = stringToColor(item.label + item.value);
            const col = index % gridSize;
            return (
              <Box
                key={index}
                position={[col * 1.5, 0, row * 1.5]}
                size={item.value * scale}
                color={color}
                label={item.label}
                value={item.value}
              />
            );
          })}
        </group>
        <OrbitControls enableDamping dampingFactor={0.05} />
        <gridHelper args={[20, 20]} />
      </Canvas>
    </div>
  );
};

export default BlockView;