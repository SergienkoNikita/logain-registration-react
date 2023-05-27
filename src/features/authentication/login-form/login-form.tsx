import { FC, useState } from 'react';
import { BaseInput } from '../../../shared/ui';

export const LoginForm: FC = () => {
  const [loginForm, setLoginForm] = useState<{
    login: string | number;
    password: string | number;
  }>({
    login: '',
    password: '',
  });

  const setLogin = (value: string | number) => {
    setLoginForm({ ...loginForm, login: value });
  };

  const setPassword = (value: string | number) => {
    setLoginForm({ ...loginForm, password: value });
  };

  const log = () => {
    // eslint-disable-next-line no-console
    console.log(loginForm);
  };

  return (
    <>
      <div>Форма логина</div>
      <BaseInput
        type='text'
        showCount
        placeholder='Логин'
        value={loginForm.login}
        onChange={setLogin}
        clearable
      />

      <BaseInput
        type='password'
        placeholder='Пароль'
        value={loginForm.login}
        onChange={setPassword}
        clearable
      />

      <button onClick={log}>показать логин</button>
    </>
  );
};
