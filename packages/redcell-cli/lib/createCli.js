import path from "node:path"

import { program } from "commander"
import { dirname } from "dirname-filename-esm";
import fsExtra from "fs-extra";
import semver from "semver";

import { log } from "./log/index.js";

const __dirname = dirname(import.meta);
const pkgPath = path.resolve(__dirname, "../package.json");
const pkg = fsExtra.readJSONSync(pkgPath)

const LOWEST_NODE_VERSION = "17.0.0"

/**
 * @description 检查当前node环境version
 */
function checkNodeVersion(){
  log.verbose("node version", process.version)
  // 进行版本比较
  if(!semver.gte(process.version, LOWEST_NODE_VERSION)){
    throw new Error( `redcell-cli 需要安装 ${LOWEST_NODE_VERSION} 以上版本的node`)
  }
}

function preAction(){
  checkNodeVersion()
}

export default function createCli(){
  log.info("version", pkg.version)
  program
  .name(Object.keys(pkg.bin)[0])
  .usage("<command> [options]")
  .version(pkg.version)
  .option("-d, --debug", "是否开启调试模式", false)
  .hook("postAction", preAction)

  // debug模式下的日志信息
  program.on("option:debug",function(){
    if(program.opts().debug){
      log.verbose("debug","launch debug mode")
    }
  })

  // command未知命令时的处理
  program.on("command:*",function(obj){
    log.error("未知的命令："+ obj[0])
  })
  return program
}