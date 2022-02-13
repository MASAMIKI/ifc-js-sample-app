<script lang="ts">
  import {getContext} from 'svelte';
  import {FileDropzone} from 'attractions';
  import {key as sceneKey, SceneContext, IFCInfo} from './ifc';

  // viteがweb-ifc-three/IFC/components/IFCModelをresolveできず、exampleから取得
  import {IFCModel} from 'three/examples/jsm/loaders/IFCLoader';
  import type {IfcViewerAPI} from 'web-ifc-viewer';

  const {
    getViewer,
    getIfcInfoList,
    pushIfcInfoList,
    removeIfcInfoList,
  } = getContext<SceneContext>(sceneKey);

  const addIFCModel = (viewer: IfcViewerAPI, file: File, ifcModel: IFCModel) => {
    const scene = viewer.context.getScene();

    scene.add(ifcModel.mesh);
    pushIfcInfoList({file, ifcModel} as IFCInfo);
    setIfcModelToContext(viewer);
  };

  const removeIFCModel = (viewer: IfcViewerAPI, ifcInfoList: IFCInfo[]) => {
    const scene = viewer.context.getScene();

    ifcInfoList.forEach((ifcInfo) => {
      scene.remove(ifcInfo.ifcModel.mesh);
      removeIfcInfoList(ifcInfo);
    });
    setIfcModelToContext(viewer);
  };

  const setIfcModelToContext = (viewer: IfcViewerAPI) => {
    const currentIfcModels = getIfcInfoList().map((ifcInfo) => ifcInfo.ifcModel);
    viewer.context.items.ifcModels = currentIfcModels;
    viewer.context.items.pickableIfcModels = currentIfcModels;
  };

  // sets up the IFC loading
  // IFCの読み込み設定
  const onChange = (value: CustomEvent) => {
    const viewer = getViewer();

    const diffList = getIfcInfoList().filter((ifcInfo) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      return !value.detail.files.includes(ifcInfo.file);
    });

    removeIFCModel(viewer, diffList);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    value.detail.files.forEach((file: File) => {
      if (getIfcInfoList().some((ifcInfo) => ifcInfo.file === file)) return;

      const ifcURL = URL.createObjectURL(file);
      viewer.IFC.loader.load(
          ifcURL,
          (ifcModel) => addIFCModel(viewer, file, ifcModel),
      );
    });
  };

</script>

<FileDropzone accept=".ifc" on:change={onChange}>
    <div slot="empty-layer" style="justify-content: center;">
        <div class="title">
            {#if $$slots.wrongType}
                Incorrect file type
            {:else if $$slots.dragActive}
                Release to upload
            {:else}
                Upload IFC files
            {/if}
        </div>
    </div>
</FileDropzone>

<style global>
.file-dropzone {
    margin: 0 !important;
}
.empty-layer {
    justify-content: center;
}
</style>

