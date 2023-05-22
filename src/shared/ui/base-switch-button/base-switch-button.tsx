import { FC } from 'react';

interface BaseSwitchButtonProps {
  value: string | number;
  options: Array<{ value: string | number, label: string | number }>;
  onChange: (value: string | number) => void
}

export const BaseSwitchButton: FC<BaseSwitchButtonProps> = (props) => (
    <div style={{ display: 'flex' }}>
      {props.options
        .map(
          (option) => <div
            style={{
              border: '1px solid black', padding: '5px', cursor: 'pointer', backgroundColor: props.value === option.value ? 'tan' : '',
            }}
            onClick={() => props.onChange(option.value)}
          >{option.label}</div>,
        )
      }
    </div>
);
