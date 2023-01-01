import React, { FC } from 'react';
import styled from 'styled-components';
import { BORDER_MAX, BORDER_MIN } from '^/constants';

interface Props {
  row: number;
  col: number;
}

const Root = styled.button`
  all: unset;

  border-bottom: 1px solid black;
  border-right: 1px solid black;

  text-align: center;

  cursor: pointer;

  &:hover {
    background-color: black;
  }
`;

const BoardButton: FC<Props> = ({ row, col }) => {
  if (row < BORDER_MIN || row > BORDER_MAX || col < BORDER_MIN || col > BORDER_MAX) {
    throw Error('Out of border range');
  }

  return (
    <Root>
      {/* Draft layout */}
      {row}{col}
    </Root>
  );
};

export default BoardButton;
