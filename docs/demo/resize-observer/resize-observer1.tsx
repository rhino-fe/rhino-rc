import React, { useState, useCallback } from 'react';
import { ResizeObserver, Button } from 'redleaf-rc';

import '../../doc.less';

const ResizeObserver1 = () => {
  const [content, setContent] = useState('123');

  const onClick = useCallback(() => {
    setContent(v => `${v}123`);
  }, []);

  return (
    <>
      <ResizeObserver
        onResize={entries => {
          entries.forEach(entry => {
            console.log(entry);
          });
        }}
      >
        <div className="mb8 content1">{content}</div>
        <div className="mb8 content2">123</div>
        <Button onClick={onClick}>增加内容</Button>
      </ResizeObserver>
    </>
  );
};

export default () => <ResizeObserver1 />;
