import React, { useState } from 'react';
  import { StyleSheet, View, Text } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const DropdownComponent = ({ label, options, selectedValue, onValueChange }) => {
    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
        </View>
      );
    };
  
    return (
      <View style={{width:'100%',marginRight:10}}>
        {label && <Text style={{ fontSize: 18 }}>{label}</Text>}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={options}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select "
          searchPlaceholder="Search..."
          value={selectedValue}
          onChange={item => onValueChange(item.value)}
          renderItem={renderItem}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    main:{

    },
    dropdown: {
      marginVertical:8,
      height: 48,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      borderRadius:10,
      elevation: 10,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 17,
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
  });