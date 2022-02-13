<script lang="ts">
  import {getContext} from 'svelte';
  import {FileDropzone} from 'attractions';
  import {IFCLoader} from 'web-ifc-three/IFCLoader';
  import {key as sceneKey, SceneContext, IFCInfo} from './IFC';
  import type {Scene} from 'three';

  // viteがweb-ifc-three/IFC/components/IFCModelをresolveできず、exampleから取得
  import {IFCModel} from 'three/examples/jsm/loaders/IFCLoader';

  const {
    getScene,
    getIfcInfoList,
    pushIfcInfoList,
    clearIfcInfoList,
  } = getContext<SceneContext>(sceneKey);

  const addIFCModel = (scene: Scene, file: File, ifcModel: IFCModel) => {
    scene.add(ifcModel.mesh);
    pushIfcInfoList({file, ifcModel} as IFCInfo);
  };

  const resetIFCModels = (scene: Scene) => {
    const ifcInfoList = getIfcInfoList();
    ifcInfoList.forEach((ifcInfo) => {
      scene.remove(ifcInfo.ifcModel.mesh);
    });
    clearIfcInfoList();
  };

  // sets up the IFC loading
  // IFCの読み込み設定
  const ifcLoader = new IFCLoader();
  const onChange = (value: CustomEvent) => {
    const scene = getScene();
    resetIFCModels(scene);
    /*eslint-disable */
    value.detail.files.forEach((file: File) => {
      const ifcURL = URL.createObjectURL(file);
      ifcLoader.load(ifcURL, (ifcModel) => addIFCModel(scene, file, ifcModel));
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

