import {  useState} from "react";
import {  toast } from 'react-toastify';
import {env} from "../env/env"
import 'react-toastify/dist/ReactToastify.css';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import axios1 from "axios";

import axios  from "../libs/http";

import { validateJson } from "../utils/utils";



import {DropdownContainer,StyledButton,RequestHeader,PayloadContainerRequest,RequestContainer,NewRequestContainer} from "../styled/section"


function NewRequset(){

    const [selectedOption, setSelectedOption] = useState(); //transaction id select display
    const [status, setStatus] = useState("Pending");
    const [statusCode,setStatusCode]=useState()
    const [activeButton, setActiveButton] = useState("Summary");
    const [showResponse,setshowResponse] =useState(null)
    const [selectedOptionCall, setSelectedOptionCall] = useState("Select Endpoint");
  
    const [editorData,seteditorData] = useState({Summary:"{}",Header:'  {}'}) //Display data index


const [transaction_id_data, settransaction_id_data] = useState([]) //transactionId data

async function getTransactionIdData (transaction_id){
  const data = await axios.get("/cache?transactionid="+transaction_id)
  settransaction_id_data(data.data)
}
const handleButtonClick = (buttonName) => {
setActiveButton(buttonName);
};



const handleSend = async () => {
try {
if(selectedOptionCall==="Select Endpoint"){
  toast.error("Please select api")
  return
}
if(!validateJson(editorData.Summary || !validateJson(editorData.Header))){
  toast.error("Json not valid")
  return
}

const header = { headers: JSON.parse(editorData.Header) };
header.headers = { ...header.headers, 'Content-Type': 'application/json' };

const response = await axios1.post(`${env.sandBox}${selectedOptionCall}`, editorData.Summary, header);
setStatusCode(response.status);
if (response.status === 200) {
  toast.success('Request sent successfully');

  setStatus('Success');
  setshowResponse(response.data);

  } else {
  setStatus('Error');
}
} catch (error) {
if (error.response && error.response.status != 200) {
  toast.error(JSON.stringify(error.response.data))
  setStatus('Error');
  setStatusCode(error.response.status);

  // Handle a 400 Bad Request error here (if needed)
  // You can choose to display a toast message or take other actions
} else {
  toast.error('An error occurred.');
}
}
};

const generateHeader = async()=>{
  const response =  await axios.post(env.sandBox+'/createHeader',editorData.Summary)
  if(response){
  editorData.Header=JSON.stringify({Authorization:response.headers.authorization})
  seteditorData(editorData)
    toast.success("Header generated")
  }
 }

  const handleEditor = (e)=>{
    // if (e.key === "Enter") {
    //   e.preventDefault(); // Prevent the default behavior (div creation)
    //   document.execCommand("insertText", false, "\n"); // Insert a new line character
    // } else{
      editorData[`${activeButton}`]=e.currentTarget.innerText
    seteditorData(editorData)
    // }

  }

  const items = [
    {
      label: '/search',
      key: '/search',
    },
    {
      label: '/select',
      key: '/select',
    },
    {
      label: '/init',
      key: '/init',
    },
    {
      label: '/confirm',
      key: '/confirm',
    },
    {
      label: '/support',
      key: '/support',
    },
    {
      label: '/status',
      key: '/status',
    },
    {
      label: '/update',
      key: '/update',
    },
  ];
  
  const handleOption = (item) => {
    console.log(item.key)
    setSelectedOptionCall(item.key); // Update selectedOptionCall with the label of the selected item
  };

    return (<>
    <NewRequestContainer >
      
  <RequestContainer>
  <DropdownContainer>
            <Dropdown 
              menu={{
                items,
                onClick: (item) => handleOption(item),
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space style={{display:"flex",width:"150px",justifyContent:"space-around"}}>
                  {selectedOptionCall}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </DropdownContainer>

 
        <button style={{borderRadius:"10px",marginBottom:"0"}} onClick={generateHeader}>Generate Header</button>
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
  {   activeButton === 'Response' ? JSON.stringify(showResponse, null, 2) : activeButton === 'Summary' ? editorData.Summary : editorData.Header}
</pre>

</div>

    <button style={{position:"absolute",width:"130px",textAlign:"center",borderRadius:"3px",top:"520px",marginTop:"10px",right:"70px",backgroundColor:"#fff",border:"1px solid #ccc",marginRight:"25px"}}  onClick={
  handleSend
  // Replace 'anotherFunction' with the second function you want to call.
} >Send</button>
    
  </PayloadContainerRequest>

    </NewRequestContainer>
    </>)
  }

  export default NewRequset