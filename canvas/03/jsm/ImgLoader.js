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
export default ImgLoader;
