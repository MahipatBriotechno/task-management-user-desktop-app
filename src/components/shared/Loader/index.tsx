
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-96 w-full">
      <ClipLoader color="text-primary" size={50} />
    </div>
  );
};

export default Loader;
