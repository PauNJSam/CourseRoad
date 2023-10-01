import * as React from "react";

function BackIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.71 15.88L10.83 12l3.88-3.88a.996.996 0 10-1.41-1.41L8.71 11.3a.996.996 0 000 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"
        fill="#323232"
      />
    </svg>
  );
}

export default BackIcon;