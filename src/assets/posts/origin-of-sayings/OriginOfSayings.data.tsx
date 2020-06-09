import { IPostCollection } from '../../../model/PostCollection.model';
import { PostCategories } from '../../../model/PostCategories';
import moment from 'moment';

const originOfSayingsData: IPostCollection = {
  title: 'The Origin of Sayings',
  subTitle: 'Learn the origin of your Achilles Heel',
  sidebarHeader: '',
  sidebarSubHeader: '',
  author: 'Christopher Philp',
  category: PostCategories.Language,
  link: '/origin-of-sayings',
  date: moment(new Date('2020-06-09T00:00:00+0000')).toDate(),
  widgetImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Frith_A_Private_View.jpg',
  widgetImageAlt: 'Victorian Street',
  contentKey: 'originOfSayings',
  dateCollection: [
    {
      date: moment(new Date(2020, 4)).toDate(),
      text: '',
    },
  ],
};

export default originOfSayingsData;
