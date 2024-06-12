import {
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  useId,
  Dialog,
  Option,
  Textarea,
  Dropdown,
  DropdownProps,
  Input,
} from "@fluentui/react-components";
import { EditRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { Field } from "@fluentui/react-components";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { getLoanSlip } from "../../../../Redux/Reducers/loan_slip.reducer";
import { getBook } from "../../../../Redux/Reducers/book.reducer";
import {
  BorrowedDetail,
  getBorrowedDetail,
  getBorrowedDetailById,
  updateBorrowedDetail,
} from "../../../../Redux/Reducers/borrowed_detail.reducer";

interface EditBorrowedDetailProps {
  id: string;
}

const EditBorrowedDetail: React.FC<EditBorrowedDetailProps> = (
  { id },
  props: Partial<DatePickerProps & DropdownProps>
) => {
  const inputName = useId("input");
  const inputNote = useId("input");
  const dispatch = useAppDispatch();
  const [borrowedDetail, setBorrowedDetail] = useState<BorrowedDetail>({
    id: "",
    name: "",
    book_id: "",
    borrowed_day: "",
    pay_day: "",
    note: "",
  });
  // select loan slip
  const dropdownId = useId("dropdown-default");
  const [options, setOptions] = useState<string[]>([]);
  const loanSlip = useAppSelector((state) => state.loanSlip.loanSlip);
  const book = useAppSelector((state) => state.book.books);
  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(getBorrowedDetailById(id));
      setBorrowedDetail(data.payload as BorrowedDetail);
    }

    if (id) {
      fetchData();
    }
    dispatch(getLoanSlip());
    if (loanSlip) {
      setOptions(loanSlip.map((card) => card.id));
    }
    dispatch(getBook());
    if (book) {
      setOptionsBook(book.map((card) => card.id));
    }
  }, [dispatch, loanSlip, book, id]);
  const handleLoanSlipSelect = (selectedCardId: string) => {
    setBorrowedDetail((prevLoanSlip) => ({
      ...prevLoanSlip,
      id: selectedCardId,
    }));
  };
  // select book
  const dropdownIdBook = useId("dropdown-default");
  const [optionsBook, setOptionsBook] = useState<string[]>([]);
  const handleBookSelect = (selectedCardId: string) => {
    setBorrowedDetail((prevBook) => ({
      ...prevBook,
      book_id: selectedCardId,
    }));
  };
  const onClickBorrowDay: React.ReactEventHandler<HTMLInputElement> = (
    event
  ) => {
    setBorrowedDetail({
      ...borrowedDetail,
      borrowed_day: event.currentTarget.value,
    });
  };
  const onClickPayDay: React.ReactEventHandler<HTMLInputElement> = (event) => {
    setBorrowedDetail({
      ...borrowedDetail,
      pay_day: event.currentTarget.value,
    });
  };
  const handleUpdate = async (newBorrowedDetail: BorrowedDetail) => {
    try {
      await dispatch(updateBorrowedDetail({ ...newBorrowedDetail, id }));
      await dispatch(getBorrowedDetail());
    } catch (error) {
      console.error("Failed to update borrowed detail", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<EditRegular />} aria-label="Edit" />
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Thêm thẻ thư viện sách</DialogTitle>
          <DialogContent>
            <div>
              <label id={dropdownId} style={{ paddingInlineEnd: "12px" }}>
                Chọn thẻ thư viện
              </label>
              <Dropdown
                aria-labelledby={dropdownId}
                placeholder="Chọn thẻ thư viện"
                {...props}
                value={borrowedDetail.id}
              >
                {options.map((option) => (
                  <Option
                    key={option}
                    value={option}
                    onClick={() => handleLoanSlipSelect(option)}
                  >
                    {option}
                  </Option>
                ))}
              </Dropdown>
            </div>
            <br />
            <Field
              label="Tên chi tiết phiếu mượn"
              style={{ paddingInlineEnd: "12px" }}
            >
              <Input
                id={inputName}
                placeholder="Tên chi tiết phiếu mượn"
                onChange={(e) =>
                  setBorrowedDetail({ ...borrowedDetail, name: e.target.value })
                }
                value={borrowedDetail.name}
              />
            </Field>
            <br />
            <div>
              <label id={dropdownId} style={{ paddingInlineEnd: "12px" }}>
                Chọn sách
              </label>
              <Dropdown
                aria-labelledby={dropdownIdBook}
                placeholder="Chọn sách"
                {...props}
                value={borrowedDetail.book_id}
              >
                {optionsBook.map((option) => (
                  <Option
                    key={option}
                    value={option}
                    onClick={() => handleBookSelect(option)}
                  >
                    {option}
                  </Option>
                ))}
              </Dropdown>
            </div>
            <br />
            <Field label="Ngày cho mượn">
              <DatePicker
                placeholder="Ngày cho mượn"
                {...props}
                onSelect={onClickBorrowDay}
                value={new Date(borrowedDetail.borrowed_day)}
              />
            </Field>
            <br />
            <Field label="Ngày trả">
              <DatePicker
                placeholder="Ngày trả"
                {...props}
                onSelect={onClickPayDay}
                value={new Date(borrowedDetail.pay_day)}
              />
            </Field>
            <br />
            <Field label="Ghi chú" style={{ paddingInlineEnd: "12px" }}>
              <Textarea
                id={inputNote}
                resize="vertical"
                placeholder="Ghi chú"
                onChange={(e) =>
                  setBorrowedDetail({ ...borrowedDetail, note: e.target.value })
                }
                value={borrowedDetail.note}
              />
            </Field>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Hủy</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                disabled={
                  !borrowedDetail.id ||
                  !borrowedDetail.name ||
                  !borrowedDetail.book_id ||
                  !borrowedDetail.borrowed_day ||
                  !borrowedDetail.pay_day ||
                  !borrowedDetail.note
                }
                onClick={() => handleUpdate({ ...borrowedDetail })}
              >
                Cập nhật
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default EditBorrowedDetail;
