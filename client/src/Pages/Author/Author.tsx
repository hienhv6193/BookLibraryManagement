import { makeStyles } from "@fluentui/react-components";
import { useEffect } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { getAuthor } from "../../Redux/Reducers/author.reducer";
import AddAuthor from "./components/AddAuthor";
import AuthorTable from "./components/AuthorTable";

const useStyles = makeStyles({
  root: {
    padding: "20px 20px",
    rowGap: "20px",
  },
});

const Author = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAuthor());
  }, [dispatch]);
  return (
    <div className={styles.root}>
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Tác giả</h3>
        <AddAuthor />
      </div>
      <br />
      <AuthorTable />
    </div>
  );
};

export default Author;
