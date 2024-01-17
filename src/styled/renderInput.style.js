import styled from "styled-components";

export const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > input,
  & > textarea,
  & > select {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px 20px;
  }

  & > p {
    color: red;
  }
`;
