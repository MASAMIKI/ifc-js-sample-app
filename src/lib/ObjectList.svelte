<script lang="ts">
  import {getContext} from 'svelte';
  import {key as sceneKey, SceneContext} from './ifc';
  import {Modal, Dialog, Button} from 'attractions';
  import {JSONTree} from './json-tree';
  import {
    IFCSPACE,
    IFCOPENINGELEMENT,
    IFCWALLSTANDARDCASE,
    IFCWALL,
    IFCSTAIR,
    IFCCOLUMN,
    IFCSLAB,
    IFCROOF,
  } from 'web-ifc';
  // you can use more categories which you want to watch

  const {
    getViewer,
  } = getContext<SceneContext>(sceneKey);

  let modalOpen = false;
  let value = {};

  const onClick = async () => {
    value = {};
    const viewer = getViewer();
    const models = viewer.context.items.ifcModels;
    if (models.length === 0) return;

    /*eslint-disable */
    for (const ifcModel of viewer.context.items.ifcModels) {
      const modelID = ifcModel.modelID;
      value[modelID] = {};
      value[modelID]['wallsStandard'] =
        await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCWALLSTANDARDCASE, false);
      value[modelID]['walls'] =
        await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCWALL, false);
      value[modelID]['stairs'] =
        await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCSTAIR, false);
      value[modelID]['columns'] =
        await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCCOLUMN, false);
      value[modelID]['roofs'] =
        await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCROOF, false);
      value[modelID]['slabs'] =
        await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCSLAB, false);
      value[modelID]['space'] =
        await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCSPACE, false);
      value[modelID]['openingElement'] =
        await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, IFCOPENINGELEMENT, false);
    }
    /* eslint-enable */

    modalOpen = true;
  };
</script>

<Button outline on:click={onClick}>Objects</Button>
<Modal bind:open={modalOpen} let:closeCallback>
    <Dialog title="Objects" {closeCallback}>
        <div style="height: 55vh; overflow: scroll;">
            <JSONTree {value}/>
        </div>
    </Dialog>
</Modal>
