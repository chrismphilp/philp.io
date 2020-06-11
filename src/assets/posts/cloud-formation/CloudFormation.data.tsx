import { PostCategories } from '../../../model/PostCategories.model';
import { IPostCollection } from '../../../model/PostCollection.model';
import moment from 'moment';

const cloudFormationData: IPostCollection = {
  title: 'Every Cloud Has a Silver... What?',
  subTitle: 'The formation of clouds',
  sidebarHeader: 'Some dates to cloud your judgement',
  sidebarSubHeader: 'And other particle-lars...',
  author: 'Christopher Philp',
  category: PostCategories.Science,
  keywords: ['cloud', 'nature', 'rain'],
  link: '/cloud-theory',
  date: moment(new Date('2020-06-05T00:00:00+0000')).toDate(),
  widgetImage: 'https://hitinfrastructure.com/images/site/article_headers/_normal/Cloud.jpg',
  widgetImageAlt: 'Cloud',
  contentKey: 'cloudFormation',
  dateCollection: [
    {
      date: moment(new Date(1046, 5)).toDate(),
      text:
        'Clouds began to appear on items produced during the Zhou dynasty, considered to be a symbol of good ' +
        'fortune in China.',
      timePeriod: 'BC',
    },
    {
      date: moment(new Date(340, 1)).toDate(),
      text:
        'Greek philosopher Aristotle wrote Meteorologica, in which precipitation and the clouds from which ' +
        "precipitation fell were called meteors, originating from the Greek word meteoros, meaning 'high in the sky' " +
        '– and from this the modern term meteorology, the study of clouds and weather.',
      timePeriod: 'BC',
    },
    {
      date: moment(new Date(1300, 8)).toDate(),
      text: 'Clud, in Olde English meaning a rock or hill, began to be used as a metaphor for rain clouds.',
    },
    {
      date: moment(new Date(1802, 5)).toDate(),
      text:
        'The first truly scientific studies were undertaken by Luke Howard in England and Jean-Baptiste Lamarck ' +
        'in France, placing clouds into 12 distinct categories.',
    },
  ],
};

export default cloudFormationData;
