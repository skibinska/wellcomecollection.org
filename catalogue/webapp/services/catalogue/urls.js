// @flow
import type { NextLinkType } from '@weco/common/model/next-link-type';

type WorkUrlProps = {|
  id: string,
  query: ?string,
  page: ?number,
  workType?: string[],
  itemsLocationsLocationType?: string[],
|};

type WorksUrlProps = {|
  query: ?string,
  page: ?number,
  workType?: string[],
  itemsLocationsLocationType?: string[],
|};

function removeEmpty(obj: Object): Object {
  return JSON.parse(JSON.stringify(obj));
}

function workTypeAndItemsLocationType(workType, itemsLocationsLocationType) {
  const isDefaultWorkType =
    JSON.stringify(workType) === JSON.stringify(['k', 'q']);
  const isDefaultItemsLocationsLocationType =
    JSON.stringify(itemsLocationsLocationType) ===
    JSON.stringify(['iiif-image']);

  return {
    workType: workType && !isDefaultWorkType ? workType.join(',') : undefined,
    'items.locations.locationType':
      itemsLocationsLocationType && !isDefaultItemsLocationsLocationType
        ? itemsLocationsLocationType.join(',')
        : undefined,
  };
}

export function workUrl({
  id,
  query,
  page,
  workType,
  itemsLocationsLocationType,
}: WorkUrlProps): NextLinkType {
  return {
    href: {
      pathname: `/work`,
      query: {
        id,
        ...removeEmpty({
          query: query || undefined,
          page: page && page > 1 ? page : undefined,
          ...workTypeAndItemsLocationType(workType, itemsLocationsLocationType),
        }),
      },
    },
    as: {
      pathname: `/works/${id}`,
      query: removeEmpty({
        query: query || undefined,
        page: page && page > 1 ? page : undefined,
        ...workTypeAndItemsLocationType(workType, itemsLocationsLocationType),
      }),
    },
  };
}

export function worksUrl({
  query,
  page,
  workType,
  itemsLocationsLocationType,
}: WorksUrlProps): NextLinkType {
  return {
    href: {
      pathname: `/works`,
      query: removeEmpty({
        query: query || undefined,
        page: page && page > 1 ? page : undefined,
        ...workTypeAndItemsLocationType(workType, itemsLocationsLocationType),
      }),
    },
    as: {
      pathname: `/works`,
      query: removeEmpty({
        query: query || undefined,
        page: page && page > 1 ? page : undefined,
        ...workTypeAndItemsLocationType(workType, itemsLocationsLocationType),
      }),
    },
  };
}
