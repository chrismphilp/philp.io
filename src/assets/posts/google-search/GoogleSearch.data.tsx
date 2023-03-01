import { PostCategories } from '../../../model/PostCategories.model';
import { IPostCollection } from '../../../model/PostCollection.model';
import google_jpg from './google.jpg';
import dayjs from 'dayjs';

const googleSearchData: IPostCollection = {
  title: 'Hey Google, Search This For Me',
  subTitle: 'How the world\'s biggest search engine works',
  sidebarHeader: '',
  sidebarSubHeader: '',
  author: 'Christopher Philp',
  category: PostCategories.Technology,
  keywords: ['google', 'search', 'engine', 'browser'],
  link: '/google-search',
  date: dayjs(new Date('2020-06-08T00:00:00+0000')).toDate(),
  widgetImage: google_jpg,
  widgetImageAlt: 'Google Logo',
  contentKey: 'googleSearch',
  dateCollection: [],
};

export default googleSearchData;
