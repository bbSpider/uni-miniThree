<template>
<!-- 画布 -->
<canvas type="webgl" id="webgl" style='width:100%;height:250px;background-color:rgb(255, 255, 255,1); margin: aotu 0;'>
</canvas>
				
</template>


<!-- 只能在微信小程序端运行 -->
<script>

	// 引入文件夹
	import {
		createScopedThreejs
	} from '../../wxcomponents/miniprogram_npm/threejs-miniprogram'

	// 引入文件
	import {
		registerGLTFLoader
	} from '../../wxcomponents/loaders/gltf-loader'


	let app = getApp();

	let canvaWidth = 0; //画布宽
	let canvaHeight = 0; //画布高
	let canvas, THREE; //3d相关
	
	let camera, scene, renderer, model; //定义变量： 摄像机(camera) 场景(scene) 渲染器(renderer) 模型(model)
	let pagestatus = 0; //函数返回
	

	export default {

		data() {
			return {

			}
		},
		onLoad() {

		},
		onReady() {

			//在小程序使用
			// #ifndef   APP||H5 
			//获取webgl
			uni.createSelectorQuery().select('#webgl').node().exec((res) => {
				canvas = res[0].node;
				THREE = createScopedThreejs(canvas);

				canvaWidth = 600;
				canvaHeight = 400;
				this.initCanva(canvas);
			})
			// #endif 

		},
		methods: {

			/**
			 * 3d 初始化
			 * @param {*} canvas 
			 */
			initCanva: function(canvas) {
				let that = this;
				registerGLTFLoader(THREE);
				//scene
				scene = new THREE.Scene();

				//设置相机
				camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.25, 100);
				camera.position.set(- 5, 3, 10);
				camera.lookAt(new THREE.Vector3(0, 2, 0));
				scene = new THREE.Scene();

				// 设置光照
				var light = new THREE.HemisphereLight(0xffffff, 0x444444);
				light.position.set(0, 20, 0);
				scene.add(light);
				light = new THREE.DirectionalLight(0xffffff);
				light.position.set(0, 20, 10);
				scene.add(light);



				// 导入3d模型  
				let loader = new THREE.GLTFLoader(); //badminton.zip 
				loader.load('https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb', function(gltf) {

						model = gltf.scene;
						scene.add(model);
					
					},
					function() {
						return pagestatus;
					},
					undefined,
					function(e) {
						console.error("加载模型出错：", e);
					});


				//render 渲染
				renderer = new THREE.WebGLRenderer({
					antialias: true
				});
				renderer.setPixelRatio(2);
				renderer.setSize(canvas.width, canvas.height);

				that.animate();//动画
			},

			// 动画
			animate: function() {
				let that = this;
					if (renderer !== null && scene !== null && camera !== null) {
						
						canvas.requestAnimationFrame(that.animate);
						renderer.render(scene, camera);
					}
			},

		}
	}
</script>


<style>

</style>

