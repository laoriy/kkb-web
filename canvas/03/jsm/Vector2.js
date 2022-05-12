//向量对象
export default class Vector2{
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
    //点积
    dot( v ) {
        return this.x * v.x + this.y * v.y ;
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
    //当前向量顺时针旋转90 度的法线
    getNormal(v=new Vector2()){
        return new Vector2(this.y,-this.x).normalize();
    }
    //两点连线后的法线
    getNormalTo(v=new Vector2()){
        return this.clone().sub(v).getNormal();
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
    static polar(len,dir){
        const v=new Vector2();
        v.x=Math.cos(dir)*len;
        v.y=Math.sin(dir)*len;
        return v;
    }
}
