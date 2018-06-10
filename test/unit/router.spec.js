import $Router from "../../src/multRouter.class";
import {rmap,root} from "../../src/router.js";
window.Router = new $Router(root,rmap);
import 'chai/register-expect';
describe("Router  test", () => {
    // it("push 缺少query测试:", (done) => {
    //    try{
    //     $Router.jump({ "name": "pageA", query: {} },"push","isTest")
    //    }
    //    catch(e){
    //      expect(e.type).to.equal("noQuery");
    //      done();
    //    }
    // });
    // it("push,缺少query name但是浏览器存在query：", (done) => {
    //     $Router.bowserSearch="?name=testname";//修改location.search
    //     let searchString=$Router.jump({ "name": "pageA", query: {id:100} },"push","isTest")
    //     expect($Router.querytoJson(searchString)).to.deep.include({name:"testname",id:'100'});
    //     done();
    // });
    it("querytoJson,one query", (done) => {
        $Router.bowserSearch="?name=testname";//修改location.search
        expect($Router.querytoJson()).to.deep.include({name:"testname"});
        done();
    });
    it("querytoJson,mult query", (done) => {
        $Router.bowserSearch="?name=testname&&a=dd";//修改location.search
        expect($Router.querytoJson()).to.deep.include({name:"testname",a:"dd"});
        done();
    });
    it("querytoJson,encode query", (done) => {
        $Router.bowserSearch="?name=%E4%B8%AD%E5%9B%BD&&a=dd";//修改location.search
        expect($Router.querytoJson()).to.deep.include({name:"中国",a:"dd"});
        done();
    });
    //"a=1&b=2&redirect=" + encodeURIComponent("http://www.yyy.cn/index.html?sub=search&keyword=中国&lang=cn")
    it("querytoJson,query include url", (done) => {
        $Router.bowserSearch="?name=%E4%B8%AD%E5%9B%BD&&url="+encodeURIComponent('http://www.yyy.cn/index.html?sub=search&keyword=中国&lang=cn');//修改location.search
        expect($Router.querytoJson()).to.deep.include({name:"中国",url:"http://www.yyy.cn/index.html?sub=search&keyword=中国&lang=cn"});
        done();
    });
    it("query,one query", (done) => {
        $Router.bowserSearch="?name=testname";//修改location.search
        expect($Router.query('name')).to.equal("testname");
        done();
    });
    it("query,query  include chinese", (done) => {
        $Router.bowserSearch="?name=%E4%B8%AD%E5%9B%BD";//修改location.search
        expect($Router.query('name')).to.equal("中国");
        done();
    });
    it("query,mult query", (done) => {
        $Router.bowserSearch="?name=testname&&id=100";//修改location.search
        expect($Router.query('name')).to.equal("testname");
        expect($Router.query('id')).to.equal("100");
        done();
    });
  
})