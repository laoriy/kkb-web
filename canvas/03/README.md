### 动画

#### 制作动画 4 步

1. 清空 canvas
2. 保存 canvas 状态
3. 绘制动画图形
4. 恢复 canvas 状态

#### 驱动动画的方法

- setTimeOut(fn,time)
- setInterval(fn,time)
- requestAnimationFrame(fn)


#### 驱动方法的优缺点

- setTimeOut(fn,time) 和setInterval(fn,time)
    - 优点：使用方便，动画的时间间隔可以自定义
    - 缺点：隐藏浏览器标签后，会依旧运行，造成资源浪费。与浏览器刷新频率不同步。
- requestAnimationFrame(fn)
    - 优点：性能更优良。隐藏浏览器标签后，便不会运行。与浏览器刷新频率同步。
    - 缺点：动画的时间间隔无法自定义

#### 速度和加速度的定义

- 速度：描述物体运动快慢和运动方向的物理量
- 加速度：描述速度变化的量

