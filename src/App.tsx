/**
 * @fileoverview Application root component.
 * Implements adaptive loading to render the DesktopOS or MobileOS
 * environment based on device detection.
 */

import React, { Suspense } from 'react';
import { useIsMobile } from './hooks/useIsMobile';

// Importación dinámica de los entornos completos (Code-Splitting)
const DesktopOS = React.lazy(() => import('./components/os/DesktopOS').then(m => ({ default: m.DesktopOS })));
const MobileOS = React.lazy(() => import('./components/mobile/MobileOS'));

function App() {
  const isMobile = useIsMobile();

  // Mantenemos la Toaster aquí arriba para que ambos entornos la usen
  // Pero Sileo exige que su contexto esté en el mismo árbol de renderizado,
  // por lo que cada OS debe tener su propio proveedor internamente.

  return (
    <main className="relative w-full h-screen overflow-hidden text-white selection:bg-blue-500/30">
      {/* Carga Adaptativa: Renderizado condicional del OS completo */}
      <Suspense fallback={
        // Spinner premium centralizado durante la carga de cualquier OS
        <div className="w-full h-full flex items-center justify-center bg-[#030303]">
          <div className="w-6 h-6 border-2 border-white/20 border-t-yellow-400 rounded-full animate-spin" />
        </div>
      }>
        {isMobile ? (
          <MobileOS />
        ) : (
          <DesktopOS />
        )}
      </Suspense>
    </main>
  );
}

export default App;