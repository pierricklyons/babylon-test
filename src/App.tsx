// import React from "react";
// import {BasicScene} from "./babylon-components/BasicScene"
// import {StandardMaterialScene} from "./babylon-components/StandardMaterialScene"
import {ModelScene} from "./babylon-components/ModelScene"
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "./App.css";

const scene = new ModelScene()

export default () => (
	scene.createScene()
);