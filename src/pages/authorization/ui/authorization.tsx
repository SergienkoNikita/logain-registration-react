import {
  FC, JSX, useMemo, useState,
} from 'react';
import { LoginForm } from './login-form.tsx';
import { RegistrationForm } from './registration-form.tsx';
import { BaseSwitchButton } from '../../../shared/ui';
import styles from './authoriztion.module.css';

enum LoginType {
  Login = 'login',
  Registration = 'registration',
}

export const Authorization: FC = () => {
  const [activeLoginType, setActiveLoginType] = useState<LoginType>(LoginType.Login);
  const loginTypeOptions: { value: LoginType, label: string }[] = [
    { value: LoginType.Login, label: 'Логин' },
    { value: LoginType.Registration, label: 'Регистрация' },
  ];

  const setSelected = (loginType: LoginType) => {
    setActiveLoginType(loginType);
  };

  const activeForm = useMemo<JSX.Element>(() => {
    if (activeLoginType === LoginType.Login) return <LoginForm/>;

    return <RegistrationForm/>;
  }, [activeLoginType]);

  return (
    <div className={styles.authorization}>
      <div className={styles.authorizationForms}>
        <h1>Авторизация</h1>

        <BaseSwitchButton
          value={activeLoginType as string}
          options={loginTypeOptions}
          onChange={setSelected}
        />
        { activeForm }
      </div>
    </div>
  );
};
