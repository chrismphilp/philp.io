import React, { FunctionComponent } from 'react';
import { IPostCollection } from '../../assets/posts/PostCollection';
import dateContainer from '../../assets/images/date-container.jpg';
import styled from 'styled-components';

const SubjectPageSidebarContainer = styled.div`
    overflow: inherit;
    font-weight: 300;
    line-height: 1.75em;
    font-size: 11pt;
    margin: 0;
    padding: 0;
    width: 33.3333333333%;
    float: left;
    box-sizing: border-box;
    padding-left: 50px;
  `,
  SidebarSection = styled.section`
    overflow: inherit;
    font-weight: 300;
    font-family: 'Roboto Condensed', sans-serif;
    margin: 0;
    padding: 0;
    display: block;
    margin-bottom: 0;
  `,
  SidebarHeader = styled.header`
    line-height: 1.75em;
    font-size: 11pt;
    margin: 0;
    padding: 0;
    display: block;
    margin-bottom: 2em;
  `,
  SidebarHeaderTitle = styled.h2`
    line-height: 1.75em;
    font-size: 15pt;
    display: block;
  `,
  SidebarHeaderSubTitle = styled.span`
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 300;
    line-height: 1.75em;
    display: block;
    margin: 0.5em 0 0 0;
    padding: 0 0 0.5em 0;
    color: #00a6fa;
    font-size: 1.2em;
  `,
  SidebarList = styled.ul`
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 300;
    line-height: 1.75em;
    font-size: 11pt;
    margin: 0px;
    padding: 0px;
    list-style: none;
  `,
  SidebarListItem = styled.li`
    line-height: 1.75em;
    font-size: 11pt;
    list-style: none;
    margin: 0px;
    padding: 30px 0px 20px 0px;
    padding-top: 0px;
    background: none;
  `,
  SidebarListItemDate = styled.p`
    list-style: none;
    float: left;
    width: 78px;
    height: 78px;
    margin: 0px 25px 0px 0px;
    padding: 6px 0px 0px 0px;
    background: url(${dateContainer}) no-repeat left top;
    line-height: normal;
    letter-spacing: 1px;
    text-align: center;
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: 300;
    color: #ffffff;
  `,
  SidebarListItemDateHeader = styled.a`
    list-style: none;
    line-height: normal;
    letter-spacing: 1px;
    text-align: center;
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: 300;
    margin: 0;
    padding: 0;
    display: block;
    text-decoration: none;
    color: #ffffff;
  `,
  SidebarListItemDateContent = styled.a`
    list-style: none;
    line-height: normal;
    text-align: center;
    text-transform: uppercase;
    display: block;
    margin: 13.5px 0px 0px 0px;
    padding: 0;
    letter-spacing: -1px;
    font-size: 3em;
    font-weight: 300;
    color: #ffffff;
  `,
  SidebarListItemTextContainer = styled.p`
    font-weight: 300;
    line-height: 1.75em;
    font-size: 11pt;
    list-style: none;
    margin: 0;
    padding: 0;
    margin-bottom: 1em;
  `,
  SidebarListItemTextContent = styled.a`
    font-weight: 300;
    line-height: 1.75em;
    font-size: 11pt;
    list-style: none;
    margin: 0;
    padding: 0;
    color: #333;
    display: block;
    text-decoration: none;
  `;

type SubjectPageSidebarProps = {
  post: IPostCollection;
};

const SubjectPageSidebar: FunctionComponent<SubjectPageSidebarProps> = ({ post }) => {
  return (
    <SubjectPageSidebarContainer>
      <SidebarSection>
        <SidebarHeader>
          <SidebarHeaderTitle>Some Interesting Dates</SidebarHeaderTitle>
          <SidebarHeaderSubTitle>Maybe keep them in mind</SidebarHeaderSubTitle>
        </SidebarHeader>
        <SidebarList>
          <SidebarListItem>
            <SidebarListItemDate>
              <SidebarListItemDateHeader>
                September
                <SidebarListItemDateContent>15</SidebarListItemDateContent>
              </SidebarListItemDateHeader>
            </SidebarListItemDate>
            <SidebarListItemTextContainer>
              <SidebarListItemTextContent>
                Donec leo, vivamus fermentum nibh in augue praesent a lacus at urna congue rutrum. Maecenas luctus
                lectus.
              </SidebarListItemTextContent>
            </SidebarListItemTextContainer>
          </SidebarListItem>
        </SidebarList>
      </SidebarSection>
    </SubjectPageSidebarContainer>
  );
};

export default SubjectPageSidebar;
