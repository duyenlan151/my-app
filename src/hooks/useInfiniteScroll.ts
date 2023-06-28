export type UseInfiniteScrollHookArgs = Pick<
  IntersectionObserverHookArgs,
  // We pass this to 'IntersectionObserver'. We can use it to configure when to trigger 'onLoadMore'.
  'rootMargin'
> & {
  // Some sort of "is fetching" info of the request.
  loading: boolean | undefined;
  // If the list has more items to load.
  hasNextPage: boolean | undefined;
  // The callback function to execute when the 'onLoadMore' is triggered.
  // eslint-disable-next-line no-undef
  onLoadMore: VoidFunction;
  // Flag to stop infinite scrolling. Can be used in case of an error etc too.
  disabled?: boolean;
  // How long it should wait before triggering 'onLoadMore'.
  delayInMs?: number;
  distance?: number;
};

import { DEFAULT_DELAY_IN_MS, DEFAULT_DISTANCE } from '@/constants';
import { useLayoutEffect, useRef } from 'react';
import { IntersectionObserverHookArgs } from 'react-intersection-observer-hook';

/**
 * An infinite scroller based on effects.
 * Every time the loader is `N`px to be shown, switch to a new page, load new items.
 *
 * @example
 * @param {Object} [options={}]
 * @param {boolean} options.hasMore The observer will disconnect when there are no more items to load.
 * @param {boolean} [options.reset=false] Pass true when you're re-fetching the list and want to resets the scroller to page 0.
 * @param {number} [options.distance=250] When scrolling, the distance in pixels from the bottom to switch the page.
 */
export function useInfiniteScroll({
  hasNextPage,
  onLoadMore,
  distance = DEFAULT_DISTANCE,
  delayInMs = DEFAULT_DELAY_IN_MS,
}: UseInfiniteScrollHookArgs) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const loaderNode = loaderRef.current;
    const scrollContainerNode = scrollContainerRef.current;
    if (!scrollContainerNode || !loaderNode || !hasNextPage) return;

    const options = {
      root: scrollContainerNode,
      rootMargin: `0px 0px ${distance}px 0px`,
    };

    let previousY: number;
    let previousRatio = 0;

    const listener = (entries: IntersectionObserverEntryInit[]) => {
      entries.forEach(({ isIntersecting, intersectionRatio, boundingClientRect = {} }) => {
        const { y } = boundingClientRect;
        if (
          isIntersecting &&
          intersectionRatio >= previousRatio &&
          (!previousY || Number(y) < previousY)
        ) {
          onLoadMore();
        }
        previousY = Number(y);
        previousRatio = intersectionRatio;
      });
    };

    const observer = new IntersectionObserver(listener, options);
    observer.observe(loaderNode);

    return () => observer.disconnect();
  }, [hasNextPage, distance]);

  return [loaderRef, scrollContainerRef];
}
