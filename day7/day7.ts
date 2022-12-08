import {readLines} from "https://deno.land/std@0.167.0/io/mod.ts";

export class File {
  static fromLine(l: string) : File {
    const [fileSizeString, fileName] = l.split(" ")
    const parsed = +fileSizeString

    return new File(fileName, parsed)
  }

  constructor(public name: string, public size: number, public parent?: Directory) {  
  }

  fileSize() : number {
    return this.size;
  }
}

export class Directory {
  private parent?: Directory;
  public items: Record<string, Directory | File> = {};
  private totalSize = 0;
  constructor(public name: string) {}

  fromLine(l: string) {
    const [_, dirName] = l.split(" ")
    const dir = new Directory(dirName);
    dir.parent = this;
    return dir;
  }

  size() : number {
    return this.totalSize;
  }

  addFileSize(size: number) {
    this.totalSize += size;
    this.parent?.addFileSize(size);
  }

  execute(l: string) : Directory {
    if (l.startsWith('$ cd')) {
      if (l.endsWith('..')) {
        if (this.parent === undefined)
          throw "no parent!";
        return this.parent
      } else {
        const [_, _u, dest] = l.split(" ")
        const dir = this.items[dest];
        if (dir instanceof Directory)
          return dir;
        
        throw `${dest} was not a directory`;
      }
    } else if (l.startsWith('$ ls')) {
      return this
    } else if (l.startsWith('dir')) {
      const dir = this.fromLine(l);
      this.items[dir.name] = dir;
      return this
    } else {
      const file = File.fromLine(l);
      this.items[file.name] = file;
      this.addFileSize(file.fileSize());
      return this
    }
  }

  forEachDirectory(fn: (item: Directory) => void) {
    Object.values(this.items).forEach(i => {
      if (i instanceof Directory) {
        fn(i);
        i.forEachDirectory(fn);
      }
    });
  }
}

/**
 * Directory.excuteInstruction(lineOfText: string) : Directory
 * if lineOfText a file 'number fileName'
 *  push a new file
 */

export async function part1(filename: string) : Promise<number> {
  const allDirs: Directory[] = await loadAllDirs(filename);
  const smallDirs = allDirs.filter(d => d.size() <= 100000);
  const allDirNames = allDirs.map(d => d.name).join(", ");
  console.log(`all dirs ${allDirNames}`);
  const answer = smallDirs.map(d => d.size())
    .reduce((a, b) => a + b);

   console.log(`part 1: ${answer}`);
   return answer;
}

async function loadAllDirs(filename: string) {
  const f = await Deno.open(filename);
  const root = new Directory('/');
  let cwd = root;

  for await(const l of readLines(f)) {
    cwd = cwd.execute(l.trim());
  }
  f.close();

  const allDirs: Directory[] = [root];
  root.forEachDirectory((d) => {
    allDirs.push(d);
  });
  return allDirs;
}

export async function part2(fileName: string) : Promise<number> {
  const allDirs = await loadAllDirs(fileName);

  const totalSize = allDirs[0].size();
  console.log(`total size ${totalSize}`);
  
  const unusedAmount = 70000000 - totalSize;
  console.log(`unused size ${unusedAmount}`);

  const sizeToFree = 30000000 - unusedAmount;
  console.log(`size to free ${sizeToFree}`);

  return allDirs.reduce<Directory>((bestChoice: Directory, currentDirectory: Directory) => {
    const bestChoiceDelta = sizeToFree - bestChoice.size();
    const currentDelta = sizeToFree - currentDirectory.size();
    if (currentDelta > 0) {
      return bestChoice;
    }
    if (currentDelta > bestChoiceDelta) {
      return currentDirectory;
    }
    return bestChoice;
  }, allDirs[0])
  .size();
  //return 0;
}

if (import.meta.main) {  
  const answer = await part1("./testdata/captainc.txt");
  console.log(`part 1: ${answer}`);

  const answer2 = await part2("./testdata/sample2.txt");
  console.log(`part 2: ${answer2}`);
}

