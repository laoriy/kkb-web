import html2canvas, { Options } from 'html2canvas';
import * as vueRasterize from 'vue-rasterize';

export function downloadImage(url: string, name = '图片'): void {
    const event = new MouseEvent('click');
    const aLink = document.createElement('a');
    aLink.download = name;
    aLink.href = url;
    aLink.dispatchEvent(event);
}

// export function getElOffsetTop(el: HTMLElement): number {
//     console.log(el);

//     let result = el.offsetTop;
//     while (el.offsetParent) {
//         el = el.offsetParent as HTMLElement;
//         result += el.offsetTop;
//     }
//     return result;
// }

const DEFAULT_OPTIONS = {
    backgroundColor: 'transparent',
    scale: window.devicePixelRatio * 1,
    useCORS: true,
    logging: false,
    autoDownload: true,
    imgType: 'image/png',
};

// html2canvas
export function createPoster(el: HTMLElement, options: Options): Promise<string> {
    let resolveFn: (value: string | PromiseLike<string>) => void;
    let rejectFn: (reason?: unknown) => void;
    // const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrollTop, getElOffsetTop(el));

    const htmlOptions = {
        width: el.offsetWidth,
        height: el.offsetHeight,
    };
    const drawOptions = Object.assign(DEFAULT_OPTIONS, htmlOptions, options);
    const { autoDownload, imgType } = drawOptions;
    const promiseInstance = new Promise<string>((resolve, reject) => {
        resolveFn = resolve;
        rejectFn = reject;
    });
    html2canvas(el, drawOptions)
        .then((canvas) => {
            const data = canvas.toDataURL(imgType);
            if (autoDownload) {
                downloadImage(data);
            }
            resolveFn(data);
        })
        .catch((error) => {
            rejectFn(error);
        });
    return promiseInstance;
}

function urlForSvg(svg: string) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function createSvg(el: HTMLElement) {
    const elString = el.outerHTML;
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">
    <foreignObject width="200" height="200">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
            <style>
            div {
              color: red;
              font:18px serif;
              height: 100%;
              overflow: auto;
            }
          </style>
            </head>
            <body>
               ${elString}
            </body>
        </html>
    </foreignObject>
</svg>`;
}

function loadImg(data: string) {
    return new Promise<HTMLImageElement>((resolve) => {
        const image = new Image();
        const svgBase64 = urlForSvg(data);
        image.src = svgBase64;

        image.onload = () => {
            document.body.appendChild(image);
            resolve(image);
        };
        image.onerror = (error) => {
            console.log(error);
        };
    });
}

function combineHtml(el: HTMLElement) {
    const html = document.querySelector('html');
    const cloneHtml = html!.cloneNode(true) as HTMLElement;
    const cloneEl = el.cloneNode(true);
    const cBody = cloneHtml.querySelector('body');
    if (cBody) {
        cBody.innerHTML = '';
        cBody.appendChild(cloneEl);
    }

    return {
        html: cloneHtml.outerHTML,
        rectWidth: el!.offsetWidth,
        rectHeight: el!.offsetHeight,
    };
}

export function createSvgPoster(el: HTMLElement): void {
    const canvas = document.createElement('canvas');

    const { html, rectWidth, rectHeight } = combineHtml(el);
    console.log(rectWidth, rectHeight);

    const aa = vueRasterize.drawHTML(html, canvas, {
        rectWidth,
        rectHeight,
        scale: 3,
    });
    aa.then(() => {
        downloadImage(canvas.toDataURL('image/png'));
    });

    // const svg = createSvg(el);

    // loadImg(svg).then((img) => {
    //     console.log(img);
    //     const canvas = document.createElement('canvas');
    //     const context = canvas.getContext('2d');
    //     canvas.width = img.width;
    //     canvas.height = img.height;
    //     context?.drawImage(img, 0, 0);

    //     downloadImage(canvas.toDataURL('image/png'));
    // });
}
