<script lang="ts">
  import {onMount} from 'svelte';
  import {Card} from 'attractions';
  import {
    AmbientLight,
    AxesHelper,
    DirectionalLight,
    GridHelper, Material,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
  } from 'three';
  import {
    OrbitControls,
  } from 'three/examples/jsm/controls/OrbitControls';

  let canvasWidth: number;
  let canvasHeight: number;
  let canvas: HTMLCanvasElement;
  export let width = '100%';
  export let height = '80vh';

  let scene: Scene;
  let camera: PerspectiveCamera;
  let renderer: WebGLRenderer;

  onMount(() => {
    // create the Three.js scene
    // Three.jsのシーン作成
    scene = new Scene();

    // creates the camera
    // カメラ（ユーザーの視点）の作成
    camera = new PerspectiveCamera(75, canvasWidth / canvasHeight);
    camera.position.z = 15;
    camera.position.y = 13;
    camera.position.x = 8;

    // define the color of light
    // ライトの色を設定
    const lightColor = 0xffffff;

    // create the ambientLight（環境光の作成）
    const ambientLight = new AmbientLight(lightColor, 0.5);
    scene.add(ambientLight);

    // create the directional light
    // 指向性ライトの作成
    const directionalLight = new DirectionalLight(lightColor, 1);
    directionalLight.position.set(0, 10, 0);
    directionalLight.target.position.set(-5, 0, 0);
    scene.add(directionalLight);
    scene.add(directionalLight.target);

    // create the renderer
    // レンダラの作成
    renderer = new WebGLRenderer({
      canvas,
      alpha: true,
    });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // create the grid
    // グリッドの生成
    const grid = new GridHelper(50, 30);
    scene.add(grid);

    // add the axes helper
    // AxesHelperの追加
    const axes = new AxesHelper();
    (axes.material as Material).depthTest = false;
    axes.renderOrder = 1;
    scene.add(axes);

    // create the orbit controls
    // オービットコントロール（シーンをナビゲートするためのもの）の作成
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.target.set(-2, 0, 0);

    // set animation loop
    // アニメーションループ
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  });

  // check initialization of the canvas
  // canvasの初期化の確認
  const isReadyThreeCanvas = (): boolean => {
    return !!scene && !!camera && !!renderer;
  };

  // update the camera setting for change of the canvas size
  // canvasのサイズが変更された時にカメラの更新をする
  const onResizeCanvas = () => {
    if (!isReadyThreeCanvas()) return;

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
    <div class="three-canvas-container" bind:clientWidth={canvasWidth} bind:clientHeight={canvasHeight} >
        <canvas bind:this={canvas} id="three-canvas"></canvas>
    </div>
</Card>

<style>
.three-canvas-container {
    width: 100%;
    height: 100%;
}
</style>