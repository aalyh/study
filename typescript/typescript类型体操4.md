# 模式匹配

TypeScript类型的匹配是通过extends对类型参数作匹配，结果保存到通过infer声明的局部类型变量里，如果匹配则从该局部变量中拿到提取出的类型。后面可以从这个局部变量拿到类型做各种后续处理。

```js
type p = Promise<'guang'>

type GetValueType<P> = P extends Promise<infer Value> ? Value : never;

// 提取的结果
type result = GetValueType<Promise<'guang'>> === 'guang';
```
通过 extends 对传入的类型参数 P 做模式匹配，其中值的类型是需要提取的，通过 infer 声明一个局部变量 Value 来保存，如果匹配，就返回匹配到的 Value，否则就返回 never 代表没匹配到。

类型匹配在其他类型中的应用：
## 数组类型

**提取数组中第一个元素**

```js
type arr = [1,2,3];

type getFirst<Arr extends unknow[]> = Arr extends [infer First, ...unknow[]] ? Frist : never;

type result = getFirst<arr>;//1
```

对 Arr 做模式匹配，把我们要提取的第一个元素的类型放到通过 infer 声明的 First 局部变量里，后面的元素可以是任何类型，用 unknown 接收，然后把局部变量 First 返回。

**提取数组中的最后一个元素**

```js
type arr = [1,2,3];

type getLast<Arr extends unknown[]> = Arr extends [...unknown[],infer Last] ? Last : never;

type result = getLast<arr>//3
```

**提取除尾元素外剩余数组**

```js
type arr = [1,2,3];

type popArr<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [...infer Rest, unknown] ? Rest : never;

type result = popArr<arr>//[1,2]
```

**提取除首元素外剩余数组**

```js
type arr = [1,2,3];

type shiftArr<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [unknown, ...infer Rest] ? Rest : never;
```

## 字符串类型
字符串类型也同样可以做模式匹配，匹配一个模式字符串，把需要提取的部分放到 infer 声明的局部变量里。

**判断是否某个前缀开头**

```js
type StartsWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? true : false;

type result = StartsWith<'hello world','hello'> === true;
```
- 需要声明字符串 Str、匹配的前缀 Prefix 两个类型参数，它们都是 string。
- 用 Str 去匹配一个模式类型，模式类型的前缀是 Prefix，后面是任意的 string，如果匹配返回 true，否则返回 false。

**字符串替换**

```js
type replaceStr<Str extends string, From extends string, To extends string> = Str extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}` : Str;

type result = replaceStr<'hello world ?', '?', '!'> === 'hello world !'
```

- 声明要替换的字符串 Str、待替换的字符串 From、替换成的字符串 3 个类型参数，通过 extends 约束为都是 string 类型。
- 用 Str 去匹配模式串，模式串由 From 和之前之后的字符串构成，把之前之后的字符串放到通过 infer 声明的局部变量 Prefix、Suffix 里。
- 用 Prefix、Suffix 加上替换到的字符串 To 构造成新的字符串类型返回。

**去掉空白字符**

由于不清楚字符串中有多少个空白字符，只能一个个匹配去掉，递归实现。

TrimRight（str+空白字符）：
```js
type TrimStrRight<Str extends string> = Str extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimStrRight<Rest> : str;

type result = TrimStrRight<'hello             '> === 'hello';
```
- 对于str+空白字符类型的字符，将字符串放到infer声明的局部变量中
- 将Rest作为类型参数递归TrimStrRight，直到不匹配为止。

TrimLeft（空白字符+str）：
```js
type TrimStrLeft<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimStrLeft<Rest> : str;
```

将TrimRight 和 TrimLeft 结合就是 Trim：
```js
type TrimStr<Str extends string> = TrimStrRight<TrimStrLeft<str>>
```

## 函数
函数可以利益类型匹配来做提取参数、返回值的类型等

**提取参数类型**
函数类型可以通过模式匹配来提取参数的类型：
```js
type GetParameters<Func extends Function> = Func extends (...args: infer Args) => unknown ? Args : never;

type result = GetParameters<(name: string, age: number) => string>;//[name:string, age:number]
```
- 类型参数 Func 是要匹配的函数类型，通过 extends 约束为 Function
- Func 和模式类型做匹配，参数类型放到用 infer 声明的局部变量 Args 里，返回值可以是任何类型，用 unknown
- 返回提取到的参数类型 Args

**提取返回值类型**
能提取参数类型，同样也可以提取返回值类型：
```js
type GetReturnType<Func extends Function> = Func extends (...args: any[]) => infer ReturnType ? ReturnType : never;

type result = GetReturnType<()=>'hello'>//hello
```
- Func 和模式类型做匹配，提取返回值到通过 infer 声明的局部变量 ReturnType 里返回。
- 参数类型可以是任意类型，也就是 any[] (unknown不可以赋值给别的变量，因此此处使用any)

**提取this指向类型**
关于函数的this指向问题：
- 通过`对象.方法`方式调用时，this指向该对象
- 箭头函数的this指向所处环境的外层执行环境的this
- bind，apply、call指定this指向
- 直接调用函数指向全局对象

如何利用ts检查出this指向是否正确呢？可以在方法声明时指定this的类型。因此我们可以提取this类型：

```js
class Dog{
    name: string;
    constructor() {
        this.name = "dog";
    }
    hello(this: Dog) {
        return 'hello, I\'m ' + this.name;
    }
}
const dog = new Dog();
dog.hello();
dog.hello.call({xxx:1})

type GetThisParameterType<T> = T extends (this: infer ThisType,...args: any[])=>any ? ThisType : unknown;

type result = GetThisParameterType<typeof dog.hello>//Dog
```
- 类型参数 T 是待处理的类型。
- 用 T 匹配一个模式类型，提取 this 的类型到 infer 声明的局部变量 ThisType 中，其余的参数是任意类型，也就是 any，返回值也是任意类型。
- 返回提取到的 ThisType。

## 构造器
构造器和函数的区别是，构造器是用于创建对象的，所以可以被 new，因此与函数同理，可以提取构造器的参数和返回值类型：

**GetInstanceType**
构造器类型可以用 interface 声明，使用 new(): xx 的语法：
```js
interface Person{
    name: string;
}

interface PersonConstructor{
    new(name: string): Person;
}
```

这里的 PersonConstructor 返回的是 Person 类型的实例对象，这个也可以通过模式匹配取出来：

```js
type GetInstanceType<ConstructorType extends new (...args: any) => any> = ConstructorType extends new (...args: any) => infer InstanceType ? InstanceType : any;

type reslut = GetInstanceType<PersonConstructor>;//Person
```
- 类型参数 ConstructorType 是待处理的类型，通过 extends 约束为构造器类型
- 用 ConstructorType 匹配一个模式类型，提取返回的实例类型到 infer 声明的局部变量 InstanceType 里，返回 InstanceType

**GetConstructorParameters**
GetInstanceType 是提取构造器返回值类型，那同样也可以提取构造器的参数类型：

```js
type GetConstructorParameters<ConstructorType extends new (...args: any) => any> = ConstructorType extends new (...args: infer ParametersType) => any ? ParametersType : never;

type result = GetConstructorParameters<PersonConstructor>;//[name: string]
```
- 类型参数 ConstructorType 为待处理的类型，通过 extends 约束为构造器类型
- 用 ConstructorType 匹配一个模式类型，提取参数的部分到 infer 声明的局部变量 ParametersType 里，返回 ParametersType

## 索引类型

索引类型也同样可以用模式匹配提取某个索引的值的类型

**GetRefProps**
通过模式匹配的方式提取 ref 的值的类型：

```js
type GetRefProps<Props> = 'ref' extends keyof Props ? 
    Props extends {ref?: infer Value | undefined} ? Value : never 
:never

type result = GetRefProps<{ref?: 1, name: 'lili'}>//1
```
- 类型参数 Props 为待处理的类型
- 通过 keyof Props 取出 Props 的所有索引构成的联合类型，判断下 ref 是否在其中
- 如果有 ref 这个索引的话，就通过 infer 提取 Value 的类型返回，否则返回 never
