import { general } from "enums";

const logoutHandler = () => {
  localStorage.removeItem("persist:root");
  localStorage.removeItem(general.TOKEN);
  localStorage.removeItem(general.PREVIOUS_PATH);
  window.location.href = "/dashboard/auth/login";
};

export default logoutHandler;
