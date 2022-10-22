console.log(5);
Promise.resolve().then(()=> console.log(4));
setImmediate(()=>{
  console.log('immediate')
})
console.log(1)
setTimeout(()=>{
  console.log('timeout')
},2)

setTimeout(() => console.log(2), 0)
process.nextTick(()=> console.log(3))
console.log(6);