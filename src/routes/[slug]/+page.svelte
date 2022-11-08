<script lang="ts">
    import { browser } from "$app/environment";
  import type { PageData } from "./$types";


  export let data: PageData;

  if (browser && data.url) {
    window.location.href = data.url
  }
</script>


<h1>Should redirect</h1>

{data.url}