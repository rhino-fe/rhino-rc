import React from 'react';
import { Message, Button } from 'redleaf-rc';

import Icon from './prompt';

import '../../doc.less';

const Message1 = () => {
  return (
    <>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({
            content: 'this is a message',
          });
        }}
      >
        message without title
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({
            content: 'this is a message, this is a message',
            title: "I'm a title",
          });
        }}
      >
        message with title
      </Button>
      <Button
        className="block mb8"
        onClick={() => {
          Message.show({
            title: 'this is a message',
            showCloseIcon: true,
            duration: 0,
          });
        }}
      >
        message with close icon
      </Button>
      <Button
        className="block"
        onClick={() => {
          Message.show({
            title: (
              <div>
                <Icon />
                <span
                  className="inline-block"
                  style={{
                    verticalAlign: 'top',
                    color: 'skyblue',
                    height: '24px',
                    marginLeft: '5px',
                  }}
                >
                  complex message
                </span>
              </div>
            ),
            content: (
              <div>
                <div>it is a complex message</div>
                <div>which contains jsx</div>
              </div>
            ),
            showCloseIcon: true,
            duration: 0,
          });
        }}
      >
        complex message
      </Button>
    </>
  );
};

export default () => <Message1 />;
