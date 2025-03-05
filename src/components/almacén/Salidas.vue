<template>
  <div class="registro-salidas">
    <h1>Registro de Salidas de Productos</h1>
    <form @submit.prevent="registrarSalida">
      <div class="form-group">
        <label for="solicitante">Solicitante</label>
        <input type="text" id="solicitante" v-model="salida.solicitante" required />
      </div>

      <div class="form-group">
        <label for="area">Área de Uso</label>
        <select id="area" v-model="salida.area" @change="actualizarEstanque" required>
          <option value="">Selecciona un área</option>
          <option value="Estanque">Estanque</option>
          <option value="Laboratorio">Laboratorio</option>
          <option value="Almacén">Almacén</option>
        </select>
      </div>

      <div class="form-group" v-if="salida.area === 'Estanque'">
        <label for="estanque">Estanque</label>
        <input type="text" id="estanque" v-model="salida.estanque" placeholder="Indica el estanque" required />
      </div>

      <div class="form-group">
        <label for="producto">Producto</label>
        <input
          type="text"
          id="producto"
          v-model="productoBusqueda"
          placeholder="Busca por ID, nombre o descripción"
          @input="buscarProducto"
        />
        <ul v-if="productosFiltrados.length" class="autocomplete">
          <li v-for="producto in productosFiltrados" :key="producto.id" @click="seleccionarProducto(producto)">
            {{ producto.nombre }} ({{ producto.id }})
          </li>
        </ul>
      </div>

      <div class="form-group" v-if="productoSeleccionado">
        <p><strong>Producto seleccionado:</strong> {{ productoSeleccionado.nombre }}</p>
        <label for="cantidad">Cantidad</label>
        <input type="number" id="cantidad" v-model.number="productoCantidad" min="1" required />

        <button type="button" @click="agregarProducto">Agregar a la lista</button>
      </div>

      <div class="lista-productos" v-if="salida.productos.length">
        <h2>Productos Seleccionados</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>ID</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(producto, index) in salida.productos" :key="index">
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.id }}</td>
              <td>
                <input
                  type="number"
                  v-model.number="producto.cantidad"
                  min="1"
                  @change="actualizarCantidad(index, producto.cantidad)"
                />
              </td>
              <td><button @click="eliminarProducto(index)">Eliminar</button></td>
            </tr>
          </tbody>
        </table>
        <p><strong>Total de Productos:</strong> {{ calcularTotalProductos() }}</p>
      </div>

      <button type="submit" :disabled="!salida.productos.length">Registrar Salida</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      salida: {
        solicitante: '',
        area: '',
        estanque: '',
        productos: []
      },
      productoBusqueda: '',
      productosFiltrados: [],
      productoSeleccionado: null,
      productoCantidad: 1,
      listaProductos: [
        { id: 1, nombre: 'Alimento A', descripcion: 'Alimento de alta calidad' },
        { id: 2, nombre: 'Medicamento B', descripcion: 'Medicamento para peces' },
        { id: 3, nombre: 'Red de Pesca', descripcion: 'Equipo de pesca' },
        { id: 4, nombre: 'Alimento C', descripcion: 'Alimento balanceado' },
        { id: 5, nombre: 'Oxigenador', descripcion: 'Equipo de oxigenación' }
      ]
    };
  },
  methods: {
    actualizarEstanque() {
      if (this.salida.area !== 'Estanque') {
        this.salida.estanque = '';
      }
    },
    buscarProducto() {
      const term = this.productoBusqueda.toLowerCase();
      this.productosFiltrados = this.listaProductos.filter(
        producto =>
          producto.nombre.toLowerCase().includes(term) ||
          producto.descripcion.toLowerCase().includes(term) ||
          producto.id.toString().includes(term)
      );
    },
    seleccionarProducto(producto) {
      this.productoSeleccionado = producto;
      this.productoBusqueda = '';
      this.productosFiltrados = [];
    },
    agregarProducto() {
      if (this.productoSeleccionado && this.productoCantidad > 0) {
        const productoExistente = this.salida.productos.find(
          p => p.id === this.productoSeleccionado.id
        );

        if (productoExistente) {
          productoExistente.cantidad += this.productoCantidad;
        } else {
          this.salida.productos.push({
            ...this.productoSeleccionado,
            cantidad: this.productoCantidad
          });
        }

        this.productoSeleccionado = null;
        this.productoCantidad = 1;
      }
    },
    eliminarProducto(index) {
      this.salida.productos.splice(index, 1);
    },
    actualizarCantidad(index, cantidad) {
      if (cantidad > 0) {
        this.salida.productos[index].cantidad = cantidad;
      } else {
        this.eliminarProducto(index);
      }
    },
    calcularTotalProductos() {
      return this.salida.productos.reduce((total, producto) => total + producto.cantidad, 0);
    },
    registrarSalida() {
      console.log('Salida registrada:', this.salida);
      alert('Salida registrada con éxito!');
      this.salida = {
        solicitante: '',
        area: '',
        estanque: '',
        productos: []
      };
    }
  }
};
</script>

<style scoped>
.registro-salidas {
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table th,
table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
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
  margin: 10px 0;
}

button:hover {
  background-color: #218838;
}

.autocomplete {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: white;
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
