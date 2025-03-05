<template>
  <div class="dieta">
    <h1>Registrar Dieta</h1>

    <form @submit.prevent="registrarDieta">
      <!-- Selección de Estanque -->
      <div class="form-group">
        <label for="estanque">Selecciona el estanque:</label>
        <select v-model="dieta.estanque" id="estanque" required>
          <option v-for="estanque in estanques" :key="estanque.id" :value="estanque.id">
            {{ estanque.nombre }}
          </option>
        </select>
      </div>

      <!-- Selección de Alimento -->
      <div class="form-group">
        <label for="alimento">Selecciona el alimento:</label>
        <select v-model="dieta.alimento" id="alimento" required>
          <option v-for="alimento in alimentos" :key="alimento" :value="alimento">
            {{ alimento }}
          </option>
        </select>
      </div>

      <!-- Peso Meta -->
      <div class="form-group">
        <label for="peso-meta">Peso meta por organismo (g):</label>
        <input type="number" id="peso-meta" v-model.number="dieta.pesoMeta" required min="1" step="0.1" />
      </div>

      <!-- Tiempo Estimado -->
      <div class="form-group">
        <label for="tiempo">Tiempo estimado (días):</label>
        <input type="number" id="tiempo" v-model.number="dieta.tiempoEstimado" required min="1" />
      </div>

      <!-- Frecuencia de Alimentación -->
      <div class="form-group">
        <label for="frecuencia">Frecuencia de alimentación diaria:</label>
        <select v-model="dieta.frecuencia" id="frecuencia" required>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>

      <!-- Notas Adicionales -->
      <div class="form-group">
        <label for="notas">Notas adicionales:</label>
        <textarea id="notas" v-model="dieta.notas"></textarea>
      </div>

      <!-- Botón de Registro -->
      <button type="submit" class="btn-registrar" :disabled="loading">
        {{ loading ? 'Registrando...' : 'Registrar Dieta' }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";

export default {
  setup() {
    const estanques = ref([]);
    const alimentos = ref(["Pellet flotante", "Harina de pescado", "Algas", "Piensos balanceados"]);
    const loading = ref(false);

    const dieta = reactive({
      estanque: "",
      alimento: "",
      pesoMeta: null,
      tiempoEstimado: null,
      frecuencia: "",
      notas: ""
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

    const registrarDieta = async () => {
      if (!dieta.estanque || !dieta.alimento || !dieta.pesoMeta || !dieta.tiempoEstimado || !dieta.frecuencia) {
        alert("Por favor, complete todos los campos.");
        return;
      }
      loading.value = true;
      try {
        console.log("Registrando dieta:", dieta);
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Dieta registrada exitosamente");
      } catch (error) {
        alert("Error al registrar la dieta");
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchEstanques);

    return { estanques, alimentos, dieta, registrarDieta, loading };
  }
};
</script>

<style scoped>
.dieta {
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
