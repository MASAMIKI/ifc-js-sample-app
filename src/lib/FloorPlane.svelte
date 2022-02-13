<script lang="ts">
  import {getContext} from 'svelte';
  import {key as sceneKey, SceneContext} from './ifc';
  import {Table, Button, Modal, Dialog, SnackbarContainer} from 'attractions';

  const {
    getViewer,
  } = getContext<SceneContext>(sceneKey);

  let modalOpen = false;
  const headers = [{text: 'Floors', value: 'floor'}];
  let items = [];

  const onClick = async (showSnackbar: (data: any) => void) => {
    const viewer = getViewer();
    const models = viewer.context.items.ifcModels;
    if (models.length === 0) {
      showSnackbar({props: {text: 'There are no models'}});
      return;
    }

    // it use first model
    const firstModel = models[0];
    await viewer.plans.computeAllPlanViews(firstModel.modelID);
    const planes = viewer.plans.planLists[firstModel.modelID];
    items = planes ? Object.keys(planes).map((plane) => {
      return {floor: plane};
    }) : [];
    modalOpen = true;
  };

  const onItemClick = async (item: any) => {
    const viewer = getViewer();
    const models = viewer.context.items.ifcModels;
    if (models.length === 0) return;

    // it use first model
    const firstModel = models[0];
    await viewer.plans.goTo(firstModel.modelID, String(item), true);
    viewer.context.items.ifcModels.forEach(
        (model) => viewer.edges.toggle(`${model.modelID}`));
    viewer.shadowDropper.shadows[0].root.visible = false;
    viewer.filler.fills[0].visible = false;
  };

  const handleKeydown = (event) => {
    const viewer = getViewer();
    if (event.code === 'Escape') {
      viewer.plans.exitPlanView(true);
      viewer.edges.toggle('0');
      viewer.shadowDropper.shadows[0].root.visible = true;
      viewer.filler.fills[0].visible = true;
    }
  };
</script>

<svelte:window on:keydown={handleKeydown}/>
<SnackbarContainer let:showSnackbar>
    <Button outline on:click={() => onClick(showSnackbar)}>Floors</Button>
    <Modal bind:open={modalOpen} let:closeCallback>
        <Dialog title="Select a floor you want to show" {closeCallback}>
            {#if items.length > 0}
                <div style="height: 55vh; overflow: scroll;">
                    <Table {headers} {items}>
                        <svelte:fragment slot="item" let:item let:header>
                            <p on:click={() => onItemClick(item[header.value])}>{item[header.value]}</p>
                        </svelte:fragment>
                    </Table>
                </div>
            {:else}
                <p>There are no floors</p>
            {/if}
        </Dialog>
    </Modal>
</SnackbarContainer>
