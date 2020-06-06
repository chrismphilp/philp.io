import TattooRemovalData from './tattoo-removal/TattooRemoval.data';
import CloudFormationData from './cloud-formation/CloudFormation.data';
import InfiniteMadnessData from './infinite-madness/InfiniteMadness.data';

export type IPostCollection = {
  title: string;
  subTitle: string;
  sidebarHeader: string;
  sidebarSubHeader: string;
  dateCollection: DateField[];
  author: string;
  category: string;
  link: string;
  date: string;
  widgetImage: string;
  widgetImageAlt: string;
  contentKey: string;
};

export type DateField = {
  date: Date,
  text: string;
  timePeriod?: 'AD' | 'BC';
};

export const PostCollection: IPostCollection[] = [CloudFormationData, InfiniteMadnessData, TattooRemovalData];
