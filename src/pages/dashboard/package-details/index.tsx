import { useState } from "react";

import Receiver from "./receiver";
import Details from "./details";

export default function index() {
  const [step, setStep] = useState<number>(1);
  const [receiverData, setReceiverData] = useState<any>({});
  const [detailsData, setDetailsData] = useState<any>({});

  const handleDetailsSubmit = (data: any) => {
    setDetailsData(data);
    setStep(2);
  };

  const handleReceiverSubmit = (data: any) => {
    setReceiverData(data);
    console.log("Receiver Data:", receiverData);
    console.log("Details Data:", detailsData);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div>
      {step === 1 && <Details onSubmit={handleDetailsSubmit} />}
      {step === 2 && (
        <Receiver onSubmit={handleReceiverSubmit} handleBack={handleBack} />
      )}
    </div>
  );
}
