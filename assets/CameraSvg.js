import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
import { View, useWindowDimensions } from 'react-native';


function SvgComponent(props) {
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
          d="M81.039 21.623h-4.877a8.309 8.309 0 01-7.335-4.432l-1.472-2.777a10.417 10.417 0 00-9.197-5.557H31.842a10.417 10.417 0 00-9.197 5.557l-.464.876-1.008 1.901a8.338 8.338 0 01-4.499 3.93 8.236 8.236 0 01-2.836.502H8.961C4.012 21.623 0 25.668 0 30.657v41.452c0 4.989 4.012 9.034 8.961 9.034H81.04a8.87 8.87 0 004.962-1.51A9.045 9.045 0 0090 72.109V30.657c0-4.989-4.012-9.034-8.961-9.034zm-17.233 35.63a20.448 20.448 0 01-4.488 6.852c-3.664 3.695-8.726 5.98-14.318 5.98-11.183 0-20.249-9.14-20.249-20.415a20.431 20.431 0 015.931-14.435 20.271 20.271 0 016.797-4.525A20.056 20.056 0 0145 29.255c11.183 0 20.249 9.14 20.249 20.415a20.5 20.5 0 01-1.443 7.583zm13.535-20.731c-1.914 0-3.465-1.564-3.465-3.494 0-1.929 1.551-3.493 3.465-3.493s3.465 1.564 3.465 3.493c0 1.93-1.551 3.494-3.465 3.494z"
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
        <Path
          d="M54.951 53.682a10.825 10.825 0 01-2.375 3.626A10.636 10.636 0 0145 60.472c-5.917 0-10.714-4.836-10.714-10.802 0-2.983 1.199-5.683 3.138-7.638a10.704 10.704 0 013.597-2.394c1.23-.497 2.573-.77 3.98-.77 5.917 0 10.714 4.836 10.714 10.802a10.877 10.877 0 01-.764 4.012z"
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

export default SvgComponent
