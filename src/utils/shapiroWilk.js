export function calcularShapiroWilk(data) {
    if (data.length < 3) {
      return { W: null, pValor: null, esNormal: false };
    }
  
    // Ordenar los datos
    const sortedData = [...data].sort((a, b) => a - b);
    const n = sortedData.length;
  
    // Coeficientes de Shapiro-Wilk (aproximación)
    const coefficients = computeCoefficients(n);
    
    // Media de los datos
    const mean = sortedData.reduce((sum, value) => sum + value, 0) / n;
  
    // Varianza de los datos
    const variance = sortedData.reduce((sum, value) => sum + (value - mean) ** 2, 0);
  
    // Cálculo del estadístico W
    let numerator = 0;
    for (let i = 0; i < Math.floor(n / 2); i++) {
        numerator += coefficients[i] * (sortedData[n - 1 - i] - sortedData[i]);
    }
    numerator = numerator ** 2;
  
    const W = numerator / variance;
  
    // Estimación del valor p (usando aproximaciones de tablas)
    const pValor = approximatePValue(W, n);
  
    return { W, pValor, esNormal: pValor > 0.05 };
}

// Función para calcular coeficientes de Shapiro-Wilk
function computeCoefficients(n) {
    const m = Math.floor(n / 2);
    const coefficients = new Array(m);
    
    for (let i = 0; i < m; i++) {
        coefficients[i] = Math.sqrt((n - i - 1) / (n - i));
    }
    return coefficients;
}

// Función de aproximación del valor p basada en W y el tamaño de la muestra
function approximatePValue(W, n) {
    if (n < 3) return 1;
    if (W > 0.99) return 1.0;
    if (W < 0.1) return 0.0;
    return Math.exp(-1.2337 * W ** 2 + 1.5943 * W - 0.8169);
}