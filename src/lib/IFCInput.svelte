<script lang="ts">
  import {getContext} from 'svelte';
  import {FileDropzone} from 'attractions';
  import {key as sceneKey, SceneContext, IFCInfo} from './IFC';
  import type {Scene} from 'three';

  // viteがweb-ifc-three/IFC/components/IFCModelをresolveできず、exampleから取得
  import {IFCModel} from 'three/examples/jsm/loaders/IFCLoader';

  const {
    getViewer,
    getIfcInfoList,
    pushIfcInfoList,
    removeIfcInfoList,
  } = getContext<SceneContext>(sceneKey);

  const addIFCModel = (scene: Scene, file: File, ifcModel: IFCModel) => {
    scene.add(ifcModel.mesh);
    pushIfcInfoList({file, ifcModel} as IFCInfo);
  };

  const removeIFCModel = (scene: Scene, ifcInfoList: IFCInfo[]) => {
    ifcInfoList.forEach((ifcInfo) => {
      scene.remove(ifcInfo.ifcModel.mesh);
      removeIfcInfoList(ifcInfo);
    });
  };

  // sets up the IFC loading
  // IFCの読み込み設定
  const onChange = (value: CustomEvent) => {
    const viewer = getViewer();
    const scene = viewer.context.getScene();
    const ifcInfoList = getIfcInfoList();

    /*eslint-disable */
    const diffList = ifcInfoList.filter((ifcInfo) => {
      return !value.detail.files.includes(ifcInfo.file)
    });
    /* eslint-enable */

    removeIFCModel(scene, diffList);

    /*eslint-disable */
    value.detail.files.forEach((file: File) => {
      const ifcInfoList = getIfcInfoList();
      if (ifcInfoList.some((ifcInfo) => ifcInfo.file === file)) return;

      const ifcURL = URL.createObjectURL(file);
      viewer.IFC.loader.load(ifcURL, (ifcModel) => addIFCModel(scene, file, ifcModel));
    });
    /* eslint-enable */
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

