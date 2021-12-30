
        
        var scene = new THREE.Scene(); 

        var camera = new THREE.PerspectiveCamera(25,window.innerWidth/window.innerHeight,0.1,12000)
        camera.position.z = 100;
        
        var renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor("#e5e5e5");
        renderer.setSize(window.innerWidth,window.innerHeight);

        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth,window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;

            camera.updateProjectionMatrix();
        })
//test7
        
        var geometry = new THREE.BoxGeometry(100, 100, 100);
        var material = new THREE.MeshLambertMaterial({color: 0x000000});
        var mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);

       


        var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
        light.position.set(0,0,0);
        scene.add(light);

        var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
        light.position.set(0,0,25);
        scene.add(light);

        // add a text
        let text1 = new THREE.Group(); // placeholder till the font loads
        //let font = new FontFace('Baumans', 'url(https://fonts.gstatic.com/s/baumans/v10/-W_-XJj9QyTd3Qfpd_04aw.woff2)');
        //font.load().then(font => {
            //document.fonts.add(font);
        (function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const text_string = 'It starts with you';
            const draw_font = 'bold 256px Helvetica';
            const padding = 16;

            // measure the text and size the canvas to fit it
            ctx.font = draw_font;
            const metrics = ctx.measureText(text_string);
            const text_size = new THREE.Vector2();
            new THREE.Box2(
                new THREE.Vector2(metrics.actualBoundingBoxLeft - padding, -metrics.fontBoundingBoxDescent - padding),
                new THREE.Vector2(metrics.actualBoundingBoxRight + padding, metrics.fontBoundingBoxAscent + padding)
            ).getSize(text_size);
            console.log(text_size);
            canvas.width = Math.ceil(text_size.x);
            canvas.height = Math.ceil(text_size.y);
            // draw the texture on canvas
            ctx.fillStyle = '#000000';
            ctx.font = draw_font;
            ctx.fillText(text_string, 0, text_size.y - metrics.fontBoundingBoxDescent - padding);
            // ctx.strokeStyle = '#ffffff';
            // ctx.strokeRect(0, 0, text_size.x, text_size.y);

            // now slap it on a plane 🛫
            text1 = new THREE.Mesh(
                //new THREE.PlaneGeometry(1, 1, 1, 1),
                new THREE.PlaneGeometry(text_size.x * 1.0, text_size.y * 1.0, 1, 1),
                new THREE.MeshBasicMaterial({
                    transparent: true,
                    map: new THREE.Texture(canvas),
                    side: THREE.DoubleSide,
                })
            );
            text1.material.map.needsUpdate = true;
            text1.position.set(-1000, 900, 1100);
            text1.rotateX(Math.PI);
            scene.add(text1);
            console.log(text1);
        })();

        var render = function() {
            requestAnimationFrame(render);


            renderer.render(scene, camera);
        }
         // add a text
         let text2 = new THREE.Group(); // placeholder till the font loads
         //let font = new FontFace('Baumans', 'url(https://fonts.gstatic.com/s/baumans/v10/-W_-XJj9QyTd3Qfpd_04aw.woff2)');
         //font.load().then(font => {
             //document.fonts.add(font);
         (function() {
             const canvas = document.createElement('canvas');
             const ctx = canvas.getContext('2d');
 
             const text_string = 'carbondotink';
             const draw_font = 'bold 250px Helvetica';
             const padding = 16;
 
             // measure the text and size the canvas to fit it
             ctx.font = draw_font;
             const metrics = ctx.measureText(text_string);
             const text_size = new THREE.Vector2();
             new THREE.Box2(
                 new THREE.Vector2(metrics.actualBoundingBoxLeft - padding, -metrics.fontBoundingBoxDescent - padding),
                 new THREE.Vector2(metrics.actualBoundingBoxRight + padding, metrics.fontBoundingBoxAscent + padding)
             ).getSize(text_size);
             console.log(text_size);
             canvas.width = Math.ceil(text_size.x);
             canvas.height = Math.ceil(text_size.y);
             // draw the texture on canvas
             ctx.fillStyle = '#000000';
             ctx.font = draw_font;
             ctx.fillText(text_string, 0, text_size.y - metrics.fontBoundingBoxDescent - padding);
             // ctx.strokeStyle = '#ffffff';
             // ctx.strokeRect(0, 0, text_size.x, text_size.y);
 
             // now slap it on a plane 🛫
             text2 = new THREE.Mesh(
                 //new THREE.PlaneGeometry(1, 1, 1, 1),
                 new THREE.PlaneGeometry(text_size.x * 1.0, text_size.y * 1.0, 1, 1),
                 new THREE.MeshBasicMaterial({
                     transparent: true,
                     map: new THREE.Texture(canvas),
                     side: THREE.DoubleSide,
                 })
             );
             text2.material.map.needsUpdate = true;
             text2.position.set(-2000, 2000, 10);
             text2.rotateX(Math.PI);
             scene.add(text2);
             console.log(text2);
         })();
 
         var render = function() {
             requestAnimationFrame(render);
 
 
             renderer.render(scene, camera);
         }


        function onClick(linkToBeOpen) {
            console.log(linkToBeOpen)

            
            TweenMax.to(camera.position, 3, {z:10, ease:Sine.easeInOut, onComplete: function (){
				open(linkToBeOpen)
			}});
           
		}
		
		//Seperate Function to load links inside the page
		function loadSameLink(linkToBeOpen) {
            console.log(linkToBeOpen)
            TweenMax.to(camera.position, 3, {z:10, ease:Sine.easeInOut, onComplete: function (){
				window.location.href = linkToBeOpen
			}});
		}

        function loadPage(event) {
            event.preventDefault();
            TweenMax.to(camera.position, 2, {z:12000, ease:Sine.easeInOut});
          
            
        }
        
 
        function linkListener() {
			// For selecting links, that needed to be opened in sperate page (external links)
            let linkElem = document.querySelectorAll(".a-link");
			// Selects the links thats needed to be opened inside the same page (internal links)
			let internalLinkElem = document.querySelectorAll(".i-link")

            linkElem.forEach((e) => {
                e.addEventListener("click", function() {
					onClick(this.getAttribute("data-href"));
              });
			});
			
			internalLinkElem.forEach((ele) => {
				ele.addEventListener("click", function () {
					loadSameLink(this.getAttribute("data-href"))
				})
			})

          }
		linkListener()
        window.addEventListener('load', loadPage);
        
        
        render();
               