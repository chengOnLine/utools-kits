/* eslint-disable no-unreachable */

import CryptoJS from "crypto-js";
import * as asmcrypto from "asmcrypto.js";
// import useAppStroe from "../store/modules/app";
import JSEncrypt from "jsencrypt/bin/jsencrypt.min.js";
import axios from "axios";
import moment from "moment";
import md5 from "js-md5";
import { Buffer } from "buffer";
import { SYSTEMCONFIGKEY } from "@/utils/const.js";

import { getCurrentInstance } from "vue";
import useAppStroe from "@/store/modules/user.js";
// import useUserStore from "@/store/modules/user.js";
// import { ElNotification, ElMessageBox } from "element-plus";
// import { showSuccessToast, showFailToast } from "vant";
const typeDic = {
  docx: "application/msword",
  doc: "application/msword",
  bin: "application/octet-stream",
  exe: "application/octet-stream",
  so: "application/octet-stream",
  dll: "application/octet-stream",
  pdf: "application/pdf",
  ai: "application/postscript",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  dir: "application/x-director",
  js: "application/x-javascript",
  swf: "application/x-shockwave-flash",
  xhtml: "application/xhtml+xml",
  xht: "application/xhtml+xml",
  zip: "application/zip",
  mid: "audio/midi",
  midi: "audio/midi",
  mp3: "audio/mpeg",
  rm: "audio/x-pn-realaudio",
  rpm: "audio/x-pn-realaudio-plugin",
  wav: "audio/x-wav",
  bmp: "image/bmp",
  gif: "image/gif",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  css: "text/css",
  html: "text/html",
  htm: "text/html",
  txt: "text/plain",
  xsl: "text/xml",
  xml: "text/xml",
  mpeg: "video/mpeg",
  mpg: "video/mpeg",
  avi: "video/x-msvideo",
  movie: "video/x-sgi-movie",
};
class Common {
  constructor() {}
  //根据文件后缀名来映射Blob Type
  getFileTypeFn(fileType) {
    return typeDic[fileType];
  }
  // 导出
  // handleExportExcel(fn, fileName = "列表", fileType = "xlsx") {
  //   ElMessageBox.confirm(`导出${fileName}数据，是否继续？`, "提示", {
  //     confirmButtonText: "确定",
  //     cancelButtonText: "取消",
  //     type: "warning",
  //   })
  //     .then(async () => {
  //       showFailToast(
  //         "数据正在下载导出，请勿关闭浏览器。若导出时间过长，您可以处理别的事务（不影响导出）"
  //       );
  //       // ElNotification.success({
  //       //   title: "导出提示",
  //       //   message:
  //       //     "数据正在下载导出，请勿关闭浏览器。若导出时间过长，您可以处理别的事务（不影响导出）",
  //       //   showClose: true,
  //       // });
  //       const res = await fn();
  //       const link = document.createElement("a");
  //       const blob = new Blob([res], {
  //         type: typeDic[fileType],
  //       });
  //       link.style.display = "none";
  //       link.href = URL.createObjectURL(blob);
  //       link.download = fileName; //下载的文件名
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     })
  //     .catch(() => {});
  // }

  exportExcelMethod(data) {
    axios({
      method: data.method,
      url: `${data.url}${data.params ? "?" + data.params : ""}`,
      responseType: "blob",
      headers: {
        Authorization: "Bearer" + " " + sessionStorage.getItem("token"),
      },
      timeout: 8000,
      data: data.data,
    })
      .then((res) => {
        const link = document.createElement("a");
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        link.download = data.fileName; //下载的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        // Vue.prototype.$message.error('参数错误！')
        // store.commit('setLog',{});    // 清除日志头部信息，避免下次请求不需要日志而发送
      });
  }
  /**
   * @method 获取url参数
   * @param { string } url 浏览器地址
   * @param { string } key 匹配某一个字段
   * @returns { object | string } 如果 传了key后，则返回对应字段的value，如果没有，则返回一个匹配对象
   */
  getUrlParams(url, key) {
    url = url || window.location.href;
    const paramsObject = (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
      (a, v) => (
        (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
      ),
      {}
    );
    if (key) return paramsObject[key];
    return paramsObject;
  }
  /**
   * @method 深拷贝
   * @param { Object } obj 传入的对象, 如果是数组，需要在外部自己循环
   * @param { Map } hash 传入的map对象，防止对象循环引用出现无限循环
   * @returns { object }
   */
  deepClone(obj, hash = new WeakMap()) {
    const isComplexDataType = (obj) => {
      return (
        (typeof obj === "object" || typeof obj === "function") && obj !== null
      );
    };
    if (obj.constructor === Date) {
      return new Date(obj);
    } else if (obj.constructor === RegExp) {
      return new RegExp(obj);
    } else if (hash.has(obj)) {
      return hash.get(obj);
    }
    const allDesc = Object.getOwnPropertyDescriptors(obj);
    const cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
    hash.set(obj, cloneObj);
    for (let key of Reflect.ownKeys(obj)) {
      cloneObj[key] =
        isComplexDataType(obj[key]) && typeof obj[key] !== "function"
          ? this.deepClone(obj[key], hash)
          : obj[key];
    }
    return cloneObj;
  }
  /**
   * @method 判断传入参数的类型
   * @param { any } param 传入需要判断的变量
   * @param { string } type 变量的类型
   * @returns { boolean }
   * @use judgeParamType("a", "string") / judgeParamType({}, "object")
   */
  judgeParamType(param, type) {
    return (
      Object.prototype.toString.call(param) ===
      `[object ${type.slice(0, 1).toUpperCase() + type.slice(1)}]`
    );
  }

  /**
   *  深拷贝
   * @param {*} obj
   * @returns
   */
  deepCopy(obj) {
    const newObj = obj.constructor === Array ? [] : {};
    if (typeof obj !== "object") {
      return obj;
    }
    for (const i in obj) {
      if (typeof obj[i] === "object" && this.hasValue(obj[i])) {
        // 判断对象的这条属性是否为对象
        newObj[i] = this.deepCopy(obj[i]); // 若是对象进行嵌套调用
      } else {
        newObj[i] = obj[i];
      }
    }
    return newObj; // 返回深度克隆后的对象
  }
  //判断值是否为true还是false
  hasValue(value) {
    let val = value;
    let type = Object.prototype.toString;
    if (type.call(value).includes("Array") && value.length === 0) {
      val = "[]";
    }
    if (type.call(value).includes("Object") && JSON.stringify(value) == "{}") {
      val = "{}";
    }
    return ![
      undefined,
      null,
      "",
      false,
      0,
      "0",
      "false",
      NaN,
      "[]",
      "{}",
    ].includes(val);
  }

  //aes加密
  aesEn(word, key) {
    let keys = CryptoJS.enc.Utf8.parse(key);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, keys, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }
  //aes解密
  // aesDe(word, key) {
  //   let currentUser = store.state.currentUser;
  //   // console.log(currentUser.commonKey);
  //   let keyB = key ? key : currentUser.commonKey;
  //   console.log(keyB);
  //   let keys = CryptoJS.enc.Utf8.parse(keyB);
  //   var decrypt = CryptoJS.AES.decrypt(word, keys, {
  //     mode: CryptoJS.mode.ECB,
  //     padding: CryptoJS.pad.Pkcs7,
  //   });
  //   console.log(decrypt);
  //   return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  // }
  //rsa加密
  rsaEn(word, keyStr) {
    let crypt = new JSEncrypt();
    crypt.setPublicKey(keyStr);
    let str = crypt.encrypt(word);
    if (str) {
      return str;
    } else {
      return false;
    }
  }
  //rsa解密
  rsaDe(word, keyStr) {
    let crypt = new JSEncrypt();
    crypt.setPrivateKey(keyStr);
    let str = crypt.decrypt(word);
    if (str) {
      return str;
    } else {
      return false;
    }
  }
  // aes CBC 加密
  aesCbcEn(word) {
    if (!word) return word;
    this.SYSTEMCONFIG = useAppStroe().config;
    let key = CryptoJS.enc.Utf8.parse(this.SYSTEMCONFIG.ck);
    let iv = CryptoJS.enc.Utf8.parse(this.SYSTEMCONFIG.iv);
    let encrypted = CryptoJS.AES.encrypt(word, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString(); // 返回的是base64格式的密文
  }
  // aes CBC解密
  // 解密
  aesCbcDe(word) {
    if (!word) return word;
    this.SYSTEMCONFIG = useAppStroe().config;
    // console.log("SYSTEMCONFIG=>", this.SYSTEMCONFIG);
    let key = CryptoJS.enc.Utf8.parse(this.SYSTEMCONFIG.ck);
    let iv = CryptoJS.enc.Utf8.parse(this.SYSTEMCONFIG.iv);
    let decrypted = CryptoJS.AES.decrypt(word, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  //aes-gcm 加密
  aesGCMen(word, key, Biv) {
    let SYSTEMCONFIG = JSON.parse(sessionStorage.getItem(SYSTEMCONFIGKEY));
    if (!word) {
      return "";
    }
    if (typeof word != "string") {
      word = JSON.stringify(word);
    }
    const encoder = new TextEncoder();
    const msg = encoder.encode(word);
    const iv = encoder.encode(Biv ? Biv : SYSTEMCONFIG.iv);

    const Key = SYSTEMCONFIG.ck;
    const md5Instance = md5.create();
    const result = new Buffer(md5Instance.update(key ? key : Key).digest());

    // vite 下 node里的crypto模块用不了且第三方库 crypto-browserify 中的createHash方法会报错
    // const md5 = crypto.createHash('md5');
    // const result = md5.update(key ? key : currentUser.commonKey).digest();

    let data = asmcrypto.AES_GCM.encrypt(msg, result, iv);
    const enRes = new Buffer(data).toString("base64");
    return enRes;
  }

  // aes-gmc 解密
  aesGCMde(word, key, Biv) {
    let SYSTEMCONFIG = JSON.parse(sessionStorage.getItem(SYSTEMCONFIGKEY));
    if (!word) {
      return "";
    }
    const encoder = new TextEncoder();
    let utf8decoder = new TextDecoder();
    const iv = encoder.encode(Biv ? Biv : SYSTEMCONFIG.iv);

    const Key = SYSTEMCONFIG.ck;
    const md5Instance = md5.create();
    const result = new Buffer(md5Instance.update(key ? key : Key).digest());

    // const md5 = crypto.createHash('md5');
    // const result = md5.update(key ? key : currentUser.commonKey).digest();

    const b = Buffer.from(word, "base64");
    const deRes = utf8decoder.decode(asmcrypto.AES_GCM.decrypt(b, result, iv));
    return deRes;
  }
  //aes-gcm加密
  // aesGCMen(word, key, Biv) {
  //   // 解密
  //   let currentUser = {};
  //   const aesKey = key ? key : currentUser.commonKey
  //   const iv = Biv ? Biv : currentUser.commonIVSeed
  //   if (!word) {
  //     return ''
  //   }
  //   if (typeof word != 'string') {
  //     word = JSON.stringify(word)
  //   }
  //   const md5 = crypto.createHash('md5');
  //   const result = md5.update(aesKey).digest();
  //   const cipher = crypto.createCipheriv('aes-128-gcm', result, iv);
  //   const encrypted = cipher.update(word, 'utf8');
  //   const finalstr = cipher.final();
  //   const tag = cipher.getAuthTag();
  //   const res = Buffer.concat([encrypted, finalstr, tag]);
  //   return res.toString('base64');
  // }

  //aes-gcm解密
  // aesGCMde(word, key, Biv) {
  //   console.log("aesGCMde: appStore" , useAppStroe());
  //   // 解密
  //   let currentUser = useAppStroe().currentUser;
  //   const aesKey = key ? key : currentUser.commonKey
  //   const iv = Biv ? Biv : currentUser.commonIVSeed
  //   if (!word) {
  //     return ''
  //   }
  //   const md5 = crypto.createHash('md5');
  //   const result = md5.update(aesKey).digest();
  //   const decipher = crypto.createDecipheriv('aes-128-gcm', result, iv);
  //   const b = Buffer.from(word, 'base64')
  //   decipher.setAuthTag(b.subarray(b.length - 16));
  //   const str = decipher.update(Buffer.from(b.subarray(0, b.length - 16), 'hex'));
  //   const fin = decipher.final();
  //   const decryptedStr = new TextDecoder('utf8').decode(Buffer.concat([str, fin]))
  //   try {
  //     return JSON.parse(decryptedStr);
  //   } catch (e) {
  //     return decryptedStr
  //   }
  // }

  //脱敏过滤器
  hideCode(str, startLen = 3, endLen = 4) {
    str = String(str);
    if (str.length <= 7) {
      startLen = 2;
      endLen = 2;
      if (str.length < 4) return str;
    }

    let len = str.length;
    let firstStr = str.substr(0, startLen);
    let lastStr = str.substring(len - endLen, len);
    let middleStr = str
      .substring(startLen, len - Math.abs(endLen))
      .replace(/[\s\S]/gi, "*");
    let tempStr = firstStr + middleStr + lastStr;
    return tempStr;
  }

  outTime(time, type = "minutes") {
    let d = new Date(time);
    let datetime;
    switch (type) {
      case "year":
        datetime = d.getFullYear();
        break;
      case "month":
        datetime = d.getFullYear() + "-" + (d.getMonth() + 1);
        break;
      case "month-date":
        datetime = d.getMonth() + 1 + "-" + d.getDate();
        break;
      case "date":
        datetime =
          d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        break;
      case "minutes":
        datetime =
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1) +
          "-" +
          d.getDate() +
          " " +
          d.getHours() +
          ":" +
          d.getMinutes();
        break;
    }
    return datetime;
  }
  /**
   * @method 找当前菜单下的按钮
   * @param { string } id 当前菜单的id
   * @param { Array } list 菜单的list
   */
  findBtnAuth(id, list) {
    const find = (list) => {
      for (let index = 0; index < list.length; index++) {
        const el = list[index];
        if (el.menuVOS) {
          const item = find(el.menuVOS);
          if (item) return item;
        }
        if (el.id === id) {
          return el;
        }
      }
      return "";
    };
    const el = find(list);
    return el;
  }
  filterNoAuthBtn(btns, authList) {
    if (!authList) return false;
    const find = (name, list) => list.find((item) => item.name === name);
    // 这个是用来找table的操作
    if (Array.isArray(btns)) {
      const list = btns.filter((item) =>
        authList.some((it) => it.name === item.text)
      );
      return list;
    } else {
      // 这个是普通的
      return find(btns, authList);
    }
  }

  /**
   * 防抖debounce代码：
   * @param {*} fn  处理函数
   * @param {*} delay  时间 毫秒
   * @returns
   */
  debounce(fn, delay) {
    var timeout = null; // 创建一个标记用来存放定时器的返回值
    return function () {
      // 每当用户输入的时候把前一个 setTimeout clear 掉
      clearTimeout(timeout);
      // 然后又创建一个新的 setTimeout, 这样就能保证interval 间隔内如果时间持续触发，就不会执行 fn 函数
      timeout = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    };
  }

  /**
   * 节流throttle代码：
   * @param {*} fn 处理函数
   * @param {*} delay  时间 毫秒
   * @returns
   */
  throttle(fn, delay) {
    let canRun = true; // 通过闭包保存一个标记
    return function () {
      // 在函数开头判断标记是否为true，不为true则return
      if (!canRun) return;
      // 立即设置为false
      canRun = false;
      // 将外部传入的函数的执行放在setTimeout中
      setTimeout(() => {
        // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
        // 当定时器没有执行的时候标记永远是false，在开头被return掉
        fn.apply(this, arguments);
        canRun = true;
      }, delay);
    };
  }
  //计算倒计时时间 多少天时分秒
  countDownTime(starTime, endTime) {
    if (!starTime) return "--";
    let date1 = new Date(starTime).getTime() / 1000;
    let date2 = new Date().getTime() / 1000;
    // 如果不传结束时间 默认取当前时间
    if (endTime) date2 = new Date(endTime).getTime() / 1000;

    let date3 = Math.abs((date1 - date2) * 1000); //时间差的毫秒数
    // let pm = date1 - date2 < 0 ? '- ' : '' // 正负号
    let pm = date1 - date2 < 0 ? "超时：" : "剩余：";
    //计算出相差天数
    let days = parseInt(date3 / (24 * 3600 * 1000));
    //计算出小时数
    let leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000));
    // console.log(pm + days + '天 ' + hours + '小时 ' + minutes + ' 分钟')
    return pm + days + "天 " + hours + "小时 " + minutes + " 分钟";

    //计算相差秒数
    // let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    // let seconds = Math.round(leave3 / 1000)
    // return pm + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
  }

  // ********************** 下载 | url转base64 方法 *********************//
  downLoadFile(url, name) {
    if ("download" in document.createElement("a")) {
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      //设置新下载的文件名
      let downLoadFileName = decodeURI(name);
      link.setAttribute("download", downLoadFileName);
      document.body.appendChild(link);
      link.click();
    } else {
      //IE下载
      // navigator.msSaveBlob(new Blob([stream]), name)
    }
  }
  //文件流下载
  downloadBlobFile(
    result,
    fileName,
    bloeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    let blob = new Blob([result], { type: bloeType });
    if ("download" in document.createElement("a")) {
      // 非IE下载
      const elink = document.createElement("a");
      elink.download = fileName;
      elink.style.display = "none";
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    } else {
      // IE10+下载
      navigator.msSaveBlob(blob, fileName);
    }
  }
  //************************* 打印 *************************/
  print(htmlId) {
    //判断iframe是否存在，不存在则创建iframe
    var iframe = document.getElementById("print-iframe");
    if (!iframe) {
      var el = document.getElementById(`${htmlId}`);
      iframe = document.createElement("IFRAME");
      var doc = null;
      iframe.setAttribute("id", "print-iframe");
      iframe.setAttribute(
        "style",
        "position:absolute;width:0px;height:0px;left:-500px;top:-500px;"
      );
      document.body.appendChild(iframe);
      doc = iframe.contentWindow.document;
      //这里可以自定义样式
      // doc.write(`<link rel="stylesheet" type="text/css" href="./print.scss">`);
      doc.write("<div>" + el.innerHTML + "</div>");
      doc.close();
      iframe.contentWindow.focus();
    }
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
    if (navigator.userAgent.indexOf("MSIE") > 0) {
      //IE
      document.body.removeChild(iframe);
    }
  }
  /**
   * 处理时间格式
   * @param dateTime
   * @param tag  1--> yyyy-mm-dd hh:mm:ss  3---> yyyy-mm-dd  其他--> hh:mm:ss
   * @returns
   */
  handleDateTime(dateTime, tag) {
    const dt = new Date(dateTime);
    const y = dt.getFullYear();
    const m = (dt.getMonth() + 1 + "").padStart(2, "0");
    const d = (dt.getDate() + "").padStart(2, "0");

    const hh = (dt.getHours() + "").padStart(2, "0");
    const mm = (dt.getMinutes() + "").padStart(2, "0");
    const ss = (dt.getSeconds() + "").padStart(2, "0");
    if (tag === 1) {
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    } else if (tag === 3) {
      return `${y}-${m}-${d}`;
    } else {
      return `${hh}:${mm}:${ss}`;
    }
  }

  getDateRangeTime(dateType, valueFormat = "YYYY-MM-DD HH:mm:ss") {
    var times = {};
    switch (dateType) {
      case "今日":
        times = {
          startTime: moment().startOf("day").format(valueFormat),
          endTime: moment().endOf("day").format(valueFormat),
        };
        break;
      case "本周":
        let weekDay = moment().format("E"); //计算是这周第几天
        let monday = moment().subtract(weekDay - 1, "days"); //获取周一
        let sunday = moment().add(7 - weekDay, "days"); // 获取周日
        times = {
          startTime: moment(monday).startOf("day").format(valueFormat),
          endTime: moment(sunday).endOf("day").format(valueFormat),
        };
        break;
      case "本月":
        times = {
          startTime: moment().startOf("month").format(valueFormat),
          endTime: moment().endOf("month").format(valueFormat),
        };
        break;
      case "本年":
        times = {
          startTime: moment().startOf("year").format(valueFormat),
          endTime: moment().endOf("year").format(valueFormat),
        };
        break;
    }
    return times;
  }
}
const com = new Common();
export default com;
// 动态加载图片内容
export let getImageUrl = (url) =>
  new URL(`../assets/images/${url}`, import.meta.url).href;

// 获取全局属性
export let globalProperties = () => {
  const internalInstance = getCurrentInstance();
  return internalInstance.appContext.config.globalProperties;
};
