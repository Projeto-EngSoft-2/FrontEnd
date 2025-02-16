import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

// Imagens associadas às categorias de denúncia
const categorias = [
  { nome: "Buracos nas vias", imagem: "/images/buracos.jpg" },
  { nome: "Ruas sem calçamento", imagem: "/images/ruas_sem_calcamento.jpg" },
  { nome: "Iluminação pública", imagem: "/images/iluminacao_publica.jpg" },
  { nome: "Descarte irregular de lixo", imagem: "/images/descarte_lixo.jpg" },
  { nome: "Descarte de Água Servida", imagem: "/images/descarte_de_agua_servida.jpg" },
  { nome: "Outros problemas", imagem: "/images/outros_problemas.jpg" },
  
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h2>Qual é o tipo de sua denúncia?</h2>
      <div className="buttons-container">
        {categorias.map((categoria, index) => (
          <div key={index} className="button-item">
            <img
              src={categoria.imagem}
              alt={categoria.nome}
              className="categoria-imagem"
            />
            <button onClick={() => navigate("/denuncia")}>{categoria.nome}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

