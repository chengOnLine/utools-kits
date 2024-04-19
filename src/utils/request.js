import axios from "axios";
import qs from "qs";
// import { closeToast, showFailToast, showLoadingToast } from "vant";
import { httpCode } from "@U/httpCode";
import useUserStore from "@/store/modules/user.js";

const defaultConfig = {
  timeout: 6000,
};
let showMessageBox = false; //处理并发请求，避免弹出多个询问框

class Http {
  constructor() {
    this.loadingConfig = {
      isLoading: false,
    };
    this.myAxios = axios.create(defaultConfig);
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  openLoading() {
    const op = {
      ...{
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      },
      ...this.loadingConfig,
    };
    if (this.loadingConfig?.isLoading) {
      // 开始加载
      // showLoadingToast({
      //   message: op.message,
      //   forbidClick: true,
      //   loadingType: "spinner",
      // });
    }
  }
  closeLoading() {
    // closeToast();
    this.loadingConfig = {
      isLoading: false,
    };
  }
  //请求拦截
  interceptorsRequest() {
    this.myAxios.interceptors.request.use(
      (config) => {
        this.loadingConfig.isLoading && this.openLoading();
        const token = useUserStore().token;
        const headers = {
          ...(config.headers ? config.headers : {}),
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        } else {
          // router.push({ path: "/" }).then((result) => {
          //   location.reload();
          // });
        }
        config.headers = headers;
        return config;
      },
      (error) => {
        this.loadingConfig.isLoading && this.closeLoading();
        throw new Error(JSON.stringify(error));
      }
    );
  }
  interceptorsResponse() {
    const handleSuccess = (res) => {
      if (
        (res && res.code === "401" && !showMessageBox) ||
        (res.msg === "token为空" && !showMessageBox)
      ) {
        //处理请求并发，避免弹出多个询问框
        showMessageBox = true;
        // showFailToast("登录状态已过期");
        useUserStore().token = '';
        //登录过期跳转页面或者需要执行的操作
        // router.push({ path: "/" }).then((result) => {
        //   location.reload();
        // });
        setTimeout(() => {
          //3秒后解开  可以继续弹框询问
          showMessageBox = false;
        }, 3000);
        return res;
      } else {
        return res;
      }
    };
    // 响应拦截
    this.myAxios.interceptors.response.use(
      (response) => {
        this.loadingConfig.isLoading && this.closeLoading();
        const res = handleSuccess(response.data);
        return res;
      },
      (error) => {
        this.loadingConfig.isLoading && this.closeLoading();
        // 用户没有网络情况 或者 timeout时间过期
        if (!error.response && JSON.stringify(error).includes("timeout of")) {
          // showFailToast("网络请求超时,请稍后再试。");
          return;
        }
        const { status, data } = error.response;
        if (status >= 500) {
          // showFailToast(error(httpCode[status]));
        } else {
          // 返回体有数据返回的
          return handleSuccess(data);
        }
      }
    );
  }
  /**
   * @method 请求
   * @param { string } method 发送的方式
   * @param { stinng } url 请求的url
   * @param { object } config 配置项，看readme.md文件，并且更详细的可以看axios文档
   * @returns
   */
  request(method, url, config = {}) {
    if (!method || !url) {
      console.error(`请传入${method ? "url" : "method"}`);
      return;
    }
    /**
     * @param { any } data 发送的数据
     * @param { object } extraConfig 跟config传的参数一样，这个权重最大， 例如一个接口多个发送方式(method)，跟config传的参数一样，这个权重最大
     */
    return (data, extraConfig = {}) => {
      const params = {
        ...{
          method,
          url,
        },
        ...config,
      };

      // 处理业务层传进来额外的参数，例如一个接口多个发送方式(method)
      for (const key in extraConfig) {
        if (extraConfig.suffixUrl) {
          params.url += extraConfig.suffixUrl;
        } else {
          params[key] = extraConfig[key];
        }
      }
      // loading配置
      if (params.loadingConfig && params.loadingConfig.isLoading) {
        this.loadingConfig = {
          ...{ isLoading: true },
          ...(params.loadingConfig ? params.loadingConfig : {}),
        };
      }

      if (method.toLowerCase() === "get" || method.toLowerCase() === "delete") {
        if (data && typeof data === "object") {
          params.params = data;
        } else if (typeof data === "string" || typeof data === "number") {
          params.url += data;
        }
      } else if (method.toLowerCase() === "post") {
        if (data && typeof data === "object") {
          if (
            params.headers &&
            params.headers["Content-Type"].includes(
              "application/x-www-form-urlencoded"
            )
          ) {
            params.data = qs.stringify(data);
          } else {
            params.data = data;
          }
        } else if (typeof data === "string" || typeof data === "number") {
          params.url += data;
        }
      } else {
        params.data = data;
      }
      return this.myAxios.request(params);
    };
  }
}
const http = new Http();
const request = http.request.bind(http);
export { request, http };
