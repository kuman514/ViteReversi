import React, { FC } from 'react';
import styled from 'styled-components';
import Text from './text';

const Root = styled.h1`
  font-size: 3vmin;
  margin-bottom: 1vmin;
`;

const Title: FC<{}> = () => (
  <Root>
    {Text.title}
  </Root>
);

export default Title;
