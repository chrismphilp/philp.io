import React, { FunctionComponent } from 'react';
import { History } from 'history';
import styled from 'styled-components';

const TextLink = styled.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

type SubjectPageTextLinkProps = {
  linkText: string;
  link: string;
  history: History;
};

const SubjectPageTextLink: FunctionComponent<SubjectPageTextLinkProps> = ({ linkText, link, history }) => (
  <TextLink onClick={() => history.push(link)}>{linkText}</TextLink>
);

export default SubjectPageTextLink;
