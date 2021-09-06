## Todo's
1. Download images 
2. Update images
3. admin area (view users, add discount code, see active codes, see orders and change status)
4. checkout 
    - shipping
5. Private Routing
6. Checkout: prefilled data is not accepted on first click??? 
7. Placing an order (first part done: cart is registered to console.log)
8. store cart in cookie
9. delete or edit account
10. add coupon functionality

## it's a must 
1. create a component for image

## Known bugs
1. Images do not load correctly
2. 'sale item' is not checked if set on edit product
3. if you delete a product which has a quantity in cart, the cart does not update and shows wrong item nrs
4. when deleting products the ID number stays alive somehow -- not a major issue
5. when deleting a product the product won't dissapear. 
    -- on window reload, the cart will be empty
    -- if useEffect on products, it will be working constant (to confirm, add a console log to the useEffect) 
6. if a product has sale; when adding product to cart the old price is applied

## Late priority:
1. homepage styling
2. change content
3. Modal triggering should be cleaner (combine)
4. discount codes (prettier and functionality)
5. live view of stock amount
6. sale
7. styling cart 
8. styling ribbon 
9. discount code maker (backend)
10. shopping cart click on item to return to detailpage
11. contact to backend?
12. cart in  cookie
## "Wish we did this in the beginning" -- most likely to be added to 'Late priority' 
1. Button component 
2. 'Toast' component

## Fun-facts   
1. Random quotations, AWESOME
2. Zipcode is everywhere in 6 characters format. Interesting for such an international webshop