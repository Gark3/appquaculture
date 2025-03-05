<template>
  <div class="tratamientos">
    <h1>Registrar Tratamiento</h1>

    <form @submit.prevent="registrarTratamiento">
      <!-- Selección de Estanque -->
      <div class="form-group">
        <label for="estanque">Selecciona el estanque:</label>
        <select v-model="tratamiento.estanque" id="estanque" required>
          <option v-for="estanque in estanques" :key="estanque.id" :value="estanque.id">
            {{ estanque.nombre }}
          </option>
        </select>
      </div>

      <!-- Motivo del Tratamiento -->
      <div class="form-group">
        <label for="motivo">Motivo del tratamiento:</label>
        <input type="text" id="motivo" v-model="tratamiento.motivo" required />
      </div>

      <!-- Tratamiento Aplicado -->
      <div class="form-group">
        <label for="tipo">Tratamiento aplicado:</label>
        <input type="text" id="tipo" v-model="tratamiento.tipo" required />
      </div>

      <!-- Cantidad Suministrada -->
      <div class="form-group">
        <label for="cantidad">Cantidad suministrada (ml/g):</label>
        <input type="number" id="cantidad" v-model.number="tratamiento.cantidad" required min="1" step="0.1" />
      </div>

      <!-- Frecuencia del Tratamiento -->
      <div class="form-group">
        <label for="frecuencia">Frecuencia de aplicación:</label>
        <select v-model="tratamiento.frecuencia" id="frecuencia" required>
          <option>Diaria</option>
          <option>Semanal</option>
          <option>Mensual</option>
        </select>
      </div>

      <!-- Observaciones -->
      <div class="form-group">
        <label for="observaciones">Observaciones:</label>
        <textarea id="observaciones" v-model="tratamiento.observaciones"></textarea>
      </div>

      <!-- Botón de Registro -->
      <button type="submit" class="btn-registrar" :disabled="loading">
        {{ loading ? 'Registrando...' : 'Registrar Tratamiento' }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";

export default {
  setup() {
    const estanques = ref([]);
    const loading = ref(false);

    const tratamiento = reactive({
      estanque: "",
      motivo: "",
      tipo: "",
      cantidad: null,
      frecuencia: "",
      observaciones: ""
    });

    const fetchEstanques = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        estanques.value = [
          { id: 1, nombre: "Estanque 1" },
          { id: 2, nombre: "Estanque 2" },
          { id: 3, nombre: "Estanque 3" }
        ];
      } catch (error) {
        console.error("Error al cargar estanques", error);
      }
    };

    const registrarTratamiento = async () => {
      if (!tratamiento.estanque || !tratamiento.motivo || !tratamiento.tipo || !tratamiento.cantidad || !tratamiento.frecuencia) {
        alert("Por favor, complete todos los campos.");
        return;
      }
      loading.value = true;
      try {
        console.log("Registrando tratamiento:", tratamiento);
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Tratamiento registrado exitosamente");
      } catch (error) {
        alert("Error al registrar el tratamiento");
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchEstanques);

    return { estanques, tratamiento, registrarTratamiento, loading };
  }
};
</script>

<style scoped>
.tratamientos {
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

input, select, textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  resize: vertical;
  height: 100px;
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
