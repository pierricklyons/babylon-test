import React, { useEffect, useRef } from 'react';
import { FreeCamera, Vector3, HemisphericLight, Engine, Scene, CubeTexture, SceneLoader, int, ISceneLoaderAsyncResult, Light, Camera} from '@babylonjs/core';
import "@babylonjs/loaders";

import "./DemoScene.css"

const DemoScene = () => {
	const canvasRef = useRef(null);
	
	useEffect(() => {
		const canvas : HTMLCanvasElement | null = canvasRef.current;
		const engine : Engine = new Engine(canvas, true);

		const createScene = () => {
			const scene : Scene = new Scene(engine);
			const camera : Camera = new FreeCamera("camera1", new Vector3(0, 4, -12), scene);
			camera.attachControl();

			return scene;
		};

		const createEnvironment = () => {
			const environment : CubeTexture | undefined = CubeTexture.CreateFromPrefilteredData("/textures/env/environment.env", scene);
			scene.environmentTexture = environment;
			scene.createDefaultSkybox(environment, true);
			const light : Light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
			light.intensity = 1.5;
		};

		const createCabinet = async (scale : int) => {
			const cabinet : ISceneLoaderAsyncResult = await SceneLoader.ImportMeshAsync("", "/models/", "cabinet.glb", scene);
			cabinet.meshes[0].scaling = new Vector3(scale, scale, scale);
		};

		const scene : Scene = createScene();
		createEnvironment();
		createCabinet(3);
		
		engine.runRenderLoop(() => {
			scene.render();
		});

		return () => {
			scene.dispose();
			engine.dispose();
		};
	}, [canvasRef]);
	
	return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}/>;
};

export default DemoScene;