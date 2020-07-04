import { IPostCollection } from '../../../model/PostCollection.model';
import { PostCategories } from '../../../model/PostCategories.model';
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
  widgetImage: 'https://airbus-h.assetsadobe2.com/is/image/content/dam/products-and-solutions/commercial-helicopters/h145/H145-landingPage.jpg?wid=1920&fit=fit,1&qlt=85,0',
  widgetImageAlt: 'Helicopter Flight',
  contentKey: 'helicopterFlight',
  dateCollection: [
    {
      date: moment(new Date(1483, 4)).toDate(),
      text: 'Italian inventor Leonardo da Vinci designs a helicopter with corkscrew-shaped propeller blades to pull it up through the air.',
    },
    {
      date: moment(new Date(1931, 11)).toDate(),
      text: 'After many years of experimenting, Igor Sikorsky designs and patents a practical, working helicopter, finally flying a version of it in 1939.',
    },
  ],
};

export default helicopterFlightData;
