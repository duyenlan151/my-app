import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

export const useNavigateParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  return (pathname: string, params?: string) => {
    const path = {
      pathname,
      search: createSearchParams(params).toString(),
      replace: true,
      scroll: false,
    };
    navigate(path, { preventScrollReset: true });
  };
};
