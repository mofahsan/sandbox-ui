import yamlConfig from "./config";
const yaml = require("js-yaml");
const { v4: uuidv4 } = require("uuid");

// function used inside eval function
const buildTags = (tags) => {
  return Object.keys(tags).map((key) => {
    const subObject = tags[key];
    const list = Object.keys(subObject).map((subKey) => {
      const value = subObject[subKey];
      return {
        descriptor: {
          code: subKey,
        },
        value: typeof value === "string" ? value : value.toString(),
      };
    });

    return {
      descriptor: {
        code: key,
      },
      //   display: false,
      list: list,
    };
  });
};

const createNestedField = (obj, path, value) => {
  const keys = path.split(".");
  let currentObj = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const isArrayIndex = /\[\d+\]/.test(key); // Check if the key represents an array index

    if (isArrayIndex) {
      const arrayKey = key.substring(0, key.indexOf("["));
      const index = parseInt(key.match(/\[(\d+)\]/)[1], 10);

      if (!currentObj[arrayKey]) {
        currentObj[arrayKey] = [];
      }

      if (!currentObj[arrayKey][index]) {
        currentObj[arrayKey][index] = {};
      }

      currentObj = currentObj[arrayKey][index];
    } else {
      if (!currentObj[key]) {
        currentObj[key] = {};
      }
      currentObj = currentObj[key];
    }
  }

  currentObj[keys[keys.length - 1]] = value;
};

const createPayload = (config, action, data, session) => {
  console.log("session", session);
  const payload = {};
  const startPoint = "START";
  const endPoint = "END";
  const messageId = uuidv4();
  const paymentId = uuidv4();
  const timestamp = new Date().toISOString();

  config.mapping.map((item) => {
    if (eval(item.value) && (item.check ? eval(item.check) : true))
      createNestedField(
        payload,
        item.beckn_key,
        item.compute ? eval(item.compute) : eval(item.value)
      );
  });

  return payload;
};

const extractData = (obj, config, commData = {}) => {
  if (config?.commanData?.length) {
    config.commanData.map((item) => {
      createNestedField(
        commData,
        item.business_key,
        typeof item.value === "string"
          ? eval(item.value)
          : extractData(obj, item)
      );
    });
  }

  const item = config.value;
  if (item.type === "Array") {
    console.log("item Array", item);
    return eval(item.path)?.map((data) => {
      return extractData(data, item, commData);
    });
  } else if (item.type === "String") {
    let data = {};
    data[`${item.key}`] = eval(item.path);

    return { ...data, ...commData };
  } else if (item.type === "Object") {
    console.log("item Object", item);
    const data = {};
    item.value.map((val) => {
      data[val.key] = eval(val.value);
    });
    return { ...data, ...commData };
  }
};

const createBusinessPayload = (myconfig, obj) => {
  const payload = {};
  myconfig.map((conf) => {
    if (eval(conf.value)) {
      console.log('conf". "', conf, obj);
      const response = extractData(obj, conf);
      console.log("respojse", response);
      createNestedField(
        payload,
        conf.business_key,
        typeof conf.value === "string"
          ? eval(conf.value)
          : extractData(obj, conf).flat(Infinity)
      );
    }
  });

  return payload;
};

export const createBecknObject = (session, call, data) => {
  const parsedYaml = yaml.load(yamlConfig);
  const config = parsedYaml.protocol[call.config];
  const payload = createPayload(config, call.type, data, session);

  return payload;
};

export const extractBusinessData = (type, payload) => {
  const parsedYaml = yaml.load(yamlConfig);

  const result = createBusinessPayload(
    parsedYaml.protocol[type].mapping,
    payload
  );

  return result;
};
