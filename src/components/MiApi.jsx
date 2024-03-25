export async function getMonedas() {
    try {
      const response = await fetch("https://mindicador.cl/api/");
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const monedas = Object.keys(data).filter(moneda => moneda !== 'autor' && moneda !== 'fecha' && moneda !== 'version');
      return monedas.map(moneda => ({ value: moneda, nombre: data[moneda].nombre }));
    } catch (error) {
      console.error('Hubo un problema al obtener los datos:', error);
      return [];
    }
  }
  
  export async function convertirMonto(monto, moneda) {
    try {
      const response = await fetch(`https://mindicador.cl/api/${moneda}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const valorMoneda = data.serie[0].valor;
      const resultado = monto / valorMoneda;
      return { resultado: resultado.toFixed(2), codigo: data.codigo };
    } catch (error) {
      console.error('Hubo un problema al obtener los datos:', error);
      return { error: 'Hubo un problema al realizar la conversión.' };
    }
  }
  