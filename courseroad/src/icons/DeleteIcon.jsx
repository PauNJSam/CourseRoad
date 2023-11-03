import * as React from "react";

function DeleteIcon(props) {
  return (
    <svg
      className="delete-icon"
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14 10v7m-4-7v7M4 6h16m-2 0v11.8c0 1.12 0 1.68-.218 2.108a2 2 0 01-.874.874C16.48 21 15.92 21 14.8 21H9.2c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C6 19.48 6 18.92 6 17.8V6h12zm-2 0H8c0-.932 0-1.398.152-1.765a2 2 0 011.082-1.083C9.602 3 10.068 3 11 3h2c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C16 4.602 16 5.068 16 6z"
        stroke="#2A2B2E"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DeleteIcon;