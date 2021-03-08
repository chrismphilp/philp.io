import { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const ScrollToTop: FunctionComponent<RouteComponentProps> = ({ location: { pathname } }) => {

  useEffect(() => {
    document?.getElementById('root')?.scroll(0, 0);
  }, [pathname]);

  return null;
};

export default withRouter(ScrollToTop);