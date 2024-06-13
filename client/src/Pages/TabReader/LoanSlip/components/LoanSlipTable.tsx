import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Button,
  useArrowNavigationGroup,
  useFocusableGroup,
} from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import {
  deleteLoanSlip,
  getLoanSlip,
} from "../../../../Redux/Reducers/loan_slip.reducer";
import EditLoanSlip from "./EditLoanSlip";
import BorrowedDetail from "./BorrowedDetail";

const columns = [
  { label: "Mã phiếu mượn" },
  { label: "Mã thẻ thư viện" },
  { label: "Tác vụ" },
];

const LoanSlipTable = () => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });
  const dispatch = useAppDispatch();
  const handleDeleteLoanSlip = async (id: string) => {
    try {
      if (!window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        return;
      } else {
        await dispatch(deleteLoanSlip(id));
        await dispatch(getLoanSlip());
      }
    } catch (error) {
      console.error("Failed to delete loan slip", error);
    }
  };
  const loanSlip = useAppSelector((state) => state.loanSlip.loanSlip);
  const loading = useAppSelector((state) => state.loanSlip.loading);
  const error = useAppSelector((state) => state.loanSlip.error);
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }
  return (
    <Table {...keyboardNavAttr} role="grid">
      <TableHeader className="font-bold">
        <TableRow>
          {columns.map((column, index) => (
            <TableHeaderCell key={index}>{column.label}</TableHeaderCell>
          ))}
          <TableHeaderCell />
        </TableRow>
      </TableHeader>
      <TableBody>
        {loanSlip.map((item, index) => (
          <TableRow key={index}>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.id}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.library_card_id}</TableCellLayout>
            </TableCell>
            <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
              <TableCellLayout>
                <BorrowedDetail id={item.id} />
                <EditLoanSlip id={item.id} />
                <Button
                  icon={<DeleteRegular />}
                  aria-label="Delete"
                  onClick={() => handleDeleteLoanSlip(item.id)}
                />
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LoanSlipTable;
