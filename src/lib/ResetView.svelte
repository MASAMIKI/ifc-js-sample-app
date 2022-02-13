<script lang="ts">
  import {getContext} from 'svelte';
  import {key as sceneKey, SceneContext} from './ifc';
  import {Button} from 'attractions';

  const {
    getViewer,
  } = getContext<SceneContext>(sceneKey);

  const onClick = () => {
    const viewer = getViewer();
    viewer.plans.exitPlanView(true);
    viewer.edges.toggle('0');
    viewer.shadowDropper.shadows[0].root.visible = true;
    viewer.filler.fills[0].visible = true;
  };
</script>

<Button outline on:click={onClick}>Reset</Button>
