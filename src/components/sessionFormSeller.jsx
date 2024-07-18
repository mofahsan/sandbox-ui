import { useState } from "react";
import {
  Input,
  FormContainer,
  FormField,
  Select,
  Label,
  Button,
  Container,
  TransactionId,
  filterButton
} from "../styled/sessionForm.style";
import { toast } from "react-toastify";
import { env } from "../env/env";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import JourneyDialog from "./JourneyUI/JourneyPage";

const SessionForm = ({ updateStep }) => {
  const [transcations, setTransactions] = useState([]);
  const [flows, setFlows] = useState([]);
  const [formData, setFormData] = useState({
    country: "IND",
    cityCode: "",
    configName: "",
  });
  useEffect(() => {
    // getSessions();
    getFlows();
  }, []);

  const getFlows = async () => {
    try {
      const header = {};
      header.headers = {
        ...header.headers,
        "Content-Type": "application/json",
      };

      const res = await axios.get(`${env.sandBox}/mapper/flows`, header);

      console.log("response", res.data);
      setFlows(res.data.data);
    } catch (e) {
      console.log("Error while fetching flows data", e);
      toast.error(JSON.stringify(e?.response?.data || e?.message));
    }
  };

  const getVersion = ()=>{
    const flow = flows.find((element)=> element.value === formData.configName)
    return flow.version
  }

  const fetchSessionId = ()=>{
    getSessions(formData.subscriberId)
  }

  const getSessions = async (subscriberId) => {
    try {
      const header = {};
      header.headers = {
        ...header.headers,
        "Content-Type": "application/json",
      };

      const res = await axios.get(`${env.sandBox}/cache?subscriberId=${subscriberId}`, header);
      // const res = await axios.get(`${env.sandBox}/cache`, header); // fetch all subscriber id

      console.log("response", res.data);
      setTransactions(res.data);
    } catch (e) {
      console.log("Error while fetching session data", e);
      toast.error(JSON.stringify(e?.response?.data || e?.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const transactiomId = uuidv4();

    try {
      const header = {};
      header.headers = {
        ...header.headers,
        "Content-Type": "application/json",
      };

      await axios.post(
        `${env.sandBox}/mapper/session`,
        JSON.stringify({ ...formData, transaction_id: transactiomId }),
        header
      );
      updateStep(2, transactiomId);
    } catch (e) {
      console.log("error while sending session request", e);
      toast.error(JSON.stringify(e?.response?.data || e?.message));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container>
      <div style={{ width: "400px" }}>
        <h2>Session Data</h2>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            {/* <FormField>
              <Label htmlFor="config">Flow:</Label>
              <Select
                id="config"
                name="configName"
                onChange={handleInputChange}
              >
                <option selected="selected" disabled="disabled">
                  select value
                </option>
                {flows.map((flow) => {
                  return <option value={flow.value}>{flow.key}</option>;
                })}
              </Select>
            </FormField>

            <FormField>
              <Label htmlFor="country">Country:</Label>
              <Input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField>
              <Label htmlFor="cityCode">City Code:</Label>
              <Input
                type="text"
                id="cityCode"
                name="cityCode"
                value={formData.cityCode}
                onChange={handleInputChange}
              />
            </FormField>

            

            <FormField>
              <Label htmlFor="config">Version:</Label>
              <Select
                id="configVersion"
                name="configVersion"
                onChange={handleInputChange}
              >
                <option selected="selected" disabled="disabled">
                  select value
                </option>
                
              {formData.configName && 
              getVersion()?.map((version)=><option value={version}>{version}</option>)
              }
                
              </Select>
            </FormField> */}

            <FormField>
              <Label htmlFor="subscriberId">Subscriber ID:</Label>
              <Input
                type="text"
                id="subscriberId"
                name="subscriberId"
                value={formData.subscriberId}
                onChange={handleInputChange}
              />
            </FormField>
            <Button onClick={fetchSessionId} type="button" > Filter</Button>

            {/* <FormField>
              <Label htmlFor="config">Transaction ID:</Label>
              <Select
                id="transactionId"
                name="transactionId"
                onChange={handleInputChange}
              >
                <option selected="selected" disabled="disabled">
                  select value
                </option>
                {Object.entries(transcations).map((data) => {
            const [key, value] = data;
            const transactionId = value.substring(3);
            if (value.startsWith("jm_"))
              return (
                              <option value={value} >
                                {transactionId}
                              </option>
              );
          })}
              </Select>
            </FormField> */}
          </FormContainer>

          {/* <Button type="submit">Submit</Button> */}
        </form>
      </div>
      <div style={{ width: "400px" }}>
        <h2>Existing Session</h2>
        <div>
          {Object.entries(transcations).map((data) => {
            const [key, value] = data;
            const transactionId = value.substring(3);
            if (value.startsWith("jm_"))
              return (
                <TransactionId onClick={() => updateStep(2, transactionId)}>
                  {transactionId}
                </TransactionId>
              );
          })}
        </div>
      </div>
    </Container>
  );
};

export default SessionForm;
