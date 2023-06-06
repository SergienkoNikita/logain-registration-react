import {
  FC, JSX, useMemo, useState,
} from 'react';
import { BaseSwitchButton } from 'ui';
import { LoginForm } from './login-form/login-form.tsx';
import { RegistrationForm } from './registration-form/registration-form.tsx';

enum LoginType {
  Login = 'login',
  Registration = 'registration',
}

const loginTypeOptions: { value: LoginType, label: string }[] = [
  { value: LoginType.Login, label: 'Логин' },
  { value: LoginType.Registration, label: 'Регистрация' },
];
export const Authentication: FC = () => {
  const [activeLoginType, setActiveLoginType] = useState<LoginType>(LoginType.Login);

  const setSelected = (loginType: LoginType) => {
    setActiveLoginType(loginType);
  };

  const activeForm = useMemo<JSX.Element>(() => {
    if (activeLoginType === LoginType.Login) return <LoginForm/>;

    return <RegistrationForm/>;
  }, [activeLoginType]);

  return (
    <>
      <BaseSwitchButton
        value={activeLoginType as string}
        options={loginTypeOptions}
        onChange={setSelected}
        size='lg'
      />
      { activeForm }
    </>
  );
};
