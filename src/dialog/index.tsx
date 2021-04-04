import React, { useMemo, ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import cls from 'classnames';
import PropTypes from 'prop-types';

import { prefixCls } from '../constants';
import { baseProps } from '../types';
import { IconClose } from '../icon';
import { getUniqElementByClass } from '../utils/dom';

import './style.less';

/*
todo: 

maskClosable
onClose
destroyOnClose 关闭后是重新渲染还是只是隐藏
showCloseIcon
position: center right left top bottom 增加其他几种位置的demo
多个dialog层叠

定时关闭 ？
getContainer ？
*/

export interface DialogProps extends baseProps {
  className?: string;
  contentClassName?: string;
  children: ReactNode;
  showCloseIcon?: boolean;
  maskClosable?: boolean;
  onClose?: () => void;
  destroyOnClose?: boolean;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

const Dialog = (props: DialogProps): ReactElement => {
  const { className, contentClassName, children, ...restProps } = props;

  return ReactDOM.createPortal(
    <span
      className={cls(`${prefixCls}-dialog-container`, className)}
      {...restProps}
    >
      <span className={cls(`${prefixCls}-dialog-content`, contentClassName)}>
        {children}
      </span>
    </span>,
    document.body,
  );
};

export interface DialogParam extends baseProps {
  className?: string;
  contentClassName?: string;
  content?: ReactNode;
  title: ReactNode;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  showCloseIcon?: boolean;
  onClose?: () => void;
}

const show = (param: DialogParam): (() => void) | undefined => {
  const {
    className,
    contentClassName,
    content,
    title,
    maskClosable = false,
    destroyOnClose = false,
    position = 'center',
    showCloseIcon = false,
    onClose,
    ...restParam
  } = param;

  let container: HTMLElement | null = getUniqElementByClass({
    className: `${prefixCls}-dialog-container`,
    elemType: 'span',
  });
  document.body.appendChild(container);

  const closeFunc = () => {
    document.body.removeChild(container as HTMLElement);
    container = null;
    typeof onClose === 'function' && onClose();
  };

  ReactDOM.render(
    <span className="dialog-size-isolation">
      {(showCloseIcon || title) && (
        <span className="dialog-header">
          {title && <span className="dialog-title">{title}</span>}
          {showCloseIcon && (
            <svg
              className="dialog-close"
              viewBox="0 0 1024 1024"
              onClick={() => {
                closeFunc?.();
              }}
            >
              <path d={IconClose} />
            </svg>
          )}
        </span>
      )}
      {content && (
        <span className={cls('dialog-content', contentClassName)}>
          {content}
        </span>
      )}
    </span>,
    container,
  );

  return closeFunc;
};

Dialog.propTypes = {
  className: PropTypes.string,
};

Dialog.defaultProps = {};

Dialog.show = show;

export default Dialog;