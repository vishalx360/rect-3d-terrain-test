import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { data } from "./data";
import stringToColor from "string-to-color";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const BlockInfo = ({ label, value, color }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    width: '200px'
  }}>
    <div className='flex gap-2'>

      <div className="w-4 h-4 rounded mt-2" style={{ backgroundColor: color }} />

      <h3 className="font-bold text-lg">{label}</h3>
    </div>
    <div className="text-sm text-gray-600">
      <p>Value: {value}</p>
      <p>
        Some details about the selected block...
      </p>
    </div>
  </div>
);

const BlockLevel = ({ position, width, height, color, label, value, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onClick={() => onClick({ label, value, color })}
      >
        <boxGeometry args={[width, height, width]} />
        <meshStandardMaterial
          color={color}
          opacity={hovered ? 0.8 : 1}
          transparent
        />
        {hovered && (
          <Html>
            <BlockInfo label={label} value={value} color={color} />
          </Html>
        )}
      </mesh>
    </group>
  );
};

const PyramidView = () => {
  const [dialogData, setDialogData] = useState(null);

  // Sort data by value in descending order (largest to smallest)
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  let totalHeight = 0;
  const levelHeight = 0.8;
  const baseWidth = 10;
  const shrinkFactor = 0.9;

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [40, 30, 10], fov: 50 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

        <group position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
          {sortedData.map((item, index) => {
            const width = baseWidth * Math.pow(shrinkFactor, index);
            const color = stringToColor(item.label + item.value);
            const position = [0, totalHeight, 0];
            totalHeight += levelHeight;

            return (
              <BlockLevel
                key={item.label}
                position={position}
                width={width}
                height={levelHeight}
                color={color}
                label={item.label}
                value={item.value}
                onClick={setDialogData}
              />
            );
          })}
        </group>

        <OrbitControls minDistance={10} />
        <gridHelper args={[200, 200]} />
      </Canvas>

      <Dialog open={!!dialogData} onOpenChange={(isOpen) => !isOpen && setDialogData(null)}>
        <DialogTrigger asChild />
        <DialogContent>
          <>
            <DialogTitle>{dialogData?.label}</DialogTitle>
            <DialogDescription>
              <p>Value: {dialogData?.value}</p>
              <div className="w-4 h-4 rounded mt-2" style={{ backgroundColor: dialogData?.color }} />

              <div>
                <h3 className="font-bold text-lg mt-4">Details</h3>
                <p>Some details about the selected block...</p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus deserunt labore, quia maxime natus ratione velit explicabo ipsum optio voluptate ex consequuntur porro exercitationem molestiae ullam iste corporis voluptas repudiandae minima aliquam. Earum ea facere a quas consequuntur temporibus corporis adipisci? Corrupti temporibus provident qui saepe. Architecto expedita quae libero qui explicabo atque est labore iusto praesentium voluptatibus nemo porro quasi necessitatibus reprehenderit eligendi obcaecati, cupiditate, doloribus veniam consequatur consectetur, asperiores odio similique? Odio, harum. Minus, voluptates vitae officia hic eaque quos adipisci soluta ipsam laudantium. Iste fugit perferendis labore! Omnis eveniet non itaque. Iusto sunt cumque accusantium consequuntur ullam?
                </p>
              </div>
            </DialogDescription>
          </>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PyramidView;
