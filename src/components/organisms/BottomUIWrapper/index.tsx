import React, { FC } from 'react';
import styled from 'styled-components';
import UIButtonWrapper from '^/components/molecules/UIButtonWrapper';
import PieceCountWrapper from '^/components/molecules/PieceCountWrapper';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  margin-top: 1vmin;
`;

const BottomUIWrapper: FC = () => (
  <Root>
    <PieceCountWrapper isForGame />
    <UIButtonWrapper />
  </Root>
);

export default BottomUIWrapper;
