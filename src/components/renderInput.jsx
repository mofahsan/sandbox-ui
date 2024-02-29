import { Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { env } from "../env/env";
import {
  FormFieldWrapper,
  LabelContainer,
  InfoIconWrapper,
} from "../styled/renderInput.style";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useRef } from "react";
import { useState } from "react";

const exeptions = ["startStop", "endStop"];
const RenderInput = ({ data, control, errors, watch }) => {
  const [selectOptions, setSelectOptions] = useState();
  const [formData, setFormData] = useState(watch());
  // const fetched = useRef([]);
  useEffect(() => {
    getOptions();
  }, [data, formData]);

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(">>>>>>", data.config, data.currentConfig);
      setFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, data]);

  const isJSON = (value) => {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getOptions = async () => {
    if (data.type !== "select") {
      return;
    }

    if (data.config !== data.currentConfig) {
      return;
    }
    // if (fetched.current.includes(data.key) && !exeptions.includes(data.key)) {
    //   return;
    // }
    // fetched.current.push(data.key);
    let replaceFieldValue = "";

    if (data.extractionPathReplaceWith) {
      replaceFieldValue = eval(data.extractionPathReplaceWith);

      if (replaceFieldValue === "") return;
    }

    let path = data.extractionPath;

    if (data.extractionPathReplace) {
      path = path.replace(data.extractionPathReplace, replaceFieldValue);
    }

    if (!path) return;

    try {
      const header = {};
      header.headers = {
        ...header.headers,
        "Content-Type": "application/json",
      };

      const res = await axios.post(
        `${env.sandBox}/mapper/extractPath`,
        JSON.stringify({
          path: path,
          obj: { businessPayload: data.businessPayload },
        }),
        header
      );

      const filteredOptions = res.data.response.data.filter(
        (obj, index, self) => index === self.findIndex((t) => t.key === obj.key)
      );

      setSelectOptions(filteredOptions);
    } catch (e) {
      console.log("Error while fetching option", e);
      toast.error(JSON.stringify(e.response.data));
    }
  };

  // console.log("data", data);
  // console.log("sleectOPts", selectOptions);
  // console.log("formaDat", formData);

  if (data.type === "text") {
    return (
      <FormFieldWrapper>
        <LabelContainer>
          <label htmlFor={data.key}>{data.name}</label>
          <Tooltip title={data.summary}>
            <InfoOutlinedIcon
              style={{
                height: "20px",
                width: "20px",
                color: "rgb(152 152 152)",
              }}
            />
          </Tooltip>
        </LabelContainer>
        <Controller
          name={data.key}
          control={control}
          defaultValue={data?.defaultValue || ""}
          rules={{ required: data.errorText }}
          render={({ field }) => (
            <>
              <input {...field} />
              {errors?.[data?.key] && <p>{errors?.[data?.key]?.message}</p>}
            </>
          )}
        />
      </FormFieldWrapper>
    );
  } else if (data.type === "select") {
    return (
      <FormFieldWrapper>
        <LabelContainer>
          <label htmlFor={data.key}>{data.name}</label>
          <Tooltip title={data.summary}>
            <InfoOutlinedIcon
              style={{
                height: "20px",
                width: "20px",
                color: "rgb(152 152 152)",
              }}
            />
          </Tooltip>
        </LabelContainer>
        <Controller
          name={data.key}
          control={control}
          defaultValue={data?.defaultValue}
          rules={{ required: data.errorText }}
          render={({ field }) => (
            <>
              <select {...field}>
                <option selected="selected" disabled="disabled">
                  select value
                </option>
                {(
                  selectOptions ||
                  data?.providedOptions ||
                  data?.defaultOptions
                )?.map((item) => {
                  return <option value={item.value}>{item.key}</option>;
                })}
              </select>
              {errors[data.key] && <p>{errors[data.key].message}</p>}
            </>
          )}
        />
      </FormFieldWrapper>
    );
  } else if (data.type === "multiline") {
    return (
      <FormFieldWrapper>
        <LabelContainer>
          <label htmlFor={data.key}>{data.name}</label>
          <Tooltip title={data.summary}>
            <InfoOutlinedIcon
              style={{
                height: "20px",
                width: "20px",
                color: "rgb(152 152 152)",
              }}
            />
          </Tooltip>
        </LabelContainer>
        <Controller
          name={data.key}
          control={control}
          defaultValue={JSON.stringify(data?.defaultValue, null, 2) || ""}
          rules={{
            required: data.errorText,
            validate: {
              isJSON: (value) => isJSON(value) || "Invalid JSON format",
            },
          }}
          render={({ field }) => (
            <>
              <textarea {...field} rows={3} />
              {errors?.[data.key] && <p>{errors?.[data.key].message}</p>}
            </>
          )}
        />
      </FormFieldWrapper>
    );
  }
};

export default RenderInput;
