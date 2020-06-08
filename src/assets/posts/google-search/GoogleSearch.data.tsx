import { PostCategories } from '../../../model/PostCategories';
import { IPostCollection } from '../../../model/PostCollection.model';
import moment from 'moment';

const googleSearchData: IPostCollection = {
  title: 'Hey Google, Search This For Me',
  subTitle: "How the world's biggest search engine works",
  sidebarHeader: '',
  sidebarSubHeader: '',
  author: 'Christopher Philp',
  category: PostCategories.Technology,
  link: '/google-search',
  date: moment(new Date('2020-06-08T00:00:00+0000')).toDate(),
  widgetImage: 'https://blog.hubspot.com/hubfs/image8-2.jpg',
  widgetImageAlt: 'Google Logo',
  contentKey: 'googleSearch',
  dateCollection: [],
};

export default googleSearchData;
