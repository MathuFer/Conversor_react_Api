import React, { useState, useEffect } from 'react';
import { getMonedas, convertirMonto } from './components/MiApi';
import Buscador from './components/buscador';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [conversionResult, setConversionResult] = useState('');
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const monedas = await getMonedas();
      setCurrencies(monedas);
    };
    fetchCurrencies();
  }, []);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleConvert = async () => {
    if (!amount || !selectedCurrency) return;
    const { resultado, codigo, error } = await convertirMonto(amount, selectedCurrency);
    if (resultado) {
      setConversionResult(`Resultado: ${resultado} ${codigo}`);
      const now = new Date();
      const fecha = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
      const nuevoRegistro = { fecha, monto: amount, moneda: selectedCurrency, resultado: `${resultado} ${codigo}` };
      const nuevosRegistros = [...registros, nuevoRegistro];
      setRegistros(nuevosRegistros);
      localStorage.setItem('registros', JSON.stringify(nuevosRegistros));
    } else {
      setConversionResult(error);
    }
  };

  return (
    <div className='titulo'>
      <h1>Conversor de Moneda</h1>
      <div className='contenedor'>
        <div className='conversion'>
          <input
            type="number"
            value={amount}
            onChange={handleChange}
            placeholder="Ingrese el monto en pesos chilenos"
          />
          <select id="moneda" onChange={handleCurrencyChange}>
            <option value="">Seleccione una moneda</option>
            {currencies.map((currency) => (
              <option key={currency.value} value={currency.value}>
                {currency.nombre}
              </option>
            ))}
          </select>
          <button onClick={handleConvert}>Convertir</button>
          <div id="resultado">{conversionResult}</div>
        </div>
        <div className="registro">
          <h2>Registros:</h2>
          <Buscador registros={registros} setRegistros={setRegistros} />
        </div> 
      </div>     
    </div>
  );
}

export default App;


