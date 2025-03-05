<template>
  <div class="inventario-fisico">
    <h1>Inventario Físico</h1>
    <form @submit.prevent="revisarInventario">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cantidad Física</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td>{{ producto.id }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>
              <input type="number" v-model.number="producto.cantidadFisica" min="0" />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Revisar</button>
    </form>

    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <h2>Revisión de Inventario</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Cantidad Física</th>
              <th>Cantidad Sistema</th>
              <th>Diferencia</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in productos" :key="producto.id">
              <td>{{ producto.id }}</td>
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.cantidadFisica }}</td>
              <td>{{ producto.cantidadSistema }}</td>
              <td>{{ producto.diferencia }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="cerrarModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productos: [
        { id: 1, nombre: 'Producto A', descripcion: 'Descripción A', cantidadSistema: 50, cantidadFisica: 0, diferencia: 0 },
        { id: 2, nombre: 'Producto B', descripcion: 'Descripción B', cantidadSistema: 30, cantidadFisica: 0, diferencia: 0 },
        { id: 3, nombre: 'Producto C', descripcion: 'Descripción C', cantidadSistema: 20, cantidadFisica: 0, diferencia: 0 }
      ],
      mostrarModal: false
    };
  },
  methods: {
    revisarInventario() {
      this.productos.forEach(producto => {
        producto.diferencia = producto.cantidadFisica - producto.cantidadSistema;
      });
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    }
  }
};
</script>

<style scoped>
.inventario-fisico {
  font-family: Arial, sans-serif;
  max-width: 800px;
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f0f0f0;
}

input {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
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
  margin: 0 auto;
}

button:hover {
  background-color: #218838;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
}
</style>
