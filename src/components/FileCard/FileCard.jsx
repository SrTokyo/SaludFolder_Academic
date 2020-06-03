import React from "react";
import imgPDF from "../assets/imagePDF";
import imgIMG from "../assets/imageIMG";

const FileCard = (props) => {
  const image = props.type === "PDF" ? imgPDF : imgIMG;
  return (
    <div className="border">
      <div>
        <figure>
          <img src={image} alt="Archivo PDF" />
        </figure>
      </div>
      <div>
        <h5>{props.title}</h5>
      </div>
    </div>
  );
};

export default FileCard;