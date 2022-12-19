import * as React from "react"
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg"

function GradientButton(props) {
  return (
    <Svg
      preserveAspectRatio='none'
      style={{ position: "absolute" }}
      width="100%"
      height="100%"
      viewBox="0 0 107 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        width={107}
        height={44}
        // rx={12}
        fill="url(#paint0_linear_288_4007)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_288_4007"
          x1={0}
          y1={44}
          x2={54}
          y2={0.00000223353}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF9F0A" />
          <Stop offset={1} stopColor="#FF375F" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default GradientButton;