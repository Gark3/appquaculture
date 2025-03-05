<template>
  <div class="registro-siembra">
    <h1>Ficha Técnica</h1>
    <div class="form-group" v-for="(valor, key) in fichaTecnica" :key="key">
      <label>{{ key }}</label>
      <p>{{ valor }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fichaTecnica: {
        "Especie cultivada": "Tilapia - Oreochromis niloticus",
        "Kilogramos de alimento suministrado": "250 kg",
        "Días desde la siembra inicial": "120 días",
        "Biomasa estimada": "1,200 kg",
        "Siembra inicial": "10,000 peces",
        "FCA Acumulado": "1.8",
        "FCA Anterior": "1.9",
      },
    };
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

p {
  margin: 0;
  padding: 8px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}
</style>
