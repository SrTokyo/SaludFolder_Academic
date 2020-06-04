import React from "react";
import  FileCard  from "../FileCard/FileCard";

const FileCards = (props) => {

  return (
    <ul className="row">
      {props.documents.map((document) => (
        <li className="col-6 col-md-3 pr-0" key={document._id} style={{width:'260px'}}>
          <FileCard document={document} />
        </li>
      ))}
    </ul>
  );
};

export default FileCards;
