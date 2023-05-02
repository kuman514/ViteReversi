import React from 'react';
import styled from 'styled-components';
import Text from './text';

const Root = styled.h1`
  font-size: 3vmin;
  margin-bottom: 1vmin;
  color: var(--theme-font-color);
`;

function Title() {
  return (
    <Root>
      {Text.title}
    </Root>
  );
}

export default Title;
