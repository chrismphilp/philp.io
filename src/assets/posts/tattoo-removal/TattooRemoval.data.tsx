import { IPostCollection } from '../../../model/PostCollection.model';
import { PostCategories } from '../../../model/PostCategories';
import moment from 'moment';

const tattooRemovalData: IPostCollection = {
  title: 'The Wonders of Tattoo Removal',
  subTitle: "How can 'permanent' ink be unwritten?",
  sidebarHeader: 'Some dates to prick your interest',
  sidebarSubHeader: 'And leave a mark...',
  author: 'Christopher Philp',
  category: PostCategories.Science,
  link: '/tattoo-removal',
  date: moment(new Date('2020-06-07T00:00:00+0000')).toDate(),
  widgetImage:
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cosmetician-performing-a-laser-depilation-on-a-royalty-free-image-1582657775.jpg?crop=1.00xw:0.751xh;0,0.173xh&resize=980:*',
  widgetImageAlt: 'React Logo',
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
