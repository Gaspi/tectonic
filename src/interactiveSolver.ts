
import { Tectonic } from './tectonic.ts'

export class InteractiveSolver {
    tectonic: Tectonic;
    constructor(tectonic: Tectonic) {
      this.tectonic = tectonic;
    }
    getStatus(i:number, j:number):string {
      return "TODO"
    }
    getValue(i:number, j:number):number {
      return 0;
    }
    setValue(i:number, j:number, v:number): void {
      
    }
  }
  