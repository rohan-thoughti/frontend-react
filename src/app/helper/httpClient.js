import axios from "axios";
const qs = require("qs");
const apiurl = process.env.REACT_APP_API_URL;

export const lib = {
  async request(urlMethods, props) {
    const ajaxProps = {
      method: urlMethods.method,
      data: qs.stringify(props),
      url: apiurl + urlMethods.url,
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    };
    try {
      const data = await axios(ajaxProps);
      return data;
    } catch (err) {
      return err;
    }
  },
  async authRequest(urlMethods, props) {
    const token = window.localStorage.getItem("token");
    // const accToken = "Bearer "
    const ajaxProps = {
      method: urlMethods.method,
      data: qs.stringify(props),
      url: apiurl + urlMethods.url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios(ajaxProps);
      const data = response;
      return data;
    } catch (err) {
      return err.response;
    }
  },
};
