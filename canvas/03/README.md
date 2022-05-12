### 动画

#### 制作动画 4 步

1. 清空 canvas
2. 保存 canvas 状态
3. 绘制动画图形
4. 恢复 canvas 状态

#### 驱动动画的方法

-   setTimeOut(fn,time)
-   setInterval(fn,time)
-   requestAnimationFrame(fn)

#### 驱动方法的优缺点

-   setTimeOut(fn,time) 和 setInterval(fn,time)
    -   优点：使用方便，动画的时间间隔可以自定义
    -   缺点：隐藏浏览器标签后，会依旧运行，造成资源浪费。与浏览器刷新频率不同步。
-   requestAnimationFrame(fn)
    -   优点：性能更优良。隐藏浏览器标签后，便不会运行。与浏览器刷新频率同步。
    -   缺点：动画的时间间隔无法自定义

#### 速度和加速度的定义

-   速度：描述物体运动快慢和运动方向的物理量
-   加速度：描述速度变化的量

#### 补间动画

-   使用 tween.js 做补间
    tween.js 并没有提供颜色的过度方法，可以把 d3 的 color 插件拼装到了 tween.js 中去，文件地址为 ./js/SupTween.js，使用之前需要引入 d3-color.js

#### canvas 中做交互

-   用 canvas 画布监听事件，获取鼠标或触摸点在 canvas 中的位置，再基于图形在 canvas 中的位置和形状，判断选择的点位是否在图形中。
-   获取 canvas 中鼠标位置的方法

```js
canvas.addEventListener("mousedown", getPos)
function getPos(event) {
    const { clientX, clientY } = event
    const { left, top } = canvas.getBoundingClientRect()
    const [x, y] = [clientX - left, clientY - top]
    console.log(x, y)
}
```

-   扩展-获取触摸点点位的方法

```js
canvas.addEventListener("mousedown", getPos)
function getPos(event) {
    const { pageX, pageY } = event.changedTouches[0]
    const { left, top } = canvas.getBoundingClientRect()
    const [x, y] = [pageX - left, pageY - top]
    console.log(x, y)
}
```

#### 常见图形的选择

-   矩形：
    -   位置：x, y
    -   尺寸：w, h
-   圆形：
    -   圆心位置：center
    -   半径： radius
-   扇形：
    -   圆心位置： center
    -   半径： radius
    -   起始角度： startAngle
    -   结束角度： endAngle
