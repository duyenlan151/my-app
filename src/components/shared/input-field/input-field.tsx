import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CSSProperties, ChangeEvent, HTMLInputTypeAttribute, useCallback, useRef } from 'react';
import styles from './input-field.module.css';

export interface InputFieldProps {
  // Required
  name: string;
  value: string;

  // Func handle onChange value
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onClear(): void;

  errors?: string;
  icon?: string;

  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;

  type?: HTMLInputTypeAttribute;

  // Style
  containerStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  wrapperStyle?: CSSProperties;
  className?: string;
}

export function InputField({
  type = 'text',
  placeholder = 'Placeholder',
  readOnly = false,
  required = false,
  disabled = false,
  value,
  name,
  onChange,
  onClear,
  errors,
  icon,
  className,
  inputStyle,
  wrapperStyle,
  containerStyle,
}: InputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef && inputRef.current) inputRef.current?.focus();
  };

  const renderIcon = useCallback(
    (className: string) => {
      return value ? (
        <XMarkIcon className={className} onClick={onClear} />
      ) : (
        <MagnifyingGlassIcon className={className} />
      );
    },
    [value]
  );

  return (
    <div className={styles.wrapperStyle} style={wrapperStyle}>
      <div onClick={handleClick} className={styles.wrapperInput} style={containerStyle}>
        <input
          ref={inputRef}
          aria-label={name}
          data-testid={name}
          tabIndex={0}
          type={type}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          // defaultValue={value}
          className={styles.input}
          style={inputStyle}
          disabled={disabled}
          readOnly={readOnly}
        />
      </div>
      {renderIcon(styles.icon)}
      {errors && !value && required && <div data-testid="errors">Required!</div>}
    </div>
  );
}
