import * as yup from "yup";

const schemaStep1 = yup.object({
  email: yup
    .string()
    .email("Debe ser un email válido")
    .required("El email es obligatorio"),
});

const schemaStep2 = yup.object({
  code: yup.string().required("El campo código es obligatorio"),
});

const schemaStep3 = yup
  .object({
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
  })
  .required();

export const stepSchemas: any = [schemaStep1, schemaStep2, schemaStep3];
