if (window.Worker) {
  const numWorkers = 10; // 可以根据需要调整线程数量
  const workers = [];

  for (let i = 0; i < numWorkers; i++) {
    const worker = new Worker(URL.createObjectURL(new Blob([`
      self.onmessage = function(event) {
        const workerId = event.data; // 接收任务标识
        console.log(\`Worker \${workerId} 正在执行任务...\`);
      
        // 添加无限循环以占用 CPU
        let iteration = 0;
        while (true) {
          console.log(\`Worker \${workerId} 正在循环，这是第 \${iteration} 次循环！\`);
          iteration++;
        }
      };
    `])));
    
    worker.postMessage(i); // 向 Worker 发送任务标识，以便区分不同的 Worker
    workers.push(worker);
  }

  // 在主线程中处理 Web Worker 的结果
  workers.forEach((worker, i) => {
    worker.onmessage = function(event) {
      const result = event.data;
      console.log(`Worker ${i} 完成任务，结果为: ${result}`);
    };
  });
} else {
  console.log("浏览器不支持 Web Worker。");
}
