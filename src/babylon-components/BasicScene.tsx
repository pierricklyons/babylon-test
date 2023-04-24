import SceneComponent from "./SceneComponent"; // import SceneComponent
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Mesh, Scene } from "@babylonjs/core";

export class BasicScene {
	box : Mesh | undefined;
	ball : Mesh | undefined;

	private onSceneReady = (scene : Scene) => {
		// This creates and positions a free camera (non-mesh)
		const camera = new FreeCamera("camera1", new Vector3(0, 10, -10), scene);
	
		// This targets the camera to scene origin
		camera.setTarget(Vector3.Zero());
	
		const canvas = scene.getEngine().getRenderingCanvas();
	
		// This attaches the camera to the canvas
		camera.attachControl(canvas, true);
	
		// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
		const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
		// Default intensity is 1. Let's dim the light a small amount
		light.intensity = .7;
	
		// Our built-in 'box' shape.
		this.box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
		// Move the box upward 1/2 its height
		this.box.position.y = 1;
	
		this.ball = MeshBuilder.CreateSphere("ball", {diameter: 2}, scene);
		this.ball.position.y = 3.5;
	
		// Our built-in 'ground' shape.
		MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
	};
	
	/**
	 * Will run on every frame render.  We are spinning the box on y-axis.
	 */
	private onRender = (scene : Scene) => {
		if (this.box !== undefined) {
			const deltaTimeInMillis = scene.getEngine().getDeltaTime();
	
			const rpm = 10;
			this.box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
		}
	};

	public createScene = () => {
		return <div><SceneComponent antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id="my-canvas" /></div>
	}

}