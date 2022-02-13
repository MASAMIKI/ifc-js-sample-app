<script lang="ts">
  import {getContext} from 'svelte';
  import {key as sceneKey, SceneContext} from './ifc';
  import {Modal, Dialog, Button} from 'attractions';
  import {JSONTree} from './json-tree';

  const {
    getViewer,
  } = getContext<SceneContext>(sceneKey);

  let modalOpen = false;
  let value = {};
  let id = 0;
  let modelId = 0;

  const onClick = async () => {
    const viewer = getViewer();
    value = {};
    const models = viewer.context.items.ifcModels;
    if (models.length === 0) return;

    if (viewer.clipper.active) {
      viewer.clipper.createPlane();
    } else {
      const props = await viewer.IFC.getProperties(
          Number(modelId),
          Number(id),
          true,
          false,
      );
      value = JSON.parse(JSON.stringify(props));
    }
    modalOpen = true;
  };
</script>

<div class="mx-5">
    <label for="modelId">ModelID</label>
    <input name="modelId" id="modelId" bind:value={modelId}>
</div>
<div class="mx-5">
    <label for="oId">ID</label>
    <input name="oId" id="oId" bind:value={id}>
</div>
<Button outline on:click={onClick}>Search</Button>
<Modal bind:open={modalOpen} let:closeCallback>
    <Dialog title="Properties" {closeCallback}>
        <div style="height: 55vh; overflow: scroll;">
            <JSONTree {value}/>
        </div>
    </Dialog>
</Modal>
