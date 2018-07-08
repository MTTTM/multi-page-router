/* @flow */
import { jump, checkQueryByRouter, check, hrefMaker } from "./multRouter.until";
function multiple10 (num:number):number {
    return num * 10
  }
  
multiple10("234545fd,gv")
  



class $Router {
    constructor(root, router) {
        if (Object.prototype.toString.call(router) === "[object Object]") {
            this.router = router;
            this.root = root ? root : "";
        } else {
            throw { msg: "路由不是对象类型", type: "mapNoObject" }
        }
    }
    static bowserSearch = window.location.search;
    static go(number) {
        if (number < 0) {
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
    checkLocation() {
        let filterRouter;
        let filterRouterKey;
        //获取命中的query和对应的路由的key
        for (let [key, value] of Object.entries(this.router)) {
            console.log("root::", this.root + this.router[key]["path"], "location.pathname::", location.pathname)
            if (this.root + this.router[key]["path"] == location.pathname) {
                filterRouter = this.router[key]["query"];
                filterRouterKey = key;
                break;
            }
        };
        // console.log("checkbefore::",filterRouter,"||",this.querytoJson(),location.pathname)
        //如果当前location.search和路由的不匹配，就返回回调函数
        //  console.log("本地query安全检测：", this.querytoJson(), filterRouterKey, filterRouter)
        return checkQueryByRouter.bind(this)($Router.querytoJson(), filterRouter, filterRouterKey);
    };
    //获取指定query
    /*
      @params name {string} 要获取的query
      @params bowserSearch {string} 用来匹配的浏览器地址字符串
    */
    static query(name, bowserSearch) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let bowserSearchString = bowserSearch ? bowserSearch : $Router.bowserSearch;
        let r = bowserSearchString.substr(1).match(reg);
        //对浏览器encode后的中文或特殊代码进行反编译
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    }
    //浏览器query  json化，兼容携带hash#的window.location.href
    static querytoJson(queryString) {
        let tmpQuery;
        if (queryString) {
            tmpQuery = queryString;
        }
        else {
            tmpQuery = this.bowserSearch;
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
    static disabledBack() {
        history.pushState(null, null, location.href);
        window.addEventListener("popstate", e => {
            history.pushState(null, null, location.href);
        });
    }

};
// $Router.bowserSearch=window.location.search

export default $Router;