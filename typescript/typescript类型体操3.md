TypeScript的静态类型系统中支持哪些类型？又支持哪些类型的运算逻辑？

# TypeScript 类型系统中的类型

由于静态类型系统的目的是将类型检查从运行时提前到编译时，那么TS类型系统肯定是要支持JS运行时的类型，包括：number、boolean、string、object、symbol、undefined、null等类型，以及他们的包装类型Number、Boolean、String、Object、Symbol。

但是在JS基础上，新增了三种类型：元组(Tuple)、接口（interface）、枚举（enum）。

## 元组
元组就是元素个数和类型固定的数组类型：

```ts
type Tuple = [number,string];
```

## 接口
接口可以用来描述函数、对象、构造器的结构：

```js
//描述对象
interface IPerson{
    name: string;
    age: number;
}

class Person implements IPerson{
    name: string;
    age:number;
}

const obj: IPerson = {
    name: 'guang',
    age: 18
}

//描述函数
interface SayHello{
    (name:string): string;
}

const func: SayHello = (name: string) => {
    return 'hi,'+name
}

//描述构造器
interface PersonConstructor{
    new (name: string, age: number): IPerson;
}

function createPerson(ctor: PersonConstructor):IPerson{
    return new ctor('guang', 18);
}
```

对象类型、class 类型在 TypeScript 里也叫做索引类型，也就是索引了多个元素的类型的意思。对象可以动态添加属性，如果不知道会有什么属性，可以用可索引签名：

```js
interface IPerson{
    [prop: string]: string | number;
}
const obj:IPerson = {};
obj.name = 'lihua',
obj.age = 18
```

## 枚举

枚举是一系列值的复合：
```js
enum Transpiler {
    Babel = 'babel',
    Postcss = 'postcss',
    Terser = 'terser',
    Prettier = 'prettier',
    TypeScriptCompiler = 'tsc'
}

const transpiler = Transpiler.TypeScriptCompiler;
```

## 其他类型

TypeScript还支持字面量类型，例如普通的字符串字面量'aaa'，或者是模板字面量 `aaa${string}`。

除此之外还有：
- never：代表不可达，当函数抛异常是返回值为never。
- void：代表空，可以是undefined或never。
- any：是任意类型，任何类型都可以赋值给它，它也可以赋值给任何类型（除了 never）。
- unKnown：是未知类型，任何类型都可以赋值给它，但是它不可以赋值给别的类型。

## 类型的装饰

除了描述类型的结构外，TypeScript 的类型系统还支持描述类型的属性，比如是否可选，是否只读等：

```js
interface IPerson {
    readonly name: string;
    age?: number;
}

type tuple = [string, number?];
```

# TypeScript类型系统中的类型运算

下面部分介绍TypeScript类型系统中的类型运算

## 条件：extends?:

TypeScript里的条件判断是`extends ? :`，叫做条件类型，类似于if else，用法如下：

```js
type res = 1 extends 2 ? true : false
```
在开发中一般用来做动态类型的运算，也是对类型参数的运算
```js
type isTwo<T> = T extends 2 ? true : false;

type res = isTwo<1>;
type res2 = isTwo<2>;
```
上述代码主要作用是根据传入类型参数，经过类型运算逻辑后，返回新的类型。

## 推导infer

主要用于提取类型的一部分，例如提取元组类型的第一个元素：

```js
type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R] ? T : never;

type res = Frist<[1,2,3]>
```

## 联合：|

联合类型（Union）类似 js 里的或运算符 |，但是作用于类型，代表类型可以是几个类型之一。

```js
type Union = 1 | 2 | 3;
```

## 交叉：&

交叉类型（Intersection）类似 js 中的与运算符 &，但是作用于类型，代表对类型做合并(同一类型可以合并，不同类型不能合并，会被舍弃)

```js
type ObjType = {a: number } & {c: boolean};
```

## 映射类型

对象、class在TypeScript对应的类型是索引类型(Index Type)，映射类型用于对索引类型作修改：

```js
type MapType<T> = {
    [Key in keyof T]?:T[Key];
}
```
keyof T 是查询索引类型中所有的索引，叫做`索引查询`。T[Key] 是取索引类型某个索引的值，叫做`索引访问`。in 是用于遍历联合类型的运算符。

例如：将一个索引类型的值变为三个元素的数组：

```js
type MapType<T> = {
    [Key in keyof T]: T[Key]
}

type res = MapType<{a:1,b:2}> // res = {a:[1,1,1],b:[2,2,2]}
```

除了值可以变化，索引也可以做变化，用 as 运算符，叫做`重映射`。

```js
type MapType<T> = {
    [
        Key in keyof T as `${Key & string}${Key & string}${{Key & string}`
    ]: [T[Key], T[Key], T[Key]]
}
type res = MapType<{a:1,b:2}> // res = {aaa:[1,1,1],bbb:[2,2,2]}
```