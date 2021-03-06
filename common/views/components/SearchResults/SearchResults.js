// @flow
import { Fragment } from 'react';
import { spacing, grid, classNames } from '../../../utils/classnames';
import { formatDate } from '../../../utils/format-date';
import Image from '../Image/Image';
import CompactCard from '../CompactCard/CompactCard';
import EventCard from '../EventCard/EventCard';
import ArticleCard from '../ArticleCard/ArticleCard';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';
import type { MultiContent } from '../../../model/multi-content';

type Props = {|
  title?: string,
  summary?: ?string,
  items: $ReadOnlyArray<MultiContent>,
  showPosition?: boolean,
|};

const SearchResults = ({
  items,
  title,
  summary,
  showPosition = false,
}: Props) => (
  <Fragment>
    {title && (
      <div className="grid">
        <div className={grid({ s: 12 })}>
          <h2 className="h2">{title}</h2>
        </div>
      </div>
    )}
    {summary && (
      <div
        className={classNames({
          [spacing({ s: 1 }, { margin: ['bottom'] })]: true,
        })}
      >
        {summary}
      </div>
    )}
    <div
      className={`
        ${spacing({ s: 2 }, { margin: ['top'] })}
      `}
    >
      {items.map(item => (
        <div className={`border-top-width-1 border-color-pumice`} key={item.id}>
          {item.type === 'pages' && (
            <CompactCard
              url={`/pages/${item.id}`}
              title={item.title || ''}
              partNumber={null}
              color={null}
              labels={{ labels: [] }}
              description={item.promo && item.promo.caption}
              urlOverride={item.promo && item.promo.link}
              Image={
                item.promo &&
                item.promo.image && <Image {...item.promo.image} />
              }
              DateInfo={null}
              StatusIndicator={null}
            />
          )}

          {item.type === 'event-series' && (
            <CompactCard
              url={`/event-series/${item.id}`}
              title={item.title || ''}
              partNumber={null}
              color={null}
              labels={{ labels: item.labels }}
              description={item.promo && item.promo.caption}
              urlOverride={item.promo && item.promo.link}
              Image={
                item.promo &&
                item.promo.image && <Image {...item.promo.image} />
              }
              DateInfo={null}
              StatusIndicator={null}
            />
          )}

          {item.type === 'books' && (
            <CompactCard
              url={`/books/${item.id}`}
              title={item.title || ''}
              labels={{ labels: item.labels }}
              partNumber={null}
              color={null}
              description={item.promo && item.promo.caption}
              urlOverride={item.promo && item.promo.link}
              Image={
                item.promo &&
                item.promo.image && <Image {...item.promo.image} />
              }
              DateInfo={null}
              StatusIndicator={null}
            />
          )}

          {item.type === 'articles' && (
            <ArticleCard article={item} showPosition={showPosition} />
          )}

          {item.type === 'article-schedule-items' && (
            <CompactCard
              url={null}
              title={item.title || ''}
              partNumber={item.partNumber}
              color={item.color}
              labels={{ labels: [{ url: null, text: 'Story' }] }}
              description={`Available ${formatDate(item.publishDate)}`}
              urlOverride={null}
              Image={<ImagePlaceholder color={item.color} />}
              DateInfo={null}
              StatusIndicator={null}
            />
          )}

          {item.type === 'events' && <EventCard event={item} />}

          {item.type === 'exhibitions' && (
            <CompactCard
              url={`/exhibitions/${item.id}`}
              title={item.title}
              partNumber={null}
              color={null}
              labels={{ labels: item.labels }}
              description={item.promoText}
              urlOverride={null}
              Image={
                item.promo &&
                // $FlowFixMe (Images)
                item.promo.image && <Image {...item.promo.image} />
              }
              DateInfo={null}
              StatusIndicator={null}
            />
          )}
        </div>
      ))}
    </div>
  </Fragment>
);

export default SearchResults;
