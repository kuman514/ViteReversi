import React, { FC, ReactNode } from 'react';
import UIButton from '^/components/atoms/UIButton';
import {
  ChakraUIButtonColorScheme,
  ChakraUIButtonSize,
  ChakraUIButtonVariant,
} from '^/types';

const commonBottomUIButtonStyleProps = {
  buttonSize: ChakraUIButtonSize.SMALL,
  variant: ChakraUIButtonVariant.OUTLINE,
  colorScheme: ChakraUIButtonColorScheme.RED,
  fontSize: '2vmin',
  height: '4.5vmin',
};

interface Props {
  onClick?: () => void;
  children?: ReactNode;
}

const BottomUIButton: FC<Props> = ({ onClick, children }) => (
  <UIButton
    {...commonBottomUIButtonStyleProps}
    onClick={onClick}
  >
    {children}
  </UIButton>
);

export default BottomUIButton;
