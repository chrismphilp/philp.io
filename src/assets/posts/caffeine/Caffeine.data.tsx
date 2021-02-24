import { PostCategories } from '../../../model/PostCategories.model';
import { IPostCollection } from '../../../model/PostCollection.model';
import moment from 'moment';

const caffeineData: IPostCollection = {
  title: 'What\'s your daily cuppa\' doing to your body?',
  subTitle: 'Let\'s steam it over',
  sidebarHeader: '',
  sidebarSubHeader: '',
  author: 'Christopher Philp',
  category: PostCategories.Science,
  keywords: ['caffeine', 'coffee', 'tea'],
  link: '/caffeine',
  date: moment(new Date('2020-07-04T00:00:00+0000')).toDate(),
  widgetImage: 'https://i.dailymail.co.uk/1s/2020/01/22/12/23723766-0-image-a-18_1579697765141.jpg',
  widgetImageAlt: 'Teapot',
  contentKey: 'caffeine',
  dateCollection: [
    {
      date: moment(new Date(1046, 5)).toDate(),
      text:
        'Clouds began to appear on items produced during the Zhou dynasty, considered to be a symbol of good ' +
        'fortune in China.',
      timePeriod: 'BC',
    },
  ],
};

export default caffeineData;
