export const USERTYPE ={
    root:"ROOT",
    staff:"STAFF",
    employer:"EMPLOYER",
    professional:"PROFESSIONAL"
}

export const USERREQUESTTYPE={
   newAccount:"NEW_ACCOUNT",
   accountAccepted:"ACCOUNT_ACCEPTED",
   deleteRequested:"DELETE_REQUESTED",
   deleteAccepted:"DELETE_ACCEPTED",
   accountRejected:"ACCOUNT_REJECTED",
   deleteRejected:"DELETE_REJECTED"
}     

export const MATCHTYPE={
    PROFESSIONAL_REQUEST:"PROFESSIONAL_REQUEST",
    STAFF_ACCEPTED:"STAFF_ACCEPTED",
    STAFF_REJECTED:"STAFF_REJECTED"
}


export const reduceMatch =(val)=>{
      if(val>100){
        return 100;
      }
      if(val>80){
        return val-4.67;
      }
      return val;
}