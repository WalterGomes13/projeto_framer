const bubbleContainer = document.querySelector('.bubble-container');
const bubbles = [];
const MAX_BUBBLES = 200;

function createBubble() {
    if (bubbles.length >= MAX_BUBBLES) return; 

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    bubble.style.left = `${Math.random() * window.innerWidth}px`;
    bubble.style.top = `${Math.random() * window.innerHeight}px`;

    bubbleContainer.appendChild(bubble);
    
    bubbles.push({
        element: bubble,
        x: parseFloat(bubble.style.left),
        y: parseFloat(bubble.style.top),
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
    });
}

function updateBubbles(mouseX, mouseY) {
    bubbles.forEach((bubble, index) => {
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;
        
        if (bubble.x > window.innerWidth || bubble.x < 0 || bubble.y > window.innerHeight || bubble.y < 0) {
            bubble.element.remove();
            bubbles.splice(index, 1);
            return;
        }
        
        bubble.element.style.left = `${bubble.x}px`;
        bubble.element.style.top = `${bubble.y}px`;
        
        const distX = mouseX - bubble.x;
        const distY = mouseY - bubble.y;
        const distance = Math.sqrt(distX ** 2 + distY ** 2);
        
        if (distance < 100) {
            bubble.dx = (distX / distance) * 0.5;
            bubble.dy = (distY / distance) * 0.5;
        }
    });
}

function animate() {
    const mouseX = window.mouseX || 0;
    const mouseY = window.mouseY || 0;
    updateBubbles(mouseX, mouseY);
    requestAnimationFrame(animate);
}

setInterval(createBubble, 500);

document.addEventListener('mousemove', (e) => {
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;
});

animate();

document.addEventListener('DOMContentLoaded', function() {
    const texts = [
        "The Thelist waitlist is for those who want early access to our upcoming Framer template. By joining the waitlist, you'll be notified as soon as the template is released and may even receive exclusive benefits like launch discounts.",
        "Thelist is a versatile and feature-packed Framer template designed to elevate your design workflow. Whether you're crafting a stunning portfolio website or building a captivating landing page.",
        "We're putting the final polish on Thelist, and we're thrilled to share it with you soon! While we don't have a confirmed release date just yet, joining the waitlist ensures you'll be the first to know the moment it's available.",
        "There are several perks to joining Thelist waitlist:<br><br>" +
        "<strong>Early Access:</strong> Be among the first to unlock the full potential of Thelist and start creating amazing designs.<br><br>" +
        "<strong>Exclusive Updates:</strong> Stay informed about the launch date and receive exclusive updates, including sneak peeks of Thelist in development.<br><br>" +
        "<strong>Launch Perks (Optional):</strong> Depending on our launch strategy, you might gain access to launch discounts or other special offers for being an early supporter.",
        "Thelist will have a free version available! This will allow you to experience the core functionalities of the template and get a feel for its potential. However, to unlock the full range of features and customization options, you'll have the opportunity to upgrade to a premium version. By joining the waitlist, you'll be among the first to know about the free and premium features, allowing you to decide which option best suits your needs.",
        "Once you join Thelist waitlist, you'll receive a confirmation email and become part of our exclusive list. We'll keep you updated on the launch date, any special offers, and exciting news about Thelist. Get ready to unleash your creative potential with this innovative Framer template!"
    ];

    function formatText(text) {
        return text.replace(/\n/g, '<br>');
    }

    const faqItems = document.querySelectorAll('.faqItems');

    faqItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const faqQuestParag = this.querySelector('.faqQuestParag');
            if (faqQuestParag) {
                const pTag = faqQuestParag.querySelector('p');
                if (pTag) {
                    faqQuestParag.classList.toggle('expanded');

                    if (faqQuestParag.classList.contains('expanded')) {
                        pTag.innerHTML = formatText(texts[index]); 
                    } else {
                        pTag.innerHTML = '';
                    }
                }
            }
        });
    });
});

