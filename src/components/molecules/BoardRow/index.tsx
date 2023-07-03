import React, { ReactNode } from 'react';
import styled from 'styled-components';
import BoardButton from '^/components/atoms/BoardButton';
import { BORDER_MAX, BORDER_MIN } from '^/constants';

interface Props {
  row: number;
}

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

function BoardRow({ row }: Props) {
  const buttonsOnRow: ReactNode[] = [];
  for (let col = BORDER_MIN; col <= BORDER_MAX; col++) {
    buttonsOnRow.push(
      <BoardButton
        key={`button-${row}${col}`}
        row={row}
        col={col}
      />,
    );
  }

  return (
    <Root>
      {buttonsOnRow}
    </Root>
  );
}

export default BoardRow;
