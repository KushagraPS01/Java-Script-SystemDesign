class TaskScheduler {
    constructor(concurrency) {
        this.concurrency = Number(concurrency);
        this.runningTasks = 0;
    }

    getNextTask() {
        if (this.runningTasks < this.concurrency &&
            this.__waitingQueue.length > 0
        ){
            const NextTask = this.__waitingQueue.shift();
            NextTask();
        }
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
                    this.getNextTask();         // Check task in Queue
                }
            }
            if (this.runningTasks < this.concurrency) {
                __taskRunner.call(this);
            }
            else {
                this.__waitingQueue.push(__taskRunner.bind(this));
            }
        })
    }

}

const scheduler = new TaskScheduler(2);

scheduler.addTask(
    () => new Promise((res) => setTimeout(() => ('Task1'), 1000))
);
scheduler.addTask(
    () => new Promise((res) => setTimeout(() => ('Task2'), 1000))
);
scheduler.addTask(
    () => new Promise((res) => setTimeout(() => ('Task3'), 1000))
);
