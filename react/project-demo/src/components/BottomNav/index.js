import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const menu = [
    {
        key: "home",
        title: "首页",
        link: "/",
        icon: "shouye"
    },
    {
        key: "cart",
        title: "购物车",
        link: "/cart",
        icon: "fenlei"
    },
    {
        key: "olist",
        title: "订单列表",
        link: "/olist",
        icon: "icon-"
    },
    {
        key: "user",
        title: "我的淘宝",
        link: "/user",
        icon: "wode"
    }
];

export default function BottomNav() {


    return (
        <ul className="bottomNav">
            {menu.map(item => (
                <MenuItem key={item.key} {...item} />
            ))}
        </ul>
    );

}

function MenuItem(props) {
    return (
        <li className="menuItem">
            <span className={"iconfont icon-" + props.icon}></span>
            <Link to={props.link}>{props.title}</Link>
        </li>
    );
}
