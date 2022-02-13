<script lang="ts">
  import {onMount, onDestroy, setContext} from 'svelte';
  import {Card} from 'attractions';
  import {key as sceneKey, SceneContext, IFCInfo} from './ifc';
  import {IfcViewerAPI} from 'web-ifc-viewer';

  let canvasWidth: number;
  let canvasHeight: number;
  let container: HTMLDivElement;
  export let width = '100%';
  export let height = '80vh';

  setContext<SceneContext>(sceneKey, {
    getViewer: () => viewer,
    getIfcInfoList: () => ifcInfoLIst,
    pushIfcInfoList: (ifcInfo: IFCInfo) => ifcInfoLIst.push(ifcInfo),
    removeIfcInfoList: (ifcInfo: IFCInfo) => {
      ifcInfoLIst = ifcInfoLIst.filter((item) => item !== ifcInfo);
    },
    clearIfcInfoList: () => ifcInfoLIst.splice(0),
  });

  let viewer: IfcViewerAPI;
  let ifcInfoLIst: IFCInfo[] = [];

  onMount(() => {
    // create the Three.js scene
    // Three.jsのシーン作成
    viewer = new IfcViewerAPI({container: container});

    // add the axes helper
    // AxesHelperの追加
    viewer.addAxes();
  });

  onDestroy(() => {
    if (!isReadyThreeCanvas()) return;

    const scene = viewer.context.getScene();
    scene.remove();
  });

  // check initialization of the canvas
  // canvasの初期化の確認
  const isReadyThreeCanvas = (): boolean => {
    return !!viewer;
  };

  // update the camera setting for change of the canvas size
  // canvasのサイズが変更された時にカメラの更新をする
  const onResizeCanvas = () => {
    if (!isReadyThreeCanvas()) return;
    const renderer = viewer.context.getRenderer();
    const camera = viewer.context.getIfcCamera().perspectiveCamera;

    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasWidth, canvasHeight);
  };

  // event handler of changing size of the canvas
  // canvasのサイズが変わった際のイベントハンドラー
  $: canvasWidth, onResizeCanvas();
  $: canvasHeight, onResizeCanvas();
</script>


<Card outline tight style="width: {width}; height: {height};">
    {#if $$slots.leftSidebar}
        <Card outline class="m-10" style="position: absolute; z-index: 2;">
            <slot name="leftSidebar" />
        </Card>
    {/if}
    {#if $$slots.rightSidebar}
        <Card outline class="m-10" style="position: absolute; z-index: 2; right: 8px">
            <slot name="rightSidebar" />
        </Card>
    {/if}
    <div bind:this={container} class="three-canvas-container" bind:clientWidth={canvasWidth} bind:clientHeight={canvasHeight} />
</Card>

<style>
.three-canvas-container {
    width: 100%;
    height: 100%;
}
</style>