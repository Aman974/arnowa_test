import React, { useEffect, useState } from "react";

import Table from "./table";
import NavBar from "./NavBar";

export default function HomeScreen() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    console.log("hi");
    submitAPI();
  }, []);

  const submitAPI = (data) => {
    fetch("http://localhost:3000/get", {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(JSON.stringify(data.data));

        setTableData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log({ tableData });
  return (
    <>
      <NavBar />
      <Table tableData={tableData} />
    </>
  );
}
