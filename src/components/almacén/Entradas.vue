<template>
  <div class="registro-entradas">
    <h1>Registro de Entradas</h1>

    <div class="form-group">
      <label for="proveedor">Seleccionar Proveedor</label>
      <input
        type="text"
        id="proveedor"
        v-model="buscadorProveedor"
        @input="buscarProveedor"
        placeholder="Buscar proveedor..."
      />
      <ul v-if="proveedoresFiltrados.length" class="autocomplete">
        <li 
          v-for="proveedor in proveedoresFiltrados" 
          :key="proveedor.id"
          @click="seleccionarProveedor(proveedor)">
          {{ proveedor.nombre }}
        </li>
      </ul>
    </div>

    <div v-if="proveedorSeleccionado">
      <p><strong>Proveedor seleccionado:</strong> {{ proveedorSeleccionado.nombre }}</p>

      <div class="form-group">
        <label for="producto">Seleccionar Producto</label>
        <input
          type="text"
          id="producto"
          v-model="buscadorProducto"
          @input="buscarProducto"
          placeholder="Buscar producto por ID, nombre o descripción..."
        />
        <ul v-if="productosFiltrados.length" class="autocomplete">
          <li 
            v-for="producto in productosFiltrados" 
            :key="producto.id"
            @click="seleccionarProducto(producto)">
            {{ producto.nombre }} - {{ producto.descripcion }}
          </li>
        </ul>
      </div>

      <div v-if="productoSeleccionado">
        <p><strong>Producto seleccionado:</strong> {{ productoSeleccionado.nombre }}</p>

        <div class="form-group">
          <label for="cantidad">Cantidad</label>
          <input type="number" id="cantidad" v-model.number="cantidad" min="1" required />
        </div>

        <div class="form-group">
          <label for="costo">Costo por Unidad</label>
          <input type="number" id="costo" v-model.number="costo" min="0.01" step="0.01" required />
        </div>

        <button @click="agregarProducto">Agregar Producto</button>
      </div>
    </div>

    <div class="lista-productos">
      <h2>Productos Agregados</h2>

      <ul>
        <li v-for="(item, index) in listaProductos" :key="index">
          {{ item.nombre }} - Cantidad: {{ item.cantidad }} - Costo: {{ item.costo }} - Total: {{ item.total }}
          <button @click="editarProducto(index)">Editar</button>
          <button @click="eliminarProducto(index)">Eliminar</button>
        </li>
      </ul>

      <p><strong>Costo Total:</strong> {{ costoTotal }}</p>

      <button @click="recibirProductos" :disabled="listaProductos.length === 0">Recibir</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buscadorProveedor: '',
      buscadorProducto: '',
      proveedores: [],
      productos: [],
      proveedoresFiltrados: [],
      productosFiltrados: [],
      proveedorSeleccionado: null,
      productoSeleccionado: null,
      cantidad: 1,
      costo: 0,
      listaProductos: []
    };
  },
  computed: {
    costoTotal() {
      return this.listaProductos.reduce((total, item) => total + item.total, 0).toFixed(2);
    }
  },
  methods: {
    buscarProveedor() {
      this.proveedoresFiltrados = this.proveedores.filter(p =>
        p.nombre.toLowerCase().includes(this.buscadorProveedor.toLowerCase())
      );
    },
    seleccionarProveedor(proveedor) {
      this.proveedorSeleccionado = proveedor;
      this.buscadorProveedor = '';
      this.proveedoresFiltrados = [];
    },
    buscarProducto() {
      this.productosFiltrados = this.productos.filter(p =>
        p.nombre.toLowerCase().includes(this.buscadorProducto.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(this.buscadorProducto.toLowerCase()) ||
        p.id.toString().includes(this.buscadorProducto)
      );
    },
    seleccionarProducto(producto) {
      this.productoSeleccionado = producto;
      this.buscadorProducto = '';
      this.productosFiltrados = [];
    },
    agregarProducto() {
      if (this.cantidad > 0 && this.costo > 0) {
        const total = this.cantidad * this.costo;
        this.listaProductos.push({
          ...this.productoSeleccionado,
          cantidad: this.cantidad,
          costo: this.costo,
          total: total
        });
        this.productoSeleccionado = null;
        this.cantidad = 1;
        this.costo = 0;
      } else {
        alert("La cantidad y el costo deben ser mayores a cero.");
      }
    },
    editarProducto(index) {
      const producto = this.listaProductos[index];
      this.productoSeleccionado = producto;
      this.cantidad = producto.cantidad;
      this.costo = producto.costo;
      this.listaProductos.splice(index, 1);
    },
    eliminarProducto(index) {
      this.listaProductos.splice(index, 1);
    },
    recibirProductos() {
      console.log("Productos recibidos:", this.listaProductos);
      alert("Productos recibidos con éxito!");
      this.listaProductos = [];
      this.proveedorSeleccionado = null;
    }
  },
  mounted() {
    // Cargar datos simulados para proveedores y productos
    this.proveedores = [
      { id: 1, nombre: "Proveedor 1" },
      { id: 2, nombre: "Proveedor 2" },
      { id: 3, nombre: "Proveedor 3" }
    ];

    this.productos = [
      { id: 101, nombre: "Producto A", descripcion: "Descripción A" },
      { id: 102, nombre: "Producto B", descripcion: "Descripción B" },
      { id: 103, nombre: "Producto C", descripcion: "Descripción C" }
    ];
  }
};
</script>

<style scoped>
.registro-entradas {
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
}

button:hover {
  background-color: #218838;
}

.lista-productos ul {
  list-style-type: none;
  padding: 0;
}

.lista-productos li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
}

.autocomplete {
  border: 1px solid #ccc;
  background: white;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
}

.autocomplete li {
  padding: 8px;
  cursor: pointer;
}

.autocomplete li:hover {
  background-color: #f0f0f0;
}
</style>
