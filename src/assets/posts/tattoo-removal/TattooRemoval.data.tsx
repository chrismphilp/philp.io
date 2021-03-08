import { IPostCollection } from '../../../model/PostCollection.model';
import { PostCategories } from '../../../model/PostCategories.model';
import tattoo_jpg from './tattoo.jpg';
import moment from 'moment';

const tattooRemovalData: IPostCollection = {
  title: 'The Wonders of Tattoo Removal',
  subTitle: 'How can \'permanent\' ink be unwritten?',
  sidebarHeader: 'Some dates to prick your interest',
  sidebarSubHeader: 'And leave a mark...',
  author: 'Christopher Philp',
  category: PostCategories.Science,
  keywords: ['tattoo', 'removal', 'surgery'],
  link: '/tattoo-removal',
  date: moment(new Date('2020-06-07T00:00:00+0000')).toDate(),
  widgetImage: tattoo_jpg,
  widgetImageAlt: 'Tattoo Removal',
  contentKey: 'tattooRemoval',
  dateCollection: [
    {
      date: moment(new Date(3235, 4)).toDate(),
      text: 'The oldest discovery of tattooed human skin to date is found on the body of Ötzi the Iceman.',
      timePeriod: 'BC',
    },
  ],
};

export default tattooRemovalData;
