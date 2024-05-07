import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const GenericTextInput = ({
  value,
  onChangeText,
  placeholder,
  label,
  style,
  ...otherProps
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.textInput, style]}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width:'100%'
  },
  label: {
    marginBottom: 5,
    fontSize:18,
    paddingLeft:1
  },
  textInput: {
      height: 50,
      backgroundColor: '#fff',
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
      elevation: 2,
      fontSize:18,
      
  },
});

export default GenericTextInput;
