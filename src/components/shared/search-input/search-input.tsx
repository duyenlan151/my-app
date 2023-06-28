import { InputField } from '@/components/shared';
import { useDebounce, useNavigateParams } from '@/hooks';
import { ChangeEvent, useEffect, useState } from 'react';

interface SearchInputProps {
  defaultValue: string;
}

export function SearchInput({ defaultValue }: SearchInputProps) {
  const [searchText, setSearchText] = useState(defaultValue !== 'null' ? defaultValue : '');
  const navigateParams = useNavigateParams();

  const debouncedSearchText = useDebounce(searchText, 1000);

  useEffect(() => {
    if (debouncedSearchText) {
      navigateParams('/', `search=${debouncedSearchText || searchText}`);
      return;
    }

    navigateParams('/', '');
  }, [debouncedSearchText]);

  return (
    <div>
      <InputField
        value={searchText}
        name="search"
        placeholder="Search product by name"
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => setSearchText(value)}
        onClear={() => setSearchText('')}
      />
    </div>
  );
}
