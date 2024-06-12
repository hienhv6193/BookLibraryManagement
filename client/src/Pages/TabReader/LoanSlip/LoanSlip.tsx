import { useEffect } from "react";
import { useAppDispatch } from "../../../Redux/hooks";
import { getLoanSlip } from "../../../Redux/Reducers/loan_slip.reducer";
import AddLoanSlip from "./components/AddLoanSlip";
import LoanSlipTable from "./components/LoanSlipTable";

const LoanSlip = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLoanSlip());
  }, [dispatch]);
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Phiếu mượn</h3>
        <AddLoanSlip />
      </div>
      <br />
      <LoanSlipTable />
    </div>
  );
};

export default LoanSlip;
