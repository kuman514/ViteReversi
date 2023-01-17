import { Stack } from '@chakra-ui/react';
import React, { FC } from 'react';
import styled from 'styled-components';
import UIButton from '^/components/atoms/UIButton';
import useStatus from '^/store';
import { ChakraUIButtonColorScheme, ChakraUIButtonSize, ChakraUIButtonVariant } from '^/types';

const Root = styled.div`
  margin-top: 1vmin;
`;

const UIButtonWrapper: FC<{}> = () => {
  const { undo, reset } = useStatus();
  return (
    <Root>
      <Stack direction="row" spacing={4} align="center">
        <UIButton
          buttonSize={ChakraUIButtonSize.SMALL}
          variant={ChakraUIButtonVariant.OUTLINE}
          colorScheme={ChakraUIButtonColorScheme.RED}
          fontSize="2vmin"
          onClick={undo}
        >
          Undo
        </UIButton>
        <UIButton
          buttonSize={ChakraUIButtonSize.SMALL}
          variant={ChakraUIButtonVariant.OUTLINE}
          colorScheme={ChakraUIButtonColorScheme.RED}
          fontSize="2vmin"
          onClick={reset}
        >
          Reset
        </UIButton>
      </Stack>
    </Root>
  );
};

export default UIButtonWrapper;
