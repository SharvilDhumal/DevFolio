class CursorEffect {
    constructor() {
        this.cursor = document.querySelector('.cursor-ripple');
        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.speed = 0.1;

        this.init();
    }

    init() {
        // Mouse move handler
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // Create ripple effect
            this.cursor.style.width = '50px';
            this.cursor.style.height = '50px';
            this.cursor.style.opacity = '1';

            // Reset size after animation
            setTimeout(() => {
                this.cursor.style.width = '20px';
                this.cursor.style.height = '20px';
                this.cursor.style.opacity = '0.4';
            }, 150);
        });

        // Animation loop
        this.animate();
    }

    animate() {
        // Smooth cursor movement
        this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

        this.cursor.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor effect
document.addEventListener('DOMContentLoaded', () => {
    new CursorEffect();
}); 