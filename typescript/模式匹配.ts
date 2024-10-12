type GetParameters<Func extends Function> = Func extends (...args: infer Args) => unknown ? Args : never;

type result = GetParameters<(name: string, age: number) => string>;

