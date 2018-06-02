//import {Router} from "./multRouter.class.js";


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
// window.Router = new Router(rmap);
 export default rmap;