import { InputHTMLAttributes, ReactNode } from 'react';
import { UiSize } from '../ui-sizes.ts';
import { InputStatuses } from './constants.ts';

export interface BaseInputProps extends Omit<
InputHTMLAttributes<HTMLInputElement>,
'prefix' | 'value' | 'size' | 'onChange' | 'onInput' | 'onFocus' | 'onBlur'
> {
  value: string;
  onChange(value: string): void;
  onInput?(value: string): void;
  onBlur?(): void;
  onFocus?(): void;
  addonBefore?: string | number | ReactNode;
  addonAfter?: string | number | ReactNode;
  defaultValue?: string;
  clearable?: boolean;
  maxLength?: number;
  showCount?: boolean;
  status?: InputStatuses;
  size?: UiSize;
  prefix?: string | number | ReactNode;
  postfix?: string | number | ReactNode;
  enterButton?: boolean | string | ReactNode;
  loading?: boolean;
}
