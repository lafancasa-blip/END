
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import Scene from './components/Scene';
import UIOverlay from './components/UIOverlay';
import { TreeMorphState } from './types';

const App: React.FC = () => {
  const [morphState, setMorphState] = useState<TreeMorphState>(TreeMorphState.SCATTERED);

  const toggleMorph = () => {
    setMorphState(prev => 
      prev === TreeMorphState.SCATTERED ? TreeMorphState.TREE_SHAPE : TreeMorphState.SCATTERED
    );
  };

  return (
    <div className="relative w-full h-screen bg-[#000a1a] overflow-hidden">
      <Suspense fallback={
        <div className="flex items-center justify-center h-full text-[#d4af37] font-luxury animate-pulse uppercase tracking-[0.5em] bg-[#000a1a]">
          Loading Luxury...
        </div>
      }>
        <Canvas shadows gl={{ antialias: true, stencil: false, depth: true, alpha: false }}>
          <PerspectiveCamera makeDefault position={[0, 1.5, 8.5]} fov={45} />
          <color attach="background" args={['#000a1a']} />
          
          <Scene morphState={morphState} />
          
          <OrbitControls 
            enablePan={false} 
            maxPolarAngle={Math.PI / 1.7} 
            minDistance={5} 
            maxDistance={12}
            autoRotate={morphState === TreeMorphState.SCATTERED}
            autoRotateSpeed={0.5}
          />
          <Environment preset="night" />
        </Canvas>
      </Suspense>

      <UIOverlay 
        morphState={morphState} 
        onToggle={toggleMorph} 
      />
    </div>
  );
};

export default App;
