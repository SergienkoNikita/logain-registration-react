import { FC } from 'react';
import styles from './authoriztion.module.css';
import { Authentication } from '../../../features/authentication';

export const Authorization: FC = () => (
    <div className={styles.authorization}>
      <div className={styles.authorizationForms}>
        <h1>Авторизация</h1>
        <Authentication/>
      </div>
    </div>
);
