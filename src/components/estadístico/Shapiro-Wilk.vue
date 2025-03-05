<template>
  <div class="shapiro-container">
    <h1>Prueba de Shapiro-Wilk</h1>
    <div class="form-group">
      <label for="estanque">Selecciona un estanque:</label>
      <select v-model="selectedEstanque" id="estanque" @change="resetFormulario">
        <option v-for="estanque in estanques" :key="estanque.id" :value="estanque.id">
          {{ estanque.nombre }}
        </option>
      </select>
    </div>
    
    <div v-if="selectedEstanque" class="result-section">
      <h2>Datos del Estanque</h2>
      <ul>
        <li v-for="(dato, index) in getDatosEstanque(selectedEstanque)" :key="index">{{ dato }}</li>
      </ul>
      <button @click="realizarPrueba">Realizar Prueba de Shapiro-Wilk</button>
      <div v-if="resultado" class="result-box">
        <h3>Resultado:</h3>
        <p><strong>W:</strong> {{ resultado.W.toFixed(4) }}</p>
        <p><strong>p-valor:</strong> {{ resultado.pValor.toFixed(4) }}</p>
        <p :class="{ 'normal': resultado.esNormal, 'not-normal': !resultado.esNormal }">
          {{ resultado.esNormal ? 'Los datos siguen una distribución normal' : 'Los datos no siguen una distribución normal' }}
        </p>
        <button @click="exportarExcel">Descargar Excel</button>
      </div>
      <div v-if="resultado">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { calcularShapiroWilk } from '@/utils/shapiroWilk';
import * as XLSX from 'xlsx';
import { nextTick, ref } from 'vue';
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      estanques: [
        { id: 1, nombre: 'Estanque A', datos: [1012.5, 12.3, 339.8, 8.2, 7.7, 1144.5, 6.1, 8.8, 10.9, 9.4, 12.9, 11.7, 7.6, 10.3, 9.1, 12.0, 11.2, 8.0, 10.7, 12.8] },
        { id: 2, nombre: 'Estanque B', datos: [20.1, 25.5, 29.3, 23.7, 27.2, 32.8, 21.9, 33.5, 25.7, 34.0, 22.3, 21.0, 23.9, 22.7, 31.5, 24.5, 23.2, 30.8, 22.0, 21.8] }
      ],
      selectedEstanque: null,
      resultado: null,
      chartInstance: null,
      chartCanvas: ref(null)
    };
  },
  methods: {
    getDatosEstanque(id) {
      const estanque = this.estanques.find(e => e.id === id);
      return estanque ? estanque.datos : [];
    },
    async realizarPrueba() {
      const datos = this.getDatosEstanque(this.selectedEstanque).map(Number);
      this.resultado = calcularShapiroWilk(datos);
      await nextTick();
      this.renderChart(datos);
    },
    async exportarExcel() {
      const estanque = this.estanques.find(e => e.id === this.selectedEstanque);
      if (!estanque || !this.resultado) {
        alert('Debe realizar la prueba antes de exportar.');
        return;
      }
      
      const wb = XLSX.utils.book_new();
      const wsData = [
        ['Estanque', estanque.nombre],
        ['Datos', ...estanque.datos],
        ['Resultado W', this.resultado.W],
        ['p-Valor', this.resultado.pValor],
        ['Conclusión', this.resultado.esNormal ? 'Distribución normal' : 'No distribución normal']
      ];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
      
      if (this.chartInstance) {
        const imgData = this.chartInstance.toBase64Image();
        const img = new Image();
        img.src = imgData;
        img.onload = () => {
          const wsImage = XLSX.utils.aoa_to_sheet([['Gráfico de distribución']]);
          XLSX.utils.book_append_sheet(wb, wsImage, 'Gráfico');
          XLSX.writeFile(wb, `ShapiroWilk_${estanque.nombre}.xlsx`);
        };
      } else {
        XLSX.writeFile(wb, `ShapiroWilk_${estanque.nombre}.xlsx`);
      }
    },
    resetFormulario() {
      this.resultado = null;
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
    },
    renderChart(datos) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      if (!this.$refs.chartCanvas) return;
      
      const ctx = this.$refs.chartCanvas.getContext('2d');
      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: datos.map((_, i) => `Dato ${i + 1}`),
          datasets: [{
            label: 'Distribución de datos',
            data: datos,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>



<style scoped>
.shapiro-container {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 10px;
}

h1, h2, h3 {
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
  margin-top: 10px;
}

button:hover {
  background-color: #218838;
}
</style>
