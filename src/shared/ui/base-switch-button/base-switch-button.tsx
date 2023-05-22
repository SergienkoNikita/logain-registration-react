import { FC } from 'react';
import style from './base-switch-button.module.css';

interface BaseSwitchButtonProps {
  value: string | number;
  options: Array<{ value: string | number, label: string | number }>;
  onChange: (value: any) => void
}

export const BaseSwitchButton: FC<BaseSwitchButtonProps> = (props) => (
    <div className={style.baseSwitchButton}>
      {props.options
        .map(
          (option) => <div
            key={option.value}
            className={[props.value === option.value ? style.baseSwitchButtonItemActive : '', style.baseSwitchButtonItem].join(' ')}
            onClick={() => props.onChange(option.value)}
          >{option.label}</div>,
        )
      }
    </div>
);
