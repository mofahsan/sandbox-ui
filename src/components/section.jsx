  import { useEffect, useState, useRef} from "react";

  import axios1 from "axios";


  import axios  from "../libs/http";
  import {
    CopyOutlined 
  } from '@ant-design/icons';

  import Payload from "./showPayload";
  import NewRequset from "./newRequest";


  import {FilterConatiner,StyledButton,RequestHeader,PayloadContainerRequest,RequestContainer,ActionButton,HeaderContainer,NewRequestDiv,NewRequestbutton,NewRequestContainer,ActionButtonContainer,ActionDropDown,Action,TimeStamp,HeaderOptionButton,Option,StyledOptions,CustomSelect} from "../styled/section"




  function Section(){
    const [newRequestContainer,setRequestContainer]=useState('RequestTracer')

    const CallNewReqest=(containerName)=>{ // RequestTracer || NewRequest
      setRequestContainer(containerName)
    }



    return(
      <div className="container">
        <NewRequestDiv>
            <NewRequestbutton  active={newRequestContainer === 'RequestTracer'}
            onClick={()=>{CallNewReqest('RequestTracer')}}>Request Tracer</NewRequestbutton>

            
            <NewRequestbutton onClick={()=>{CallNewReqest('NewRequest')}}  active={newRequestContainer === 'NewRequest'}>New Request</NewRequestbutton>

        </NewRequestDiv>

        <div style={{display:newRequestContainer === 'RequestTracer'?'block':'none'}}> < Payload/> </div>
        <div style={{display:newRequestContainer === 'NewRequest'?'block':'none'}}><NewRequset/></div>



      </div>


    )
  }



    export default Section;