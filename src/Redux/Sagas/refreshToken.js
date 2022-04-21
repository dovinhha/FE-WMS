import axios from "axios";
import { BASE_URL } from "Services/ServiceURL";
import moment from "moment";

async function refreshToken() {
  const url = BASE_URL + "/auth/token";
  const res = await axios
    .post(url, {
      refreshToken: localStorage.getItem("refreshToken"),
    })
    .catch((err) => {
      window.history.pushState("", "", "/auth/login");
      window.location.reload(false);
    });
  // localStorage.setItem("refreshToken", res.data.refresh.token);
  console.log("refreshToken");
  localStorage.setItem("expiresAt", moment().unix() + 6000);
  // window.location.reload(false);
  return res.data.data.token;
}

export default refreshToken;
