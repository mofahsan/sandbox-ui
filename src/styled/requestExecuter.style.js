import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
`;

export const HeadingWrapper = styled.h5`
  color: #333;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SendButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: end;

  &:hover {
    background-color: #45a049; /* Change the background color on hover */
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

export const ResponseField = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 10px 15px;
  background-color: gainsboro;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  & > p {
    margin: 0px;
  }
`;

export const TitleHeading = styled.div`
  display: flex;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    height: 0;
  }
  to {
    opacity: 1;
    height: auto;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    height: auto;
  }
  to {
    opacity: 0;
    height: 0;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & > img {
    transform: rotate(${({ rotation }) => rotation}deg);
  }
`;

export const CardBody = styled.div`
  animation: ${({ isCollapsed }) => (isCollapsed ? fadeOut : fadeIn)} 0.2s
    ease-in-out;
  opacity: ${({ isCollapsed }) => (isCollapsed ? 0 : 1)};
  height: ${({ isCollapsed }) => (isCollapsed ? 0 : "auto")};
  overflow: hidden;
  width: 100%;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
