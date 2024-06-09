function nextPage() {
    const userInput = document.getElementById('userInput').value;
    localStorage.setItem('userWord', userInput);
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';
    document.getElementById('displayWord').innerText = userInput;
}
