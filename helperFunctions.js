export const startsWithNumber = (s) => {
    return /^\d/.test(s);
};

export const scrollToBottom = (currentHeight) => {
    return new Promise((resolve) => {
        const scrollStep = 350;

        const scroll = () => {
            const bottomElement = document.querySelector('footer._28xnwl[data-qa="footer"]');
            if (bottomElement) {
                resolve();
            } else {
                currentHeight += scrollStep;
                window.scrollTo(0, currentHeight);
                requestAnimationFrame(scroll);
            }
        };

        scroll();
    });
};


export const goUpAndDown = (items, start, i, max) => {
    i = i * 6;
    let lower = start - i > 0 ? start - i : 0;
    let higher = start + i < max - 1 ? start + i : max - 1;

    return new Promise((resolve) => {
        setTimeout(() => {
            items[higher].scrollIntoView({ "behavior": "smooth" });
            resolve();
        }, 1000);
    })
    .then(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                items[lower].scrollIntoView({ "behavior": "smooth" });
                resolve();
            }, 1000);
        });
    });
};

export const goToRandomItem = async (items) => {
    if(items){
        var randomItemNum = Math.floor(Math.random() * items.length);
        await goUpAndDown(items, randomItemNum, 2, items.length);
        items[randomItemNum >= 3 ? randomItemNum - 3 : 0].scrollIntoView({ "behavior": "smooth" });
        items[randomItemNum].style.border = "4px solid red";
    }
}

