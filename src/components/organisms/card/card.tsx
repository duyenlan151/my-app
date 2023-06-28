import { ComponentProps, forwardRef } from 'react';

import { LazyImage } from '@/components/shared';
import styles from './card.module.css';
import { getSymbolCurrency } from '@/utils';

export interface CardProps extends Omit<ComponentProps<'div'>, 'className' | 'children'> {
  title: string;
  description: string;
  Icon?: (props: ComponentProps<'svg'>) => JSX.Element;
  href: string;
  price: number;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, price, Icon, href, ...rest }, ref) => {
    return (
      <div ref={ref} className={styles.card} {...rest}>
        <LazyImage
          classImageWrapper={styles.imageWrapper}
          classImage={styles.image}
          src={href}
          alt={title}
        />
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{getSymbolCurrency(price)}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    );
  }
);

export default Card;
