import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ActiveTask from "../../components/user/ActiveTask";
import CompleteTask from "../../components/user/CompleteTask";
import PendingTask from "../../components/user/PendingTask";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserTasks } from "../../state-management/user/userTask/actions";
import { Layout } from "../../components/Layout";
import HeaderUser from "../../components/header";

export const UserDashboard = () => {
  const dispatch: any = useDispatch();
  const location = useLocation();

  const extractValue = (queryString: any) => {
    const parts = queryString.split("=");
    return parts[1];
  };

  const activeTab = extractValue(location.search);

  // console.log("location.pathname activeTab", activeTab);

  const { tasks, loading, error } = useSelector(
    (state: any) => state.userTasks
  );
  const singleTask = useSelector((state: any) => state.task);
  const data: any = localStorage.getItem("user");
  const db = JSON.parse(data);
  useEffect(() => {
    const empId = db?.userData?._id;
    dispatch(fetchUserTasks(empId));
  }, [dispatch]);

  console.log("singleTask", singleTask);

  console.log("tasks___", tasks);

  return (
    <Layout>
      <HeaderUser />
      {activeTab == "active" ? (
        <ActiveTask tasks={tasks} loading={loading} />
      ) : activeTab == "completed" ? (
        <CompleteTask tasks={tasks} loading={loading} />
      ) : activeTab == "pending" ? (
        <PendingTask tasks={tasks} loading={loading} />
      ) : (
        <ActiveTask tasks={tasks} loading={loading} />
      )}
    </Layout>
  );
};
