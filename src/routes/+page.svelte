<script lang="ts">
  import urlStore from '$lib/urlStore'
  let url = ''

  async function handleClick() {
    const res = await fetch(`/`, { method: 'POST', body: JSON.stringify({ url }) })
    const { slug } = await res.json()
    console.log(slug);
    urlStore.update(s => {
      s.push({
        slug, url,
      })
      return s;
    })
  }
  
  async function copy(url: string) {
    await navigator.clipboard.writeText(url)
  }

</script>

<main class="h-full w-full flex justify-center items-center">
  <div>
    <h1 class="text-8xl my-4">Shorten</h1>
    <div class="text-2xl">
      <input class="bg-slate-400 text-black" type="text" bind:value={url}>
      <button on:click={handleClick}>Shortr</button>
    </div>

    <div class="my-2">
      <h2 class="text-2xl">Your previous Short Links</h2>
      {#each $urlStore as item}
         <div class="flex items-center py-1">
            <button on:click={() => copy(location.href + item.slug)}>Copy</button>
            <a class=" text-blue-400" href="/{item.slug}">{location.href + item.slug}</a>
            <span class="px-2" >{'-->'}</span>
            <a class=" text-blue-400" href="{item.url}">{item.url}</a>
         </div>
      {/each}
    </div>
  </div>
</main>