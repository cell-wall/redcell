class Command{

  constructor(instance){
    if(!instance) throw Error("command instance must not be null!")

    this.program = instance
    const cmd = this.program.command(this.command)
    cmd.description(this.description)
    // 在执行命令前后的钩子函数
    cmd.hook("preAction",()=>{
      this.preAction()
    })
    cmd.hook("postAction",()=>{
      this.postAction()
    })
    if(this.options?.length > 0){
      this.options.forEach((option)=>{
        cmd.option(...option)
      })
    }
    
    cmd.action((...params)=>{
      this.action(params)
    })
  }

  get command(){
    throw new Error("command must be implements")
  }

  get description(){
    throw new Error("description must be implements")
  }

  get action(){
    throw new Error("action must be implements")
  }

  preAction(){
    console.log("pre");
  }

  postAction(){
    console.log("post");
  }
};

export default Command;