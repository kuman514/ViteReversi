import React, { FC } from 'react';
import styled from 'styled-components';
import UIButton from '^/components/atoms/UIButton';
import { ChakraUIButtonColorScheme, ChakraUIButtonSize, ChakraUIButtonVariant } from '^/types';

const Root = styled.div`
  margin-top: 1vmin;
`;

const UIButtonWrapper: FC<{}> = () => (
  <Root>
    {/* Draft layout */}
    <UIButton
      buttonSize={ChakraUIButtonSize.SMALL}
      variant={ChakraUIButtonVariant.OUTLINE}
      colorScheme={ChakraUIButtonColorScheme.TWITTER}
      fontSize="2vmin"
    >
      UI Button
    </UIButton>
  </Root>
);

export default UIButtonWrapper;
