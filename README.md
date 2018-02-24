# bamazon
### Purpose:
The primary purpose of this program is to connect mySQL with node.js. 

### Overview:
![Alt Text](https://media.giphy.com/media/1n5gGjo7iRePXTiBgT/giphy.gif)

This is a storefront program that uses the data stored in mySQL to display product information. When the user runs the program, they are provided a table of the items available to select from. At the bottom of the menu, the user receives a prompt asking the user to input the *Id* number for the item they wish to purchase. Upon entering the *Id* number, the user is prompted again asking to input the *quantity* they would like to purchase. 

After the user completes both questions, a series of functions are ran to identify the item and amount requested. A comparison to the current inventory of the product requested against the user's amount requested. If the store is able to accommodate the amount requested, the user is provided with the message informing them the items have been added to their cart along with a the total cost. Additionally the database is being updated with the deducted amount the user has purchased.

![Alt Text](https://media.giphy.com/media/xVvX0CoVJlCdNikjqq/giphy.gif)

If the amount requested exceeds the inventory of the store, the user is notified with a message indicating the store is unable to accommodate the amount they requested.


