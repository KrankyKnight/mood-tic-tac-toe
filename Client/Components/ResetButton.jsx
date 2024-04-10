import React from "react";

const ResetButton = ({resetType, resetSelection, buttonLabel}) => {

  return (
    <button className={`${resetType} word-glow`} onClick={resetSelection}>
      {buttonLabel}
    </button>
  );
};

export default ResetButton;