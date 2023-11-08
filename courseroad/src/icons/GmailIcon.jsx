import * as React from "react";

function GmailIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_528_554)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M.147 11.635v7.455c0 .87.708 1.575 1.58 1.575h4.741v-4.938l-6.32-4.092zm15.389 2.983l-3.462 2.241-3.462-2.24v-8.47l3.462 2.222 3.462-2.222v8.47zm2.143 1.109v4.938h4.74c.874 0 1.581-.705 1.581-1.575v-7.455l-6.32 4.092zM24 9.139L17.68 13.23V4.773l1.452-.932C21.234 2.494 24 4 24 6.49V9.14zM6.468 4.773v8.458L.149 9.139V6.49c0-2.492 2.766-3.997 4.869-2.65l1.451.932z"
          fill="#226CE0"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_528_554">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default GmailIcon;