<script lang="ts">
  import {getContext} from 'svelte';
  import {key as sceneKey, SceneContext} from './ifc';
  import {Modal, Dialog} from 'attractions';
  import {JSONTree} from './json-tree';

  const {
    getViewer,
  } = getContext<SceneContext>(sceneKey);

  let modalOpen = false;
  let value = {};

  const handleKeydown = (event: KeyboardEvent) => {
    const viewer = getViewer();

    if (event.code === 'Escape') {
      viewer.IFC.selector.unpickIfcItems();
    }
  };

  const handleMousemove = async () => {
    const viewer = getViewer();
    await viewer.IFC.selector.prePickIfcItem();
  };

  const handleDblclick = async () => {
    const viewer = getViewer();
    value = {};
    const models = viewer.context.items.ifcModels;
    if (models.length === 0) return;

    if (viewer.clipper.active) {
      viewer.clipper.createPlane();
    } else {
      const result = await viewer.IFC.selector.pickIfcItem(true);
      if (!result) return;
      const {modelID, id} = result;
      const props = await viewer.IFC.getProperties(modelID, id, true, false);
      value = JSON.parse(JSON.stringify(props));
    }
    modalOpen = true;
  };
</script>

<svelte:window on:keydown={handleKeydown} on:mousemove={handleMousemove} on:dblclick={handleDblclick}/>
<Modal bind:open={modalOpen} let:closeCallback>
    <Dialog title="Properties" {closeCallback}>
        <div style="height: 55vh; overflow: scroll;">
            <JSONTree {value}/>
        </div>
    </Dialog>
</Modal>
