import $Router from "../../dist/index";
import {rmap,root} from "../../src/router.js";
window.Router = new $Router(root,rmap);
import 'chai/register-expect';
describe("Router jump test", () => {
    it("querytoJson,one query", (done) => {
       // location.search= "?name=testname";//修改location.search
       $Router.bowserSearch="?name=testname";
        expect($Router.querytoJson()).to.deep.include({ name: "testname" });
        done();
    });
});