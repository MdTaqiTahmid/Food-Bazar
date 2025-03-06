class FoodScene {
    constructor() {
        this.container = document.getElementById('food-canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.food = null;
        this.init();
    }

    init() {
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pinkLight = new THREE.PointLight(0xff1493, 2);
        pinkLight.position.set(5, 5, 5);
        this.scene.add(pinkLight);

        const purpleLight = new THREE.PointLight(0x800080, 2);
        purpleLight.position.set(-5, -5, 5);
        this.scene.add(purpleLight);

        this.createBurger();
        this.animate();
        this.setupInteraction();
    }

    createBurger() {
        const group = new THREE.Group();

        // Bottom bun
        const bottomBun = new THREE.Mesh(
            new THREE.CylinderGeometry(1.2, 1, 0.3, 32),
            new THREE.MeshPhongMaterial({ color: 0xffa500, shininess: 100 })
        );
        group.add(bottomBun);

        // Lettuce
        const lettuce = new THREE.Mesh(
            new THREE.TorusGeometry(1.1, 0.1, 16, 100),
            new THREE.MeshPhongMaterial({ color: 0x32cd32, shininess: 100 })
        );
        lettuce.position.y = 0.3;
        group.add(lettuce);

        // Patty
        const patty = new THREE.Mesh(
            new THREE.CylinderGeometry(1.1, 1.1, 0.3, 32),
            new THREE.MeshPhongMaterial({ color: 0x8b4513, shininess: 50 })
        );
        patty.position.y = 0.5;
        group.add(patty);

        // Cheese
        const cheese = new THREE.Mesh(
            new THREE.CylinderGeometry(1.15, 1.15, 0.1, 32),
            new THREE.MeshPhongMaterial({ color: 0xffd700, shininess: 150 })
        );
        cheese.position.y = 0.7;
        group.add(cheese);

        // Top bun
        const topBun = new THREE.Mesh(
            new THREE.CylinderGeometry(1.2, 1.2, 0.5, 32),
            new THREE.MeshPhongMaterial({ color: 0xffa500, shininess: 100 })
        );
        topBun.position.y = 1;
        group.add(topBun);

        this.food = group;
        this.scene.add(group);
    }

    setupInteraction() {
        this.container.addEventListener('mousemove', (event) => {
            const rect = this.container.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / this.container.clientWidth) * 2 - 1;
            const y = -((event.clientY - rect.top) / this.container.clientHeight) * 2 + 1;

            gsap.to(this.food.rotation, {
                x: y * 0.5,
                y: x * 0.5,
                duration: 1
            });
        });
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        if (this.food) {
            this.food.rotation.y += 0.003;
            this.food.position.y = Math.sin(Date.now() * 0.002) * 0.1;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize scene
const foodScene = new FoodScene();

// Button animations
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.05,
            duration: 0.3
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3
        });
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    const container = document.getElementById('food-canvas');
    const camera = foodScene.camera;
    const renderer = foodScene.renderer;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});







let currentSlide = 0;
        const slides = document.querySelector('.slides');
        const totalSlides = document.querySelectorAll('.slide').length;
        const dots = document.querySelectorAll('.bottom-4 button');

        function updateSlider() {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('bg-white', index === currentSlide);
                dot.classList.toggle('bg-white/50', index !== currentSlide);
            });
        }

        function moveSlide(direction) {
            currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
            updateSlider();
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateSlider();
        }

        // Auto-advance slides
        setInterval(() => moveSlide(1), 5000);

        // Initial dot highlight
        updateSlider();  