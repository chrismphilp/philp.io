import { IPostCollection } from '../../../../model/PostCollection.model';
import { PostCategories } from '../../../../model/PostCategories';
import moment from 'moment';

const originOfSayingsPt1Data: IPostCollection = {
  title: 'The Origin of Sayings - Part 1',
  subTitle: 'Bite the bullet and learn something new',
  sidebarHeader: '',
  sidebarSubHeader: '',
  author: 'Christopher Philp',
  category: PostCategories.Language,
  link: '/origin-of-sayings-part-one',
  date: moment(new Date('2020-06-09T00:00:00+0000')).toDate(),
  widgetImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Frith_A_Private_View.jpg',
  widgetImageAlt: 'Victorian Street',
  contentKey: 'originOfSayingsPt1',
  dateCollection: [],
};

export default originOfSayingsPt1Data;
