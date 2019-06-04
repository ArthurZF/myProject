import { Notification } from "element-ui";
const postUrl = "http://localhost:3000/entrance.js";
// const postUrl = "http://10.60.13.30:3000/entrance.js"
const headers = {
  "Content-Type": "application/x-www-form-urlencoded"
};
const applicationCode = "KOA20";
const computeData = function(data, url) {
  return JSON.stringify({
    applicationCode: applicationCode,
    sendData: data,
    sendFrom: "planningProject",
    sendCode: url
  });
};
export const post = function(url, data) {
  let postConfig = {
    method: "POST",
    headers: headers,
    body: `data=${computeData(data, url)}`,
    mode: "cors"
  };
  return new Promise(resolve => {
    fetch(postUrl, postConfig)
      .then(response => {
        return response;
      })
      .then(response => {
        return response.json();
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        Notification.error({
          title: "错误",
          message: String(err)
        });
      });
  });
};
