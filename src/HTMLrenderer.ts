
import { get, mk, wipe } from './utils.ts'

import { Tectonic } from './tectonic.ts';
import { InteractiveSolver } from './interactiveSolver.ts';


export class HTMLRenderer {
  solver: InteractiveSolver;
  tectonic: Tectonic;
  table: HTMLElement;
  cells: HTMLElement[][] = [];
  logs: HTMLElement;

  constructor(solver: InteractiveSolver) {
    this.solver = solver;
    this.tectonic = solver.tectonic;

    this.logs = wipe(get('logs'));
    this.table = wipe(get('tectonic')).appendChild(mk('table', ['pic-table','mx-auto']));
    
    // Populating table
    for (let i = 0; i < this.tectonic.height; i++) {
      const row = this.table.appendChild( mk('tr',['pic-row']) );
      this.cells[i] = [];
      for (let j = 0; j < this.tectonic.width; j++) {
        this.cells[i][j] = row.appendChild( this.initCell(i,j) );
      }
    }
    this.paint();
  }

  initCell(i:number, j:number) {
    const classes = ['pic-cell','clickable'].concat(this.tectonic.getCellBorders(i,j).map((s)=>'border-'+s));
    const dom = mk('td', classes);
    const self = this;
    dom.addEventListener("mouseenter", function () {
      const status = self.solver.getStatus(i,j);
      self.logs.innerHTML = `<h4>Status: ${status.code}</h4>`;
    });
    dom.addEventListener("click"      , (e) => { e.preventDefault(); self.solver.setValue(i,j,1   ); self.paint(); });
    dom.addEventListener("contextmenu", (e) => { e.preventDefault(); self.solver.setValue(i,j,0   ); self.paint(); });
    dom.addEventListener("auxclick"   , (e) => { e.preventDefault(); self.solver.setValue(i,j,null); self.paint();  });
    return dom;
  }


  paint() {
    this.cells.forEach(function(row, i) {
      row.forEach(function(cell,j) {
        const status = self.solver.getStatus(i,j);
        if (self.solver.getValue(i,j) == 1) {
          cell.style.backgroundColor = 'black';
          cell.innerText = "";
        } else if (self.solver.getValue(i,j) == 0) {
          cell.style.backgroundColor = 'white';
          cell.style.color = "black";
          cell.innerText = "-";
        } else if (status.code == 'error') {
          cell.style.backgroundColor = "red";
          cell.innerText = "";
        } else if (status.code == 'black') {
          cell.style.backgroundColor = "rgba(0,0,0,0.9)";
          cell.style.color = "white";
          cell.innerText = "!";
        } else if (status.code == 'white') {
          cell.style.backgroundColor = "rgba(0,0,0,0.1)";
          cell.style.color = "blue";
          cell.innerText = "!";
        } else {
          cell.style.backgroundColor = "rgba(0,0,0,"+ (0.2+0.6*status.score)+")";
          cell.innerText = "";
        }
      });
    });
  }

}

