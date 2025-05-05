import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Meta() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let title = "InggrisLand";
    let favicon = "/favicon.ico";

    switch (path) {
      case "/":
        title = "Home | InggrisLand";
        break;
      case "/explore":
        title = "Explore | InggrisLand";
        break;
      case "/login":
        title = "Login | InggrisLand";
        break;
      case "/account":
        title = "Your Account | InggrisLand";
        break;
      default:
        title = "InggrisLand";
    }

    document.title = title;

    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.setAttribute("rel", "icon");
    link.setAttribute("href", favicon);
    document.head.appendChild(link);
  }, [location]);

  return null;
}

export default Meta;
