import { shallowEqual } from 'shallow-equal-object';

export abstract class ValueObjectBase<T> {
  protected readonly value: T;
  private PATTERN: RegExp;

  constructor(value: T) {
    this.value = Object.freeze(value);
  }

  public equals(vo?: ValueObjectBase<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.value === undefined) {
      return false;
    }

    // Ensure type safety when using shallowEqual
    return shallowEqual(this.value as object, vo.value as object) === true;
  }

  public get getValue(): T {
    return this.value;
  }

  isValid(value: T): boolean {
    return this.PATTERN.test(value as unknown as string);
  }

  setPattern(newPattern: RegExp): void {
    this.PATTERN = newPattern;
  }
}
