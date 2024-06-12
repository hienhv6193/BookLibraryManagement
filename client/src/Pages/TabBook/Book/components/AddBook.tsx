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
import { AddRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { Field } from "@fluentui/react-components";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import {
  CreateBookBody,
  createBook,
  getBook,
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

const AddBook = (propsDropdown: Partial<DropdownProps>) => {
  const inputName = useId("input");
  const dispatch = useAppDispatch();
  const [book, setBook] = useState<CreateBookBody>({
    name: "",
    type_id: "",
    author_id: "",
    publishing_id: "",
  });
  const styles = useStyles();
  // select loan slip
  const dropdownIdType = useId("dropdown-default");
  const dropdownIdAuthor = useId("dropdown-default");
  const dropdownIdPublishing = useId("dropdown-default");
  const [options, setOptions] = useState<string[]>([]);
  const [optionsAuthor, setOptionsAuthor] = useState<string[]>([]);
  const [optionsPublishing, setOptionsPublishing] = useState<string[]>([]);
  const typeBook = useAppSelector((state) => state.typeBook.typeBooks);
  const author = useAppSelector((state) => state.author.authors);
  const publishing = useAppSelector(
    (state) => state.publishingCompany.publishingCompanies
  );
  useEffect(() => {
    dispatch(getTypeBook());
    if (typeBook) {
      setOptions(typeBook.map((card) => card.id));
    }
    dispatch(getAuthor());
    if (author) {
      setOptionsAuthor(author.map((card) => card.id));
    }
    dispatch(getPublishingCompany());
    if (publishing) {
      setOptionsPublishing(publishing.map((card) => card.id));
    }
  }, [dispatch, typeBook, author, publishing]);
  const handleTypeBookSelect = (selectedCardId: string) => {
    setBook((prevTypeBook) => ({
      ...prevTypeBook,
      type_id: selectedCardId,
    }));
  };
  const handleAuthorSelect = (selectedCardId: string) => {
    setBook((prevAuthor) => ({
      ...prevAuthor,
      author_id: selectedCardId,
    }));
  };
  const handlePublishingSelect = (selectedCardId: string) => {
    setBook((prevPublishing) => ({
      ...prevPublishing,
      publishing_id: selectedCardId,
    }));
  };
  const handleCreate = async (newBook: CreateBookBody) => {
    try {
      await dispatch(createBook(newBook));
      await dispatch(getBook());
    } catch (error) {
      console.error("Failed to create book", error);
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
          <DialogTitle>Thêm sách</DialogTitle>
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
                onClick={() => handleCreate({ ...book })}
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

export default AddBook;
