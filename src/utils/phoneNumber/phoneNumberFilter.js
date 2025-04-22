function phoneNumberFilter(userNumber) {
    if (userNumber[0] === "0") {
      // Replace the first occurrence of "0" with "255"
      let formattedNumber = userNumber.replace("0", "255");
      return formattedNumber;
    } else if (userNumber[0] === "+") {
      // Remove the first character
      let formattedNumber = userNumber.substring(1);
      return formattedNumber;
    } else {
      return 'invalid format';
    }
  }
  