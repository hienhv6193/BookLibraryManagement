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
  Dropdown,
  makeStyles,
  DropdownProps,
  Input,
} from "@fluentui/react-components";
import { EditRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { Field } from "@fluentui/react-components";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import {
  CreateBookBody,
  getBook,
  getBookById,
  updateBook,
} from "../../../../Redux/Reducers/book.reducer";
import { getTypeBook } from "../../../../Redux/Reducers/type_book.reducer";
import { getAuthor } from "../../../../Redux/Reducers/author.reducer";
import { getPublishingCompany } from "../../../../Redux/Reducers/publishing_company";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    gap: "2px",
  },
});

interface EditBookProps {
  id: string;
}

const EditBook: React.FC<EditBookProps> = (
  { id },
  propsDropdown: Partial<DropdownProps>
) => {
  const inputName = useId("input");
  const [book, setBook] = useState<CreateBookBody>({
    name: "",
    type_id: "",
    author_id: "",
    publishing_id: "",
  });
  const styles = useStyles();
  const dropdownIdType = useId("dropdown-default");
  const dropdownIdAuthor = "author-dropdown";
  const dropdownIdPublishing = useId("dropdown-default");
  const [options, setOptions] = useState<string[]>([]);
  const [optionsAuthor, setOptionsAuthor] = useState<string[]>([]);
  const [optionsPublishing, setOptionsPublishing] = useState<string[]>([]);
  const typeBook = useAppSelector((state) => state.typeBook.typeBooks);
  const author = useAppSelector((state) => state.author.authors);
  const publishing = useAppSelector(
    (state) => state.publishingCompany.publishingCompanies
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(getBookById(id));
      setBook(data.payload as CreateBookBody);
    }
    if (id) {
      fetchData();
    }
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getTypeBook());
    dispatch(getAuthor());
    dispatch(getPublishingCompany());
  }, [dispatch]);
  useEffect(() => {
    if (typeBook) {
      setOptions(typeBook.map((card) => card.id));
    }
    if (author) {
      setOptionsAuthor(author.map((card) => card.id));
    }
    if (publishing) {
      setOptionsPublishing(publishing.map((card) => card.id));
    }
  }, [typeBook, author, publishing]);

  const handleTypeBookSelect = (selectedCardId: string) => {
    setBook((prevType) => ({ ...prevType, type_id: selectedCardId }));
  };
  const handleAuthorSelect = (selectedCardId: string) => {
    setBook((prevAuthor) => ({ ...prevAuthor, author_id: selectedCardId }));
  };
  const handlePublishingSelect = (selectedCardId: string) => {
    setBook((prevPublishing) => ({
      ...prevPublishing,
      publishing_id: selectedCardId,
    }));
  };
  const handleUpdate = async (newBook: CreateBookBody) => {
    try {
      await dispatch(updateBook({ ...newBook, id }));
      await dispatch(getBook());
    } catch (error) {
      console.error("Failed to create book", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<EditRegular />} aria-label="Edit" />
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Cập nhật sách</DialogTitle>
          <DialogContent>
            <Field label="Tên sách" style={{ paddingInlineEnd: "12px" }}>
              <Input
                id={inputName}
                value={book.name}
                onChange={(e) => setBook({ ...book, name: e.target.value })}
              />
            </Field>
            <br />
            <div className={styles.root}>
              <label id={dropdownIdType} style={{ paddingInlineEnd: "12px" }}>
                Chọn thể loại sách
              </label>
              <Dropdown
                aria-labelledby={dropdownIdType}
                placeholder="Chọn thể loại sách"
                {...propsDropdown}
                value={book.type_id}
              >
                {options.map((option) => (
                  <Option
                    key={option}
                    value={option}
                    onClick={() => handleTypeBookSelect(option)}
                  >
                    {option}
                  </Option>
                ))}
              </Dropdown>
            </div>
            <br />
            <div className={styles.root}>
              <label id={dropdownIdAuthor} style={{ paddingInlineEnd: "12px" }}>
                Chọn tác giả sách
              </label>
              <Dropdown
                aria-labelledby={dropdownIdAuthor}
                placeholder="Chọn tác giả sách"
                {...propsDropdown}
                value={book.author_id}
              >
                {optionsAuthor.map((option) => (
                  <Option
                    key={option}
                    value={option}
                    onClick={() => handleAuthorSelect(option)}
                  >
                    {option}
                  </Option>
                ))}
              </Dropdown>
            </div>
            <br />
            <div className={styles.root}>
              <label
                id={dropdownIdPublishing}
                style={{ paddingInlineEnd: "12px" }}
              >
                Chọn nhà xuất bản
              </label>
              <Dropdown
                aria-labelledby={dropdownIdPublishing}
                placeholder="Chọn nhà xuất bản"
                {...propsDropdown}
                value={book.publishing_id}
              >
                {optionsPublishing.map((option) => (
                  <Option
                    key={option}
                    value={option}
                    onClick={() => handlePublishingSelect(option)}
                  >
                    {option}
                  </Option>
                ))}
              </Dropdown>
            </div>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Hủy</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                disabled={
                  !book.name ||
                  !book.type_id ||
                  !book.author_id ||
                  !book.publishing_id
                }
                onClick={() => handleUpdate({ ...book })}
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

export default EditBook;
