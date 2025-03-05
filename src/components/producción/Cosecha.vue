<template>
  <div class="registro-siembra">
    <h1>Cosecha</h1>
    <form @submit.prevent="guardarCosecha">
      <!-- Datos Calculados -->
      <div class="form-group">
        <label for="numeroOrganismos">Número de organismos:</label>
        <input
          type="number"
          id="numeroOrganismos"
          v-model="datosCalculados.numeroOrganismos"
          readonly
        />
      </div>

      <div class="form-group">
        <label for="pesoPromedio">Peso promedio (gramos):</label>
        <input
          type="number"
          id="pesoPromedio"
          v-model="datosCalculados.pesoPromedio"
          readonly
        />
      </div>

      <div class="form-group">
        <label for="biomasaEstimada">Biomasa estimada (kg):</label>
        <input
          type="number"
          id="biomasaEstimada"
          v-model="datosCalculados.biomasaEstimada"
          readonly
        />
      </div>

      <!-- Datos Ingresados Manualmente -->
      <div class="form-group">
        <label for="biomasaReal">Biomasa real (kg):</label>
        <input
          type="number"
          id="biomasaReal"
          v-model.number="datosUsuario.biomasaReal"
          placeholder="Ingrese la biomasa real"
          required
        />
      </div>

      <div class="form-group">
        <label for="destino">Destino:</label>
        <input
          type="text"
          id="destino"
          v-model="datosUsuario.destino"
          placeholder="Ingrese el destino"
          required
        />
      </div>

      <div class="form-group">
        <label for="documento">Documento:</label>
        <input
          type="text"
          id="documento"
          v-model="datosUsuario.documento"
          placeholder="Ingrese el número de documento"
          required
        />
      </div>

      <div class="form-group">
        <label for="transportista">Transportista:</label>
        <input
          type="text"
          id="transportista"
          v-model="datosUsuario.transportista"
          placeholder="Ingrese el nombre del transportista"
          required
        />
      </div>

      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Cosecha",
  setup() {
    // Datos calculados (obtenidos del software)
    const datosCalculados = ref({
      numeroOrganismos: 1000, // Ejemplo, se obtendrá del sistema
      pesoPromedio: 500, // Ejemplo, en gramos
      biomasaEstimada: 500, // Ejemplo, en kg
    });

    // Datos ingresados manualmente
    const datosUsuario = ref({
      biomasaReal: null,
      destino: "",
      documento: "",
      transportista: "",
    });

    const guardarCosecha = () => {
      if (
        !datosUsuario.value.biomasaReal ||
        !datosUsuario.value.destino ||
        !datosUsuario.value.documento ||
        !datosUsuario.value.transportista
      ) {
        alert("Por favor, complete todos los campos.");
        return;
      }

      // Aquí puedes enviar los datos al backend
      console.log("Datos de cosecha guardados:", {
        ...datosCalculados.value,
        ...datosUsuario.value,
      });

      alert("Cosecha guardada exitosamente.");
    };

    return {
      datosCalculados,
      datosUsuario,
      guardarCosecha,
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
