import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface Props {
  children: ReactNode;
}

function ModalWrapper({ children }: Props) {
  return (
    <Root>
      { children }
    </Root>
  );
}

export default ModalWrapper;
