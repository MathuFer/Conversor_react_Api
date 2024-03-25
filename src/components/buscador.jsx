import React, { useState, useEffect } from 'react';

function Buscador({ registros, setRegistros }) {
  const [fechaBusqueda, setFechaBusqueda] = useState('');

  useEffect(() => {
    const now = new Date();
    const today = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    setFechaBusqueda(today);
  }, []);

  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);

  useEffect(() => {
    setRegistrosFiltrados(registros);
  }, [registros]);

  useEffect(() => {
    filtrarRegistrosPorFecha(fechaBusqueda);
  }, [fechaBusqueda]);

  const handleFechaChange = (e) => {
    setFechaBusqueda(e.target.value);
  };

  const filtrarRegistrosPorFecha = (fecha) => {
    const registrosFiltrados = registros.filter(registro => registro.fecha.includes(fecha));
    setRegistrosFiltrados(registrosFiltrados);
  };

  return (
    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <input
        type="date"
        value={fechaBusqueda}
        onChange={handleFechaChange}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Moneda</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          {registrosFiltrados.map((registro, index) => (
            <tr key={index}>
              <td>{registro.fecha}</td>
              <td>{registro.monto}</td>
              <td>{registro.moneda}</td>
              <td>{registro.resultado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Buscador;
