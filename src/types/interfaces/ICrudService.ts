export interface ICrudService<T> {
    getAll(params: any): Promise<T[]>;
    getById(id: number): Promise<T>;
    create(data: T): Promise<number>;
    updateById(data: T): Promise<void>;
    deleteById(id: number): Promise<void>;
}