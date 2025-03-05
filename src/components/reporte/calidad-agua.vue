<template>
  <div class="grafico-container">
    <h1>Visualización de Parámetros por Estanque</h1>
    <form class="form-seleccion" @submit.prevent="actualizarGrafico">
      <div class="form-group">
        <label for="estanque">Seleccione un Estanque:</label>
        <select id="estanque" v-model="estanqueSeleccionado" required>
          <option v-for="estanque in estanques" :key="estanque" :value="estanque">
            {{ estanque }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="periodo">Seleccione el Periodo de Tiempo:</label>
        <select id="periodo" v-model="periodoSeleccionado" required>
          <option v-for="periodo in periodos" :key="periodo" :value="periodo">
            {{ periodo }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="parametro">Seleccione el Parámetro:</label>
        <select id="parametro" v-model="parametroSeleccionado" required>
          <option v-for="parametro in parametros" :key="parametro" :value="parametro">
            {{ parametro }}
          </option>
        </select>
      </div>
      <button type="submit">Generar Gráfico</button>
    </form>

    <canvas id="grafico" style="max-width: 100%; margin-top: 20px;"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "GraficoEstanque",
  setup() {
    // Opciones para estanques, periodos y parámetros
    const estanques = ["Estanque 1", "Estanque 2", "Estanque 3", "Estanque 4", "Estanque 5"];
    const periodos = ["Ayer", "7 días", "15 días", "1 mes", "2 meses", "3 meses", "4 meses"];
    const parametros = ["Oxígeno disuelto", "pH", "Nitritos", "Nitratos", "Sulfato", "Fosfato", "Cloro", "Salinidad", "Caudal"];

    const estanqueSeleccionado = ref(estanques[0]);
    const periodoSeleccionado = ref(periodos[0]);
    const parametroSeleccionado = ref(parametros[0]);
    const chartInstance = ref(null);

    // Generador de datos aleatorios
    const generarDatos = (cantidad) => {
      return Array.from({ length: cantidad }, () => Math.random() * 1000 + 1);
    };

    // Crear datos de ejemplo para los estanques y parámetros
    const datosEstanques = {
      "Estanque 1": {
        "Oxígeno disuelto": generarDatos(30),
        "pH": generarDatos(30),
        "Nitritos": generarDatos(30),
        "Nitratos": generarDatos(30),
        "Sulfato": generarDatos(30),
        "Fosfato": generarDatos(30),
        "Cloro": generarDatos(30),
        "Salinidad": generarDatos(30),
        "Caudal": generarDatos(30),
      },
      "Estanque 2": {
        // Datos generados de forma similar para otros estanques...
        "Oxígeno disuelto": generarDatos(30),
        "pH": generarDatos(30),
        "Nitritos": generarDatos(30),
        "Nitratos": generarDatos(30),
        "Sulfato": generarDatos(30),
        "Fosfato": generarDatos(30),
        "Cloro": generarDatos(30),
        "Salinidad": generarDatos(30),
        "Caudal": generarDatos(30),
      },
      // Repite para los otros estanques
    };

    // Etiquetas de tiempo basadas en el período seleccionado
    const generarEtiquetas = (periodo) => {
      const etiquetas = {
        "Ayer": ["Mañana", "Tarde", "Noche"],
        "7 días": Array.from({ length: 7 }, (_, i) => `Día ${i + 1}`),
        "15 días": Array.from({ length: 15 }, (_, i) => `Día ${i + 1}`),
        "1 mes": Array.from({ length: 30 }, (_, i) => `Día ${i + 1}`),
        "2 meses": Array.from({ length: 60 }, (_, i) => `Día ${i + 1}`),
        "3 meses": Array.from({ length: 90 }, (_, i) => `Día ${i + 1}`),
        "4 meses": Array.from({ length: 120 }, (_, i) => `Día ${i + 1}`),
      };
      return etiquetas[periodo] || [];
    };

    // Configurar el gráfico con Chart.js
    const configurarGrafico = () => {
      const ctx = document.getElementById("grafico").getContext("2d");
      const etiquetas = generarEtiquetas(periodoSeleccionado.value);
      const datos = datosEstanques[estanqueSeleccionado.value][parametroSeleccionado.value];

      if (chartInstance.value) {
        chartInstance.value.destroy();
      }

      chartInstance.value = new Chart(ctx, {
        type: "line",
        data: {
          labels: etiquetas,
          datasets: [
            {
              label: `${parametroSeleccionado.value} en ${estanqueSeleccionado.value}`,
              data: datos.slice(0, etiquetas.length),
              borderColor: "#28a745",
              backgroundColor: "rgba(40, 167, 69, 0.2)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Tiempo",
              },
            },
            y: {
              title: {
                display: true,
                text: "Valor",
              },
              beginAtZero: true,
            },
          },
        },
      });
    };

    // Actualizar gráfico
    const actualizarGrafico = () => {
      configurarGrafico();
    };

    onMounted(() => {
      configurarGrafico();
    });

    return {
      estanques,
      periodos,
      parametros,
      estanqueSeleccionado,
      periodoSeleccionado,
      parametroSeleccionado,
      actualizarGrafico,
    };
  },
};
</script>

<style scoped>
.grafico-container {
  font-family: Arial, sans-serif;
  max-width: 800px;
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

.form-seleccion {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
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
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

button:hover {
  background-color: #218838;
}

canvas {
  margin-top: 20px;
}
</style>
