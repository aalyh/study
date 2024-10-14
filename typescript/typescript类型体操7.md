TypeScript 类型系统没有加减乘除运算符，那么在TypeScript中怎么做数值运算呢？我们可以通过数组类型取length来拿到数值。

TypeScript 类型系统中没有加减乘除运算符，但是可以通过构造不同的数组然后取 length 的方式来完成数值计算，把数值的加减乘除转化为对数组的提取和构造

## 数组长度实现加减乘除
**Add**
思路：构造两个数组，然后合并成一个，取结果数组的length

```js
type BuildArray<Length extends number, Ele = unknown, Arr extends unknown[] = []> = Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>

type Add<Num1 extends number, Num2 extends number> = [...BuildArray<Num1>, ...BuildArray<Num2>]['length'];

type result = Add<32,25>
```
- 类型参数 Length 是要构造的数组的长度。类型参数 Ele 是数组元素，默认为 unknown。类型参数 Arr 为构造出的数组，默认是 []。
- 如果 Arr 的长度到达了 Length，就返回构造出的 Arr，否则继续递归构造
- 基于它就能实现加法

**Subtract**
思路：构造被减数长度的数组，通过模式匹配方式匹配出减数个数的元素，将剩余元素放入新数组中返回。

```js
type Subtract<Num1 extends number, Num2 extends number> = BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest] ? Rest['length'] : never;
```
- 类型参数 Num1、Num2 分别是被减数和减数，通过 extends 约束为 number
- 构造 Num1 长度的数组，通过模式匹配提取出 Num2 长度个元素，剩下的放到 infer 声明的局部变量 Rest 里
- 取 Rest 的长度返回，就是减法的结果

**Multiply**
乘法是多个加法结果的累加，因此可以在加法的基础上做改造实现。
在加法的基础上，多加一个参数来传递中间结果的数组，算完之后再取一次 length：

```js
type Multiply<Num1 extends number, Num2 extends number, ResultArr extends unknown[] = []> = Num2 extends 0 ? ResultArr['length'] : Multiply<Num1, Subtract<Num2, 1>, [...BuildArray<Num1>, ...ResultArr]>;
```
- 类型参数 Num1 和 Num2 分别是被加数和加数
- 加了一个类型参数 ResultArr 来保存中间结果，默认值是 []，相当于从 0 开始加
- 每加一次就把 Num2 减一，直到 Num2 为 0，就代表加完了
- 加的过程就是往 ResultArr 数组中放 Num1 个元素
- 最后取 ResultArr 的 length 就是乘法的结果

**Divide**
已知乘法是加法结果的累加，自然除法则是减法结果的累加，因此除法的实现就是被减数不断减去减数，直到减为 0，记录减了几次就是结果：

```js
type Divide<Num1 extends number, Num2 extends number, ContArr extends unknown[] = []> = Num1 extends 0 ? CountArr['length'] : Divide<Subtract<Num1, Num2>, Num2, [unknown, ...CountArr]>;
```
- 类型参数 Num1 和 Num2 分别是被减数和减数
- 类型参数 CountArr 是用来记录减了几次的累加数组
- 如果 Num1 减到了 0 ，那么这时候减了几次就是除法结果，也就是 CountArr['length']
- 否则继续递归的减，让 Num1 减去 Num2，并且 CountArr 多加一个元素代表又减了一次

## 数组长度实现计数
**StrLen**
数组长度可以取length来得到，但是字符串类型不能取length,如何实现求字符串长度的高级类型？

```js
type StrLen<Str extends string, CountArr extends unknown[] = []> = Str extends `${string}${infer Rest}` ? StrLen<Rest, [...CountArr, unknown]> : CountArr['length']
```
- 类型参数 Str 是待处理的字符串。类型参数 CountArr 是做计数的数组，默认值 [] 代表从 0 开始
- 每次通过模式匹配提取去掉一个字符之后的剩余字符串，并且往计数数组里多放入一个元素。递归进行取字符和计数
- 如果模式匹配不满足，代表计数结束，返回计数数组的长度 CountArr['length']

**GreaterThan**

实现两个数值的比较：往一个数组类型中不断放入元素取长度，如果先到了 A，那就是 B 大，否则是 A 大
```js
type GreaterThan<Num1 extends number, Num2 extends number, CountArr extends unknown[] = []> =
    Num1 extends Num2 
    ? true 
    : CountArr['length'] extends Num1 
        ? false 
        :GreaterThan<Num1, Num2, [...CountArr, unknown]>
```
- 类型参数 Num1 和 Num2 是待比较的两个数
- 类型参数 CountArr 是计数用的，会不断累加，默认值是 [] 代表从 0 开始
- 如果 Num1 extends Num2 成立，代表相等，直接返回 false
- 否则判断计数数组的长度，如果先到了 Num2，那么就是 Num1 大，返回 true
- 反之，如果先到了 Num1，那么就是 Num2 大，返回 false
- 如果都没到就往计数数组 CountArr 中放入一个元素，继续递归