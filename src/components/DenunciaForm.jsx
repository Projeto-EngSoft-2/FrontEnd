import React, { useState } from "react";
import "../styles.css";

import { useNavigate } from "react-router-dom";

const DenunciaForm = () => {
  const [localizacao, setLocalizacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [referencia, setReferencia] = useState("");
  const [fotos, setFotos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

  // Função para obter a localização via GPS
  const obterLocalizacao = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocalizacao(
            `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`
          );
        },
        () => alert("Não foi possível obter sua localização")
      );
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
    }
  };

  // Função para adicionar uma foto
  const adicionarFoto = (e) => {
    const arquivos = e.target.files;
    const novasFotos = [...fotos];

    for (let i = 0; i < arquivos.length; i++) {
      const fotoURL = URL.createObjectURL(arquivos[i]);
      novasFotos.push(fotoURL);
    }

    setFotos(novasFotos);
  };

  // Função para excluir uma foto
  const excluirFoto = (index) => {
    const fotosRestantes = fotos.filter((_, i) => i !== index);
    setFotos(fotosRestantes);
  };

  const enviarDenuncia = () => {
    if(descricao.trim() === ""){
        alert("A descrição da denúncia é obrigatória");
        return;
    }
    setModalAberto(true);
    };

  return (
    <div className="denuncia-form">
      <h2>Registrar Denúncia</h2>
      <button onClick={obterLocalizacao} className="location-button"><i className="fa fa-location-arrow"></i>Obter Localização Atual</button>
      <input
        type="text"
        value={localizacao}
        placeholder="Localização"
        readOnly
      />
      <textarea
        placeholder="Descreva o problema"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder="Ponto de referência"
        value={referencia}
        onChange={(e) => setReferencia(e.target.value)}
      />

      {/* Input para adicionar fotos */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={adicionarFoto}
      />

      {/* Exibição das fotos anexadas */}
      <div className="fotos-anexadas">
        {fotos.map((foto, index) => (
          <div key={index} className="foto-item">
            <img src={foto} alt={`foto-${index}`} className="foto-preview" />
            <button
              type="button"
              className="excluir-foto"
              onClick={() => excluirFoto(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <button onClick={enviarDenuncia}>Enviar Denúncia</button>
      
        {modalAberto && (
            <div className="modal">
              <div className="modal-content">
                    <h3>Denúncia enviada com sucesso!</h3>
                    <p>Obrigado por contribuir com a melhoria da cidade.</p>
                    <button onClick={() => navigate("/")}>Voltar para a página inicial</button>
                    <button onClick={() => navigate("/Mapa", {state:{localizacao} })}>Ver no Mapa</button>
              </div>
            </div>
        )}
    </div>
  );
};

export default DenunciaForm;