import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
  }
`;

const Root = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// Model ==========================================================================================

const ModelRoot = styled.div`
  width: 100vmin;
  height: 100vmin;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModelTitle = styled.h1`
  font-size: 3vmin;
  margin-bottom: 1vmin;
`;

const modelIndex = [0, 1, 2, 3, 4, 5, 6, 7];

const ModelBoard = styled.div`
  border-top: 1px solid black;
  border-left: 1px solid black;

  width: 75%;
  height: 75%;

  display: grid;
  grid-template-rows: repeat(8, 1fr);
`;

const ModelBoardRow = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

const ModelBoardButton = styled.button`
  all: unset;

  border-bottom: 1px solid black;
  border-right: 1px solid black;

  cursor: pointer;

  &:hover {
    background-color: black;
  }
`;

const ModelUIButtonWrapper = styled.div`
  margin-top: 1vmin;
`;

const ModelUIButton = styled.button`
  all: unset;

  border: 1px solid black;
  font-size: 2vmin;
  padding: 1vmin;

  cursor: pointer;

  &:hover {
    background-color: black;
  }
`;

// End Of Model ===================================================================================

const Main: FC<{}> = () => {
  const boardRow = modelIndex.map((rowNum) => (
    <ModelBoardRow key={`row${rowNum}`}>
      {
        modelIndex.map((colNum) => (
          <ModelBoardButton key={`button-${rowNum}${colNum}`} />
        ))
      }
    </ModelBoardRow>
  ));
  return (
    <>
      <GlobalStyle />
      <Root>
        <ModelRoot>
          <ModelTitle>Vite Reversi</ModelTitle>
          <ModelBoard>
            {boardRow}
          </ModelBoard>
          <ModelUIButtonWrapper>
            <ModelUIButton>UI Button</ModelUIButton>
          </ModelUIButtonWrapper>
        </ModelRoot>
      </Root>
    </>
  );
};

export default Main;
