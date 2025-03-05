<template>
  <div class="registro-producto">
    <h1>Registro de Producto</h1>
    <form @submit.prevent="registrarProducto">
      <div class="form-group">
        <label for="id">ID (Generado automáticamente)</label>
        <input type="text" id="id" :value="producto.id" disabled />
      </div>

      <div class="form-group">
        <label for="nombre">Nombre del Producto</label>
        <input type="text" id="nombre" v-model="producto.nombre" required />
      </div>

      <div class="form-group">
        <label for="rubro">Rubro</label>
        <select id="rubro" v-model="producto.rubro" required>
          <option value="">Selecciona un rubro</option>
          <option value="Alimento">Alimento</option>
          <option value="Medicamento">Medicamento</option>
          <option value="Equipo">Equipo</option>
        </select>
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea id="descripcion" v-model="producto.descripcion" rows="3" required></textarea>
      </div>

      <div class="form-group">
        <label for="fecha">Fecha (Automática)</label>
        <input type="text" id="fecha" :value="producto.fecha" disabled />
      </div>

      <button type="submit">Registrar Producto</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      producto: {
        id: this.generarId(),
        nombre: '',
        rubro: '',
        descripcion: '',
        fecha: this.obtenerFechaActual()
      }
    };
  },
  methods: {
    generarId() {
      return Math.floor(Math.random() * 1000000); // Genera un ID único aleatorio
    },
    obtenerFechaActual() {
      const hoy = new Date();
      return hoy.toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
    },
    registrarProducto() {
      console.log("Producto registrado:", this.producto);
      alert("Producto registrado con éxito!");

      // Resetear formulario después de registrar
      this.producto = {
        id: this.generarId(),
        nombre: '',
        rubro: '',
        descripcion: '',
        fecha: this.obtenerFechaActual()
      };
    }
  }
};
</script>

<style scoped>
.registro-producto {
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
