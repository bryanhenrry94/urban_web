import React from "react";
import { BsDot } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuHouse } from "react-icons/lu";
import { LuLogs } from "react-icons/lu";
import { LuMessageSquareText } from "react-icons/lu";
import { LuChartBar } from "react-icons/lu";
import { LuFileStack } from "react-icons/lu";
import { LuPiggyBank } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";

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
        icon: <LuLayoutDashboard />,
        isParent: true,
      },
      {
        name: "Contabilidad",
        path: "/management/contabilidad",
        icon: <LuChartNoAxesCombined />,
        isParent: true,
        items: [
          {
            name: "Asientos",
            path: "/management/accounting/journal-entries",
            icon: <BsDot />,
          },
          {
            name: "Plan de Cuentas",
            path: "/management/accounting/ledger-accounts",
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
        name: "Unidades",
        path: "/management/units",
        icon: <LuHouse />,
        isParent: true,
        items: [
          {
            name: "Agregar/Editar",
            path: "/management/units",
            icon: <BsDot />,
          },
        ],
      },
      {
        name: "Personas",
        path: "/management/persons",
        icon: <LuUsers />,
        isParent: true,
        items: [
          {
            name: "Agregar/Editar",
            path: "/management/persons",
            icon: <BsDot />,
          },
          {
            name: "Historial de Pagos",
            path: "/management/persons/history",
            icon: <BsDot />,
          },
          {
            name: "Enviar Notificaciones",
            path: "/management/persons/notifications",
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
        icon: <LuLogs />,
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
        icon: <LuMessageSquareText />,
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
        icon: <LuChartBar />,
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
        icon: <LuFileStack />,
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
        icon: <LuPiggyBank />,
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
        icon: <LuSettings />,
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
