import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  useArrowNavigationGroup,
  useFocusableGroup,
} from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import {
  deleteBorrowedDetail,
  getBorrowedDetail,
} from "../../../../Redux/Reducers/borrowed_detail.reducer";
import EditBorrowedDetail from "./EditBorrowedDetail";

const columns = [
  { label: "Mã chi tiết phiếu mượn" },
  { label: "Tên chi tiết phiếu mượn" },
  { label: "Mã sách" },
  { label: "Ngày cho mượn" },
  { label: "Ngày trả" },
  { label: "Ghi chú" },
  { label: "Tác vụ" },
];

const BorrowedDetailTable = () => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });
  const dispatch = useAppDispatch();
  const handleDeleteBorrowedDetail = async (id: string) => {
    try {
      if (!window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        return;
      } else {
        await dispatch(deleteBorrowedDetail(id));
        await dispatch(getBorrowedDetail());
      }
    } catch (error) {
      console.error("Failed to delete type book", error);
    }
  };
  const borrowedDetail = useAppSelector(
    (state) => state.borrowedDetail.borrowed_detail
  );
  const loading = useAppSelector((state) => state.borrowedDetail.loading);
  const error = useAppSelector((state) => state.borrowedDetail.error);
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
        {borrowedDetail.map((item, index) => (
          <TableRow key={index}>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.id}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.name}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.book_id}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.borrowed_day}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.pay_day}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.note}</TableCellLayout>
            </TableCell>
            <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
              <TableCellLayout>
                {/* <BorrowedDetailById id={item.id} /> */}
                <EditBorrowedDetail id={item.id} />
                <Button
                  icon={<DeleteRegular />}
                  aria-label="Delete"
                  onClick={() => handleDeleteBorrowedDetail(item.id)}
                ></Button>
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BorrowedDetailTable;
