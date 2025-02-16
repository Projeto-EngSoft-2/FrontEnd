import React, { useEffect, useState } from "react";
import "./ReportPage.css";

export default function ReportsPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    return (
        <div className="reports-container">
            <h1 className="reports-title">Seus reports</h1>
            {loading && <p>Carregando...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && reports.length === 0 && <p>Nenhum report encontrado.</p>}
            <ul className="reports-list">
                {reports.map((report) => (
                    <li key={report.id} className="report-item">
                        <h3>{report.title}</h3>
                        <img src={report.imageUrl} alt={report.title} className="report-image"/>
                    </li>
                ))}
            </ul>
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
