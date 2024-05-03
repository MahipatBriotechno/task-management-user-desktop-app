import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "../../shared/Container";
import CardComponent from "../../CardComponent";
import MyModal from "../../shared/MyModal";
import CloseIcon from "@mui/icons-material/Close";
import { useStopwatch } from "react-timer-hook";
import Loader from "../../shared/Loader";
import {
  SingleTask,
  updateTask,
  updateUserTask,
} from "../../../state-management/admin/task/action";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import NoTask from "../../shared/NoTask";

interface MyComponentProps {
  tasks: any;
  loading: any;
}

const ActiveTask: React.FC<MyComponentProps> = ({ tasks, loading }) => {
  const [cardData, setCardData] = useState([
    {
      id: 1,
      date: "25/08/2023",
      isChecked: false,
      text: "Task 1",
      status: "Active",
      time: "0",
    },
    {
      id: 2,
      date: "26/08/2023",
      isChecked: false,
      text: "Task 2",
      status: "Active",
      time: "0",
    },
    {
      id: 3,
      date: "26/08/2023",
      isChecked: false,
      text: "Task 3",
      status: "Active",
      time: "0",
    },
  ]);

  const dispatch: any = useDispatch();
  const [selectId, setSelectId] = useState<any>();

  const [timerCurrent, setTimerCurrent] = useState("0");
  const [timerData, setTimerData] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const pauseDataGet = () => {
    const retrievedData = localStorage.getItem("pauseData");
    console.log("retrievedData", retrievedData);
  };

  const handleTimeUpdate = (time: number) => {
    setTimerData(time);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleEyeButtonClick = (card: any) => {
    setSelectId(card);
    setSelectedCard(card);
    openModal();
  };

  // ======================================

  // function MyStopwatch() {
  // const {
  //   totalSeconds,
  //   seconds,
  //   minutes,
  //   hours,
  //   days,
  //   isRunning,
  //   start,
  //   pause,
  //   reset,
  // } = useStopwatch({ autoStart: false });

  // // State to store hours, minutes, and seconds when pause button is clicked
  // const [pausedHours, setPausedHours] = useState(0);
  // const [pausedMinutes, setPausedMinutes] = useState(0);
  // const [pausedSeconds, setPausedSeconds] = useState(0);

  // const handlePause = () => {
  //   console.log("hours, minutes, seconds", hours, minutes, seconds);
  //   // Store current values of hours, minutes, and seconds when pause button is clicked
  //   setPausedHours(hours);
  //   setPausedMinutes(minutes);
  //   setPausedSeconds(seconds);
  //   setCardData([
  //     {
  //       id: 1,
  //       time: hours + ":" + minutes + ":" + seconds,
  //       date: "25/08/2023",
  //       isChecked: false,
  //       text: "Task 1",
  //       status: "Active",
  //     },
  //   ]);
  //   // setTimerCurrent(hours + ':' + minutes + ':' + seconds)

  //   pause();
  // };

  // return (
  //   <div style={{ textAlign: "center" }}>
  //     <h1>react-timer-hook</h1>
  //     <p>Stopwatch Demo</p>
  //     <div style={{ fontSize: "100px" }}>
  //       <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
  //       <span>{seconds}</span>
  //     </div>
  //     <p>{isRunning ? "Running" : "Not running"}</p>
  //     <button className="mx-5 shadow-md" onClick={start}>
  //       Start
  //     </button>
  //     <button className="mx-5 shadow-md" onClick={handlePause}>
  //       Pause
  //     </button>
  //     {/* <button onClick={reset}>Reset</button> */}
  //     {/* Display paused hours, minutes, and seconds */}
  //     <p>
  //       Paused Time: {pausedHours} hours, {pausedMinutes} minutes,{" "}
  //       {pausedSeconds} seconds
  //     </p>
  //   </div>
  // );
  // }

  // function MyStopwatch() {
  //   const {
  //     totalSeconds,
  //     seconds,
  //     minutes,
  //     hours,
  //     days,
  //     isRunning,
  //     start,
  //     pause,
  //     reset,
  //   } = useStopwatch({ autoStart: false });

  //   let cardDatas = [
  //     {
  //       id: 1,
  //       time: "0",
  //       date: "25/08/2023",
  //       isChecked: false,
  //       text: "Task 1",
  //       status: "Active",
  //     },
  //   ];
  //   const handlePause = () => {
  //     console.log("hours, minutes, seconds", hours, minutes, seconds);
  //     // Store current values of hours, minutes, and seconds when pause button is clicked
  //     cardDatas = [
  //       {
  //         id: 1,
  //         time: hours + ":" + minutes + ":" + seconds,
  //         date: "25/08/2023",
  //         isChecked: false,
  //         text: "Task 1",
  //         status: "Active",
  //       },
  //     ];

  //     // setTimerCurrent(hours + ':' + minutes + ':' + seconds)
  //     // console.log("cardDatas", cardDatas);
  //     localStorage.setItem("pauseData", JSON.stringify(cardDatas));
  //     pauseDataGet()

  //     pause();
  //   };

  //   return (
  //     <div style={{ textAlign: "center" }}>
  //       <h1>react-timer-hook</h1>
  //       <p>Stopwatch Demo</p>
  //       <div style={{ fontSize: "100px" }}>
  //         <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
  //         <span>{seconds}</span>
  //       </div>
  //       <p>{isRunning ? "Running" : "Not running"}</p>
  //       <button onClick={start}>Start</button>
  //       <button className="mx-5 shadow-md" onClick={handlePause}>
  //         Pause
  //       </button>
  //       {/* <button onClick={reset}>Reset</button> */}
  //     </div>
  //   );
  // }

  // console.log("cardData", cardData);

  // Parse the JSON string back into an array of objects
  // const pauseData = JSON.parse(retrievedData);
  // const pauseDataGet =()=> {
  //   const retrievedData = localStorage.getItem("pauseData");
  //   console.log("retrievedData",retrievedData)
  // }

  const singleTask = useSelector((state: any) => state?.task?.singleTask?.task);
  // const singleData = tasks && tasks?.filter(
  //   (ActiveTask: any) => ActiveTask.id === selectId
  // );
  const activeTasks =
    tasks &&
    tasks?.filter((task: { status: string }) => task.status === "Active");

  useEffect(() => {
    if (selectId) {
      dispatch(SingleTask(selectId));
    }
  }, [selectId]);

  const [selectUpdateId, setSelectUpdateId] = useState<any>();
  const [isChecked, setChecked] = useState<boolean>(false);
  const [isText, setText] = useState<any>("");

  const handleCheckboxChange = (id: number, checked: boolean, text: string) => {
    console.log("handleCheckboxChange");
    setCardData((prevCardData) =>
      prevCardData.map((card) => {
        if (card.id === id) {
          if (checked) {
            toast.success(`Your ${text} complete`);
            console.log(`card ${id} - isChecked: ${checked}:`, card);
            pauseDataGet();
            return { ...card, isChecked: checked };
          } else {
            return { ...card, isChecked: checked };
          }
        }
        return card;
      })
    );
  };

  // Update Task
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [empName, setEmpName] = useState("");
  const [empId, setEmpId] = useState("");
  const [status, setStatus] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  console.log("singleTask", singleTask);

  useEffect(() => {
    if (singleTask) {
      setTitle(singleTask.title || "");
      setEmpName(singleTask.empName || "");
      setEmpId(singleTask.empId || "");
      setStatus("Completed");
      setSubmissionDate(singleTask.submissionDate || "");
    }
  }, [singleTask]);

  const handleCheckboxToUpdateStatus = (
    id: any,
    checked: boolean,
    text: string
  ) => {
    dispatch(
      updateUserTask(
        selectUpdateId,
        date,
        title,
        empName,
        empId,
        status,
        submissionDate
      )
    );
    closeModalUpdate();
  };

  function openEditModal(_id: number, checked: boolean, text: string) {
    setSelectUpdateId(_id);
    setChecked(checked);
    setText(text);
    if (checked) {
      setIsEditOpen(true);
    }
  }

  // Delete Emplooye
  function closeModalUpdate() {
    setIsEditOpen(false);
  }

  useEffect(() => {
    if (selectUpdateId) {
      dispatch(SingleTask(selectUpdateId));
    }
  }, [selectUpdateId]);
  console.log("activeTasks", activeTasks);

  return (
    <>
      {/* <MyStopwatch /> */}
      <div>
        <ToastContainer position="top-right" />
        <Container>
          {loading ? (
            <Loader />
          ) : (
            <div className="mt-10 grid grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 ">
              {activeTasks?.length ? (
                activeTasks.map((task: any) => (
                  <div key={task._id}>
                    <CardComponent
                      task={task}
                      date={task?.assignDate}
                      isChecked={task.isChecked}
                      text={task.title}
                      status={task.status}
                      onTimeUpdate={handleTimeUpdate}
                      onChangeCheckbox={(checked: boolean) =>
                        openEditModal(task._id, checked, task.text)
                      }
                      // onChangeCheckbox={(checked: boolean) =>
                      //   handleCheckboxChange(task.id, checked, task.text)
                      // }
                      onEyeButtonClick={() => handleEyeButtonClick(task._id)}
                      id={task._id}
                      taskId={task._id}
                    />
                  </div>
                ))
              ) : (
                <NoTask />
              )}
            </div>
          )}
        </Container>
      </div>
      <MyModal
        isOpen={isOpen}
        closeModal={closeModal}
        className={`w-[450px] max-w-full py-5 px-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Task Details</h1>
          <CloseIcon onClick={closeModal} className="cursor-pointer" />
        </div>
        <div>
          <div className="flex flex-col gap-2 hover:shadow-md hover:bg-slate-100 p-3 mb-2 rounded-md border-[1px] border-solid border-lightGray">
            <div className="grid grid-cols-2 font-normal text-sm">
              <div className="font-light">Task:</div>
              <div className="font-medium">{singleTask?.title}</div>
            </div>
            <div className="grid grid-cols-2 font-normal text-sm">
              <div className="font-light">Assign Date:</div>
              <div className="font-medium">{singleTask?.assignDate}</div>
            </div>
            <div className="grid grid-cols-2 font-normal text-sm">
              <div className="font-light">Submission Date:</div>
              <div className="font-medium">{singleTask?.submissionDate}</div>
            </div>

            <div className="grid grid-cols-2 font-normal text-sm">
              <div className="font-light">Status:</div>
              <div className="font-medium">{singleTask?.status}</div>
            </div>
          </div>
        </div>
      </MyModal>

      {/* Update Task Modal  */}
      <MyModal
        isOpen={isEditOpen}
        closeModal={closeModalUpdate}
        className={`w-[450px] max-w-full py-5 px-5`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Task Completed</h1>
          <CloseIcon onClick={closeModalUpdate} className="cursor-pointer" />
        </div>
        <div>Are you sure you want to completed this task ?</div>
        <div className="mt-5 w-full flex justify-end">
          <Button autoFocus onClick={closeModalUpdate}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              handleCheckboxToUpdateStatus(selectId, isChecked, isText)
            }
          >
            Confirm
          </Button>
        </div>
      </MyModal>
    </>
  );
};

export default ActiveTask;
