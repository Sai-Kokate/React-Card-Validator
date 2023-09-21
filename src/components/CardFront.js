import React from "react";

const CardFront = ({ cardDetails }) => {
  return (
    <div className="card1">
      <div className="card1-div1">
        <h2>
          {" "}
          {cardDetails.cardNumber
            ? cardDetails.cardNumber
            : "0000 0000 0000 0000"}{" "}
        </h2>
      </div>
      <div className="card1-div2">
        <div>
          <h2> {cardDetails.name ? cardDetails.name : "JANE APPLESSED"} </h2>
        </div>
        <div>
          <h2>
            {cardDetails.expiryMonth ? cardDetails.expiryMonth : "00"} /{" "}
            {cardDetails.expiryYear ? cardDetails.expiryYear : "00"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CardFront;
