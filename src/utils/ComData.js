export const ComData = {
  // 性别
  sex: [
    {
      value: '0',
      label: '女'
    },
    {
      value: '1',
      label: '男'
    }
  ],
  // 性别
  sexObj: {
    '0': {
      value: '0',
      label: '女'
    },
    '1': {
      value: '1',
      label: '男'
    }
  },
  // 是否
  is: [
    {
      value: '1',
      label: '是'
    },
    {
      value: '0',
      label: '否'
    }
  ],
  // 是否
  isObj: {
    '0': {
      value: '0',
      label: '否'
    },
    '1': {
      value: '1',
      label: '是'
    }
  },
  isAct: {
    '0': {
      value: '1',
      label: '否'
    },
    '1': {
      value: '0',
      label: '是'
    }
  },
  // 事件来源
  source: [
    // {
    //   value: '01075506',
    //   label: 'I深圳'
    // },
    {
      value: '01075518',
      label: '光明政府在线'
    },
    {
      value: '01075519',
      label: '区长热线'
    },
    {
      value: '01075520',
      label: '人民网'
    },
    {
      value: '01075521',
      label: '12345热线'
    },
    {
      value: '01075546',
      label: '市民生诉求'
    },
    {
      value: '01075540',
      label: '光明融媒'
    },
    {
      value: '01075541',
      label: '輿情'
    },
    {
      value: '01075512',
      label: '书记在线'
    },
    {
      value: '01075543',
      label: '非警情'
    },
    {
      value: '01075547',
      label: '办不成事反应窗口'
    },
    {
      value: '01075549',
      label: '妇联'
    }
  ],
  // 事件来源Obj
  sourceObj: {
    '01075547': {
      value: '01075547',
      label: '办不成事反应窗口'
    },
    '01075506': {
      value: '01075506',
      label: 'I深圳'
    },
    '01075518': {
      value: '01075518',
      label: '光明政府在线'
    },
    '01075519': {
      value: '01075519',
      label: '区长热线'
    },
    '01075520': {
      value: '01075520',
      label: '人民网'
    },
    '01075521': {
      value: '01075521',
      label: '12345热线'
    },
    '01075546': {
      value: '01075546',
      label: '市民生诉求'
    },
    '01075540': {
      value: '01075540',
      label: '光明融媒'
    },
    '01075541': {
      value: '01075541',
      label: '輿情'
    },
    '01075512': {
      value: '01075512',
      label: '书记在线'
    },
    '01075543': {
      value: '01075543',
      label: '非警情'
    },
    '01075549':{
      value: '01075549',
        label: '妇联'
    }
  },

  // 事件等级
  eventLevel: [
    {
      label: '普通',
      value: '1',
      color: '#999'
    },
    {
      label: '重要',
      value: '2',
      color: '#409EFF'
    },
    {
      label: '紧急',
      value: '3',
      color: '#F56C6C'
    },
    // {
    //   label: '突发',
    //   value: '4',
    //   color: '#E6A23C'
    // },
    // {
    //   label: '其他',
    //   value: '99',
    //   color: '#999'
    // }
  ],
  // 事件等级Obj
  eventLevelObj: {
    '1': {
      label: '普通',
      value: '1',
      color: '#999'
    },
    '2': {
      label: '重要',
      value: '2',
      color: '#409EFF'
    },
    '3': {
      label: '紧急',
      value: '3',
      color: '#F56C6C'
    },
    '4': {
      label: '突发',
      value: '4',
      color: '#E6A23C'
    },
    '99': {
      label: '其他',
      value: '99',
      color: '#999'
    }
  },
  // 事件类型
  eventType: [
    {
      label: '其他',
      value: '99'
    },
    {
      label: '咨询工单',
      value: '1'
    },
    {
      label: '投诉工单',
      value: '2'
    },
    {
      label: '举报工单',
      value: '3'
    },
    {
      label: '意见建议',
      value: '4'
    },
    {
      label: '求助工单',
      value: '5'
    },
    {
      label: '表扬工单',
      value: '6'
    },
    {
      label: '留言工单',
      value: '7'
    },
    {
      label: '无效工单',
      value: '8'
    }
  ],
  appealEventType: [
    {
      label: '书记在线',
      value: '81'
    },
    {
      label: '其他',
      value: '99'
    }
  ],
  // 事件流转状态
  flowType: [
    // {
    //   value: '1',
    //   label: '待区签收',
    //   isArea: false
    // },
    {
      value: '2',
      label: '待区分拨',
      isArea: false
    },
    {
      value: '3',
      label: '待部门签收',
      isArea: true
    },
    {
      value: '4',
      label: '待部门处置',
      isArea: true
    },
    {
      value: '5',
      label: '待终审',
      isArea: false
    },
    {
      value: '6',
      label: '待12345审核',
      isArea: false
    },
    {
      value: '7',
      label: '已办结',
      isArea: false
    },
    {
      value: '8',
      label: '待退回审核',
      isArea: false
    },
    {
      value: '9',
      label: '待区延期审核',
      isArea: false
    },
    {
      value: '10',
      label: '待区撤销申请',
      isArea: false
    },
    {
      value: '16',
      label: '待二级部门签收',
      isArea: true
    },
    {
      value: '11',
      label: '待二级部门处置',
      isArea: true
    },
    {
      value: '12',
      label: '待部门处置审核',
      isArea: true
    },
    {
      value: '13',
      label: '待部门退回审核',
      isArea: true
    },
    {
      value: '14',
      label: '待部门延期审核',
      isArea: true
    },
    {
      value: '15',
      label: '待部门撤销审核',
      isArea: true
    },
    {
      value: '21',
      label: '待协办办结',
      isArea: true
    }
  ],
  // 事件流转状态Obj
  flowTypeObj: {
    '1': {
      value: '1',
      label: '待区签收',
      color: '#e73d09'
    },
    '2': {
      value: '2',
      label: '待区分拨',
      color: '#3db20f'
    },
    '3': {
      value: '3',
      label: '待部门签收',
      color: '#e73d09'
    },
    '4': {
      value: '4',
      label: '待部门处置',
      color: '#3db20f'
    },
    '5': {
      value: '5',
      label: '待终审',
      color: '#20a0ff'
    },
    '6': {
      value: '6',
      label: '待12345审核',
      color: '#20a0ff'
    },
    '7': {
      value: '7',
      label: '已办结',
      color: '#999'
    },
    '8': {
      value: '8',
      label: '待退回审核',
      color: '#e73d09'
    },
    '9': {
      value: '9',
      label: '待延期审核',
      color: '#e73d09'
    },
    '10': {
      value: '10',
      label: '申请撤销',
      color: '#20a0ff'
    },
    '11': {
      value: '10',
      label: '待二级部门处置',
      color: '#20a0ff'
    },
    '16': {
      value: '10',
      label: '待二级部门签收',
      color: '#20a0ff'
    },
    '12': {
      value: '10',
      label: '待部门处置审核',
      color: '#20a0ff'
    },
    '13': {
      value: '10',
      label: '待部门退回审核',
      color: '#20a0ff'
    },
    '14': {
      value: '10',
      label: '待部门延期审核',
      color: '#20a0ff'
    },
    '15': {
      value: '10',
      label: '待部门撤销审核',
      color: '#20a0ff'
    }
  },
  // 事件流转状态Obj
  eventResult: {
    '7': {
      value: '7',
      label: '提交'
    },
    '20': {
      value: '20',
      label: '自动分拨到部门'
    },
    '21': {
      value: '21',
      label: '区管控分拨事件给部门'
    },
    '22': {
      value: '22',
      label: '区管控签收'
    },
    '24': {
      value: '24',
      label: '区退回12345热线'
    },
    '25': {
      value: '25',
      label: '退回外部系统'
    },
    '26': {
      value: '26',
      label: '区延期通过'
    },
    '27': {
      value: '27',
      label: '区延期不通过'
    },
    '28': {
      value: '28',
      label: '区审核不通过'
    },
    '29': {
      value: '29',
      label: '区审核不通过'
    },
    '30': {
      value: '30',
      label: '添加部门'
    },
    '40': {
      value: '40',
      label: '部门签收'
    },
    '41': {
      value: '41',
      label: '部门提交到终审'
    },
    '43': {
      value: '43',
      label: '退回区分拨'
    },
    '44': {
      value: '44',
      label: '申请延期'
    },
    '45': {
      value: '45',
      label: '申请撤销'
    },
    '46': {
      value: '46',
      label: '指派给二级部门'
    },
    '47': {
      value: '47',
      label: '二级部门申请办结'
    },
    '48': {
      value: '48',
      label: '二级部门申请办结不通过'
    },
    '49': {
      value: '49',
      label: '二级部门签收'
    },
    '50': {
      value: '50',
      label: '终审通过'
    },
    '52': {
      value: '52',
      label: '终审不通过返回部门处置'
    },
    '60': {
      value: '60',
      label: '同意退回'
    },
    '61': {
      value: '61',
      label: '不同意退回'
    },
    '62': {
      value: '62',
      label: '同意终审通过'
    },
    '63': {
      value: '63',
      label: '不同意终审通过'
    },
    '64': {
      value: '64',
      label: '12345同意延期'
    },
    '65': {
      value: '65',
      label: '12345不同意延期'
    },
    '66': {
      value: '66',
      label: '12345同意撤销'
    },
    '67': {
      value: '67',
      label: '12345不同意撤销'
    },
    '68': {
      value: '68',
      label: '申诉通过'
    },
    '69': {
      value: '69',
      label: '申诉不通过'
    },
    '400': {
      value: '400',
      label: '部门自动签收'
    },
    '411': {
      value: '411',
      label: '二级部门申请延期'
    },
    '412': {
      value: '412',
      label: '二级延期申请延期不通过'
    },
    '413': {
      value: '413',
      label: '二级部门申请撤销'
    },
    '414': {
      value: '414',
      label: '二级申请撤销不通过'
    },
    '415': {
      value: '415',
      label: '二级部门申请退回'
    },
    '416': {
      value: '416',
      label: '二级申请退回不通过'
    },
    '417': {
      value: '417',
      label: '二级部门申请退回通过'
    },
    '418': {
      value: '418',
      label: '二级部门申请延期通过'
    },
    '419': {
      value: '419',
      label: '二级申请撤销通过'
    },
    '420': {
      value: '420',
      label: '二级处置申请办结通过'
    },
    '600': {
      value: '600',
      label: '申诉'
    },
    '601': {
      value: '601',
      label: '不申诉'
    }
  },
  // 事件流转状态
  checkStatus: [
    {
      label: '禁用',
      value: '0'
    },
    {
      label: '启用',
      value: '1'
    }
  ],
  // 超时状态
  eventTimeout: [
    {
      label: '正常',
      value: '0'
    },
    {
      label: '红色预警',
      value: '1'
    },
    {
      label: '黄色预警',
      value: '2'
    }
  ],
  //申请驳回
  applyReject:[
    {
      label: '申请驳回',
      value: '1'
    },
  ],
  // 分拨类型
  alloType: [
    {
      label: '自动分拨',
      value: '0'
    },
    {
      label: '人工分拨',
      value: '1'
    },
    {
      label: '系统推荐分拨',
      value: '2'
    }
  ],
  // 受理告知
  inform: [
    {
      label: '电话',
      value: '1'
    },
    {
      label: '短信',
      value: '2'
    },
    {
      label: '邮件',
      value: '3'
    },
    {
      label: '微信',
      value: '4'
    },
    {
      label: '无答复',
      value: '5'
    },
    {
      label: '其它',
      value: '6'
    }
  ],

    // 受理告知
    inform2: [
      {
        label: '电话',
        value: '1'
      },
      {
        label: '书面',
        value: '2'
      },
      {
        label: '短信',
        value: '3'
      },
      {
        label: '其他',
        value: '4'
      },
      {
        label: '不需要',
        value: '5'
      },
      {
        label: '系统短信',
        value: '6'
      },
      {
        label: '无法联系诉求人',
        value: '7'
      }
    ],
  // 传阅
  circulate: [
    {
      label: '发起传阅',
      value: '1'
    },
    {
      label: '传阅中',
      value: '2'
    },
    {
      label: '传阅完成',
      value: '3'
    }
  ],
  // 消息或者短信发送方式
  newsSendWayList: [
    {
      label: '立即推送',
      value: '1'
    },
    {
      label: '定时推送',
      value: '2'
    }
  ],

  // 消息发送状态
  newsSendStatusList: [
    {
      label: '已推送',
      value: '1'
    },
    {
      label: '待推送',
      value: '0'
    }
  ],

  // 短信发送状态
  messageSendStatusList: [
    {
      label: '已发送',
      value: '1'
    },
    {
      label: '未发送',
      value: '0'
    },
    {
      label: '发送失败',
      value: '2'
    }
  ],

  // 模版类型
  templateTypeList: [
    {
      label: '消息模版',
      value: '2'
    },
    {
      label: '短信模版',
      value: '1'
    }
  ],

  // 模版状态
  templateStatusList: [
    {
      label: '启用',
      value: '1'
    },
    {
      label: '停用',
      value: '0'
    }
  ],

  // 纠错状态
  approveStatusList: [
    {
      label: '待审核',
      value: '1'
    },
    {
      label: '通过',
      value: '2'
    },
    {
      label: '不通过',
      value: '3'
    }
  ],
  approveList: [
    {
      label: '创建',
      value: 1
    },
    {
      label: '下线',
      value: 2
    },
    {
      label: '纠错',
      value: 3
    },
    {
      label: '纠错下线',
      value: 4
    },
    {
      label: '修改上线',
      value: 5
    },
    {
      label: '导入上线',
      value: 6
    },
    {
      label: '重新上线',
      value: 7
    }
  ],
  errorTypeList: [
    {
      label: '知识错误',
      value: '1'
    },
    {
      label: '知识过期',
      value: '2'
    },
    {
      label: '知识遗漏',
      value: '3'
    },
    {
      label: '其他',
      value: '4'
    }
  ],
  articleTypeList: [
    {
      label: '草稿',
      value: 0
    },
    {
      label: '上线待审核中',
      value: 1
    },
    {
      label: '审核通过上线',
      value: 2
    },
    {
      label: '上线驳回',
      value: 3
    },
    {
      label: '下线审核中',
      value: 4
    },
    {
      label: '下线',
      value: 5
    },
    {
      label: '下线驳回',
      value: 6
    },
    {
      label: '已失效',
      value: 7
    },
    {
      label: '成为历史',
      value: 8
    }
  ],
  //评价指标
  approve:[
    {
    label: '满意度评价',
    value: 1
  },{
    label: '处置速度',
    value: 2
  },{
    label: '处置效率',
    value: 3
  },{
    label: '服务体验',
    value: 4
  },{
    label: '反馈质量',
    value: 5
  },]
}
