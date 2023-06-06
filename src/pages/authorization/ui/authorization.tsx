import { FC } from 'react';
import { Authentication } from 'features/authentication';
import styles from './authoriztion.module.css';

export const Authorization: FC = () => (
    <div className={styles.authorization}>
      <div className={styles.authorizationForms}>
        <h1>Авторизация</h1>
        <Authentication/>
      </div>
    </div>
);
