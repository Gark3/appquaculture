<template>
  <div class="cuarentena">
    <h1>Registrar Cuarentena</h1>

    <form @submit.prevent="registrarCuarentena">
      <!-- Selección de Estanque -->
      <div class="form-group">
        <label for="estanque">Selecciona el estanque:</label>
        <select v-model="cuarentena.estanque" id="estanque" required>
          <option v-for="estanque in estanques" :key="estanque.id" :value="estanque.id">
            {{ estanque.nombre }}
          </option>
        </select>
      </div>

      <!-- Motivo de Cuarentena -->
      <div class="form-group">
        <label for="motivo">Motivo de la cuarentena:</label>
        <input type="text" id="motivo" v-model="cuarentena.motivo" required />
      </div>

      <!-- Descripción de lo sucedido -->
      <div class="form-group">
        <label for="descripcion">Descripción de lo sucedido:</label>
        <textarea id="descripcion" v-model="cuarentena.descripcion" required></textarea>
      </div>

      <!-- Botón de Registro -->
      <button type="submit" class="btn-registrar" :disabled="loading">
        {{ loading ? 'Registrando...' : 'Registrar Cuarentena' }}
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

    const cuarentena = reactive({
      estanque: "",
      motivo: "",
      descripcion: ""
    });

    const fetchEstanques = async () => {
      try {
        // Simulación de carga de estanques
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

    const registrarCuarentena = async () => {
      if (!cuarentena.estanque || !cuarentena.motivo || !cuarentena.descripcion) {
        alert("Por favor, complete todos los campos.");
        return;
      }
      loading.value = true;
      try {
        console.log("Registrando cuarentena:", cuarentena);
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Cuarentena registrada exitosamente");
      } catch (error) {
        alert("Error al registrar cuarentena");
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchEstanques);

    return { estanques, cuarentena, registrarCuarentena, loading };
  }
};
</script>

<style scoped>
.cuarentena {
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
  background-color: #dc3545;
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
