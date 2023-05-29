import { FC, useMemo } from 'react';
import classes from './base-switch-button.module.pcss';

type SwitchButtonItemProps = {
  isActive: boolean;
  value: string | number;
  label: string | number;
  onSelect(value: string | number): void;
};

export const BaseSwitchButtonItem: FC<SwitchButtonItemProps> = ({
  isActive,
  value,
  label,
  onSelect,
}) => {
  const itemClasses = useMemo<string>(() => (
    [classes.switchButtonItem, isActive ? classes.switchButtonItemActive : ''].join(' ')
  ), [isActive]);

  return (
    <div
      className={itemClasses}
      onClick={() => onSelect(value)}
    >{label}</div>
  );
};
