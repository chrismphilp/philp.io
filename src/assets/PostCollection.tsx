import TattooRemovalPost from './tattoo-removal/tattooRemoval.json';

export interface IPostCollection {
  title: string;
  subTitle: string;
  author: string;
  type: string;
  date: string;
  widgetImage: string;
  widgetImageAlt: string;
  content: string;
}

export const PostCollection: [IPostCollection] = [
  TattooRemovalPost
];