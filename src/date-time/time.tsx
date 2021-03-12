import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  ReactElement,
  useEffect,
} from 'react';
import cls from 'classnames';
import dayjs from 'dayjs';

import ConfigProvider from '../config-provider';
import { scrollToPos } from '../utils/dom';
import { PanelProps } from './declaration';

const timeArr = ['hour', 'minute', 'second'];
export type TimeTypes = 'hour' | 'minute' | 'second';

const TimePanel = (props: PanelProps): ReactElement => {
  const { value, setValue, uncontrolled, ...restProps } = props;

  const [activeHour, setActiveHour] = useState(0);
  const [activeMinute, setActiveMinute] = useState(0);
  const [activeSecond, setActiveSecond] = useState(0);

  const timeRefs: any = useRef({
    hour: {
      container: {},
      children: [],
    },
    minute: {
      container: {},
      children: [],
    },
    second: {
      container: {},
      children: [],
    },
  });

  const actionMap: any = useMemo(
    () => ({
      hour: setActiveHour,
      minute: setActiveMinute,
      second: setActiveSecond,
    }),
    [],
  );

  const stateMap = useMemo(
    () => ({
      hour: activeHour,
      minute: activeMinute,
      second: activeSecond,
    }),
    [activeHour, activeMinute, activeSecond],
  );

  useEffect(() => {
    let timeVal: any = {};

    if (value) {
      const chosenTime = dayjs(value);
      timeVal = {
        hour: chosenTime.hour(),
        minute: chosenTime.minute(),
        second: chosenTime.second(),
      };
    } else {
      const nowTime = dayjs();
      timeVal = {
        hour: nowTime.hour(),
        minute: nowTime.minute(),
        second: nowTime.second(),
      };
    }

    timeArr.forEach(v => {
      const { container, children } = timeRefs.current[v];
      const idx = timeVal[v];
      actionMap[v](idx);
      scrollToPos({
        element: container,
        to: children[idx]?.offsetTop,
        duration: 200,
      });
    });
  }, [value, actionMap]);

  const setNow = useCallback(() => {
    const nowTime = dayjs();
    setValue({
      value: {
        hour: nowTime.hour(),
        minute: nowTime.minute(),
        second: nowTime.second(),
      },
    });
  }, [setValue]);

  const renderCol = useCallback(
    (type: TimeTypes) => {
      let cnt = 60;
      type === 'hour' && (cnt = 24);
      return (
        <>
          {Array(cnt)
            .fill(1)
            .map((v, k) => (
              <span
                className={cls('row', { 'active-row': k === stateMap[type] })}
                key={k}
                ref={ref => {
                  timeRefs.current[type].children[k] = ref;
                }}
                onClick={() => {
                  setValue({
                    value: {
                      hour: activeHour,
                      minute: activeMinute,
                      second: activeSecond,
                      // 覆盖上面三个属性中的某一个
                      [type]: k,
                    },
                  });
                }}
              >
                {k}
              </span>
            ))}
          {/* TODO: 补了空白可以解决尾部的一些时间（比如23:56:58）不对齐的问题，但是自定义高度就废了 */}
          {/* 这里的数字这么奇怪是为了防止和上面的key相同 */}
          {[61, 62, 63, 64, 65, 66].map((v, k) => (
            <span className="row-space" key={k}></span>
          ))}
        </>
      );
    },
    [stateMap, activeHour, activeMinute, activeSecond, setValue],
  );

  return (
    <ConfigProvider.Consumer>
      {(value: baseProps) => {
        const { lang, langText } = value;
        const locale = Object.assign({}, lang.DateTime, langText);
        return (
          <span className="time-panel" {...restProps}>
            {/* 时分秒 */}
            <span className="row-tip">
              {timeArr.map(v => (
                <span key={v} className="text">
                  {locale[v]}
                </span>
              ))}
            </span>
            {/* 选项 */}
            {timeArr.map(v => (
              <span
                className="col"
                key={v}
                ref={ref => {
                  timeRefs.current[v].container = ref;
                }}
              >
                {renderCol(v as TimeTypes)}
              </span>
            ))}
            <span className="row-bottom" onClick={setNow}>
              {locale.now}
            </span>
          </span>
        );
      }}
    </ConfigProvider.Consumer>
  );
};

export default TimePanel;