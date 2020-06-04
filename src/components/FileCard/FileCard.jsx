import React from "react";
import imgPDF from "../../assets/pdf-icon.png";
import imgIMG from "../../assets/img-icon.png";

import "./FileCard.css"

const FileCard = (props) => {
  const { document } = props
  const image = document.filetipo.startsWith("image") ? imgIMG : imgPDF;
  return (
    <div className="fileCard mb-5">
      <a
        href={document.url}
        className="text-decoration-none text-reset"
        target="_blank"
        rel="noopener noreferrer"
      >
        <figure className=" fileCard-figure">
        <img src={image} className="fileCard-img fig" alt="" />
        </figure>
        <div className="fileCard-text">
          <h4 className="font-weight-bold">{document.fileName.split('+').join(" ")}</h4>
        </div>
      </a>
    </div>
  );
};

export default FileCard;