
#### 文本属性
- 字体：font

    canvas 里的font 属性和css 的font 属性是一样的，它可以设置文本的粗细、字号、字体等。如：
    - css 设置字体：p{font:bold 15px  arial;}
    - canvas 设置字体：ctx.font=‘bold 15px  arial’

- 水平对齐： textAlign
- 垂直对齐：textBaseline

    注意：start 和end 会受html 的dir 属性影响

- textBaseline 垂直对齐
- 文本的绘制方法有2种
    - 填充文字 fillText(text, x, y , maxWidth
    - 描边文字 strokeText(text, x, y , maxWidth)




