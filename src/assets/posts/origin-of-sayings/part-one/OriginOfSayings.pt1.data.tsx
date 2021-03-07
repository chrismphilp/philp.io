import { IPostCollection } from '../../../../model/PostCollection.model';
import { PostCategories } from '../../../../model/PostCategories.model';
import origin_jpg from './origin_pt1.jpg';
import moment from 'moment';

const originOfSayingsPt1Data: IPostCollection = {
  title: 'The Origin of Sayings - Part 1',
  subTitle: 'Bite the bullet and learn something new',
  sidebarHeader: '',
  sidebarSubHeader: '',
  author: 'Christopher Philp',
  category: PostCategories.Language,
  keywords: ['sayings', 'origin', 'etymology', 'words'],
  link: '/origin-of-sayings-part-one',
  date: moment(new Date('2020-06-09T00:00:00+0000')).toDate(),
  widgetImage: origin_jpg,
  widgetImageAlt: 'Victorian Art Museum',
  contentKey: 'originOfSayingsPt1',
  dateCollection: [],
};

export default originOfSayingsPt1Data;
