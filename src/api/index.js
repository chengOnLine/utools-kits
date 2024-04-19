import { request } from "@U/request";

const systemUrl = "/zty-msy";
const fileUrl = "/qkwg-file";
const oauthUrl = "/zty-oauth-server";

export default {
  login: request("post", oauthUrl + "/oauth/token", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }),
  qkToMsyPreLoginToken: request('post' , '/zty-api/preLogin/msyPreLoginToken' , {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }),
  oaGetMsyLoginToken: request('post' , '/zty-api/preLogin/oaGetMsyLoginToken' , {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }),
  zltLogin: request('post' , systemUrl + ' /dpa-cloud/appLogin/zltLogin'), // 政务通、治理通登录
  logout: request("get", "/qkwg-oauth-server/auth/loginOut/0"), // 退出登录
  getVerifyCodeImg: request("get", oauthUrl + "/oauth/getVerifyCodeImg"), //获取验证码图片
  // 获取系统当前配置信息
  getSystemCurrConfig: request(
    "get",
    systemUrl + "/sysConfig/getSystemCurrConfig"
  ),
  getCurrentUser: request("get", "/zty-system/sys/sysuser/getCurrentUser"), //获取当前登录用户
  //文件管理
  upFileBase64: request("post", fileUrl + "/user/sysAttachment/upFileBase64", {
    timeout: 600000,
  }), 
  //文件删除
  deleteFile: request("post", fileUrl + "/user/sysAttachment/deleteFileBase64"),
  //文件流上传
  upFileStream: request("post", "/dpa-file/file/upImgStream", {
    timeout: 600000,
  }),
  systemChangeRole: request("post", systemUrl + "/system/changeRole/"), //切换角色
  systemLogout: request("post", systemUrl + "/system/logout"), //退出登录

  getMSYEventPage: request('post' , systemUrl + '/channelEvent/loadChannelEvent' , {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }), // 民声云列表
  getMSYEventDetails: request('post' , systemUrl + '/channelEvent/loadChannelEventDetail' , {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }), // 民声云详情
  msStatisifyTable: request('post' , systemUrl + '/msReportCollect/msStatisifyPage'), // 民声云不满意
  getLastAppVersion: request('post' , '/zty-system/appLogin/getLastAppVersion' ), // 民声云动态密钥
  getStatisfyList: request('post' , systemUrl + '/channelEvent/getStatisfyList' ), // 民声云满意度调查
  getFlowDetails: request('post' , systemUrl + '/channelEvent/loadChannelFlowDetail',{
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }
  ), // 民声云流转记录
  getDealAndApproveInfo: request('post' , systemUrl + '/msyLeaderView/getDealAndApproveInfo'),
  loadEventCount: request('post' , systemUrl + '/msyLeaderView/loadEventCount'),
  getDeptEventNumList: request('post' , systemUrl + '/msyLeaderView/getDeptEventNumList'),
  getEventChannelInfo: request('post' , systemUrl + '/msyLeaderView/getEventChannelInfo'),
  getEventLevelInfo: request('post' , systemUrl + '/msyLeaderView/getEventLevelInfo'),
  getEventTypeInfo: request('post' , systemUrl + '/msyLeaderView/getEventTypeInfo'),
  getCurrDeptEventInfo: request('post' , systemUrl + '/msyLeaderView/getCurrDeptEventInfo'),


  getHotEventTopTen: request('post' , systemUrl + '/msyLeaderView/getHotEventTopTen'),
  getEventSixTypeInfo: request('post' , systemUrl + '/msyLeaderView/getEventSixTypeInfo'),

};
