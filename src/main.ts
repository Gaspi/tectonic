import './style.css'

import { TectonicSolverInterface } from './solverInterface.ts'

var editor_interface: TectonicSolverInterface;
window.onload = function() {
  editor_interface = new TectonicSolverInterface();
  get('tectonic')
}
