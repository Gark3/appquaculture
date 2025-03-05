import { createRouter, createWebHistory } from 'vue-router';
import ProductionOne from '@/components/ProductionOne.vue';
import ReportOne from '@/components/ReportOne.vue';
import WarehouseOne from '@/components/WarehouseOne.vue';
import StatisticsOne from '@/components/StatisticsOne.vue';
import AccountingOne from '@/components/AccountingOne.vue';
import AccountOne from '@/components/AccountOne.vue';

import AgregarEstanque from '@/components/producción/AgregarEstanque.vue';
import VentanaEstanques from '@/components/producción/VentanaEstanques.vue';
import Siembra from '@/components/producción/Siembra.vue';
import Alimentar from '@/components/producción/Alimentar.vue';
import CalidadAgua from '@/components/producción/CalidadAgua.vue';
import Dieta from '@/components/producción/Dieta.vue';
import FichaTecnica from '@/components/producción/FichaTecnica.vue';
import Crecimiento from '@/components/producción/Crecimiento.vue';
import Cosecha from '@/components/producción/Cosecha.vue';
import Traslado from '@/components/producción/Traslado.vue';
import Adicion from '@/components/producción/Adicion.vue';
import Tratamientos from '@/components/producción/Tratamientos.vue';
import Cuarentena from '@/components/producción/Cuarentena.vue';

import Inventario from '@/components/almacén/Inventario.vue';
import Proveedores from '@/components/almacén/Proveedores.vue';
import AltaMaterial from '@/components/almacén/AltaMaterial.vue';
import AltaProveedores from '@/components/almacén/AltaProveedores.vue';
import Entradas from '@/components/almacén/Entradas.vue';
import Salidas from '@/components/almacén/Salidas.vue';
import InventarioFisico from '@/components/almacén/InventarioFisico.vue';

import ANOVA from '@/components/estadístico/ANOVA.vue';
import KolmogorovSmirnov from '@/components/estadístico/Kolmogorov-Smirnov.vue';
import ShapiroWilk from '@/components/estadístico/Shapiro-Wilk.vue';

import RGeneral from '@/components/reporte/general.vue';
import REstanque from '@/components/reporte/estanque.vue';
import RLote from '@/components/reporte/lote.vue';
import RCrecimiento from '@/components/reporte/crecimiento.vue';
import RGananciaProduccionCiclo from '@/components/reporte/gpc.vue';
import RCalidadAgua from '@/components/reporte/calidad-agua.vue';

import CSalarios from '@/components/contaduría/salarios.vue';
import CPagosServicios from '@/components/contaduría/pagos-servicios.vue';
import CCompras from '@/components/contaduría/Compras.vue';
import CMantenimiento from '@/components/contaduría/mantenimiento.vue';
import CCostosOperativos from '@/components/contaduría/costos-operativos.vue';
import CVentas from '@/components/contaduría/ventas.vue';

const routes = [

  
  {
    path: '/producción',
    component: ProductionOne,
  },
  { path: '/producción/agregar-estanque', 
    component: AgregarEstanque },
    {
      path: '/ventana-estanques/:title',
      name: 'ventanaEstanques',
      component: VentanaEstanques,
      props: true, // Esto pasa el parámetro title como prop a VentanaEstanques
    },
  { path: '/producción/siembra', 
    component: Siembra },
  { path: '/producción/alimentar', 
    component: Alimentar },
  { path: '/producción/calidad-agua', 
    component: CalidadAgua },
  { path: '/producción/dieta', 
    component: Dieta },
  { path: '/producción/ficha-técnica',
    component: FichaTecnica },
  { path: '/producción/crecimiento', 
    component: Crecimiento },
  { path: '/producción/cosecha', 
    component: Cosecha },
  { path: '/producción/traslado', 
    component: Traslado },
  { path: '/producción/adición', 
    component: Adicion },
  { path: '/producción/tratamientos', 
    component: Tratamientos },
  { path: '/producción/cuarentena', 
    component: Cuarentena },
  {
      path: '/reporte',
      component: ReportOne,
  },
  { path: '/reporte/General', 
    component: RGeneral },
  { path: '/reporte/Estanque', 
    component: REstanque },
  { path: '/reporte/Lote', 
    component: RLote },
  { path: '/reporte/Crecimiento', 
    component: RCrecimiento },
  { path: '/reporte/gpc', 
    component: RGananciaProduccionCiclo },
  { path: '/reporte/Calidad-agua', 
    component: RCalidadAgua },
  {
    path: '/almacén',
    component: WarehouseOne,
  },
  { path: '/almacén/inventario', 
    component: Inventario },
  { path: '/almacén/proveedores', 
    component: Proveedores },
  { path: '/almacén/alta-material', 
    component: AltaMaterial },
  { path: '/almacén/alta-proveedores', 
    component: AltaProveedores },
  { path: '/almacén/entradas', 
    component: Entradas },
  { path: '/almacén/salidas', 
    component: Salidas },
  { path: '/almacén/inventario-físico', 
    component: InventarioFisico },
  {
    path: '/estadistico',
    component: StatisticsOne,
  },
  { path: '/estadístico/ANOVA', 
    component: ANOVA },
  { path: '/estadístico/Kolmogorov-Smirnov', 
    component: KolmogorovSmirnov },
  { path: '/estadístico/Shapiro-Wilk',
    component: ShapiroWilk },
 
  {
    path: '/contaduría',
    component: AccountingOne,
  },
  { path: '/contaduría/salarios', 
    component: CSalarios },
  { path: '/contaduría/pagos-servicios', 
    component: CPagosServicios },
  { path: '/contaduría/compras', 
    component: CCompras },
  { path: '/contaduría/mantenimiento', 
    component: CMantenimiento },
  { path: '/contaduría/costos-operativos', 
    component: CCostosOperativos },
  { path: '/contaduría/ventas', 
    component: CVentas },
  {
    path: '/cuenta',
    component: AccountOne,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

/*export default new Router({
  routes: [
    { path: '/', redirect: '/produccion' },
    {
      path: '/produccion',
      component: ProductionOne,
      children: [
        { path: 'agregar-estanque', component: AgregarEstanque },
        { path: 'alimentar', component: Alimentar },
        { path: 'calidad-agua', component: CalidadAgua },
        { path: 'dieta', component: Dieta },
        { path: 'ficha-tecnica', component: FichaTecnica },
        { path: 'crecimiento', component: Crecimiento },
        { path: 'cosecha', component: Cosecha },
        { path: 'traslado', component: Traslado },
        { path: 'adicion', component: Adicion },
        { path: 'tratamientos', component: Tratamientos },
        { path: 'cuarentena', component: Cuarentena },
      ],
    },
    {
      path: '/almacén',
      component: WarehouseOne,
      children: [
        { path: 'inventario', component: Inventario },
        { path: 'proveedores', component: Proveedores },
        { path: 'alta-material', component: AltaMaterial },
        { path: 'alta-proveedores', component: AltaProveedores },
        { path: 'entradas', component: Entradas },
        { path: 'salidas', component: Salidas },
        { path: 'inventario-fisico', component: InventarioFisico },
      ],
    },
    {
      path: '/estadistico',
      component: StatisticsOne,
     /children: [
        { path: 'ingresos', component: Ingresos },
        { path: 'crecimiento', component: Crecimiento },
        { path: 'produccion', component: ProductionOne },
        { path: 'alimentacion', component: Alimentacion },
        { path: 'gpc', component: GPC },
        { path: 'calidad-agua', component: CalidadAgua },
      ],
    },
    {
      path: '/contaduría',
      component: AccountingOne,
     children: [
        { path: 'salarios', component: Salarios },
        { path: 'pagos-servicios', component: PagosServicios },
        { path: 'compras', component: compras },
        { path: 'mantenimiento', component: Mantenimiento },
        { path: 'costos-operativos', component: CostosOperativos },
        { path: 'ventas', component: Ventas },
      ], 
    },
    {
      path: '/cuenta',
      component: AccountOne,
    },
  ],
});
*/