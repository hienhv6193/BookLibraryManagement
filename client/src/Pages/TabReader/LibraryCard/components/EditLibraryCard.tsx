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
import { EditRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { Field } from "@fluentui/react-components";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Form } from "react-router-dom";
import {
  CreateLibraryCardBody,
  getLibraryCard,
  getLibraryCardById,
  updateLibraryCard,
} from "../../../../Redux/Reducers/library_card.reducer";
import { useAppDispatch } from "../../../../Redux/hooks";

interface EditLibraryCardProps {
  id: string;
}

const EditLibraryCard: React.FC<EditLibraryCardProps> = (
  { id },
  props: Partial<DatePickerProps>
) => {
  const inputNote = useId("input");
  const dispatch = useAppDispatch();
  const [libraryCard, setLibraryCard] = useState<CreateLibraryCardBody>({
    card_created_date: "",
    card_expiry_date: "",
    note: "",
  });
  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(getLibraryCardById(id));
      setLibraryCard(data.payload as CreateLibraryCardBody);
    }

    if (id) {
      fetchData();
    }
  }, [dispatch, id]);
  const onClickCreateDay: React.ReactEventHandler<HTMLInputElement> = (
    event
  ) => {
    setLibraryCard({
      ...libraryCard,
      card_created_date: event.currentTarget.value,
    });
  };
  const onClickExpiryDay: React.ReactEventHandler<HTMLInputElement> = (
    event
  ) => {
    setLibraryCard({
      ...libraryCard,
      card_expiry_date: event.currentTarget.value,
    });
  };
  const handleUpdate = async (newLibraryCard: CreateLibraryCardBody) => {
    try {
      await dispatch(updateLibraryCard({ ...newLibraryCard, id }));
      await dispatch(getLibraryCard());
    } catch (error) {
      console.error("Failed to update library card", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<EditRegular />} aria-label="Edit" />
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Cập nhật thẻ thư viện sách</DialogTitle>
          <DialogContent>
            <Form>
              <Field label="Ngày cấp">
                <DatePicker
                  placeholder="Chọn ngày cấp..."
                  {...props}
                  onSelect={onClickCreateDay}
                  value={new Date(libraryCard.card_created_date)}
                />
              </Field>
              <br />
              <Field label="Ngày hết hạn">
                <DatePicker
                  placeholder="Chọn ngày hết hạn..."
                  {...props}
                  onSelect={onClickExpiryDay}
                  value={new Date(libraryCard.card_expiry_date)}
                />
              </Field>
              <br />
              <Field label="Ghi chú" style={{ paddingInlineEnd: "12px" }}>
                <Textarea
                  id={inputNote}
                  resize="vertical"
                  value={libraryCard.note}
                  onChange={(e) =>
                    setLibraryCard({ ...libraryCard, note: e.target.value })
                  }
                />
              </Field>
            </Form>
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
                onClick={() => handleUpdate({ ...libraryCard })}
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

export default EditLibraryCard;
