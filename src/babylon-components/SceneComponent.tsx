import { useEffect, useRef } from "react";
import { Engine, EngineOptions, Scene, SceneOptions, WindowsMotionController } from "@babylonjs/core";

interface SceneProps extends React.HTMLAttributes<HTMLCanvasElement> {
    antialias : boolean, 
    engineOptions ?: EngineOptions, 
    adaptToDeviceRatio ?: boolean, 
    sceneOptions ?: SceneOptions, 
    onRender ?: (scene : Scene) => void, 
    onSceneReady : (scene : Scene) => void
}

export default ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } : SceneProps) => {
    const reactCanvas = useRef(null);

    // set up basic engine and scene
    useEffect(() => {
        const { current: canvas } = reactCanvas;

        if (!canvas) return;

        const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
        const scene = new Scene(engine, sceneOptions);
        if (scene.isReady()) {
            onSceneReady(scene);
        } else {
            scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
        }

        engine.runRenderLoop(() => {
            if (typeof onRender === "function") onRender(scene);
            scene.render();
        });

        const resize = () => {
            scene.getEngine().resize();
        };

        if (window) {
            window.addEventListener("resize", resize);
        }

        return () => {
            scene.getEngine().dispose();

            if (window) {
                window.removeEventListener("resize", resize);
            }
        };
    }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);

    return <canvas ref={reactCanvas} width={window.innerWidth} height={window.innerHeight} {...rest} />;
};