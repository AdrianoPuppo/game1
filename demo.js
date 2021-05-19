var demo = {
    scene: "Espilit",
    incremental: false,
    binary: true,
    doNotUseCDN: false,
    collisions: true,
    offline: false,
    onload: function() {
        scene.autoClear = true;
        scene.getMeshByName("Sol loin").useVertexColors = false;
        scene.gravity.scaleInPlace(0.5);
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogDensity = 0.1;
        scene.fogColor = new BABYLON.Color3(0, 0, 0);

        var camera = scene.activeCamera;
        var cameraBox = BABYLON.Mesh.CreateBox("CameraBox", .5, scene);
        cameraBox.isVisible = false;
        cameraBox.position = new BABYLON.Vector3(0, 0, 0);
        cameraBox.parent = camera;

        // Load the sound and play it automatically once ready
        var footsteps = new BABYLON.Sound("Footsteps", "./build/assets/sfx_footsteps.wav", scene, null, {
            loop: true,
            autoplay: true,
            volume: .5
        });

        //let ambientVolume = 0;
        let ambientMusic = new BABYLON.Sound("ambientMusic", "./build/assets/amb_BG.ogg", scene, null, { loop: true, autoplay: true, spatialSound: false, volume: .5 });   
        

        var gl = new BABYLON.GlowLayer("glow", scene, {
            mainTextureSamples: 4
        });
        gl.customEmissiveColorSelector = function(mesh, subMesh, material, result) {
            if (mesh.name === "Bandes lum") {
                result.set(1, 1, 1, 1);
            } else {
                result.set(0, 0, 0, 0);
            }
        }

        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
        var VRHelper = scene.createDefaultVRExperience({ createDeviceOrientationCamera: false });
        VRHelper.enableTeleportation({ floorMeshName: "Sols" });

        scene.onKeyboardObservable.add((kbInfo) => {
            console.log(kbInfo.type);
            if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
                if (kbInfo.event.key === 'ArrowUp' || kbInfo.event.keyCode == 87) {
                    footsteps.setVolume(1);
                    console.log("KEY DOWN: ", kbInfo.event.key);
                    console.log('Player Position X:', camera.position.x.toFixed(2), 'Y:', camera.position.y.toFixed(2), 'Z:', camera.position.z.toFixed(2));
                }
            } else if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYUP) {
                if (kbInfo.event.key === 'ArrowUp' || kbInfo.event.keyCode == 87) {
                    footsteps.setVolume(0);
                    console.log("KEY UP: ", kbInfo.event.key);
                }
            }

        });

        //sample trigger sounds....
        let triggerSounds = [];
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/sfx_Transition_01.wav", x: 12.21, y: 4.60, z: 6.22 }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/sfx_Stairs_02.wav", x: 11.82, y: 3.31, z: 3.29 }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/sfx_Brisa.wav", x: 3.60, y: 4.77, z: 12.36 }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/vo_ohh.wav", x: 2.31, z: -1.06 }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/vo_uh.wav", x: 6.74, z: 6.54 }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/vo_oh.wav", x: -0.30, z: 4.49 }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/vo_findframe.wav", x: 11.74, z: 10.73 }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/vo_uhh.wav", x: -6.06, y: 4.77, z: 10.14 }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/vo_uhhh.wav", x: 9.16, y: 4.77, z: 13.88 }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/vo_Wrongway_01.wav", x: -5.77, z: 10.37 }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/vo_Wrongway_02.wav", x: -3.91, y: 4.77, z: 12.57 }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/vo_welcome.wav", x: -8.68, z: 8.17 }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/sfx_Birds.wav", x: -4.46, z: 3.59, spatialSound: true, rolloffFactor: 2, polyphony: false }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/vo_WellDone.wav", x: 12.76, z: -0.27 }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/sfx_Door.wav", x: -11.14, z: 4.18, spatialSound: true, rolloffFactor: 2, polyphony: false }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/sfx_Transition_02.wav", x: 7.75, z: 11.88, spatialSound: true, rolloffFactor: 2, polyphony: false }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/sfx_Bumerang.wav", x: -1.50, z: 6.05, spatialSound: true, rolloffFactor: 2, polyphony: false }));
        triggerSounds.push(new OneShotCollisionSound({ file: "./build/assets/sfx_Drink.wav", x: 11.82, y: 4.77, z: 11.89, spatialSound: true, rolloffFactor: 2, polyphony: false }));

        
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var crosshair = new BABYLON.GUI.Image("crosshair", "./build/assets/crosshairWhite.png");
        crosshair.width = "40px";
        crosshair.height = "40px";
        advancedTexture.addControl(crosshair);
        var textInfo = new BABYLON.GUI.TextBlock();
        textInfo.color = "white";
        textInfo.fontSize = 16;
        textInfo.height = "30px";
        textInfo.top = "100px";
        advancedTexture.addControl(textInfo);

        scene.audioPositioningRefreshRate = 100;


        function vecToLocal(vector, mesh) {
            var m = mesh.getWorldMatrix();
            var v = BABYLON.Vector3.TransformCoordinates(vector, m);
            return v;
        }

        let meshInCrosshair = '';

        function castRay() {
            var origin = camera.position;
            var forward = new BABYLON.Vector3(0, 0, 1);
            forward = vecToLocal(forward, camera);
            var direction = forward.subtract(origin);
            direction = BABYLON.Vector3.Normalize(direction);
            var length = 10;
            var ray = new BABYLON.Ray(origin, direction, length);
            var hit = scene.pickWithRay(ray);
            if (hit.pickedMesh) {
                console.log(hit.pickedMesh.name);
                meshInCrosshair = hit.pickedMesh.name;
            }
        }

        scene.onBeforeRenderObservable.add(() => {
            textInfo.text = "Player's position X:" + (camera.position.x).toFixed(2) + " Y:" + (camera.position.y).toFixed(2) + " Z:" + (camera.position.z).toFixed(2) + "\nPicked Mesh: " + meshInCrosshair;
            castRay();
            if (cameraBox) {
                triggerSounds.forEach(oneShot => {
                    if (cameraBox.intersectsMesh(oneShot.box, false)) {
                        oneShot.play();
                    } else
                        oneShot.canPlay = true;
                });
            }
        });

    }
};
