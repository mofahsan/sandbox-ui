import { useEffect, useState, useRef} from "react";

import axios1 from "axios";


import axios  from "../libs/http";
import {
  CopyOutlined 
} from '@ant-design/icons';



import {FilterConatiner,StyledButton,RequestHeader,PayloadContainerRequest,RequestContainer,ActionButton,HeaderContainer,NewRequestDiv,NewRequestbutton,NewRequestContainer,ActionButtonContainer,ActionDropDown,Action,TimeStamp,HeaderOptionButton,Option,StyledOptions,CustomSelect} from "../styled/section"

function NewRequset(){

    const [selectedOption, setSelectedOption] = useState(); //transaction id select display
    const [status, setStatus] = useState("Pending");
    const [statusCode,setStatusCode]=useState()
    const [activeButton, setActiveButton] = useState("Summary");
    const [showResponse,setshowResponse] =useState(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOptionCall, setSelectedOptionCall] = useState("Select Request Endpoint");
   
    const [editorData,seteditorData] = useState({Summary:'  {\n\t\n\t\n\t\n  }',Header:'  {\n\t\n\t\n\t\n  }'}) //Display data index

 const options = ["/search", "/on_search", "/select","/on_select","/init","/on_init","/confirm","/on_confirm","/update","/on_update","/on_update","/status","/on_status"];

const [transaction_id_data, settransaction_id_data] = useState([]) //transactionId data

async function getTransactionIdData (transaction_id){
  const data = await axios.get("/cache?transactionid="+transaction_id)
  settransaction_id_data(data.data)
}
const handleButtonClick = (buttonName) => {
setActiveButton(buttonName);
};
const handleSend=async()=>{
  setStatus("Pending");
  const header = {headers:JSON.parse(editorData.Header)}

  header.headers={...header.headers,'Content-Type': 'application/json'}

const response =  await axios1.post(`http://localhost:4000${selectedOptionCall}`,editorData.Summary,header)
setStatusCode(response.status)
console.log("42",response.status)
if(response.status===200){ //update api calls if request sent successfully
  setStatus("Sucess");
  setshowResponse(response.data)

  if(selectedOption!='FILTER BY TRANSACTION ID'){
    getTransactionIdData(selectedOption)
  }
}
else{
  setStatus("Error");

}

}
  const handleOptionSelect = (option) => {

    setSelectedOptionCall(option);
    setIsDropdownOpen(false);
  };
  const handleEditor = (e)=>{
    editorData[`${activeButton}`]=e.target.textContent
    // JSON.parse(editorData)
    seteditorData(editorData)
   


  }
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    return (<>
    <NewRequestContainer >
   <RequestContainer>
     <div style={{display:"flex",justifyContent:"space-between",margin:"10px"}}>
        <div class="dropdown">
        
        <button class="dropbtn" onClick={toggleDropdown}>  {selectedOptionCall}</button>
        <div class="dropdown-content">
      
          <div> {isDropdownOpen && (
            <ul className="options">
              {options.map((option, index) => (
                <li class="list" key={index} onClick={() => handleOptionSelect(option)}>
                  {option}
                </li>
              ))}
            
            </ul>
          )}</div>
        

        </div>
</div>

        </div>
        <button style={{borderRadius:"10px"}}>Generate Header</button>
   </RequestContainer>
   <PayloadContainerRequest>
    <RequestHeader>
      <div style={{display:"flex",gap:"30px"}}>
      <StyledButton   active={activeButton === 'Summary'}
        onClick={() => handleButtonClick('Summary')}>Request Payload</StyledButton>
      <StyledButton  active={activeButton === 'Header'}
        onClick={() => handleButtonClick('Header')}>Request Header</StyledButton>
      <StyledButton active={activeButton === 'Response'}  onClick={() => handleButtonClick('Response')}>Response</StyledButton>
      </div>
      <div >
        <div>Status:{status}</div>
        <div>Status Code:{statusCode}</div>
      </div>
    </RequestHeader>
         <div>
         <pre id="editablePayloadData" contentEditable={true} onInput={handleEditor} key={activeButton} style={{maxHeight: "390px", overflow: "auto"}}>
  {   activeButton === 'Response' ? JSON.stringify(showResponse, null, 2) : activeButton === 'Summary' ? JSON.stringify(JSON.parse(editorData.Summary), null, 2) : editorData.Header}
</pre>

</div>

     <button style={{position:"absolute",width:"130px",textAlign:"center",borderRadius:"3px",top:"520px",marginTop:"10px",right:"0px",backgroundColor:"#fff",border:"1px solid #ccc",marginRight:"25px"}} onClick={handleSend} >Send</button>
    
   </PayloadContainerRequest>

    </NewRequestContainer>
    </>)
  }

  export default NewRequset