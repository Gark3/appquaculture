<template>
  <div class="registro-siembra">
    <h1>Alimentación</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="tipoAlimento">Tipo de Alimento</label>
        <select id="tipoAlimento" v-model="registro.tipoAlimento" required>
          <option value="" disabled>Seleccione un tipo de alimento</option>
          <option v-for="alimento in alimentos" :key="alimento" :value="alimento">{{ alimento }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="lote">Lote</label>
        <input type="text" id="lote" v-model="registro.lote" placeholder="Ingrese el lote" required />
      </div>
      <div class="form-group">
        <label for="cantidad">Cantidad de Alimento (kg)</label>
        <input type="number" id="cantidad" v-model="registro.cantidad" placeholder="Ingrese la cantidad de alimento" required />
      </div>
      <div class="form-group">
        <label for="mortalidad">Mortalidad</label>
        <input type="number" id="mortalidad" v-model="registro.mortalidad" placeholder="Ingrese la mortalidad" />
      </div>
      <div class="form-group">
        <label for="clima">Clima</label>
        <input type="text" id="clima" v-model="registro.clima" placeholder="Ingrese el clima actual" />
      </div>
      <div class="form-group">
        <label for="comentarios">Comentarios</label>
        <textarea id="comentarios" v-model="registro.comentarios" placeholder="Ingrese algún comentario"></textarea>
      </div>
      <button type="submit">Registrar Alimentación</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alimentos: ["Pellets", "Harina de pescado", "Alimento balanceado"],
      registro: {
        tipoAlimento: "",
        lote: "",
        cantidad: null,
        mortalidad: null,
        clima: "",
        comentarios: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log("Registro de alimentación:", this.registro);
      alert("¡Registro de alimentación guardado exitosamente!");
      // Aquí puedes realizar una llamada a la API para guardar los datos
      this.limpiarFormulario();
    },
    limpiarFormulario() {
      this.registro = {
        tipoAlimento: "",
        lote: "",
        cantidad: null,
        mortalidad: null,
        clima: "",
        comentarios: "",
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

input,
select,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  resize: vertical;
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
