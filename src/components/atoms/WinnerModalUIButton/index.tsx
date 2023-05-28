import React, { ReactNode } from 'react';
import UIButton from '^/components/atoms/UIButton';
import {
  ChakraUIButtonColorScheme,
  ChakraUIButtonSize,
  ChakraUIButtonVariant,
} from '^/types';

const commonWinnerModalUIButtonStyleProps = {
  buttonSize: ChakraUIButtonSize.SMALL,
  variant: ChakraUIButtonVariant.SOLID,
  fontSize: '2vmin',
  height: '4.5vmin',
};

interface Props {
  onClick?: () => void;
  children?: ReactNode;
  colorScheme: ChakraUIButtonColorScheme;
}

function WinnerModalUIButton({ onClick, children, colorScheme }: Props) {
  return (
    <UIButton
      {...commonWinnerModalUIButtonStyleProps}
      colorScheme={colorScheme}
      onClick={onClick}
    >
      {children}
    </UIButton>
  );
}

export default WinnerModalUIButton;
