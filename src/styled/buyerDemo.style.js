import styled from "styled-components";

export const Container = styled.div`
  //   display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 15px 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049; /* Change the background color on hover */
  }
`;
