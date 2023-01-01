import styled from 'styled-components';

const UIButton = styled.button`
  all: unset;

  border: 1px solid black;
  font-size: 2vmin;
  padding: 1vmin;

  cursor: pointer;

  &:hover {
    background-color: black;
  }
`;

export default UIButton;
