类型编程主要的目的就是对类型做各种转换，如何对类型做修改？
TypeScript 类型系统支持 3 种可以声明任意类型的变量： type、infer、类型参数。

- type：类型别名，声明一个变量存储某个类型。`type t = Promise<number>`
- infer：用于提取类型，存到声明的变量里。`type GetValueType<P> = P extends Promise<infer Value> ? Value : never`;
- 类型参数：用于接受具体类型。`type isTwo<T> = T extends 2 ? true: false;`

但是上述三种'变量'不是通常我们理解的变量，因为不能被重新赋值。但是做类型编程是为了能够产生各种负责的类型，因此只有通过重新构造来产生新类型。

# 重新构造
TypeScript 的 type、infer、类型参数声明的变量都不能修改，想对类型做各种变换产生新的类型就需要重新构造。

## 数组类型重新构造

**添加类型**

当我们声明了一个元组变量后，需要给这个元组类型添加新类型时：
```js
type tuple = [1,2,3];

type Push<Arr extends unknown[], Ele> = [...Arr, Ele];

type result = Push<[1,2,3],4>//[1,2,3,4]
```
