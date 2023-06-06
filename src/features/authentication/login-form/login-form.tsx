import { FC } from 'react';
import { BaseInput } from 'ui';
import { useForm } from 'libs/form';

export const LoginForm: FC = () => {
  const { values } = useForm([
    {
      name: 'email',
      label: 'email',
    },
    {
      name: 'password',
      label: 'email',
    },
  ]);

  return (
    <div>
      <BaseInput
        type='text'
        placeholder='Логин'
        name='email'
        value={values.email.value as string}
        onChange={values.email.onChange}
        style={{ marginBottom: 10 }}
        clearable
      />

      {/* <BaseInput */}
      {/*  type='password' */}
      {/*  name='password' */}
      {/*  placeholder='Пароль' */}
      {/*  value={values.password} */}
      {/*  onChange={(value) => onFieldChange('password', value)} */}
      {/*  style={{ marginBottom: 10 }} */}
      {/* /> */}
      <button type='submit' style={{ width: '100%', textAlign: 'center' }}>Войти</button>
    </div>
  );
};
