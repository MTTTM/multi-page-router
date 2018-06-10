import $Router from "./multRouter.class.js";

//路径生成器
export const hrefMaker = function (obj) {
    //router.push({ name: 'register', query: { plan: 'private' }})  同域名同时路由有配置
    //router.push({ path: 'register', query: { plan: 'private' }})  不同域名 路由没有配置
    //第三方跳转
    if(obj.path&&isVaildPath(obj)){
        return obj.path;
    };
    let tmpQuery = "";
    //遍历对应的路由query   
    for (let [key, value] of Object.entries($Router.querytoJson())) {
        if (!obj["query"][key]) {
            tmpQuery == "" ? (tmpQuery += `${key}=${value}`) : (tmpQuery += `&${key}=${value}`);
        }
    };
    //遍历调用push或者replace的query
    for (let [key, value] of Object.entries(obj.query)) {
        tmpQuery == "" ? (tmpQuery += `${key}=${value}`) : (tmpQuery += `&${key}=${value}`);
    };
    tmpQuery == "" ? (tmpQuery = "?" + tmpQuery) : "";
    let origin_ie=location.protocol+"//"+location.host+location.pathname;//fix IE  no supper  locaiton.origin_ie
    return obj.path ? (`${obj.path}/${tmpQuery}`) : (`${origin_ie}${this.router[obj.name]["path"]}?${tmpQuery}`);
}

export const isVaildPath = function (obj) {
    //第三方链接地址判断
    if (obj.path && /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/gi.test(obj.path)) {
        return true;
    } else if (obj.path && !(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/gi.test(obj.path))) {
        throw { msg: `${obj.path}不是有效地址`, type: "inValidPath" };
        return false;
    }
}

/*  query检测
   *	@parma obj{router obj}
   *	@param type{string}
   */
export const check = function (obj, type) {
    if(obj.path&&isVaildPath(obj)){
      return true;
    }
    //同域名判断--------------------------------------------
    //如果缺少路由name或者路由配置没有改name对应的配置
    if (!(obj.name && this.router[obj.name])) {
        throw { msg: `不存在该routerRouter.push(${JSON.stringify(obj)})`, type: "noMatchRouter" };
        return false;
    };
    //如果没有配置query同时当前页面没有对应的query，就报错
    let routerMapQuery = this.router[obj.name]["query"]; //路由配置对应的query
    let check=checkQueryByRouter.bind(this)(obj["query"], routerMapQuery, obj.name);
    if(check.miss.length){
      //  return {maps:routerQueryConfig, routerName:routerKey, miss:lackKey}
        throw { msg: `Router.${type}(${JSON.stringify(check.maps)})缺少路由<${check.routerName}>所需要的query:${check.miss.join(",")},请和路由配置对比后再做修改`, type: "noQuery" };
        return false;
    }
    else{
        return true;
    }
  
}

/*
    * 对比query是否完全匹配
    * targetQuery{object} 待检测的query json
    * routerQueryConfig {object} 已经命中的路由query配置
    * callback {function} 回调函数
    ** @arguments
    **  routerQueryConfig {object} 命中的路由query json
    **  routerKey  {string}  命中路由的key
    **  lackKey {Array} 缺少的query key
    */
export const checkQueryByRouter = function (targetQuery, routerQueryConfig, routerKey) {
    //console.log(targetQuery, routerQueryConfig, callback)
    let lackKey = [];
    console.log("routerQueryConfig,routerQueryConfig",routerQueryConfig)
    if (routerQueryConfig) {
        for (let [key, value] of Object.entries(routerQueryConfig)) {
            //  console.log("targetQuery[key]", targetQuery[key], key, ":::", this.query.bind(this)(key))
            console.log("targetQuery[key]:",targetQuery[key])
            if (!(targetQuery[key] || $Router.query(key))) {
                lackKey.push(key);
            };
        }
        //如果有缺少的query
        if (lackKey.length) {
            // console.log("检测返回：", routerQueryConfig, routerKey, lackKey)
           // if (typeof callback == "function") { callback(routerQueryConfig, routerKey, lackKey) };
          //  return false;
            return {maps:routerQueryConfig, routerName:routerKey, miss:lackKey}
        }
        return {miss:lackKey}
    } else {
        return {miss:lackKey}
    }
}
//路径跳转
export const jump = function (obj, type, isTest) {
    //同域名链接
    if (type == "push" && check.bind(this)(obj, type)) {
        if (isTest) {
            return hrefMaker.bind(this)(obj);
        }
        window.location = hrefMaker.bind(this)(obj);
      // hrefMaker.bind(this)(obj)
    }
    else if (type = "replace" && check.bind(this)(obj, type)) {
        if (isTest) {
            return hrefMaker.bind(this)(obj);
        }
        location.replace(hrefMaker.bind(this)(obj));
    }
}
