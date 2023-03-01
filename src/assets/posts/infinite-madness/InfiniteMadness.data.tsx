import { IPostCollection } from '../../../model/PostCollection.model';
import { PostCategories } from '../../../model/PostCategories.model';
import universe_jpg from './universe.jpg';
import dayjs from 'dayjs';

const infiniteMadnessData: IPostCollection = {
  title: 'Infinite Madness',
  subTitle: 'Is there anything bigger?',
  sidebarHeader: 'Try to wrap your head around some of these facts',
  sidebarSubHeader: 'They might seem unfathomable',
  author: 'Christopher Philp',
  category: PostCategories.Mathematics,
  keywords: ['infinite', 'infinity', 'forever', 'madness'],
  link: '/infinite-madness',
  date: dayjs('2020-06-25T00:00:00+0000').toDate(),
  widgetImage: universe_jpg,
  widgetImageAlt: 'Infinity',
  contentKey: 'infiniteMadness',
  dateCollection: [],
};

export default infiniteMadnessData;
