import { Link, useParams } from "react-router-dom";

import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

import FormComponent from "../components/form/form";

const EditDetails = () => {
  const { id } = useParams();
  const { data } = useSelector((state: RootState) => state.userDetails);

  const userDetailsById = data.filter((item) => item.key === id)[0];

  return (
    <>
      <h1>Edit Details</h1>
      <FormComponent userDetailsById={userDetailsById} />
      <Link to={"/"}>back</Link>
    </>
  );
};

export default EditDetails;
