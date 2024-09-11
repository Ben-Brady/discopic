export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type NoInfer<T> = [T][T extends any ? 0 : never];
