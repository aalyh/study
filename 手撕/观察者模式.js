// 创建观察者队列
const queuedObservers = new Set();
// 添加观察对象时需要执行的函数
const observe = (fn) => queuedObservers.add(fn);
// 监听对象
const observable = (obj) => new Proxy(obj, { set });
// 监听对象的 set 操作
function set(target, key, value, receiver) {
	// 设置对象属性的值
	const result = Reflect.set(target, key, value, receiver);
	// 观察对象改变时，执行添加的函数
	queuedObservers.forEach((observer) => observer());
	return result;
}

const person = observable({
	name: "Zhange San",
	age: 47
});

function print() {
	console.log(`${person.name}, ${person.age}`);
}

observe(print);

person.name = "Li Si";
// Li Si, 47