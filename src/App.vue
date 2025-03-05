<template>
  <div id="app">
    <div v-if="!loggedIn" class="login-container">
      <Login @login="onLogin" />
    </div>
    <div v-else>
      <div class="header">
        <img class="menu-icon" src="@/assets/AppQuacultureLogo.png" alt="Menu Icon" />
        <div class="menu-buttons">
          <button 
          v-for="item in menuItems" 
          
          :key="item" 
          
          @click="changeMenu(item)"
          :class="{ active: currentMenu === item }"
          :title="`Cambia a la sección ${item}`"   
          >
          {{ item }}
          </button>
        </div>
      </div>

      <div class="main-container">
        <div class="side-menu">
          <ul>
            <li v-for="button in sideMenuButtons" :key="button" @click="showWindow(button)">
            <router-link 
              :to="getSideMenuLink(button)" 
              class="side-menu-link"
              :title="`Ir a la funcionalidad: ${button}`"
              >
              {{ button }}
            </router-link>
          </li>
          </ul>
        </div>

        <div class="content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Login from './components/LoginPage.vue';
import ProductionOne from './components/ProductionOne.vue';
import ReportOne from './components/ReportOne.vue';
import WarehouseOne from './components/WarehouseOne.vue';
import StatisticsOne from './components/StatisticsOne.vue';
import AccountingOne from './components/AccountingOne.vue';
import AccountOne from './components/AccountOne.vue';

import VentanaEstanques from './components/producción/VentanaEstanques.vue';

import AgregarEstanque from './components/producción/AgregarEstanque.vue';
import Siembra from './components/producción/Siembra.vue';
import Alimentar from './components/producción/Alimentar.vue';
import CalidadAgua from './components/producción/CalidadAgua.vue';
import Dieta from './components/producción/Dieta.vue';
import FichaTecnica from './components/producción/FichaTecnica.vue';
import Crecimiento from './components/producción/Crecimiento.vue';
import Cosecha from './components/producción/Cosecha.vue';
import Traslado from './components/producción/Traslado.vue';
import Adicion from './components/producción/Adicion.vue';
import Tratamientos from './components/producción/Tratamientos.vue';
import Cuarentena from './components/producción/Cuarentena.vue';

import Inventario from './components/almacén/Inventario.vue';
import Proveedores from './components/almacén/Proveedores.vue';
import AltaMaterial from './components/almacén/AltaMaterial.vue';
import AltaProveedores from './components/almacén/AltaProveedores.vue';
import Entradas from './components/almacén/Entradas.vue';
import Salidas from './components/almacén/Salidas.vue';
import InventarioFisico from './components/almacén/InventarioFisico.vue';

import ANOVA from './components/estadístico/ANOVA.vue';
import KolmogorovSmirnov from './components/estadístico/Kolmogorov-Smirnov.vue';
import ShapiroWilk from './components/estadístico/Shapiro-Wilk.vue';

import RGeneral from './components/reporte/general.vue';
import REstanque from './components/reporte/estanque.vue';
import RLote from './components/reporte/lote.vue';
import RCrecimiento from './components/reporte/crecimiento.vue';
import RGananciaProduccionCiclo from './components/reporte/gpc.vue';
import RCalidadAgua from './components/reporte/calidad-agua.vue';

import CSalarios from './components/contaduría/salarios.vue';
import CPagosServicios from './components/contaduría/pagos-servicios.vue';
import CCompras from './components/contaduría/Compras.vue';
import CMantenimiento from './components/contaduría/mantenimiento.vue';
import CCostosOperativos from './components/contaduría/costos-operativos.vue';
import CVentas from './components/contaduría/ventas.vue';

export default {
  components: {
    Login,
    ProductionOne,
    ReportOne,
    WarehouseOne,
    StatisticsOne,
    AccountingOne,
    AccountOne,
    AgregarEstanque,
    Siembra,
    Alimentar,
    CalidadAgua,
    Dieta,
    FichaTecnica,
    Crecimiento,
    Cosecha,
    Traslado,
    Adicion,
    Tratamientos,
    Cuarentena,
    Inventario, 
    Proveedores, 
    AltaMaterial, 
    AltaProveedores, 
    Entradas, 
    Salidas,
    InventarioFisico,
    ANOVA,
    ShapiroWilk,
    KolmogorovSmirnov,
    RGeneral, 
    REstanque, 
    RLote, 
    RCrecimiento, 
    RGananciaProduccionCiclo, 
    RCalidadAgua,
    CSalarios, 
    CPagosServicios, 
    CCompras, 
    CMantenimiento, 
    CCostosOperativos, 
    CVentas
  },
  data() {
    return {
      loggedIn: false,
      currentMenu: '',
      sideMenuButtons: this.getSideMenuButtons(),
      menuItems: ['Producción','Reporte', 'Almacén', 'Estadístico', 'Contaduría', 'Cuenta'],
    };
  },
  methods: {
    onLogin() {
      this.loggedIn = true;
    },
    changeMenu(menuItem) {
      this.currentMenu = menuItem;
      this.sideMenuButtons = this.getSideMenuButtons(menuItem);
    },
    getSideMenuButtons(menu) {
      switch(menu) {
        case 'Producción':
          return ['Agregar Estanque', 'Siembra', 'Alimentar', 'Calidad AGUA', 'Dieta', 'Ficha Técnica', 
                  'Crecimiento', 'Cosecha', 'Traslado', 'Adición', 'Tratamientos', 'Cuarentena'];
        case 'Reporte':
          return [/*'General',*/ 'Estanque', /*'Lote'*/,'Crecimiento', 'GPC', 'Calidad AGUA'];
        case 'Almacén':
          return ['Inventario', 'Proveedores', 'Alta Material', 'Alta Proveedores', 
                  'Entradas', 'Salidas', 'Inventario Físico'];
        case 'Estadístico':
          return ['Kolmogorov-Smirnov',  'Shapiro-Wilk', 'ANOVA', 'Alimentación'];
        case 'Contaduría':
          return ['Salarios', 'Pagos Servicios', 'Compras', 'Mantenimiento', 
                  'Costos Operativos', 'Ventas'];
        default:
          return [];
      }
    },
    showWindow(button) {
      // Lógica para mostrar las ventanas si no se está usando Vue Router
    },
    getSideMenuLink(button) {
  if (!this.currentMenu || typeof this.currentMenu !== 'string') {
    console.error('Error: currentMenu no está definido o no es una cadena');
    return '/'; // Ruta por defecto o manejo de error
  }

  if (!button || typeof button !== 'string') {
    console.error('Error: button no está definido o no es una cadena');
    return `/${this.currentMenu.toLowerCase()}`; // Ruta sin botón
  }

  const baseLink = this.currentMenu.toLowerCase();
  return `/${baseLink}/${button.toLowerCase().replace(/\s+/g, '-')}`;
},

  },
};
</script>

<style>
body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

#app {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #8d2a2a;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menu-icon {
  width: 60px;
  height: 60px;
}

.menu-buttons button {
  background-color: #8d2a2a;
  border: none;
  padding: 12px 24px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: white;
  border-radius: 8px;
  transition: 0.3s ease;
}

.menu-buttons button:hover {
  background-color: #1e40af;
}

.menu-buttons .active {
  background-color: #facc15;
  color: black;
  transform: scale(1.1);
}

.main-container {
  display: flex;
  flex-grow: 1;
}

.side-menu {
  width: 250px;
  background-color: #1e293b;
  color: white;
  padding: 20px;
  min-height: 100vh;
}

.side-menu ul {
  list-style: none;
  padding: 0;
}

.side-menu-link {
  text-decoration: none;
  color: white;
  display: block;
  padding: 10px 15px;
  border-radius: 5px;
  transition: 0.3s;
}

.side-menu-link:hover {
  background-color: #374151;
}

.content {
  flex-grow: 1;
  padding: 20px;
  background-color: white;
  overflow: auto;
}

@media (max-width: 768px) {
  .side-menu {
    width: 100%;
    min-height: auto;
  }
  .main-container {
    flex-direction: column;
  }
}
</style>
