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

goUpAndDown = (start, i, max) => {
    i = i * 6;
    let lower = start - i > 0 ? start - i : 0;
    let higher = start + i < max - 1 ? start + i : max - 1;

    return new Promise((resolve) => {
        setTimeout(() => {
            openRestaurants[higher].scrollIntoView({ "behavior": "smooth" });
            resolve();
        }, 1000);
    })
    .then(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                openRestaurants[lower].scrollIntoView({ "behavior": "smooth" });
                resolve();
            }, 1000);
        });
    });
};



goToRandomRestaurant = async ()=>{
    if(openRestaurants){
        var randomRestaurant = Math.floor(Math.random() * openRestaurants.length);

        await goUpAndDown(randomRestaurant, 1, openRestaurants.length);
    
        openRestaurants[randomRestaurant >= 3 ? randomRestaurant - 3 : 0].scrollIntoView({ "behavior": "smooth" });
        openRestaurants[randomRestaurant].style.border = "4px solid red";
    }
}

(async () => {
    await scrollToBottom(0);
    window.scrollTo({top: 0,behavior: "smooth"});
    getRestaurantList();
    await goToRandomRestaurant();
})();

