// Initialize Three.js for the particle background
const bgAnimation = document.getElementById('bg-animation');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
bgAnimation.appendChild(renderer.domElement);

// Update renderer size when window resizes
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 4000; // Increase particle count for a denser effect
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10; // Spread particles across a larger area
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02, // Adjust particle size
    color: '#64ffda',
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.x += 0.0005; // Adjust rotation speed
    particlesMesh.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add parallax effect to cards
document.querySelectorAll('.skill-card, .project-card, .hobby-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Add this JavaScript for modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('certificate-image');
    const closeBtn = document.getElementsByClassName('modal-close')[0];

    // Get all certificate view buttons
    document.querySelectorAll('.cert-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            modal.style.display = "block";
            // Get the image from the card
            const certCard = this.closest('.certificate-card');
            const certImg = certCard.querySelector('img').src;
            modalImg.src = certImg;
        });
    });

    document.addEventListener('DOMContentLoaded', function () {
        const modal = document.getElementById('certificate-modal');
        const modalImg = document.getElementById('certificate-image');

        document.querySelectorAll('.cert-link').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                modal.style.display = "flex";
                const certCard = this.closest('.certificate-card');
                modalImg.src = certCard.querySelector('img').src;
            });
        });

        // Close modal when clicking outside the image
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.style.display === "flex") {
                modal.style.display = "none";
            }
        });
    });

    // Close modal when clicking outside
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
        }
    });
});

// Animate skill progress bars when they come into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-progress');
        }
    });
}, observerOptions);

document.querySelectorAll('.progress').forEach(progress => {
    observer.observe(progress);
});


document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-links li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove("active"));

            // Add active class to the clicked link
            this.classList.add("active");
        });
    });
});

window.addEventListener("scroll", () => {
    const navbar = document.querySelector("nav");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

const contactSection = document.querySelector("#contact");
const robotIframe = document.querySelector(".robot-container iframe");

contactSection.addEventListener("mousemove", (e) => {
    const rect = contactSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // Horizontal movement
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20; // Vertical movement

    // Apply rotation to the robot iframe
    robotIframe.style.transform = `scale(1.2) rotateX(${y}deg) rotateY(${x}deg)`;
});

contactSection.addEventListener("mouseleave", () => {
    // Reset the robot's position when the mouse leaves the section
    robotIframe.style.transform = "scale(1.2) rotateX(0deg) rotateY(0deg)";
});