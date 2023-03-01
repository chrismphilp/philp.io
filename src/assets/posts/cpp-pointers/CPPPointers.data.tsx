import { IPostCollection } from '../../../model/PostCollection.model';
import { PostCategories } from '../../../model/PostCategories.model';
import cpp_jpg from './cpp.jpg';
import dayjs from 'dayjs';

const CPPPointersData: IPostCollection = {
  title: 'C++ - An Introduction to Pointers',
  subTitle: 'Here to point you in the right direction',
  sidebarHeader: '',
  sidebarSubHeader: '',
  author: 'Christopher Philp',
  category: PostCategories.Software_Development,
  keywords: ['cpp', 'c++', 'pointers'],
  link: '/cpp-pointers',
  date: dayjs(new Date('2020-06-11T00:00:00+0000')).toDate(),
  widgetImage: cpp_jpg,
  widgetImageAlt: 'C++ Logo',
  contentKey: 'cppPointer',
  dateCollection: [],
};

export default CPPPointersData;
