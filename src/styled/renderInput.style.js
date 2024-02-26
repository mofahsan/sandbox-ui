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

  & > label::after {
    content: "*";
    color: red;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;

  & > label::after {
    content: "*";
    color: red;
  }
`;

export const InfoIconWrapper = styled.div`
  opacity: 0.8;
  height: 20px;
  width: 20px;
`;
