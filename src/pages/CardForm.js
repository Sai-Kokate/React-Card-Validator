import React, { useState } from "react";
import CardBack from "../components/CardBack";
import CardFront from "../components/CardFront";
import toast, { Toaster } from "react-hot-toast";

const CardForm = () => {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  // Error Messages
  const [nameError, setNameError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [expiryMonthError, setExpiryMonthError] = useState("");
  const [expiryYearError, setExpiryYearError] = useState("");
  const [cvcError, setCvcError] = useState("");

  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (isValid()) {
      toast.success("Card Details Submitted!");
    }
  };

  const validateName = () => {
    if (cardholderName.trim() === "") {
      setNameError("Name is required");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateCardNumber = () => {
    const cardNumberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      setCardNumberError("Invalid card number format");
      return false;
    }
    if (cardNumber.trim() === "") {
      setCardNumberError("Card Number is required");
      return false;
    }
    setCardNumberError("");
    return true;
  };

  const validateExpiryMonth = () => {
    const month = parseInt(cardMonth, 10);
    const currentMonth = new Date().getMonth();

    if (isNaN(month) || month > 12 || month < currentMonth) {
      setExpiryMonthError("Invalid month");
      return false;
    }
    setExpiryMonthError("");
    return true;
  };

  const validateExpiryYear = () => {
    const currentYear = new Date().getFullYear() % 100;
    const year = parseInt(cardYear, 10);
    if (isNaN(year) || year < currentYear) {
      setExpiryYearError("Invalid year");
      return false;
    }
    setExpiryYearError("");
    return true;
  };

  const validateCvc = () => {
    if (cardCVC.length !== 3 || !/^\d+$/.test(cardCVC)) {
      setCvcError("Invalid CVC");
      return false;
    }
    setCvcError("");
    return true;
  };

  const isValid = () => {
    const isNameValid = validateName();
    const isCardNumberValid = validateCardNumber();
    const isExpiryMonthValid = validateExpiryMonth();
    const isExpiryYearValid = validateExpiryYear();
    const isCvcValid = validateCvc();

    if (
      isNameValid &&
      isCardNumberValid &&
      isExpiryMonthValid &&
      isExpiryYearValid &&
      isCvcValid
    ) {
      setCardDetails({
        name: cardholderName,
        cardNumber: cardNumber,
        expiryMonth: cardMonth,
        expiryYear: cardYear,
        cvc: cardCVC,
      });
      return true;
    }
    return false;
  };

  const handleCardNumberChange = (inputValue) => {
    // Remove any non-numeric characters from the input
    const numericValue = inputValue.replace(/\D/g, "");

    // Limit the input to a maximum of 16 digits
    const limitedValue = numericValue.slice(0, 16);

    // Format the limited value with spaces every 4 digits
    const formattedValue = limitedValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    // Update the cardNumber state with the formatted value
    setCardNumber(formattedValue);
  };

  const handleCardMonthChange = (inputValue) => {
    const limit = 2;
    const limitedValue = inputValue.slice(0, limit);
    setCardMonth(limitedValue);
  };

  const handleCardYearChange = (inputValue) => {
    const limit = 2;
    const limitedValue = inputValue.slice(0, limit);
    setCardYear(limitedValue);
  };

  const handleCardCVCChange = (inputValue) => {
    const limit = 3;
    const limitedValue = inputValue.slice(0, limit);
    setCardCVC(limitedValue);
  };

  return (
    <div className="container">
      <Toaster />
      <div className="card-components"></div>

      <CardFront cardDetails={cardDetails} className="cardface" />
      <CardBack cardCVC={cardDetails.cvc} className="cardface" />

      <div className="card-form">
        <form onSubmit={submitHandler} className="form">
          <div className="input-field">
            <label htmlFor="name"> CARDHOLDER NAME</label>
            <input
              id="name"
              value={cardholderName}
              type="text"
              placeholder="e.g. Jane Appleseed"
              onChange={(e) => setCardholderName(e.target.value)}
            ></input>
            <p className="error">{nameError ? nameError : ""}</p>
          </div>

          <div className="input-field">
            <label htmlFor="card-number">CARD NUMBER</label>
            <input
              id="card-number"
              value={cardNumber}
              type="text"
              placeholder="e.g. 1234 5678 9123 0000"
              onChange={(e) => handleCardNumberChange(e.target.value)}
              maxLength="19" // Set the maximum length to 19 characters (16 digits + 3 spaces)
            ></input>
            <p className="error">{cardNumberError ? cardNumberError : ""}</p>
          </div>

          <div className="expiry-cvc">
            <div className="expiry">
              <label>EXP. DATE (MM/YY)</label>
              <div className="expiry-inputs">
                <input
                  id="card-month"
                  value={cardMonth}
                  type="number"
                  placeholder="MM"
                  onChange={(e) => handleCardMonthChange(e.target.value)}
                ></input>

                <input
                  id="card-year"
                  value={cardYear}
                  type="number"
                  placeholder="YY"
                  onChange={(e) => handleCardYearChange(e.target.value)}
                ></input>
              </div>
              <div className="expiry-error error">
                <span>{expiryMonthError ? expiryMonthError : ""}</span>
                <span>{expiryYearError ? expiryYearError : ""}</span>
              </div>
            </div>
            <div className="cvc">
              <label htmlFor="card-cvc">CVC</label>
              <input
                id="card-cvc"
                value={cardCVC}
                type="number"
                placeholder="e.g. 123"
                onChange={(e) => handleCardCVCChange(e.target.value)}
              ></input>
              <p className="error">{cvcError.length > 0 ? cvcError : ""}</p>
            </div>
          </div>

          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default CardForm;
