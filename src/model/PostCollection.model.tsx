import { DateField } from './DateField.model';
import { StaticImageData } from 'next/image';

export type IPostCollection = {
  title: string;
  subTitle: string;
  sidebarHeader: string;
  sidebarSubHeader: string;
  dateCollection: DateField[];
  author: string;
  category: string;
  keywords: string[];
  link: string;
  date: Date;
  widgetImage: string | StaticImageData;
  widgetImageAlt: string;
  contentKey: string;
};
