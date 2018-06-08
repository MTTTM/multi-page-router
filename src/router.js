//import {Router} from "./multRouter.class.js";


export const rmap ={
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
 export const root="/demo"