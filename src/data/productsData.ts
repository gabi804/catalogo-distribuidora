// Definición de la interfaz

export interface Product { // 👈 Usar 'export' aquí
  id: number;
  nombre: string;
 // codigo_sku: string;
  url_imagen: string;
 // precio: number;
}

// Datos de prueba con precio (reemplaza URLs y precios)
export const initialProducts: Product[] = [ // 👈 Usar 'export' aquí
  { id: 1, nombre: "Refresco Cola 2L",  url_imagen: "/catalogo-distribuidora/producto.img/error.png" },
  { id: 2, nombre: "cap",  url_imagen: "/catalogo-distribuidora/producto.img/cap.png" },
  { id: 3, nombre: "Alfajor de Maicena",  url_imagen: "/catalogo-distribuidora/producto.img/alfajorMaicena.jpeg" },
  { id: 4, nombre: "Alfajor Negro",  url_imagen: "/catalogo-distribuidora/producto.img/alfajorNegro.jpeg" },
  { id: 5, nombre: "Copito",  url_imagen: "/catalogo-distribuidora/producto.img/copito.jpeg" },

  { id: 6, nombre: "Pan Dulce",  url_imagen: "/catalogo-distribuidora/producto.img/panDulce.jpeg" },
  
];