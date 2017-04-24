// @flow
import {List} from 'immutable';
import type {Promo} from '../../../model/promo';
import type {Series} from "../../../model/series";
import {createPromo} from '../../../model/promo';
import {ArticleStubFactory} from '../../../model/article-stub';
import mockJson from '../../../test/mocks/wp-api.json';

const article = ArticleStubFactory.fromWpApi(mockJson);
export const name = 'Promo';
export const handle = 'promo';
export const collated = true;

export const promo = createPromo(({
  contentType: 'article',
  image: article.thumbnail,
  title: article.headline,
  url: article.url,
  description: article.description
}: Promo));

export const context = { promo };

const commissionedSeries: Series = {
  url: '/series/electricity',
  name: 'Electricity',
  commissionedLength: 5,
  color: 'purple',
  // $FlowFixMe for the items
  items: List([1,2,3,4,5])
};
const namedSeries: Series = Object.assign({}, commissionedSeries, {name: 'Body Squabbles'});

const promoWithCommissionedSeries = Object.assign({}, promo, {series: [commissionedSeries], positionInSeries: 3});
const promoWithNamedSeries = Object.assign({}, promo, {series: [namedSeries]});

export const variants = [
  {
    name: 'series-article',
    context: {promo: Object.assign({}, promoWithCommissionedSeries, {modifiers: ['series']}, {contentType: 'series'})}
  },
  {
    name: 'gallery',
    context: {promo: Object.assign({}, promo, {modifiers: ['underlined']}, {contentType: 'gallery'})}
  },
  {
    name: 'audio',
    context: {promo: Object.assign({}, promo, {modifiers: ['underlined']}, { contentType: 'audio', length: '01:35' })}
  },
  {
    name: 'video',
    context: {promo: Object.assign({}, promo, {modifiers: ['underlined']}, { contentType: 'video', length: '01:35' })}
  },
  {
    name: 'comic',
    context: {promo: Object.assign({}, promoWithNamedSeries, {contentType: 'comic'})}
  },
  {
    name: 'standalone',
    context: {promo: Object.assign({}, promo, {contentType: 'article'}, {modifiers: ['standalone']})}
  },
  {
    name: 'lead',
    context: {promo: Object.assign({}, promo, {contentType: 'article', weight: 'lead'})}
  },
  {
    name: 'regular',
    context: {promo: Object.assign({}, promo, {contentType: 'article', weight: 'regular'})}
  },
  {
    name: 'with-chapters',
    context: {promo: Object.assign({}, promoWithCommissionedSeries, {contentType: 'article', weight: 'lead'})}
  },
  {
    name: 'standalone-with-chapters',
    context: {promo: Object.assign({}, promoWithCommissionedSeries, {contentType: 'article', weight: 'lead'}, {modifiers: ['standalone']})}
  }
];
