import * as React from "react";
import { makeStyles, tokens, Tab, TabList } from "@fluentui/react-components";
import type {
  SelectTabData,
  SelectTabEvent,
  TabValue,
} from "@fluentui/react-components";
import Book from "./Book/Book";
import TypeBook from "./TypeBook/TypeBook";
import PublishingCompany from "./PublishingCompany/PublishingCompany";

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "10px 20px",
    rowGap: "20px",
  },
  panels: {
    padding: "0 10px",
    "& th": {
      textAlign: "left",
      padding: "0 30px 0 0",
    },
  },
  propsTable: {
    "& td:first-child": {
      fontWeight: tokens.fontWeightSemibold,
    },
    "& td": {
      padding: "0 30px 0 0",
    },
  },
});

const TabBook = () => {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] = React.useState<TabValue>("book");

  const onTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const BookTab = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Book">
      <Book />
    </div>
  ));

  const TypeBookTab = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Type Book">
      <TypeBook />
    </div>
  ));
  const PublishingCompanyTab = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Publishing Company">
      <PublishingCompany />
    </div>
  ));
  return (
    <div className={styles.root}>
      <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
        <Tab id="Book" value="book">
          Book
        </Tab>
        <Tab id="TypeBook" value="typeBook">
          Type Book
        </Tab>
        <Tab id="PublishingCompany" value="publishingCompany">
          Publishing Company
        </Tab>
      </TabList>
      <div className={styles.panels}>
        {selectedValue === "book" && <BookTab />}
        {selectedValue === "typeBook" && <TypeBookTab />}
        {selectedValue === "publishingCompany" && <PublishingCompanyTab />}
      </div>
    </div>
  );
};

export default TabBook;
