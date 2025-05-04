import { IoAlertCircle } from "react-icons/io5";
import { FaCheckCircle, FaSkullCrossbones } from "react-icons/fa";
import { MdDangerous } from "react-icons/md";
import { IoClose } from "react-icons/io5";

type NotificationProps = {
  type: "alert" | "success" | "fail" | "danger";
  message?: string;
  onClose?: () => void;
};

const Notification = ({ type, message, onClose }: NotificationProps) => {
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
    <div className="w-sm absolute z-[202] top-0 md:top-4 md:right-4 flex items-center gap-4 p-4 bg-gray-200 rounded-lg shadow-lg">
      {logo}
      <p className="flex-grow">{message}</p>
      {onClose && (
        <button onClick={onClose} className="text-gray-700 hover:text-black">
          <IoClose size={24} />
        </button>
      )}
    </div>
  );
};

export default Notification;
