import Command from "./command.js";
import { log } from "../log/index.js"

class InitCommand extends Command{
  get command(){
    return "init [name]"
  }
  get description(){
    return "innit description"
  }
  get options(){
    return [
      ["-f --force", "是否强制更新", false],
      ["-v --version", "查看版本", false]
    ]
  }

  action([name, opts]){
    log.verbose("init", name, opts)
  }
}

function Init(instance){
  return new InitCommand(instance)
}

export default Init;
