//路径生成器
export const hrefMaker = function (obj) {
    //router.push({ name: 'register', query: { plan: 'private' }})  同域名同时路由有配置
    //router.push({ path: 'register', query: { plan: 'private' }})  不同域名 路由没有配置
    let tmpQuery = "";
    //遍历对应的路由query   
    for (let [key, value] of Object.entries(this.querytoJson())) {
        if (!obj["query"][key]) {
            tmpQuery == "" ? (tmpQuery += `${key}=${value}`) : (tmpQuery += `&${key}=${value}`);
        }
    }
    //遍历调用push或者replace的query
    for (let [key, value] of Object.entries(obj.query)) {
        tmpQuery == "" ? (tmpQuery += `${key}=${value}`) : (tmpQuery += `&${key}=${value}`);
    }
    tmpQuery == "" ? (tmpQuery = "?" + tmpQuery) : "";
    return obj.path ? (`${obj.path}/${tmpQuery}`) : (`${location.origin}/${this.router[obj.name]["path"]}?${tmpQuery}`);
}



/*  query检测
   *	@parma obj{router obj}
   *	@param type{string}
   */
export const check = function (obj, type) {
    //第三方链接地址判断
    if (obj.path && /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/gi.test(obj.path)) {
        return true;
    } else if (obj.path && !(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/gi.test(obj.path))) {
        return false;
    }
    //同域名判断--------------------------------------------
    //如果缺少路由name或者路由配置没有改name对应的配置
    if (!(obj.name && this.router[obj.name])) {
        throw { msg: `不存在该routerRouter.push(${JSON.stringify(obj)})`, type: "noMatchRouter" };
        return false;
    };
    //如果没有配置query同时当前页面没有对应的query，就报错
    let routerMapQuery = this.router[obj.name]["query"]; //路由配置对应的query
    // if (routerMapQuery) {
    //     for (let [key, value] of Object.entries(routerMapQuery)) {
    //         if (!(obj["query"][key] || this.query(key))) {
    //             throw Error(`Router.${type}(${JSON.stringify(obj)})缺少路由<${obj.name}>所需要的query:${key},请和路由配置对比后再做修改`);
    //             return false;
    //             break;
    //         };
    //     }
    // }
    checkQueryByRouter.bind(this)(obj["query"], routerMapQuery, obj.name, (routerQueryConfig, routerKey, lackKey) => {
       // console.log("obj", obj)
        throw { msg: `Router.${type}(${JSON.stringify(routerQueryConfig)})缺少路由<${routerKey}>所需要的query:${lackKey.join(",")},请和路由配置对比后再做修改`, type: "noQuery" };
    });
    return true;
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
export const checkQueryByRouter = function (targetQuery, routerQueryConfig, routerKey, callback) {
    //console.log(targetQuery, routerQueryConfig, callback)
    let lackKey = [];
    if (routerQueryConfig) {
        for (let [key, value] of Object.entries(routerQueryConfig)) {
          //  console.log("targetQuery[key]", targetQuery[key], key, ":::", this.query.bind(this)(key))
            if (!(targetQuery[key] || this.query.bind(this)(key))) {
                lackKey.push(key);
            };
        }
        //如果有缺少的query
        if (lackKey.length) {
           // console.log("检测返回：", routerQueryConfig, routerKey, lackKey)
            if (typeof callback == "function") { callback(routerQueryConfig, routerKey, lackKey) };
            return false;
        }
    } else {
        return true;
    }
}
//路径跳转
export const jump = function(obj, type, isTest){
    //同域名链接
    if (type == "push" && check.bind(this)(obj, type)) {
        if (isTest) {
            return hrefMaker.bind(this)(obj);
        }
        window.location = hrefMaker.bind(this)(obj);
    }
    else if (type = "replace") {
        if (isTest) {
            return hrefMaker.bind(this)(obj);
        }
        location.replace(hrefMaker.bind(this)(obj));
    }
}
