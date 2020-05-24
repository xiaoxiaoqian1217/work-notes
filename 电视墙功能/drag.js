class Drag {
  constructor(dom, parent = null, num = 6){
    this.ele = dom
    const pos = dom.className ==='drag' ? dom.getBoundingClientRect() : {
      left: dom.offsetLeft,
      top: dom.offsetTop
    }
    console.log(pos,'pos')
    this.pos = pos
    this.parent = parent 
    this.num = 0
    this.move(this.ele)
  
  }
  createChild () {
    const div = document.createElement('div')
    this.parent.appendChild(div)
    div.className = 'cloneDiv'
    new Drag(div, this.parent)
  }
  move(ele){
    ele.onmousedown = (e) =>{
      const { ele} = this
      // 偏差值
      const pos = {
        left :ele.offsetLeft,
        top: ele.offsetTop
      }
      const disX = e.clientX - pos.left 
      const disY = e.clientY - pos.top 
      document.onmousemove = (e)=> {
        let left = e.clientX - disX
        let top = e.clientY - disY 
        const lMax = this.parent.offsetWidth - this.ele.offsetWidth
        const tMax = this.parent.offsetHeight - this.ele.offsetHeight
        if(left > lMax) left = lMax
        if(top > tMax) top = tMax
        if(left < 0) left = 0
        if(top< 0) top = 0
        ele.style.left = left + 'px'
        ele.style.top = top + 'px'

        document.onmouseup = ()=> {
         
          document.onmousemove = null;
          document.onmouseup = null;
          if(ele.className === 'drag'){
            this.createChild()
            ele.style.top = '0px'
            ele.style.left = '0px'
          }
          

        }
      }
    }
  }
}