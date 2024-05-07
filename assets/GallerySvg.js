import * as React from "react"
import Svg, { G, Path} from "react-native-svg"
import { View, useWindowDimensions } from 'react-native';

function GallerySvg(props) {
  const windowWidth = useWindowDimensions().width;
const windowHeight = useWindowDimensions().height;
  const responsiveWidth = windowWidth * 0.07; // 40% of device width
  const responsiveHeight = windowHeight * 0.07; // 5% of device height
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={responsiveWidth}
      height={responsiveHeight}
      viewBox="0 0 256 256"
      {...props}
    >
      <G
        stroke="none"
        strokeWidth={0}
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        fill="none"
        fillRule="nonzero"
        opacity={1}
      >
        <Path
          d="M85.414 11.8H4.586A4.586 4.586 0 000 16.386v57.228A4.586 4.586 0 004.586 78.2h80.828A4.586 4.586 0 0090 73.614V16.386a4.586 4.586 0 00-4.586-4.586zM36.475 25.917a7.1 7.1 0 110 14.202 7.1 7.1 0 110-14.202zm44.794 47.246H8.731a4.116 4.116 0 01-4.116-4.116l15.26-18.195c2.753-3.282 7.745-3.448 10.71-.355l.963 1.005c2.991 3.12 8.038 2.919 10.771-.43l7.714-9.451c2.809-3.441 8.034-3.542 10.973-.21l24.38 27.637a4.118 4.118 0 01-4.117 4.115z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#000"
          fillRule="nonzero"
          opacity={1}
        />
      </G>
    </Svg>
  )
}

export default GallerySvg
