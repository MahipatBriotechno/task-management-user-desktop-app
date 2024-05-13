import React, { useState, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ReplayIcon from "@mui/icons-material/Replay";
import { useDispatch } from "react-redux";
import { updateTask, updateUserTask } from "../../state-management/admin/task/action";

interface MyComponentProps {
  task: any;
  onTimeUpdate: any;
  taskId: string;
}

const Timer: React.FC<MyComponentProps> = ({ onTimeUpdate, task }) => {
  const dispatch: any = useDispatch();

  const [taskId, setTaskId] = useState("");
  const [title, setTitle] = useState("");
  const [empName, setEmpName] = useState("");
  const [empId, setEmpId] = useState("");
  const [status, setStatus] = useState("");
  const [assignDate, setAssignDate] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [startTime, setStartTime] = useState("0:0:0");
  const [endTime, setEndTime] = useState("");
  const [totalTimeDuration, setTotalTimeDuration] = useState("");
  // ---------------------

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (task) {
      setTaskId(task?._id || "");
      setTitle(task?.title || "");
      setEmpName(task?.empName || "");
      setEmpId(task?.empId || "");
      setStatus(task?.status || "");
      setAssignDate(task?.assignDate || "");
      setSubmissionDate(task?.submissionDate || "");
      setStartTime(task?.startTime || "");
      setEndTime(task?.endTime || "");
      // setTotalTimeDuration(task?.totalTimeDuration || "");

      //   ------------
      const timeParts = task?.endTime.split(":");
      console.log("timeParts", timeParts);
      setHours(parseInt(timeParts[0]));
      setMinutes(parseInt(timeParts[1]));
      setSeconds(parseInt(timeParts[2]));
    }
  }, [task]);


  useEffect(() => {
    let interval: any = null;
    if (running) {
      interval = setInterval(() => {
        if (seconds === 59) {
          if (minutes === 59) {
            setHours(hours + 1);
            setMinutes(0);
          } else {
            setMinutes(minutes + 1);
          }
          setSeconds(0);
        } else {
          setSeconds(seconds + 1);
        }
      }, 1000);
    } else if (!running && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, seconds, minutes, hours]);

  const handleStart = () => {
    setRunning(true);
    setStartTime(endTime);
  };

  const handlePause = () => {
    setRunning(false);
    setEndTime(hours + ":" + minutes + ":" + seconds);
    // setSeconds(seconds);
    // setMinutes(minutes);
    // setHours(hours);
  };

  const handleReset = () => {
    setRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  //   ---------------------
  
  function timeStringToSeconds(timeString:any) {
    const [hours, minutes, seconds] = timeString && timeString?.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}


const startInSeconds = timeStringToSeconds(startTime);
const endInSeconds = timeStringToSeconds(endTime);

const durationInSeconds = Math.abs(endInSeconds - startInSeconds);

function secondsToTimeString(seconds:any) {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const finalSeconds = remainingSeconds % 60;

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${finalSeconds < 10 ? `0${finalSeconds}` : finalSeconds}`;
}

const readableDuration = secondsToTimeString(durationInSeconds);

useEffect(() => {
  setTotalTimeDuration(readableDuration)
},[readableDuration])


  console.log("totalTimeDuration",totalTimeDuration)

const taskEndTimeInSeconds = timeStringToSeconds(task && task?.endTime);


  useEffect(() => {
    if (endInSeconds > taskEndTimeInSeconds) {
      dispatch(
        updateUserTask(
          taskId,
          title,
          empId,
          empName,
          status,
          assignDate,
          submissionDate,
          startTime,
          endTime,
          totalTimeDuration
        )
      );
    }
  }, [totalTimeDuration]);

  // console.log("endTime",endTime)
  // console.log("endTime startTime",startTime)

  return (
    <div className="flex justify-center gap-3">
      <input
        className="text-center text-2xl sm:text-xl w-16 setEndTime"
        value={hours + ":" + minutes + ":" + seconds}
        onChange={(e) => setEndTime(e.target.value)}
      />

      {/* <h1>Time: {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1> */}

      {running ? (
        <button
          className="border-none p-[10px] text-white cursor-pointer bg-[green] rounded-full sm:p-[5px]"
          onClick={handlePause}
        >
          <PauseIcon />
        </button>
      ) : (
        <button
          className="border-none p-[10px] text-white cursor-pointer bg-[green] rounded-full sm:p-[5px]"
          onClick={handleStart}
        >
          <PlayArrowIcon />
        </button>
      )}

      <button
        className="border-none p-[10px] text-white cursor-pointer bg-[red] rounded-full sm:p-[5px]"
        onClick={handleReset}
      >
        <ReplayIcon />
      </button>

      {/* <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button> */}
    </div>
  );
};

export default Timer;
