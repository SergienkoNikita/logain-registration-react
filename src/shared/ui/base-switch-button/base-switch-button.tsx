import { FC, ReactElement, useMemo } from 'react';
import classes from './base-switch-button.module.pcss';
import { UI_SIZES, UiSize } from '../ui-sizes.ts';
import { BaseSwitchButtonItem } from './base-switch-button-item.tsx';

interface BaseSwitchButtonProps {
  value: string | number;
  options: Array<{ value: string | number, label: string | number }>;
  onChange: (value: any) => void
  size?: UiSize
}

export const BaseSwitchButton: FC<BaseSwitchButtonProps> = ({
  value,
  options,
  size,
  onChange,
}) => {
  const wrapClasses = useMemo<string>(
    () => (
      [classes.switchButton, classes[size ?? UI_SIZES.md]].join(' ')
    ),
    [size],
  );

  return (
    <div className={wrapClasses}>
      {options.map<ReactElement>((option) => (
        <BaseSwitchButtonItem
          key={`button-item-${option.value}`}
          label={option.label}
          value={option.value}
          isActive={option.value === value}
          onSelect={(v) => onChange(v)}
        />
      ))}
    </div>
  );
};

BaseSwitchButton.defaultProps = {
  size: UI_SIZES.md,
};
