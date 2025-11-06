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
  { id: 1, nombre: "Dulce de Leche",  url_imagen: "/catalogo-distribuidora/producto.img/dulceDeLeche.jpeg" },
  { id: 2, nombre: "  Queso Pategras",  url_imagen: "/catalogo-distribuidora/producto.img/quesoPategras.jpeg" },
  { id: 3, nombre: "Alfajor de Maicena",  url_imagen: "/catalogo-distribuidora/producto.img/alfajorMaicena.jpeg" },
  { id: 4, nombre: "Alfajor Negro",  url_imagen: "/catalogo-distribuidora/producto.img/alfajorNegro.jpeg" },
  { id: 5, nombre: "Copito",  url_imagen: "/catalogo-distribuidora/producto.img/copito.jpeg" },

  { id: 6, nombre: "Pan Dulce",  url_imagen: "/catalogo-distribuidora/producto.img/panDulce.jpeg" },
  { id: 7, nombre: "Chisito 80g",  url_imagen: "/catalogo-distribuidora/producto.img/chisitoX80.jpeg" },
  { id: 8, nombre: "Papas 70g",  url_imagen: "/catalogo-distribuidora/producto.img/papasX70.jpeg" },
  { id: 9, nombre: "Mani Salado 1KG",  url_imagen: "/catalogo-distribuidora/producto.img/maniSalado1KG.jpeg" },
  { id: 10, nombre: "Palitos 1KG",  url_imagen: "/catalogo-distribuidora/producto.img/palitos1KG.jpeg" },
  { id: 11, nombre: "Mani Saborisado 1Kg",  url_imagen: "/catalogo-distribuidora/producto.img/mani1KG.jpeg" },
  { id: 12, nombre: "Chanuvis",  url_imagen: "/catalogo-distribuidora/producto.img/chanuvis.jpeg" },
  { id: 13, nombre: "Papas Pai",  url_imagen: "/catalogo-distribuidora/producto.img/papasPai.jpeg" },
  { id: 14, nombre: " Papas x800",  url_imagen: "/catalogo-distribuidora/producto.img/papasX800.jpeg" },
  { id: 15, nombre: "Chisitos 1KG",  url_imagen: "/catalogo-distribuidora/producto.img/chisitos1KG.jpeg" },
  { id: 16, nombre: "Conitos x800",  url_imagen: "/catalogo-distribuidora/producto.img/conitosX800.jpeg" },
  { id: 17, nombre: "Cascarones x800",  url_imagen: "/catalogo-distribuidora/producto.img/cascaronesX800.jpeg" },
  { id: 18, nombre: "Aros Sabor Pizza",  url_imagen: "/catalogo-distribuidora/producto.img/arosSaborPizza.jpeg" },
  { id: 19, nombre: "Tutucas 1KG",  url_imagen: "/catalogo-distribuidora/producto.img/tutucas1KG.jpeg" },
  { id: 20, nombre: "Queso Sardo",  url_imagen: "/catalogo-distribuidora/producto.img/quesoSardo.jpeg" },
  { id: 21, nombre: "Mantecas",  url_imagen: "/catalogo-distribuidora/producto.img/mantecas.jpeg" },
  { id: 22, nombre: "Creama 3KG",  url_imagen: "/catalogo-distribuidora/producto.img/crema3KG.jpeg" },
  { id: 23, nombre: "Cremas",  url_imagen: "/catalogo-distribuidora/producto.img/cremas.jpeg" },
  { id: 24, nombre: "Queso Muzzarella En Barra",  url_imagen: "/catalogo-distribuidora/producto.img/muzzaEnBarra.jpeg" },
  { id: 25, nombre: "Azucar",  url_imagen: "/catalogo-distribuidora/producto.img/azucar.jpeg" },
  { id: 26, nombre: "Almohaditas",  url_imagen: "/catalogo-distribuidora/producto.img/almohaditas.jpeg" },
  { id: 27, nombre: "Azucar",  url_imagen: "/catalogo-distribuidora/producto.img/azucar.jpeg" },
  { id: 28, nombre: "Aritos Frutales",  url_imagen: "/catalogo-distribuidora/producto.img/aritosFrutales.jpeg" },
  { id: 29, nombre: "Bolitas De Chocolate",  url_imagen: "/catalogo-distribuidora/producto.img/bolitasDeChocolate.jpeg" },
  { id: 30, nombre: "Conserva",  url_imagen: "/catalogo-distribuidora/producto.img/conserva.jpeg" },
  { id: 31, nombre: "Pure De Tomate",  url_imagen: "/catalogo-distribuidora/producto.img/pureDeTomate.jpeg" },
  { id: 32, nombre: "Puflitos",  url_imagen: "/catalogo-distribuidora/producto.img/puflitos.jpeg" },
  { id: 33, nombre: "Mani Recubierto",  url_imagen: "/catalogo-distribuidora/producto.img/maniRecubierto.jpeg" },
  { id: 34, nombre: "Mani Tostado",  url_imagen: "/catalogo-distribuidora/producto.img/maniTostado.jpeg" },
  { id: 35, nombre: "Mani Salado",  url_imagen: "/catalogo-distribuidora/producto.img/maniSalado.jpeg" },
  { id: 36, nombre: "Palitos",  url_imagen: "/catalogo-distribuidora/producto.img/palitos.jpeg" },
  { id: 37, nombre: "Palitos",  url_imagen: "/catalogo-distribuidora/producto.img/palitos.jpeg" },
];