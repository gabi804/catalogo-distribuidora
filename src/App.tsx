// src/App.jsx

import { ProductCatalog } from './pages/ProductCatalog'; // 👈 Asegúrate de la ruta correcta

function App() {
  // 💡 Muestra directamente el componente del catálogo
  return (
    <div className="main-container">
      <ProductCatalog />
    </div>
  );
}

export default App;