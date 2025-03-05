<template>
    <div class="registro-siembra">
      <h1>Inventario</h1>
  
      <!-- Barra de búsqueda -->
      <div class="form-group">
        <label for="buscar">Buscar producto:</label>
        <input
          type="text"
          id="buscar"
          v-model="filtro"
          placeholder="Buscar por ID, Nombre o Rubro"
        />
      </div>
  
      <!-- Tabla de productos -->
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Rubro</th>
            <th>Cantidad</th>
            <th>Costo Acumulado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="producto in productosFiltrados"
            :key="producto.id"
          >
            <td>{{ producto.id }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.rubro }}</td>
            <td>{{ producto.cantidad }}</td>
            <td>{{ producto.costoAcumulado }}</td>
            <td>
              <button @click="verDetalles(producto)">Ver</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal de detalles -->
      <div v-if="productoSeleccionado" class="modal-overlay" @click.self="cerrarModal">
        <div class="modal-content">
          <h2>Detalles del producto</h2>
          <p><strong>ID:</strong> {{ productoSeleccionado.id }}</p>
          <p><strong>Nombre:</strong> {{ productoSeleccionado.nombre }}</p>
          <p><strong>Rubro:</strong> {{ productoSeleccionado.rubro }}</p>
          <h3>Entradas</h3>
          <table>
            <thead>
              <tr>
                <th>Fecha de entrada</th>
                <th>Proveedor</th>
                <th>Número de lote</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entrada in productoSeleccionado.entradas" :key="entrada.lote">
                <td>{{ entrada.fecha }}</td>
                <td>{{ entrada.proveedor }}</td>
                <td>{{ entrada.lote }}</td>
                <td>{{ entrada.costo }}</td>
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
    name: "Inventario",
    data() {
      return {
        filtro: "",
        productos: [],
        productoSeleccionado: null,
      };
    },
    computed: {
      productosFiltrados() {
        const filtro = this.filtro.toLowerCase();
        return this.productos.filter(
          (p) =>
            p.id.toString().includes(filtro) ||
            p.nombre.toLowerCase().includes(filtro) ||
            p.rubro.toLowerCase().includes(filtro)
        );
      },
    },
    methods: {
      verDetalles(producto) {
        this.productoSeleccionado = producto;
      },
      cerrarModal() {
        this.productoSeleccionado = null;
      },
      generarProductos() {
        const rubros = ["Alimento", "Medicamento", "Equipamiento"];
        for (let i = 1; i <= 20; i++) {
          const entradas = Array.from({ length: 5 }, (_, j) => ({
            fecha: `2025-01-${10 + j}`,
            proveedor: `Proveedor ${i}`,
            lote: `L${i}${j}`,
            costo: (Math.random() * 1000).toFixed(2),
          }));
  
          const cantidad = entradas.length * 100;
          const costoAcumulado = entradas.reduce(
            (acc, entrada) => acc + parseFloat(entrada.costo),
            0
          );
  
          this.productos.push({
            id: i,
            nombre: `Producto ${i}`,
            rubro: rubros[i % rubros.length],
            cantidad,
            costoAcumulado: costoAcumulado.toFixed(2),
            entradas,
          });
        }
      },
    },
    created() {
      this.generarProductos();
    },
  };
  </script>
  
  <style scoped>
  .registro-siembra {
    font-family: Arial, sans-serif;
    max-width: 850px;
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
  
  input {
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
  /* Ajustar el cuadro de productos */
.product-table {
  width: 100%; /* Ajustar al ancho del contenedor */
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
}

.product-table th {
  background-color: #f2f2f2;
}

.table-container {
  overflow-x: auto; /* Hacer desplazable horizontalmente si es necesario */
  max-width: 100%; /* Limitar al ancho del contenedor */
}
  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
  }
  
  th {
    background-color: #f2f2f2;
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
  
  /* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  width: 90%;
  max-height: 80vh; /* Limitar la altura del modal */
  overflow-y: auto; /* Hacer que el contenido sea desplazable */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content table {
  width: 100%;
  border-collapse: collapse;
}

.modal-content th,
.modal-content td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.modal-content th {
  background-color: #f2f2f2;
}

.modal-content button {
  margin-top: 10px;
}
  </style>
  