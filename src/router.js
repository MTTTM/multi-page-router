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
// @flow
function acceptsNumber(value: number) {
    // ...
  }
  
  acceptsNumber(42);       // Works!
  acceptsNumber(3.14);     // Works!
  acceptsNumber(NaN);      // Works!
  acceptsNumber(Infinity); // Works!
  acceptsNumber("foo");    // Error!
  
 export const root="/demo"