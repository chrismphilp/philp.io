import TattooRemovalData from './tattoo-removal/TattooRemoval.data';
import CloudFormationData from './cloud-formation/CloudFormation.data';
import InfiniteMadnessData from './infinite-madness/InfiniteMadness.data';

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

export const PostCollection: IPostCollection[] = [CloudFormationData, InfiniteMadnessData, TattooRemovalData];
