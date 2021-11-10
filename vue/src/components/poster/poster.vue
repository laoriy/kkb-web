<template>
    <div class="praise" v-show="showDialog" @click="close">
        <div class="praiseDialog" id="praise_Content">
            <img src="./dialog.png" @load="bgImgLoad" class="bg" alt="" />
            <div class="titleBox">
                <span class="line">——</span>
                <span class="titleDesc">社群销售排行榜</span>
                <span class="line">——</span>
            </div>
            <div class="rankBox">第{{ itemData.rank }}名</div>
            <div class="imgBox">
                <img :src="itemData.headUrl || defaultUrl" alt="" />
            </div>
            <div class="name">{{ getName() }}</div>
            <div class="updateTime">数据更新截止于{{ updateTime }}</div>
        </div>
        <div class="content">
            <div class="descBox">
                <p class="text" @click="init">点击保存</p>
                <p class="text" @click="initSvg">点击保存svg</p>
            </div>
        </div>
    </div>
</template>

<script>
import { createPoster, createSvgPoster } from '@/utils/createPoster';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
    props: {
        updateTime: {
            type: String,
            default: '2021-10-10 12:12:12',
        },
    },
    data() {
        return {
            showDialog: false,
            itemData: {
                userName: '刘瑞军少时刘瑞军少时诵诗书所诵诗书所',
                rank: 1,
            },
            showImgUrl: '',
            bgLoad: false,
            defaultUrl: require('./default.png'),
        };
    },
    methods: {
        getName() {
            const data = this.itemData;
            return data.userName || data.nickName || data.userTel || '';
        },
        close() {
            this.showDialog = false;
        },
        bgImgLoad() {
            this.bgLoad = true;
        },
        open() {
            this.showDialog = true;
        },
        async init() {
            const el = document.getElementById('praise_Content');
            createPoster(el);
        },
        initSvg() {
            const el = document.getElementById('praise_Content');
            createSvgPoster(el);
        },
    },
});
</script>

<style lang="less" scoped>
.praise {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(9, 9, 9, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}
.content {
    position: absolute;
    top: 20px;
    .showImgClass {
        width: 5.52rem;
    }
    .descBox {
        margin-top: 0.32rem;
        .icon {
            width: 1.52rem;
            height: 1.52rem;
        }
        .text {
            margin-top: 0.14rem;
            font-family: PingFangSC-Regular;
            font-size: 0.22rem;
            color: #ffffff;
            text-align: center;
            line-height: 0.32rem;
        }
    }
}

.praiseDialog {
    position: fixed;
    width: 5.56rem;
    height: 7.4rem;
    text-align: center;
    .bg {
        width: 100%;
        height: 100%;
    }
    .titleBox {
        color: #7e4f1b;
        position: absolute;
        top: 2.48rem;
        width: 100%;
        .titleDesc {
            font-family: PingFangSC-Medium;
            font-size: 0.38rem;
            text-align: center;
            margin: 0 0.3rem;
        }
    }
    .rankBox {
        color: #7e4f1b;
        position: absolute;
        top: 3.26rem;
        width: 100%;
        font-family: PingFangSC-Medium;
        font-size: 0.38rem;
        text-align: center;
    }
    .imgBox {
        position: absolute;
        top: 4.04rem;
        width: 100%;
        img {
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
        }
    }
    .name {
        color: #7e4f1b;
        position: absolute;
        top: 5.7rem;
        width: 100%;
        // height: 0.64rem;
        font-family: PingFangSC-Medium;
        font-size: 0.44rem;
        // line-height: 0.64rem;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .updateTime {
        color: #fff;
        position: absolute;
        bottom: 0.4rem;
        width: 100%;
        font-family: PingFangSC-Medium;
        font-size: 0.2rem;
        text-align: center;
    }
}
</style>
