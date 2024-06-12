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
  Textarea,
  Field,
} from "@fluentui/react-components";
import { EditRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../Redux/hooks";
import {
  CreateAuthorBody,
  getAuthor,
  getAuthorById,
  updateAuthor,
} from "../../../Redux/Reducers/author.reducer";

interface EditAuthorProps {
  id: string;
}

const EditAuthor: React.FC<EditAuthorProps> = ({ id }) => {
  const inputName = useId("input");
  const inputWebsite = useId("input");
  const inputNote = useId("input");
  const [author, setAuthor] = useState<CreateAuthorBody>({
    name: "",
    website: "",
    note: "",
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(getAuthorById(id));
      setAuthor(data.payload as CreateAuthorBody);
    }

    if (id) {
      fetchData();
    }
  }, [dispatch, id]);
  const handleUpdate = async (newAuthor: CreateAuthorBody) => {
    try {
      await dispatch(updateAuthor({ ...newAuthor, id }));
      await dispatch(getAuthor());
    } catch (error) {
      console.error("Failed to create author", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<EditRegular />} aria-label="Edit" />
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Cập nhật tác giả</DialogTitle>
          <DialogContent>
            <Field label="Tên tác giả" style={{ paddingInlineEnd: "12px" }}>
              <Input
                id={inputName}
                required
                onChange={(e) => setAuthor({ ...author, name: e.target.value })}
                value={author.name}
              />
            </Field>
            <br />
            <Field label="Website" style={{ paddingInlineEnd: "12px" }}>
              <Input
                id={inputWebsite}
                required
                onChange={(e) =>
                  setAuthor({ ...author, website: e.target.value })
                }
                value={author.website}
              />
            </Field>
            <br />
            <Field label="Ghi chú" style={{ paddingInlineEnd: "12px" }}>
              <Textarea
                id={inputNote}
                required
                resize="vertical"
                onChange={(e) => setAuthor({ ...author, note: e.target.value })}
                value={author.note}
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
                disabled={!author.name || !author.website || !author.note}
                onClick={() => handleUpdate(author)}
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

export default EditAuthor;
