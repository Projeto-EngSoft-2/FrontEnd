import React, { useState } from "react";
import "./RegisterPage.css";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("https://back-api-9m2t.onrender.com/create/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage("Cadastro realizado com sucesso!");
                setFormData({ nome: "", email: "", senha: "" });
            } else {
                setMessage("Erro ao cadastrar. Tente novamente.");
            }
        } catch (error) {
            setMessage("Erro na requisição. Verifique sua conexão.");
        }
    };

    return (
        <div className="register-container">
            <h1 className="register-title">Crie sua conta.</h1>
            {message && <p className="register-message">{message}</p>}
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
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
                        placeholder="Senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Cadastrar</button>
            </form>
        </div>
    );
}
