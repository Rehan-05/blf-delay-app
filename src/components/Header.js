import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:20}}>BLF Delay App</Text>
    </View>
  )
}
const styles=StyleSheet.create({
container:{
    height:'8%',
    width:"100%",
    backgroundColor: '#D3D3D3',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
   paddingTop:5

}

})
export default Header