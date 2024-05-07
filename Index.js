import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import SelectInput from "./src/components/Selecter";
import GenericTextInput from "./src/components/TextInput";
import TimeDropdown from "./src/components/TimpePicker";
import Button from "./src/components/Buttons";
import ImagePicker from "./src/components/ImagePicker";
import Header from "./src/components/Header";

export default function Index() {
  let obj = {
    driverName: "",
    truck: "",
    delayStart: "",
    delayEnd: "",
    issue: "",
    pm: "delay",
    pmFault: "",
    trailer: "",
    trailerFault: "",
    delay: "",
    reason: "",
    comments: "",
    image: [],
  };
  const [selectedFruit, setSelectedFruit] = useState("");
  const [name, setName] = useState("");
  const [form, setForm] = useState(obj);
  const fruitOptions = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
    // more options...
  ];
  const issueOptions = [
    { label: "Delay", value: "delay" },
    { label: "Unplanned Maintenance", value: "maintenance" },
  ];
  const truckOptions = [
    { label: "TR0026", value: "tr0026" },
    { label: "TR0027", value: "tr0027" },
    { label: "TR0028", value: "tr0028" },
    { label: "TR0029", value: "tr0029" },
    { label: "TR0041", value: "tr0042" },
  ];
  const pmOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const pmFalutOptions = [
    { label: "Engine", value: "engine" },
    { label: "Tyres", value: "tyres" },
    { label: "Fuel", value: "fuel" },
    { label: "Add Blue", value: "add_blue" },
    { label: "Brakes", value: "brakes" },
  ];
  const trailerFault = [
    { label: "Hub Temprature", value: "hub_temprature" },
    { label: "Tyres", value: "tyres" },
    { label: "Brakes", value: "brakes" },
    { label: "Hydraulics", value: "hydraulics" },
    { label: "Suspension", value: "suspension" },
  ];
  const delayTypesOptions = [
    { label: "Operators", value: "operators" },
    { label: "Environment", value: "environment" },
    { label: "Accident", value: "accident" },
  ];
  const resonOptions = [
    { label: "Driver not available", value: "driver_not_available" },
    { label: "Fatigue", value: "fatigue" },
    { label: "Safety meeting", value: "safety_meeting" },
    { label: "Safety Stand down", value: "safety_stand_down" },
    { label: "Other", value: "other" },
  ];
  const handleFormChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };
  const getImageInfo = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      image: value,
    }));
  };
  const onSave = () => {
    console.log("im clicked");
  };
  console.log(form, "bvbv");
  return (
    <>
      <Header/>

    <ScrollView style={styles.container}>
      <View style={styles.common}>
        <View style={{ width: "25%",marginRight:18 }}>
          <GenericTextInput
            label="Driver Name"
            value={form.driverName}
            onChangeText={(text) => handleFormChange("driverName", text)}
            placeholder="Enter your name"
          />
        </View>
        <View style={{ width: "25%",marginRight:18  }}>
          <SelectInput
            label="Truck"
            options={truckOptions}
            selectedValue={form.truck}
            onValueChange={(value) => handleFormChange("truck", value)}
          />
        </View>
        <View style={{ width: "25%" ,marginRight:18 }}>
          <TimeDropdown
            placeholder={"start time "}
            label="Delay start"
            selectedValue={form.delayStart}
            onValueChange={(value) => handleFormChange("delayStart", value)}
          />
        </View>
        <View style={{ width: "25%" }}>
          <TimeDropdown
            placeholder={"End time  "}
            label="Delay End"
            selectedValue={form.delayEnd}
            onValueChange={(value) => handleFormChange("delayEnd", value)}
          />
        </View>
      </View>

      <View style={styles.common}>
        <View style={{ width: "33%" ,marginRight:18  }}>
          <SelectInput
            label="Issue"
            options={issueOptions}
            selectedValue={form.issue}
            onValueChange={(value) => handleFormChange("issue", value)}
          />
        </View>
        <View style={{ width: "33%", marginRight:18   }}>
          <SelectInput
            label="PM"
            options={pmOptions}
            selectedValue={form.pm}
            onValueChange={(value) => handleFormChange("pm", value)}
          />
        </View>
        <View style={{ width: "34%" }}>
          <SelectInput
            label="Fault"
            options={pmFalutOptions}
            selectedValue={form.pmFault}
            onValueChange={(value) => handleFormChange("pmFault", value)}
          />
        </View>
      </View>

      <View style={styles.common}>
        <View style={{ width: "50%" ,marginRight:18  }}>
          <SelectInput
            label="Trailer"
            options={fruitOptions}
            selectedValue={selectedFruit}
            onValueChange={setSelectedFruit}
          />
        </View>
        <View style={{ width: "50%" }}>
          <SelectInput
            label="Fault"
            options={trailerFault}
            selectedValue={form.trailerFault}
            onValueChange={(value) => handleFormChange("trailerFault", value)}
          />
        </View>
      </View>

      <View style={styles.common}>
        <View style={{ width: "50%" ,marginRight:18  }}>
          <SelectInput
            label="Delay"
            options={delayTypesOptions}
            selectedValue={form.delay}
            onValueChange={(value) => handleFormChange("delay", value)}
          />
        </View>
        <View style={{ width: "50%" }}>
          <SelectInput
            label="Reason"
            options={resonOptions}
            selectedValue={form.reason}
            onValueChange={(value) => handleFormChange("reason", value)}
          />
        </View>
      </View>

      <View style={styles.common}>
        <View style={{ width: "50%",marginRight:18   }}>
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
          <ImagePicker onPresspasspropsToParent={getImageInfo} />
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginVertical: 6,
        }}
      >
        <View style={{ marginRight: 6 }}>
          <Button title={"Save"} color={"#006400"} onPress={onSave} />
        </View>

        <View>
          <Button title={"Cancel"} color={"#8B0000"} />
        </View>
      </View>
    </ScrollView></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecedef80",
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 10,
    paddingTop: 20,
  },
  common: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    padding: 10,
  },
  comments: {
    height: 90,
    textAlignVertical: "top",
    borderWidth: 0.5,
    borderColor: '#ccc', // Added for clarity
    borderRadius: 10,
    paddingHorizontal: 5,
    fontSize: 17,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 6,
  },
});