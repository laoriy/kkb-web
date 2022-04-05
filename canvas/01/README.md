
#### 概述
- canvas的尺寸有极限值。
    1. canvas的尺寸过大，其中的图像不会显示
    2. canvas尺寸尽量控制在4000以内
    3. canvas极限值因浏览器，平台不同而不同 

#### 绘制图形
- 坐标系和栅格
- 矩形：
    1. 填充矩形fillRect(x,y,w,h)
    2. 描边矩形strokeRect(x,y,w,h),是居中描边
    3. 清理矩形clearRect(x,y,w,h)
    4. lineStyle 可以改变描边矩形的颜色
- 路径:
    1. 开始建立路径：beginPath()
    2. 向路径集合中添加子路径：
        ```
            moveTo(x,y); 形状; closePath() 可选,
            moveTo(x,y); 形状; closePath() 可选,
            moveTo(x,y); 形状; closePath() 可选,
        ```
    3. 显示路径：填充fill() ，描边stroke()
    4. 子路径的形状
        - 直线：lineTo(x,y); lineTo(x,y); lineTo(x,y);
        - 圆弧：arc(x,y,半径，开始弧度，结束弧度，方向)
        - 切线圆弧：arcTo(x1,y1,x2,y2,半径)
        - 二次贝塞尔曲线：quadraticCurverTo(cpx1,cpy1,x,y)
        - 三次贝塞尔曲线：bezierCurverTo(cpx1,cpy1,cpx2,cpy2,x,y)
        - 矩形：rect(x,y,w,h)

#### 图形样式

- 着色区域
    1. 描边区域： strokeStyle 代表了描边样式，描边区域的绘制方法是 stroke()、strokeRect() 或者strokeText() 。
    2. 填充区域： fillStyle 代表了填充样式，填充区域的绘制方法是 fill()、fillRect() 或者fillText() 。

- 渐变色
    1. 建立渐变对象的方式：
        - 线性渐变  gradient=createLinearGradient(x1, y1, x2, y2)
        - 径向渐变 gradient=createRadialGradient(x1, y1, r1, x2, y2, r2)

    2. 定义渐变的颜色节点	
        - gradient.addColorStop(position, color)

    3. 赋值方式
        - ctx.fillStyle= gradient
        - ctx.strokeStyle= gradient

- 纹理
    1. 建立纹理对象：pattern=context.createPattern(image,"repeat|repeat-x|repeat-y|no-repeat");
    2. 为着色样式赋值：
        ctx.fillStyle= pattern
        ctx.strokeStyle= pattern


#### 影响描边样式的因素
- strokeStyle：描边的颜色
- lineWidth：描边宽
- lineCap：描边端点样式
- lineJoin：描边拐角类型
- miterLimit：拐角最大厚度（只适用于lineJoin=‘miter’ 的情况）
- setLineDash(segments)：将描边设置为虚线，可以通过getLineDash() 方法获取虚线样式
- lineDashOffset：虚线的偏移量
