/**
 * @fileoverview Application root component.
 * Uses strict conditional rendering to prevent Suspense conflicts.
 */

import React, { Suspense, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useIsMobile } from './hooks/useIsMobile';
import { BootScreen } from './components/os/BootScreen';

const DesktopOS = React.lazy(() => import('./components/os/DesktopOS').then(m => ({ default: m.DesktopOS })));
const MobileOS = React.lazy(() => import('./components/mobile/MobileOS'));

function App() {
  const isMobile = useIsMobile();
  const [hasBooted, setHasBooted] = useState(false);

  return (
    <main className="relative w-full h-screen overflow-hidden text-white selection:bg-yellow-500/30 bg-[#030303]">

      {/* 1. La secuencia de arranque */}
      <AnimatePresence>
        {!hasBooted && (
          <BootScreen key="boot-screen" onComplete={() => setHasBooted(true)} />
        )}
      </AnimatePresence>

      {/* 2. El Sistema Operativo (solo se carga cuando hasBooted es true) */}
      {hasBooted && (
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-[#030303]">
            <div className="w-6 h-6 border-2 border-white/20 border-t-yellow-400 rounded-full animate-spin" />
          </div>
        }>
          {isMobile ? <MobileOS /> : <DesktopOS />}
        </Suspense>
      )}

    </main>
  );
}

export default App;