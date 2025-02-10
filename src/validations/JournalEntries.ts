import * as yup from "yup";

export const JournalEntriesSchema = yup.object().shape({
  date: yup.date().required("Fecha es requerida"),
  description: yup.string().required("Glosa es requerida"),
  details: yup
    .array()
    .of(
      yup.object().shape({
        account: yup.string().required("Cuenta es requerida"),
        debit: yup.number().required("Debe es requerido"),
        credit: yup.number().required("Haber es requerido"),
        cost_center: yup.string().nullable().default(""),
      })
    )
    .required("Detalles son requeridos")
    .default([]),
});
