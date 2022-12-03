export function lastOfIntersectStrings(a: string, b: string): string {
    const arraryResult = [...a].filter(c => [...b].includes(c));
    return arraryResult.pop() ?? "";
}

export function lastOfIntersectThreeStrings(a: string, b: string, c: string) : string {
  const arraryResult = [...a].filter(char => [...b].includes(char));
  return arraryResult.filter(char => [...c].includes(char)).pop() ?? "";
}

export function splitStringInHalf(val: string) : { firstSegment: string, secondSegment: string} {
  const totalLength = val.length;
  if (totalLength % 2 !== 0) {
    throw `total length was odd of string ${val}!`;
  }

  const halfLength = totalLength / 2;
  return { firstSegment: val.slice(0, halfLength), secondSegment: val.slice(halfLength, totalLength)};
}

export function charValue(char: string) : number {
  if (char.length !== 1)
    throw `${char} is not a single character`;

  if (char >= "a" && char <= "z") {
    return char.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }
  return char.charCodeAt(0) - "A".charCodeAt(0) + 26 + 1;
}

if (import.meta.main) {
  const text = await Deno.readTextFile("./data.txt");
  const rugsacks = text.trim().split("\n").map(s => s.trim());
  const sum = rugsacks
    .map(s => splitStringInHalf(s))
    .map(pair => lastOfIntersectStrings(pair.firstSegment, pair.secondSegment))
    .map(intersectedChar => charValue(intersectedChar))
    .reduce((a, b) => a + b);
  
  console.log(`part 1: ${sum}`);

  const groupsOf3Rugsacks : string[][] = [];
  let currentGroupOf3 : string[] = [];
  rugsacks.forEach((rugsack, index) => {
    currentGroupOf3.push(rugsack);
    if (index % 3 === 2) {
      groupsOf3Rugsacks.push([...currentGroupOf3]);
      currentGroupOf3 = [];
    }
  });
  const sum2 = groupsOf3Rugsacks
    .map(s => lastOfIntersectThreeStrings(s[0], s[1], s[2]))
    .map(char => charValue(char))
    .reduce((a, b) => a + b);

  console.log(`part 2: ${sum2}`);
}
