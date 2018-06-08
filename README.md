
# multi-page-router

![Coveralls bitbucket](https://img.shields.io/coveralls/bitbucket/pyKLIP/pyklip.svg)
![TeamCity CodeBetter](https://img.shields.io/teamcity/codebetter/bt428.svg)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg)


## About

> * Browser address resolution tool
> * Multiple page router

## Router.config

> * If you only use static method, you don't need to use it
> * Only use multi-page routing, you need it

```javascript
//router.js
   const rmap ={
	index: {
        path: "/",//default  file  is index.tml
        query: {
            name: "",
            id: ""
        }
    },
    pageA: {
        path: "/pageA.html",
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
## methods

|    name       | isStatic |  paramsType        | warn            | Usage|
| ----------    | ---      |   ---          | ---                 | ---|
| go            |  true    |   number       |                     | like:$Router.go(-1) or $Router.go(2)  |
| push          |  false   |   object       |                     | new $Router(Maps).push|
| replace       |  false   |   object       |                     | new $Router(Maps).replace|
| checkLocation |  false   |     --         |                     | new $Router(Maps).checkLocation|
| query         |  true    | string or --   |                     | $Router.query("name")|
| querytoJson   |  true    |   string or -- |                     | $Router.querytoJson()  or  $Router.querytoJson("url")|
| disabledBack  |  true    |       --       |  no suppert IE10    |  $Router.disabledBack() |

##  Usage

### support  Internet explorer

```html
  <!--- If you need to point to Internet explorer, you should add it-->
   <script src="https://cdn.bootcss.com/babel-polyfill/6.23.0/polyfill.js"></script>
```

### import  or  require
```javascript
  //import  $Router from "multi-page-router";
  let $Router=require("multi-page-router");
  import Maps from "multi-page-router";
  let root="/demo/"; //your project root path
  let Router = new $Router(root,Maps);

```

### include  by  html tag script 
```
<script src="file"></script>
<script>
  var Router=new $Router("/root/",{...Maps});
</script>
```

## method usage

### push

 ```javascript 
//it will be error,becasue it's query no include id
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelector("[name=pageA]").onclick=function(){
    Router.push({"name":"pageA",query:{}})
  }
}, false);

```


 ```javascript
//it will be success
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelector("[name=pageD]").onclick=function(){
    Router.push({"name":"pageC",query:{name:"100",id:120}})
  }
}, false);

```
### replace

 ```javascript
//window.location.replace("target")
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelector("[name=pageC]").onclick=function(){
    Router.replace({"name":"pageC",query:{name:"100",id:120}})
  }
}, false);

```
### checkLocation
 ```javascript
//check browser location.search
 //当前页面检测
        var checkLocation = Router.checkLocation();
        if (checkLocation.miss.length) {
            console.log(`当前页面路由${checkLocation.routerName}缺少指定query:${checkLocation.miss.join(",")},它应该包含内容${JSON.stringify(checkLocation.routerQueryConfig)}`)
        }
```
### $Router.query

```javascript
//get location.search  query "name
$Router.query("name")

```
### $Router.querytoJson()

```javascript
//get location.search and format to json
$Router.querytoJson()

```
```javascript
//get location.search and format to json
$Router.querytoJson("https://www.google.com.hk/?gfe_rd=cr&ei=G3O7VI7JFtbF0ASc54DoAQ")
```
### $Router.disabledBack()

```javascript
//disabled  history back
$Router.disabledBack()

```

# example

> * The sample code is under the demo directory
> * You must open a server instead of opening it directly in the browser
> *  Advise you to  use  'anywhere -p 996'  on  root directory;