import { IoAlertCircle } from "react-icons/io5";
import { FaCheckCircle, FaSkullCrossbones } from "react-icons/fa";
import { MdDangerous } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

type NotificationProps = {
  type: "alert" | "success" | "fail" | "danger";
  message?: string;
};

const Notification = ({ type, message }: NotificationProps) => {
  const [hidden, setHidden] = useState(false);
  let logo;
  switch (type) {
    case "alert":
      logo = <IoAlertCircle size={"2rem"} color="grey" />;
      break;
    case "success":
      logo = <FaCheckCircle size={"2rem"} color="lime" />;
      break;
    case "fail":
      logo = <FaSkullCrossbones size={"2rem"} color="red" />;
      break;
    case "danger":
      logo = <MdDangerous size={"2rem"} color="red" />;
      break;
  }

  if (!message) {
    message = `New ${type} notification`;
  }

  return (
    <div className={`${hidden ? "hidden" : "fixed"} w-md absolute z-[202] top-0 md:top-4 md:right-4 flex items-center gap-4 p-4 bg-gray-200 rounded-lg shadow-lg`}>
      {logo}
      <p className="flex-grow">{message}</p>
      <button onClick={() => setHidden(true)} className="text-gray-700 hover:text-black">
        <IoClose size={24} />
      </button>
    </div>
  );
};

export default Notification;
