// src/App.jsx
// src/App.tsx

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"; 
import SplashScreen from "./components/SplashScreen";
import { ProductCatalog } from "./pages/ProductCatalog";
import EditarPrecio from "./pages/EditarPrecios";
import LoginPage from "./pages/LoginPage";
import { supabase } from "./supabaseClient";
// Asumiendo que has creado este archivo para los tipos:
import { type SupabaseUser } from "./types"; 


// 1. Componente Navbar (Separado para limpieza)
// La lógica de cerrar sesión se centraliza aquí para el botón
interface AppNavbarProps {
    user: SupabaseUser | null;
    navigate: (path: string) => void;
    // 💡 Recibimos el handleLogout como prop para el botón
    handleLogout: () => void; 
}

const AppNavbar: React.FC<AppNavbarProps> = ({ user, navigate, handleLogout }) => {
    
    return (
        <nav className="bg-gray-800 p-4 flex justify-center gap-4 sm:gap-6 shadow-xl border-b border-gray-700/50">
            
            {/* 1. Botón Catálogo (Acceso Público) */}
            <button
                onClick={() => navigate("/")} 
                className="px-4 py-2 rounded-full font-semibold text-gray-300 bg-gray-700 hover:bg-gray-600 transition duration-300 text-sm sm:text-base"
            >
                🔍 Catálogo
            </button>

            {/* 2. Botón Editar Precios / Acceder (Condicional) */}
            {user ? (
                // Usuario logueado: Muestra el botón de Edición
                <button
                    onClick={() => navigate("/editar-precios")}
                    className="px-4 py-2 rounded-full font-bold text-white bg-teal-500 hover:bg-teal-400 transition duration-300 text-sm sm:text-base shadow-md shadow-teal-900/50"
                >
                    ✍️ Editar Precios
                </button>
            ) : (
                // Usuario NO logueado: Muestra el botón de Acceso Admin
                <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition duration-300 text-sm sm:text-base"
                >
                    🔒 Acceder (Admin)
                </button>
            )}

            {/* 3. Botón Cerrar Sesión (Solo si está LOGUEADO) */}
            {user && (
                <button
                    // 💡 Llama a la función pasada por el componente App
                    onClick={handleLogout} 
                    className="px-4 py-2 rounded-full font-bold text-white bg-red-600 hover:bg-red-500 transition duration-300 text-sm sm:text-base"
                >
                    🚪 Cerrar sesión
                </button>
            )}
        </nav>
    );
};


// 3. Componente Contenedor de Lógica (Recibe props limpias)
interface AppContentProps {
    user: SupabaseUser | null;
    showSplash: boolean;
    // 💡 Recibe la función de logout para pasarla al Navbar y a la ruta
    handleLogout: () => void;
}

const AppContent: React.FC<AppContentProps> = ({ user, showSplash, handleLogout }) => {
    
    // 💡 Aquí declaramos useNavigate, dentro del BrowserRouter (SOLUCIONA WARNINGS)
    const navigate = useNavigate(); 
    
    const handleNavigate = (path: string) => {
        navigate(path);
    };

    if (showSplash) return <SplashScreen />;

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            
            {/* 🔹 Navbar */}
            <AppNavbar 
                user={user} 
                navigate={handleNavigate} 
                handleLogout={handleLogout} // 💡 Pasamos la función
            />

            {/* 🔹 Rutas */}
            <div className="flex-1">
                <Routes>
                    <Route path="/" element={<ProductCatalog />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/editar-precios"
                        element={user 
                            // 💡 PASAMOS handleLogout AL COMPONENTE EditarPrecio
                            ? <EditarPrecio handleLogout={handleLogout} /> 
                            : <Navigate to="/login" />}
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
};


// 4. Componente Raíz
export default function App() {
    
    const [showSplash, setShowSplash] = useState<boolean>(true); 
    const [user, setUser] = useState<SupabaseUser | null>(null); 
    // 💡 El hook useNavigate no se puede usar aquí, ya que App envuelve el Router.

    // ⏳ Splash
    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // 🔹 Comprobar sesión Supabase
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            // El 'setUser' se lee y usa aquí (SOLUCIONA el error de 'never read')
            setUser((data.session?.user as SupabaseUser) ?? null); 
        };

        checkSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser((session?.user as SupabaseUser) ?? null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);
    
    // 💡 DEFINICIÓN CENTRALIZADA DE LOGOUT (SOLUCIONA ERROR DE REFERENCIA)
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        localStorage.removeItem("user");
        // Forzamos la redirección ya que App no tiene acceso al hook 'navigate'
        window.location.replace("/catalogo-distribuidora/login"); 
    };

    return (
        // 💡 CRÍTICO: BrowserRouter debe envolver a todo
        <BrowserRouter basename="/catalogo-distribuidora"> 
            <AppContent 
                user={user} 
                showSplash={showSplash} 
                handleLogout={handleLogout} // 💡 Pasamos la función
            />
        </BrowserRouter>
    );
}