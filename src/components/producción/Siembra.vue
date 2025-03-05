<template>
    <div class="registro-siembra">
      <h1>Registro de Siembra</h1>
  
      <form @submit.prevent="registrarSiembra">
        <!-- Selección de Especie -->
        <div class="form-group">
          <label for="especie">Selecciona la especie:</label>
          <select v-model="siembra.especie" id="especie" required>
            <optgroup label="Peces de agua dulce">
              <option>Tilapia - Oreochromis niloticus, Oreochromis aureus</option>
              <option>Tilapia GUASAVE - ALBERTO, Oreochromis aureus</option>
              <option>Carpa común - Cyprinus carpio</option>
              <option>Carpa plateada - Hypophthalmichthys molitrix</option>
              <option>Carpa herbívora - Ctenopharyngodon idella</option>
              <option>Pacu - Piaractus mesopotamicus</option>
              <option>Bagre o pez gato - Clarias gariepinus, Pangasius hypophthalmus</option>
            </optgroup>
            <optgroup label="Peces de agua salada">
              <option>Salmón del Atlántico - Salmo salar</option>
              <option>Trucha arcoíris - Oncorhynchus mykiss</option>
              <option>Lubina o robalo - Dicentrarchus labrax</option>
              <option>Dorada - Sparus aurata</option>
              <option>Lenguado - Solea solea</option>
            </optgroup>
            <optgroup label="Crustáceos">
              <option>Camarón blanco del Pacífico - Litopenaeus vannamei</option>
              <option>Camarón tigre gigante - Penaeus monodon</option>
              <option>Cangrejo azul - Callinectes sapidus</option>
            </optgroup>
            <optgroup label="Moluscos">
              <option>Mejillón azul - Mytilus edulis</option>
              <option>Ostra japonesa - Crassostrea gigas</option>
              <option>Vieira del Atlántico - Placopecten magellanicus</option>
              <option>Almeja japonesa - Ruditapes philippinarum</option>
            </optgroup>
          </select>
        </div>
  
        <!-- Detalles de Siembra -->
        <div class="form-group">
          <label for="numero-organismos">Número de organismos introducidos:</label>
          <input type="number" id="numero-organismos" v-model.number="siembra.numeroOrganismos" required />
        </div>
  
        <div class="form-group">
          <label for="peso-promedio">Peso promedio por organismo (g):</label>
          <input type="number" id="peso-promedio" v-model.number="siembra.pesoPromedio" step="0.01" required />
        </div>
  
        <div class="form-group">
          <label for="tamano-promedio">Tamaño promedio por organismo (cm):</label>
          <input type="number" id="tamano-promedio" v-model.number="siembra.tamanoPromedio" step="0.01" required />
        </div>
  
        <div class="form-group">
          <label for="etapa">Etapa de la siembra:</label>
          <select id="etapa" v-model="siembra.etapa" required>
            <option>Larva</option>
            <option>Alevín</option>
            <option>Juvenil</option>
            <option>Adulto</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="dieta">Tipo de dieta:</label>
          <input type="text" id="dieta" v-model="siembra.dieta" required />
        </div>
  
        <!-- Botón de Envío -->
        <button type="submit" class="btn-registrar">Registrar Siembra</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        siembra: {
          especie: '',
          numeroOrganismos: null,
          pesoPromedio: null,
          tamanoPromedio: null,
          etapa: '',
          dieta: ''
        }
      };
    },
    methods: {
      registrarSiembra() {
        console.log("Datos de siembra registrados:", this.siembra);
        alert("Registro de siembra exitoso");
        // Aquí podrías enviar los datos al servidor o realizar alguna acción adicional.
      }
    }
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
  
  input, select {
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