import { IPostCollection } from '../../../model/PostCollection.model';
import { PostCategories } from '../../../model/PostCategories';
import moment from 'moment';

const infiniteMadnessData: IPostCollection = {
  title: 'Infinite Madness',
  subTitle: 'Is there anything bigger?',
  sidebarHeader: 'Try to wrap your head around some of these facts',
  sidebarSubHeader: 'They might seem unfathomable',
  author: 'Christopher Philp',
  category: PostCategories.Mathematics,
  link: '/infinite-madness',
  date: moment('2020-06-25T00:00:00+0000').toDate(),
  widgetImage: 'https://www.scitecheuropa.eu/wp-content/uploads/2019/07/ClaudioVentrella.jpg',
  widgetImageAlt: 'Infinity',
  contentKey: 'infiniteMadness',
  dateCollection: [],
};

export default infiniteMadnessData;
