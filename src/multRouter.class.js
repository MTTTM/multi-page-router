import {jump,checkQueryByRouter,check,hrefMaker} from "./multRouter.until"
export  class Router {
    constructor(router) {
        if (Object.prototype.toString.call(router) === "[object Object]") {
            this.router = router;
            this.bowserSearch=window.location.search;
        } else {
            throw {msg:"路由不是对象类型",type:"mapNoObject"}
        }
    }
    go(number) {
            if (number > 0) {
                history.back(number); //如果是0刷新当前，如果是大于0前进，如果小于0后退
            } else {
                window.history.go(number)
            }
    }
    push(obj) {
           jump.bind(this)(obj, "push");
        }

    replace(obj) {
       jump.bind(this)(obj, "replace");
    }
    //对比路由配置，查看当前浏览器地址栏地址是否合法
    /*
       checkFailCallback {function}  一个query检测失败后的回调函数
            @arguments obj {object} 有效的query json
            @arguments key {string} 缺失的query对应的key
       isTest {true}  是否测试环境
    */
    checkLocation(checkFailCallback,isTest) {
        let filterRouter;
        let filterRouterKey;
        //获取命中的query和对应的路由的key
        for (let [key, value] of Object.entries(this.router)) {
            if (this.router[key]["path"] == location.pathname) {
                filterRouter = this.router[key]["query"];
                filterRouterKey = key;
                break;
            }
        };
        // console.log("checkbefore::",filterRouter,"||",this.querytoJson(),location.pathname)
        //如果当前location.search和路由的不匹配，就返回回调函数
      //  console.log("本地query安全检测：", this.querytoJson(), filterRouterKey, filterRouter)
        return checkQueryByRouter.bind(this)(this.querytoJson(), filterRouter, filterRouterKey);
    };
    //获取指定query
    query(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
       //  console.log("query::::",this.bowserSearch)
        var r = this.bowserSearch.substr(1).match(reg);
        //对浏览器encode后的中文或特殊代码进行反编译
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    }
    //浏览器query  json化，兼容携带hash#的window.location.href
    querytoJson(queryString) {
        let tmpQuery;
        if(queryString){
            tmpQuery=queryString;
        }
        else{
            tmpQuery=this.bowserSearch;
        };
        let d = /[\?]+(.*)/ig.exec(tmpQuery) && /[\?]+(.*)/ig.exec(tmpQuery)[1] && /[\?]+(.*)/ig.exec(tmpQuery)[1].split("&") ? /[\?]+(.*)/ig.exec(tmpQuery)[1].split("&") : [];
        let t = {};
        for (let i = 0; i < d.length; i++) {
            let p = d[i].split("=");
            t[p[0]] = decodeURIComponent(p[1]);//对应encodeURIComponent
        }
        return t;
    }
    //禁止浏览器返回上一页,无刷新的通过不断的添加当前地址栏到history stack里面禁止跳转
    disabledBack() {
        history.pushState(null, null, location.href);
        window.addEventListener("popstate", e => {
            history.pushState(null, null, location.href);
        });
    }

};