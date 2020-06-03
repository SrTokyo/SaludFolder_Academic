import React from "react";
import { FileCard } from "../FileCard/FileCard";
const FileCards = (props) => {
  const files = props.files;
  return (
    <div>
      {files.map(() => (
        <FileCard />
      ))}
    </div>
  );
};

export default FileCards;
