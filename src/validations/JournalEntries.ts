import * as yup from "yup";

export const JournalEntriesSchema = yup.object().shape({
  reference: yup.string().required("Referencia es requerida"),
  description: yup.string().required("Glosa es requerida"),
  date: yup.date().required("Fecha es requerida"),
  details: yup
    .array()
    .of(
      yup.object().shape({
        ledgerAccount: yup.string().required("Cuenta es requerida"),
        debit: yup.number().required("Debe es requerido"),
        credit: yup.number().required("Haber es requerido"),
        costCenter: yup.string().nullable().default(""),
      })
    )
    .required("Detalles son requeridos")
    .default([]),
});
