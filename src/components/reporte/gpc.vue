<template>
  <div class="gpc">
    <h1>Ganancias por Ciclo (GPC)</h1>

    <form @submit.prevent="obtenerGastos">
      <div class="form-group">
        <label for="estanque">Selecciona el estanque:</label>
        <select v-model="filtro.estanque" id="estanque" required>
          <option v-for="estanque in estanques" :key="estanque.id" :value="estanque.nombre">
            {{ estanque.nombre }}
          </option>
        </select>
      </div>
      
      <button type="submit" class="btn-generar" :disabled="loading">
        {{ loading ? 'Cargando...' : 'Obtener Datos' }}
      </button>
    </form>

    <div v-if="gastos.length">
      <h2>Gastos por Categoría</h2>
      <div v-for="(categoria, index) in categorias" :key="index" class="categoria">
        <h3>{{ categoria.nombre }}</h3>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Detalle</th>
              <th>Cantidad</th>
              <th>Responsable</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="gasto in filtrarGastos(categoria.tipo)" :key="gasto.id">
              <td>{{ gasto.fecha }}</td>
              <td>{{ gasto.detalle }}</td>
              <td>{{ gasto.cantidad }}</td>
              <td>{{ gasto.responsable }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="exportarPDF" class="btn-exportar">Exportar PDF</button>
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
    const gastos = ref([]);
    const loading = ref(false);
    const filtro = reactive({ estanque: "" });

    const categorias = [
      { nombre: "Alimentación", tipo: "alimentacion" },
      { nombre: "Tratamientos", tipo: "tratamientos" },
      { nombre: "Materiales", tipo: "materiales" },
      { nombre: "Gastos Operativos", tipo: "operativos" }
    ];

    const fetchEstanques = async () => {
      estanques.value = [
        { id: 1, nombre: "Estanque A" },
        { id: 2, nombre: "Estanque B" }
      ];
    };

    const obtenerGastos = async () => {
      loading.value = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        gastos.value = [
          { id: 1, tipo: "alimentacion", fecha: "2024-02-01", detalle: "Lote A - 50kg", cantidad: "$200", responsable: "Juan Perez" },
          { id: 2, tipo: "tratamientos", fecha: "2024-02-05", detalle: "Antibióticos", cantidad: "$100", responsable: "Ana López" },
          { id: 3, tipo: "materiales", fecha: "2024-02-10", detalle: "Red de Pesca", cantidad: "$50", responsable: "Carlos Díaz" },
          { id: 4, tipo: "operativos", fecha: "2024-02-15", detalle: "Electricidad", cantidad: "$300", responsable: "Pedro Gómez" }
        ];
      } catch (error) {
        alert("Error al obtener datos");
      } finally {
        loading.value = false;
      }
    };

    const filtrarGastos = (tipo) => {
      return gastos.value.filter(gasto => gasto.tipo === tipo);
    };

    const exportarPDF = () => {
      const doc = new jsPDF();
      const nombreArchivo = `GPC_${filtro.estanque}.pdf`;
      doc.text(`Ganancias por Ciclo - ${filtro.estanque}`, 10, 10);
      
      categorias.forEach((categoria) => {
        const datos = filtrarGastos(categoria.tipo);
        if (datos.length) {
          doc.addPage();
          doc.text(categoria.nombre, 10, 10);
          autoTable(doc, {
            head: [["Fecha", "Detalle", "Cantidad", "Responsable"]],
            body: datos.map(g => [g.fecha, g.detalle, g.cantidad, g.responsable])
          });
        }
      });
      
      doc.save(nombreArchivo);
    };

    onMounted(fetchEstanques);

    return {
      estanques,
      gastos,
      filtro,
      obtenerGastos,
      exportarPDF,
      categorias,
      filtrarGastos,
      loading
    };
  }
};
</script>

<style scoped>
.gpc {
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
