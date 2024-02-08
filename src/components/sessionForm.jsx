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
} from "../styled/sessionForm.style";
import { toast } from "react-toastify";
import { env } from "../env/env";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

const SessionForm = ({ updateStep }) => {
  const [transcations, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    bap_id: "",
    bap_uri: "",
    domain: "ONDC:TRV11",
    ttl: "",
    version: "2.0.0",
    country: "",
    city: "",
    cityCode: "",
    configName: "metro-flow-1",
  });

  useEffect(() => {
    getSessions();
  }, []);

  const getSessions = async () => {
    try {
      const header = {};
      header.headers = {
        ...header.headers,
        "Content-Type": "application/json",
      };

      const res = await axios.get(`${env.sandBox}/cache`, header);

      console.log("response", res.data);
      setTransactions(res.data);
    } catch (e) {
      console.log("Error while fetching session data", e);
      toast.error(JSON.stringify(e.response.data));
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
      toast.error(JSON.stringify(e.response.data));
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
            <FormField>
              <Label htmlFor="bap_id">BAP ID:</Label>
              <Input
                type="text"
                id="bap_id"
                name="bap_id"
                value={formData.bap_id}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField>
              <Label htmlFor="bap_uri">BAP URI:</Label>
              <Input
                type="text"
                id="bap_uri"
                name="bap_uri"
                value={formData.bap_uri}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField>
              <Label htmlFor="domain">Domain:</Label>
              <Select
                id="domain"
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
              >
                <option value="ONDC:TRV11">ONDC:TRV11</option>
                <option value="ONDC:FIS12">ONDC:FIS12</option>
              </Select>
            </FormField>

            <FormField>
              <Label htmlFor="ttl">TTL:</Label>
              <Input
                type="text"
                id="ttl"
                name="ttl"
                value={formData.ttl}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField>
              <Label htmlFor="version">Version:</Label>
              <Select
                id="version"
                name="version"
                value={formData.version}
                onChange={handleInputChange}
              >
                <option value="1.0.0">1.0.0</option>
                <option value="2.0.0">2.0.0</option>
              </Select>
            </FormField>

            <FormField>
              <Label htmlFor="config">Cofig:</Label>
              <Select
                id="config"
                name="configName"
                value={formData.configName}
                onChange={handleInputChange}
              >
                <option value="metro-flow-1">metro-flow-1</option>
                <option value="ondemand-flow-1">ondemand-flow-1</option>
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
          </FormContainer>

          <Button type="submit">Submit</Button>
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
