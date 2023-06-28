import { useEffect, useState } from 'react';

/**
 *
 * @param initialValue: initial value
 * @param time: type number(miliseconds)
 *
 * @returns value after time
 */

export function useDebounce<T>(initialValue: T, time: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(initialValue);
    }, time);

    return () => {
      clearTimeout(debounce);
    };
  }, [initialValue, time]);

  return debouncedValue;
}
