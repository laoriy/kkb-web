//事件对象
class EventDispatcher{
    constructor(){
        this._listeners={};
    }
    addEventListener(type, listener){
        const listeners = this._listeners;
        if ( listeners[ type ] === undefined ) {
            listeners[ type ] = [];
        }
        if ( !listeners[ type ].includes(listener) ) {
            listeners[ type ].push( listener );
        }
    }
    hasEventListener(type, listener){
        const listeners = this._listeners;
        if ( listeners === undefined ) return false;
        return listeners[ type ] !== undefined && listeners[ type ].includes(listener);
    }
    removeEventListener(type, listener){
        const listeners = this._listeners;
        if (listeners === undefined){return;}
        const listenerArray = listeners[ type ];
        if ( listenerArray !== undefined ) {
            const index = listenerArray.indexOf( listener );
            if ( index !== - 1 ) {
                listenerArray.splice( index, 1 );
            }
        }
    }
    dispatchEvent(event){
        const listeners = this._listeners;
        if (listeners === undefined){return;}
        const listenerArray = listeners[ event.type ];
        if ( listenerArray !== undefined ){
            event.target = this;
            //lice( 0 )类数组转数组
            const array = listenerArray.slice( 0 );
            for ( let i = 0, l = array.length; i < l; i ++ ) {
                array[ i ].call( this, event );
            }
        }
    }
}
//向量对象
class Vector2{
    constructor(x=0,y=0){
        this.x=x;
        this.y=y;
    }
    //获取相对于x轴正方向的弧度
    angle(){
        let angle = Math.atan2( this.y, this.x );
        if ( angle < 0 ) angle += 2 * Math.PI;
        return angle;
    }
    //加法
    add(v){
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    //向量克隆
    clone(){
        return new Vector2(this.x,this.y);
    }
    //将当前点位调整到极值形成的闭区间中(min,max)
    clamp(min,max){
        this.x = Math.max( min.x, Math.min( max.x, this.x ) );
        this.y = Math.max( min.y, Math.min( max.y, this.y ) );
        return this;
    }
    //x：y=1：1 的clamp
    clampScalar ( minVal, maxVal ) {
        this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
        this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
        return this;
    }
    //将向量长度限定在极值的闭区间中
    clampLength(min, max){
        const length = this.length();
        return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );
    }
    //向量拷贝
    copy(v){
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    //距离
    distanceTo(v){
        const [dx,dy] = [this.x - v.x, this.y - v.y];
        return Math.sqrt(dx * dx + dy * dy);
    }
    //非等比例切割向量
    divide ( v ) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }
    //等比例切割向量，设置向量长度为当前长度的1/scalar
    divideScalar(scalar){
        return this.multiplyScalar( 1 / scalar );
    }
    //是否相等
    equal(v){
        return this.x===v.x&&this.y===v.y;
    }
    //扩展
    expand(dist){
        this.setLength(this.length()+dist);
        return this;
    }
    //根据线段，设置位置
    getPosByLine(v1,v2,dist){
        const oldDist=v1.distanceTo(v2);
        const a=v2.clone().sub(v1).normalize();
        return a.setLength(oldDist+dist).add(v1);
    }
    //获取和另一个点相连后的法线
    getNormal(v){
        return v.clone().sub(this).normalize();
    }
    //获取长度
    length() {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    }
    //获取面积
    getArea(){
        return this.x*this.y;
    }
    //设置差值
    lerp(v, alpha){
        this.x += ( v.x - this.x ) * alpha;
        this.y += ( v.y - this.y ) * alpha;
        return this;
    }
    //基于一点，在x，y向各取最大值
    max( v ) {
        this.x = Math.max( this.x, v.x );
        this.y = Math.max( this.y, v.y );
        return this;
    }
    //基于一点，在x，y向各取最小值
    min( v ) {
        this.x = Math.min( this.x, v.x );
        this.y = Math.min( this.y, v.y );
        return this;
    }
    //将当前向量的长度*scalar
    multiplyScalar ( scalar ) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    //向量归一
    normalize(){
        this.setLength(1);
        return this;
    }
    //取反，坐标效果为原点对称
    negate(){
        this.x = - this.x;
        this.y = - this.y;
        return this;
    }
    //围绕某一点旋转
    rotateAround(center, angle){
        const c = Math.cos( angle ), s = Math.sin( angle );
        const x = this.x - center.x;
        const y = this.y - center.y;
        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;
        return this;
    }
    //基于原点旋转
    rotate(angle){
        const c = Math.cos( angle ), s = Math.sin( angle );
        const {x,y}=this;
        this.x = x * c - y * s;
        this.y = x * s + y * c;
        return this;
    }
    //减法
    sub(v){
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    set(x,y){
        this.x=x;
        this.y=y;
        return this;
    }
    //设置向量长度
    setLength(n=1){
        const scalar=n/this.length();
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    //根据半径，弧度，设置极坐标
    static polar(r,rad){
        const v=new Vector2();
        v.x=Math.cos(rad)*r;
        v.y=Math.sin(rad)*r;
        return v;
    }
}

//二维对象
class Object2D extends EventDispatcher{
    constructor(){
        super();
        this.pos=new Vector2();
        this.scale=new Vector2(1,1);
        this.rot=new Vector2();
        this.worldPos=null;
        this.boundingBox={min:new Vector2(),max:new Vector2()};
        //绘制自身图形的方法
        this.drawSelf=null;
        //绘制自身图形和子集图形的方法
        this.drawAll=null;
        this.saveRes=true;
        //可见性，需置底
        this.visible=true;
    }
    get saveRes(){
        return this._saveRes;
    }
    set saveRes(val){
        this._saveRes=val;
        this.setDrawFn();
    }
    get visible(){
        return this._visible;
    }
    set visible(val){
        if(this._visible!==val){
            this._visible=val;
            if(val){
                this.draw=this.drawAll;
            }else{
                this.draw=()=>{};
            }
        }
    }
    //设置绘图方法
    setDrawFn(){
        if(!this.drawSelf){
            //获取子级自身的draw 方法，并重命名
            this.drawSelf=this.draw;
        }
        this.setDrawFn2();
    }
    setDrawFn2(){
        if(this.saveRes){
            this.drawAll=(ctx)=>{
                ctx.save();
                this.drawFn(ctx);
                ctx.restore();
            }
        }else{
            this.drawAll=(ctx)=>{
                this.drawFn(ctx);
            };
        }
    }
    drawFn(ctx){
        const {pos,scale,rot}=this;
        ctx.rotate(rot.x,rot.y);
        ctx.scale(scale.x,scale.y);
        ctx.translate(pos.x,pos.y);
        this.drawSelf&&this.drawSelf(ctx);
    }

    //获取对象的世界位
    computeWorldPos(){
        const pos=this.pos.clone();
        this.findParent(this,(parent)=>{
            pos.add(parent.pos);
        });
        this.worldPos=pos;
        return pos;
    }
    //遍历父级
    findParent(obj,fn){
        //if(obj===undefined){return}
        const parent=obj.parent;
        if(parent){
            fn(parent);
            this.findParent(parent,fn);
        }
    }
    //获取最顶层的对象
    getTopObj(){
        this.findParent(this,(obj)=>{
            if(!obj.parent){
                return obj;
            }
        })
    }
    //将a 的属性传给b
    copyAttr(a,b){
        for(const [key,value] of Object.entries(a)){
            b[key]=value;
        }
        return b;
    }

    //遍历子集,包括自身
    traverse(callback){
        callback( this );
        const children = this.children;
        if(!children){return}
        for ( let [i,l]=[0,children.length]; i < l; i ++ ) {
            children[ i ].traverse( callback );
        }
    }
    //根据class 选择对象
    findByCls(c){
        return this.findByAttr(c,'cls');
    }
    //根据id 选择对象
    findById(c){
        return this.findByAttr(c,'id');
    }
    //根据属性获取子元素
    findByAttr(val,attr){
        const a=[];
        this.traverse((obj)=>{
            if(obj[attr]===val){
                a.push(obj);
            }
        });
        return a;
    }
}
//复合图形对象
class Sprite extends Object2D{
    constructor(){
        super();
        this.children=[];
    }
    drawFn(ctx) {
        super.drawFn(ctx);
        this.children.forEach((ele)=>{
            ele.draw(ctx);
        });
    }
    //后置添加
    add(ele){
        ele.parent=this;
        this.children.push(ele);
    }
    //前置添加
    add2(ele){
        ele.parent=this;
        this.children.unshift(ele);
    }
    //后置批量添加
    addEles(eles){
        const _this=this;
        eles.forEach((ele)=>{
            _this.add(ele);
        });
    }
}
//集合对象
class Group extends Sprite{
    constructor(){
        super();
    }
    setDrawFn(){
        this.setDrawFn2();
    }
    drawFn(ctx){
        const {pos,scale,rot}=this;
        ctx.rotate(rot.x,rot.y);
        ctx.scale(scale.x,scale.y);
        ctx.translate(pos.x,pos.y);
        this.children.forEach((ele)=>{
            ele.draw(ctx);
        });
    }
}

//基础材质
//以后还有更高级的材质，比如：布艺材质、金属材质
class BasicMat{
    constructor(param={}){
        const {
            state=1,
            fillStyle='#000',
            strokeStyle='#000',
            lineWidth=1,
            dash=[],
            lineCap='butt',
            lineJoin='miter',
            miterLimit=10,
            shadowColor='rgba(0,0,0,0)',
            shadowBlur=0,
            shadowOffsetX=0,
            shadowOffsetY=0,
        }=param;
        //1 填充，2 描边，3 填充+描边
        this.fillStyle=fillStyle;
        this.strokeStyle=strokeStyle;
        this.lineWidth=lineWidth;
        this.dash=dash;
        this.lineCap=lineCap;
        this.lineJoin=lineJoin;
        this.miterLimit=miterLimit;
        this.shadowColor=shadowColor;
        this.shadowBlur=shadowBlur;
        this.shadowOffsetX=shadowOffsetX;
        this.shadowOffsetY=shadowOffsetY;
        this.state=state;
    }
    get state(){
        return this._state;
    }
    set state(val){
        this._state=val;
        this.setDraw();
    }

    //显示图形
    setDraw(){
        switch (this.state){
            case 1:
                this.draw=(ctx)=>{
                    this.setShadow(ctx);
                    this.fill(ctx);
                };
                break;
            case 2:
                this.draw=(ctx)=>{
                    this.setShadow(ctx);
                    this.stroke(ctx);
                };
                break;
            case 3:
                this.draw=(ctx)=>{
                    this.setShadow(ctx);
                    this.stroke(ctx);
                    this.fill(ctx);
                };
                break;
            default:
                this.draw=null;
        }
    }
    setShadow(){
        const {shadowColor,shadowBlur,shadowOffsetX,shadowOffsetY}=this;
        ctx.shadowColor=shadowColor;
        ctx.shadowBlur=shadowBlur;
        ctx.shadowOffsetX=shadowOffsetX;
        ctx.shadowOffsetY=shadowOffsetY;
    }
    stroke(){
        const {strokeStyle,lineWidth,lineCap,lineJoin,miterLimit}=this;
        ctx.strokeStyle=strokeStyle;
        ctx.lineWidth=lineWidth;
        ctx.lineCap=lineCap;
        ctx.lineJoin=lineJoin;
        ctx.miterLimit=miterLimit;
        this.strokeFn(ctx);
    }
    fill(){
        ctx.fillStyle=this.fillStyle;
        this.fillFn(ctx);
    }
    strokeFn(ctx){
        ctx.stroke();
    }
    fillFn(ctx){
        ctx.fill();
    }
}
//文字材质
class TextMat extends BasicMat{
    constructor(param){
        super(param);
        this.shape={};
    }
    fillFn(ctx) {
        const {text}=this.shape;
        ctx.fillText(text,0,0);
    }
    strokeFn(ctx) {
        const {text}=this.shape;
        ctx.strokeText(text,0,0);
    }
}

//基础文字对象
class Text extends Sprite{
    constructor(param){
        super();
        const {
            font='12px sans-serif',
            textAlign='left',
            textBaseLine='alphabetic',
            text='',
            mat=null,
        }=param;
        this.font=font;
        this.textAlign=textAlign;
        this.textBaseLine=textBaseLine;
        this.text=text;
        this.mat=mat;
        this.copyAttr(param,this);
    }
    get mat(){
        return this._mat;
    }
    set mat(val){
        this._mat=val;
        this._mat.shape=this;
    }
    //设置自身图形的绘图方法 drawSelf (根据样式和子集)
    draw(ctx){
        ctx.font=this.font;
        ctx.textAlign=this.textAlign;
        ctx.textBaseline=this.textBaseLine;
        this.mat.draw(ctx);
    }
}

//多边形
class Poly extends Sprite{
    constructor(vertices,mat){
        super();
        this.vertices=vertices;
        this.mat=mat;
        this.close=false;
    }
    draw(ctx){
        ctx.beginPath();
        this.vertices.forEach((ele,ind)=>{
            if (ind===0){
                ctx.moveTo(ele.x,ele.y);
            }else{
                ctx.lineTo(ele.x,ele.y);
            }
        });
        this.close&&ctx.closePath();
        this.mat.draw(ctx);
    }
}

//控制器
class MouseControler extends EventDispatcher{
    constructor(canvas){
        super();
        this.canvas=canvas;
        //鼠标在canvas上的位置
        this.pos=new Vector2();
        this.enable=true;
        //子集，需要监听的东东
        this.children=new Set();
        this.intersects=[];
        //初始化
        this.initEvents();
    }
    add(ele){
        this.children.add(ele);
    }
    addEles(eles){
        const _this=this;
        eles.forEach((ele)=>{
            _this.add(ele);
        });
    }
    initEvents(){
        let _this=this;
        this.canvas.addEventListener('mousemove',function (event) {
            if(!_this.enable){return}
            _this.mousemoveFn(event);
        });
    }
    mousemoveFn(event){
        //更新鼠标位
        this.setMousePos(event);
        console.log('pos',this.pos)
        this.computeIntersects(this.children);
        //触发鼠标移动事件
        this.mousemove();
        //判断鼠标划上
        this.mousehoverFn();
    }
    mousehoverFn(){
        const _this=this;
        const {children,intersects,canvas}=this;
        children.forEach((ele)=>{
            if(!ele.hovered&&intersects.includes(ele)){
                //鼠标划入
                ele.hovered=true;
                canvas.style.cursor='pointer';
                _this.mouseoverEle(ele);
                // renderer.render();
            }else if(ele.hovered){
                if(intersects.includes(ele)){
                    canvas.style.cursor='pointer';
                    //鼠标移动
                    _this.mousemoveEle(ele);
                }else{
                    //鼠标划出
                    ele.hovered=false;
                    canvas.style.cursor='default';
                    _this.mouseoutEle(ele);
                }
                // renderer.render();
            }
        })
    }
    //获取鼠标相对于canvas 的位置
    setMousePos(event){
        const {clientX,clientY}=event;
        const {left,top}=this.canvas.getBoundingClientRect();
        const [x,y]=[clientX-left,clientY-top];
        this.pos=new Vector2(x,y);
        return this;
    }
    //获取与鼠标点交叉点对象
    computeIntersects(objs){
        const _this=this;
        const a=[];
        objs.forEach((obj)=>{
            if(_this.intersectObj(obj)){
                a.push(obj);
            }
        });
        this.intersects=a;
        return a;
    }
    intersectObj(obj){
        switch (obj.boundType) {
            case 'rect':
                return this.intersectRect(obj);
                break;
            case 'circle':
                return this.intersectCircle(obj);
                break;
            case 'sector':
                return this.intersectSector(obj);
                break;
            default:
                return false;
        }
    }
    intersectRect(obj){
        const {pos}=this;
        const {min,max}=obj.boundingBox;
        return (pos.x<max.x && pos.x>min.x && pos.y<max.y && pos.y>min.y);
    }
    intersectCircle(obj){
        const {pos}=this;
        //鼠标减圆心位
        //console.log('obj.worldPos',obj.worldPos)
        const mouseSubObj=pos.clone().sub(obj.worldPos);
        //鼠标到圆心到距离和圆的半径对比
        return mouseSubObj.length()<obj.radius;
    }
    intersectSector(obj){
        const {pos}=this;
        //鼠标减圆心位
        const mouseSubObj=pos.clone().sub(obj.worldPos);
        //鼠标到圆心到距离和圆的半径对比
        const inRadius= mouseSubObj.length()<obj.radius;
        //鼠标到圆心到角度是否在扇形的范围内
        const mouseAngle=mouseSubObj.angle();
        const inAngle=obj.start<mouseAngle&&mouseAngle<obj.end;
        //上面的两个条件都要满足
        return inRadius&&inAngle;
    }
    //在当前控制器上触发鼠标移动的方法
    mousemove(){
        this.dispatchEvent({type:'mousemove',pos:this.pos});
    }
    //在元素上触发元素鼠标划上，鼠标划出，鼠标移动事件
    mouseoverEle(ele){
        ele.dispatchEvent({type:'mouseover',pos:this.pos,target:ele});
    }
    mouseoutEle(ele){
        ele.dispatchEvent({type:'mouseout',pos:this.pos,target:ele});
    }
    mousemoveEle(ele){
        ele.dispatchEvent({type:'mousemove',pos:this.pos,target:ele});
    }
    //更新边界，世界位
    update(){
        this.children.forEach((ele)=>{
            if(ele.boundType==='rect'){
                ele.computeBoundingBox();
            }else{
                console.log('更新世界位');
                ele.computeWorldPos();
                console.log(ele.worldPos)
            }
        });
    }
}

//img 加载器
const ImgLoader={
    onload(imgs,fn){
        const imgPros=imgs.map((ele)=>{
            return ImgLoader.imgPro(ele);
        });
        Promise.all(imgPros).then((val)=>{
            fn(val);
        },()=>{
            console.error('图片加载失败');
        });
    },
    imgPro(img){
        return new Promise((resolve)=>{
            img.onload=function(){
                resolve(img);
            }
        });
    }
};

//Flex 组件：像写css 一样canvas
class Flex extends Sprite{
    constructor(param={}){
        super();
        //盒子模型的内容区
        this.cont=new Group();
        //一对一双向关联当前Flex 对象
        this.cont.master=this;
        //是flex 对象
        this.isFlex=true;
        //位置
        this.pos=new Vector2();
        //尺寸，可能为'auto' 或数字
        this._fw='auto';
        this._fh='auto';
        //padding，临时没有margin
        this._padding={left:0,right:0,top:0,bottom:0};
        //材质，定义与填充色和描边相关的样式
        this._mat=null;
        //子集，将被添加到内容区
        this._items=null;
        this.cls='';

        //实际尺寸
        this.width=0;
        this.height=0;
        //主轴为x 轴
        this.flexDirection='row';
        //可换行
        this.flexWrap='nowrap';
        //主轴方向等量间隔
        this.justifyContent='spaceAround';
        //交叉轴对其方式
        this.alignItems='stretch';

        //边界类型: 默认矩形边界
        this.boundType='rect';

        //属性追加或者覆盖
        this.copyAttr(param,this);

        //更新实际尺寸
        this.updateActualSize();
        //更新图形
        this.updateShape();
        //更新自身图形的绘图方法
        this.updatedrawSelf();
    }
    get fw(){
        return this._fw;
    }
    set fw(val){
        this._fw=val;
        this.updateActualSize();
        this.updateShape();
    }
    get fh(){
        return this._fh;
    }
    set fh(val){
        this._fh=val;
        this.updateActualSize();
        this.updateShape();
    }
    get padding(){
        return this._padding;
    }
    set padding(val){
        this.copyAttr(val,this._padding);
        //this.checkCont();
        this.updateShape();
    }
    get items(){
        return this._items;
    }
    set items(val){
        this._items=val;
        //this.checkCont();
        this.addItemsToCont();
        this.updateShape();
        this.updatedrawSelf();
    }
    get mat(){
        return this._mat;
    }
    set mat(val){
        this._mat=val;
        this.updatedrawSelf();
    }
    //检测cont 内容区
    checkCont(){
        if(!this.cont){
            //盒子模型的内容区
            this.cont=new Group();
            //一对一双向关联当前Flex 对象
            this.cont.master=this;

        }
    }
    //更新内容区和项目
    updateShape(){
        this.updateCont();
        this.updateItems();
    }
    //更新内部元素的变换
    updateItems(){
        if(!this.items||!this.items.length){return}

        const {width,height}=this.cont;
        const colWidth=width/this.items.length;
        const _this=this;
        this.items.forEach((ele,ind)=>{
            if(!ele.isFlex){return}
            //主轴对齐方式justifyContent：spaceAround
            ele.fw=colWidth;
            let y=0;
            if(_this.alignItems==='flexEnd'){
                y=height-ele.height;
            }
            ele.pos.set(colWidth*ind,y);
            ele.updateActualSize();
            ele.updateShape();
        })
    }
    addItemsToCont(){
        if(!this.cont){return}
        const _this=this;
        this.items.forEach((ele,ind)=>{
            _this.cont.add(ele);
        })

    }
    //更新内容的变换
    updateCont(){

        const {items,cont,width,height,padding}=this;
        if(!cont||!width||!height||!padding){return}

        const {left,right,top,bottom}=padding;
        const pl=this.parsePadding(left,this.width);
        const pr=this.parsePadding(right,this.width);
        const pt=this.parsePadding(top,this.height);
        const pb=this.parsePadding(bottom,this.height);
        cont.pos=new Vector2(pl,pt);
        cont.width=width-pl-pr;
        cont.height=height-pt-pb;

    }
    //设置自身图形的绘图方法 drawSelf (根据样式和子集)
    //flex 的自身图形包括：背景框(定制矩形，尚无圆角)，cont 内容区(Group)
    updatedrawSelf(){
        const {mat,items}=this;
        const contV=items&&items.length;
        if(mat&&contV){
            this.drawSelf=(ctx)=>{
                this.setBackground(ctx);
                this.setCont(ctx);
            };
        }else if(mat){
            this.drawSelf=(ctx)=>{
                this.setBackground(ctx);
            };
        }else if(contV){
            this.drawSelf=(ctx)=>{
                this.setCont(ctx);
            };
        }
    }
    //绘制矩形作为当前flex 的背景
    setBackground(ctx){
        const {width,height,mat}=this;
        //绘制矩形作为当前flex 的背景
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,height);
        ctx.lineTo(width,height);
        ctx.lineTo(width,0);
        mat.draw(ctx);
    }
    //渲染内容区，内容区是一个容器，装载子集，只变换，无图形形态
    setCont(ctx){
        this.cont.draw(ctx);
    }
    parsePadding(pd,len){
        if(typeof pd==='string'){
            return len*parseFloat(pd)/100;
        }else{
            return pd;
        }
    }
    //根据flex 尺寸设置实际尺寸
    updateActualSize(){
        const _this=this;
        this.traverse((obj)=>{
            if(!obj.isFlex){return}
            _this.parseSize('width',obj.fw,obj);
            _this.parseSize('height',obj.fh,obj);
        });
    }
    parseSize(k,fs,obj){
        if(typeof fs==='number'){
            obj[k]=fs;
        }else if(obj.parent){
            if(fs==='auto'){
                obj[k]=obj.parent[k];
            }else if(fs.includes('%')){
                obj[k]=obj.parent[k]*parseFloat(fs)/100;
            }
        }
    }
    //获取基于世界位的flex 边界
    computeBoundingBox(){
        this.computeWorldPos();
        const {worldPos,width,height}=this;
        this.boundingBox={
            min:worldPos,
            max:new Vector2(worldPos.x+width,worldPos.y+height)
        };
        return this.boundingBox;
    }
    //获取对象的世界位
    computeWorldPos(){
        const pos=this.pos.clone();
        this.findParent(this,(parent)=>{
            pos.add(parent.pos);
            if(parent.cont){
                pos.add(parent.cont.pos);
            }
        });
        this.worldPos=pos;
        return pos;
    }
    //遍历子集,Flex 对象的子集在cont 里
    traverse(callback){
        callback( this );
        this.traverseEle(this,callback);
        this.traverseEle(this.cont,callback);
    }
    traverseEle(ele,callback){

        if(!ele){return;}
        const children = ele.children;
        if(!children||!children.length){return}
        for ( let [i,l]=[0,children.length]; i < l; i ++ ) {
            children[ i ].traverse&&children[ i ].traverse( callback );
        }
    }
    //遍历父级
    findParent(obj,fn){
        const parent=obj.parent;
        if(parent){
            const master=parent.master?parent.master:parent;
            fn(master);
            this.findParent(master,fn);
        }
    }
}

/*坐标图*/
class Coord extends Sprite{
    constructor(param){
        super();
        const {width=0,height=0,xData,sData}=param;
        this.width=width;
        this.height=height;
        this.xData=xData;
        this.sData=sData;
        this.markLen=10;
        this.main=[];
        this.vice=[];
        this.strokeStyle='#333';
        this.textOffset=5;
        this.update();
    }
    draw(ctx){
        const {markLen,strokeStyle,vice,width,height,textOffset}=this;
        ctx.beginPath();
        ctx.font='12px Arial';
        ctx.lineWidth='1';

        ctx.textBaseline='middle';
        ctx.strokeStyle=strokeStyle;
        ctx.fillStyle=strokeStyle;
        //y 轴 x 轴
        ctx.moveTo(0,vice[vice.length-1].y);
        ctx.lineTo(0,vice[0].y);
        ctx.lineTo(width,vice[0].y);
        //x 轴刻度
        ctx.textAlign='center';
        this.main.forEach((ele)=>{
            ctx.moveTo(ele.mx,height);
            ctx.lineTo(ele.mx,height+markLen);
            ctx.fillText(ele.text,ele.tx,height+markLen+textOffset);
        });
        //y 轴刻度
        ctx.textAlign='right';
        vice.forEach((ele)=>{
            ctx.moveTo(-markLen,ele.y);
            ctx.lineTo(0,ele.y);
            ctx.fillText(ele.text,-markLen-textOffset,ele.y);
        });
        ctx.stroke();
        //y 轴标尺
        ctx.strokeStyle='rgba(0,0,0,0.2)';
        ctx.beginPath();
        vice.forEach((ele)=>{
            ctx.moveTo(0,ele.y);
            ctx.lineTo(width,ele.y);
        });
        ctx.stroke();
    }
    update(){
        const {xData,height,width}=this;
        //主轴刻度计算
        const hn=xData.length;
        const hs=width/hn;
        for(let i=0;i<hn;i++){
            const x=hs*i;
            this.main[i]={mx:x+hs,tx:x+hs/2,text:xData[i]};
        }
        //交叉轴刻度计算
        const m=Math.max(...this.sData);
        const a=Math.max(m)/5;
        const b=Math.floor(a.toString().length/2);
        const c=Math.pow(10,b);
        const s=Math.max(parseInt(a/c)*c,1);
        const vs=s/m*this.height;
        const vn=Math.ceil(max/s);
        for(let i=0;i<=vn;i++){
            this.vice[i]={y:height-vs*i,text:s*i};
        }
    }
    getSpDt(num,divideNum=5){
        const a=num/divideNum;
        const b=Math.floor(a.toString().length/2);
        const c=Math.pow(10,b);
        return Math.max(parseInt(a/c)*c,1);
    }
}

//文字对象，带有背景
class TextHasBack extends Object2D{
    constructor(text='',width=100,height=30,background='rgba(0,0,0,0.5)'){
        super();
        this.text=text;
        this.width=width;
        this.height=height;
        this.radius=3;
        this.color='#fff';
        this.background=background;
        this.font='12px sans-serif';
        this.textAlign='center';
        this.textBaseLine='middle';
        this.origin=new Vector2();
    }
    draw(ctx){
        const {origin:{x,y},text,width,height,radius,color,background,font,textAlign,textBaseLine}=this;
        ctx.beginPath();
        ctx.moveTo(radius + x, y);
        ctx.lineTo(width - radius + x, y);
        ctx.arc(width - radius + x, radius + y, radius, -Math.PI / 2, 0);
        ctx.lineTo(width + x, radius + y);
        ctx.lineTo(width + x, height - radius + y);
        ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI / 2);
        ctx.lineTo(width - radius + x, height + y);
        ctx.lineTo(radius + x, height + y);
        ctx.arc(radius + x, height - radius + y, radius, Math.PI / 2, Math.PI);
        ctx.lineTo(x, height - radius + y);
        ctx.lineTo(x, radius + y);
        ctx.arc(radius + x, radius + y, radius, Math.PI, -Math.PI / 2);
        ctx.fillStyle=background;
        ctx.fill();
        ctx.fillStyle=color;
        ctx.font=font;
        ctx.textAlign=textAlign;
        ctx.textBaseline=textBaseLine;
        ctx.font=font;
        ctx.textAlign=textAlign;
        ctx.textBaseline=textBaseLine;
        ctx.fillText(text,x+width/2,y+height/2);
    }
}

//渲染器
class Renderer extends Sprite{
    constructor(param){
        super();
        const {
            rec=null,
            clearColor=null,
        }=param;
        this.isRenderer=true;
        this.rec=document.getElementById(rec);
        this.clearColor=clearColor;
    }
    get rec(){
        return this._rec;
    }
    set rec(val){
        this._rec=val;
        this._rec.innerHTML='';
        this.canvas=document.createElement('canvas');
        this.ctx=this.canvas.getContext('2d');
        this.updateSize();
        this._rec.append(this.canvas);
    }
    get clearColor(){
        return this._clearColor;
    }
    set clearColor(val){
        this._clearColor=val;
        this.setClearFn();
    }
    get resizable(){
        return this._resizable;
    }
    resize(event){
        this.updateSize();
        this.render();
    }
    updateSize(){
        const {clientWidth,clientHeight}=this.rec;
        this.canvas.style.width=`${clientWidth}px`;
        this.canvas.style.height=`${clientHeight}px`;
        this.canvas.width=clientWidth*2;
        this.canvas.height=clientHeight*2;
        this.scale.set(2,2);
    }
    setClearFn(ctx){
        const {canvas,clearColor}=this;
        if(!this.ctx){return}
        if(clearColor==null){
            this.clear=function(ctx){
                ctx.clearRect(0,0,canvas.width,canvas.height);
            }
        }else if(typeof clearColor==='string'){
            this.clear=function(ctx){
                ctx.save();
                ctx.fillStyle = clearColor;
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.restore();
            }
        }
    }
    render(){
        this.clear(this.ctx);
        this.draw(this.ctx);
    }
}
