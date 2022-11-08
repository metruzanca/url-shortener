<script lang="ts">
  let url = ''

  async function handleClick() {
    const res = await fetch(`/api/shorten/`, { method: 'POST', body: JSON.stringify({ url }) })
    const data = await res.json()
    console.log(data);
  }
</script>

<main class="h-full w-full flex justify-center items-center">
  <div>
    <h1 class="text-8xl my-4">Shorten</h1>
    <div class="text-2xl">
      <input class="bg-slate-400 text-black" type="text" bind:value={url}>
      <button on:click={handleClick} class="bg-green-300 rounded-md px-2 py-1 text-black">Shortr</button>
    </div>
  </div>
</main>
