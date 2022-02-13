<script lang="ts">
  import {getContext} from 'svelte';
  import {key as sceneKey, SceneContext} from './ifc';

  const {
    getViewer,
  } = getContext<SceneContext>(sceneKey);

  const handleKeydown = (event: KeyboardEvent) => {
    const viewer = getViewer();

    if (event.code === 'Delete') {
      viewer.removeClippingPlane();
      viewer.dimensions.delete();
    }
  };
</script>

<svelte:window on:keydown={handleKeydown}/>
