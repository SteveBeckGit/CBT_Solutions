/* General 
The exercises require you to use ES 6 to query the tables for data, write results to the console. 
•	Don’t edit the <table> elements directly in your editor.  
•	Don’t use external JS frameworks at this point.
•	Write a function for each exercise.  Even if we change the data, the function must still work.
•	The function must always return a result, even if just an empty array i.e. never null or undefined		
*/

// Removed - alert("Hi there! Your exercises are in ES6.js");  // TODO: Remove


/* Exercise 1
Using the data from the Product Detail table, write to the console the number of products in each subcategory.
Write a function that returns an Array of Objects.  Each Object has 3 properties:
•	category
•	subcategory
•	total

Example:
listProductTotalsBysubcategory()

If you have 2 categories with 2 subcategories each, your function could return
[
	{ category : "Construction", subcategory : "Accessories", total : 4 },
	{ category : "Construction", subcategory : "Pneumatic", total : 2 },
	{ category : "DIY", subcategory : "Accessories", total : 5 },
	{ category : "DIY", subcategory : "Electrical", total : 7 }
]

Loop through the Array to log each category, subcategory and total to the console.
*/

var table2 = populateProductDetailArray();
window.onload = listTotalSalesBycategory("Woodworking");


function listProductTotalsBysubcategory()
{	
	var loggingArray = [];
	tableValues = table2;

	for(let i = 0; i < tableValues.length; i++)
	{
		//If the array is empty add first entry
		if(loggingArray.length == 0)
		{
			loggingArray.push({category: tableValues[i].category,
							subcategory: tableValues[i].subcategory,
							Total : 1});
		}
		else
		{
			var counter = 0;
			//Loop over the final array to count entries
			for(let j = 0; j < loggingArray.length; j++)
			{
				//If an object matches add 1 to the Total
				if(JSON.stringify(loggingArray[j]).includes(tableValues[i].category) && JSON.stringify(loggingArray[j]).includes(tableValues[i].subcategory))
				{
					loggingArray[j].Total ++;
					//Counter increments to indicate that a match was found
					counter ++;
				}
			}
			//If no matches were found add a new entry
			if(counter < 1)
			{
				loggingArray.push({category: tableValues[i].category,
				subcategory: tableValues[i].subcategory,
				Total : 1});
			}
		}
	}

	console.log(loggingArray);

}

function populateProductDetailArray()
{
	//Gets the table
	var table = document.getElementsByTagName('table')[1];
	//Gets the rows
	var rows = table.children[0].children;
	//The 2 Arrays to populate
	var tableValues= [];
	var loggingArray = [];

	var array=[];
	//Populate Array with Product Objects
	for(let i = 1; i < rows.length; i++)
	{
		var arr = [];
		
			arr = {product: rows[i].children[0].textContent,
					category: rows[i].children[1].textContent,
					subcategory: rows[i].children[2].textContent,
					price: Number.parseInt(rows[i].children[3].textContent),
					stock: Number.parseInt(rows[i].children[4].textContent),
					sales: Number.parseInt(rows[i].children[5].textContent),
					profit:Number.parseInt(rows[i].children[6].textContent),
					dateAdded: rows[i].children[7].textContent
					};
			
			array.push(arr);
		
	}

	return array
}

/* Exercise 2
Using the data from the Product Detail table, write to the console the total sales for each subcategory in a given category.
Write a function that takes a category parameter and returns an Array of Objects.  Each Object has 3 properties:
•	category
•	subcategory
•	totalSales

Example:
listTotalSalesBycategory("DIY")

could return
[
	{ category : "DIY", subcategory : "Accessories", totalSales : 4234 },
	{ category : "DIY", subcategory : "Pneumatic", totalSales : 2546 },
	{ category : "DIY", subcategory : "Electrical", totalSales : 7478 }
]

Loop through the Array to log each category, subcategory and total sales to the console.			
*/


function listTotalSalesBycategory(Category)
{
	products = table2;
	var loggingArray = [];
	for(let i = 0; i < products.length; i++)
	{
		//Only work with the category which matches the arg
		if(products[i].category.includes(Category))
		{
			var counter = 0;
			//Loop over the existing totals to sum
			for(let j = 0; j < loggingArray.length; j++)
			{
				//If an object matches add 1 to the Total
				if(loggingArray[j].subcategory.includes(products[i].subcategory))
				{
					loggingArray[j].sales += products[i].sales;
					//Counter increments to indicate that a match was found
					counter ++;
				}
			}
			//If no matches were found add a new entry
			if(counter < 1)
			{				
				loggingArray.push({category: products[i].category,
				subcategory: products[i].subcategory,
				sales : products[i].sales});							
			}
		}
				
	}
	console.log(loggingArray);
}


/* Exercise 3
Write a function to calculate the cost of the stock on hand per subcategory.
Cost is the Price - Profit * Stock
Then for each subcategory add a new column to show an inflation increase of x% (supplied as a parameter)

Example:
listAdjustedCostBysubcategory(category, subcategory, 10)

may return
{ category: "DIY", subcategory : "Electrical", costOfStock : 100, costOfStockWithInflation: 110 }

Write the result to the console
*/










/* Exercise 4
There are inconsistencies between the Product Detail and the Product Summary data on the HTML document.  
Write a function that returns the subcategories where corresponding rows in the detail table do not exist.  List them in the console.

Example:
listRedundantSalesTotals()

Construction / Electrical reports a sales total, but has no corresponding detail.
DIY / Accessories reports a sales total, but has no corresponding detail.
*/










/* Exercise 5
There are inconsistencies between the Product Detail and the Product Summary data on the HTML document.  
Write a function that returns the Product Detail rows for which there are no corresponding rows in the Product Summary table.  Write them as comma separated values (CSV) to the console.

Example:
listMissingProductLines()

"Buffalo Tools Pro Series 12 Piece Router Bit Set", "Woodworking", "Accessories", 860.95, 495, 2119, 482080.92, 2015-07-13
"Hitachi 18 V Ni-cad Cordless Driver Drill", "Construction", "Cordless", 797.81, 8056, 2814, 367250.09, 2014-10-11
*/










/* Exercise 6
The Product Detail table has duplicate products.  For example: Lincoln Industrial Grease Gun Cordless With Case
Write a function that returns an Array of Objects.  Each Object has 2 properties:
•	product
•	duplicateCount

List the duplicates in the console.

Example:
countProductDuplicates()

"Buffalo Tools Pro Series 12 Piece Router Bit Set" has 3 duplicates
"Hitachi 18 V Ni-cad Cordless Driver Drill" has 2 duplicates
*/










/* Exercise 7
In the console, write out the JSON representation of the Product Detail table.  
Filter the result so that it returns only the category / subcategory combination supplied by the parameters.

Example:
productsToJson(category, subcategory)

productsToJson("DIY", "Electrical")			
*/










/* Exercise 8
You’ll find that the duplicate product names have varying categories and subcategories.  (Yes, we fired the data entry clerk!)

For instance:
Product		|	category	|	subcategory	|	Sales
Product A 	| 	Cat 1 		| 	Subcat 1 	|	20
Product A 	| 	Cat 4 		| 	Subcat 3	|	45
Product A 	| 	Cat 3 		| 	Subcat 2	|	35

What if the duplicate product names had the same category and subcategory as the first occurrence of that product name?  
What would the sales totals be per subcategory?  

Product		|	category	|	subcategory	|	Sales
Product A 	| 	Cat 1 		| 	Subcat 1 	|	100

Write a function that calculates the “what if” sales totals for each subcategory.  

Example:
listCorrectedsubcategorySales()

Write it to the console.
*/










/* Exercise 9
It’s hard to find a product on the page.
Write a search function that would return all the products for the search term on the page.  
The search term applies to the subcategory only.
			
Your function will take 3 parameters:
•	searchTerm			string
•	searchType			string
	•	"startsWith" or
	•	"endsWith" or
	•	"contains"
•	isCaseSensitive		Boolean

Your function will find the products starting with, ending with or containing the text of the search term.
The search may be case sensitive or case insensitive.

If an empty search term is given, return all results.

From the results, build up a string to form an HTML description list (<dl>) as follows:

<dl>
	<dt>Product 1</dt>
	<dd>
		category-subcategory
		<ul>
			<li>Price</li>
			<li>Stock</li>
			<li>Sales</li>
			<li>Profit</li>
			<li>DateAdded</li>
		</ul>
	</dd>
	<dt>Product 2</dt>
	<dd>
		category-subcategory
		<ul>
			<li>Price</li>
			<li>Stock</li>
			<li>Sales</li>
			<li>Profit</li>
			<li>DateAdded</li>
		</ul>
	</dd>	
	
	<!-- etc -->
</dl>

Log the results to the console.


Example:
search(searchTerm, searchType, isCaseSensitive)

search("Elec", "startsWith", true)
	

Result:
Searching for subcategories stariting with "Elec" (case sensitive)

<dl>
	<dt>Buffalo Tools Pro Series 12 Piece Router Bit Set</dt>
	<dd>
		Woodworking-Electrical
		<ul>
			<li>860.95</li>
			<li>495</li>
			<li>2119</li>
			<li>482080.92</li>
			<li>2015-07-13</li>
		</ul>
	</dd>
	<dt>Hitachi 18 V Ni-cad Cordless Driver Drill</dt>
	<dd>
		Construction-Electrical
		<ul>
			<li>797.81</li>
			<li>8056</li>
			<li>2814</li>
			<li>367250.09</li>
			<li>2014-10-11</li>
		</ul>
	</dd>	
</dl>
*/












