// 创建多个 Web Worker
const numWorkers = 10; // 可以根据需要调整线程数量
const workers = [];

for (let i = 0; i < numWorkers; i++) {
  const worker = new Worker("https://cdn.jsdelivr.us/gh/covog/covog.github.io/worker.js"); // 创建 Web Worker
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
