import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { env } from "../env/env";
import { createBecknObject, extractBusinessData } from "../utils/buildPayload";
import BackIcon from "../assets/png/back.png";
import {
  Container,
  HeadingWrapper,
  SendButton,
  Wrapper,
  ResponseField,
  TitleContainer,
  TitleHeading,
  CardHeader,
  CardBody,
  FormContainer,
} from "../styled/requestExecuter.style";
import RenderInput from "./renderInput";

const on_search_trip_data = {
  context: {
    location: {
      country: {
        code: "IND",
      },
      city: {
        code: "std:011",
      },
    },
    domain: "ONDC:TRV11",
    action: "on_search",
    version: "2.0.0",
    bpp_id: "api.example-bpp.com",
    bap_uri: "https://api.example-bap.com/ondc/metro",
    bap_id: "api.example-bap.com",
    bpp_uri: "https://api.example-bpp.com/ondc/metro",
    transaction_id: "6f339232-2bc3-44d2-915c-30d2b053ce1d",
    message_id: "fde8b8b6-c2e5-49f7-b254-720843d528bd",
    timestamp: "2021-03-23T10:00:40.065Z",
    ttl: "PT30S",
  },
  message: {
    catalog: {
      descriptor: {
        name: "Transit Solutions",
        images: [
          {
            url: "https://transitsolutions.in/logos/logo.ico",
          },
        ],
      },
      providers: [
        {
          id: "P1",
          categories: [
            {
              descriptor: {
                name: "Ticket",
                code: "TICKET",
              },
              id: "C1",
            },
            {
              descriptor: {
                name: "Pass",
                code: "PASS",
              },
              id: "C2",
            },
          ],
          time: {
            range: {
              start: "2023-09-14T05:30:00.000Z",
              end: "2023-09-14T23:30:00.000Z",
            },
          },
          descriptor: {
            name: "Delhi Metro Rail Limited",
            images: [
              {
                url: "https://delhimetrorail.com/logos/logo.ico",
              },
            ],
          },
          items: [
            {
              id: "I1",
              category_ids: ["C1"],
              descriptor: {
                name: "Single Journey Ticket",
                code: "SJT",
              },
              price: {
                currency: "INR",
                value: "60",
              },
              quantity: {
                maximum: {
                  count: 6,
                },
                minimum: {
                  count: 1,
                },
              },
              fulfillment_ids: ["F1"],
              time: {
                label: "Validity",
                duration: "PT2D",
              },
            },
            {
              id: "I2",
              category_ids: ["C1"],
              descriptor: {
                name: "Round Journey Ticket",
                code: "RJT",
              },
              price: {
                currency: "INR",
                value: "110",
              },
              quantity: {
                maximum: {
                  count: 6,
                },
                minimum: {
                  count: 1,
                },
              },
              fulfillment_ids: ["F1"],
              time: {
                label: "Validity",
                duration: "PT2D",
              },
            },
            {
              id: "I3",
              category_ids: ["1", "2"],
              descriptor: {
                name: "Journey Pass",
                code: "Pass",
              },
              price: {
                currency: "INR",
                value: "500",
              },
              quantity: {
                maximum: {
                  count: 1,
                },
                minimum: {
                  count: 1,
                },
              },
              fulfillment_ids: ["F2"],
              time: {
                label: "Validity",
                duration: "PT2D",
              },
            },
          ],
          fulfillments: [
            {
              id: "F1",
              type: "TRIP",
              stops: [
                {
                  type: "START",
                  location: {
                    descriptor: {
                      name: "Shaheed Sthal(New Bus Adda)",
                      code: "SHAHEED_STHAL",
                    },
                    gps: "28.686576, 77.441632",
                  },
                  id: "1",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 1",
                  },
                  location: {
                    descriptor: {
                      name: "Hindon River",
                      code: "HINDON_RIVER",
                    },
                    gps: "28.686176, 77.442632",
                  },
                  id: "2",
                  parent_stop_id: "1",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 2",
                  },
                  location: {
                    descriptor: {
                      name: "Arthala",
                    },
                    gps: "28.181276, 77.442332",
                  },
                  id: "3",
                  parent_stop_id: "2",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 3",
                  },
                  location: {
                    descriptor: {
                      name: "Mohan Nagar",
                    },
                    gps: "28.981276, 77.772332",
                  },
                  id: "4",
                  parent_stop_id: "3",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 4",
                  },
                  location: {
                    descriptor: {
                      name: "Shyam Park",
                    },
                    gps: "28.620976, 77.046732",
                  },
                  id: "5",
                  parent_stop_id: "4",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 5",
                  },
                  location: {
                    descriptor: {
                      name: "Major Mohit Sharma Rajendra Nagar",
                    },
                    gps: "28.120976, 77.946732",
                  },
                  id: "6",
                  parent_stop_id: "5",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 6",
                  },
                  location: {
                    descriptor: {
                      name: "Raj Bagh",
                    },
                    gps: "28.677076, 77.346632",
                  },
                  id: "7",
                  parent_stop_id: "6",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 7",
                  },
                  location: {
                    descriptor: {
                      name: "Shaheed Nagar",
                    },
                    gps: "28.617076, 77.146632",
                  },
                  id: "8",
                  parent_stop_id: "7",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 8",
                  },
                  location: {
                    descriptor: {
                      name: "Dilshad Garden",
                    },
                    gps: "28.917076, 77.146632",
                  },
                  id: "9",
                  parent_stop_id: "8",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 9",
                  },
                  location: {
                    descriptor: {
                      name: "Jhilmil",
                    },
                    gps: "28.897076, 77.146632",
                  },
                  id: "10",
                  parent_stop_id: "9",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 10",
                  },
                  location: {
                    descriptor: {
                      name: "Mansarovar Park",
                    },
                    gps: "28.117076, 77.116632",
                  },
                  id: "11",
                  parent_stop_id: "10",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 11",
                  },
                  location: {
                    descriptor: {
                      name: "Shahdara",
                    },
                    gps: "28.127076, 77.416632",
                  },
                  id: "12",
                  parent_stop_id: "11",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 12",
                  },
                  location: {
                    descriptor: {
                      name: "Welcome",
                    },
                    gps: "28.217076, 77.216632",
                  },
                  id: "13",
                  parent_stop_id: "12",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 13",
                  },
                  location: {
                    descriptor: {
                      name: "Seelampur",
                    },
                    gps: "28.327076, 77.416632",
                  },
                  id: "14",
                  parent_stop_id: "13",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 14",
                  },
                  location: {
                    descriptor: {
                      name: "Shastri Park",
                    },
                    gps: "28.427076, 77.446632",
                  },
                  id: "15",
                  parent_stop_id: "14",
                },
                {
                  type: "TRANSIT_STOP",
                  instructions: {
                    name: "Stop 15",
                    short_desc: "Please Change here for Yellow Line",
                  },
                  location: {
                    descriptor: {
                      name: "Kashmere Gate",
                    },
                    gps: "28.738426, 77.139922",
                  },
                  id: "16",
                  parent_stop_id: "15",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 16",
                  },
                  location: {
                    descriptor: {
                      name: "Civil Lines",
                    },
                    gps: "28.627076, 77.646632",
                  },
                  id: "17",
                  parent_stop_id: "16",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 17",
                  },
                  location: {
                    descriptor: {
                      name: "Vidhan Sabha",
                    },
                    gps: "28.727076, 77.746632",
                  },
                  id: "18",
                  parent_stop_id: "17",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 18",
                  },
                  location: {
                    descriptor: {
                      name: "Vishwavidyalaya",
                    },
                    gps: "28.827076, 77.846632",
                  },
                  id: "19",
                  parent_stop_id: "18",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 19",
                  },
                  location: {
                    descriptor: {
                      name: "Guru Tegh Bahadur Nagar",
                    },
                    gps: "28.927076, 77.946632",
                  },
                  id: "20",
                  parent_stop_id: "19",
                },
                {
                  type: "INTERMEDIATE_STOP",
                  instructions: {
                    name: "Stop 20",
                  },
                  location: {
                    descriptor: {
                      name: "Model Town",
                    },
                    gps: "28.217076, 77.496632",
                  },
                  id: "21",
                  parent_stop_id: "20",
                },
                {
                  type: "END",
                  location: {
                    descriptor: {
                      name: "Azadpur",
                      code: "AZADPUR",
                    },
                    gps: "28.707358, 77.180910",
                  },
                  id: "22",
                  parent_stop_id: "21",
                },
              ],
              vehicle: {
                category: "METRO",
              },
            },
            {
              id: "F2",
              type: "TRIP",
              stops: [
                {
                  type: "START",
                  location: {
                    descriptor: {
                      name: "Shaheed Sthal(New Bus Adda)",
                      code: "SHAHEED_STHAL",
                    },
                    gps: "28.686576, 77.441632",
                  },
                  id: "1",
                },
                {
                  type: "TRANSIT_STOP",
                  instructions: {
                    short_desc: "Please Change here for Yellow Line",
                  },
                  location: {
                    descriptor: {
                      name: "Kashmere Gate",
                    },
                    gps: "28.738426, 77.139922",
                  },
                  id: "2",
                  parent_stop_id: "1",
                },
                {
                  type: "END",
                  location: {
                    descriptor: {
                      name: "Azadpur",
                      code: "AZADPUR",
                    },
                    gps: "28.707358, 77.180910",
                  },
                  id: "3",
                  parent_stop_id: "2",
                },
              ],
              tags: [
                {
                  descriptor: {
                    code: "TRIP_DETAILS",
                  },
                  list: [
                    {
                      descriptor: {
                        code: "AVAILABLE_TRIPS",
                      },
                      value: "30",
                    },
                    {
                      descriptor: {
                        code: "UTILIZED_TRIPS",
                      },
                      value: "0",
                    },
                  ],
                },
              ],
              vehicle: {
                category: "METRO",
              },
            },
          ],
          payments: [
            {
              tags: [
                {
                  descriptor: {
                    code: "BUYER_FINDER_FEES",
                  },
                  display: false,
                  list: [
                    {
                      descriptor: {
                        code: "BUYER_FINDER_FEES_PERCENTAGE",
                      },
                      value: "1",
                    },
                  ],
                },
                {
                  descriptor: {
                    code: "SETTLEMENT_TERMS",
                  },
                  display: false,
                  list: [
                    {
                      descriptor: {
                        code: "SETTLEMENT_WINDOW",
                      },
                      value: "PT30D",
                    },
                    {
                      descriptor: {
                        code: "SETTLEMENT_BASIS",
                      },
                      value: "INVOICE_RECEIPT",
                    },
                    {
                      descriptor: {
                        code: "MANDATORY_ARBITRATION",
                      },
                      value: "TRUE",
                    },
                    {
                      descriptor: {
                        code: "COURT_JURISDICTION",
                      },
                      value: "New Delhi",
                    },
                    {
                      descriptor: {
                        code: "STATIC_TERMS",
                      },
                      value: "https://api.example-bpp.com/booking/terms",
                    },
                  ],
                },
              ],
            },
          ],
          cancellation_terms: [
            {
              external_ref: {
                mimetype: "text/html",
                url: "https://transitsolutions.com/mf/tnc.html",
              },
            },
          ],
          tags: [
            {
              descriptor: {
                code: "SCHEDULED_INFO",
              },
              display: false,
              list: [
                {
                  descriptor: {
                    code: "GTFS",
                  },
                  value: "https://metro-transit/gtfs-realtime",
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

const inputFieldsData = {
  search_route: [
    {
      name: "Vehical Category",
      key: "vehicalCategory",
      type: "text",
      errorText: "Vehical category is required",
    },
    {
      name: "Payment Tags",
      key: "paymentTagsSearch",
      type: "multiline",
      errorText: "Payment tags is required",
    },
  ],
  search_trip: [
    {
      name: "BPP URI",
      key: "bpp_uri",
      type: "text",
      error: "BPP URI is required",
    },
    {
      name: "BPP ID",
      key: "bpp_id",
      type: "text",
      error: "BPP ID is required",
    },
    {
      name: "Start stop",
      key: "startStop",
      type: "text",
      error: "Start stop is required",
    },
    {
      name: "End stop",
      key: "endStop",
      type: "text",
      error: "End stop is required",
    },
  ],
  select: [
    {
      name: "Item id",
      key: "itemId",
      type: "text",
      errorText: "Item id is required",
    },
    {
      name: "Quantity",
      key: "quantity",
      type: "text",
      errorText: "Quantity is required",
    },
    {
      name: "Provider id",
      key: "providerId",
      type: "text",
      errorText: "Provider id is required",
    },
  ],
  init: [
    {
      name: "Name",
      key: "name",
      type: "text",
      errorText: "Name is required",
    },
    {
      name: "Email",
      key: "email",
      type: "text",
      errorText: "Email is required",
    },
    {
      name: "Phone",
      key: "phone",
      type: "text",
      errorText: "Phone is required",
    },
    {
      name: "Collected By",
      key: "collectedBy",
      type: "text",
      errorText: "Collected By is required",
    },
    {
      name: "Payment Status",
      key: "paymentStatus",
      type: "text",
      errorText: "Payment Status is required",
    },
    {
      name: "Payment Type",
      key: "paymentType",
      type: "text",
      errorText: "Payment Type is required",
    },
    {
      name: "Bank Code",
      key: "banckCode",
      type: "text",
      errorText: "Bank Code is required",
    },
    {
      name: "Bank Account Number",
      key: "banckAccountNumber",
      type: "text",
      errorText: "Bank Account Number is required",
    },
    {
      name: "Virtual Payment Address",
      key: "virtualPaymentAddress",
      type: "text",
      errorText: "Virtual Payment Address is required",
    },
    {
      name: "Payment Tags",
      key: "paymentTagsInit",
      type: "multiline",
      errorText: "Payment Tags is required",
    },
  ],
  confirm: [
    {
      name: "Payment Id",
      key: "paymentId",
      type: "text",
      errorText: "Payment Id is required",
    },
    {
      name: "Collected By",
      key: "collectedByConfirm",
      type: "text",
      errorText: "Collected By is required",
    },
    {
      name: "Collected By",
      key: "collectedBy",
      type: "text",
      errorText: "Collected By is required",
    },
    {
      name: "Payment Status",
      key: "paymentStatusConfirm",
      type: "text",
      errorText: "Payment Status is required",
    },
    {
      name: "Payment Type",
      key: "paymentTypeConfirm",
      type: "text",
      errorText: "Payment Type is required",
    },
    {
      name: "Transcation Id",
      key: "transcationId",
      type: "text",
      errorText: "Transcation Id is required",
    },
    {
      name: "Amount",
      key: "amount",
      type: "text",
      errorText: "Amount is required",
    },
    {
      name: "Currency",
      key: "currency",
      type: "text",
      errorText: "Currency is required",
    },
    {
      name: "Payment Tags",
      key: "paymentTagsConfirm",
      type: "multiline",
      errorText: "Payment Tags is required",
    },
  ],
  status: [
    {
      name: "Order Id",
      key: "orderId",
      type: "text",
      errorText: "Order Id is required",
    },
  ],
};

const RequestExecuter = ({ transactionId }) => {
  const [protocolCalls, setProtocolCalls] = useState({
    search_route: {
      type: "search",
      executed: false,
      shouldRender: true,
      config: "search_route",
      nextRequest: "on_search_route",
      isCollapsed: false,
    },
    on_search_route: {
      type: "on_search",
      executed: false,
      shouldRender: false,
      config: "on_search_route",
      nextRequest: "search_trip",
      isCollapsed: false,
    },
    search_trip: {
      type: "search",
      executed: false,
      shouldRender: false,
      config: "search_trip",
      nextRequest: "on_search_trip",
      isCollapsed: false,
    },
    on_search_trip: {
      type: "on_search",
      executed: false,
      shouldRender: false,
      config: "on_search_trip",
      nextRequest: "select",
      isCollapsed: false,
    },
    select: {
      type: "select",
      executed: false,
      shouldRender: false,
      config: "select",
      nextRequest: "on_select",
      isCollapsed: false,
    },
    on_select: {
      type: "on_select",
      executed: false,
      shouldRender: false,
      config: "on_select",
      nextRequest: "init",
      isCollapsed: false,
    },
    init: {
      type: "init",
      executed: false,
      shouldRender: false,
      config: "init",
      nextRequest: "on_init",
      isCollapsed: false,
    },
    on_init: {
      type: "on_init",
      executed: false,
      shouldRender: false,
      config: "on_init",
      nextRequest: "confirm",
      isCollapsed: false,
    },
    confirm: {
      type: "confirm",
      executed: false,
      shouldRender: false,
      config: "confirm",
      nextRequest: "on_confirm",
      isCollapsed: false,
    },
    on_confirm: {
      type: "on_confirm",
      executed: false,
      shouldRender: false,
      config: "on_confirm",
      nextRequest: "status",
      isCollapsed: false,
    },
    status: {
      type: "status",
      executed: false,
      shouldRender: false,
      config: "status",
      nextRequest: "on_status",
      isCollapsed: false,
    },
    on_status: {
      type: "on_status",
      executed: false,
      shouldRender: false,
      config: "on_status",
      nextRequest: null,
      isCollapsed: false,
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [isCollapsed, setCollapsed] = useState(false);

  const toggleCollapse = (call) => {
    setProtocolCalls((prevData) => {
      prevData[call.config] = {
        ...prevData[call.config],
        isCollapsed: !call.isCollapsed,
      };

      return { ...prevData };
    });
  };

  const getData = (type) => {
    if (type === "search_route") {
      return {
        vehicleCategaory: "METRO",
        paymentTags: {
          BUYER_FINDER_FEES: {
            BUYER_FINDER_FEES_TYPE: "percent-annualized",
            BUYER_FINDER_FEES_PERCENTAGE: "1",
          },
          SETTLEMENT_TERMS: {
            DELAY_INTEREST: 2.5,
            STATIC_TERMS:
              "https://bap.credit.becknprotocol.io/personal-banking/loans/personal-loan",
          },
        },
      };
    }

    if (type === "search_trip") {
      return {
        startStop: "SHAHEED_STHAL",
        endStop: "AZADPUR",
        bpp_id: "api.example-bpp.com",
        bpp_uri: "https://rsf-mock-service.ondc.org/",
      };
    }

    if (type === "select") {
      return {
        itemId: "I1",
        quantitySelected: 2,
        providerId: "P1",
      };
    }

    if (type === "init") {
      return {
        billinginfo: {
          name: "Hohn Doe",
          email: "hohn.doe@gamil.com",
          phone: "1212312312312",
        },
        paymentData: {
          collectedBy: "BAP",
          status: "NOT-PAID",
          type: "PRE-ORDER",
          bankCode: "XXXXXXXX",
          bankAccountNumber: "xxxxxxxxxxxxxx",
          virtualPaymentAddress: "9988199772@okicic",
        },
        paymentTags: {
          BUYER_FINDER_FEES: {
            BUYER_FINDER_FEES_PERCENTAGE: 1,
          },
          SETTLEMENT_DETAILS: {
            SETTLEMENT_TYPE: "UPI",
          },
          SETTLEMENT_TERMS: {
            SETTLEMENT_AMOUNT: 59,
            SETTLEMENT_TYPE: "neft",
            DELAY_INTEREST: 2.5,
            STATIC_TERMS: "https://api.example-bap.com/booking/terms",
          },
        },
      };
    }

    if (type === "confirm") {
      return {
        paymentData: {
          id: "PA1",
          collectedBy: "BAP",
          status: "PAID",
          type: "PRE-ORDER",
          transactionId: "34cc9b0b-6887-4c63-8397-2f4fcf03e50d",
          currency: "INR",
          amount: "120",
        },
        paymentTags: {
          BUYER_FINDER_FEES: {
            BUYER_FINDER_FEES_PERCENTAGE: 1,
          },
          SETTLEMENT_TERMS: {
            SETTLEMENT_WINDOW: "PT60M",
            SETTLEMENT_BASIS: "Delivery",
            SETTLEMENT_TYPE: "upi",
            MANDATORY_ARBITRATION: true,
            COURT_JURISDICTION: "New Delhi",
            DELAY_INTEREST: 2.5,
            STATIC_TERMS: "https://www.abc.com/settlement-terms/",
            SETTLEMENT_AMOUNT: 59,
          },
        },
      };
    }

    if (type === "status") {
      return {
        orderId: "077b248f",
      };
    }
  };

  const displayOnCallData = (call) => {
    return call.data.map((item) => {
      const result = extractBusinessData(call.config, item);
      return <ResponseField>{JSON.stringify(result)}</ResponseField>;
    });
  };

  const sendRequest = async (e, call) => {
    console.log("e", e);
    console.log("call", call);

    let sessionData = JSON.parse(localStorage.getItem("sessionData"));
    const data = getData(call.config);

    const payload = createBecknObject(sessionData[transactionId], call, data);

    const header = {};
    header.headers = { ...header.headers, "Content-Type": "application/json" };

    try {
      const response = await axios.post(
        `${env.metroMock}/${call.type}`,
        JSON.stringify(payload, null, 2),
        header
      );

      toast.success("Request sent successfully");
      //
      setProtocolCalls((prevData) => {
        prevData[call.config] = {
          ...prevData[call.config],
          data: data,
          executed: true,
          isCollapsed: true,
        };

        prevData[call.nextRequest] = {
          ...prevData[call.nextRequest],
          shouldRender: true,
        };

        return JSON.parse(JSON.stringify(prevData));
      });

      sessionData[transactionId].protocolCalls = protocolCalls;
      sessionData[transactionId] = { ...sessionData[transactionId], ...data };

      localStorage.setItem("sessionData", JSON.stringify(sessionData));
      const nextCall = protocolCalls[call.nextRequest];

      setProtocolCalls((prevData) => {
        prevData[nextCall.config] = {
          ...prevData[nextCall.config],
          data:
            nextCall.config === "on_search_trip"
              ? [on_search_trip_data]
              : [response.data],
          executed: true,
          isCollapsed: true,
        };

        if (nextCall.nextRequest) {
          prevData[nextCall.nextRequest] = {
            ...prevData[nextCall.nextRequest],
            shouldRender: true,
          };
        }

        return JSON.parse(JSON.stringify(prevData));
      });
    } catch (error) {
      toast.error(JSON.stringify(error.response.data));
    }
  };

  console.log("isCloopse", isCollapsed);

  return (
    <Wrapper>
      <TitleContainer>
        <TitleHeading>
          <img src={BackIcon} alt="Description" width={25} height={25} />
          <h2>TransactionID: {transactionId}</h2>
        </TitleHeading>
      </TitleContainer>

      {Object.entries(protocolCalls).map((data) => {
        const [key, call] = data;

        if (call.shouldRender) {
          return (
            <Container>
              <CardHeader rotation={call.isCollapsed ? 270 : 90}>
                <HeadingWrapper>{call.config}</HeadingWrapper>
                <img
                  onClick={() => toggleCollapse(call)}
                  src={BackIcon}
                  alt="Description"
                  width={10}
                  height={10}
                />
              </CardHeader>
              <CardBody isCollapsed={call.isCollapsed}>
                {call.type.startsWith("on_") ? (
                  <>
                    {call.data ? (
                      displayOnCallData(call)
                    ) : (
                      <div>{`Waiting for ${call.type} response`}</div>
                    )}
                  </>
                ) : (
                  <FormContainer
                    onSubmit={handleSubmit((data) => sendRequest(data, call))}
                  >
                    {inputFieldsData[call.config].map((item) => (
                      <RenderInput
                        data={item}
                        control={control}
                        errors={errors}
                      />
                    ))}
                    <SendButton type="submit">Send</SendButton>
                  </FormContainer>
                )}
              </CardBody>
            </Container>
          );
        }
      })}
    </Wrapper>
  );
};

export default RequestExecuter;
