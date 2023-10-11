import { useState } from "react";

export default function UsePhoneNumber(emailOrPhone) {
  const [formatedPhone, setFormatedPhone] = useState("");
  let unformattedPhone = Array.from(emailOrPhone);
  if (unformattedPhone[0] === "0") {
    unformattedPhone.shift();
    const formattedPhone = unformattedPhone;
    formattedPhone.unshift("234");
    setFormatedPhone(formattedPhone.join(""));
  } else if (unformattedPhone[0] === "+") {
    unformattedPhone.shift();
    const formattedPhone = unformattedPhone;
    setFormatedPhone(formattedPhone.join(""));
  } else {
    setFormatedPhone(unformattedPhone.join(""));
  }

  return formatedPhone;
}
