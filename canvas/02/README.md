#### 文本属性

- 字体：font

  canvas 里的 font 属性和 css 的 font 属性是一样的，它可以设置文本的粗细、字号、字体等。如：

  - css 设置字体：p{font:bold 15px arial;}
  - canvas 设置字体：ctx.font=‘bold 15px arial’

- 水平对齐： textAlign
- 垂直对齐：textBaseline

  注意：start 和 end 会受 html 的 dir 属性影响

- textBaseline 垂直对齐
- 文本的绘制方法有 2 种

  - 填充文字 fillText(text, x, y , maxWidth
  - 描边文字 strokeText(text, x, y , maxWidth)

- 扩展 - 获取文字宽度的方法

  ctx.measureText(text)

  此方法可以让某些元素随文字宽度的变化而变化；也可以让文字达到某种宽度的时候，发生某种变化。

- 布艺文字

#### 图像

- 常用的图像源

  - 图像元素：\<img>
  - 视频元素：\<video>
  - canvas：\<canvas>

- js 建立图像源的方式

  - \<img>：
    - new Image()
    - document.createElement(‘img’)
  - \<video>：document.createElement(‘video’)
  - \<canvas>：document.createElement(‘canvas’)

- drawImage() 的操作方式

  - 绘图 + 位移：drawImage(image, x, y)
  - 绘图 + 位移 + 缩放：drawImage(image, x, y,width,height)
  - 绘图 + 裁切 + 位移 + 缩放：drawImage(image, x1, y1,w1,h1,x2,y2,w2,h2)

- drawImage() 方法的作用
  - 把现有的图片放到 canvas 中去。
  - 便于以后获取图片的像素集合（使用 getImageData() 方法获取）。

#### ImageData

- ImageData 是什么？

  - ImageData 是图片的数据化，它具备以下属性：
    data：Uint8ClampedArray [r,g,b,a, r,g,b,a, r,g,b,a, r,g,b,a]
  - width：整数
  - height：整数

  注：Uint8ClampedArray 翻译过来是 8 位无符号整型固定数组，其取值范围是[0,255]。若小于 0，则为 0，大于 255，则为 255。若为小数，则取整，取整的方法是银行家舍入。

- 怎么拿到 ImageData() 对象？

  1. 直接建立 ImageData() 对象（相当于自己新建了一张图片）。

     - new ImageData()
       - new ImageData(width, height：整数)
       - new ImageData(Uint8ClampedArray, width, height：整数)
     - ctx.createImageData()
       - ctx.createImageData(width, height：整数)
       - ctx.createImageData(ImageData)

  2. 获取 canvas 的 ImageData() 对象（可以以此原理获取真实图片的数据）
     - ctx.getImageData(x, y, width, height)

- 拿到 ImageData 后可以干什么？

  - 在 canvas 中显示 ImageData：putImageData(ImageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)

- 理解 ImageData 中的像素集合和图像栅格的对应关系
  - ImageData 对象的属性：
    - data：Uint8ClampedArray [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    - width：2
    - height：2
  - data 中的数值与栅格的对应关系：
    - 先从第一行开始，遍历每一列，遍历完成后
    - 进入下一行，遍历每一列，遍历完成后
    - 进入下一行，遍历每一列，遍历完成后
    - 进入下一行，遍历每一列，遍历完成后
    - ……
    - 直到遍历完最后一行的最后一列。
- 遍历像素的方法

  - 像素遍历：每隔 4 个数据遍历一次，简单快捷
  - 行列遍历：基于行列遍历，可获取像素点的位置信息
    ```JS
    // 逐像素遍历
        for(let i=0;i<arr.length;i+=4){
            let r=data[i+0];
            let g=data[i+1];
            let b=data[i+2];
            let a=data[i+3];
            console.log(r,g,b,a)
        }
    // 行列遍历
    for(let y=0;y<h;y++){
        for(let x=0;x<w;x++){
            let ind=(y*w+x)*4;
            let r=data[ind];
            let g=data[ind+1];
            let b=data[ind+2];
            let a=data[ind+3];
            console.log(r,g,b,a)
        }
    }
    ```

- demo：灰度算法 const lm =0.299*r+0.587*g+0.114\*b ;

#### 上下文对象的状态

- 上下文对象的状态是什么？

  上下文对象的状态就是上下文对象的属性。比如描边颜色，填充颜色，投影，线条样式，变换信息…

- 管理上下文状态的方法

  - 保存当前状态：save()
  - 恢复上一次保存的状态：restore()

  一般在我们绘制具备同一种样式的图形时，都会用 save() restore() 将其包裹起来。这是为了避免当前的图形样式影响以后的图形样式。

- 状态的嵌套
  ```
  a - save()
  b - save()
  restore() – b
  restore() – a
  ```

#### 变换：本质是对 canvas 坐标系的操作

- 变换有 3 个特性：

  - 移动： translate(x,y)
  - 旋转： rotate(angle)
  - 缩放： scale(x,y)

- 矩阵变换

  - 相对变换矩阵：transform(a, b, c, d, e, f)

  - 绝对变换矩阵：setTransform(a, b, c, d, e, f)

    <img src="./docs/transform.png" alt="transform" style="zoom:50%;" />

    a,d ：x，y 轴向的缩放，默认为 1

    c,b ：x，y 轴向的倾斜，默认为 0

    e,f ：x，y 轴向的位移，默认为 0
