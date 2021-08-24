import { dbService } from "fBase";
import React, { useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (emailCheck) {
      console.log("emailcheck");
      return;
    }
    await dbService.collection("emails").add({
      email,
      createdAt: Date.now(),
    });
    setEmail("");
  };
  const onChange = async (event) => {
    const {
      target: { value },
    } = event;
    const check = await dbService
      .collection("emails")
      .where("email", "==", value)
      .get();
    if (check.docs.length === 0 && value.length > 0) {
      console.log("available email");
      setEmailCheck(true);
    } else {
      console.log("already exist email");
      setEmailCheck(false);
    }
    setEmail(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={email}
          onChange={onChange}
          type="text"
          placeholder="Input Email"
          maxLength={120}
        />
        <input type="submit" value="Subscribe" />
      </form>
    </div>
  );
};
export default Subscribe;
