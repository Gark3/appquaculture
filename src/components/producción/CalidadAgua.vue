<template>
  <div class="registro-siembra">
    <h1>Calidad del Agua</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group" v-for="(valor, parametro) in calidadAgua" :key="parametro">
        <label :for="parametro">{{ parametro }}</label>
        <input
          type="number"
          :id="parametro"
          v-model="calidadAgua[parametro]"
          :placeholder="`Ingrese el nivel de ${parametro.toLowerCase()}`"
          step="0.01"
          required
        />
      </div>
      <button type="submit">Registrar Calidad del Agua</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      calidadAgua: {
        "Oxígeno disuelto (mg/L)": null,
        "pH": null,
        "Nitritos (mg/L)": null,
        "Nitratos (mg/L)": null,
        "Sulfato (mg/L)": null,
        "Fosfato (mg/L)": null,
        "Cloro (mg/L)": null,
        "Salinidad (ppt)": null,
        "Caudal (m³/s)": null,
      },
    };
  },
  methods: {
    submitForm() {
      console.log("Datos de calidad del agua:", this.calidadAgua);
      alert("¡Registro de calidad del agua guardado exitosamente!");
      // Aquí puedes realizar una llamada a la API para guardar los datos
      this.resetForm();
    },
    resetForm() {
      this.calidadAgua = {
        "Oxígeno disuelto (mg/L)": null,
        "pH": null,
        "Nitritos (mg/L)": null,
        "Nitratos (mg/L)": null,
        "Sulfato (mg/L)": null,
        "Fosfato (mg/L)": null,
        "Cloro (mg/L)": null,
        "Salinidad (ppt)": null,
        "Caudal (m³/s)": null,
      };
    },
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
</style>
