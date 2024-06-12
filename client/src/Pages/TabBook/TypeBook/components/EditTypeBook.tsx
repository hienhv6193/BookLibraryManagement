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
  Input,
  Field,
} from "@fluentui/react-components";
import { EditRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../Redux/hooks";
import {
  CreateTypeBookBody,
  getTypeBook,
  getTypeBookById,
  updateTypeBook,
} from "../../../../Redux/Reducers/type_book.reducer";

interface EditTypeBookProps {
  id: string;
}

const EditTypeBook: React.FC<EditTypeBookProps> = ({ id }) => {
  const inputId = useId("input");
  const [typeBookName, setTypeBook] = useState<CreateTypeBookBody>({
    name: "",
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(getTypeBookById(id));
      setTypeBook(data.payload as CreateTypeBookBody);
    }

    if (id) {
      fetchData();
    }
  }, [dispatch, id]);

  const handleUpdateTypeBook = async (newTypeBook: CreateTypeBookBody) => {
    try {
      await dispatch(updateTypeBook({ ...newTypeBook, id }));
      await dispatch(getTypeBook());
    } catch (error) {
      console.error("Failed to update type book", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<EditRegular />} aria-label="Edit" />
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Cập nhật thể loại sách</DialogTitle>
          <DialogContent>
            <Field
              label="Tên thể loại sách"
              style={{ paddingInlineEnd: "12px" }}
            >
              <Input
                id={inputId}
                onChange={(e) =>
                  setTypeBook({ ...typeBookName, name: e.target.value })
                }
                value={typeBookName.name}
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
                disabled={!typeBookName.name}
                onClick={() => handleUpdateTypeBook({ ...typeBookName })}
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

export default EditTypeBook;
