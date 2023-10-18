//import { startsWithNumber, goToRandomItem, goUpAndDown, scrollToBottom } from "./helperFunctions"; I have no clue how to do it so let it be pasted it is only in 2 files

var openRestaurants = [];

startsWithNumber = (s) => {
    return /^\d/.test(s);
};

scrollToBottom = (currentHeight) => {
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


goUpAndDown = (items, start, i, max) => {
    i = i * 4;
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

goToRandomItem = async (items) => {
    if(items){
        var randomItemNum = Math.floor(Math.random() * items.length);
        for(let i = 2; i>0; i--){
            await goUpAndDown(items, randomItemNum, i, items.length);
        }
        items[randomItemNum >= 3 ? randomItemNum - 3 : 0].scrollIntoView({ "behavior": "smooth" });
        items[randomItemNum].style.border = "4px solid red";
    }
}



getRestaurantList = () => {
    let restaurants = document.getElementsByClassName('_2ro375');
    if(restaurants){
        for (let i = 0; i < restaurants.length; i++) {
            let isOpen = restaurants[i].querySelector('[data-qa="shipping-time-indicator-content"]');
            let name = restaurants[i].querySelector("[data-qa]");
    
            if (startsWithNumber(isOpen.textContent)) {
                if (name) {
                    openRestaurants.push(name);
                    name.style.border = "";
                }
            }
        }
    }
}


(async () => {
    await scrollToBottom(0);
    window.scrollTo({top: 0,behavior: "smooth"});
    getRestaurantList();
    await goToRandomItem(openRestaurants);
})();

