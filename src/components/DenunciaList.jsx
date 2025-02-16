const denuncias = [
    { id: 1, titulo: "Buracos nas vias", icon: "🛣️" },
    { id: 2, titulo: "Ruas sem calçamento", icon: "🚧" },
    { id: 3, titulo: "Falta de iluminação pública", icon: "💡" },
    { id: 4, titulo: "Descarte irregular de lixo", icon: "🗑️" },
    { id: 5, titulo: "Vazamentos de água", icon: "💧" },
    { id: 6, titulo: "Outros problemas", icon: "⚠️" },
  ];
  
  const DenunciaList = () => {
    return (
      <div className="denuncia-container">
        {denuncias.map((denuncia) => (
          <button key={denuncia.id} className="denuncia-btn">
            <span className="icon">{denuncia.icon}</span>
            {denuncia.titulo}
          </button>
        ))}
      </div>
    );
  };
  
  export default DenunciaList;