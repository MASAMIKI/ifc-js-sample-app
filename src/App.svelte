<script lang="ts">
  import Viewer from './lib/Viewer.svelte';
  import IFCInput from './lib/IFCInput.svelte';
  import {Divider} from 'attractions';
</script>

<main>
  <h1>IFC.js Example on Svelte</h1>
  <Divider text="Example" style="margin-bottom: 20px"/>
  <Viewer>
    <IFCInput slot="leftSidebar"/>
  </Viewer>
</main>

<style global>
  .m-10 {
    margin: 10px;
  }
</style>
