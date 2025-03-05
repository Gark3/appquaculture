<template>
  <div class="proveedores">
    <h1>Gestión de Proveedores</h1>

    <!-- Barra de búsqueda -->
    <div class="form-group">
      <label for="busqueda">Buscar proveedor por ID o Nombre:</label>
      <input type="text" id="busqueda" v-model="busqueda" placeholder="Ingrese ID o Nombre" />
    </div>

    <!-- Tabla de proveedores -->
    <table class="tabla-proveedores">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proveedor in proveedoresFiltrados" :key="proveedor.id">
          <td>{{ proveedor.id }}</td>
          <td>{{ proveedor.nombre }}</td>
          <td>
            <button @click="verProductos(proveedor)">Ver</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de productos -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-contenido">
        <h2>Productos de {{ proveedorSeleccionado.nombre }}</h2>
        <table class="tabla-productos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Rubro</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in proveedorSeleccionado.productos" :key="producto.id">
              <td>{{ producto.id }}</td>
              <td>{{ producto.fecha }}</td>
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.rubro }}</td>
              <td>{{ producto.costo }}</td>
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
      busqueda: "",
      proveedores: [
        { id: 1, nombre: "Proveedor A", productos: [
          { id: 101, fecha: "2025-01-01", nombre: "Producto A1", rubro: "Alimento", costo: 50 },
          { id: 102, fecha: "2025-01-02", nombre: "Producto A2", rubro: "Medicamento", costo: 100 }
        ] },
        { id: 2, nombre: "Proveedor B", productos: [
          { id: 201, fecha: "2025-01-03", nombre: "Producto B1", rubro: "Equipo", costo: 200 }
        ] },
        { id: 3, nombre: "Proveedor C", productos: [
          { id: 301, fecha: "2025-01-04", nombre: "Producto C1", rubro: "Alimento", costo: 75 },
          { id: 302, fecha: "2025-01-05", nombre: "Producto C2", rubro: "Medicamento", costo: 150 }
        ] },
        { id: 4, nombre: "Proveedor D", productos: [
          { id: 401, fecha: "2025-01-06", nombre: "Producto D1", rubro: "Equipo", costo: 300 }
        ] },
        { id: 5, nombre: "Proveedor E", productos: [
          { id: 501, fecha: "2025-01-07", nombre: "Producto E1", rubro: "Alimento", costo: 90 },
          { id: 502, fecha: "2025-01-08", nombre: "Producto E2", rubro: "Medicamento", costo: 120 }
        ] },
        { id: 6, nombre: "Proveedor F", productos: [
          { id: 601, fecha: "2025-01-09", nombre: "Producto F1", rubro: "Equipo", costo: 250 }
        ] },
        { id: 7, nombre: "Proveedor G", productos: [
          { id: 701, fecha: "2025-01-10", nombre: "Producto G1", rubro: "Alimento", costo: 65 },
          { id: 702, fecha: "2025-01-11", nombre: "Producto G2", rubro: "Medicamento", costo: 130 }
        ] },
        { id: 8, nombre: "Proveedor H", productos: [
          { id: 801, fecha: "2025-01-12", nombre: "Producto H1", rubro: "Equipo", costo: 400 }
        ] },
        { id: 9, nombre: "Proveedor I", productos: [
          { id: 901, fecha: "2025-01-13", nombre: "Producto I1", rubro: "Alimento", costo: 85 },
          { id: 902, fecha: "2025-01-14", nombre: "Producto I2", rubro: "Medicamento", costo: 110 }
        ] },
        { id: 10, nombre: "Proveedor J", productos: [
          { id: 1001, fecha: "2025-01-15", nombre: "Producto J1", rubro: "Equipo", costo: 500 }
        ] }
      ],
      mostrarModal: false,
      proveedorSeleccionado: null
    };
  },
  computed: {
    proveedoresFiltrados() {
      return this.proveedores.filter(
        (proveedor) =>
          proveedor.id.toString().includes(this.busqueda) ||
          proveedor.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }
  },
  methods: {
    verProductos(proveedor) {
      this.proveedorSeleccionado = proveedor;
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.proveedorSeleccionado = null;
    }
  }
};
</script>

<style scoped>
.proveedores {
  font-family: Arial, sans-serif;
  max-width: 700px;
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

.tabla-proveedores {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.tabla-proveedores th,
.tabla-proveedores td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.tabla-proveedores th {
  background-color: #f0f0f0;
}

.tabla-productos {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.tabla-productos th,
.tabla-productos td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.tabla-productos th {
  background-color: #f0f0f0;
}

button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
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

.modal-contenido {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 700px;
  width: 100%;
}
</style>
