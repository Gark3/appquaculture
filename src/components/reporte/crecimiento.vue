<template>
  <div class="crecimiento">
    <h1>Registro de Crecimiento</h1>

    <form @submit.prevent="obtenerDatosCrecimiento">
      <div class="form-group">
        <label for="estanque">Selecciona el estanque:</label>
        <select v-model="filtro.estanque" id="estanque" required>
          <option v-for="estanque in estanques" :key="estanque.id" :value="estanque.id">
            {{ estanque.nombre }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="fecha">Selecciona la fecha:</label>
        <input type="date" id="fecha" v-model="filtro.fecha" required />
      </div>

      <button type="submit" class="btn-generar" :disabled="loading">
        {{ loading ? 'Generando...' : 'Generar Datos' }}
      </button>
    </form>

    <div v-if="datosCrecimiento.length">
      <canvas ref="graficoCrecimiento"></canvas>

      <button @click="exportarExcel" class="btn-exportar">Exportar a Excel</button>
      <button @click="exportarPDF" class="btn-exportar">Exportar a PDF</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import Chart from "chart.js/auto";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default {
  setup() {
    const estanques = ref([]);
    const datosCrecimiento = ref([]);
    const loading = ref(false);
    const filtro = reactive({ estanque: "", fecha: "" });
    const graficoCrecimiento = ref(null);
    let chartInstance = null;

    const generarDatosEjemplo = (fecha) => {
      return Array.from({ length: 20 }, () => ({
        peso: Math.floor(Math.random() * 100) + 50
      }));
    };

    const obtenerDatosCrecimiento = async () => {
      loading.value = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        datosCrecimiento.value = generarDatosEjemplo(filtro.fecha);
        generarGrafico();
      } catch (error) {
        alert("Error al obtener datos de crecimiento");
      } finally {
        loading.value = false;
      }
    };

    const generarGrafico = () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
      const ctx = graficoCrecimiento.value.getContext("2d");
      const pesos = datosCrecimiento.value.map(d => d.peso);
      const bins = Array.from({ length: 20 }, (_, i) => i * 5);
      const frecuencias = bins.map(bin => pesos.filter(p => p >= bin && p < bin + 5).length);

      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: bins.map(bin => `${bin}-${bin + 5}g`),
          datasets: [{
            label: "Frecuencia de Peso",
            data: frecuencias,
            backgroundColor: "blue"
          }]
        }
      });
    };

    const exportarExcel = () => {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(datosCrecimiento.value);
      XLSX.utils.book_append_sheet(wb, ws, "Crecimiento");
      XLSX.writeFile(wb, `crecimiento_${filtro.fecha}.xlsx`);
    };

    const exportarPDF = () => {
      const doc = new jsPDF();
      doc.text("Reporte de Crecimiento", 10, 10);
      autoTable(doc, {
        head: [["Peso (g)"]],
        body: datosCrecimiento.value.map(d => [d.peso])
      });
      doc.save(`reporte_crecimiento_${filtro.fecha}.pdf`);
    };

    onMounted(() => {
      estanques.value = [
        { id: 1, nombre: "Estanque A" },
        { id: 2, nombre: "Estanque B" }
      ];
    });

    return {
      estanques,
      filtro,
      datosCrecimiento,
      obtenerDatosCrecimiento,
      exportarExcel,
      exportarPDF,
      graficoCrecimiento,
      loading
    };
  }
};
</script>

<style scoped>
.crecimiento {
  font-family: Arial, sans-serif;
  max-width: 700px;
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

input, select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #007bff;
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>