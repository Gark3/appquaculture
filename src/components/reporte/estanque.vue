<template>
  <div class="reporte-estanque">
    <h1>Reporte de Estanque</h1>

    <form @submit.prevent="obtenerCiclos">
      <div class="form-group">
        <label for="estanque">Selecciona el estanque:</label>
        <select v-model="filtro.estanque" id="estanque" required>
          <option v-for="estanque in estanques" :key="estanque.id" :value="estanque.nombre">
            {{ estanque.nombre }}
          </option>
        </select>
      </div>
      
      <button type="submit" class="btn-generar" :disabled="loading">
        {{ loading ? 'Cargando...' : 'Obtener Ciclos' }}
      </button>
    </form>

    <div v-if="ciclos.length">
      <table>
        <thead>
          <tr>
            <th>Ciclo</th>
            <th>Fecha de Siembra</th>
            <th>Fecha de Cosecha</th>
            <th>Reporte</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ciclo in ciclos" :key="ciclo.id">
            <td>{{ ciclo.id }}</td>
            <td>{{ ciclo.fechaSiembra }}</td>
            <td>{{ ciclo.fechaCosecha || 'En proceso' }}</td>
            <td>
              <button @click="exportarPDF(ciclo)" class="btn-exportar">
                Exportar PDF
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default {
  setup() {
    const estanques = ref([]);
    const ciclos = ref([]);
    const loading = ref(false);
    const filtro = reactive({ estanque: "" });

    const fetchEstanques = async () => {
      estanques.value = [
        { id: 1, nombre: "Estanque A" },
        { id: 2, nombre: "Estanque B" }
      ];
    };

    const obtenerCiclos = async () => {
      loading.value = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        ciclos.value = [
          { id: 1, sembrador: "Juan Perez", fechaSiembra: "2024-01-10", especie: "Tilapia", organismos: 1000, alimentos: [{ lote: "Lote A", cantidad: "50kg" }, { lote: "Lote B", cantidad: "30kg" }], fechaCosecha: "2024-03-15", biomasa: "500kg", fca: "1.2" },
          { id: 2, sembrador: "Ana López", fechaSiembra: "2024-02-05", especie: "Bagre", organismos: 800, alimentos: [{ lote: "Lote C", cantidad: "40kg" }], fechaCosecha: null, biomasa: null, fca: null }
        ];
      } catch (error) {
        alert("Error al obtener ciclos");
      } finally {
        loading.value = false;
      }
    };

    const exportarPDF = (ciclo) => {
      const doc = new jsPDF();
      const nombreArchivo = `Reporte_${filtro.estanque}_Ciclo_${ciclo.fechaSiembra}_${ciclo.fechaCosecha || 'En_proceso'}.pdf`;
      doc.text(`Reporte del Ciclo - ${filtro.estanque}`, 10, 10);
      autoTable(doc, {
        head: [["Campo", "Valor"]],
        body: [
          ["Sembrador", ciclo.sembrador],
          ["Fecha de Siembra", ciclo.fechaSiembra],
          ["Especie", ciclo.especie],
          ["Número de Organismos", ciclo.organismos],
          ["Alimentos", ciclo.alimentos.map(a => `${a.lote} - ${a.cantidad}`).join(", ")],
          ["Fecha de Cosecha", ciclo.fechaCosecha || "En proceso"],
          ["Biomasa Obtenida", ciclo.biomasa || "N/A"],
          ["FCA Obtenido", ciclo.fca || "N/A"]
        ]
      });
      doc.save(nombreArchivo);
    };

    onMounted(fetchEstanques);

    return {
      estanques,
      ciclos,
      filtro,
      obtenerCiclos,
      exportarPDF,
      loading
    };
  }
};
</script>

<style scoped>
.reporte-estanque {
  font-family: Arial, sans-serif;
  max-width: 900px;
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table, th, td {
  border: 1px solid #ccc;
}

th, td {
  padding: 10px;
  text-align: center;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
