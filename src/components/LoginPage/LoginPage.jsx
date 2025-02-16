import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Header from "../Header.jsx";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", senha: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("https://back-api-9m2t.onrender.com/logar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                navigate("/reportpage");
            } else {
                setMessage("Email ou senha incorretos.");
            }
        } catch (error) {
            setMessage("Erro na conexão. Tente novamente.");
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Entre na sua conta</h1>
            {message && <p className="login-message">{message}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Digite seu email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Digite sua senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <a href="#" className="forgot-password">
                    Esqueceu a senha?
                </a>
                <button type="submit" className="login-button">Entrar</button>
            </form>
        </div>
    );
}
