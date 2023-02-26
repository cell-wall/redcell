/**
 * @description 封装的报错信息捕获
 */
import { isDebug } from "./utils.js";
import { log } from "./log.js";

function printErrorLog(e, type){
  if(isDebug){
    log.error(type, e)
  }else{
    log.error(type, e.message)
  }
}

// 对process进行监听错误
process.on("uncaughtException",e => printErrorLog(e, "error"))
process.on("unhandledRejection",e => printErrorLog(e, "error"))