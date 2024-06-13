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
  deleteTypeBook,
  getTypeBook,
} from "../../../../Redux/Reducers/type_book.reducer";
import EditTypeBook from "./EditTypeBook";

const columns = [
  { label: "Mã thể loại sách" },
  { label: "Tên loại sách" },
  { label: "Tác vụ" },
];

const TypeBookTable = () => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });
  const dispatch = useAppDispatch();
  const handleDeleteTypeBook = async (id: string) => {
    try {
      if (!window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        return;
      } else {
        await dispatch(deleteTypeBook(id));
        await dispatch(getTypeBook());
      }
    } catch (error) {
      console.error("Failed to delete type book", error);
    }
  };

  const typeBook = useAppSelector((state) => state.typeBook.typeBooks);
  const loading = useAppSelector((state) => state.typeBook.loading);
  const error = useAppSelector((state) => state.typeBook.error);
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
        {typeBook.map((item, index) => (
          <TableRow key={index}>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.id}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.name}</TableCellLayout>
            </TableCell>
            <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
              <TableCellLayout>
                <EditTypeBook id={item.id} />
                <Button
                  icon={<DeleteRegular />}
                  aria-label="Delete"
                  onClick={() => handleDeleteTypeBook(item.id)}
                ></Button>
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TypeBookTable;
