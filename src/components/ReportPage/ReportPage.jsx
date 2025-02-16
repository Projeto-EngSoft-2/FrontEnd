import React, { useEffect, useState } from "react";
import "./ReportPage.css";

export default function ReportsPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedReport, setSelectedReport] = useState(null); // Estado para armazenar o report selecionado

    useEffect(() => {
        const fetchReports = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Usuário não autenticado.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("https://back-api-9m2t.onrender.com/reports/my-reports", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Erro ao carregar reports.");
                }

                const data = await response.json();
                setReports(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    // Função para abrir o modal com os detalhes do report
    const openModal = (report) => {
        setSelectedReport(report);
    };

    // Função para fechar o modal
    const closeModal = () => {
        setSelectedReport(null);
    };

    return (
        <div className="reports-container">
            <h1 className="reports-title">Seus reports</h1>
            {loading && <p>Carregando...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && reports.length === 0 && <p>Nenhum report encontrado.</p>}
            <ul className="reports-list">
                {reports.map((report) => (
                    <li key={report.id} className="report-item" onClick={() => openModal(report)}>
                        <h3>{report.title}</h3>
                        <img src={report.imageUrl} alt={report.title} className="report-image"/>
                    </li>
                ))}
            </ul>

            {/* Modal para exibir detalhes do report */}
            {selectedReport && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedReport.title}</h2>
                        <p><strong>Descrição:</strong> {selectedReport.description}</p>
                        <p><strong>Localização:</strong> {selectedReport.location}</p>
                        <p><strong>Categoria:</strong> {selectedReport.category}</p>
                        <img src={selectedReport.imageUrl} alt={selectedReport.title} className="modal-image"/>
                        <button className="close-button" onClick={closeModal}>Fechar</button>
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
}
