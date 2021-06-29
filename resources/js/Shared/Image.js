import { fallbackImg } from '@/utils';
import classNames from 'classnames';

export const Image = ({ src, fallbackSrc = null, className, ...props }) => {
  return (
    <img
      src={src != null ? `/upload/${src}` : '/img/fallback-image.jpg'}
      onError={e =>
        fallbackSrc == null ? fallbackImg(e) : fallbackImg(e, fallbackSrc)
      }
      className={classNames('object-cover object-center', className)}
      {...props}
    />
  );
};
