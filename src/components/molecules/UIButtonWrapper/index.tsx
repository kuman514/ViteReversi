import React, { FC } from 'react';
import styled from 'styled-components';
import UIButton from '^/components/atoms/UIButton';

const Root = styled.div`
  margin-top: 1vmin;
`;

const UIButtonWrapper: FC<{}> = () => (
  <Root>
    {/* Draft layout */}
    <UIButton>UI Button</UIButton>
  </Root>
);

export default UIButtonWrapper;
