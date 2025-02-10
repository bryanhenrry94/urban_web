import * as Yup from "yup";

export const CostCenterSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
});
