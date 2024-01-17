import { Controller } from "react-hook-form";
import { FormFieldWrapper } from "../styled/renderInput.style";

const RenderInput = ({ data, control, errors }) => {
  console.log("errors", errors);

  const isJSON = (value) => {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  };

  if (data.type === "text") {
    return (
      <FormFieldWrapper>
        <label htmlFor={data.key}>{data.name}</label>
        <Controller
          name={data.key}
          control={control}
          defaultValue=""
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
          defaultValue=""
          rules={{ required: data.errorText, validate: isJSON }}
          render={({ field }) => (
            <>
              <select {...field}>
                {data?.selectFields?.map((item) => {
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
        <label htmlFor={data.key}>{data.name}</label>
        <Controller
          name={data.key}
          control={control}
          defaultValue=""
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
