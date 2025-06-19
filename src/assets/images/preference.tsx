import * as React from "react";
import Svg, { Mask, Rect, G, Path } from "react-native-svg";
const PreferenceSvg = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Mask
      id="mask0_304_663"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}
    >
      <Rect width={24} height={24} fill="#D9D9D9" />
    </Mask>
    <G mask="url(#mask0_304_663)">
      <Path
        d="M10.9625 20.8001V14.9876H12.8375V16.9501H20.8125V18.8251H12.8375V20.8001H10.9625ZM3.17499 18.8251V16.9501H9.08749V18.8251H3.17499ZM7.21249 14.8876V12.9251H3.17499V11.0501H7.21249V9.0751H9.08749V14.8876H7.21249ZM10.9625 12.9251V11.0501H20.8125V12.9251H10.9625ZM14.9 8.9751V3.1626H16.775V5.1376H20.8125V7.0126H16.775V8.9751H14.9ZM3.17499 7.0126V5.1376H13.025V7.0126H3.17499Z"
        fill="white"
      />
    </G>
  </Svg>
);
export default PreferenceSvg;
