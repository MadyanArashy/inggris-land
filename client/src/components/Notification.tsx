import { IoAlertCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { FaSkullCrossbones } from "react-icons/fa";
import { MdDangerous } from "react-icons/md";

type NotificationProps = {
  type: "alert" | "success" | "fail" | "danger",
  message?: string
}

const Notification = ({type, message}: NotificationProps) => {
  let logo;
  switch(type) {
    case "alert":
      logo = <IoAlertCircle size={"2rem"} color="grey"/>;
      break;
    case "success":
      logo = <FaCheckCircle size={"2rem"} color="lime"/>;
      break;
    case "fail":
      logo = <FaSkullCrossbones size={"2rem"} color="red"/>;
      break;
    case "danger":
      logo = <MdDangerous size={"2rem"} color="red"/>;
      break;
  }
  if(!message){message = `New ${type} notification`}

  return (
    <div className="w-sm absolute z-[202] top-0 md:top-4 md:right-4 flex flex-row p-4 justify-between bg-gray-200 rounded-lg">
      {logo}
      <p>{message}</p>
    </div>
  )
}

export default Notification;