import React from "react";

const CardBack = ({ cardCVC }) => {
  return (
    <div className="card2">
      <div className="card2-div1"></div>
      <div className="card2-div2">
        <p> {cardCVC ? cardCVC : "000"} </p>
      </div>
    </div>
  );
};

export default CardBack;
