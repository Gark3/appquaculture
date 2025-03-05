<template>
    <div class="anova-container">
      <h1>Prueba ANOVA</h1>
      <div class="form-group">
        <label for="estanques">Selecciona los estanques a comparar:</label>
        <select id="estanques" v-model="estanquesSeleccionados" multiple>
          <option v-for="estanque in estanques" :key="estanque.id" :value="estanque.id">
            {{ estanque.nombre }}
          </option>
        </select>
      </div>
      <button @click="realizarANOVA">Realizar ANOVA</button>
      <div v-if="resultado">
        <h2>Resultados:</h2>
        <p>Valor F: {{ resultado.F.toFixed(4) }}</p>
        <p>Valor P: "No calculado"</p>
        <p v-if="resultado.F > resultado.F_crit">Existe una diferencia significativa entre los estanques.</p>
        <p v-else>No hay evidencia suficiente para afirmar que hay diferencias significativas.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const estanques = ref([
        { id: 1, nombre: 'Estanque A', datos: [2.1, 2.3, 2.5, 2.4, 2.6] },
        { id: 2, nombre: 'Estanque B', datos: [2.2, 2.2, 2.5, 3.4, 2.6] },
        { id: 3, nombre: 'Estanque C', datos: [3.2, 3.3, 3.1, 3.4, 3.5] },
        { id: 4, nombre: 'Estanque D', datos: [2.9, 3.0, 3.1, 3.2, 3.0] },
        { id: 5, nombre: 'Estanque E', datos: [3.5, 3.6, 3.4, 3.7, 3.8] }
      ]);
      const estanquesSeleccionados = ref([]);
      const resultado = ref(null);
  
      const calcularMedia = (datos) => {
        return datos.reduce((acc, val) => acc + val, 0) / datos.length;
      };
  
      const realizarANOVA = () => {
        if (estanquesSeleccionados.value.length < 2) {
          alert('Seleccione al menos dos estanques para comparar.');
          return;
        }
        
        const datosSeleccionados = estanquesSeleccionados.value.map(id => 
          estanques.value.find(e => e.id === id).datos
        );
        
        const medias = datosSeleccionados.map(calcularMedia);
        const globalMedia = calcularMedia(datosSeleccionados.flat());
        const n = datosSeleccionados[0].length;
        const k = datosSeleccionados.length;
        
        let SSB = 0; // Suma de cuadrados entre grupos
        let SSW = 0; // Suma de cuadrados dentro de grupos
        
        datosSeleccionados.forEach((grupo, i) => {
          SSB += grupo.length * Math.pow(medias[i] - globalMedia, 2);
          grupo.forEach(valor => {
            SSW += Math.pow(valor - medias[i], 2);
          });
        });
        
        const dfb = k - 1;
        const dfw = k * (n - 1);
        const MSB = SSB / dfb;
        const MSW = SSW / dfw;
        const F = MSB / MSW;
        
        resultado.value = {
          F,
          F_crit: 3.0 // Valor crítico de referencia (aproximado para dfb=3, dfw=16 y 95% de confianza)
        };
      };
  
      return { estanques, estanquesSeleccionados, realizarANOVA, resultado };
    }
  };
  </script>
  
  <style scoped>
  .anova-container {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    display: block;
    width: 100%;
  }
  
  button:hover {
    background-color: #218838;
  }
  </style>
  