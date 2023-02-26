
import createInitCommand from "./commands/init.js"

import createCli from "./createCli.js";
import "./log/exception.js"

export default function(args){
  const program = createCli()
  createInitCommand(program)
  program.parse(process.argv)
}