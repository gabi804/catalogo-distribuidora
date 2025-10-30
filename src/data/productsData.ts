// Definición de la interfaz

export interface Product { // 👈 Usar 'export' aquí
  id: number;
  nombre: string;
  codigo_sku: string;
  url_imagen: string;
  precio: number;
}

// Datos de prueba con precio (reemplaza URLs y precios)
export const initialProducts: Product[] = [ // 👈 Usar 'export' aquí
  { id: 1, nombre: "Refresco Cola 2L", codigo_sku: "RC-2L-001", url_imagen: "/producto.img/error.png", precio: 250.50 },
  { id: 2, nombre: "cap", codigo_sku: "LE-1L-002", url_imagen: "/producto.img/cap.png", precio: 185.00 },
  { id: 3, nombre: "Paquete de Galletas", codigo_sku: "PG-SAL-003", url_imagen: "/producto.img/coca.webp", precio: 95.99 },
  { id: 4, nombre: "Detergente Líquido", codigo_sku: "DL-500-004", url_imagen: "/producto.img/refresco.webp", precio: 340.25 },
  { id: 5, nombre: "Harina de Trigo 1Kg", codigo_sku: "HT-1KG-005", url_imagen: "https://via.placeholder.com/150/FFFF00/000000?text=Harina", precio: 120.00 },
];