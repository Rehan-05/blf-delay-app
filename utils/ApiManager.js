import { CallApi, SubmitCallApi } from "./ApiCall";

export const getOperators = (method, url) => {
  return CallApi(method, url);
};
  export const submitFormData=(method, url, data)=>{
    return SubmitCallApi(method, url, data);
  }
