import { useEffect } from "react";
import axios  from "../libs/http";
function Section() {

    async function getTransactionId (){
        const data = await axios.get("/cache") 
        console.log(data)
    }

    useEffect(()=>{
        getTransactionId()
    },[])


  const jsonData = {
        
    
    "context": {
        "domain": "ONDC:FIS12",
        "location": {
            "country": {
                "code": "IND"
            }
        },
        "version": "2.0.0",
        "action": "on_search",
        "bap_id": "credit-protocol.becknprotocol.io",
        "bap_uri": "https://a2cc-115-240-127-98.ngrok-free.app/",
        "transaction_id": "a9aaecca-10b7-4d19-b640-b047a7c62196",
        "message_id": "74717b38-2378-4c27-9809-8aa1d79d2093",
        "ttl": "PT30M",
        "timestamp": "2023-05-25T05:23:03.443Z",
        "bpp_id": "bpp.credit.icicibank.io",
        "bpp_uri": "https://fis-seller-staging.ondc.org/"
    },
    "message": {
        "catalog": {
            "descriptor": {
                "name": "ICICI Bank"
            },
            "providers": [
                {
                    "id": "1",
                    "descriptor": {
                        "images": [
                            {
                                "url": "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                                "size_type": "sm"
                            }
                        ],
                        "name": "ICICI Bank",
                        "short_desc": "ICICI Bank Ltd",
                        "long_desc": "ICICI Bank Ltd, India."
                    },
                    "categories": [
                        {
                            "id": "101123",
                            "descriptor": {
                                "code": "INVOICE_BASED_LOAN",
                                "name": "Invoice based loan"
                            }
                        }
                    ],
                    "items": [
                        {
                            "id": "item_id_1_invoice-based-loan",
                            "descriptor": {
                                "code": "INVOICE_BASED_LOAN",
                                "name": "Invoice based Loan"
                            },
                            "category_ids": [
                                "101123"
                            ],
                            "tags": [
                                {
                                    "descriptor": {
                                        "code": "general-info",
                                        "name": "General Information"
                                    },
                                    "list": [
                                        {
                                            "descriptor": {
                                                "code": "MIN_INTEREST_RATE",
                                                "name": "Minimum Interest Rate",
                                                "short_desc": "Loans starting from 9% (p.a)"
                                            },
                                            "value": "9%"
                                        },
                                        {
                                            "descriptor": {
                                                "code": "MAX_INTEREST_RATE",
                                                "name": "Maximum Interest Rate",
                                                "short_desc": "Loan Rate below from 15% (p.a)"
                                            },
                                            "value": "15%"
                                        },
                                        {
                                            "descriptor": {
                                                "code": "MIN_TENURE",
                                                "name": "Minimum Tenure",
                                                "short_desc": "Loan Tenure starting form 5 months"
                                            },
                                            "value": "5 months"
                                        },
                                        {
                                            "descriptor": {
                                                "code": "MAX_TENURE",
                                                "name": "Maximum Tenure",
                                                "short_desc": "Loan Tenure upto form 5 years"
                                            },
                                            "value": "5 years"
                                        },
                                        {
                                            "descriptor": {
                                                "code": "MIN_LOAN_AMOUNT",
                                                "name": "Minimum Loan Amount",
                                                "short_desc": "Loan Amount starting from 50,000"
                                            },
                                            "value": "50000"
                                        },
                                        {
                                            "descriptor": {
                                                "code": "MAX_LOAN_AMOUNT",
                                                "name": "Minimum Loan Amount",
                                                "short_desc": "Loan Amount upto form 50,00,000"
                                            },
                                            "value": "5000000"
                                        }
                                    ],
                                    "display": true
                                }
                            ],
                            "matched": true,
                            "recommended": true,
                            "xinput": {
                                "head": {
                                    "descriptor": {
                                        "name": "Customer Information"
                                    },
                                    "index": {
                                        "min": 0,
                                        "cur": 0,
                                        "max": 0
                                    },
                                    "headings": [
                                        "Organization Information"
                                    ]
                                },
                                "form": {
                                    "id": "F01",
                                    "mime_type": "text/html",
                                    "url": "https://fis-seller-staging.ondc.org/form/invoice-loan/org-form",
                                    "resubmit": false,
                                    "multiple_sumbissions": false
                                },
                                "required": true
                            }
                        }
                    ]
                }
            ]
        }
      }}
    const formattedData = JSON.stringify(jsonData, null, 2);

    return (
     <>
      <div className="container">
      <h1>API Calls
        <select id="apiCallsDropdown" className="rounded-dropdown">
          <option value="apiCall1">API Call 1</option>
          <option value="apiCall2">API Call 2</option>
          {/* Add more API call options here */}
        </select>
      </h1>
      <div className="payload-container">
        <div className="payload-list">
          <h2>Payload List</h2>
          <ul id="payloadList" className="scrollable-list">
          <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
                    <li data-payload="payload1">Payload 1</li>
                    <li data-payload="payload2">Payload 2</li>
          </ul>
        </div>
        <div className="api-info fixed">
          <h2>Sample Payload Data</h2>
          <pre id="payloadData">
          {formattedData}
          </pre>
        </div>
      </div>
    </div>
    </>
    );
  }
  
  export default Section;