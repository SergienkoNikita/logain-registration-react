import { FC } from 'react';
import { FormikProps, useFormik } from 'formik';
import { BaseInput } from '../../../shared/ui';

type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginForm: FC = () => {
  const formik: FormikProps<LoginFormValues> = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (e) => {
      console.log(e);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '60%' }}>
      <BaseInput
        type='text'
        placeholder='Логин'
        name='email'
        value={formik.values.email}
        onChange={(value) => formik.setFieldValue('email', value)}
        style={{ marginBottom: 10 }}
        clearable
      />

      <BaseInput
        type='password'
        name='password'
        placeholder='Пароль'
        value={formik.values.password}
        onChange={(value) => formik.setFieldValue('password', value)}
        style={{ marginBottom: 10 }}
      />
      <button type='submit'>показать логин</button>
    </form>
  );
};
