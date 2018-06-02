
# multi-page-router

![Coveralls bitbucket](https://img.shields.io/coveralls/bitbucket/pyKLIP/pyklip.svg)
![TeamCity CodeBetter](https://img.shields.io/teamcity/codebetter/bt428.svg)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg)


## About

> Browser address resolution tool
> Multiple page router

# Router.config  

```javascript
//router.js
   const rmap ={
	index: {
        path: "/",//html文件地址,默认是index.tml
        query: {
            name: "",
            id: ""
        }
    },
    pageA: {
        path: "/pageA.html",//html文件地址
        query: {
            name: "",
            id: ""
        }
    },
    pageC: {
        path: "/pageC.html",
        query: {
            name: "",
            id: ""
        }
    }
};
 export default rmap;

```
##  Usage

```javascript
  import {Router} from "../../src/multRouter.class.js";
  import Maps from "../../src/router.js";
   window.$Router = new Router(Maps);

```

 ```javascript 
  
//window.location.href="target",it will be error,becasue it's query no include id
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelector("[name=pageA]").onclick=function(){
    $Router.push({"name":"pageA",query:{}})
  }
}, false);

```

 ```javascript
//it success
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelector("[name=pageD]").onclick=function(){
    $Router.push({"name":"pageC",query:{name:"100",id:120}})
  }
}, false);

```

 ```javascript
//window.location.replace("target")
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelector("[name=pageC]").onclick=function(){
    $Router.replace({"name":"pageC",query:{name:"100",id:120}})
  }
}, false);

```

 ```javascript
//check browser location.search,if invaild,callback params lackKey will include some query that you miss;
$Router.checkLocation((routerQueryConfig, routerKey, lackKey)=>{
        console.log(`当前页面路由${routerKey}缺少指定query:${lackKey.join(",")},它应该包含内容${JSON.stringify(routerQueryConfig)}`)
})
```
```javascript
//get location.search  query "name
$Router.query("name")

```
```javascript
//get location.search and format to json
$Router.querytoJson()

```

```javascript
//disabled  history back
$Router.disabledBack()

```