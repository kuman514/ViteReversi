import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  children: ReactNode;
}

const ModalWrapper: FC<Props> = ({
  children,
}) => (
  <Root>
    { children }
  </Root>
);

export default ModalWrapper;
