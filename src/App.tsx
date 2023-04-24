// import React from "react";
// import {BasicScene} from "./babylon-components/BasicScene"
// import {StandardMaterialScene} from "./babylon-components/StandardMaterialScene"
import {PBRMaterialScene} from "./babylon-components/PBRMaterialScene"
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "./App.css";

const scene = new PBRMaterialScene()

export default () => (
	scene.createScene()
);