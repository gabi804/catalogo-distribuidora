// src/types/index.ts

// 1. Tipos de Datos del Producto
export interface Product {
    id: number;
    nombre: string;
    url_imagen: string;
    precio: number;
}

// 2. Tipo de Usuario de Supabase (Simplificado para el proyecto)
export interface SupabaseUser {
    id: string;
    email: string;
}