import { FC, useState } from 'react';
import { LoginForm } from './login-form.tsx';
import { RegistrationForm } from './registration-form.tsx';
import { BaseSwitchButton } from '../../../shared/ui';

enum LoginTypeEnum {
  Login = 'login',
  Registration = 'registration',
}

export const Authorization: FC = () => {
  const [loginType, setLoginType] = useState<LoginTypeEnum>();
  const options: { value: LoginTypeEnum, label: string }[] = [{ value: LoginTypeEnum.Login, label: 'Логин' }, { value: LoginTypeEnum.Registration, label: 'Регистрация' }];

  const setSelected = (value: string | number) => {
    if (value === LoginTypeEnum.Login || value === LoginTypeEnum.Registration) setLoginType(value);
  };

  return (
    <div>
      Авторизация

      <BaseSwitchButton
        value={loginType as string}
        options={options}
        onChange={setSelected}
      />
      {loginType === LoginTypeEnum.Login
        ? <LoginForm/>
        : <RegistrationForm/>
      }
    </div>
  );
};
