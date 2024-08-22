import { HealthRecord } from '@typings/health-record';
import { FormikErrors, FormikTouched } from 'formik';

export interface FormValues {
  name: string;
  email: string;
  age: string;
}

export interface FormikProps {
  handleChange: (field: string) => (value: string) => void;
  handleBlur: (field: string) => () => void;
  handleSubmit: () => void;
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
}

export interface HealthRecordFormProps {
  onSubmit: (values: {
    userId:number;
    date: Date;
    hoursOfSleep: number;
    steps: number;
  }) => void;
}