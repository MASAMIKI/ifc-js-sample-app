<script lang="ts">
  import Viewer from './lib/Viewer.svelte';
  import {Divider} from 'attractions';
</script>

<main>
  <h1>IFC.js Example on Svelte</h1>
  <Divider text="Example" style="margin-bottom: 20px"/>
  <Viewer />
</main>

<style>
  #three-canvas {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
  }

  #file-input {
    z-index: 1;
    position: absolute;
  }
</style>
