import { IPostCollection } from '../../../../model/PostCollection.model';
import { PostCategories } from '../../../../model/PostCategories.model';
import origin_jpg from './origin_pt2.jpg';
import dayjs from 'dayjs';

const originOfSayingsPt2Data: IPostCollection = {
  title: 'The Origin of Sayings - Part 2',
  subTitle: 'Continue onto pastures new',
  sidebarHeader: '',
  sidebarSubHeader: '',
  author: 'Christopher Philp',
  category: PostCategories.Language,
  keywords: ['sayings', 'origin', 'etymology', 'words'],
  link: '/origin-of-sayings-part-two',
  date: dayjs(new Date('2020-06-09T00:00:01+0000')).toDate(),
  widgetImage: origin_jpg,
  widgetImageAlt: 'Victorian Street',
  contentKey: 'originOfSayingsPt2',
  dateCollection: [],
};

export default originOfSayingsPt2Data;
