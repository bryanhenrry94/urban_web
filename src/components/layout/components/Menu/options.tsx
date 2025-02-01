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
        path: "/management/contabilidad",
        icon: <MdManageHistory />,
        isParent: true,
        items: [
          {
            name: "Asientos",
            path: "/management/accounting/journal-entries",
            icon: <BsDot />,
          },
          {
            name: "Plan de Cuentas",
            path: "/management/accounting/chart-of-accounts",
            icon: <BsDot />,
          },
          {
            name: "Centros de Costos",
            path: "/management/accounting/cost-centers",
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
            path: "/management/residents",
            icon: <BsDot />,
          },
          {
            name: "Historial de Pagos",
            path: "/management/residents/history",
            icon: <BsDot />,
          },
          {
            name: "Enviar Notificaciones",
            path: "/management/residents/notifications",
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
        path: "/access-control",
        icon: <GrSecure />,
        isParent: true,
        items: [
          {
            name: "Registro de Accesos",
            path: "/access-control/access-log",
            icon: <BsDot />,
          },
          {
            name: "Control de Visitantes",
            path: "/access-control/visitors",
            icon: <BsDot />,
          },
          {
            name: "Bitácora",
            path: "/access-control/logs",
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
        path: "/communication",
        icon: <FaForumbee />,
        isParent: true,
        items: [
          {
            name: "Anuncios Generales",
            path: "/communication/announcements",
            icon: <BsDot />,
          },
          {
            name: "Encuestas y Votaciones",
            path: "/communication/surveys",
            icon: <BsDot />,
          },
          {
            name: "Foro Comunitario",
            path: "/communication/forum",
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
        path: "/reports-finance/reports",
        icon: <FaChartBar />,
        isParent: true,
        items: [
          {
            name: "Estado de Resultado",
            path: "/reports-finance/reports/income-statement",
            icon: <BsDot />,
          },
          {
            name: "Balance General",
            path: "/reports-finance/reports/balance-sheet",
            icon: <BsDot />,
          },
          {
            name: "Balance de Comprobación",
            path: "/reports-finance/reports/trial-balance",
            icon: <BsDot />,
          },
          {
            name: "Flujo de Caja",
            path: "/reports-finance/reports/cash-flow",
            icon: <BsDot />,
          },
          {
            name: "Ventas",
            path: "/reports-finance/reports/sales",
            icon: <BsDot />,
          },
          {
            name: "Gastos Comunes",
            path: "/reports-finance/reports/common-expenses",
            icon: <BsDot />,
          },
        ],
      },
      {
        name: "Transacciones",
        path: "/reports-finance/transactions",
        icon: <FaMoneyBillWave />,
        isParent: true,
        items: [
          {
            name: "Facturación",
            path: "/reports-finance/transactions/invoicing",
            icon: <BsDot />,
          },
          {
            name: "Cobros",
            path: "/reports-finance/transactions/collections",
            icon: <BsDot />,
          },
          {
            name: "Pagos",
            path: "/reports-finance/transactions/payments",
            icon: <BsDot />,
          },
          {
            name: "Depósitos",
            path: "/reports-finance/transactions/deposits",
            icon: <BsDot />,
          },
        ],
      },
      {
        name: "Bancos",
        path: "/reports-finance/banks",
        icon: <FaUniversity />,
        isParent: true,
        items: [
          {
            name: "Estado de Cuenta",
            path: "/reports-finance/banks/statements",
            icon: <BsDot />,
          },
          {
            name: "Movimientos",
            path: "/reports-finance/banks/movements",
            icon: <BsDot />,
          },
          {
            name: "Conciliación Bancaria",
            path: "/reports-finance/banks/reconciliation",
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
        path: "/settings",
        icon: <MdSettings />,
        isParent: true,
        items: [
          {
            name: "Facturación Electrónica",
            path: "/settings/billing",
            icon: <BsDot />,
          },
          {
            name: "Categorías",
            path: "/settings/categories",
            icon: <BsDot />,
          },
          {
            name: "Reglas y Normativas",
            path: "/settings/rules",
            icon: <BsDot />,
          },
          {
            name: "Usuarios del Sistema",
            path: "/settings/users",
            icon: <BsDot />,
          },
          {
            name: "Integraciones",
            path: "/settings/integrations",
            icon: <BsDot />,
          },
        ],
      },
    ],
  },
];
