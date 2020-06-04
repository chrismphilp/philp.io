import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    display: block;
    background-color: #1e2832;
    color: rgba(255, 255, 255, 0.75);
    text-align: center;
  `,
  FooterContainerInner = styled.footer`
    color: rgba(255, 255, 255, 0.75);
    text-align: center;
    box-sizing: border-box;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    padding: 6em 0 4em 0;
    border-top: solid 1px rgba(255, 255, 255, 0.1);
    margin: 0 auto;
    width: 75%;
  `,
  FooterCopyrightList = styled.ul`
    text-align: center;
    box-sizing: border-box;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    list-style: disc;
    color: #a5a9ad;
    font-size: 0.9em;
    margin: 0 0 2em 0;
    padding: 0;
    text-transform: uppercase;
  `,
  FooterCopyrightListItem = styled.li`
    color: #a5a9ad;
    text-transform: uppercase;
    box-sizing: border-box;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    padding-left: 0.5em;
    display: inline-block;
    list-style: none;
    margin: 0 0.1em;
  `,
  Footer: FunctionComponent = () => {
    return (
      <FooterContainer>
        <FooterContainerInner>
          <FooterCopyrightList>
            <FooterCopyrightListItem>© Christopher Philp.</FooterCopyrightListItem>
          </FooterCopyrightList>
        </FooterContainerInner>
      </FooterContainer>
    );
  };

export default Footer;
