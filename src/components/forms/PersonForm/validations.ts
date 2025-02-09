import * as yup from "yup";

export const schema = yup.object({
  type: yup
    .string()
    .required("El campo tipo es requerido")
    .oneOf(
      ["natural", "juridica"],
      "El campo tipo debe ser 'natural' o 'juridica'"
    ),
  numberId: yup.string().required("El número de identificación es requerido"),
  name: yup
    .string()
    .when("type", ([type], schema) =>
      type === "natural"
        ? schema.required("El campo nombre es requerido")
        : schema.nullable()
    ),
  surname: yup
    .string()
    .when("type", ([type], schema) =>
      type === "natural"
        ? schema.required("El campo apellido es requerido")
        : schema.nullable()
    ),
  companyName: yup
    .string()
    .when("type", ([type], schema) =>
      type === "juridica"
        ? schema.required("El campo nombre de la empresa es requerido")
        : schema.nullable()
    ),
  email: yup
    .string()
    .required("El email es requerido")
    .email("El email no es válido"),
  phone: yup.string().optional(),
  address: yup.string().optional(),
  roles: yup.array().of(yup.string().required()),
});
