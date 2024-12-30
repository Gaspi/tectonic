class Cell {
  constructor(i: int, j, clue=null) {
    this.i = i;
    this.j = j;
    this.group = group;
    this.clue = clue;
  }
}

class Cell {
}

// An empty Tectonic game
class Tectonic {
  constructor(height, width, groups, clues) {
    const grid = arr(height, (i) => arr(width, (j) => new Cell(i,j)))
    groups.forEach(function (row,i[i], groups[i][j])));
    const groups = [];

    clues.forEach((clue) => grid[clue.x][clue.y].value = clue.v);
    this.grid = grid;
    this.groups = groups;
  }
}
