// @flow

import {convertImageUri} from '../../../utils/convert-image-uri';
import {imageSizes} from '../../../utils/image-sizes';

type Props = {|
  width: string,
  height?: string,
  contentUrl: string,
  clipPathClass?: string,
  alt: string,
  caption?: string,
  lazyload: ?boolean,
  sizesQueries?: string,
  copyright?: string,
  defaultSize?: number
|}

const Image = ({width, height, contentUrl, clipPathClass, alt = '', caption, lazyload, sizesQueries = '100vw', copyright, defaultSize = 30}: Props) => (
  <div className="work-media__image-container">
    <noscript>
      <img width={width}
        height={height}
        className='image image--noscript'
        src={convertImageUri(contentUrl, 640, false)}
        alt={alt} />
    </noscript>
    {imageMarkup(width, height, clipPathClass, lazyload, defaultSize, contentUrl, sizesQueries, copyright, alt, caption)}
  </div>
);

const imageClasses = (clip = false, lazyload, clipPathClass) => {
  const lazyloadClass = lazyload ? 'lazy-image lazyload' : '';
  const clipClass = clip ? `promo__image-mask ${clipPathClass}` : '';

  return `image ${lazyloadClass} ${clipClass}`;
};

const imageMarkup = (width, height, clipPathClass, lazyload, defaultSize, contentUrl, sizesQueries, copyright, alt, caption) => {
  const sizes = imageSizes(width);
  const baseMarkup = clip => (
    <img width={width}
      height={height}
      className={imageClasses(clip, lazyload, clipPathClass)}
      src={convertImageUri(contentUrl, defaultSize, false)}
      data-srcset={sizes.map(size => {
        return `${convertImageUri(contentUrl, size, false)} ${size}w`;
      })}
      data-copyright={copyright}
      alt={alt} />
  );

  return clipPathClass ? [
    baseMarkup(),
    baseMarkup(true)]
    : baseMarkup();
};

export default Image;
