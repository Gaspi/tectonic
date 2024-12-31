import { get, mk } from './utils.ts'

import { Tectonic, TectonicSpecification } from './tectonic.ts'
import { InteractiveSolver } from './interactiveSolver.ts'

import { HTMLRenderer } from './HTMLrenderer.ts'
import { createSVG, initSVG } from './SVGrenderer.ts'


export class InteractiveSolverInterface {
  tectonic: Tectonic|null = null;
  solver: InteractiveSolver|null = null;

  clearButton: HTMLInputElement;
  solveButton: HTMLInputElement;
  helpButton: HTMLInputElement;
  renderer: HTMLRenderer|null = null;

  constructor() {
    const req = new XMLHttpRequest();
    req.addEventListener("load", () => JSON.parse(req.response).forEach((s:any)=>this.loadExample(s)));
    req.open("GET", "./examples.json");
    req.send();
  
    this.clearButton = <HTMLInputElement> get('clear');
    this.solveButton = <HTMLInputElement> get('solve');
    this.helpButton  = <HTMLInputElement> get('help' );
  }
  
  load(specs: TectonicSpecification) {
      this.tectonic = new Tectonic(specs);
      this.solver = new InteractiveSolver(this.tectonic);
      this.renderer = new HTMLRenderer(this.solver);
      createSVG();
      initSVG();
      this.clearButton.disabled = false;
      this.solveButton.disabled = false;
      this.helpButton.disabled  = false;
}
    
  // Example loading
  loadExample(specs: TectonicSpecification) {
    const a = get('tectonic-loader').appendChild( mk('li') ).appendChild( mk('a', ['dropdown-item']));
    if (a instanceof HTMLAnchorElement) {
      a.href = "#";
      a.onclick = () => this.load(specs);
      a.innerText = specs.name;
    }
  }

  pasteSpec() {
    navigator.clipboard.readText().then((txt)=> this.load(JSON.parse(txt)));
  }
}
