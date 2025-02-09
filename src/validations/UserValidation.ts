import * as yup from "yup";

export const UserFormSchema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
    email: yup.string().required("El email es requerido"),
    role: yup
      .mixed<"resident" | "guard" | "admin">()
      .oneOf(["resident", "guard", "admin"])
      .required("El rol es requerido"),
    status: yup
      .mixed<"active" | "inactive">()
      .oneOf(["active", "inactive"])
      .required("El estado es requerido"),
  })
  .required();

export const UserProfileSchema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
  })
  .required();
