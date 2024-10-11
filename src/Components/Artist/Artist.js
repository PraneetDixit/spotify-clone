import React from "react";
import "./Artist.css";
import { useParams } from "react-router-dom";

export default function Artist() {
  const { id } = useParams();

  return <div>{id}</div>;
}
