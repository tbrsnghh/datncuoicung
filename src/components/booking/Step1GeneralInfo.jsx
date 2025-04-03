import React from "react";
import CustomerInfo from "../customer/CustomerInfo";
import EventInfo from "../event/EventInfo";

export default function Step1GeneralInfo({ eventInfo, setEventInfo }) {
  return (
    <div className="w-5/6 mx-auto text-left">
      <div className="flex space-x-4">
        
      <CustomerInfo />
      <EventInfo eventInfo={eventInfo} setEventInfo={setEventInfo} />
      </div>
    </div>
  );
}
