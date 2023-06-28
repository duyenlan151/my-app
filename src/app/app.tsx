import { InfiniteScroll } from '@/components/infinite-scroll';
import Card from '@/components/organisms/card';
import { SearchInput } from '@/components/shared';
import { useProducts } from '@/hooks/';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Products } from 'src/interfaces';
import styles from './app.module.css';

const App = (): JSX.Element => {
  const { search } = useLocation();
  const querySearch = new URLSearchParams(search).get('search');
  const { data, isFetching, fetchNextPage, hasNextPage } = useProducts({
    search: String(querySearch || ''),
  });

  const dataProducts: Products[] = useMemo(() => {
    if (data?.pages) {
      const newData = data?.pages?.reduce(
        (newArray: any, item: any) => [...newArray, ...item.products],
        []
      );

      return newData;
    }
    return [];
  }, [data?.pages]) as [];

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>
          React + TypeScript + Tailwind: Infinite Scrolling and Searchable Product List
        </h1>
      </header>
      <section className={styles.features}>
        <div className={styles.searchInput}>
          <SearchInput defaultValue={String(querySearch)} />
        </div>

        {!isFetching && dataProducts?.length <= 0 && (
          <div className="text-gray-400">No data found</div>
        )}
        <InfiniteScroll
          loader={<p>loading...</p>}
          isLoading={isFetching}
          className="mx-auto my-10"
          fetchMore={fetchNextPage}
          hasMore={hasNextPage}
          endMessage={<p>You have seen it all</p>}
        >
          {dataProducts?.map((product: Products, _) => (
            <div key={`${product.id} - ${_}`} className={styles.cardWrapper}>
              <Card
                title={product?.title}
                price={product?.price}
                description={product?.description}
                href={product?.thumbnail}
              />
            </div>
          ))}
        </InfiniteScroll>
      </section>
      <footer className={styles.footer}>
        <a href="https://github.com/jvidalv">Josep Vidal @ {new Date().getFullYear()}</a>
      </footer>
    </main>
  );
};

export default App;
