import React from "react";
import { connect } from "react-redux";
import BasicLayout from "../../layout/BasicLayout";
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(function UserPage(props) {
    const { user } = props;
    const { userInfo } = user;
    return (
        <BasicLayout
            title="用户中心"
            shortIcon="https://gw.alicdn.com/tfs/TB1OIxTcLc3T1VjSZLeXXbZsVXa-183-144.png?getAvatar=1">
            <h3>UserPage</h3>
            <p>id: {userInfo.id}</p>
            <p>姓名：{userInfo.name}</p>
            <p>积分：{userInfo.money}</p>
        </BasicLayout>
    );
})