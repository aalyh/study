class MyPromise{
    _fulfillmentTasks = [];
    _rejectionTasks = [];
    _promiseResult = undefined;
    _promiseState = "pending";
    _alreadyResolved = false;

    then(onFulfilled,onRejected){
        const resultPromise = new MyPromise();
        const fullfillmentTask = ()=>{
            if(typeof onFulfilled === 'function'){
                const result = onFulfilled(this._promiseResult);
                resultPromise.resolve(result);
            }else{
                resultPromise.resolve(this._promiseResult);
            }
        }
        const rejectionTask = ()=>{
            if(typeof onRejected === "function"){
                const returned = onRejected(this._promiseResult);
                resultPromise.resolve(returned);
            }else{
                resultPromise.resolve(this._promiseResult);
            }
        }
        switch (this._promiseState){
            case "pending":
                this._fulfillmentTasks.push(fullfillmentTask);
                this._rejectionTasks.push(rejectionTask);
                break;
            case "fulfilled":
                addToTaskQueue(fullfillmentTask);
                break;
            case "rejected":
                addToTaskQueue(rejectionTask);
                break;
            default:
                throw new Error();
        }
        return resultPromise;
    }
    catch(onRejected){
        return this.then(null,onRejected);
    }
    _runReactionSafely(resultPromise,reaction){
        try {
            const returned = reaction(this._promiseResult);
            resultPromise.resolve(returned);
        } catch (error) {
            resultPromise.reject(e);
        }
    }
    resolve(value){
        if(this._alreadyResolved){
            return this;
        }
        if(isThenable(value)){
            value.then(
                (result) => this._doFulfill(result),
                (error) => this._doReject(error)
            )
        }
        return this;
    }
    _doFulfill(value){
        this._promiseState = "fulfilled";
        this._promiseResult = value;
        this._clearAndEnqueueTask(this._fulfillmentTasks);
    }
    reject(errror){
        if(this._alreadyResolved){
            return this;
        }
        this._alreadyResolved = true;
        this._doReject(errror);
        return this;
    }
    _doReject(error){
        this._fulfillmentTasks = "rejected";
        this._promiseResult = error;
        this._clearAndEnqueueTask(this._rejectionTasks);
    }
    _clearAndEnqueueTask(tasks){
        this._fulfillmentTasks = undefined;
        this._rejectionTasks = undefined;
        tasks.map(addToTaskQueue);
    }
}
function isThenable(value){
    return (
        typeof value === "object" && value !== null && typeof value.then === "function"
    )
}
function addToTaskQueue(task){
    setTimeout(task,0);
}


// 测试代码
new MyPromise()
	.resolve("result1")
	.then((x) => {
		console.log(x === "result1"); // true
		return "result2";
	})
	.then((x) => {
		console.log(x === "result2"); // true
		return new Error("error1");
	})
	.then((x) => {
		console.log(x.message === "error1"); // true
	});