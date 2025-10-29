import React from "react";
import "./ImageCard.css";

const ImageCard = ({ data, fields }) => {
  return (
    <div className="info-card">
      {/* dividimos en filas de 3 columnas */}
      {fields.reduce((rows, field, i) => {
        if (i % 3 === 0) rows.push([]);
        rows[rows.length - 1].push(field);
        return rows;
      }, []).map((row, rowIndex) => (
        <div className="info-row" key={rowIndex}>
          {row.map(({ label, key }) => (
            <div key={key}>
              <strong>{label}</strong>
              <div>{data[key] ?? "-"}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageCard;