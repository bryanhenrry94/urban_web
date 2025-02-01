import React from "react";
import { BsDot } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdManageHistory, MdSettings } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { GrSecure } from "react-icons/gr";
import {
  FaForumbee,
  FaChartBar,
  FaMoneyBillWave,
  FaUniversity,
} from "react-icons/fa";

export interface MenuItem {
  name: string;
  path?: string;
  icon?: React.ReactElement;
  items?: MenuItem[];
  isParent?: boolean;
}

export const menuItemsList: MenuItem[] = [
  {
    name: "Gestión",
    items: [
      {
        name: "Panel de Control",
        path: "/dashboard",
        icon: <IoHomeOutline />,
        isParent: true,
      },
      {
        name: "Contabilidad",
        path: "/gestion/contabilidad",
        icon: <MdManageHistory />,
        isParent: true,
        items: [
          {
            name: "Asientos",
            path: "/gestion/contabilidad/asientos",
            icon: <BsDot />,
          },
          {
            name: "Plan de Cuentas",
            path: "/accounting/chart_of_accounts",
            icon: <BsDot />,
          },
          {
            name: "Centros de Costos",
            path: "/gestion/contabilidad/centros-de-costos",
            icon: <BsDot />,
          },
        ],
      },
      {
        name: "Residentes",
        path: "/management/residentes",
        icon: <FiUsers />,
        isParent: true,
        items: [
          {
            name: "Agregar/Editar",
            path: "/management/resident",
            icon: <BsDot />,
          },
          {
            name: "Historial de Pagos",
            path: "/gestion/residentes/historial-de-pagos",
            icon: <BsDot />,
          },
          {
            name: "Enviar Notificaciones",
            path: "/gestion/residentes/enviar-notificaciones",
            icon: <BsDot />,
          },
        ],
      },
    ],
  },
  {
    name: "Control de Accesos",
    items: [
      {
        name: "Accesos",
        path: "/control-de-accesos/accesos",
        icon: <GrSecure />,
        isParent: true,
        items: [
          {
            name: "Registro de Accesos",
            path: "/control-de-accesos/accesos/registro-de-accesos",
            icon: <BsDot />,
          },
          {
            name: "Control de Visitantes",
            path: "/control-de-accesos/accesos/control-de-visitantes",
            icon: <BsDot />,
          },
          {
            name: "Bitácora",
            path: "/control-de-accesos/accesos/bitacora",
            icon: <BsDot />,
          },
        ],
      },
    ],
  },
  {
    name: "Comunicación",
    items: [
      {
        name: "Comunicación",
        path: "/comunicacion",
        icon: <FaForumbee />,
        isParent: true,
        items: [
          {
            name: "Anuncios Generales",
            path: "/comunicacion/anuncios-generales",
            icon: <BsDot />,
          },
          {
            name: "Encuestas y Votaciones",
            path: "/comunicacion/encuestas-y-votaciones",
            icon: <BsDot />,
          },
          {
            name: "Foro Comunitario",
            path: "/comunicacion/foro-comunitario",
            icon: <BsDot />,
          },
        ],
      },
    ],
  },
  {
    name: "Reportes y Finanzas",
    items: [
      {
        name: "Reportes",
        path: "/reportes-y-finanzas/reportes",
        icon: <FaChartBar />,
        isParent: true,
        items: [
          {
            name: "Estado de Resultado",
            path: "/reportes-y-finanzas/reportes/estado-de-resultado",
            icon: <BsDot />,
          },
          {
            name: "Balance General",
            path: "/reportes-y-finanzas/reportes/balance-general",
            icon: <BsDot />,
          },
          {
            name: "Balance de Comprobación",
            path: "/reportes-y-finanzas/reportes/balance-de-comprobacion",
            icon: <BsDot />,
          },
          {
            name: "Flujo de Caja",
            path: "/reportes-y-finanzas/reportes/flujo-de-caja",
            icon: <BsDot />,
          },
          {
            name: "Ventas",
            path: "/reportes-y-finanzas/reportes/ventas",
            icon: <BsDot />,
          },
          {
            name: "Gastos Comunes",
            path: "/reportes-y-finanzas/reportes/gastos-comunes",
            icon: <BsDot />,
          },
        ],
      },
      {
        name: "Transacciones",
        path: "/reportes-y-finanzas/transacciones",
        icon: <FaMoneyBillWave />,
        isParent: true,
        items: [
          {
            name: "Facturación",
            path: "/reportes-y-finanzas/transacciones/facturacion",
            icon: <BsDot />,
          },
          {
            name: "Cobros",
            path: "/reportes-y-finanzas/transacciones/cobros",
            icon: <BsDot />,
          },
          {
            name: "Pagos",
            path: "/reportes-y-finanzas/transacciones/pagos",
            icon: <BsDot />,
          },
          {
            name: "Depósitos",
            path: "/reportes-y-finanzas/transacciones/depositos",
            icon: <BsDot />,
          },
        ],
      },
      {
        name: "Bancos",
        path: "/reportes-y-finanzas/bancos",
        icon: <FaUniversity />,
        isParent: true,
        items: [
          {
            name: "Estado de Cuenta",
            path: "/reportes-y-finanzas/bancos/estado-de-cuenta",
            icon: <BsDot />,
          },
          {
            name: "Movimientos",
            path: "/reportes-y-finanzas/bancos/movimientos",
            icon: <BsDot />,
          },
          {
            name: "Conciliación Bancaria",
            path: "/reportes-y-finanzas/bancos/conciliacion-bancaria",
            icon: <BsDot />,
          },
        ],
      },
    ],
  },
  {
    name: "Configuración",
    items: [
      {
        name: "Configuración",
        path: "/configuracion",
        icon: <MdSettings />,
        isParent: true,
        items: [
          {
            name: "Facturación Electrónica",
            path: "/configuracion/facturacion-electronica",
            icon: <BsDot />,
          },
          {
            name: "Categorías",
            path: "/configuracion/categorias",
            icon: <BsDot />,
          },
          {
            name: "Reglas y Normativas",
            path: "/configuracion/reglas-y-normativas",
            icon: <BsDot />,
          },
          {
            name: "Usuarios del Sistema",
            path: "/configuracion/usuarios-del-sistema",
            icon: <BsDot />,
          },
          {
            name: "Integraciones",
            path: "/configuracion/integraciones",
            icon: <BsDot />,
          },
        ],
      },
    ],
  },
];
