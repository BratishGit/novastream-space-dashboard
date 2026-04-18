document.addEventListener('DOMContentLoaded', () => {
    // 1. Live Clock
    const timeDisplay = document.getElementById('current-time');
    
    function updateClock() {
        const now = new Date();
        const timeString = now.toISOString().split('T')[1].split('.')[0] + ' UTC';
        timeDisplay.textContent = timeString;
    }
    
    setInterval(updateClock, 1000);
    updateClock();

    // 2. Data Simulation (Velocity and Distance)
    const velocityEl = document.getElementById('velocity');
    const distanceEl = document.getElementById('distance');
    
    let baseVelocity = 28440;
    let baseDistance = 408000;

    function simulateData() {
        // Random fluctuation
        const vChange = (Math.random() - 0.5) * 10;
        const dChange = Math.random() * 0.5;
        
        baseVelocity += vChange;
        baseDistance += dChange;
        
        velocityEl.textContent = `${Math.floor(baseVelocity).toLocaleString()} km/h`;
        distanceEl.textContent = `${baseDistance.toFixed(2).toLocaleString()} km`;
    }

    setInterval(simulateData, 2000);

    // 3. Simple Canvas Chart (System Health)
    const canvas = document.getElementById('healthChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const radius = 45;
        const centerX = 50;
        const centerY = 50;
        
        function drawChart(percent) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Background track
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 8;
            ctx.stroke();
            
            // Progress arc
            const endAngle = (Math.PI * 2 * (percent / 100)) - (Math.PI / 2);
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle);
            ctx.strokeStyle = '#00f2ff';
            ctx.lineWidth = 8;
            ctx.lineCap = 'round';
            ctx.stroke();
            
            // Glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00f2ff';
            ctx.stroke();
        }
        
        let currentPercent = 0;
        const targetPercent = 98.4;
        
        function animateChart() {
            if (currentPercent < targetPercent) {
                currentPercent += 1;
                drawChart(currentPercent);
                requestAnimationFrame(animateChart);
            } else {
                drawChart(targetPercent);
            }
        }
        
        animateChart();
    }

    // 4. Interaction & Animations
    const cards = document.querySelectorAll('.glass');
    
    // Staggered entry animation
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Planet Interactivity (Simple click effect)
    const planet = document.querySelector('.rotating-planet');
    if (planet) {
        planet.addEventListener('click', () => {
            planet.style.transition = 'transform 0.5s ease-out';
            planet.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                planet.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
        });
    }

    // Console Log Welcome
    console.log('%c NOVASTREAM STATUS: ONLINE ', 'background: #00f2ff; color: #0a0a14; font-weight: bold; padding: 4px;');
});
