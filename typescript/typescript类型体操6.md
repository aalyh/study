# 递归复用
TypeScript 的高级类型支持类型参数，可以做各种类型运算逻辑，返回新的类型，和函数调用是对应的，自然也支持递归。
TypeScript类型系统不支持循环，但支持递归。当处理数量不固定的类型的时候，可以只处理一个类型，然后递归调用自身处理下一个类型，直到处理完所有类型，达到循环的效果。

## Promise的递归调用

**DeepPromiseValueType**
实现一个提取不确定层数的 Promise 中的 value 类型的高级类型：

```js
type t = Promise<Promise<Promise<Record<string, any>>>>;

type DeepPromiseValueType<P extends Promise<unknown>> = 
    P extends Promise<infer ValueType>
        ? ValueType extends Promise<unknown>
            ? DeepPromiseValueType<ValueType>
            : ValueType
        : never;

type result = DeepPromiseValueType<t>//{[x:string]:any;}

//不约束类型参数必须是Promise
type DeepPromiseValueType2<T> = 
    T extends Promise<infer ValueType> 
        ? DeepPromiseValueType2<ValueType>
        : T;
```
- 类型参数 P 是待处理的 Promise，通过 extends 约束为 Promise 类型，value 类型不确定，设为 unknown
- 每次只处理一个类型的提取，通过模式匹配提取出value类型到infer声明的局部变量中
- 判断ValueType类型是否依然是Promise类型
- 当ValueType类型依然是Promise类型时递归处理
- 结束条件就是 ValueType 不为 Promise 类型，那就处理完了所有的层数，返回这时的 ValueType

## 数组类型的递归

**ReverseArr**
反转长度不确定的数组类型：

```js
type arr = [1,2,3,4,5];

type ReverseArr<Arr extends unknown[]> = Arr extends [infer First, ...infer Rest] ? [...ReverseArr<Rest>, First] : Arr;
```
- 类型参数 Arr 为待处理的数组类型，元素类型不确定，也就是 unknown
- 每次只处理一个元素的提取，放到 infer 声明的局部变量 First 里，剩下的放到 Rest 里
- 用 First 作为最后一个元素构造新数组，其余元素递归的取
- 结束条件就是取完所有的元素，也就是不再满足模式匹配的条件，这时候就返回 Arr

**Includes**
处理从长度不固定的数组中查找某个元素：

```js
type Includes<Arr extends unknown[], FindItem> = 
    Arr extends [infer First, ...infer Rest]
        ? IsEqual<First, FindItem> extends true
            ? true
            : Includes<Rest, FindItem>
        :false;

type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);
```
- 类型参数 Arr 是待查找的数组类型，元素类型任意，也就是 unknown。FindItem 待查找的元素类型
- 每次提取一个元素到 infer 声明的局部变量 First 中，剩余的放到局部变量 Rest
- 判断 First 是否是要查找的元素，也就是和 FindItem 相等，是的话就返回 true，否则继续递归判断下一个元素
- 直到结束条件也就是提取不出下一个元素，这时返回 false
- 相等的判断就是 A 是 B 的子类型并且 B 也是 A 的子类型

**RemoveItem**
删除不确定长度数组中的元素：

```js
type RemoveItem<Arr extends unknown[], Item, Result extends unknown[] = []> = 
    Arr extends [infer First, ...infer Rest]
        ? IsEqual<First, Item> extends true
            ? RemoveItem<Rest, Item, Result>
            : RemoveItem<Rest, Item, [...Rest, First]>
        : Result;

type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);
```
- 类型参数 Arr 是待处理的数组，元素类型任意，也就是 unknown[]。类型参数 Item 为待查找的元素类型。类型参数 Result 是构造出的新数组，默认值是 []
- 通过模式匹配提取数组中的一个元素的类型，如果是 Item 类型的话就删除，也就是不放入构造的新数组，直接返回之前的 Result
- 否则放入构造的新数组，也就是再构造一个新的数组 [...Result, First]
- 直到模式匹配不再满足，也就是处理完了所有的元素，返回这时候的 Result

**BuildArray**
构造类型元素个数不确定的数组：

```js
type BuildArray<Length extends number, Ele = unknown, Arr extends unknown[] = []> = Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>
```
- 类型参数 Length 为数组长度，约束为 number。类型参数 Ele 为元素类型，默认值为 unknown。类型参数 Arr 为构造出的数组，默认值是 []
- 次判断下 Arr 的长度是否到了 Length，是的话就返回 Arr，否则在 Arr 上加一个元素，然后递归构造

## 字符串类型的递归
**ReplaceAll**
任意数量的字符串替换：

```js
type ReplaceAll<Str extends string, From extends string, To extends string> = Str extends `${infer Left}${From}${infer Right}` ? `${Left}${To}${ReplaceAll<Right,From,To>}`:Str;
```
- 类型参数 Str 是待处理的字符串类型，From 是待替换的字符，To 是替换到的字符
- 通过模式匹配提取 From 左右的字符串到 infer 声明的局部变量 Left 和 Right 里
- 用 Left 和 To 构造新的字符串，剩余的 Right 部分继续递归的替换
- 结束条件是不再满足模式匹配，也就是没有要替换的元素，这时就直接返回字符串 Str

**StringToUnion**
将字符串字面量类型的每个字符都提取出来组成联合类型，例如:'hello' -> 'h'|'e'|'l'|'l'|'o'

```js
type StringToUnion<Str extends string> = Str extends `${infer First}${infer Rest}` ? First | StringToUnion<Rest> : never;
```
- 类型参数 Str 为待处理的字符串类型，通过 extends 约束为 string
- 通过模式匹配提取第一个字符到 infer 声明的局部变量 First，其余的字符放到局部变量 Rest
- 用 First 构造联合类型，剩余的元素递归的取

**ReverseStr**
字符串类型反转：
```js
type ReverseStr<Str extends string, Result extends string = ''> = Str extends `${infer First}${infer Rest}` ? ReverseStr<Rest, `${First}${Result}`> : Result;
```
- 类型参数 Str 为待处理的字符串。类型参数 Result 为构造出的字符，默认值是空串
- 通过模式匹配提取第一个字符到 infer 声明的局部变量 First，其余字符放到 Rest
- 用 First 和之前的 Result 构造成新的字符串，把 First 放到前面，因为递归是从左到右处理，那么不断往前插就是把右边的放到了左边，完成了反转的效果
- 直到模式匹配不满足，就处理完了所有的字符

## 对象类型的递归
**DeepReadonly**
给任意层数的索引类型的添加 readonly 修饰：
```js
type obj = {
    a: {
        b: {
            c: {
                f: () => 'dong',
                d: {
                    e: {
                        guang: string
                    }
                }
            }
        }
    }
}

type DeepReadonly<Obj extends Record<string, any>> = {
    readonly [Key in keyof Obj] : 
        Obj[Key] extends object 
            ? Obj[Key] extends Function 
                ? Obj[Key]
                : DeepReadonly<Obj[Key]>
            : Obj[Key]
}
```
- 类型参数 Obj 是待处理的索引类型，约束为 Record<string, any>，也就是索引为 string，值为任意类型的索引类型
- 索引映射自之前的索引，也就是 Key in keyof Obj，只不过加上了 readonly 的修饰
- 值要做下判断，如果是 object 类型并且还是 Function，那么就直接取之前的值 Obj[Key]
- 如果是 object 类型但不是 Function，那就是说也是一个索引类型，就递归处理 DeepReadonly<Obj[Key]>
- 否则，值不是 object 就直接返回之前的值 Obj[Key]