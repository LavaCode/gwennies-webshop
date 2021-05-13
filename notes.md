

## Todo's
1. manifest.json (TO CHECK IF NECESSARY)
2. Change images homepage and such 
5. Product detail page
6. cart and 'shop' functionality
8. succes messages (when adding to cart, when registering, when resetting password)
9. change all content to multi-language
10. feedback from backend

## Known bugs
1. Is screen-size less then 620 scroll functionality is broken
        meaning: you can't scroll
2. Can not get the navigation items spaced (with flex)
3. http://localhost:3000/login?name=&mail=&userName=&password=&password= 
        (routing issue! --> gebeurt op submit van registreer formulier)
4. You can scroll sideways.. 
        go to home, make screen 'mobile' and you can scroll to the side

        -- Has to do with overflow hidden:
        is it possible to do this separate for pages? (* {} works negative for other pages)
                if so, do it on Login, Contact, Products(sideways only), Home sideways only 

## Late priority:
1. Responsive productpage (see change on flex if screen is wider then 1200px)
   Can we make this prettier? 
2. border radius on small screen
3. suggestion: homepage has 6 tiles now, render for when screen is small enough to display them pretty

## Jesse
1. overflow issue 
3. responsive navbar issue (cart)
4. product detail and cart (open)
5. json images (open) 
6. leveling forms on different pages