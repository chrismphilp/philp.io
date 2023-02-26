import { FC, useEffect } from 'react';
import SubjectPageBanner from './SubjectPageBanner';
import SubjectPageContent from './SubjectPageContent';
import { IPostCollection } from '../../src/model/PostCollection.model';
import ReactGA from 'react-ga';
import Prism from 'prismjs';

type SubjectPageProps = {
  post: IPostCollection;
  sidebarPresent?: boolean;
};

const SubjectPage: FC<SubjectPageProps> = ({
  post,
  sidebarPresent = true,
  children,
}) => {
  useEffect(() => {
    ReactGA.initialize('UA-44048042-2', { testMode: process.env.NODE_ENV === 'test' });
    ReactGA.pageview(window.location.pathname.slice(0, -1) + post.link);
  }, []);

  useEffect(() => {
    if (children) Prism.highlightAll();
  }, [children]);

  return (
    <div>
      <div>
        <div post={post} />
        <div post={post} sidebarPresent={sidebarPresent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
