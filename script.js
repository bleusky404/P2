function nextPage() {
    const userInput = document.getElementById('userInput').value;
    const displayWord = document.getElementById('displayWord');
    displayWord.innerHTML = ''; // Clear any existing content

    const styles = [
        { x: 6, y: -6, alphaL: 0.125, alphaU: 0.25 },
        { x: 3, y: -3, alphaL: 0.25, alphaU: 0.5 },
        { x: 0, y: 0, alphaL: 0.5, alphaU: 1 }
    ];

    styles.forEach(style => {
        const h1 = document.createElement('h1');
        h1.style.setProperty('--x', style.x);
        h1.style.setProperty('--y', style.y);
        userInput.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.innerText = char;
            span.style.setProperty('--index', index);
            span.style.setProperty('--alpha-l', style.alphaL);
            span.style.setProperty('--alpha-u', style.alphaU);
            h1.appendChild(span);
        });
        displayWord.appendChild(h1);
    });

    // Display page 2 and hide page 1
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'flex';

    console.log(document.getElementById('page2').offsetHeight);

    // Adjust font size to fill the screen
    adjustFontSize();

    // Scroll to the bottom of the page smoothly
    document.getElementById('page2').scrollTop = document.getElementById('page2').scrollHeight;

    // // Show "YOU DROWNED" message after the animation completes
    // setTimeout(() => {
    //     document.getElementById('page2').style.display = 'none';
    //     document.getElementById('page3').style.display = 'flex';
    // }, 10000); // 10 seconds to match the animation duration

    // Show "YOU DROWNED" message after the animation completes
    // setTimeout(() => {
        
    // }, 10000); // 10 seconds to match the animation duration

    let interval = setInterval(()=>{
        // console.log('hello!');
        // console.log(document.getElementById('page2').scrollTop);
        let displayWordEl = document.getElementById('displayWord');

        let wordTop = displayWordEl.getBoundingClientRect().top;
        let wordHeight = displayWordEl.offsetHeight;
        console.log(wordTop - 211);


        let scrollTop = document.getElementById('page2').scrollTop;
        console.log()
        if (scrollTop == 0){
            const page3 = document.getElementById('page3');
            const drownedText = 'YOU WIN~~';
            page3.innerHTML = '<h1></h1>';
            const h1 = page3.querySelector('h1');
            drownedText.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.innerText = char;
                span.style.setProperty('--index', index);
                span.style.setProperty('--alpha-l', 0.5);
                span.style.setProperty('--alpha-u', 1);
                // span.style.setProperty('font-size', '10px');
                h1.appendChild(span);
            });

            document.getElementById('page2').style.display = 'none';
            page3.style.display = 'flex';
            clearInterval(interval)

        }
        if (wordTop - 211 < 0){
            const page3 = document.getElementById('page3');
            const drownedText = 'YOU DROWNED (ツ)_/¯';
            page3.innerHTML = '<h1></h1>';
            const h1 = page3.querySelector('h1');
            drownedText.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.innerText = char;
                span.style.setProperty('--index', index);
                span.style.setProperty('--alpha-l', 0.5);
                span.style.setProperty('--alpha-u', 1);
                h1.appendChild(span);
            });

            document.getElementById('page2').style.display = 'none';
            page3.style.display = 'flex';
            clearInterval(interval)
        }
    }, 10)
}



function adjustFontSize() {
    const displayWord = document.getElementById('displayWord');
    let fontSize = 300; // Start with a larger font size
    displayWord.style.fontSize = `${fontSize}px`;

    // Reduce font size until the text fits within the viewport dimensions
    while ((displayWord.scrollWidth > window.innerWidth || displayWord.scrollHeight > window.innerHeight) && fontSize > 0) {
        fontSize -= 5; // Adjust decrement for larger steps
        displayWord.style.fontSize = `${fontSize}px`;
    }

    // Increase font size until it fills the width without overflow
    while (displayWord.scrollWidth < window.innerWidth && fontSize < 1000) {
        fontSize += 1; // Fine-tune for precise fit
        displayWord.style.fontSize = `${fontSize}px`;
    }
}

window.addEventListener('resize', adjustFontSize); // Adjust font size on window resize
