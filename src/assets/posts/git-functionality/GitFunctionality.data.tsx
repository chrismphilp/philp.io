import { IPostCollection } from '../../../model/PostCollection.model';
import { PostCategories } from '../../../model/PostCategories.model';
import github_jpg from './git.jpg';
import moment from 'moment';

const GitFunctionalityData: IPostCollection = {
  title: 'Git Functionality',
  subTitle: 'Let\'s rebase your thinking',
  sidebarHeader: '',
  sidebarSubHeader: '',
  author: 'Christopher Philp',
  category: PostCategories.Software_Development,
  keywords: ['git', 'rebase', 'version', 'control'],
  link: '/git',
  date: moment(new Date('2020-12-16T00:00:00+0000')).toDate(),
  widgetImage: github_jpg,
  widgetImageAlt: 'GitHub Logo',
  contentKey: 'git',
  dateCollection: [],
};

export default GitFunctionalityData;
