// useFormState.js
import { useState } from 'react';

const useFormState = (initialState) => {
  const [form, setForm] = useState(initialState);

  function handleFormChange(field, value) {
    setForm((prev) => {
      const fields = field.split('.');
      const lastField = fields.pop();
      const nested = fields.reduce((acc, cur) => {
        if (acc[cur] === undefined) acc[cur] = {};
        return acc[cur];
      }, prev);
      nested[lastField] = value;
      return { ...prev };
    });
  }
  

  return { form, setForm, handleFormChange };
};

// export default useFormState;
// useImageInfo.js
const useImageInfo = (initialImageInfo) => {

    const [imageInfo, setImageInfo] = useState(initialImageInfo || []);
  
    const getImageInfo = (value) => {
      setImageInfo(value);
    };

    return { imageInfo, getImageInfo , setImageInfo};
  }

export  {useImageInfo,useFormState};
