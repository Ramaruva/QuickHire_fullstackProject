import React from 'react'
import { useLocation } from 'react-router-dom';
import FullProfileDetails from '../../components/StaffComponents/FullProfileDetails';

function useQuery(){
  const {search} = useLocation();
  return React.useMemo(()=>new URLSearchParams(search),[search]);
}

const IndividualPage = () => {
  const query = useQuery();
  const customerType = query.get("type");
  const operationType = query.get("op");
  const reqId = query.get("reqId");
  console.log(customerType,operationType)
  return (
    <div>
       <FullProfileDetails customerType={customerType} operationType={operationType} requestID ={reqId}/>
    </div>
  )
}

export default IndividualPage



