import { IPostCollection } from '../../../model/PostCollection.model';
import { PostCategories } from '../../../model/PostCategories.model';
import helicopter_jpg from './helicopter.jpg';
import moment from 'moment';

const helicopterFlightData: IPostCollection = {
  title: 'Flight of the Concords',
  subTitle: 'Learn the minutiae of rotary travel',
  sidebarHeader: 'Learn to Fly',
  sidebarSubHeader: 'With these aerial facts...',
  author: 'Christopher Philp',
  category: PostCategories.Science,
  keywords: ['helicopter', 'flight', 'aerial'],
  link: '/helicopter-flight',
  date: moment(new Date('2020-06-29T00:00:00+0000')).toDate(),
  widgetImage: helicopter_jpg,
  widgetImageAlt: 'Helicopter Flight',
  contentKey: 'helicopterFlight',
  dateCollection: [
    {
      date: moment(new Date(1483, 4)).toDate(),
      text:
        'Italian inventor Leonardo da Vinci designs a helicopter with corkscrew-shaped propeller blades to pull it up through the air.',
    },
    {
      date: moment(new Date(1931, 11)).toDate(),
      text:
        'After many years of experimenting, Igor Sikorsky designs and patents a practical, working helicopter, finally flying a version of it in 1939.',
    },
  ],
};

export default helicopterFlightData;
