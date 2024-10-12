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
//在最后添加 push
type tuple = [1,2,3];

type Push<Arr extends unknown[], Ele> = [...Arr, Ele];

type result = Push<[1,2,3],4>//[1,2,3,4]

//在最前面添加 unshift

type Unshift<Arr extends unknown[], Ele> = [Ele, ...Arr];

type result2 = Unshift<[1,2,3],0>
```

**复杂案例**
构造要求：
将已有的两个元组类型合并成一个新的元组类型
```js
type tuple1 = [1,2];
type tuple2 = ['hello','world'];

//合并后
type tuple = [[1,'hello'],[2,'world']];
```
思路：提取元组中的两个元素，构造成新的元组
```js
type Zip<One extends [unknown,unknown], Other extends [unknown,unknown]> = 
    One extends [infer OenFirst, infer OneSecond] 
        ? Other extends [infer OtherFirst, infer OtherSecond]
            ? [[OneFirst, OtherFirst],[OneSecond, OtherSecond]] : []
            : [];

type result = Zip<tuple1,tuple2>；//[[1,'hello'],[2,'world']]
```
- 两个类型参数 One、Other 是两个元组，类型是 [unknown, unknown]，代表 2 个任意类型的元素构成的元组
- 通过 infer 分别提取 One 和 Other 的元素到 infer 声明的局部变量 OneFirst、OneSecond、OtherFirst、OtherSecond 里
- 用提取的元素构造成新的元组返回

同理，尝试一下合并任意各元素的元组，使用递归的方式：
```js
    type Zip2<One extends unknown[], Other extends unknown[]> = 
        One extends [infer OneFirst, ...infer OneRest]
            ? Other extends [infer OtherFirst, ...infer OtherRest]
                ? [[OneFirst,OtherFirst], ...Zip2<OneRest,OtherRest>] : []
                    : [];
```
- 类型参数 One、Other 声明为 unknown[]，也就是元素个数任意，类型任意的数组
- 每次提取 One 和 Other 的第一个元素 OneFirst、OtherFirst，剩余的放到 OneRest、OtherRest 里
- 用 OneFirst、OtherFirst 构造成新的元组的一个元素，剩余元素继续递归处理 OneRest、OtherRes

## 字符串类型的重新构造

思路：从已有字符串类型中提取部分字符串，经过一系列变换，构造成新的字符串类型

**CapitalizeStr**
将一个字符串字面量类型的'hello'转为首字母大写的'Hello'：

```js
type CapitalizeStr<Str extends string> = Str extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : Str;

type result = CapitalizeStr<'hello'>
```
- 声明了类型参数 Str 是要处理的字符串类型，通过 extends 约束为 string
- 通过 infer 提取出首个字符到局部变量 First，提取后面的字符到局部变量 Rest
- 使用 TypeScript 提供的内置高级类型 Uppercase 把首字母转为大写，加上 Rest，构造成新的字符串类型返回

**CamelCase**
将一个how_are_you重新构造为howAreYou：

```js
type CamelCase<Str extends string> = Str extends `${infer Left}_${infer Right}${infer Rest}` ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}` : Str;
```
- 类型参数 Str 是待处理的字符串类型，约束为 string
- 提取 _ 之前和之后的两个字符到 infer 声明的局部变量 Left 和 Right，剩下的字符放到 Rest 里
- 然后把右边的字符 Right 大写，和 Left 构造成新的字符串，剩余的字符 Rest 要继续递归的处理

**DropSubStr**
删除字符串中的某个子串：

```js
type DropSubStr<Str extends string, SubStr extends string> = Str extends `${infer Prefix}${SubStr}${infer Suffix}` ? DropSubStr<`${Prefix}${Suffix}`,SubStr> : Str;

type result = DropSubStr<'hello,,,,,',','>//hello
```
- 类型参数 Str 是待处理的字符串， SubStr 是要删除的字符串，都通过 extends 约束为 string 类型
- 通过模式匹配提取 SubStr 之前和之后的字符串到 infer 声明的局部变量 Prefix、Suffix 中
- 如果匹配，那就用 Prefix、Suffix 构造成新的字符串，然后继续递归删除 SubStr。直到不再匹配，也就是没有 SubStr 了

## 函数类型的重新构造
我们可以提取函数的参数类型和返回值类型，当然可以将提取出的类型做修改后再构造出一个新的函数类型。

**AppendArgument**
在已有的函数类型上添加一个参数：
```js
type AppendArgument<Func extends Function, Arg> = Func extends (...args: infer Args) => infer ReturnType ? (...args:[...Args,Arg]) => ReturnType : never;

type result = AppendArgument<(name: string) => boolean,number>//(args_0:string, args_1:number) => boolean;
```
- 类型参数 Func 是待处理的函数类型，通过 extends 约束为 Function，Arg 是要添加的参数类型
- 通过模式匹配提取参数到 infer 声明的局部变量 Args 中，提取返回值到局部变量 ReturnType 中
- 用 Args 数组添加 Arg 构造成新的参数类型，结合 ReturnType 构造成新的函数类型返回

## 索引类型的重新构造
索引类型是聚合多个元素的类型，类似于class,对象等都是索引类型，对它的修改和构造新类型涉及到了映射类型的语法：
```js
type obj = {
  name: string;
  age: number;
  gender: boolean;
}

type Mapping<Obj extends object> = { 
    [Key in keyof Obj]: Obj[Key]
}
```

**Mapping**
映射过程中对value做修改：

```js
type Mapping<Obj extends object> = {
    [Key in keyof Obj]: [Obj[key],Obj[key],Obj[key]]
}

type result = Mapping<{a:1,b:2}>;//{a:[1,1,1],b:[2,2,2]}
```

**UppercaseKey**
对Key做修改，使用as：

```js
type UppercaseKey<Obj extends object> = {
    [Key in keyof Obj as Uppercase<Key & string>] : Obj[Key]
}

type result = UppercaseKey<{a:1,b:2}>//{A:1,B:2}
```

**Record**
TypeScript 提供了内置的高级类型 Record 来创建索引类型

```js
type Record<K extends string | number | symbol, T> = {[P in K]:T}

```
- 指定索引和值的类型分别为 K 和 T，就可以创建一个对应的索引类型

将上面的类型约束修改一下，约束类型参数 Obj 为 key 为 string，值为任意类型的索引类型：
```js
type UppercaseKey<Obj extends Record<string, any>> = {
    [Key in keyof Obj as Uppercase<Key & string>] : Obj[Key]
}

type result = UppercaseKey<{a:1,b:2}>//{A:1,B:2}
```

**ToReadonly**
索引类型的索引可以添加 readonly 的修饰符，代表只读，实现给索引类型添加readonly修饰符：

```js
type ToReadonly<T> = {
    readonly [Key in keyof T]: T[Key];
}
```
- 通过映射类型构造了新的索引类型，给索引加上了 readonly 的修饰，其余的保持不变

同理，也可以用相同的方式给索引类型加可选修饰符：
```js
type ToPartial<T> = {
    [Key in keyof T]?: T[Key]
}
```

**ToMutable**
给索引类型去掉只读修饰符：
```js
type ToMutable<T> = {
    -readonly [Key in keyof T]: T[Key]
}
```

同理，去掉可选修饰符：
```js
type ToRequired<T> = {
    [Key in keyof T]-?: T[Key]
}
```

**FilterByValueType**
在构造新索引类型的时候根据值的类型做过滤：
```js
type FilterByValueType<Obj extends Record<string,any>, ValueType> = {
    [Key in keyof Obj as Obj[Key] extends ValueType ? Key : never] : Obj[Key];
}

interface Person{
    name: string;
    age: number;
    hobby: string[];
}

type result = FilterByValueType<Person, string | number> // {name:string; age: number;}
```
- 类型参数 Obj 为要处理的索引类型，通过 extends 约束为索引为 string，值为任意类型的索引类型 Record<string, any>
- 类型参数 ValueType 为要过滤出的值的类型
- 构造新的索引类型，索引为 Obj 的索引，也就是 Key in keyof Obj，但要做一些变换，也就是 as 之后的部分
- 如果原来索引的值 Obj[Key] 是 ValueType 类型，索引依然为之前的索引 Key，否则索引设置为 never，never 的索引会在生成新的索引类型时被去掉
- 值保持不变，依然为原来索引的值，也就是 Obj[Key]