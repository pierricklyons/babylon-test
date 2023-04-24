import SceneComponent from "./SceneComponent"; // import SceneComponent
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Mesh, Scene, StandardMaterial, Texture, CubeTexture, SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders";

export class ModelScene {
    private initializeScene(scene : Scene) {
		const canvas = scene.getEngine().getRenderingCanvas();
		const camera = new FreeCamera("camera1", new Vector3(0, 10, -10), scene);
		camera.setTarget(Vector3.Zero());
		camera.attachControl(canvas, true);
	
		const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
		light.intensity = 1;
	}

	private createEnvironment(scene : Scene) {
		const environment : CubeTexture | undefined = CubeTexture.CreateFromPrefilteredData("/textures/env/environment.env", scene);
		scene.environmentTexture = environment;
		scene.createDefaultSkybox(environment, true);
	}

	private createCabinet(scene : Scene) {
		SceneLoader.ImportMesh("", "/models/", "cabinet.glb", scene, (meshes) => {console.log("meshes", meshes)});
	}

	private onSceneReady = (scene : Scene) => {
		this.initializeScene(scene)
		this.createEnvironment(scene);
		this.createCabinet(scene);
	};
	
	private onRender = (scene : Scene) => {};

	public createScene = () => {
		return <div><SceneComponent antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id="my-canvas" /></div>
	}

}