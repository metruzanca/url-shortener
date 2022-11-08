import { browser } from "$app/environment";
import { writable } from "svelte/store";

const KEY = 'URLS';


const store = writable([]);

if (browser) {
  const currentValue = JSON.parse(window.localStorage.getItem(KEY) || '[]') || []
  store.set(currentValue)
}

store.subscribe(val => browser && localStorage.setItem(KEY, JSON.stringify(val)));

export default store;