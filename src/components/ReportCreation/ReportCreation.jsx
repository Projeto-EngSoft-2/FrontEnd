import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportCreation.css";

const DenunciaForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const navigate = useNavigate();

    // Obtém a localização via GPS
    const obterLocalizacao = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(
                        `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`
                    );
                },
                () => alert("Não foi possível obter sua localização")
            );
        } else {
            alert("Geolocalização não é suportada pelo seu navegador.");
        }
    };

    // Adiciona imagens
    const adicionarFotos = (e) => {
        const arquivos = e.target.files;
        setImages([...images, ...arquivos]);
    };

    // Remove uma imagem
    const excluirFoto = (index) => {
        const novasFotos = images.filter((_, i) => i !== index);
        setImages(novasFotos);
    };

    // Envia a denúncia
    const enviarDenuncia = async () => {
        if (!title.trim() || !description.trim() || !category.trim()) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("category", category);
        images.forEach((image) => formData.append("image", image));

        try {
            const response = await fetch("https://back-api-9m2t.onrender.com/reports/create", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Erro ao enviar denúncia");
            }

            setModalAberto(true);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="denuncia-container">
            <h2>Registrar Denúncia</h2>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Descreva o problema"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Selecione uma categoria</option>
                <option value="Animal">Animal</option>
                <option value="Infraestrutura">Infraestrutura</option>
                <option value="Energia">Energia</option>
                <option value="Água">Água</option>
                <option value="Sujeira">Sujeira</option>
                <option value="Ambiental">Ambiental</option>
            </select>
            <button onClick={obterLocalizacao} className="location-button">Obter Localização Atual</button>
            <input type="text" value={location} placeholder="Localização" readOnly />
            <input type="file" accept="image/*" multiple onChange={adicionarFotos} />

            <div className="fotos-anexadas">
                {images.map((file, index) => (
                    <div key={index} className="foto-item">
                        <img src={URL.createObjectURL(file)} alt={`foto-${index}`} className="foto-preview" />
                        <button type="button" className="excluir-foto" onClick={() => excluirFoto(index)}>X</button>
                    </div>
                ))}
            </div>

            <button onClick={enviarDenuncia}>Enviar Denúncia</button>

            {modalAberto && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Denúncia enviada com sucesso!</h3>
                        <p>Obrigado por contribuir.</p>
                        <button onClick={() => navigate("/reportpage")}>Voltar</button>
                        <button onClick={() => navigate("/reportpage", { state: { location } })}>Ver no Mapa</button>
                    </div>
                </div>
            )}
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

export default DenunciaForm;
