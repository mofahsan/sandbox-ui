import styled from "styled-components";


export const FilterConatiner=styled.h1`
box-shadow: 0px -25px 20px -20px rgba(0, 0, 0, 0.45);
display:flex;
justify-content:space-around;
font-size: 15px;
text-align: center;
border: 1px solid #ccc;
padding:4px;
border-radius:5px;
box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
::placeholder {
    color:black; /* Change the color to your desired placeholder color */
  }

`



export const CustomSelect = styled.div`
/* box-shadow: 0px -25px 20px -20px rgba(0, 0, 0, 0.45); */

/* border:2px solid red; */
  position: relative;
  border-radius:3px;  
  &:hover {
    background-color: #f0f0f0; /* Change the background color on hover */
  }
`;

export const StyledOptions = styled.div`

  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  z-index: 1;
`;

export const Option = styled.div`
  padding: 20px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
export const HeaderContainer=styled.div`
display:flex;
margin-left:30px;
gap:10px;

/* justify-content:space-evenly; */

`
export const HeaderOptionButton = styled.button`


width:80px;
text-align:center;
  border-radius:4px;
  color: ${(props) => (props.active ? '#007BFF' : '')};
`;
  
export const ActinTime=styled.div`
display:flex;

`
export const ActionButton=styled.button`
display:flex;
justify-content:space-between;
box-shadow: ${(props) => (props.active ? 'rgba(0, 0, 0, 0.24) 0px 3px 8px;' : "none")};
background-color:${(props)=>(props.active?'#808080b5':"none")};

`


export const Action=styled.div`
`

export const TimeStamp=styled.div`
`

export const ActionDropDown = styled.div`
   display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
 box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;   
`;

export const ActionButtonContainer=styled.div`
position:relative;
display:flex;
justify-content:space-around;
z-index:1;
`

export const DropDownOption=styled.div`
`


export const NewRequestDiv=styled.div`
display:flex;
justify-content:space-around;
align-items:center;
height:35px;
border:1px solid red;
max-width:100%;
border-radius:5px;
border:1px solid #ccc;
padding:7px;
`
export const NewRequestbutton=styled.button`
z-index:+4;
text-align:center;  
margin-top:9px;
width:200px;
border-radius:8px;
color: ${props => props.active ? 'green' : 'black'};

`


export const TransactionIdContainer=styled.div`
`



export const NewRequestContainer=styled.div`
position:relative;
display:flex;
justify-content:center;
// position:absolute;
// top:0px;
width:100%;
background-color:#fff;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
z-index:+1;
height:600px;
// overflow:auto;
// padding:20px;
margin-top: 15px;
`

export const RequestContainer=styled.div`
display:flex;
align-items:center;

gap:50px;
position:absolute;
width:94%;
border:2px solid #ccc;  
// top:100px;
margin:15px;
`

export const PayloadContainerRequest=styled.div`
// display:flex;
justify-content:center;
top:100px;
position:absolute;
width:1000px;
box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
flex-wrap:wrap;
align-items:center; 
`



export const RequestHeader=styled.div`
display:flex;

align-items:center;
justify-content:space-around;
// position:absolute;
height:80px;
max-width:94%;
box-shadow: rgba(50, 50, 93, 0.25) 0px 5px 30px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
border-radius:2px;
margin-left:28px;

`

export const StyledButton = styled.button`
  margin-top: 10px;
  border-radius: 8px;
  color: ${props => (props.active ? 'green' : 'black')};
  /* Add other button styles here */
`;

export const DropdownContainer=styled.div`
display:flex;
justify-content:center;
background-color:#cccccc59;
margin:10px;
padding:10px;
width:140px;  
border-radius:10px;

`

