scrollToBottom = (currentHeight, callback) => {
    const bottomElement = document.querySelector('footer._28xnwl[data-qa="footer"]');

    if (bottomElement) {
        bottomElement.scrollIntoView({"behavior":"instant"});
        if (typeof callback === 'function') {
            callback();
        }
    } else {
        currentHeight += 350;
        window.scrollTo(0, currentHeight);
        setTimeout(() => scrollToBottom(currentHeight, callback), 10);
    }
}

(() => {
    scrollToBottom(0, () => {
        var restaurants = document.getElementsByClassName('_2ro375');

        var openRestaurants = [];

    
        for (var i = 0; i < restaurants.length; i++) {
            var isOpen = restaurants[i].querySelector('[data-qa="shipping-time-indicator-content"]');
            var name = restaurants[i].querySelector("[data-qa]")
           
            if(isOpen.textContent != "Closed for delivery"){
                if(name){
                    openRestaurants.push(name);
                    name.style.border = "";
                }
            }
          }

          var randomRestaurant = Math.floor(Math.random() * openRestaurants.length)
      
          openRestaurants[randomRestaurant >= 3 ? randomRestaurant - 3: 0].scrollIntoView({"behavior":"smooth"});
        
          openRestaurants[randomRestaurant].style.border = "4px solid red";

    });
})();