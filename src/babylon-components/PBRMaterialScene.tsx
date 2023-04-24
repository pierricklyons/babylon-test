import SceneComponent from "./SceneComponent"; // import SceneComponent
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Mesh, Scene, StandardMaterial, Texture, CubeTexture } from "@babylonjs/core";

export class PBRMaterialScene {
    private createGroundMaterial(scene : Scene) : StandardMaterial {
        const groundMaterial = new StandardMaterial("groundMaterial", scene);

		const uvScale = 4;
		const textures : Texture[] = []

		const diffuse = new Texture("/textures/stone/stone-diffuse.jpg", scene);
		const normal = new Texture("/textures/stone/stone-normal.jpg", scene);
		const ao = new Texture("/textures/stone/stone-ao.jpg", scene);

		groundMaterial.diffuseTexture = diffuse;
		groundMaterial.bumpTexture = normal;
		groundMaterial.ambientTexture = ao;

		textures.push(diffuse, normal, ao);

		textures.forEach((texture) => {
			texture.uScale = uvScale;
			texture.vScale = uvScale;
		})
		
		return groundMaterial
    }

    private createBallMaterial(scene : Scene) : StandardMaterial {
        const ballMaterial = new StandardMaterial("ballMaterial", scene);

		const uvScale = 2;
		const textures : Texture[] = []

		const diffuse = new Texture("/textures/metal/metal-diffuse.jpg", scene);
		ballMaterial.diffuseTexture = diffuse;

		const normal = new Texture("/textures/metal/metal-normal.jpg", scene);
		ballMaterial.bumpTexture = normal;
		ballMaterial.invertNormalMapX = true;
		ballMaterial.invertNormalMapY = true;

		const ao = new Texture("/textures/metal/metal-ao.jpg", scene);
		ballMaterial.ambientTexture = ao;

		const specular = new Texture("/textures/metal/metal-ao.jpg", scene);
		ballMaterial.specularTexture = specular;

		textures.push(diffuse, normal, ao, specular);

		textures.forEach((texture) => {
			texture.uScale = uvScale;
			texture.vScale = uvScale;
		})
		
		return ballMaterial
    }

	ball : Mesh | undefined;
    ground : Mesh | undefined;
	environment : CubeTexture | undefined;

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
		light.intensity = 1;
	
		this.ground = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
        this.ground.material = this.createGroundMaterial(scene)

        this.ball = MeshBuilder.CreateSphere("ball", {diameter: 2}, scene);
		this.ball.position.y = 1;
		this.ball.material = this.createBallMaterial(scene);

		this.environment = CubeTexture.CreateFromPrefilteredData("/textures/env/environment.env", scene);
		scene.environmentTexture = this.environment;
		scene.createDefaultSkybox(this.environment, true);
		
	};
	
	private onRender = (scene : Scene) => {};

	public createScene = () => {
		return <div><SceneComponent antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id="my-canvas" /></div>
	}

}