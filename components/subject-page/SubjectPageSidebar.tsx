import React, { FunctionComponent } from 'react';
import dateContainer from '../../src/assets/images/date-container.jpg';
import styled from 'styled-components';
import { getMonthFromDateIndex } from '../../src/util/date.util';
import { DateField } from '../../src/model/DateField.model';

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
`;
const SidebarSection = styled.section`
  overflow: inherit;
  font-weight: 300;
  font-family: 'Roboto Condensed', sans-serif;
  margin: 0;
  padding: 0;
  display: block;
  margin-bottom: 0;
`;
const SidebarHeader = styled.header`
  line-height: 1.75em;
  font-size: 11pt;
  margin: 0;
  padding: 0;
  display: block;
`;
const SidebarHeaderTitle = styled.h2`
  line-height: 1.75em;
  font-size: 15pt;
  display: block;
`;
const SidebarHeaderSubTitle = styled.span`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 300;
  line-height: 1.75em;
  display: block;
  margin: 0.5em 0 0 0;
  padding: 0 0 0.5em 0;
  color: #00a6fa;
  font-size: 1.2em;
`;
const SidebarList = styled.ul`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 300;
  line-height: 1.75em;
  font-size: 11pt;
  margin: 0px;
  padding: 0px;
  list-style: none;
`;
const SidebarListItem = styled.li`
  border-bottom: 1px solid aqua;
  line-height: 1.75em;
  font-size: 11pt;
  list-style: none;
  margin: 0px;
  padding: 25px 0px 20px 0px;
  background: none;
`;
const SidebarListItemDate = styled.p`
  list-style: none;
  float: left;
  width: 98px;
  height: 78px;
  margin: 0px 25px 0px 0px;
  padding: 6px 0px 0px 0px;
  background: url(${dateContainer}) no-repeat left top;
  line-height: normal;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  color: #ffffff;
`;
const SidebarListItemDateHeader = styled.a`
  list-style: none;
  line-height: normal;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.85em;
  font-weight: 300;
  margin: 0;
  padding: 0 16.5px 0 0;
  display: block;
  text-decoration: none;
  color: #ffffff;
`;
const SidebarListItemDateContent = styled.a`
  list-style: none;
  line-height: normal;
  text-align: center;
  text-transform: uppercase;
  display: block;
  margin: 25.5px 0px 0px 0px;
  padding: 0 0 0 0;
  font-size: 1.45em;
  font-weight: 300;
  color: #ffffff;
`;
const SidebarListItemTextContainer = styled.p`
  font-weight: 300;
  line-height: 1.75em;
  font-size: 11pt;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 1em;
`;
const SidebarListItemTextContent = styled.a`
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
  sidebarHeader: string;
  sidebarSubHeader: string;
  dateCollection: DateField[];
};

const SubjectPageSidebar: FunctionComponent<SubjectPageSidebarProps> = ({
  sidebarHeader,
  sidebarSubHeader,
  dateCollection,
}) => {
  return (
    <SubjectPageSidebarContainer>
      <SidebarSection>
        <SidebarHeader>
          <SidebarHeaderTitle>{sidebarHeader}</SidebarHeaderTitle>
          <SidebarHeaderSubTitle>{sidebarSubHeader}</SidebarHeaderSubTitle>
        </SidebarHeader>
        <SidebarList>
          {dateCollection.map((dateField: DateField, key: number) => {
            const month: string = getMonthFromDateIndex(dateField.date.getMonth());
            return (
              <SidebarListItem key={key}>
                <SidebarListItemDate>
                  <SidebarListItemDateHeader>
                    {month}
                    <SidebarListItemDateContent>
                      {dateField.date.getFullYear() + (dateField.timePeriod ?? '')}
                    </SidebarListItemDateContent>
                  </SidebarListItemDateHeader>
                </SidebarListItemDate>
                <SidebarListItemTextContainer>
                  <SidebarListItemTextContent>{dateField.text}</SidebarListItemTextContent>
                </SidebarListItemTextContainer>
              </SidebarListItem>
            );
          })}
        </SidebarList>
      </SidebarSection>
    </SubjectPageSidebarContainer>
  );
};

export default SubjectPageSidebar;
