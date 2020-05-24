class Event {
  constructor () {
    this.eventList = {}
  }
  // 订阅
  on(key,fn){
    if(!this.eventList[key]){
      this.eventList[key] = []
    }
    this.eventList[key].push(fn)
  }
  // 发布
  emit(){
    const key = [].shift.call(arguments)
    const fns = this.eventList[key]
    if(!fns || !fns.length){
      return false 
    }
    fns.forEach(fn => {
      fn.apply(this,arguments)
    });
  }
  remove(key,fn){
    const fns = this.eventList[key]
    if(!fn){
      fns && (fns.length = 0)
    }   
    fns.forEach((cb,idx) => {
      if(cb === fn){
        fns.splice(idx,1)
      }
    })
  }
}
const obj = new Event()
obj.on('eventName',(param)=>{
  console.log('eventName', param)
})
obj.emit('eventName','emit')

