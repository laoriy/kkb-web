export default class ImgRect{
    constructor(img,pos){
        this.img=img;
        this.pos=pos;
    }
    draw(ctx){
        const {img,pos}=this;
        ctx.save();
        ctx.drawImage(img,pos.x,pos.y);
        ctx.restore();
    }
}
