// src/pages/LoginPage.tsx (CORREGIDO SIN TAILWIND)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError("Correo o contraseña incorrectos");
            return;
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/editar-precios");
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                // Fondo oscuro consistente con el tema global
                background: 'linear-gradient(135deg, #141414, #1f1f1f)', 
                color: '#f5f5f5',
            }}
        >
            <div 
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '30px',
                    backgroundColor: '#2b2b2b', // Fondo del formulario más claro
                    borderRadius: '15px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                    border: '1px solid #444',
                }}
            >
                {/* 🔹 Encabezado */}
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                    <h1 style={{ 
                        fontSize: '2rem', 
                        fontWeight: 700, 
                        color: '#00e676', // Color verde para destacar
                    }}>
                        Panel de Distribuidora
                    </h1>
                    <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '5px' }}>
                        Administración de precios
                    </p>
                </div>

                {/* 🔹 Formulario */}
                <form onSubmit={handleLogin} style={{ display: 'grid', gap: '20px' }}>
                    {error && (
                        <p style={{ color: '#ff6b6b', textAlign: 'center', background: '#3b0000', padding: '8px', borderRadius: '5px', fontSize: '0.9rem' }}>
                            {error}
                        </p>
                    )}

                    {/* Campo Email */}
                    <div>
                        <label style={{ display: 'block', color: '#ccc', marginBottom: '8px', fontSize: '0.9rem' }}>
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                backgroundColor: '#3a3a3a',
                                color: '#f5f5f5',
                                border: '1px solid #555',
                                transition: 'border-color 0.3s',
                            }}
                            required
                        />
                    </div>

                    {/* Campo Contraseña */}
                    <div>
                        <label style={{ display: 'block', color: '#ccc', marginBottom: '8px', fontSize: '0.9rem' }}>
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                backgroundColor: '#3a3a3a',
                                color: '#f5f5f5',
                                border: '1px solid #555',
                                transition: 'border-color 0.3s',
                            }}
                            required
                        />
                    </div>

                    {/* Botón Ingresar */}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            fontWeight: 600,
                            color: '#111',
                            fontSize: '1.1rem',
                            background: 'linear-gradient(90deg, #00e676, #1de9b6)', // Gradiente verde/turquesa
                            border: 'none',
                            cursor: 'pointer',
                            marginTop: '10px',
                            boxShadow: '0 4px 15px rgba(0, 230, 118, 0.4)',
                            transition: 'transform 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
}
