import { config } from '@vue/test-utils';


const BaseFilter = {
  request (servObj: any): any {
    servObj.interceptors.request.use(
        function (config: any) {
          //config.headers.token = getLocalStorage('token');
          config.headers["Content-Type"] = "application/json;charset=UTF-8";
          return config;
        },
        function (error: any) {
          return Promise.reject(error);
        }
    );
  },
  response (servObj: any) {
    servObj.interceptors.response.use(function (res: any) {
      if (res.headers.filename) {
        const filename = decodeURI(res.headers.filename);
        const fileType = filename.split(".")[1];
        let type; // 产生二进制blob的MIME类型
        switch (fileType) {
            // case "xls" :
            //   type = "application/vnd.ms-excel";
            //   break;
            // case  "xlsx":
            //   type = "application/vnd.ms-excel";
            // break;
          case "doc":
            type = "application/msword";
            break;
          case "docx":
            type =
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            break;
          case "pdf":
            type = "application/pdf";
            break;
          case "bmp":
            type = "image/bmp";
            break;
          case "png":
            type = "image/png";
            break;
          case "gif":
            type = "image/gif";
            break;
          case "jpe" || "jpeg" || "jpg":
            type = "image/jpeg";
            break;
        }
        const blobStream = new Blob([res.data], { type });
        const url = window.URL.createObjectURL(blobStream);
        return { filename, url, blobStream };
      }
      if (res.status === 200 && res.data && res.data.msg === "ok") {
        return res.data.data;
      }
      if (res.status === 200 && res.data) {
        return res;
      }

      if (res.status === 200 && res.data && res.data.msg !== "ok") {
        return Promise.reject(new Error("未知服务器错误"));
      }
      return Promise.reject(new Error("未知服务器错误"));
    });
  }
};
function injectFilter (servObj: any) {
  BaseFilter.request(servObj);
  BaseFilter.response(servObj);
}
export default injectFilter;

