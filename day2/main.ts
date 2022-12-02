enum ChoiceEnum {
  Rock,
  Paper,
  Scissors
}

function convertChoice(choice: string) : ChoiceEnum {
  switch (choice) {
    case "A":
    case "X":
        return ChoiceEnum.Rock;
    case "B":
    case "Y":
      return ChoiceEnum.Paper;
    case "C":
    case "Z":
      return ChoiceEnum.Scissors;
    default: throw "Invalid choice!";
  }
}

function scoreChoice(choice: ChoiceEnum) : number {
  switch (choice) {
    case ChoiceEnum.Rock: return 1;
    case ChoiceEnum.Paper: return 2;
    case ChoiceEnum.Scissors: return 3;
    default: throw "Invalid choice!";
  }
}

const rules: ChoiceEnum[][] = [
  [ChoiceEnum.Paper, ChoiceEnum.Rock],
  [ChoiceEnum.Rock, ChoiceEnum.Scissors],
  [ChoiceEnum.Scissors, ChoiceEnum.Paper]
];

function scoreOutcome(them: ChoiceEnum, me: ChoiceEnum): number {
  if (them === me) {
    return 3;
  }

  const theyWon = rules.some(pair => pair[0] === them && pair[1] === me);
  if (theyWon) {
    return 0;
  }
  return 6;
}

export function scoreRound(them: string, me: string) : number {
  const theirChoice = convertChoice(them);
  const myChoice = convertChoice(me);
  return scoreRoundWithChoice(theirChoice, myChoice);
}

function scoreRoundWithChoice(them: ChoiceEnum, me: ChoiceEnum) : number {
  return scoreChoice(me) + scoreOutcome(them, me);
}

function decideChoice(them: ChoiceEnum, outcome: string) : ChoiceEnum {
  if (outcome == "X") {
    // lose!
    const loseChoice = rules.find(pair => pair[0] === them);
    if (loseChoice === undefined) {
      throw "Could not find losing choice";
    }
    return loseChoice[1];
  }
  if (outcome === "Y") {
    // draw
    return them;
  }
  if (outcome === "Z") {
    // win!
    const winChoice = rules.find(pair => pair[1] === them);
    if (winChoice === undefined) {
      throw "Could not find winning choice";
    }
    return winChoice[0];
  }
  throw "Not a valid choice for outcome";
}

export function scoreRoundChoiceOutcome(them: string, outcome: string) : number {
  const theirChoice = convertChoice(them);
  const myChoice = decideChoice(theirChoice, outcome);
  return scoreRoundWithChoice(theirChoice, myChoice);
}

if (import.meta.main) {
  const text = await Deno.readTextFile("./data.txt");
  const rounds = text.trim().split("\n").map(s => s.trim())
    .map(line => line.split(" "))
    .map(pair => { return { them: pair[0], me: pair[1] } });

  const result = rounds
    .map(round => scoreRound(round.them, round.me))
    .reduce((a, b) => a + b);

  console.log(`outcome part 1 ${result}`);

  const result2 = rounds
    .map(round => scoreRoundChoiceOutcome(round.them, round.me))
    .reduce((a, b) => a + b);

  console.log(`outcome part 2 ${result2}`);
}
