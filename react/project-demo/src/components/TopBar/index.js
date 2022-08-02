import React from "react";
import { useHistory } from "react-router-dom";

import "./index.scss";

export default function TopBar(props) {
    const history = useHistory();
    const { title } = props;
    return (
        <div className="topBar">
            <span
                onClick={() => history.go(-1)}
                className="iconfont icon-jiantou-copy"></span>
            <div className="menuItem">{title}</div>
        </div>
    );
}
