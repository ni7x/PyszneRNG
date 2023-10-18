//import { startsWithNumber, goToRandomItem, goUpAndDown, scrollToBottom } from "./helperFunctions"; I have no clue how to do it so let it be pasted it is only in 2 files

var dishes = [];

scrollToBottom = (currentHeight) => {
    return new Promise((resolve) => {
        const scrollStep = 100;

        const scroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
           

            if (currentHeight + windowHeight >= documentHeight) {
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
    console.log(lower, higher)
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
    if(items.length > 0){
        var randomItemNum = Math.floor(Math.random() * items.length);
        for(let i = 2; i>0; i--){
            await goUpAndDown(items, randomItemNum, i, items.length);
        }
        items[randomItemNum >= 3 ? randomItemNum - 3 : 0].scrollIntoView({ "behavior": "smooth" });
        items[randomItemNum].style.border = "4px dashed #ff7400";
    }
}



getDishes = () => {
    dishes = document.getElementsByClassName('_2TWTUN');
    for (let i = 0; i < dishes.length; i++) {
        dishes[i].style.border = "";
    }
}


(async () => { 
    await scrollToBottom(0);
    getDishes();
    window.scrollTo({ top: 0, behavior: "smooth"});

    if(dishes){
       await goToRandomItem(dishes);
    }
  
})();

