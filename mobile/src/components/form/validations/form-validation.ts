import * as Yup from "yup";
// Define a validation schema using Yup
export const validationSchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
    hoursOfSleep: Yup.number()
      .required("Hours of sleep are required")
      .min(0, "Cannot be negative"),
    steps: Yup.number()
      .required("Steps are required")
      .min(0, "Cannot be negative"),
  });
