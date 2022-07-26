import React, {Component} from "react";
import {useHistory} from "react-router-dom";

import "./index.scss";

// export default class TopBar extends Component {
//   render() {
//     const {title} = this.props;
//     return (
//       <div className="topBar">
//         <span onClick={()=>hi} className="iconfont icon-jiantou-copy"></span>
//         <div className="menuItem">{title}</div>
//       </div>
//     );
//   }
// }

export default function TopBar(props) {
  const history = useHistory();
  console.log("routes", props); //sy-log
  return (
    <div className="topBar">
      <span
        onClick={() => history.go(-1)}
        className="iconfont icon-jiantou-copy"></span>
      <div className="menuItem">--</div>
    </div>
  );
}
