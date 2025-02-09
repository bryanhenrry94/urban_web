import * as yup from "yup";

export const schema = yup
  .object({
    type: yup.string().required("El nombre es requerido"),
    name: yup.string().required("El email es requerido"),
    owner: yup.string().notRequired(),
    residents: yup
      .array()
      .of(
        yup.object().shape({
          resident: yup.string().required("El residente es requerido"),
        })
      )
      .default([]),
  })
  .required();
