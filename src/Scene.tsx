// import React from "react";
// import {BasicScene} from "./babylon-components/BasicScene"
// import {StandardMaterialScene} from "./babylon-components/StandardMaterialScene"
import {ModelScene} from "./babylon-components/ModelScene"
// import {ModelSceneRefactor} from "./babylon-components/ModelSceneRefactor"
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "./Scene.css";

const scene = new ModelScene()

export default () => (
	scene.createScene()
);