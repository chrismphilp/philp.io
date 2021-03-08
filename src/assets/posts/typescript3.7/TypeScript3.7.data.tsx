import { IPostCollection } from '../../../model/PostCollection.model';
import { PostCategories } from '../../../model/PostCategories.model';
import typescript_jpg from './typescript.jpg';
import moment from 'moment';

const typeScript37Data: IPostCollection = {
  title: 'TypeScript 3.7 - What\'s New',
  subTitle: 'Let\'s check out some of the new features available',
  sidebarHeader: '',
  sidebarSubHeader: '',
  author: 'Christopher Philp',
  category: PostCategories.Software_Development,
  keywords: ['typescript', 'coding', 'react'],
  link: '/typescript-3.7',
  date: moment(new Date('2020-06-08T00:00:00+0000')).toDate(),
  widgetImage: typescript_jpg,
  widgetImageAlt: 'TypeScript Logo',
  contentKey: 'typeScript3.7',
  dateCollection: [],
};

export default typeScript37Data;
