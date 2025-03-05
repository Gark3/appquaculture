<template>
  <div class="registro-siembra">
    <h1>Agregar Estanque</h1>
    <form @submit.prevent="guardarEstanque">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="estanque.nombre" required />
      </div>
      <div class="form-group">
        <label for="forma">Forma:</label>
        <input type="text" id="forma" v-model="estanque.forma" required />
      </div>
      <div class="form-group">
        <label for="superficie">Superficie (m²):</label>
        <input type="number" id="superficie" v-model.number="estanque.superficie" required />
      </div>
      <div class="form-group">
        <label for="profundidad">Profundidad (m):</label>
        <input type="number" id="profundidad" v-model.number="estanque.profundidad" required />
      </div>
      <div class="form-group">
        <label for="infraestructura">Infraestructura:</label>
        <input type="text" id="infraestructura" v-model="estanque.infraestructura" required />
      </div>
      <div class="form-group">
        <label for="lote">Número de Lote:</label>
        <input type="text" id="lote" v-model="estanque.lote" required />
      </div>
      <div class="form-group">
        <label>Ubicación:</label>
        <div ref="mapContainer" style="height: 300px;"></div>
      </div>
      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive, ref, nextTick } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "AgregarEstanque",
  setup() {
    const estanque = reactive({
      nombre: "",
      forma: "",
      superficie: null,
      profundidad: null,
      infraestructura: "",
      lote: "",
      ubicacion: { lat: null, lng: null },
    });

    const mapContainer = ref(null);
    let map, marker;

    const markerIcon = L.icon({
      iconUrl: require('@/assets/custom_marker.png'),
      iconSize: [25, 25],
    });

    const initMap = () => {
      if (mapContainer.value) {
        map = L.map(mapContainer.value).setView([25.547546, -108.481789], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

        marker = L.marker([25.547546, -108.481789], { icon: markerIcon, draggable: true }).addTo(map);
        marker.on("dragend", () => {
          const { lat, lng } = marker.getLatLng();
          estanque.ubicacion.lat = lat;
          estanque.ubicacion.lng = lng;
        });

        map.on("click", (e) => {
          const { lat, lng } = e.latlng;
          marker.setLatLng([lat, lng]);
          estanque.ubicacion.lat = lat;
          estanque.ubicacion.lng = lng;
        });
      } else {
        console.error("El contenedor del mapa no se encontró.");
      }
    };

    const guardarEstanque = () => {
      if (
        !estanque.nombre ||
        !estanque.forma ||
        !estanque.infraestructura ||
        !estanque.lote
      ) {
        alert("Por favor, complete todos los campos.");
        return;
      }
      if (estanque.superficie <= 0 || estanque.profundidad <= 0) {
        alert("La superficie y profundidad deben ser valores positivos.");
        return;
      }
      console.log("Datos del estanque:", estanque);
      // Aquí puedes usar fetch o Axios para enviar los datos al backend
    };

    onMounted(() => {
      nextTick(() => {
        initMap();
      });
    });

    return { estanque, guardarEstanque, mapContainer };
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
