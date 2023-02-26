#!/usr/bin/env node

import importLocal from "import-local"
import log from "npmlog";
import { filename } from "dirname-filename-esm";
import entry from "../lib/index.js";

// 用于解决esm中不能使用__filename的问题
const __filename = filename(import.meta)

if(importLocal(__filename)){
  log.info("cli", "使用本次redcell-cli版本")
}else{
  entry(process.argv.slice(2))
}