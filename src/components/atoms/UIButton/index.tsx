import { Button } from '@chakra-ui/react';
import React, { FC, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { ChakraUIButtonColorScheme, ChakraUIButtonSize, ChakraUIButtonVariant } from '^/types';

interface ButtonFontWrapperProps {
  fontSize?: string;
}

const ButtonFontWrapper = styled.span<ButtonFontWrapperProps>`
  font-size: ${({ fontSize }) => fontSize};
`;

interface Props {
  children?: ReactNode;
  variant?: ChakraUIButtonVariant;
  colorScheme?: ChakraUIButtonColorScheme;
  buttonSize?: ChakraUIButtonSize;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  fontSize?: string;
}

const UIButton: FC<Props> = ({
  children,
  variant,
  colorScheme,
  buttonSize,
  leftIcon,
  rightIcon,
  fontSize,
}) => (
  <Button
    {...{
      variant,
      colorScheme,
      buttonSize,
      leftIcon,
      rightIcon,
    }}
  >
    <ButtonFontWrapper fontSize={fontSize}>
      {children}
    </ButtonFontWrapper>
  </Button>
);

export default UIButton;
