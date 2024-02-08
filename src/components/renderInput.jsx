import { Controller } from "react-hook-form";
import { FormFieldWrapper } from "../styled/renderInput.style";

const RenderInput = ({ data, control, errors }) => {
  const isJSON = (value) => {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  };

  console.log("data", data);

  if (data.type === "text") {
    return (
      <FormFieldWrapper>
        <label htmlFor={data.key}>{data.name}</label>
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
        <label htmlFor={data.key}>{data.name}</label>
        <Controller
          name={data.key}
          control={control}
          defaultValue={
            (data?.providedOptions || data?.defaultOptions)?.[0]?.value
          }
          rules={{ required: data.errorText }}
          render={({ field }) => (
            <>
              <select {...field}>
                {(data?.providedOptions || data?.defaultOptions)?.map(
                  (item) => {
                    return <option value={item.key}>{item.value}</option>;
                  }
                )}
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
        <label htmlFor={data.key}>{data.name}</label>
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
