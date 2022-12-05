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

  execute() : string {
    this.commands.forEach(command => {
      const instructions = command.split(",").map(c => parseInt(c));
      const move = instructions[0];
      const fromStack = instructions[1] - 1;
      const toStack = instructions[2] - 1;
      for (let i = 0; i < move; i++) {
        const fromValue = this.stacks[fromStack].pop();
        if (fromValue === undefined) {
          throw "we removed too much from a stack!";
        }
        this.stacks[toStack].push(fromValue);        
      }
    });

    return this.stacks.map(s => s.pop()).join("");
  }

  execute2() : string {
    this.commands.forEach(command => {
      const instructions = command.split(",").map(c => parseInt(c));
      const move = instructions[0];
      const fromStackIndex = instructions[1] - 1;
      const toStackIndex = instructions[2] - 1;

      console.log(`fromStackINdex ${fromStackIndex}`);
      const fromStack = this.stacks[fromStackIndex];
      console.log(fromStack);
      const crates = fromStack.splice(fromStack.length - move, fromStack.length);
      //console.log(crates);
      this.stacks[toStackIndex].push(...crates);
    });

    return this.stacks.map(s => s.pop()).join("");
  }
}


if (import.meta.main) {
  const text = await Deno.readTextFile("./data.txt");
  const sim = Simulation.Create(text);

  const result1 = sim.execute();

  console.log(`part1: ${result1}`);

  const sim2 = Simulation.Create(text);

  const result2 = sim2.execute2();

  console.log(`part2: ${result2}`);
}
