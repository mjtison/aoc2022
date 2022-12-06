export interface IMoveInPlaceStrategy {
  move(from : string[], to: string[], amount: number) : void;
} 

export class PopAndPushStrategy implements IMoveInPlaceStrategy {
  move(from: string[],to: string[],amount: number): void {
    for (let i = 0; i < amount; i++) {
      const fromValue = from.pop();
      if (fromValue === undefined) {
        throw "we removed too much from a stack!";
      }
      to.push(fromValue);        
    }
  }
}

export class SpliceAndPushStrategy implements IMoveInPlaceStrategy {
  move(from: string[],to: string[],amount: number): void {
      const crates = from.splice(from.length - amount, from.length);
      to.push(...crates);
  }
}

export class Simulation {
  constructor(public stacks: string[][], public commands: string[]) {
  }

  static Create(stringState: string) : Simulation {
    const lines = stringState.split("\n").map(s => s.trim());

    const splitLineIndex = lines.findIndex(l => l.length === 0);
    const stacks = lines.splice(0, splitLineIndex)
      .map(line => [...line].reverse());
    const commands = lines.splice(1, lines.length);
    return new Simulation(stacks, commands);
  }

  execute(moveStrategy : IMoveInPlaceStrategy) : string {
    this.commands.forEach(command => {
      const instructions = command.split(",").map(c => parseInt(c));
      const move = instructions[0];
      const fromStack = instructions[1] - 1;
      const toStack = instructions[2] - 1;
      moveStrategy.move(this.stacks[fromStack], this.stacks[toStack], move);
    });

    return this.stacks.map(s => s.pop()).join("");
  }
}


if (import.meta.main) {
  const text = await Deno.readTextFile("./data.txt");
  const sim = Simulation.Create(text);

  const result1 = sim.execute(new PopAndPushStrategy());

  console.log(`part1: ${result1}`);

  const sim2 = Simulation.Create(text);

  const result2 = sim2.execute(new SpliceAndPushStrategy());

  console.log(`part2: ${result2}`);
}
