//swr
import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
//
const validateString = (parametersString) => {
  function startsWithNumber(str) {
    return /^[0-9]/.test(str);
  }
  function startsWithTrue(str) {
    return /^(true|tru|tr|t)/i.test(str);
  }
  function startsWithFalse(str) {
    return /^(false|fal|fa|f)/i.test(str);
  }
  function startsWithNull(str) {
    return /^(null|nul|nu|n)/i.test(str);
  }
  function isJsonLike(str) {
    var JSON_START = /^\[|^\{(?!\{)/;
    var JSON_ENDS = {
      '[': /]$/,
      '{': /}$/
    };
    var jsonStart = str.match(JSON_START);
    return jsonStart && JSON_ENDS[jsonStart[0]].test(str);
  }
  //since number, true, false and null are json primitives JSON.parse will consider a string starting with something related to them as a JSON with syntax error, but in this context it is not true 
  //a string starting with something related to these primitive has to accecpted as a valid normal string
  if (
    startsWithNumber(parametersString) ||
    startsWithTrue(parametersString) ||
    startsWithFalse(parametersString) ||
    startsWithNull(parametersString)
  ) {
    return { status: true, type: "string" };
  }
  try {
    JSON.parse(parametersString);
  } catch (error) {
    if (error.message.toLowerCase().includes("unexpected") && !isJsonLike(parametersString)) {
      try {
        JSON.parse(`"${parametersString}"`);
        return { status: true, type: "string" };
      } catch (error) {
        return { status: false, error: error };
      }
    } else {
      return { status: false, error: error };
    }
  }
  return { status: true, type: "JSON string" };
};
//define fetcher
const swrFetcher = async ([projectId, weblite, parameters]) => {
  //build weblite url
  const url = `https://web1.sqlitecloud.io:8443/weblite/v1/${projectId}/${weblite}`
  let response;
  //fetch request change if there are or not parameters
  if (!parameters) {
    //if there aren't parameters it is a GET request
    response = await fetch(url, {
      headers: {
        // Authentication: `Bearer ${this.#apiKey}`
      }
    });
  } else {
    //if there are parameters it is a POST request
    //the body of the post request has to be a JSON string
    if (!Array.isArray(parameters)) {
      //if parameters isn't an array
      const validationResult = validateString(parameters);
      if (validationResult.status) {
        if (validationResult.type == "string") {
          parameters = `["${parameters}"]`;;
        }
        if (validationResult.type == "JSON string") {
          parameters = parameters;
        }
      } else {
        let error = validationResult.error;
        error.info = "Weblite: check paramaters provided to weblite hook";
        throw error;
      }
    } else {
      //if parameters is already an array, stringify it 
      parameters = JSON.stringify(parameters);
    }
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authentication: `Bearer ${this.#apiKey}`
      },
      body: parameters
    });
  }
  //if res.ok is not true this mean that an error occured
  if (!response.ok) {
    let error = new Error('An error occurred while fetching data for weblite: ' + weblite);
    error.info = await response.json();
    error.status = response.status;
    throw error
  } else {
    const json = await response.json();
    return json;
  }
}
//define useWeblite
export default function useWeblite(projectId, weblite, parameters) {
  const { data, error, isValidating } = useSWR(
    () => projectId && weblite && [projectId, weblite, parameters],
    swrFetcher
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    isValidating
  }
}
//define useUpdateWeblite
function useUpdateWeblite(triggerUpdate, projectId, weblite, parameters) {
  const { mutate } = useSWRConfig();
  useEffect(() => {
    if (projectId && weblite) {
      mutate([projectId, weblite, parameters])
    }
  }, [triggerUpdate])
}
export { useUpdateWeblite };
//formSubmit
const formSubmit = async (formEl, projectId, weblite) => {
  //get form data
  const formData = new FormData(formEl);
  //iterate through the checkboxes and add the unchecked ones to the FormData object
  // formEl.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  //   console.log(checkbox) //TOGLI
  //   if (!checkbox.checked) {
  //     formData.append(checkbox.name, "false");
  //   }
  // });

  //get the number of key-value pairs in the form
  const formDataEntriesArray = Array.from(formData.entries());
  const formDataLength = formDataEntriesArray.length;
  //init variable containing new filter parameters as string or array based on how much parameters form has
  let newFilterParameters = formDataLength === 1 ? "" : [];
  //object for key-value pairs extracted from the form
  const formDataObj = {};
  //extract all filter parameters
  formData.forEach((value, key) => {
    //build filter parameters string or array
    if (formDataLength === 1) {
      newFilterParameters = value;
    } else {
      newFilterParameters.push(value);
    }
    //build form data object
    if (formDataObj[key]) {
      if (Array.isArray(formDataObj[key])) {
        formDataObj[key] = formDataObj[key].push(value);
      } else {
        let newVal = [];
        newVal.push(formDataObj[key]);
        newVal.push(value);
        formDataObj[key] = newVal;
      }
    } else {
      formDataObj[key] = value;
    }
  });
  if (formDataLength > 1) {
    newFilterParameters = JSON.stringify(newFilterParameters);
  }
  await swrFetcher([projectId, weblite, newFilterParameters]);
}
export { formSubmit };
//callWeblite
const callWeblite = async (projectId, weblite, newFilterParameters) => {
  await swrFetcher([projectId, weblite, newFilterParameters]);
}
export { callWeblite };