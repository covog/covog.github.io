self.onmessage = function(event) {
  const workerId = event.data; // 接收任务标识
  console.log(`Worker ${workerId} 正在执行任务...`);

  // 添加无限循环以占用 CPU
  let iteration = 0;
  while (true) {
    console.log(`Worker ${workerId} 正在循环，这是第 ${iteration} 次循环！`);
    iteration++;
  }
};
