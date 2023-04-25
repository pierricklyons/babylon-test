import SceneComponent from "./SceneComponent"; // import SceneComponent
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Mesh, Scene, Engine, StandardMaterial, Texture, CubeTexture, SceneLoader, int, ISceneLoaderAsyncResult, Tools } from "@babylonjs/core";
import "@babylonjs/loaders";

export class ModelSceneRefactor {
	scene : Scene;
	engine : Engine;

	constructor(private canvas : HTMLCanvasElement) {
		this.engine = new Engine(this.canvas, true);
		this.scene = this.initializeScene();
	
		this.engine.runRenderLoop(() => {
			this.scene.render();
		});
	}

    private initializeScene() {
		const scene = new Scene(this.engine);
		
		const camera = new FreeCamera("camera1", new Vector3(0, 4, -12), scene);
		// camera.setTarget(Vector3.Zero());
		camera.attachControl();
		
		this.createEnvironment(scene);

		return scene;
	};

	private createEnvironment(scene : Scene) {
		const environment : CubeTexture | undefined = CubeTexture.CreateFromPrefilteredData("/textures/env/environment.env", scene);
		scene.environmentTexture = environment;
		scene.createDefaultSkybox(environment, true);

		const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
		light.intensity = 1;

		// this.createCabinet(scene, 3);
	};








	cabinet : ISceneLoaderAsyncResult | undefined;

	

	// private createCabinet(scene : Scene, scale : int) {
	// 	SceneLoader.ImportMesh("", "/models/", "cabinet-edit.glb", scene, (meshes) => {
	// 		for (var mesh = 0; mesh < meshes.length; mesh++) {
	// 			meshes[mesh].scaling = new Vector3(scale, scale, scale);
	// }})};

	private async createCabinet(scene : Scene, scale : int) {
		this.cabinet = await SceneLoader.ImportMeshAsync("", "/models/", "cabinet-edit.glb", scene);
		this.cabinet.meshes[0].scaling = new Vector3(scale, scale, scale);
	};
	

	// private onSceneReady = (scene : Scene) => {
	// 	this.initializeScene(scene);
	// 	this.createEnvironment(scene);
	// 	this.createCabinet(scene, 3);
	// };
	
	private onRender = (scene : Scene) => {}


	public createScene = () => {
		return <canvas/>
	};
}