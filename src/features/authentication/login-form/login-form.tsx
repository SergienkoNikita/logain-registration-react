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
      <BaseInput
        type='text'
        placeholder='Логин'
        value={loginForm.login}
        onChange={setLogin}
        clearable
        addonAfter='After'
        addonBefore='Before'
        prefix={<span style={{ fontSize: 10, padding: '0 3px' }}>Prefix</span>}
        postfix={<span style={{ fontSize: 10, padding: '0 3px' }}>Postfix</span>}
        maxLength={50}
        status='success'
        enterButton='Сабмит'
        loading
        showCount
        size='xs'
      />

      <BaseInput
        type='text'
        placeholder='Пароль'
        value={loginForm.login}
        onChange={setPassword}
        clearable
        addonAfter='After'
        addonBefore='Before'
        prefix={<span style={{ fontSize: 10, padding: '0 3px' }}>Prefix</span>}
        postfix={<span style={{ fontSize: 10, padding: '0 3px' }}>Postfix</span>}
        maxLength={50}
        status='success'
        enterButton='Сабмит'
        loading
        showCount
        size='sm'
      />
      <BaseInput
        type='text'
        placeholder='Логин'
        value={loginForm.login}
        onChange={setLogin}
        clearable
        addonAfter='After'
        addonBefore='Before'
        prefix={<span style={{ fontSize: 10, padding: '0 3px' }}>Prefix</span>}
        postfix={<span style={{ fontSize: 10, padding: '0 3px' }}>Postfix</span>}
        maxLength={50}
        status='success'
        enterButton='Сабмит'
        loading
        showCount
        size='md'
      />

      <BaseInput
        type='text'
        placeholder='Пароль'
        value={loginForm.login}
        onChange={setPassword}
        clearable
        addonAfter='After'
        addonBefore='Before'
        prefix={<span style={{ fontSize: 10, padding: '0 3px' }}>Prefix</span>}
        postfix={<span style={{ fontSize: 10, padding: '0 3px' }}>Postfix</span>}
        maxLength={50}
        status='success'
        enterButton='Сабмит'
        loading
        showCount
        size='lg'
      />

      <BaseInput
        type='text'
        placeholder='Пароль'
        value={loginForm.login}
        onChange={setPassword}
        clearable
        addonAfter='After'
        addonBefore='Before'
        prefix={<span style={{ fontSize: 10, padding: '0 3px' }}>Prefix</span>}
        postfix={<span style={{ fontSize: 10, padding: '0 3px' }}>Postfix</span>}
        maxLength={50}
        status='success'
        enterButton='Сабмит'
        loading
        showCount
        size='xl'
      />

      <button onClick={log}>показать логин</button>
    </>
  );
};
