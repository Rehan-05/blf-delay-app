import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const TimeDropdown = ({ label, selectedValue, onValueChange, placeholder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(selectedValue || "");
  const currentDate = new Date();

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const handleValueChange = (newValue) => {
    const dateOnly = currentDate.toISOString().slice(0, 11);
    console.log(dateOnly+newValue+"+10","{{{{{");
    onValueChange(dateOnly+newValue+"+10");
  };

  const generateTimeOptions = () => {
    const options = [];
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = Math.floor(currentTime.getMinutes() / 15) * 15;

    const currentHourFormatted =
      currentHour < 10 ? `0${currentHour}` : currentHour.toString();
    const currentMinuteFormatted =
      currentMinute < 10 ? `0${currentMinute}` : currentMinute.toString();
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hourFormatted = hour < 10 ? `0${hour}` : hour.toString();
        const minuteFormatted = minute < 10 ? `0${minute}` : minute.toString();
        options.push({
          label: `${hourFormatted}:${minuteFormatted}`,
          value: `${hourFormatted}:${minuteFormatted}`,
        });
      }
    }
    const currentIndex = options.findIndex(
      (option) =>
        option.value === `${currentHourFormatted}:${currentMinuteFormatted}`
    );
    if (currentIndex !== -1) {
      const beforeCurrent = options.slice(0, currentIndex);
      const afterCurrent = options.slice(currentIndex);
      options.splice(0, options.length, ...afterCurrent, ...beforeCurrent);
    }

    return options;
  };
  const timeOptions = generateTimeOptions();
  // console.log(searchText, "searctext");
  return (
    <View>
      {label && <Text style={{ fontSize: 18 }}>{label}</Text>}
      {true ? (
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={timeOptions}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={value}
          onChange={(item) => handleValueChange(item.value)}
        />
      ) : (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input} // Applied new input style
              defaultValue={value}
              onChangeText={handleValueChange}
              autoFocus={true}
              placeholder="Enter Time"
            />
          </View>
        </>
      )}
    </View>
  );
};

// Add styles for your dropdown here
const styles = StyleSheet.create({
  main: {},
  dropdown: {
    marginVertical: 8,
    height: 48,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderRadius: 10,
    elevation: 10,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 18,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  inputContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    padding: 3,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.41,
    elevation: 5, // Adjusted for a more subtle effect compared to the dropdown
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#000",
    padding: 7,
    shadowColor: "#000",

    // elevation: 2,
    // Assuming you might want to align the text size with inputSearchStyle
  },
  iconContainer: {
    marginLeft: 5, // Aligning with the new icon style marginRight
  },
  cancelIcon: {
    // width: 20,
    // height: 20,
    backgroundColor: "#000",
  },

  closeIcon: {
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  closeIconText: {
    fontSize: 20,
    color: "grey",
  },
});

export default TimeDropdown;
