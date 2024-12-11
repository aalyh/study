//模拟100条数据
const message = new Array(100).fill('');
for (let i = 0; i < 100; i++) {
  message[i] = '第' + i + '条数据';
}

function axiosGet(index) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(message[index])
    }, 1000 * Math.random())

  })
}

// async + promise 方案
async function asyncProcess(max = 10) {
  const task = []; //并发池
  const res = [];

  for (let i = 0; i < 100; i++) {
    const curr = axiosGet(i).then(value => {
      console.log(value, task.length);
      res.push(value);
      //请求结束后将该Promise任务从并发池中移除
      task.splice(task.indexOf(curr), 1)
    });
    //每当并发池跑完一个任务，就再塞入一个任务
    task.push(curr);
    //利用Promise.race方法来获得并发池中某任务完成的信号
    //跟await结合当有任务完成才让程序继续执行,让循环把并发池塞满
    if (task.length === max) {
      await Promise.race(task)
    }
  }
  await Promise.allSettled(task)
  return res;

}

asyncProcess().then(value => {
  console.log(value)
})

