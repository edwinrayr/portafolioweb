import { Toaster } from 'sileo';
import { Desktop } from './components/os/Desktop';
import { Dock } from './components/os/Dock';
import { TopBar } from './components/os/TopBar';

function App() {
  return (
    <main className="relative w-full h-screen overflow-hidden text-white selection:bg-blue-500/30">
      {/* Proveedor de notificaciones configurado:
        - position: Esquina superior derecha.
        - offset/style: Margen superior de 40px para librar la TopBar (32px).
        - zIndex: 99999 para que sobreescriba el z-[9999] de la TopBar y el Dock.
      */}
      <Toaster
        position="top-right"
        offset="40px"
        style={{ marginTop: '40px', zIndex: 99999 }}
      />

      {/* Barra de menú superior */}
      <TopBar />

      {/* Capa de ventanas y fondo con rayos */}
      <Desktop />

      {/* Interfaz estática inferior */}
      <Dock />
    </main>
  );
}

export default App;