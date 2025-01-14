import * as yup from "yup";

export const schema = yup
  .object({
    oldPassword: yup.string().required("El campo es requerido"),
    newPassword: yup
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
      .oneOf([yup.ref("newPassword")], "Las contraseñas no coinciden"),
  })
  .required();

export type FormData = yup.InferType<typeof schema>;
