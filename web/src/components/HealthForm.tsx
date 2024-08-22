import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface HealthFormProps {
  addRecord: Function;
  fetchRecords: Function;
}

const HealthForm: React.FC<HealthFormProps> = ({ addRecord, fetchRecords }) => {
  const initialValues = { date: "", steps: 0, hoursOfSleep: 0 };

  const validationSchema = Yup.object({
    date: Yup.string().required("Date is required"),
    steps: Yup.number()
      .min(1, "Steps must be greater than 0")
      .required("Steps are required"),
    hoursOfSleep: Yup.number()
      .min(0, "Hours of sleep cannot be negative")
      .required("Hours of sleep are required"),
  });

  const onSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    try {
      const success = await addRecord(values);
      if (success) {
        toast.success("Record successfully saved!");
        resetForm();
        fetchRecords(); // Refresh the records after successful save
      }
    } catch (error) {
      toast.error("Failed to save the record. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-md w-[400px]">
        <ToastContainer />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <Field
                  id="date"
                  name="date"
                  type="date"
                  className="block w-full border border-gray-300 rounded-md p-2 mt-1 bg-[#F5F9FD]"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="steps"
                  className="block text-sm font-medium text-gray-700"
                >
                  Steps
                </label>
                <Field
                  id="steps"
                  name="steps"
                  type="number"
                  className="block w-full border border-gray-300 rounded-md p-2 mt-1 bg-[#F5F9FD]"
                />
                <ErrorMessage
                  name="steps"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="hoursOfSleep"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hours of Sleep
                </label>
                <Field
                  id="hoursOfSleep"
                  name="hoursOfSleep"
                  type="number"
                  className="block w-full border border-gray-300 rounded-md p-2 mt-1 bg-[#F5F9FD]"
                />
                <ErrorMessage
                  name="hoursOfSleep"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-[#B5D54C] text-white rounded-md hover:bg-[#8fa83c] disabled:opacity-50"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default HealthForm;
