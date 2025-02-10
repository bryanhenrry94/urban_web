import * as Yup from "yup";

export const PeriodSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date().required("End date is required"),
  status: Yup.string().oneOf(["open", "closed"]).required("Status is required"),
});
