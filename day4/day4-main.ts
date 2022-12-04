export class Range {
  start: number;
  end: number;

  static Create(rangeAsString: string) : Range {
    const pair = rangeAsString.split("-").map(s => s.trim());
    const start = parseInt(pair[0]);
    const end = parseInt(pair[1]);
    return new Range(start, end);
  }

  constructor(start: number, end: number) {
    if (start > end) {
      throw "bad range";
    }
    this.start = start;
    this.end = end;
  }

  toSet(): Set<number> {
    return new Set([...Array(this.end - this.start + 1).keys()] // + 1 since we include the end number as well!
      .map(i => i + this.start));
  }
}

export function eitherRangeIsSubset(a: Range, b: Range): boolean {
  if (a.start >= b.start && a.end <= b.end) {
    return true;
  }
  if (b.start >= a.start && b.end <= a.end) {
    return true;
  }
  return false;
}

export function intersectRanges(a: Range, b: Range): Set<number> {
  return intersectSets<number>(a.toSet(), b.toSet());
}

function intersectSets<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a].filter(i => b.has(i)));
}

function unionSets<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a, ...b]);
}

if (import.meta.main) {
  const text = await Deno.readTextFile("./data.txt");
  const workPairs = text.trim().split("\n").map(s => s.trim())
    .map(w => w.split(","))
    .map(pair => {
      return {
        range1: Range.Create(pair[0]),
        range2: Range.Create(pair[1])
      }
    });

  const totalPart1 = workPairs
    .reduce((sum, ranges) => {
      if (eitherRangeIsSubset(ranges.range1, ranges.range2)) {
        sum++;
      }
      return sum;
    }, 0);
  console.log(`part 1: ${totalPart1}`);

  const totalPart2 = workPairs
    .reduce((sum, pair) => {
      const currentSet = intersectRanges(pair.range1, pair.range2);
      if (currentSet.size > 0) {
        sum++;
      }
      return sum;
    }, 0);
  console.log(`part 2 ${totalPart2}`);
}
