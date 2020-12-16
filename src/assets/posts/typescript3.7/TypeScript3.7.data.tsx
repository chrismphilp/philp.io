import { IPostCollection } from '../../../model/PostCollection.model';
import { PostCategories } from '../../../model/PostCategories.model';
import moment from 'moment';

const typeScript37Data: IPostCollection = {
  title: "TypeScript 3.7 - What's New",
  subTitle: "Let's check out some of the new features available",
  sidebarHeader: '',
  sidebarSubHeader: '',
  author: 'Christopher Philp',
  category: PostCategories.Software_Development,
  keywords: ['typescript', 'coding', 'react'],
  link: '/typescript-3.7',
  date: moment(new Date('2020-06-08T00:00:00+0000')).toDate(),
  widgetImage: 'https://i2.wp.com/storage.googleapis.com/blog-images-backup/1*KTh3puTlJIF6vAuUUu_LAQ.jpeg?ssl=1',
  widgetImageAlt: 'TypeScript Logo',
  contentKey: 'typeScript3.7',
  dateCollection: [],
};

export default typeScript37Data;
