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
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  deleteAuthor,
  getAuthor,
} from "../../../Redux/Reducers/author.reducer";
import EditAuthor from "./EditAuthor";

const columns = [
  { label: "Mã tác giả" },
  { label: "Tên tác giả" },
  { label: "Website" },
  { label: "Ghi chú" },
];

const AuthorTable = () => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });
  const dispatch = useAppDispatch();
  const handleDeleteAuthor = async (id: string) => {
    try {
      if (!window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        return;
      } else {
        await dispatch(deleteAuthor(id));
        await dispatch(getAuthor());
      }
    } catch (error) {
      console.error("Failed to delete type book", error);
    }
  };
  const author = useAppSelector((state) => state.author.authors);
  const loading = useAppSelector((state) => state.author.loading);
  const error = useAppSelector((state) => state.author.error);
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
          {columns.map((column) => (
            <TableHeaderCell>{column.label}</TableHeaderCell>
          ))}
          <TableHeaderCell />
        </TableRow>
      </TableHeader>
      <TableBody>
        {author.map((item) => (
          <TableRow key={item.id}>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.id}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.name}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.website}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.note}</TableCellLayout>
            </TableCell>
            <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
              <TableCellLayout>
                <EditAuthor id={item.id} />
                <Button
                  icon={<DeleteRegular />}
                  aria-label="Delete"
                  onClick={() => handleDeleteAuthor(item.id)}
                />
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AuthorTable;
