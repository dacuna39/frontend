/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Header from 'components/Header';
import H1 from 'components/H1';
import messages from './messages';

const BodyWrapper = styled.div`
  max-width: calc(1000px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function NotFound() {
  return (
    <article>
      <Header />
      
      <BodyWrapper>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <p> <a href="/"> Click here </a> to return Home </p>
      </BodyWrapper>
    </article>
  );
}
