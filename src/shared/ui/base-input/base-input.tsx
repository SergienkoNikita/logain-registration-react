import {
  FC, FormEvent, useEffect, useMemo, useState,
} from 'react';
import { UI_SIZES } from '../ui-sizes.ts';
import { BaseInputProps } from './types.ts';
import classes from './base-input.module.pcss';

const BaseInput: FC<BaseInputProps> = ({
  value,
  onChange,
  onInput,
  onBlur,
  onFocus,
  addonAfter,
  addonBefore,
  defaultValue,
  clearable,
  maxLength,
  showCount,
  status,
  size,
  prefix,
  postfix,
  enterButton,
  loading,
  ...rest
}) => {
  const [localValue, setLocalValue] = useState<string | number>(defaultValue ?? '');

  useEffect(() => {
    if (localValue === value) return;

    onChange(localValue);
  }, [localValue]);

  const isClearIconVisible = useMemo<boolean>(() => {
    if (!clearable) return false;

    return Boolean(localValue.toString().length);
  }, [localValue]);
  const isCountVisible = useMemo<boolean>(() => (
    Boolean(maxLength) || Boolean(showCount)
  ), [maxLength, showCount]);

  const inputClass = useMemo<string>(() => (
    [classes.baseInput, classes[size ?? UI_SIZES.md]].join(' ')
  ), [size]);

  const onLocalValueChange = (e: FormEvent<HTMLInputElement>): void => {
    setLocalValue(e.currentTarget.value);
  };

  const onLocalValueInput = (e: FormEvent<HTMLInputElement>): void => {
    if (onInput) onInput(e.currentTarget.value);
  };

  const onClearClick = () => {
    if (localValue && localValue.toString().length) setLocalValue('');
  };

  return (
    <div className={inputClass}>
      {addonBefore && <div className={classes.baseInputAddonBefore}>{addonBefore}</div>}
      {prefix && <div className={classes.baseInputPrefix}>{prefix}</div>}
      <div className={classes.baseInputWrap}>
        <input
          {...rest}
          value={localValue}
          onChange={onLocalValueChange}
          onInput={onLocalValueInput}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <div className={classes.baseInputAdditional}>
          {isClearIconVisible
            && <div
                  className={classes.baseInputClearBtn}
                  onClick={onClearClick}
              >
                  <span>x</span>
              </div>}
          {isCountVisible && <div className={classes.baseInputCount}>
            {localValue.toString().length}
            {Boolean(maxLength) && <>{`/${maxLength}`}</>}
          </div>}
        </div>
      </div>
      {postfix && <div className={classes.baseInputPostfix}>{postfix}</div>}
      {addonAfter && <div className={classes.baseInputAddonAfter}>{addonAfter}</div>}
    </div>
  );
};

BaseInput.defaultProps = {
  clearable: false,
  loading: false,
  showCount: false,
  size: UI_SIZES.md,
};

export { BaseInput };
