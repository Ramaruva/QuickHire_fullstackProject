export const validateUsername = (val, customMsg) => {
  try {
    if (val.length <= 0) return "Username is empty";
    const regex = /^[A-Za-z][A-Za-z0-9]{7,}$/;
    return regex.test(val)
      ? ""
      : customMsg ||
          "Username Name must start with an Alphabet and at least eight characters ";
  } catch (error) {
    return error;
  }
};

export const validatePassword = (password, customMsg) => {
  try {
    if (password.length <= 0) return "Password is empty";
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(password)
      ? ""
      : customMsg ||
          "Password must be atleast eight characters long, it should include at least one alphabet,one numerical and one special characters";
  } catch (error) {
    return error;
  }
};

export const validateTwoPassword =(password1,password2)=>{
  try {
      if(password2.length<=0) return "Password field is empty" 
      return password1===password2?"":"Password Didn't Matches"
  } catch (error) {
    console.log(error)
  }
}

export const validateFirstName = (firstName, customMsg) => {
  try {
    if (firstName && firstName.length > 0) {
      return "";
    }
    return customMsg || "FirstName shouldn't be Empty";
  } catch (error) {
    return error;
  }
};

export const validateLastName = (lastName, customMsg) => {
  try {
    if (lastName && lastName.length > 0) {
      return "";
    }
    return customMsg || "LastName shouldn't be Empty";
  } catch (error) {
    return error;
  }
};

export const validateEmail = (email, customMsg) => {
  try {
    if (email && email.length > 0) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(email)
        ? ""
        : customMsg || "Please Enter valid Email Address";
    }
    return "Email Field is Empty";
  } catch (error) {
    return error;
  }
};

export const validatePhone = (phone, customMsg) => {
  try {
    if (phone && phone.length > 0) {
      const regex =
        /^\+?(\d{1,3})?[-. ]?\(?\d{1,3}\)?[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/;
      return regex.test(phone)
        ? ""
        : customMsg || "Please Enter valid Phone number";
    }
    return "Phone number is empty!";
  } catch (error) {
    return error;
  }
};

export const validateZipcode = (zipcode, customMsg) => {
  try {
    if (zipcode && zipcode.length > 0) {
      const regex = /^\d{5}(-\d{4})?$/;
      return regex.test(zipcode)
        ? ""
        : customMsg || "Please ener valid Zipcode";
    }
    return "zipcode is Empty"
  } catch (error) {
    return error;
  }
};

export const validateSchoolName =(schoolName,customMsg)=>{
  try {
     if(schoolName&&schoolName.length>0){
      return "";
     }
     return customMsg||"School Name is Empty!"
  } catch (error) {
     return error;
  }
}
export const validateMajorName =(majorName,customMsg)=>{
  try {
    if(majorName&&majorName.length>0){
      return "";
    }
    return customMsg||"Major name is empty!"
  } catch (error) {
     return error;
  }
}

export const validateDate =(date,customMsg)=>{
  try {
    if(date&&date.length>0){
      return "";
    }
    return customMsg||"Date field is empty!";
  } catch (error) {
    return error;
  }
}

/**
 * 
 * @param { give an obj with keys} obj 
 * @returns  "returns true if anyone value in obj is present or returns false if all values in obj is empty"
 */
export const checkKeysEmpty = (obj) => {
  for (const key in obj) {
    if (obj[key].length > 0) return true;
  }
  return false;
};

/**
 * 
 * @param {*val which need to check if it is empty or not } val 
 * @param {*custommsg to return } customMsg 
 * @returns  returns customsg or field empty msg
 */
export const validateEmptiness =(val,customMsg)=>{
  try {
     if(val&&val.length>0){
      return "";
     }
     return customMsg||"This Field is Empty!"
  } catch (error) {
    console.log(error)
    return "Field Empty"
  }
}

export const validatePay =(pay)=>{
  try {
     const num = Number(pay);
     return pay>0?"":"Pay ammount should be Positive"
  } catch (error) {
     console.log(error)
  }
}