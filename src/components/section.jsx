  import { useState, useRef} from "react";



  import axios  from "../libs/http";
 
  import Payload from "./showPayload";
  import NewRequset from "./newRequest";
  import PayloadMapper  from "./payloadMapper";


  import {NewRequestDiv,NewRequestbutton} from "../styled/section"




  function Section(){
    const [newRequestContainer,setRequestContainer]=useState('RequestTracer')
    const [transaction_id, settransaction_id] = useState([])  //transactionId_list

    const [transaction_id_data, settransaction_id_data] = useState([]) //transactionId data
    let transactionid_variable = useRef();

    async function getTransactionIdData (transaction_id){
      transactionid_variable.current = transaction_id
      const data = await axios.get("/cache?transactionid="+transaction_id)
      settransaction_id_data(data.data)
  }

    const CallNewReqest=(containerName)=>{ // RequestTracer || NewRequest
      setRequestContainer(containerName)
    }
    async function getTransactionId (){
      const data = await axios.get("/cache")
      settransaction_id(data.data)
  }


  
  
    return(
      <div className="container">
        <NewRequestDiv>
            <NewRequestbutton   active={newRequestContainer === 'RequestTracer'}
            onClick={()=>{CallNewReqest('RequestTracer')
            getTransactionIdData(transactionid_variable.current)}}>Request Tracer</NewRequestbutton>
            <NewRequestbutton onClick={()=>{CallNewReqest('NewRequest')}}  active={newRequestContainer === 'NewRequest'}>New Request</NewRequestbutton>
            <NewRequestbutton onClick={()=>{CallNewReqest('PayloadMapper')}}  active={newRequestContainer === 'PayloadMapper'}>Payload Mapper</NewRequestbutton>

        </NewRequestDiv>

        <div style={{display:newRequestContainer === 'RequestTracer'?'block':'none'}}> < Payload props={{getTransactionIdData:getTransactionIdData,transaction_id_data:transaction_id_data,getTransactionId:getTransactionId,transaction_id:transaction_id}} /> </div>
        <div style={{display:newRequestContainer === 'NewRequest'?'block':'none'}}><NewRequset/></div>
        <div style={{display:newRequestContainer === 'PayloadMapper'?'block':'none'}}><PayloadMapper/></div>



      </div>


    )
  }



    export default Section;