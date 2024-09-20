import logo from './logo.svg';
import styles from './App.module.css';
import { onMount, onCleanup } from "solid-js";

import { createSignal, Show } from "solid-js";

import model from './assets/model.json';

const letters = 'abcdefghijklmnopqrstuvwyz';

function Input({setter}) {
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

  function ok() {
	setter(string());
  }

  return (
	<div class={styles.input}>
	  <For each={[...Array(count()).keys()]}>{ (i,_) =>
		<select onChange={e => i==count()-1 && add_letter(e.currentTarget.value)} key={i}>
		  <option></option>
		  <For each={sorted_letters(i).toReversed()}>{ l => <option>{l}</option> }</For>
		</select>
	  }</For>
	  <button onClick={ok}>ok</button>
	</div>
  );
}

function App() {

  const [name, setName] = createSignal('');
  const [project, setProject] = createSignal('');
  const [office, setOffice] = createSignal('');

  const [explain, setExplain] = createSignal(false);

  return (
	<div>
	  <h1>Unpredictive text!</h1>
	  <div>
		<label>What is your name?</label>
		<Input setter={setName} />
	  </div>
	  <Show when={name()}>
		<label>Hi {name()}! What project do you work on?</label>
		<Input setter={setProject} />
	  </Show>
	  <Show when={project()}>
		<label>And from which office do you toil on {project()}?</label>
		<Input setter={setOffice} />
	  </Show>

	  <div class={styles.desc}>
		<button onClick={() => setExplain(!explain())}>huh?</button>
		<Show when={explain()}>
		  <p>Here we use a (tiny) language model to predict which letter you are going to want to write next.</p>
		  <p>And then we make your scroll as far as possible to get to that letter!</p>

		  <p>Note how the order changes dependent on what you already wrote. If you have a consonant, all the vowels are far away.</p>

		  <p>Nearby is <a href="https://www.cs.huji.ac.il/~irush/projects/eviltris.html">Eviltris</a>.</p>

		  <p>Nearby, but not evil is <a href="https://www.inference.org.uk/dasher/DasherSummary2.html">Dasher</a></p>
		</Show>
	  </div>
	</div>
  );
}

export default App;
