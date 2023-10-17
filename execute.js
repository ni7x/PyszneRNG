scrollToBottom = (currentHeight, callback) => {
    const bottomElement = document.querySelector('footer._28xnwl[data-qa="footer"]');

    if (bottomElement) {
        bottomElement.scrollIntoView();
        if (typeof callback === 'function') {
            callback();
        }
    } else {
        currentHeight += 350;
        window.scrollTo(0, currentHeight);
        setTimeout(() => scrollToBottom(currentHeight, callback), 40);
    }
}

(() => {
    scrollToBottom(0, () => {
        var elements = document.getElementsByClassName('_2ro375');
        console.log(elements);
        console.log(elements.length);
    });
})();