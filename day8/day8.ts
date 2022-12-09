export class Tree {
  public isTopVisible = true;
  public isBottomVisible = true;
  public isLeftVisible = true;
  public isRightVisible = true;

  public viewUpScore = 0;
  public viewDownScore = 0;
  public viewLeftScore = 0;
  public viewRightScore = 0;

  constructor(public height: number) {
  }

  isVisible(): boolean {
    return this.isBottomVisible ||
      this.isTopVisible ||
      this.isLeftVisible ||
      this.isRightVisible;
  }

  viewScore(): number {
    return this.viewDownScore *
      this.viewUpScore *
      this.viewRightScore *
      this.viewLeftScore;
  }
}

export class Point {
  constructor(public x: number, public y: number) {}
}

export class Forest {
  constructor(public trees: Tree[][]) {  }

  static loadForest(text: string): Forest {
    const lines = text.trim().split('\n').map(line => line.trim());
    const trees = lines
      .map(line => [...line]
        .map(height => new Tree(parseInt(height))));
    return new Forest(trees);
  }

  width(): number {
    return this.trees[0].length;
  }

  height(): number {
    return this.trees.length;
  }

  treeVisibleAt(x: number, y: number): boolean {
    return this.treeAtPoint({x,y}).isVisible();
  }

  treeScoreAt(x: number, y: number): number {
    return this.treeAtPoint({x,y}).viewScore();
  }

  private treeAtPoint(point: Point): Tree {
    return this.trees[point.y][point.x];
  }

  private pointOnEdge(point: Point): boolean {
    return point.x === 0 ||
      point.y === 0 ||
      point.x === this.width() - 1 ||
      point.y === this.height() - 1;
  }

  determineTreeVisibility(): void {
    const width = this.width();
    const height = this.height();
    const leftToRight = this.rangeOfPoints(width, height);
    this.compareTrees(leftToRight,
      (tree, visible) => tree.isLeftVisible = visible,
      (tree, row, point) => {
          tree.viewRightScore = this.scoreView(row.slice(point.x + 1), tree.height);
      });
    const rightToLeft = leftToRight.reverse().map(row => row.reverse());
    this.compareTrees(rightToLeft,
      (tree, visible) => tree.isRightVisible = visible,
      (tree, row, point) => {
          tree.viewLeftScore = this.scoreView(row.slice(this.width() - point.x), tree.height);

      });
    const topToBottom = this.rangeOfPoints(height, width).map(row => row.map(p => new Point(p.y, p.x)));
    this.compareTrees(topToBottom,
      (tree, visible) => tree.isTopVisible = visible,
      (tree, row, point) => {
        tree.viewDownScore = this.scoreView(row.slice(point.y + 1), tree.height);
      });
    const bottomToTop = topToBottom.reverse().map(row => row.reverse());
    this.compareTrees(bottomToTop, 
      (tree, visible) => tree.isBottomVisible = visible,
      (tree, row, point) => {
        tree.viewUpScore = this.scoreView(row.slice(this.height() - point.y), tree.height);
      });
  }

  private scoreView(pointsToEdge: Point[], ourHeight: number): number {
    const index = pointsToEdge.findIndex(p => this.treeAtPoint(p).height >= ourHeight);
    if (index === -1) {
      return pointsToEdge.length;
    }
    return index + 1;
  }

  private compareTrees(rows: Point[][], tallestCallBack: (tree: Tree, isTallest: boolean) => void,
    treeViewScoreCallback: (tree: Tree, row: Point[], point: Point) => void) {
    rows.forEach(row => {
      let tallestTreeInRow = -1;
      row.forEach(point => {
        const tree = this.treeAtPoint(point);
        if (!this.pointOnEdge(point)) {
          treeViewScoreCallback(tree, row, point);
        }
        if (tree.height > tallestTreeInRow) {
          tallestCallBack(tree, true);
          tallestTreeInRow = tree.height;
        } else {
          tallestCallBack(tree, false);
        }
      });
    });
  }

  private rangeOfPoints(xEnd: number, yEnd: number) : Point[][] {
    const array = [];
    for (let y = 0; y < yEnd; y++) {
      const row = [];
      for (let x = 0; x < xEnd; x++) {
        row.push({x, y});
      }
      array.push(row);
    }
    return array;
  }
}

if (import.meta.main) {
  const text = await Deno.readTextFile("./data.txt");
  const forest = Forest.loadForest(text);
  forest.determineTreeVisibility();
  const part1 = forest.trees.flat().filter(t => t.isVisible()).length;
  console.log(`part1 ${part1}`);

  const part2 = forest.trees.flat().map(t => t.viewScore()).reduce((bestView, currentView) => {
    return bestView > currentView ? bestView : currentView;
  }, 0);  
  console.log(`part 2: ${part2}`);
}
