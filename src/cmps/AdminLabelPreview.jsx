import { ReactSVG } from "react-svg";
import { Icon } from "./Icon";

export function AdminLabelPreview({ label, onEditLabel }) {
  return (
    <li
      key={`admin-${label._id}`}
      className="sec-top-margin flex align-center space-between label-preview"
    >
      <div className="label-info">
        <ReactSVG src={label.svgUrl} />
        <h3>
          Name: <span>{label.name}</span>
        </h3>
        <h3>
          SVG url: <span>{label.svgUrl}</span>
        </h3>
        <h3>
          Url: <span>{label.url}</span>
        </h3>
        <h3>Filter by: </h3>
        {Object.keys(label.filterBy).map((key) => {
          return (
            <h4 key={`${label.name}-${key}`}>
              {key}: {label.filterBy[key]}
            </h4>
          );
        })}
      </div>
      <div className="actions">
        <button className="simple-button" onClick={() => onEditLabel(label)}>Edit label</button>
      </div>
    </li>
  );
}
