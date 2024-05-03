import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "../../shared/Container";
import CardComponent from "../../CardComponent";
import MyModal from "../../shared/MyModal";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../../shared/Loader";
import { useDispatch, useSelector } from "react-redux";
import { SingleTask } from "../../../state-management/admin/task/action";

interface MyComponentProps {
  tasks: any;
  loading: any;
}

const CompleteTask: React.FC<MyComponentProps> = ({ tasks, loading }) => {
  const dispatch: any = useDispatch();

  const [cardData, setCardData] = useState([
    {
      id: 1,
      date: "25/08/2023",
      isChecked: false,
      text: "Task 1",
      status: "Completed",
      time: 0,
    },
    {
      id: 2,
      date: "26/08/2023",
      isChecked: false,
      text: "Task 2",
      status: "Completed",
      time: 0,
    },
    {
      id: 3,
      date: "26/08/2023",
      isChecked: false,
      text: "Task 3",
      status: "Completed",
      time: 0,
    },
  ]);
  const [selectId, setSelectId] = useState<any>();
  const [timerData, setTimerData] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const singleTask = useSelector((state: any) => state?.task?.singleTask?.task);

  useEffect(() => {
    if (selectId) {
      dispatch(SingleTask(selectId));
    }
  }, [selectId]);

  const handleCheckboxChange = (id: number, checked: boolean, text: string) => {
    setCardData((prevCardData) =>
      prevCardData.map((card) => {
        if (card.id === id) {
          if (checked) {
            toast.success(`Your ${text} complete`);
            console.log(`card ${id} - isChecked: ${checked}:`, card);
            return { ...card, isChecked: checked };
          } else {
            return { ...card, isChecked: checked };
          }
        }
        return card;
      })
    );
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

  const singleData = cardData.filter(
    (ActiveTask) => ActiveTask.id === selectId
  );

  const completedTasks = tasks.filter(
    (task: { status: string }) => task.status === "Completed"
  );
  console.log("completedTasks", completedTasks);

  return (
    <>
      <div>
        <ToastContainer position="top-right" />
        <Container>
          {loading ? (
            <Loader />
          ) : (
            <div className="mt-10 grid grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 ">
              {completedTasks &&
                completedTasks.map((card: any) => (
                  <div key={card._id}>
                    <CardComponent
                      date={card?.assignDate}
                      isChecked={card.isChecked}
                      text={card.title}
                      status={card.status}
                      onTimeUpdate={handleTimeUpdate}
                      onChangeCheckbox={(checked: boolean) =>
                        handleCheckboxChange(card.id, checked, card.text)
                      }
                      onEyeButtonClick={() => handleEyeButtonClick(card._id)}
                      id={card.id}
                    />
                  </div>
                ))}
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
    </>
  );
};

export default CompleteTask;
