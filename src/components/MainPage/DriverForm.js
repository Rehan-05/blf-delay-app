import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  BackHandler,
  Switch,
} from "react-native";
import SelectInput from "../Selecter";
import TimeDropdown from "../TimpePicker";
import Button from "../Buttons";
import ImagePicker from "../ImagePicker";
import Header from "../Header";
import { useFormState } from "../../Hooks/FormHooks";
import { CallApi } from "../../../utils/ApiCall";
import { ApisUrl } from "../../../utils/Constants";
import useFormValidation from "../../Hooks/ValidationHook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import NetInfo from "@react-native-community/netinfo";
import uuid from "react-native-uuid";

// =====================================================================
// =============== ** BLF Form Options Save ** =========================
// =====================================================================
import { 
  operatorOptions, 
  issueOptions,

  blfPlantOptions,
  blfPlant1Components,
  blfWobblerComponents,
  blfLoadingSystemComponents,
  blfLoadersComponents,
  blfOtherEquipmentComponents,

  blfPlant1Faults,
  blfWobblerFaults,
  blfLoadingSystemFaults,
  blfLoadersFaults,
  blfOtherEquipmentFaults,
  //blf Delays Options
  blfDelaysOptions,

 } from "./FormOptions";

// =====================================================================
// =============== ** BLF Form Api Manager Save ** =====================
// =====================================================================
import { getDelaysData, getDrivers, getPmFaults, getTrailerFalultOptions, getTrailerOptions, getTruckData, submitFormData } from "../../../utils/ApiManager";

// =====================================================================
// ==================== ** BLF Driver Form ** ==========================
// =====================================================================

const DriverForm = () => {

  let obj = {
    operatorName: "",
    issueMainOption: "",
    PlantOptions: "",
    PlantComponent: "",
    blfPlantFaults: "",
    blfDelaysOptions: "",
    comments: "",
    image: [],
    delayStartUTC: {
      $date: "",
    },
    delayEndUTC: {
      $date: "",
    },
  };


// =====================================================================
// ==================== ** BLF State Management ** =====================
// =====================================================================
  const { form, setForm, handleFormChange } = useFormState(obj);
  // const { errors, validateForm } = useFormValidation(form);
  const [selectedImage, setSelectedImage] = useState([]);
  const [name, setName] = useState();
  const [isConnected, setConnected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ButtonLoading, setButtonLoading] = useState(false);
  const [options, setOptions] = useState({
    operatorOptions: operatorOptions,
    issueOptions: issueOptions,
    blfPlantOptions: blfPlantOptions, 
    blfPlantComponent: [],
    blfPlantFaults: [],
    blfDelaysOptions: blfDelaysOptions,
  });


  const [showPlantFields, setPlantShowFields] = useState(false);
  const [showNonPlantFields, setNonPlantShowFields] = useState(false);
  

// =====================================================================
// ==================== ** BLF internet connection ** ==================
// =====================================================================
  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setConnected(state.isConnected);
    });
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      console.log("Internet connection restored, loading saved data...");
      loadSavedData();
    }
  }, [isConnected]);


// =====================================================================
// ======================= ** BLF Fetch Funtions ** ====================
// =====================================================================

  const fetchDataForOperators = async () => {
    const data = await getOperators("GET", ApisUrl.operators);
    if (data) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        operatorOptions: data?.data.map((driver) => ({
          label: driver?.Driver,
          value: driver?.Driver,
        })),
      }));
    }
  };

 const blfPlantOptions = async () => {
    const data = await CallApi("GET", ApisUrl.blfPlantOptions);
    if (data) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        blfPlantOptions: data?.data.map((plant) => ({
          label: plant,
          value: plant,
        })),
      }));
    }
  };

// =====================================================================
// ==================== ** BLF useEffect connection ** =================
// =====================================================================

  useEffect(() => {
    fetchDataForOperators();
  }, []);


  // useEffect(() => {
    // const fetchData = async () => {
    //   // const netInfoState = await NetInfo.fetch();
    //   // if (!netInfoState.isConnected) {
    //     switch (form.blfPlantOptions) {
    //       case "Plant 1":
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantComponent: blfPlant1Components,
    //         }));
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantFaults: blfPlant1Faults,
    //         }));
    //         break;
    //       case "Wobbler":
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantComponent: blfWobblerComponents,
    //         }));
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantFaults: blfWobblerFaults,
    //         }));
    //         break;
    //       case "Loading System":
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantComponent: blfLoadingSystemComponents,
    //         }));
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantFaults: blfLoadingSystemFaults,
    //         }));
    //         break;
    //       case "Loaders":
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantComponent: blfLoadersComponents,
    //         }));
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantFaults: blfLoadersFaults,
    //         }));
    //         break;
    //       case "Other Equipment":
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantComponent: blfOtherEquipmentComponents,
    //         }));
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantFaults: blfOtherEquipmentFaults,
    //         }));
    //         break;
    //       default:
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantComponent: [],
    //         }));
    //         break;
    //     }
    //   // } else {
    //   //   await handleBlfIssueChange(form.blfPlantOptions);
        
    //   // }
    // };

    // const handleBlfIssueChange = async (selectedDelay) => {
    //   setLoading(true);
    //   if(form.blfPlantOptions){
    //     if (selectedDelay === "Plant 1") {
    //       const data = await CallApi("GET", ApisUrl.blfPlant1Components);
    //       if (data) {
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantComponent: data?.data.map((component) => ({
    //             label: component,
    //             value: component,
    //           })),
    //         }));
    //       }
    //       const data1 = await CallApi("GET", ApisUrl.blfPlant1Faults);
    //       if (data1) {
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantFaults: data1?.data.map((component) => ({
    //             label: component,
    //             value: component,
    //           })),
    //         }));
    //       }
    //     } else if (selectedDelay === "Wobbler") {
    //       const data = await CallApi("GET", ApisUrl.blfWobblerComponents);
    //       if (data) {
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantComponent: data?.data.map((component) => ({
    //             label: component,
    //             value: component,
    //           })),
    //         }));
    //       }
    //       const data1 = await CallApi("GET", ApisUrl.blfWobblerFaults);
    //       if (data1) {
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantFaults: data1?.data.map((component) => ({
    //             label: component,
    //             value: component,
    //           })),
    //         }));
    //       }
    //     } else if (selectedDelay === "Loading System") {
    //       const data = await CallApi("GET", ApisUrl.blfLoadingSystemComponents);
    //       if (data) {
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantComponent: data?.data.map((component) => ({
    //             label: component,
    //             value: component,
    //           })),
    //         }));
    //       }
    //       const data1 = await CallApi("GET", ApisUrl.blfLoadingSystemFaults);
    //       if (data1) {
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantFaults: data1?.data.map((component) => ({
    //             label: component,
    //             value: component,
    //           })),
    //         }));
    //       }
    //     } else if (selectedDelay === "Loaders") {
    //       const data = await CallApi("GET", ApisUrl.blfLoadersComponents);
    //       if (data) {
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantComponent: data?.data.map((component) => ({
    //             label: component,
    //             value: component,
    //           })),
    //         }));
    //       }
    //       const data1 = await CallApi("GET", ApisUrl.blfLoadersFaults);
    //       if (data1) {
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantFaults: data1?.data.map((component) => ({
    //             label: component,
    //             value: component,
    //           })),
    //         }));
    //       }
    //     } else if (selectedDelay === "Other Equipment") {
    //       const data = await CallApi("GET", ApisUrl.blfOtherComponentEquipment);
    //       if (data) {
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantComponent: data?.data.map((component) => ({
    //             label: component,
    //             value: component,
    //           })),
    //         }));
    //       }
    //       const data1 = await CallApi("GET", ApisUrl.blfOtherEquipmentFaults);
    //       if (data1) {
    //         setOptions((prevOptions) => ({
    //           ...prevOptions,
    //           blfPlantFaults: data1?.data.map((component) => ({
    //             label: component,
    //             value: component,
    //           })),
    //         }));
    //       }
    //     }
      
    //   } else {
    //     setOptions((prevOptions) => ({
    //       ...prevOptions,
    //       blfPlantComponent: [],
    //     }));
    //     setOptions((prevOptions) => ({
    //       ...prevOptions,
    //       blfPlantFaults: [],
    //     }));
    //     setLoading(false);
    //   }
    // };

   
    // console.log("form.issueOption issueOptions", form.issueOptionsrrr)
    // if (form.issueOptions) {
    //   // Logic to update showPlantFields and showNonPlantFields
    //   if (form.issueOptions === "Unplanned maintenance") {
    //     setPlantShowFields(true);
    //     setNonPlantShowFields(false);
    //   } else if (form.issueOptions === "Delay Impacting Production") {
    //     setNonPlantShowFields(true);
    //     setPlantShowFields(false);
    //   } else {
    //     setPlantShowFields(false);
    //     setNonPlantShowFields(false);
    //   }
    // } else {
    //   setPlantShowFields(false);
    //   setNonPlantShowFields(false);
    // }

    // fetchData();
  // }, [form.issueMainOption]);

  useEffect(() => {
    console.log("form.issueOptions:", form.issueMainOption);
    switch (form.issueMainOption) {
      case "Unplanned maintenance":
        setPlantShowFields(true);
        setNonPlantShowFields(false);
        break;
      case "Delay Impacting Production":
        setPlantShowFields(false);
        setNonPlantShowFields(true);
        break;
      default:
        setPlantShowFields(false);
        setNonPlantShowFields(false);
        break;
    }


  }, [form.issueMainOption]);

// =====================================================================
// ==================== ** BLF useEffect connection ** =================
// =====================================================================

  const onSaveWhenConnectionRestore = async (allStoredData) => {
    let allSavedSuccessfully = true;

    const dataToSave = Array.isArray(allStoredData)
      ? allStoredData
      : [allStoredData];
    for (const mergedForm of dataToSave) {
      try {
        let response = await submitFormData(
          "POST",
          ApisUrl.formSubmit,
          mergedForm
        );
        if (response.status !== 200) {
          allSavedSuccessfully = false;
          alert(JSON.stringify(mergedForm, null, 2));
        }
      } catch (error) {
        allSavedSuccessfully = false; // Ensure failure on error
      }
    }

    if (allSavedSuccessfully) {
      alert("Previous Form Data Saved Successfully");
      onClear();
      onCancel();
    }
  };

// =====================================================================
// =============== ** BLF File upload ** ===============================
// ===================================================================== 

  const uploadImage = async (uri) => {
    const blobUUID = uuid.v4();
    const sasToken =
      "sv=2023-01-03&ss=btqf&srt=sco&spr=https%2Chttp&st=2024-04-10T01%3A14%3A11Z&se=2034-12-31T01%3A14%3A00Z&sp=rwdxftlacup&sig=ELUqBBEeDSVm%2Fq1dnK%2FNfoJu%2BtcfYIPld%2F9Pj8TCjmQ%3D";
    const containerName = "delay";
    const accountName = "metroappstore";
    const blobName = `uploaded_image_${blobUUID}.jpg`;
    try {
      console.log("Uploading image to Azure Blob Storage...", uri);
      const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}&time=${new Date().getTime()}`;
      
      console.log("here is the url", url)
      // Convert the URI to a blob
      const response = await fetch(uri);

      console.log("here is the responsedd", response)

      const blobData = await response.blob();
  
      console.log("here is the dblobData", blobData)

      // Upload the blob to Azure Blob Storage
      const azureResponse = await fetch(url, {
        method: "PUT",
        body: blobData,
        headers: {
          "Content-Type": "image/jpeg", // Adjust content type based on image format
          "x-ms-blob-type": "BlockBlob",
        },
      });
  
      if (!azureResponse.ok) {
        throw new Error(`Upload failed: ${azureResponse.statusText}`);
      }
  
      console.log("Image uploaded successfully!", "URL:", url);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };
  
// =====================================================================
// ==============-= ** BLF File Save ** ================================
// ===================================================================== 

  const onSave = async () => {
    try {
      if(!form.delayStartUTC?.$date){
          return Alert.alert("Error","please select delay start")
      }
      if(!form.delayEndUTC?.$date){
        return Alert.alert("Error","please select delay end")
    }

    setButtonLoading(true);
      let imageArr =  form.image || [];

      //conveert object into arrat
      if (!Array.isArray(imageArr)) {
        imageArr = [imageArr];
      }

     
      const netInfoState = await NetInfo.fetch();
      const storedData = await AsyncStorage.getItem("formData");
      const currentData = storedData ? JSON.parse(storedData) : [];
      currentData.push(form);
      await AsyncStorage.setItem("formData", JSON.stringify(currentData));

      if (!netInfoState.isConnected) {
        onClear();
        Alert.alert(
          "Save Successful",
          "Data is saved locally. Please check your internet connection.",
          [{ text: "OK", onPress: () => BackHandler.exitApp() }],
          { cancelable: false }
        );
        setButtonLoading(false);
        return;
      }

      if (imageArr.length > 0) {
     
        const uploadPromises = imageArr.map((img) => uploadImage(img.uri));
        const uploadedImageUris = await Promise.all(uploadPromises);
  
        console.log("Uploaded image URIs:", uploadedImageUris);
  
        // Update the form data with the uploaded image URIs
        form.image = uploadedImageUris.map((uri, index) => ({
          fileName: imageArr[index].fileName,
          mimeType: imageArr[index].mimeType,
          uri: uri,
        }));
      }

      const updatedFormWithDateTime = {
        ...form,
        createdAt: {
          $date: new Date().toISOString(),
        },
      };
      console.log(imageArr, "imageArr", updatedFormWithDateTime);

      setForm(updatedFormWithDateTime);

      let response = await submitFormData(
        "POST",
        ApisUrl.formSubmit,
        updatedFormWithDateTime
      );
      if (response.status == 200) {
        console.log("Saveeeeeeeeeeeeeed");
        onClear();
        onCancel();
        Alert.alert(
          "Save Successful",
          "Form data saved Successfully.",
          [
            {
              text: "OK",
              onPress: () => {
                BackHandler.exitApp();
              },
            },
          ],
          { cancelable: false }
        );
        setButtonLoading(false);
      }
    } catch (error) {
      setButtonLoading(false);
      alert("An Error Occurred.");
      console.log(error, "error");
    }
  };

// =====================================================================
// =============== ** BLF onLoad Save ** ===============================
// ===================================================================== 

  const loadSavedData = async () => {
    try {
      const savedData = await AsyncStorage.getItem("formData");
      const allStoredData = savedData ? JSON.parse(savedData) : [];
      // console.log("All stored data after update:", allStoredData);

      if (
        Array.isArray(allStoredData) &&
        allStoredData.length > 0 &&
        isConnected
      ) {
        const lastRecord = allStoredData[allStoredData.length - 1];

        setForm(lastRecord);
        const selectedImage = lastRecord.image ? lastRecord.image : null;
        setSelectedImage(selectedImage);
        const imageName = selectedImage ? selectedImage.fileName : "";
        setName(imageName);
        onSaveWhenConnectionRestore(allStoredData);
      }
    } catch (error) {
      console.error("Error loading saved form data:", error);
    }
  };

// =====================================================================
// =============== ** BLF onCancel Save ** =============================
// =====================================================================

  const onCancel = async () => {
    try {
      await AsyncStorage.removeItem("formData");
      handleFormChange("operatorName", "");
      handleFormChange("issueMainOption", "");
      handleFormChange("delayStartUTC.$date", "");
      handleFormChange("delayEndUTC.$date", "");
      handleFormChange("PlantOptions", "");
      handleFormChange("PlantComponent", "");
      handleFormChange("blfDelaysOptions", "");
      
     
      handleFormChange("comments", "");
      handleFormChange("image", []);
      setSelectedImage([]);
    } catch (error) {
      console.error("Error removing form data:", error);
    }
  };

// =====================================================================
// ================ ** BLF onClear Save ** =============================
// =====================================================================  

  const onClear = async () => {
    handleFormChange("operatorName", "");
    handleFormChange("issueMainOption", "");
    handleFormChange("delayStartUTC.$date", "");
    handleFormChange("delayEndUTC.$date", "");
    handleFormChange("PlantOptions", "");
    handleFormChange("PlantComponent", "");

    handleFormChange("blfDelaysOptions", "");

   
    handleFormChange("comments", "");
    handleFormChange("image", []);
    setSelectedImage([]);
  };
  

  return (
    <>
      <Header />

      <ScrollView style={styles.container}>
     
    
        <View style={styles.common}>
          <View style={{ width: "25%", marginRight: 18 }}>
            <SelectInput
              label="Operator"
              options={options.operatorOptions}
              selectedValue={form.operatorName}
              placeholder="Enter your name"
              onValueChange={(value) => handleFormChange("operatorName", value)}
            />
          </View>
          <View style={{ width: "25%", marginRight: 18 }}>
            <SelectInput
              label="Issue"
              options={options.issueOptions}
              selectedValue={form.issueMainOption}
              onValueChange={(value) => handleFormChange("issueMainOption", value)}
            />
          </View>
          <View style={{ width: "25%", marginRight: 18 }}>
            <TimeDropdown
              placeholder={"Start time"}
              label="Delay Start"
              selectedValue={form.delayStartUTC?.$date?.slice(11, 16)}
              onValueChange={(value) =>
                handleFormChange("delayStartUTC.$date", value)
              }
            />
          </View>
          <View style={{ width: "25%" }}>
            <TimeDropdown
              placeholder={"Delay End"}
              label="Delay End"
              selectedValue={form.delayEndUTC?.$date?.slice(11, 16)}
              onValueChange={(value) =>
                handleFormChange("delayEndUTC.$date", value)
              }
            />
          </View>
        </View>
     

      
        {showPlantFields && (
        <View style={styles.common}>
          <View style={{ width: "33%"}}>
            <SelectInput
              label="Plant"
              options={options.blfPlantOptions}
              selectedValue={form.PlantOptions}
              onValueChange={(value) => handleFormChange("PlantOptions", value)}
            />
          </View>
          <View style={{ width: "2%" }}></View>
          <View style={{ width: "33%"}}>
            <SelectInput
              label="Component"
              options={options.blfPlantComponent}
              selectedValue={form.PlantComponent}
              onValueChange={(value) => handleFormChange("PlantComponent", value)}
            />
          </View>
          <View style={{ width: "2%" }}></View>
          <View style={{ width: "33%" }}>
            <SelectInput
              label="Fault"
              options={options.blfPlantFaults}
              selectedValue={form.blfPlantFaults}
              onValueChange={(value) => handleFormChange("blfPlantFaults", value)}
            />
          </View>
        </View>
        )}

        {showNonPlantFields && (
         <View style={styles.common}>
          <View style={{ width: "33%"}}>
            <SelectInput
              label="Non Plant Delay"
              options={blfDelaysOptions}
              selectedValue={form.blfDelaysOptions}
              onValueChange={(value) => handleFormChange("blfDelaysOptions", value)}
            />
          </View>
          <View style={{ width: "2%" }}></View>
          <View style={{ width: "33%" }}>
            <SelectInput
              label="Issue"
              options={options?.issueOptions}
              selectedValue={form.issueOptions}
              onValueChange={(value) => handleFormChange("issueOptions", value)}
            />
          </View>
          <View style={{ width: "2%" }}></View>
          <View style={{ width: "33%" }}>
            <SelectInput
              label="Cause"
              options={options?.issueOptions}
              selectedValue={form.issueOptions}
              onValueChange={(value) => handleFormChange("issueOptions", value)}
            />
          </View>
        </View>
        )}

        <View style={styles.common}>
          <View style={{ width: "50%", marginRight: 18 }}>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>Comments</Text>
            <TextInput
              multiline={true}
              numberOfLines={10}
              style={styles.comments}
              value={form.comments}
              onChangeText={(text) => handleFormChange("comments", text)}
            />
          </View>
          <View style={{ width: "50%" }}>
            <ImagePicker
              setSelectedImage={setSelectedImage??setSelectedImage}
              selectedImage={selectedImage??selectedImage}
              name={name}
              setName={setName}
              onPresspasspropsToParent={(text) => {
                handleFormChange("image", text);
              }}
              // existinImage={form?.image}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 6,
          }}
        >
          {/* Left side container */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                height: 70,
                width: 90,
                borderRadius: 50,
                marginLeft: 20,
              }}
              source={require("../../../assets/CravernLogo.png")}
            />
            <Image
              style={{
                resizeMode: "contain",
                height: 70,
                width: 120,
                borderRadius: 50,
              }}
              source={require("../../../assets/metro.png")}
            />
          </View>

          {/* Right side container */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: 6 }}>
            <Button title={"Save"} color={"#006400"} onPress={onSave} loading={ButtonLoading} />
            </View>
            <View>
              <Button title={"Cancel"} color={"#8B0000"} onPress={onCancel} />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default DriverForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecedef80",
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 10,
    width: "100%",
  },
  common: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  thirdCommon: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: 10,
  },
  lastCommon: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  comments: {
    height: 90,
    textAlignVertical: "top",
    borderWidth: 0.5,
    borderColor: "#ccc", // Added for clarity
    borderRadius: 10,
    paddingHorizontal: 5,
    fontSize: 17,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 6,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
