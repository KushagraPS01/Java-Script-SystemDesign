class TaskScheduler {
    constructor(concurrency) {
        this.concurrency = Number(concurrency);
        this.runningTasks = 0;
        this.__waitingQueue = []
    }

    getNextTask() {
        if (this.runningTasks < this.concurrency &&       // Check the condition for RunningTask Space
            this.__waitingQueue.length > 0
        ){
            const NextTask = this.__waitingQueue.shift();  // asign Task from waiting list
            NextTask();
        }
    }

    addTask(task) {
        return new Promise((resolve, reject)  => {
            async function __taskRunner() {
                this.runningTasks +=1;
                try {
                    const result = await task();
                    console.log('Result', result);       // Run a task
                    resolve(result)
                }
                catch(err) {
                    console.log('Error Occured', err);   // Error while completing
                    reject(err);
                }
                finally {
                    this.runningTasks -= 1;              // after a Task completed 
                    this.getNextTask();                  // Check task in Queue
                }
            }
            if (this.runningTasks < this.concurrency) {  // Check if there is space in Running tasks
                __taskRunner.call(this);                 // Call taksRunner function to asign task
            }
            else {
                this.__waitingQueue.push(__taskRunner.bind(this));    // if running tasks are full , then send Task to waiting Queue
            }
        })
    }

}

const scheduler = new TaskScheduler(2);

// scheduler.addTask(
//     () => new Promise((res) => setTimeout(() => res('Task1'), 1000))     // <Name of Task> , <Time of Running>
// );
// scheduler.addTask(
//     () => new Promise((res) => setTimeout(() => res('Task2'), 5*1000))   // This take taking 5 Times Extra to run
// );
// scheduler.addTask(
//     () => new Promise((res) => setTimeout(() => res('Task3'), 1000))
// );



/**
 * Suppose we want to create scheduler for messaging system
 */

async function saveToDB(message) {
    return new Promise((res, rej) =>
        setTimeout(() => 
            console.log('Message ${message} saved to DB!')),
        2*1000      // I'll take around 2 sec to 
    )  
}

function chat() {
    const messages = Array(100).fill(null)

    messages.forEach((_, index) => {
        const message = 'Message : ${index}'
        scheduler.addTask()
    })
}