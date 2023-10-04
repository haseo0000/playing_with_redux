import { useDispatch } from "react-redux";
import { insertUserDetails } from "../redux/userDetailsSlice";

import FormComponent from "../components/form/form";
import TableComponent from "../components/table/table";

import type { UserDetailsStateT } from "../types";

const Home = () => {
  const dispatch = useDispatch();

  const handleInsertData = (data: UserDetailsStateT) => {
    dispatch(insertUserDetails({ details: data }));
  };

  return (
    <>
      <h1>Form Register</h1>
      <FormComponent handleInsertData={handleInsertData} />
      <TableComponent />
    </>
  );
};

export default Home;
