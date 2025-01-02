import './style.css'

import { InteractiveSolverInterface } from './interactiveSolverInterface.ts'

var editor_interface: InteractiveSolverInterface;
window.onload = function() {
  editor_interface = new InteractiveSolverInterface();
  get('tectonic')
}
