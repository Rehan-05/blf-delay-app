import { useEffect, useState } from "react";

const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.driverName) {
      newErrors.driverName = "Please enter the driver's name";
    }

    if (!formData.truck) {
      newErrors.truck = "Please select a truck";
    }

    if (!formData.delayStart) {
      newErrors.delayStart = "Please select the delay start time";
    }

    if (!formData.delayEnd) {
      newErrors.delayEnd = "Please select the delay end time";
    }

    if (!formData.delay) {
      newErrors.delay = "Please select a delay";
    }

    if (!formData.reason) {
      newErrors.reason = "Please select a reason for the delay";
    }
    if (!formData.pmFault) {
      newErrors.pmFault = "Please select a PM fault";
    }

    if (!formData.trailer) {
      newErrors.trailer = "Please select a trailer";
    }

    if (!formData.trailerFault) {
      newErrors.trailerFault = "Please select a trailer fault";
    }
    if (!formData.comments) {
      newErrors.comments = "Please enter comments";
    }

    if (formData.image.length === 0) {
      newErrors.image = "Please select at least one image";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // useEffect(() => {
  //   const isValid = Object.keys(errors).length === 0;
  //   // console.log("Errors have been updated:", errors);
  // }, [errors]);
  return { errors, validateForm };
};

export default useFormValidation;
