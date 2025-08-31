// Floating Bubbles Background System
class BubbleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.bubbles = [];
        this.mouse = { x: 0, y: 0 };
        this.maxBubbles = 8;
        this.bubbleSizeRange = { min: 40, max: 120 };
        this.speedRange = { min: 0.5, max: 1.5 };
        
        this.init();
        this.bindEvents();
        this.animate();
    }

    init() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'bubble-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.6;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resizeCanvas();
        
        // Create initial bubbles
        this.createInitialBubbles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createInitialBubbles() {
        for (let i = 0; i < this.maxBubbles; i++) {
            this.createBubble();
        }
    }

    createBubble() {
        const size = Math.random() * (this.bubbleSizeRange.max - this.bubbleSizeRange.min) + this.bubbleSizeRange.min;
        const speed = Math.random() * (this.speedRange.max - this.speedRange.min) + this.speedRange.min;
        
        // Random starting position (off-screen)
        const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        let x, y;
        
        switch (side) {
            case 0: // top
                x = Math.random() * this.canvas.width;
                y = -size;
                break;
            case 1: // right
                x = this.canvas.width + size;
                y = Math.random() * this.canvas.height;
                break;
            case 2: // bottom
                x = Math.random() * this.canvas.width;
                y = this.canvas.height + size;
                break;
            case 3: // left
                x = -size;
                y = Math.random() * this.canvas.height;
                break;
        }
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        // Random color with transparency
        const colors = [
            'rgba(99, 102, 241, 0.1)',   // primary
            'rgba(139, 92, 246, 0.1)',   // secondary
            'rgba(6, 182, 212, 0.1)',    // accent
            'rgba(129, 140, 248, 0.1)',  // primary dark
            'rgba(167, 139, 250, 0.1)',  // secondary dark
            'rgba(34, 211, 238, 0.1)'    // accent dark
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const bubble = {
            x, y, size, vx, vy, color,
            originalSize: size,
            pulsePhase: Math.random() * Math.PI * 2
        };
        
        this.bubbles.push(bubble);
    }

    bindEvents() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Handle theme changes for color updates
        const observer = new MutationObserver(() => {
            this.updateBubbleColors();
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    updateBubbleColors() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        this.bubbles.forEach(bubble => {
            // Update colors based on theme
            if (isDark) {
                bubble.color = bubble.color.replace('0.1)', '0.15)');
            } else {
                bubble.color = bubble.color.replace('0.15)', '0.1)');
            }
        });
    }

    updateBubbles() {
        // Update bubble positions
        this.bubbles.forEach(bubble => {
            bubble.x += bubble.vx;
            bubble.y += bubble.vy;
            
            // Add subtle pulsing effect
            bubble.pulsePhase += 0.02;
            bubble.size = bubble.originalSize + Math.sin(bubble.pulsePhase) * 5;
            
            // Check if bubble is off-screen
            if (this.isOffScreen(bubble)) {
                this.removeBubble(bubble);
                this.createBubble();
            }
        });
        
        // Handle collisions
        this.handleCollisions();
        
        // Handle cursor interaction
        this.handleCursorInteraction();
    }

    isOffScreen(bubble) {
        const margin = bubble.size * 2;
        return bubble.x < -margin || 
               bubble.x > this.canvas.width + margin || 
               bubble.y < -margin || 
               bubble.y > this.canvas.height + margin;
    }

    removeBubble(bubble) {
        const index = this.bubbles.indexOf(bubble);
        if (index > -1) {
            this.bubbles.splice(index, 1);
        }
    }

    handleCollisions() {
        for (let i = 0; i < this.bubbles.length; i++) {
            for (let j = i + 1; j < this.bubbles.length; j++) {
                const bubble1 = this.bubbles[i];
                const bubble2 = this.bubbles[j];
                
                const dx = bubble2.x - bubble1.x;
                const dy = bubble2.y - bubble1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < (bubble1.size + bubble2.size)) {
                    // Collision detected - bounce off each other
                    this.bounceBubbles(bubble1, bubble2);
                }
            }
        }
    }

    bounceBubbles(bubble1, bubble2) {
        // Calculate collision normal
        const dx = bubble2.x - bubble1.x;
        const dy = bubble2.y - bubble1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance === 0) return;
        
        const nx = dx / distance;
        const ny = dy / distance;
        
        // Calculate relative velocity
        const relativeVelocityX = bubble2.vx - bubble1.vx;
        const relativeVelocityY = bubble2.vy - bubble1.vy;
        
        // Calculate velocity along normal
        const velocityAlongNormal = relativeVelocityX * nx + relativeVelocityY * ny;
        
        // Don't resolve if velocities are separating
        if (velocityAlongNormal > 0) return;
        
        // Calculate restitution (bounciness)
        const restitution = 0.8;
        
        // Calculate impulse
        const impulse = -(1 + restitution) * velocityAlongNormal;
        
        // Apply impulse
        bubble1.vx -= impulse * nx;
        bubble1.vy -= impulse * ny;
        bubble2.vx += impulse * nx;
        bubble2.vy += impulse * ny;
        
        // Separate bubbles to prevent sticking
        const overlap = (bubble1.size + bubble2.size) - distance;
        const separationX = nx * overlap * 0.5;
        const separationY = ny * overlap * 0.5;
        
        bubble1.x -= separationX;
        bubble1.y -= separationY;
        bubble2.x += separationX;
        bubble2.y += separationY;
    }

    handleCursorInteraction() {
        this.bubbles.forEach(bubble => {
            const dx = this.mouse.x - bubble.x;
            const dy = this.mouse.y - bubble.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const interactionRadius = bubble.size * 3;
            
            if (distance < interactionRadius) {
                // Push bubble away from cursor
                const force = (interactionRadius - distance) / interactionRadius;
                const pushX = (dx / distance) * force * 0.5;
                const pushY = (dy / distance) * force * 0.5;
                
                bubble.vx -= pushX;
                bubble.vy -= pushY;
                
                // Add some visual feedback
                bubble.size = bubble.originalSize + Math.sin(Date.now() * 0.01) * 10;
            }
        });
    }

    drawBubbles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.bubbles.forEach(bubble => {
            // Draw bubble
            this.ctx.beginPath();
            this.ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
            this.ctx.fillStyle = bubble.color;
            this.ctx.fill();
            
            // Draw subtle border
            this.ctx.strokeStyle = bubble.color.replace('0.1)', '0.3)').replace('0.15)', '0.4)');
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            
            // Draw inner highlight
            this.ctx.beginPath();
            this.ctx.arc(bubble.x - bubble.size * 0.3, bubble.y - bubble.size * 0.3, bubble.size * 0.3, 0, Math.PI * 2);
            this.ctx.fillStyle = bubble.color.replace('0.1)', '0.2)').replace('0.15)', '0.3)');
            this.ctx.fill();
        });
    }

    animate() {
        this.updateBubbles();
        this.drawBubbles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize bubble system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BubbleSystem();
});
