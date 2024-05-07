import React from 'react'
import DriverForm from './src/components/MainPage/DriverForm'
// import * as ScreenOrientation from 'expo-screen-orientation';


const App = () => {
  
  React.useEffect(() => {
    (async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    })();
  }, []);
  
  return (
   <>
   <DriverForm/>
   </>
  )
}

export default App