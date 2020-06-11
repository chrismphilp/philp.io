import { IPostCollection } from '../../../model/PostCollection.model';
import { PostCategories } from '../../../model/PostCategories.model';
import moment from 'moment';

const CPPPointersData: IPostCollection = {
  title: 'C++ - An Introduction to Pointers',
  subTitle: 'Here to point you in the right direction',
  sidebarHeader: '',
  sidebarSubHeader: '',
  author: 'Christopher Philp',
  category: PostCategories.Software_Development,
  keywords: ['cpp', 'c++', 'pointers'],
  link: '/cpp-pointers',
  date: moment(new Date('2020-06-11T00:00:00+0000')).toDate(),
  widgetImage: 'https://img-a.udemycdn.com/course/750x422/1026276_b23a_5.jpg',
  widgetImageAlt: 'C++ Logo',
  contentKey: 'cppPointer',
  dateCollection: [],
};

export default CPPPointersData;
