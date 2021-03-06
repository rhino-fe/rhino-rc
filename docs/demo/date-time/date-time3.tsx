import React from 'react';
import { DateTime, ConfigProvider } from 'redleaf-rc';

import '../../doc.less';
import './style.less';

const dayjs = DateTime.dayjs;
const dateVal = '2020-09-01 15:0:0';
//
const DateTime3 = () => {
  return (
    <>
      <div className="mb8">
        自定义显示格式：
        <DateTime
          type="date-time"
          className="date-time-demo3-1"
          format="YY/M/D---H:m:s---dddd"
        />
      </div>
      <div className="mb8">
        设置初始值：
        <DateTime
          type="time"
          defaultValue={dateVal}
          className="mr8"
          onChange={(...rest) => {
            console.log(...rest);
          }}
        />
      </div>
      <div className="mb8">
        只读：
        <DateTime type="date-time" defaultValue="2016-6-1" readOnly />
      </div>
      <div className="mb8">
        禁用：
        <DateTime type="date-time" defaultValue={dateVal} disabled />
      </div>
      <div className="mb8">
        自定义placeholder：
        <DateTime type="date-time" placeholder="自定义placeholder" />
      </div>
      <div className="mb8">
        不显示清除按钮：
        <DateTime
          type="date-time"
          showClearIcon={false}
          defaultValue={dayjs().format('YYYY-MM-DD HH:mm:ss')}
        />
      </div>
      <div className="mb8">
        多语言：
        <ConfigProvider.Provider lang="en-US">
          <DateTime type="date-time" className="mr8" />
        </ConfigProvider.Provider>
        <ConfigProvider.Provider
          langText={{
            hour: '小时',
            minute: '分钟',
            second: '秒钟',
            Su: '周日',
            Mo: '周一',
            Tu: '周二',
            We: '周三',
            Th: '周四',
            Fr: '周五',
            Sa: '周六'
          }}
        >
          <DateTime type="date-time" />
        </ConfigProvider.Provider>
      </div>
    </>
  );
};

export default () => <DateTime3 />;
