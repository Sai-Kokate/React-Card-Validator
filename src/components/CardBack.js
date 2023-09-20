import React from "react";

const CardBack = ({ cardCVC }) => {
  console.log("inside back:", cardCVC);
  return <div>{cardCVC}</div>;
};

export default CardBack;
