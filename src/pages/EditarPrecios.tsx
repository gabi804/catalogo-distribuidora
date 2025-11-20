// src/pages/EditarPrecios.tsx

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
// Importamos los tipos centralizados
import { type Product, type SupabaseUser } from "../types"; 

// 💡 Interfaz de Props: Recibe la función de cierre de sesión del componente App.
interface EditarPrecioProps {
    handleLogout: () => void;
}

export default function EditarPrecio({ handleLogout }: EditarPrecioProps) {
    const [productos, setProductos] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    // Tipado seguro y consistente con App.tsx
    const [user, setUser] = useState<SupabaseUser | null>(null); 
    const [isSaving, setIsSaving] = useState<number | null>(null);
    const navigate = useNavigate();

    // 🔹 Verificar sesión (Protección de la página)
    useEffect(() => {
        const session = localStorage.getItem("user");
        if (!session) {
            navigate("/login");
            return;
        }
        try {
            // Aseguramos que la sesión parseada cumpla con la interfaz SupabaseUser
            setUser(JSON.parse(session) as SupabaseUser);
        } catch (e) {
            navigate("/login");
        }
    }, [navigate]);

    // 🔹 Obtener productos desde Supabase
    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("productos")
                .select("*")
                .order('id', { ascending: true }); // Ordenamos para consistencia

            if (error) console.error("Error al obtener productos:", error.message);
            else setProductos((data as Product[]) || []);
            setLoading(false);
        };
        // Solo carga los datos si el usuario está verificado
        if (user) {
            fetchProductos();
        }
    }, [user]);

    // 🔹 Cambiar precio en el estado (Manejo de NaN/Vacío)
    const handleChangePrecio = (id: number, nuevoPrecio: number) => {
        // Si el valor es NaN, vacío, o negativo, lo establece en 0 para validación
        const precioValido = isNaN(nuevoPrecio) || nuevoPrecio < 0 ? 0 : nuevoPrecio; 

        setProductos((prev) =>
            prev.map((p) => (p.id === id ? { ...p, precio: precioValido } : p))
        );
    };

    // 🔹 Guardar cambios en Supabase
    const handleGuardar = async (producto: Product) => {
        setIsSaving(producto.id);

        if (producto.precio <= 0 || isNaN(producto.precio)) {
             alert("❌ El precio debe ser un número positivo.");
             setIsSaving(null);
             return;
        }

        const { error } = await supabase
            .from("productos")
            .update({ precio: producto.precio })
            .eq("id", producto.id); // Clave para el UPDATE

        setIsSaving(null);

        if (error) {
            alert("❌ Error al guardar. Revise las políticas RLS: " + error.message);
        } else {
            // Notificación visual al usuario
            alert("✅ Precio actualizado correctamente");
        }
    };

    // Renderizado condicional
    if (!user) return null; // Espera a que termine la verificación (aunque Navigate redirige)
    if (loading)
        return (
            <div className="flex justify-center items-center h-screen text-xl text-gray-700">
                Cargando productos...
            </div>
        );

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#141414', color: '#f5f5f5', padding: '30px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#00e676' }}>
                    Editar precios
                </h1>
                <button
                    onClick={handleLogout}
                    style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 15px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                >
                    Cerrar sesión
                </button>
            </div>

            {/* Productos */}
            {productos.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#aaa' }}>No hay productos cargados.</p>
            ) : (
                <div
                    style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
                        gap: '20px'
                    }}
                >
                    {productos.map((producto) => (
                        <div
                            key={producto.id}
                            style={{ backgroundColor: '#2b2b2b', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <img
                                src={producto.url_imagen}
                                alt={producto.nombre}
                                style={{ width: '100px', height: '100px', objectFit: 'contain', borderRadius: '8px', marginBottom: '10px' }}
                            />
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f5f5f5', marginBottom: '10px', textAlign: 'center' }}>
                                {producto.nombre}
                            </h3>
                            <input
                                type="number"
                                value={producto.precio}
                                onChange={(e) =>
                                    handleChangePrecio(producto.id, Number(e.target.value))
                                }
                                style={{ border: '1px solid #444', borderRadius: '5px', padding: '8px', textAlign: 'center', width: '100px', marginBottom: '10px', backgroundColor: '#3a3a3a', color: '#fff' }}
                            />
                            <button
                                onClick={() => handleGuardar(producto)}
                                disabled={isSaving === producto.id || producto.precio <= 0} 
                                style={{ backgroundColor: '#2563eb', color: 'white', padding: '8px 12px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                            >
                                {isSaving === producto.id ? 'Guardando...' : 'Guardar'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

