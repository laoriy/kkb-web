import React, { useEffect } from 'react'
import classnames from "classnames";

import BottomNav from '../../components/BottomNav'
import TopBar from '../../components/TopBar'
import './index.scss'
export default function BasicLayout(props) {
    const {
        title = '默认',
        shortIcon = "https://store-images.s-microsoft.com/image/apps.64108.9007199266248398.f50070aa-ca14-4881-9e29-fb874435dc3d.a620dd2f-083d-4523-bdd5-d50a527956d4"
    } = props
    useEffect(() => {
        document.title = title
        document.getElementById("shortIcon").href = shortIcon;
    }, [title, shortIcon])

    
    return <div className={classnames("basicLayout")}>
        {/* <TopBar title={title} /> */}
        <article className='article'>{props.children}</article>
        {/* <BottomNav></BottomNav> */}
    </div>
}

