import * as yup from "yup";

const schemaStep1 = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
  surname: yup.string().required("El apellidos es obligatorio"),
  email: yup
    .string()
    .email("Debe ser un email válido")
    .required("El email es obligatorio"),
  country: yup.string().required("El país es obligatorio"),
  phone: yup.string().required("El teléfono es obligatorio"),
  password: yup
    .string()
    .required("El campo es requerido")
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .matches(
      /[A-Z]/,
      "La contraseña debe incluir al menos una letra mayúscula."
    )
    .matches(
      /[a-z]/,
      "La contraseña debe incluir al menos una letra minúscula."
    )
    .matches(/[0-9]/, "La contraseña debe incluir al menos un número.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "La contraseña debe incluir al menos un carácter especial (!@#$%^&*, etc.)."
    )
    .matches(
      /^(?!.*(\w)\1{2,}).*$/,
      "La contraseña no debe contener caracteres repetidos consecutivamente."
    ),
  confirmPassword: yup
    .string()
    .required("El campo es requerido")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
});

const schemaStep2 = yup.object({
  companyName: yup
    .string()
    .required("El campo nombre de la urbannización es obligatorio"),
  taxId: yup.string().required("El campo ID Fiscal es obligatorio"),
  address: yup.string().required("El dirección es obligatorio"),
});

const schemaStep3 = yup.object({
  plan: yup.string().required("La plan es obligatoria"),
});

export const stepSchemas: any = [schemaStep1, schemaStep2, schemaStep3];
