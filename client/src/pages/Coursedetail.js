import React from "react";
import { useParams } from "react-router-dom";

const Coursedetail = () => {
  const { id } = useParams();
  return <div>Coursedetail : {id}</div>;
};

export default Coursedetail;
