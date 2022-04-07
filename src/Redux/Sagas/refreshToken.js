import axios from "axios";
import { BASE_URL } from "Services/ServiceURL";

async function refreshToken() {
  const url = BASE_URL + "/auth/refresh-tokens";
  const res = await axios
    .post(url, {
      refreshToken: localStorage.getItem("refreshToken"),
    })
    .catch((err) => {
      window.history.pushState("", "", "/auth/login");
      window.location.reload(false);
    });
  localStorage.setItem("refreshToken", res.data.refresh.token);
  localStorage.setItem("expiresAt", res.data.access.expires);
  window.location.reload(false);
  return res.data.access.token;
}

export default refreshToken;
