import Vector2 from "./Vector2.js";
export default class Sprite{
    constructor(){
        this.children=[];
        this.pos=new Vector2();
    }
    drawSelf(ctx){}
    draw(ctx){
        const {pos}=this;
        ctx.save();
        ctx.translate(pos.x,pos.y);
        ctx.save();
        this.drawSelf(ctx);
        ctx.restore();
        this.children.forEach((ele)=>{
            ele.draw(ctx);
        });
        ctx.restore();
    }
    add(ele){
        ele.parent=this;
        this.children.push(ele);
    }
}
