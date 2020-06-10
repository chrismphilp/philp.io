import { IPostCollection } from '../../../../model/PostCollection.model';
import { PostCategories } from '../../../../model/PostCategories';
import moment from 'moment';

const originOfSayingsPt2Data: IPostCollection = {
  title: 'The Origin of Sayings - Part 2',
  subTitle: 'Continue onto pastures new',
  sidebarHeader: '',
  sidebarSubHeader: '',
  author: 'Christopher Philp',
  category: PostCategories.Language,
  link: '/origin-of-sayings-part-two',
  date: moment(new Date('2020-06-09T00:00:01+0000')).toDate(),
  widgetImage:
    'https://2.bp.blogspot.com/-r4YUwQVBRx8/TlTeTJZEfZI/AAAAAAAAEIY/A3E1oha-6yE/s1600/pplicants-for-Admission-to-a-Casual-Ward-1874-xx-Sir-Samuel-Luke-Fildes.JPG',
  widgetImageAlt: 'Victorian Street',
  contentKey: 'originOfSayingsPt2',
  dateCollection: [],
};

export default originOfSayingsPt2Data;
