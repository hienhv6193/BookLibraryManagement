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
  deletePublishingCompany,
  getPublishingCompany,
} from "../../../../Redux/Reducers/publishing_company";
import EditPublishingCompany from "./EditPublishingCompany";

const columns = [
  { label: "Mã nhà xuất bản" },
  { label: "Tên nhà xuất bản" },
  { label: "Địa chỉ" },
  { label: "Email" },
  { label: "Tác vụ" },
];

const PublishingCompanyTable = () => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });
  const dispatch = useAppDispatch();
  const handleDeletePublishing = async (id: string) => {
    try {
      if (!window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        return;
      } else {
        await dispatch(deletePublishingCompany(id));
        await dispatch(getPublishingCompany());
      }
    } catch (error) {
      console.error("Failed to delete type book", error);
    }
  };
  const publishingCompany = useAppSelector(
    (state) => state.publishingCompany.publishingCompanies
  );
  const loading = useAppSelector((state) => state.publishingCompany.loading);
  const error = useAppSelector((state) => state.publishingCompany.error);
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
        {publishingCompany.map((item, index) => (
          <TableRow key={index}>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.id}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.name}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.address}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.email}</TableCellLayout>
            </TableCell>
            <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
              <TableCellLayout>
                <EditPublishingCompany id={item.id} />
                <Button
                  icon={<DeleteRegular />}
                  aria-label="Delete"
                  onClick={() => handleDeletePublishing(item.id)}
                ></Button>
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PublishingCompanyTable;
