import { Button } from '@chakra-ui/react';
import React, { ReactElement, ReactNode } from 'react';
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
  height?: string;
  onClick?: () => void;
}

function UIButton({
  children, variant, colorScheme, buttonSize,
  leftIcon, rightIcon, fontSize, height, onClick,
}: Props) {
  return (
    <Button
      {...{
        variant,
        colorScheme,
        buttonSize,
        leftIcon,
        rightIcon,
        onClick,
        height,
      }}
    >
      <ButtonFontWrapper fontSize={fontSize}>
        {children}
      </ButtonFontWrapper>
    </Button>
  );
}

export default UIButton;
