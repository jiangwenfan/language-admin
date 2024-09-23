import React,{Component} from "react";
import {withRouter,Route} from "react-router-dom";
import LoginPage from "../../page/login";
import HomePage from "../../page/Home";

class StartScreen extends Component {
    // 首屏页面:
    // 背景是logo信息，主要用来判断当前是否登陆

    state = {
        checking: true
    }

    componentDidMount(){
        // 测试
        // localStorage.setItem("token","123");

        const token = localStorage.getItem("token");
        this.setState({checking:false});

        if(token){
            // 跳转到首页
            this.props.history.replace("/home");
        }else{
            // 跳转到登陆页
            this.props.history.replace("/login");
        }
    }

    // {/* 注册 login路由 和 /home 路由 */}
    render(){
        return (
            <div>
                {this.state.checking ? <h2>请稍等，正在检查登陆状态 Loading</h2> : <div>
                <Route path="/login" component={LoginPage} />
                <Route path="/home" component={HomePage} />
                </div>}
            </div>
        )
    }
}

export default withRouter(StartScreen);