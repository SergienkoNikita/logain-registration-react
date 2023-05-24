import {
  FC, InputHTMLAttributes, ReactElement,
} from 'react';

interface BaseInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'value'> {
  value: string | number | null;
  prefix?: string | number | ReactElement | null;
  postfix?: string | number | ReactElement | null;
  addonBefore?: string | number | ReactElement | null;
  addonAfter?: string | number | ReactElement | null;
  clearable?: boolean;
  enterButton?: boolean | string | ReactElement;
  loading?: boolean;
}

export const BaseInput: FC<BaseInputProps> = (props) => (
    <input type="text"/>
);

BaseInput.defaultProps = {
  clearable: false,
  loading: false,
};
