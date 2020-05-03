export class NumberInterval {
  constructor(readonly start: number, readonly end: number) {}

  contains(other: NumberInterval): boolean {
    return this.containsValue(other.start) && this.containsValue(other.end);
  }

  containsPartially(other: NumberInterval): boolean {
    return this.containsValue(other.start) || this.containsValue(other.end);
  }

  containsValue(value: number): boolean {
    return this.start <= value && this.end >= value;
  }

  equals(other: NumberInterval): boolean {
    return this.start === other.start && this.end === other.end;
  }

  minus(other: NumberInterval): NumberInterval[] {
    if (other.contains(this)) {
      return [];
    } else if (this.start === other.start && this.end > other.end) {
      // ssss
      // oo
      return [new NumberInterval(other.end + 1, this.end)];
    } else if (this.end === other.end && this.start < other.start) {
      // ssss
      //   oo
      return [new NumberInterval(this.start, other.start - 1)];
    } else if (other.start < this.start && other.end < this.end) {
      //  ssss
      // oo
      return [new NumberInterval(Math.max(other.end + 1, this.start), this.end)];
    } else if (this.start < other.start && this.end > other.end) {
      // ssss
      //  oo
      return [
        new NumberInterval(this.start, other.start - 1),
        new NumberInterval(other.end + 1, this.end)
      ];
    } else if (other.start > this.start && other.end > this.end) {
      // ssss
      //    oo
      return [new NumberInterval(this.start, Math.min(this.end, other.start - 1))];
    } else {
      //      ss
      // oooo
      return [this];
    }
  }

  size(): number {
    return (this.end - this.start) + 1;
  }

  union(other: NumberInterval): NumberInterval {
    return new NumberInterval(Math.min(this.start, other.start), Math.max(this.end, other.end));
  }
}
