class TaskScheduler {
    constructor(concurrency) {
        this.concurrency = Number(concurrency);
        this.runningTasks = 0;
    }

    addTask() {
        return new Promise((resolve, reject)  => {
            async function __taskRunner() {
                this.runningTasks +=1;
                try {
                    const result = await task();
                    console.log('Result', result);     // Running a task
                    resolve(result)
                }
                catch(err) {
                    console.log('Error Occured', err);     // Error while completing
                    reject(err);
                }
                finally {
                    this.runningTasks -= 1;     // Task completed 
                }
            }
            if (this.runningTasks < this.concurrency) {
                __taskRunner();
            }
            else {
                this.__waitingQueue.push(__taskRunner);
            }
        })
    }

}


