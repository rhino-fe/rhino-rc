## Trigger

### 基本使用

例子中对 content 使用了 Bubble 组件，也可以不用 Bubble 组件包裹，自定义 content 展示样式

<code src="../demo/trigger/trigger1.tsx"></code>

### 手动控制 content 显示隐藏

<code src="../demo/trigger/trigger2.tsx"></code>

### 十二种位置

取值和 Bubble 组件一致

这里没有再用 Bubble 组件展示，为了防止 Bubble 的箭头影响判断，这里的位置指的是 Trigger 包裹的子组件为基准，content 向基准对齐

<code src="../demo/trigger/trigger3.tsx"></code>

### Props

| 参数             | 说明                                                            | 类型                                                                                                                                                                                   | 默认值      | 必填 |
| ---------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---- |
| className        | trigger 外层容器类名                                            | string                                                                                                                                                                                 | 无          | 否   |
| type             | 触发类型                                                        | "hover" \| "click"                                                                                                                                                                     | "hover"     | 否   |
| onHide           | content 隐藏时的回调                                            | function(): void                                                                                                                                                                       | 无          | 否   |
| onShow           | content 显示时的回调                                            | function(): void                                                                                                                                                                       | 无          | 否   |
| children         | trigger 包裹的子组件                                            | ReactNode                                                                                                                                                                              | 无          | 是   |
| content          | trigger 显示的内容                                              | ReactNode                                                                                                                                                                              | 无          | 是   |
| position         | content 显示位置                                                | "topCenter" \| "leftCenter" \| "rightCenter" \| "bottomCenter" \| "topLeft" \| "topRight" \| "bottomLeft" \| "bottomRight" \| "leftTop" \| "leftBottom" \| "rightTop" \| "rightBottom" | "topCenter" | 否   |
| visible          | 控制 content 是否展示（受控）                                   | boolean                                                                                                                                                                                | 无          | 否   |
| leftOffset       | content 的横向偏移，负数表示向左偏移，正数表示向右偏移          | string \| number                                                                                                                                                                       | "0px"       | 否   |
| topOffset        | content 的纵向偏移，负数表示向上偏移，正数表示向下偏移          | string \| number                                                                                                                                                                       | "0px"       | 否   |
| onChildrenResize | children 大小变更的回调，select 使用了该回调调整 options 的宽度 | function(rect: DOMRect): void                                                                                                                                                          | 无          | 否   |

### css 变量

| 变量              | 说明               |
| ----------------- | ------------------ |
| --trigger-z-index | content 的 z-index |

### 特别说明

leftOffset 和 topOffset 可以设置成带 px 的值，比如"10px"，也可以设置成单独的数字和字符串，比如 12 和"12"，也可以设置百分比，比如"50%"，但是要注意，trigger 的弹出层挂在 doucument.body 上面，所以百分比是相对于 doucument.body 的。

leftOffset 和 topOffset 是用在 calc()中的，所以理论上 css 支持的单位都可以传
