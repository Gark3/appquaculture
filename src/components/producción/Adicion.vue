<template>
  <div class="adicion-organismos">
    <h1>Adición de Organismos</h1>

    <form @submit.prevent="agregarOrganismos">
      <!-- Selección de Siembra -->
      <div class="form-group">
        <label for="siembra">Selecciona la siembra:</label>
        <select v-model="adicion.siembra" id="siembra" required>
          <option v-for="siembra in siembras" :key="siembra.id" :value="siembra.id">
            {{ siembra.nombre }} ({{ siembra.especie }})
          </option>
        </select>
      </div>

      <!-- Número de Organismos -->
      <div class="form-group">
        <label for="numero-organismos">Número de organismos a agregar:</label>
        <input type="number" id="numero-organismos" v-model.number="adicion.numeroOrganismos" required min="1" />
      </div>

      <!-- Peso Promedio -->
      <div class="form-group">
        <label for="peso-promedio">Peso promedio por organismo (g):</label>
        <input type="number" id="peso-promedio" v-model.number="adicion.pesoPromedio" step="0.01" required min="0.1" />
      </div>

      <!-- Fecha de Adición -->
      <div class="form-group">
        <label for="fecha-adicion">Fecha de adición:</label>
        <input type="date" id="fecha-adicion" v-model="adicion.fecha" required />
      </div>

      <button type="submit" class="btn-agregar" :disabled="loading">
        {{ loading ? 'Agregando...' : 'Agregar Organismos' }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";

export default {
  setup() {
    const siembras = ref([]);
    const loading = ref(false);

    const adicion = reactive({
      siembra: "",
      numeroOrganismos: null,
      pesoPromedio: null,
      fecha: ""
    });

    const fetchSiembras = async () => {
      try {
        // Simulación de carga de siembras
        await new Promise(resolve => setTimeout(resolve, 1000));
        siembras.value = [
          { id: 1, nombre: "Siembra Tilapia", especie: "Tilapia - Oreochromis niloticus" },
          { id: 2, nombre: "Siembra Camarón", especie: "Camarón blanco del Pacífico - Litopenaeus vannamei" }
        ];
      } catch (error) {
        console.error("Error al cargar siembras", error);
      }
    };

    const agregarOrganismos = async () => {
      if (!adicion.siembra || !adicion.numeroOrganismos || !adicion.pesoPromedio || !adicion.fecha) {
        alert("Por favor, complete todos los campos.");
        return;
      }
      loading.value = true;
      try {
        console.log("Agregando organismos:", adicion);
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Organismos agregados exitosamente");
      } catch (error) {
        alert("Error al agregar organismos");
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchSiembras);

    return { siembras, adicion, agregarOrganismos, loading };
  }
};
</script>

<style scoped>
.adicion-organismos {
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

input, select {
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
