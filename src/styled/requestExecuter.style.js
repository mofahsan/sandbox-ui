import styled, { keyframes, css } from "styled-components";

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

export const CallContainer = styled.div`
  width: 100%;
  padding: 10px;
  // border: 1px solid #ccc;
  // border-radius: 5px;
  min-height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const HeadingWrapper = styled.h5`
  color: #333;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  margin-left: 5px;
`;

export const SendButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049; /* Change the background color on hover */
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      &:hover {
        background-color: initial; /* Maintain the original background color */
      }
    `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

export const ResponseField = styled.div`
  padding: 10px 15px;
  background-color: gainsboro;
  word-wrap: break-word;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  gap: 10px;
  flex-direction: column;

  & > p {
    margin: 0px;
  }
`;

export const TitleHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > h2 {
    padding: 0px;
    margin: 0px;
  }
`;

export const SecondaryTitleHeading = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  gap: 15px;
  background: linear-gradient(135deg, #eaeaea, #f0f0f0, #f9f9f9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  & > h2 {
    padding: 0px;
    margin: 0px;
  }
`;

export const TitleInfo = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  padding: 15px;
  flex-direction: column;
  gap: 15px;
  background: linear-gradient(135deg, #eaeaea, #f0f0f0, #f9f9f9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  & > div {
    display: flex;
    gap: 15px;
    align-items: center;

    & > small {
      color: grey;
    }

    & > p {
      font-weight: bold;
      margin: 0;
      padding: 0;
    }
  }
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
  padding: 0.3rem 0.5rem;
  border-bottom: 1px solid #ccc;
  background: linear-gradient(
    90deg,
    #eaeaea,
    #f9f9f9
  ); /* Gradient background */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px 8px 8px 8px;
  cursor: pointer; /* Change cursor to pointer */
  transition: background 0.3s, border 0.3s, box-shadow 0.3s;

  &:hover {
    background: linear-gradient(
      90deg,
      #f9f9f9,
      #eaeaea
    ); /* Slight change in gradient on hover */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15); /* Enhance shadow on hover */
  }
`;

export const CardBody = styled.div`
  opacity: ${({ isCollapsed }) => (isCollapsed ? 0 : 1)};
  height: ${({ isCollapsed }) => (isCollapsed ? 0 : "auto")};
  overflow: ${({ isCollapsed }) => (isCollapsed ? "hidden" : "visible")};
  width: 100%;
  transition: opacity 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55),
    transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: top;
  transform: translateY(${({ isCollapsed }) => (isCollapsed ? "-25px" : "0")});
  padding: ${({ isCollapsed }) => (isCollapsed ? "0" : "10px")};
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 0 0 4px 4px;
  border-top: none;
  margin-top: 0;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`;

export const OnPayloadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;

  & > img {
    transform: rotate(${({ rotation }) => rotation}deg);
  }
`;

export const ResetContainer = styled.div`
  display: flex;
  padding: 5px;
  gap: 5px;
  background-color: #efefef;
  border-radius: 5px;
  cursor: pointer;
`;
export const InLineContainer = styled.div`
  display: flex;
  padding: 5px;
  gap: 5px;
`;

export const WaitingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #f9f9f9; /* Add a light background color */
`;

export const Message = styled.span`
  margin-right: 0.5rem;
  font-size: 1rem;
  color: #333; /* Darken the text color for better readability */
  font-weight: bold; /* Make the text bold for emphasis */
`;

// export const StyledCircularProgress = styled(CircularProgress)`
//   && {
//     color: #007bff; // Change the color to your preference
//   }
// `;
export const Arrow = styled.div`
  text-align: center;
  font-size: 40px;
  color: #676767;
`;

export const PairHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #ebf8ff;
  padding: 0.5rem 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px 5px 0px 0px;
  border-top: 1px solid #676767;
  border-left: 1px solid #676767;
  border-right: 1px solid #676767;
`;
