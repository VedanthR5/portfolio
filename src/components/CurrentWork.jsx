/* eslint-disable react/no-unknown-property */
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WavyBackground = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const positions = meshRef.current.geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Create a wave pattern
        const z = Math.sin(x * 0.3 + time * 0.5) * Math.cos(y * 0.3 + time * 0.5) * 2 +
                  Math.sin(x * 1 + time * 0.5) * 0.5;
        
        positions.setZ(i, z);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <group rotation={[Math.PI / 2, 0, 0]} position={[0, -10, -20]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[100, 100, 80, 80]} />
        <meshBasicMaterial 
          color="#915EFF" 
          wireframe 
          transparent 
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  
  // Use intersection observer to start typing when in view
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let currentIndex = 0;
    setDisplayText('');
    let intervalId;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 100); // Typing speed
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [text, delay, isInView]);

  const visibleText = displayText.length > 0 ? displayText : '\u00A0';

  return (
    <span
      ref={ref}
      className="inline-flex items-baseline font-mono big-text-futura whitespace-nowrap min-w-[1ch]"
    >
      {visibleText}
    </span>
  );
};

TypewriterText.propTypes = {
  text: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

const CurrentWork = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const workItems = [
    "portkey - think. type. transform. go. intent to action. change how you browse.",
    "llm research and watermarking",
    "civicduty for localized political data aggregation"
  ];

  const toggleItem = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="relative w-full h-auto min-h-[200px] flex flex-col items-center justify-center py-20 overflow-hidden">
      
      {/* Gradient Masks for smooth blending */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-primary to-transparent z-10 pointer-events-none" />

      {/* Trigger Element */}
      <motion.div 
        className="group relative z-20 flex cursor-pointer items-center gap-3 px-5 text-center sm:gap-4"
        onClick={() => setIsOpen(true)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span 
          className={`font-mono text-3xl font-bold transition-colors duration-300 sm:text-4xl md:text-6xl ${hovered ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'text-secondary'}`}
          animate={{ x: hovered ? [0, 10, 0] : 0 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          &gt;
        </motion.span>
        <h2 className={`font-mono text-xl tracking-tighter transition-colors duration-300 sm:text-2xl md:text-4xl ${hovered ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-secondary'}`}>
          <TypewriterText text="what i'm working on" delay={500} />
        </h2>
      </motion.div>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
              <Canvas camera={{ position: [0, 10, 20], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <WavyBackground />
              </Canvas>
            </div>

            {/* Content */}
            <div className="z-10 flex w-full max-w-5xl flex-col items-start gap-8 px-5 sm:px-10">
              <motion.button
                className="absolute right-5 top-5 font-mono text-xl text-white/50 hover:text-white sm:right-10 sm:top-10"
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                [close]
              </motion.button>

              {workItems.map((item, index) => {
                const firstSpaceIndex = item.indexOf(' ');
                const firstWord = firstSpaceIndex === -1 ? item : item.substring(0, firstSpaceIndex);
                const restOfText = firstSpaceIndex === -1 ? '' : item.substring(firstSpaceIndex);
                const isExpanded = expandedIndex === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + (index * 0.2), type: "spring", stiffness: 100 }}
                    className="flex flex-col w-full"
                  >
                    <div 
                      className="group flex cursor-pointer items-start gap-3 sm:items-center sm:gap-4"
                      onClick={() => toggleItem(index)}
                    >
                      <span className="text-purple-500 font-mono text-xl shrink-0">{`0${index + 1} //`}</span>
                      <h3 className={`font-sans text-2xl font-bold lowercase tracking-tight transition-all duration-300 sm:text-3xl md:text-5xl ${isExpanded ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                        {firstWord}
                      </h3>
                      <motion.span
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        className="text-purple-500 text-xl ml-2"
                      >
                        &gt;
                      </motion.span>
                    </div>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-10 overflow-hidden sm:ml-[4.5rem]"
                        >
                          <p className="mt-2 font-mono text-base font-light text-white drop-shadow-lg sm:text-xl">
                            {(() => {
                              const isCivic = firstWord.toLowerCase() === 'civicduty';
                              if (isCivic) {
                                return (
                                  <>
                                    {restOfText} <a href="https://civicduty.app" target="_blank" rel="noopener noreferrer" className="underline text-purple-400 hover:text-purple-300 transition-colors">civicduty.app</a> — mcginnis venture finalist
                                  </>
                                );
                              }
                              return restOfText;
                            })()}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Loading/Glitch Effect Overlay */}
            <motion.div
              className="absolute inset-0 bg-white pointer-events-none mix-blend-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.1, 0, 0.05, 0] }}
              transition={{ duration: 2, times: [0, 0.1, 0.2, 0.3, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default CurrentWork;
