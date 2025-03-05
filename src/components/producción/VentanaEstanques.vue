<template>
    <div class="ventana-estanques">
      <h1>{{ titulo }}</h1>
      <!-- Aquí iría el contenido de la ventana de estanques -->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      titulo: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .ventana-estanques {
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  h1 {
    font-size: 2em;
    color: #333;
  }
  </style>
  