import styled from 'styled-components';

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const FilterLabel = styled.label`
  font-size: 25px;
  margin-bottom: 10px;
`;

export const FilterInput = styled.input`
  padding: 10px;
  outline: none;
  width: 100%;
  height: 20px;
  border: 1px solid #5ac5e8;
  font-size: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: border 300ms linear;

  &:is(:focus, :hover) {
    border: 2px solid #358ff0;
  }
`;
