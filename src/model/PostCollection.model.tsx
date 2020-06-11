import { DateField } from './DateField.model';

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
  widgetImage: string;
  widgetImageAlt: string;
  contentKey: string;
};
