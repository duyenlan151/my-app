import { useEffect, useRef, useState } from 'react';
import { ILoadingPrimary } from '../loading-common';

export interface LazyImageProps {
  // Infor image
  src: string;
  alt: string;

  // Style for image
  classImageWrapper?: string;
  classImage?: string;

  lqip?: string;
  aspectRatio?: number;
}

export function LazyImage({
  classImageWrapper,
  classImage,
  src,
  alt,
  aspectRatio = 2 / 3,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className={classImageWrapper}>
      {!loaded && <ILoadingPrimary />}
      <img
        loading="lazy"
        src={src}
        alt={alt}
        ref={imgRef}
        onLoad={() => setLoaded(true)}
        className={`${loaded && 'opacity-1'} ${classImage}`}
      />
    </div>
  );
}
