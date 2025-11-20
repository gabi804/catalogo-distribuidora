// src/hooks/useProducts.ts
// src/hooks/useProducts.ts (VERSIÓN OPTIMIZADA)

// src/hooks/useProducts.ts

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { type Product } from '../types'; // Importamos el tipo corregido

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        setLoading(true);
        // Sugerencia: Ordenar por ID para consistencia
        const { data, error } = await supabase.from('productos').select('*').order('id', { ascending: true });
        
        if (error) {
            console.error('Error al obtener productos de Supabase:', error);
        } else {
            setProducts((data as Product[]) || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts(); // 1. Carga inicial de todos los datos

        // 2. ESCUCHA DE CAMBIOS EN TIEMPO REAL (UPDATE)
        const channel = supabase
            .channel('productos_realtime')
            .on('postgres_changes', 
                { event: 'UPDATE', schema: 'public', table: 'productos' }, 
                (payload) => {
                    // OPTIMIZACIÓN: Actualizamos SOLO el producto afectado en el estado
                    const updatedProduct = payload.new as Product;
                    
                    setProducts(prevProducts => 
                        prevProducts.map(p => 
                            p.id === updatedProduct.id ? updatedProduct : p
                        )
                    );
                    console.log(`Precio del producto ID ${updatedProduct.id} actualizado por Realtime.`);
                }
            )
            .subscribe();

        // 3. Limpieza de la suscripción
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return { products, loading, fetchProducts };
};