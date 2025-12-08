// src/pages/EditarPrecios.tsx

import { useEffect, useState, useCallback } from "react";
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

    // 👇 NUEVOS ESTADOS PARA GESTIÓN DE IMÁGENES 👇
    const [uploading, setUploading] = useState(false);
    const [storageFiles, setStorageFiles] = useState<string[]>([]);

    // 👇 NUEVOS ESTADOS PARA CREACIÓN DE PRODUCTO 👇
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
        nombre: '',
        precio: 0,
        url_imagen: '',
    });
    const [isCreating, setIsCreating] = useState(false);

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


    // 👇 NUEVAS FUNCIONES PARA GESTIÓN DE IMÁGENES Y CREACIÓN 👇

    // Función 1: Listar archivos existentes en Storage
    const listStorageFiles = useCallback(async () => {
        const { data, error } = await supabase.storage
            .from('catalogo_imagenes')
            .list('', {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' },
            });

        if (error) {
            console.error("Error listando archivos:", error.message);
            return;
        }

        if (data) {
            setStorageFiles(data.filter(file => file.name !== '.empty').map(file => file.name));
        }
    }, []);

    useEffect(() => {
        if (user) {
            listStorageFiles();
        }
    }, [listStorageFiles, user]);


    // Función 2: Subir un nuevo archivo
    const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const file = event.target.files?.[0];

            if (!file) {
                throw new Error('Debes seleccionar una imagen para subir.');
            }

            const filePath = file.name;

            const { error: uploadError } = await supabase.storage
                .from('catalogo_imagenes')
                .upload(filePath, file, {
                    upsert: true,
                });

            if (uploadError) {
                throw uploadError;
            }

            alert(`✅ Imagen ${file.name} subida con éxito.`);
            listStorageFiles();

        } catch (error) {
            alert('❌ Error al subir la imagen: ' + (error as Error).message);
        } finally {
            setUploading(false);
        }
    };


    // Función 3: Eliminar un archivo Y su producto asociado (CORREGIDO PARA DOBLE ELIMINACIÓN)
    const handleDeleteImage = async (fileName: string) => {
        if (!window.confirm(`⚠️ ADVERTENCIA: Al eliminar la imagen "${fileName}", se borrará PERMANENTEMENTE el archivo de Storage Y cualquier producto que use esta URL de la tabla 'productos'. ¿Desea continuar?`)) {
            return;
        }

        try {
            // Base URL DE TU PROYECTO (USADA PARA ENCONTRAR EL REGISTRO EN LA DB)
            const baseUrl = "https://zpknkxdzguqlhgkhyomp.supabase.co/storage/v1/object/public/catalogo_imagenes/";
            const fullUrlToDelete = baseUrl + fileName;

            // 1. ELIMINAR EL REGISTRO DE LA TABLA 'productos'
            const { error: dbError } = await supabase
                .from('productos')
                .delete()
                .eq('url_imagen', fullUrlToDelete);

            if (dbError) {
                throw new Error(`Error al eliminar de la base de datos: ${dbError.message}`);
            }

            // 2. ELIMINAR EL ARCHIVO DE STORAGE
            const { error: storageError } = await supabase.storage
                .from('catalogo_imagenes')
                .remove([fileName]);

            if (storageError) {
                throw new Error(`Error al eliminar de Storage: ${storageError.message}`);
            }

            alert(`✅ Éxito: Imagen "${fileName}" y su producto asociado han sido eliminados.`);

            // 3. Recargar la lista de archivos y la lista de productos
            listStorageFiles();
            window.location.reload();

        } catch (error) {
            alert('❌ Error de Eliminación: ' + (error as Error).message);
        }
    };

    // 🔹 Función para crear un nuevo producto
    const handleCreateProduct = async () => {
        // 1. Validaciones básicas
        if (!newProduct.nombre || newProduct.precio <= 0 || !newProduct.url_imagen) {
            alert("❌ Todos los campos (Nombre, Precio, URL de Imagen) son obligatorios.");
            return;
        }

        setIsCreating(true);

        // 2. Insertar en la base de datos
        const { error } = await supabase
            .from("productos")
            .insert([
                {
                    nombre: newProduct.nombre,
                    precio: newProduct.precio,
                    url_imagen: newProduct.url_imagen
                }
            ]);

        setIsCreating(false);

        if (error) {
            alert("❌ Error al crear producto: " + error.message);
        } else {
            alert("✅ Producto creado con éxito. Recargando la lista...");

            // 3. Resetear el formulario y recargar la lista de productos
            setNewProduct({ nombre: '', precio: 0, url_imagen: '' });
            window.location.reload();
        }
    };
    // 👆 FIN DE FUNCIONES PARA GESTIÓN DE IMÁGENES Y CREACIÓN 👆


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

            {/* 🖼️ GESTIÓN DE IMÁGENES (STORAGE) - INICIO */}
            <div style={{ marginTop: '30px', padding: '25px', border: '2px solid #00e676', borderRadius: '10px', background: '#1c1c1c' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#00e676', marginBottom: '15px' }}>
                    Gestión de Archivos (Storage)
                </h3>

                <h4 style={{ color: '#00e676', marginBottom: '10px' }}>Subir Nueva Imagen</h4>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadImage}
                    disabled={uploading}
                    style={{ color: 'white', border: '1px solid #333', padding: '10px', borderRadius: '4px', background: '#222', display: 'block', width: '100%', boxSizing: 'border-box' }}
                />
                {uploading && <p style={{ color: '#00e676', marginTop: '10px', fontWeight: 'bold' }}>Subiendo imagen, por favor espere...</p>}

                <h4 style={{ color: '#00e676', marginTop: '30px', marginBottom: '15px' }}>Imágenes Existentes ({storageFiles.length})</h4>
                <p style={{ color: '#ccc', marginBottom: '10px', fontSize: '0.9rem' }}>
                    Haga clic en el nombre del archivo para **copiar** su URL completa y pegarla en el campo de *Crear Nuevo Producto*.
                </p>

                <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #333', padding: '10px', borderRadius: '4px' }}>
                    {storageFiles.length > 0 ? (
                        storageFiles.map((fileName) => (
                            <div key={fileName} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid #2a2a2a' }}>

                                {/* Enlace para copiar la URL */}
                                <span
                                    onClick={() => {
                                        const url = `https://zpknkxdzguqlhgkhyomp.supabase.co/storage/v1/object/public/catalogo_imagenes/${fileName}`;
                                        navigator.clipboard.writeText(url);
                                        alert(`URL copiada al portapapeles:\n${url}`);
                                    }}
                                    style={{ cursor: 'pointer', color: '#1de9b6', fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}
                                    title={`Clic para copiar URL de: ${fileName}`}
                                >
                                    {fileName}
                                </span>

                                {/* Botón de Eliminar */}
                                <button
                                    onClick={() => handleDeleteImage(fileName)}
                                    style={{ background: '#d32f2f', color: 'white', padding: '5px 10px', borderRadius: '4px', border: 'none', cursor: 'pointer', marginLeft: '10px', fontSize: '0.8rem', flexShrink: 0 }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: '#888' }}>No hay archivos en el Storage.</p>
                    )}
                </div>
            </div>
            {/* 🖼️ GESTIÓN DE IMÁGENES (STORAGE) - FIN */}
            <hr style={{ margin: '30px 0', borderTop: '1px solid #333' }} />

            {/* 🆕 FORMULARIO DE CREACIÓN DE NUEVO PRODUCTO 🆕 */}
            <div style={{ marginTop: '30px', padding: '25px', border: '2px solid #2563eb', borderRadius: '10px', background: '#1c1c1c' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#2563eb', marginBottom: '20px' }}>
                    ➕ Crear Nuevo Producto
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>

                    {/* Campo Nombre */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Nombre del Producto</label>
                        <input
                            type="text"
                            value={newProduct.nombre}
                            onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#3a3a3a', color: '#fff' }}
                            placeholder="Ej: Alfajor Triple Chocolate"
                        />
                    </div>

                    {/* Campo Precio */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Precio ($)</label>
                        <input
                            type="number"
                            value={newProduct.precio === 0 ? '' : newProduct.precio}
                            onChange={(e) => setNewProduct({ ...newProduct, precio: Number(e.target.value) })}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#3a3a3a', color: '#fff' }}
                            placeholder="0.00"
                        />
                    </div>
                </div>

                {/* Campo URL de Imagen */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>URL de Imagen (Obtenida del Gestor de Archivos)</label>
                    <input
                        type="text"
                        value={newProduct.url_imagen}
                        onChange={(e) => setNewProduct({ ...newProduct, url_imagen: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#3a3a3a', color: '#fff' }}
                        placeholder="Pegue la URL de la imagen aquí después de copiarla"
                    />
                </div>

                {/* Botón de Creación */}
                <button
                    onClick={handleCreateProduct}
                    disabled={isCreating}
                    style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    {isCreating ? 'Creando...' : 'Guardar Nuevo Producto'}
                </button>
                <p style={{ marginTop: '15px', fontSize: '0.85rem', color: '#aaa' }}>
                    *Requisito: Primero **suba la imagen** en la sección verde de arriba, luego **haga clic en su nombre para copiar la URL** y péguela en el campo de arriba.
                </p>
            </div>

            <hr style={{ margin: '30px 0', borderTop: '1px solid #333' }} />

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