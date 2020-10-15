import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import cls from "classnames";
import _pull from "lodash/pull";
import _includes from "lodash/includes";

import { prefixCls } from "../constants";
import { IconClose } from "../icon";
import { isUndefined, isFunction, canbePositiveNumber } from "../utils";
import "../styles/common.css";
import "./style.css";

let defaultDuration = 2000;
const keyArr: string[] = [];

export interface MessageParam extends baseProps {
  className?: string;
  content: ReactNode;
  duration?: string | number;
  key?: string;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}

const getContainer = (position?: string) => {
  let container;
  const containerName = `${prefixCls}-message-container${
    position ? "-" + position : ""
  }`;
  container = document.querySelector("." + containerName);
  if (!container) {
    container = document.createElement("span");
    container.className = containerName;
    document.body.appendChild(container);
  }
  return container;
};

const show = (param: MessageParam): (() => void) | undefined => {
  const {
    duration,
    content,
    className,
    key,
    position,
    onClose,
    ...restParam
  } = param;

  if (!isUndefined(key)) {
    if (_includes(keyArr, String(key))) {
      return;
    } else {
      keyArr.push(String(key));
    }
  }

  // 所有message的容器
  const container = getContainer(position);

  // 单个message
  let elem: HTMLElement | null = document.createElement("span");
  elem.className = `${prefixCls}-message`;
  container.appendChild(elem);

  ReactDOM.render(
    <span
      className={cls(`${prefixCls}-message-content`, className)}
      {...restParam}
    >
      {content}
    </span>,
    elem
  );

  let timer = -1;
  const closeFunc = () => {
    container.removeChild(elem as HTMLElement);
    elem = null;
    clearTimeout(timer);
    isFunction(onClose) && onClose();
    if (!isUndefined(key)) {
      _pull(keyArr, String(key));
    }
  };

  // 不传duration，认为是使用默认时间
  // 传非正数，认为不需要自动隐藏
  if (!isUndefined(duration)) {
    if (canbePositiveNumber(duration)) {
      timer = setTimeout(closeFunc, Number(duration));
    }
  } else {
    timer = setTimeout(closeFunc, defaultDuration);
  }

  return closeFunc;
};

const config = (param: { duration: number | string }): void => {
  if (canbePositiveNumber(param.duration)) {
    defaultDuration = Number(param.duration);
  }
};

const notify = (param: MessageParam): (() => void) | undefined => {
  const { content, className, ...restParam } = param;
  let close: (() => void) | undefined = undefined;
  const notifyContent = (
    <>
      <span className={cls(`${prefixCls}-message-notify`, className)}>
        {content}
      </span>
      <svg
        className={`${prefixCls}-message-notify-close`}
        viewBox="0 0 1024 1024"
        onClick={() => {
          close?.();
        }}
      >
        <path d={IconClose} fill="#bbb" />
      </svg>
    </>
  );

  close = show({ content: notifyContent, duration: 0, ...restParam });

  return close;
};

const Message = {
  show,
  config,
  notify,
};

export default Message;
