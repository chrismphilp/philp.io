import TattooRemovalPost from './tattoo-removal/tattooRemoval.json';
import CloudFormationPost from './cloud-formation/cloudFormation.json';

export interface IPostCollection {
  title: string;
  subTitle: string;
  author: string;
  category: string;
  link: string;
  date: string;
  widgetImage: string;
  widgetImageAlt: string;
  contentKey: string;
}

export const PostCollection: IPostCollection[] = [
  CloudFormationPost,
  TattooRemovalPost
];