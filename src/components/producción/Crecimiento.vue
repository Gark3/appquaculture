<template>
  <div class="registro-siembra">
    <h1>Crecimiento</h1>
    <form @submit.prevent="calcularPromedio">
      <div class="form-group">
        <label for="cantidadOrganismos">Cantidad de organismos:</label>
        <input
          type="number"
          id="cantidadOrganismos"
          v-model.number="cantidadOrganismos"
          min="1"
          max="1000"
          placeholder="Ingresa la cantidad"
          @input="generarInputs"
        />
      </div>

      <div v-if="pesos.length > 0" class="form-group">
        <h3>Ingrese el peso de los organismos (gramos):</h3>
        <div v-for="(peso, index) in pesos" :key="index" class="form-group">
          <label :for="'peso-' + (index + 1)">Organismo {{ index + 1 }}:</label>
          <input
            type="number"
            :id="'peso-' + (index + 1)"
            v-model.number="pesos[index]"
            min="0"
            step="0.01"
            placeholder="Peso en gramos"
            required
          />
        </div>
      </div>

      <button type="submit" :disabled="pesos.length === 0">Guardar</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Crecimiento",
  setup() {
    const cantidadOrganismos = ref(null); // Inicia sin valor
    const pesos = ref([]); // Lista vacía inicialmente

    const generarInputs = () => {
      // Validar rango y regenerar inputs
      if (!cantidadOrganismos.value || cantidadOrganismos.value < 1 || cantidadOrganismos.value > 1000) {
        pesos.value = []; // Resetea los inputs si el valor es inválido
        return;
      }
      pesos.value = Array.from({ length: cantidadOrganismos.value }, () => null); // Generar inputs
    };

    const calcularPromedio = () => {
      if (pesos.value.includes(null)) {
        alert("Por favor, complete todos los pesos antes de guardar.");
        return;
      }
      const sumaPesos = pesos.value.reduce((acc, peso) => acc + peso, 0);
      const promedio = (sumaPesos / pesos.value.length).toFixed(2);
      alert(`El promedio de los pesos ingresados es: ${promedio} gramos.`);
    };

    return {
      cantidadOrganismos,
      pesos,
      generarInputs,
      calcularPromedio,
    };
  },
};
</script>

<style scoped>
.registro-siembra {
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

input {
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
