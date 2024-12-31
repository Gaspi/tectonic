
export type Cell = {
  i: number;
  j: number;
  group: Group;
}

export type Group = {
  id: number;
  cells: Set<Cell>;
}

export type Clue = {
  i: number;
  j: number;
  v: number;
}

export type TectonicSpecification = {
  name: string;
  grid: number[][];
  clues: Clue[];
}

// An empty but fully defined Tectonic game, ready to be solved
export class Tectonic {
  grid: Cell[][];
  groups: Group[];
  clues: Clue[];
  width: number;
  height: number;

  constructor(spec: TectonicSpecification) {
    const groups: Group[] = []
    this.grid = spec.grid.map((row, i) =>
      row.map( function (group_id, j) {
        if (groups[group_id] == null) {
          groups[group_id] = { id: group_id, cells: new Set<Cell>()};
        }
        const cell = {i, j, group: groups[group_id]};
        groups[group_id].cells.add(cell);
        return cell;
      }));
    this.groups = groups;
    this.clues = spec.clues;
    this.height = this.grid.length;
    this.width = this.grid[0].length;
  }

  getCellBorders(i:number, j:number) {
    const res = [];
    const g = this.grid[i][j];
    if (i ==             0 || g != this.grid[i-1][j]) { res.push('top'   ); }
    if (i == this.height-1 || g != this.grid[i+1][j]) { res.push('bottom'); }
    if (j ==             0 || g != this.grid[i][j-1]) { res.push('left'  ); }
    if (i ==  this.width-1 || g != this.grid[i][j+1]) { res.push('right' ); }
    return res;
  }
}
