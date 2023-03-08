import { ReactSVG } from "react-svg";
import { Icon } from "./Icon";
import { DoubleSvg } from "./svgs/DoubleSvg";
import { GroupSvg } from "./svgs/GroupSvg";
import { SingleSvg } from "./svgs/SingleSvg";

export function LabelPreview({ label, isCircleStyle, isGuestsList = false }) {
  const { svgUrl } = label;
  const { svgName } = label;
  if (!isGuestsList)
    return (
      <div
        className={
          isCircleStyle
            ? "carousel-content circle flex align-center justify-center"
            : ""
        }
      >
        {label && svgUrl && <ReactSVG src={svgUrl} />}
      </div>
    );
    else if(svgName === "Single") return <SingleSvg />
    else if(svgName === "Double") return <DoubleSvg />
    else if(svgName === "Group") return <GroupSvg />
    else {
    if(svgName === "Single")
    return svgName && <Icon name={svgName} />;
  }
}