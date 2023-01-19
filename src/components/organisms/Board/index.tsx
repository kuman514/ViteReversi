import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import BoardRow from '^/components/molecules/BoardRow';
import { BORDER_MAX, BORDER_MIN } from '^/constants';

const Root = styled.div`
  border-top: 1px solid var(--theme-font-color);
  border-left: 1px solid var(--theme-font-color);

  width: 75%;
  height: 75%;

  display: grid;
  grid-template-rows: repeat(8, 1fr);
`;

const Board: FC<{}> = () => {
  const rows: ReactNode[] = [];
  for (let row = BORDER_MIN; row <= BORDER_MAX; row++) {
    rows.push(
      <BoardRow
        key={`row${row}`}
        row={row}
      />,
    );
  }

  return (
    <Root>
      {rows}
    </Root>
  );
};

export default Board;
