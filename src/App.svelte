<script lang="ts">
  import Viewer from './lib/Viewer.svelte';
  import IFCInput from './lib/IFCInput.svelte';
  import ResetView from './lib/ResetView.svelte';
  import KeyboardEvent from './lib/KeyboardEvent.svelte';
  import FloorPlane from './lib/FloorPlane.svelte';
  import ObjectProperty from './lib/ObjectProperty.svelte';
  import ObjectList from './lib/ObjectList.svelte';
  import ObjectPropertySearch from './lib/ObjectPropertySearch.svelte';
  import {Divider} from 'attractions';
</script>

<main>
  <h1>IFC.js Example on Svelte</h1>
  <Divider text="Example" style="margin-bottom: 20px"/>
  <Viewer>
    <IFCInput slot="leftSidebar"/>
    <div slot="rightSidebar">
      <KeyboardEvent />
      <ObjectProperty />
      <div class="mb-10">
        <ResetView />
      </div>
      <div class="mt-10">
        <FloorPlane />
      </div>
      <div class="mt-10">
        <ObjectList />
      </div>
      <Divider />
      <div class="mt-10">
        <ObjectPropertySearch />
      </div>
    </div>
  </Viewer>
</main>

<style global>
  .m-10 {
    margin: 10px;
  }
  .mx-5 {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .mt-10 {
    margin-top: 10px;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
</style>
