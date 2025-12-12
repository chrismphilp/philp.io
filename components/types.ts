export type ArticleData = {
  title: string;
  description: string;
  date: string;
  category: ArticleType;
  wordCount: number;
  readingTime: string;
  draft: boolean;
};

export enum ArticleType {
  TECHNOLOGY = 'Technology',
  SCIENCE = 'Science',
  ETHICS = 'Ethics',
  LANGUAGE = 'Language',
  CHARITY = 'Charity',
  COMEDY = 'Comedy',
  GAMING = 'Gaming',
  FILM = 'Film',
  FAMILY = 'Family',
  POETRY = 'Poetry',
  MISC = 'Misc',
}
