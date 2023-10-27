  import { useEffect, useState} from "react";
  import {  toast } from 'react-toastify';
  import { DownOutlined } from '@ant-design/icons';




  import axios  from "../libs/http";
  import {
    CopyOutlined 
  } from '@ant-design/icons';



  import {FilterConatiner,ActionButton,HeaderContainer,Action,TimeStamp,HeaderOptionButton,Option,StyledOptions,CustomSelect} from "../styled/section"


  function Payload(props) {
      // State declaration

      const [activeButton, setActiveButton] = useState("Summary");
      const [activeButtonIndex, setActiveButtonIndex] = useState(null);
      const transaction_id_data = props.props.transaction_id_data //transactionId data
      const transaction_id = props.props.transaction_id //transactionId data
      
      const [formattedDataIndex,setformattedDataIndex] = useState([]) //Display data index
      const [isOpen, setIsOpen] = useState(false); // transactionid dropdown open close
      const [selectedOption, setSelectedOption] = useState(); //transaction id select display
      const [editorData,seteditorData] = useState({Summary:'  {\n\t\n\t\n\t\n  }',Header:'  {\n\t\n\t\n\t\n  }'}) //Display data index


        const getTransactionId=props.props.getTransactionId
      useEffect(()=>{
        getTransactionId()
        },[])

      // Api call to get transaction id list
   


    const getTransactionIdData = props.props.getTransactionIdData

      // handle transactionid selection
    
      const handle_transactionId_select = (optionValue) => {
        setSelectedOption(optionValue?.transaction);
        setIsOpen(false);
        setFilterText(optionValue?.transaction); // Set the selected option in the input field
        getTransactionIdData(optionValue?.transaction);

      };

      //handle header/summary button click
      const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);

      };

    // handle api call click
    const handleclick=(index,keyname)=>{
      seteditorData({Summary:JSON.stringify(transaction_id_data[index]["data"],null, 2),Header:JSON.stringify(transaction_id_data[index]["header"],null, 2)})
      setformattedDataIndex(index)
      setActiveButton(keyname);
      setActiveButtonIndex(index); // Set the active button index
    }

    //new request button


    //editor handle code
    const handleEditor = (e)=>{
      editorData[`${activeButton}`]=e.target.textContent
      seteditorData(editorData)
    }


    const [filterText, setFilterText] = useState('');
    

    const handleInputClick = () => {

      setIsOpen(!isOpen);
      setFilterText('')
    };

    const clearAction=async()=>{

      const data = await axios.delete("/cache?transactionid="+transaction_id)
      toast.success('Data Cleared successfully');

      getTransactionIdData(transaction_id)
      seteditorData({})
    }
      return (
      <>

     
        <FilterConatiner>
          <div style={{fontFamily:"varr",display:"flex",alignItems:"center"}}>Transaction Id</div>

        <CustomSelect  >
          <div style={{border:"1px solid #ccc"}}> <input
            type="text"
            value={filterText}
            placeholder="Filter by Transaction ID"
            onChange={(e) => 
              setFilterText(e.target.value)}
            onClick={(e)=>{
            handleInputClick();
            getTransactionId();
            
          }}
            style={{width:"255px",padding:"5px",borderStyle:"none",outline:"none"}}
          />
                  <DownOutlined style={{ backgroundColor: 'white', display: 'inline-block' ,padding:"9px 9px 5px 0px"}}/>  </div>
       
        <StyledOptions isOpen={isOpen} > 
    {transaction_id?.filter((transaction) =>
        transaction.includes(filterText)
      )
      
      .map((transaction, index) => (
         <Option
        key={index}
       
        onClick={async(e) => {
          console.log()

          handle_transactionId_select({ transaction });

    }}
      >
        {transaction}
      </Option>
      
      ))}
  </StyledOptions>

      </CustomSelect>
        </FilterConatiner>




        <div className="payload-container">
          <div className="payload-list">
            <div style={{display:"flex",justifyContent:"space-between"}}> <h2>Payload List</h2>
            <button  style={{borderRadius:"5px"}} onClick={()=>{
             clearAction()
            }}>Clear</button></div>
           
            <ul id="payloadList" className="scrollable-list">
    {!transaction_id_data?.message &&
      transaction_id_data?.map((element, index) => {
        return (
        
         <ActionButton  key={element.order}   active={activeButtonIndex === index}  onClick={() => handleclick(index, "Summary")}    className="button" >
        <Action className="action">{element.action}</Action>
        <TimeStamp className="timestamp">{new Date(element.timestamp).toLocaleDateString()} {new Date(element.timestamp).toLocaleTimeString()}</TimeStamp>
      </ActionButton>
        );
      })}
  </ul>

          </div>
          <div className="api-info">
        
          
        <HeaderContainer>
        <HeaderOptionButton
          active={activeButton === 'Summary'}
          onClick={() => handleButtonClick('Summary')}
        >
          Summary
        </HeaderOptionButton>
        <HeaderOptionButton
          active={activeButton === 'Header'}
          onClick={() => handleButtonClick('Header')}
        >
          Header
        </HeaderOptionButton>
      
      
        {/* <CopyOutlined  style={{fontSize:"30px"}} onClick={() => {navigator.clipboard.writeText(editorData[`${activeButton}`])}}/> */}

      </HeaderContainer>
          <div >
          <pre id="payloadData"   onInput={handleEditor} key={activeButton}
  >
            {activeButton=="Summary"?editorData.Summary:editorData.Header}
            </pre>
          </div>
          
          </div>
        </div>
      </>
      );
    }


  export default Payload