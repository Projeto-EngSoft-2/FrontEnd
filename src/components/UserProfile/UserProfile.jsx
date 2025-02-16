import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="profile-container">
            <h2>Meu Perfil</h2>
            <div className="profile-info">
                <img src="/placeholder-profile.png" alt="Foto do Usuário" className="profile-pic" />
                <input type="text" value="Nome do Usuário" readOnly />
                <input type="email" value="email@exemplo.com" readOnly />
            </div>
            <button className="logout-button" onClick={handleLogout}>Deslogar</button>

            <div className="bottom-nav">
                <a href="/reportpage">
                    <i className="fas fa-home"></i>
                    <span>Início</span>
                </a>
                <a href="/reportcreation">
                    <i className="fas fa-plus-circle"></i>
                    <span>Criar</span>
                </a>
                <a href="/userprofile">
                    <i className="fas fa-user"></i>
                    <span>Perfil</span>
                </a>
            </div>
        </div>
    );
};

export default UserProfile;
