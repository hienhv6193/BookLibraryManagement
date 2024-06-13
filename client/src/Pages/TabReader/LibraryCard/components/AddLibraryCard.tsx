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
  Textarea,
} from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import { useState } from "react";
import { Field } from "@fluentui/react-components";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import {
  CreateLibraryCardBody,
  createLibraryCard,
  getLibraryCard,
} from "../../../../Redux/Reducers/library_card.reducer";
import { useAppDispatch } from "../../../../Redux/hooks";
import { format } from "date-fns";

const AddLibraryCard = (props: Partial<DatePickerProps>) => {
  const inputId = useId("input");
  const dispatch = useAppDispatch();
  const [libraryCard, setLibraryCard] = useState<CreateLibraryCardBody>({
    card_created_date: "",
    card_expiry_date: "",
    note: "",
  });
  const onClickCreateDay: React.ReactEventHandler<HTMLInputElement> = (
    event
  ) => {
    const dateString = event.currentTarget.value;
    const parsedDate = new Date(dateString);

    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date format:", dateString);
      return;
    }

    const formattedDate = format(parsedDate, "yyyy-MM-dd");

    setLibraryCard({
      ...libraryCard,
      card_created_date: formattedDate,
    });
  };
  const onClickExpiryDay: React.ReactEventHandler<HTMLInputElement> = (
    event
  ) => {
    const dateString = event.currentTarget.value;
    const parsedDate = new Date(dateString);

    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date format:", dateString);
      return;
    }

    const formattedDate = format(parsedDate, "yyyy-MM-dd");

    setLibraryCard({
      ...libraryCard,
      card_expiry_date: formattedDate,
    });
  };
  const handleCreate = async (newLibraryCard: CreateLibraryCardBody) => {
    try {
      await dispatch(createLibraryCard(newLibraryCard));
      await dispatch(getLibraryCard());
    } catch (error) {
      console.error("Failed to create library card", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button appearance="primary" icon={<AddRegular />}>
          Thêm
        </Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Thêm thẻ thư viện sách</DialogTitle>
          <DialogContent>
            <Field label="Ngày cấp">
              <DatePicker
                placeholder="Chọn ngày cấp..."
                {...props}
                onSelect={onClickCreateDay}
              />
            </Field>
            <br />
            <Field label="Ngày hết hạn">
              <DatePicker
                placeholder="Chọn ngày hết hạn..."
                {...props}
                onSelect={onClickExpiryDay}
              />
            </Field>
            <br />
            <Field label="Ghi chú" style={{ paddingInlineEnd: "12px" }}>
              <Textarea
                id={inputId}
                resize="vertical"
                value={libraryCard.note}
                onChange={(e) =>
                  setLibraryCard({ ...libraryCard, note: e.target.value })
                }
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
                  !libraryCard.card_created_date ||
                  !libraryCard.card_expiry_date ||
                  !libraryCard.note
                }
                onClick={() => handleCreate({ ...libraryCard })}
              >
                Thêm
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default AddLibraryCard;
