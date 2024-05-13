import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HrLine from "../shared/HrLine";
import { CardProps } from "../../Interface/ICardProps";

import { useLocation } from "react-router-dom";
import Timer from "../timer";
import { EyeButton } from "../shared/Buttons";

const CardComponent = ({
  task,
  text,
  date,
  isChecked,
  status,
  onChangeCheckbox,
  onTimeUpdate,
  onEyeButtonClick,
  taskId,
}: CardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "Completed":
        return "bg-greensuccess";
      case "Pending":
        return "bg-yellowpending";
      case "Active":
        return "bg-activeblue";
      default:
        return "";
    }
  };

  const handleCheckboxChange = (e: any) => {
    onChangeCheckbox(e.target.checked);
  };

  const location = useLocation();

  console.log("location", location.search);
  return (
    <div className="w-full rounded overflow-hidden border border-gray-300 p-6 sm:p-3">
      <div className="flex justify-between items-center">
        <div className="text-gray-700 text-base flex gap-2">
          <CalendarMonthIcon />
          {date}
        </div>
        {location.search == "?tab=active" && (
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 cursor-pointer"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
        )}
      </div>
      <div className="my-4 flex justify-between items-center">
        <p className="font-medium text-base">{text}</p>
        <EyeButton onClick={onEyeButtonClick} className="w-4 h-4" title={""} />
      </div>
      <HrLine />
      <div className="flex justify-between items-center pt-3">
        <div
          className={`${getStatusColor()} text-white w-min p-2 px-4 rounded-3xl sm:px-2 capitalize`}
        >
          {status}
        </div>
        {location.search == "?tab=active" && (
          <Timer
            onTimeUpdate={onTimeUpdate}
            task={task}
            taskId={taskId ? taskId : ""}
          />
        )}
      </div>
    </div>
  );
};

export default CardComponent;
