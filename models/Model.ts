
export abstract class Model<T> {
    update(props: Partial<T>) {
        Object.assign(this, props);
        return this;
    }
}
