import { DeleteRegular } from "@fluentui/react-icons";
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
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import {
  deleteReader,
  getReader,
} from "../../../../Redux/Reducers/reader.reducer";
import EditReader from "./EditReader";

const columns = [
  { label: "Mã độc giả" },
  { label: "Tên độc giả" },
  { label: "Địa chỉ" },
  { label: "Mã thẻ thư viện" },
  { label: "Tác vụ" },
];

const ReaderTable = () => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });
  const dispatch = useAppDispatch();
  const handleDeleteReader = async (id: string) => {
    try {
      if (!window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        return;
      } else {
        await dispatch(deleteReader(id));
        await dispatch(getReader());
      }
    } catch (error) {
      console.error("Failed to delete type book", error);
    }
  };
  const reader = useAppSelector((state) => state.reader.readers);
  const loading = useAppSelector((state) => state.reader.loading);
  const error = useAppSelector((state) => state.reader.error);
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
        {reader.map((reader, index) => (
          <TableRow key={index}>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{reader.id}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{reader.name}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{reader.address}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{reader.library_card_id}</TableCellLayout>
            </TableCell>
            <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
              <TableCellLayout>
                <EditReader id={reader.id} />
                <Button
                  icon={<DeleteRegular />}
                  aria-label="Delete"
                  onClick={() => handleDeleteReader(reader.id)}
                ></Button>
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReaderTable;
