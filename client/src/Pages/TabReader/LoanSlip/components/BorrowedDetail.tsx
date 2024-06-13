import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../Redux/hooks";
import {
  getBorrowedDetailById,
  BorrowedDetailModel,
} from "../../../../Redux/Reducers/borrowed_detail.reducer";
import { AppsListDetailRegular } from "@fluentui/react-icons";
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Subtitle1,
  Title2,
  makeStyles,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    gap: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
  },
});

interface BorrowedDetailProps {
  id: string;
}

const BorrowedDetail: React.FC<BorrowedDetailProps> = ({ id }) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const [borrowedDetail, setBorrowedDetail] = useState<BorrowedDetailModel>({
    id: "",
    name: "",
    book_id: "",
    borrowed_day: "",
    pay_day: "",
    note: "",
  });
  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(getBorrowedDetailById(id));
      setBorrowedDetail(data.payload as BorrowedDetailModel);
    }

    if (id) {
      fetchData();
    }
  }, [id, dispatch]);
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button
          icon={<AppsListDetailRegular />}
          aria-label="GetDetail"
        ></Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            <Title2>Chi tiết phiếu mượn</Title2>
          </DialogTitle>
          <DialogContent className={styles.container}>
            <Subtitle1>Mã phiếu mượn: {borrowedDetail.id}</Subtitle1>
            <Subtitle1>Tên phiếu mượn: {borrowedDetail.name}</Subtitle1>
            <Subtitle1>Mã sách: {borrowedDetail.book_id}</Subtitle1>
            <Subtitle1>Ngày mượn: {borrowedDetail.borrowed_day}</Subtitle1>
            <Subtitle1>Ngày trả: {borrowedDetail.pay_day}</Subtitle1>
            <Subtitle1>Ghi chú: {borrowedDetail.note}</Subtitle1>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Hủy</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default BorrowedDetail;
