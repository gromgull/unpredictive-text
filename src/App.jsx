import logo from './logo.svg';
import styles from './App.module.css';
import { onMount, onCleanup } from "solid-js";

import { createSignal } from "solid-js";

import model from './assets/model.json';

const letters = 'abcdefghijklmnopqrstuvwyz';

function App() {
  const [count, setCount] = createSignal(1);
  const [string, setString] = createSignal('');

  function sorted_letters(i) {
	if (i==0) return model.m1;
	if (i==1) return model.m2[string().charAt(0)];
	return model.m3[string().charAt(i-2)][string().charAt(i-1)];
  }

  function add_letter(l) {
	setString(string().concat(l));
	setCount(count()+1);
  }

  return <div>
	<label>Write something!</label>
    <For each={[...Array(count()).keys()]}>{ (i,_) =>
	  <select onChange={e => i==count()-1 && add_letter(e.currentTarget.value)} key={i}>
		<option></option>
		<For each={sorted_letters(i).toReversed()}>{ l => <option>{l}</option> }</For>
	  </select>
	}</For>
  </div>;
}

export default App;
