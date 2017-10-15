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



//set the .onload to function of choice
window.onload = listAdjustedCostBysubcategory("DIY","Electrical",10);


function listProductTotalsBysubcategory()
{		
	const table = document.getElementsByTagName('table')[1];
	//Gets the rows
	let rows = Array.from(table.children[0].children);

	
	const productDetails = rows.map(i =>({category: i.children[1].textContent,
								subcategory: i.children[2].textContent,
							    total: 0 }));
	productDetails.shift();

	const filteredProducts = productDetails.filter(i => {
		for(const product of productDetails)
		{
			if(product.category === i.category && product.subcategory === i.subcategory)
			{
				i.total ++;
			}		
			
		}
		return true;
	});

	const removeDuplicates = filteredProducts.filter((i, idx, arr) =>{
		return arr.map(mapObj => JSON.stringify(mapObj)).indexOf(JSON.stringify(i)) === idx;
		
	});
	console.log(removeDuplicates);
	
}





function populateProductSummaryArray()
{
	//Gets the table
	const table = document.getElementsByTagName('table')[0];
	//Gets the rows
	const rows = table.children[0].children;

	const productSummaries = rows.map(i =>({
		category: i.children[0].textContent,
		subcategory: i.children[1].textContent,
		sales: Number.parseInt(i.children[2].textContent)
	}));	

	return productSummaries;
}

function populateProductDetailArray()
{
	//Gets the table
	const table = document.getElementsByTagName('table')[1];
	//Gets the rows
	const rows = Array.from(table.children[0].children);

	
	const productDetails = rows.map(i =>({product: i.children[0].textContent,
								category: i.children[1].textContent,
								subcategory: i.children[2].textContent,
								price: Number.parseInt(i.children[3].textContent),
								stock: Number.parseInt(i.children[4].textContent),
								sales: Number.parseInt(i.children[5].textContent),
								profit: Number.parseInt(i.children[6].textContent),
								dateAdded: i.children[7].textContent,}));

	

	return productDetails;
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
	const table = document.getElementsByTagName('table')[1];
	//Gets the rows
	let rows = Array.from(table.children[0].children);

	const productDetails = rows.map(i =>({category: i.children[1].textContent,
		subcategory: i.children[2].textContent,
		sales: Number.parseInt(i.children[5].textContent) }));

	productDetails.shift();

	const filteredProducts = productDetails.filter((i) => i.category === Category);
		
	
	const test =  filteredProducts.reduce((total, sales) =>{
		if(total.subcategory === sales.subcategory)
		{
			total.sales += sales.sales;
		}
		return total;
	});

		console.log(test);
	

	const removeDuplicates = filteredProducts.filter((i, idx, arr) =>{
		return arr.map(mapObj => JSON.stringify(mapObj.subcategory)).indexOf(JSON.stringify(i.subcategory)) === idx;
		});

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


function listAdjustedCostBysubcategory(Category, Subcategory, percentInflation)
{
	const table = document.getElementsByTagName('table')[1];
	//Gets the rows
	let rows = Array.from(table.children[0].children);

	const productDetails = rows.map(i =>({category: i.children[1].textContent,
		subcategory: i.children[2].textContent,
		price: Number.parseInt(i.children[3].textContent),
		stock: Number.parseInt(i.children[4].textContent),
		sales:	Number.parseInt(i.children[5].textContent),	
		profit: Number.parseInt(i.children[6].textContent) }));

	productDetails.shift();

	const filteredProducts = productDetails.filter(i => i.category === Category && i.subcategory === Subcategory);
	const price = filteredProducts.reduce((total, sum)=>({price:total.price + sum.price}));
	const profit = filteredProducts.reduce((total, sum)=>({profit:total.profit + sum.profit}));
	const stock = filteredProducts.reduce((total, sum)=>({stock:total.stock + sum.stock}));
	const sales = filteredProducts.reduce((total, sum)=>({sales:total.sales + sum.sales}));

	const cost = ((price.price *sales.sales)- profit.profit) / stock.stock;
	const adjustedCost = cost + (cost * (percentInflation / 100));
	
	const newObj = {category: Category,
					subcategory: Subcategory,
					costOfStock: cost,
					costOfStockWithInflation: adjustedCost};	

	console.log(newObj);

	
	
}



/* Exercise 4
There are inconsistencies between the Product Detail and the Product Summary data on the HTML document.  
Write a function that returns the subcategories where corresponding rows in the detail table do not exist.  List them in the console.

Example:
listRedundantSalesTotals()

Construction / Electrical reports a sales total, but has no corresponding detail.
DIY / Accessories reports a sales total, but has no corresponding detail.
*/

function listRedundantSalesTotals()
{
	let missingItems = [];
	
	for(let i = 1; i < populateProductSummaryArray().length; i++)
	{
		let matchCount = 0;
		for(let j = 1; j < populateProductDetailArray().length; j++)
		{
			if(populateProductSummaryArray()[i].category === populateProductDetailArray()[j].category && populateProductSummaryArray()[i].subcategory === populateProductDetailArray()[j].subcategory )
			{
				matchCount ++;
				break;
			}
		
		}
		if(matchCount < 1)
		{
			missingItems.push(populateProductSummaryArray()[i].category+" / "+populateProductSummaryArray()[i].subcategory+" reports a sales total, but has no corresponding detail.");
		}
		
	}
	for(let i = 0; i < missingItems.length; i++)
	{
		console.log(missingItems[i]);
	}
	
}








/* Exercise 5
There are inconsistencies between the Product Detail and the Product Summary data on the HTML document.  
Write a function that returns the Product Detail rows for which there are no corresponding rows in the Product Summary table.  Write them as comma separated values (CSV) to the console.

Example:
listMissingProductLines()

"Buffalo Tools Pro Series 12 Piece Router Bit Set", "Woodworking", "Accessories", 860.95, 495, 2119, 482080.92, 2015-07-13
"Hitachi 18 V Ni-cad Cordless Driver Drill", "Construction", "Cordless", 797.81, 8056, 2814, 367250.09, 2014-10-11
*/

function listMissingProductLines()
{
	
	
	for(let i = 1; i < populateProductDetailArray().length; i++)
	{
		let matchCount = 0;
		for(let j = 1; j < populateProductSummaryArray().length; j++)
		{
			if(populateProductSummaryArray()[j].category === populateProductDetailArray()[i].category && populateProductSummaryArray()[j].subcategory === populateProductDetailArray()[i].subcategory )
			{
				matchCount ++;
				break;
			}
		
		}
		if(matchCount < 1)
		{
			console.log(populateProductDetailArray()[i].product+","+populateProductDetailArray()[i].category+","+populateProductDetailArray()[i].subcategory+","+populateProductDetailArray()[i].price+","
						+populateProductDetailArray()[i].stock+","+populateProductDetailArray()[i].sales+","+populateProductDetailArray()[i].profit+","+populateProductDetailArray()[i].dateAdded);
		}
		
	}
	
	
}








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


function countProductDuplicates()
{
	let loggingArray = [];
	const tableValues = populateProductDetailArray();

	for(let i = 0; i < tableValues.length; i++)
	{
		//If the array is empty add first entry
		if(loggingArray.length === 0)
		{
			loggingArray.push({product: tableValues[i].product,							
							Total : 1});
		}
		else
		{
			let counter = 0;
			//Loop over the final array to count entries
			for(let j = 0; j < loggingArray.length; j++)
			{
				//If an object matches add 1 to the Total
				if(loggingArray[j].product.includes(tableValues[i].product))
				{
					loggingArray[j].Total ++;
					//Counter increments to indicate that a match was found
					counter ++;
				}
			}
			//If no matches were found add a new entry
			if(counter < 1)
			{
				loggingArray.push({product: tableValues[i].product,
				
				Total : 1});
			}
		}
	}

	for(let i = 0; i < loggingArray.length; i++)
	{
		
		if(loggingArray[i].Total > 1)
		{
			console.log(loggingArray[i].product + " has "+ loggingArray[i].Total+ " duplicates." );
		}
	}
				
	
}








/* Exercise 7
In the console, write out the JSON representation of the Product Detail table.  
Filter the result so that it returns only the category / subcategory combination supplied by the parameters.

Example:
productsToJson(category, subcategory)

productsToJson("DIY", "Electrical")			
*/

function productsToJson(Category, Subcategory)
{
	let productDetails = [];
	for(let i = 0; i < populateProductDetailArray().length; i++)
	{
		if(populateProductDetailArray()[i].category.includes(Category) && populateProductDetailArray()[i].subcategory.includes(Subcategory))
		{
			productDetails.push(populateProductDetailArray()[i])	;
		}
	}


		let JSONObj = {productDetails};
		console.log(JSON.stringify(JSONObj));
}








/* Exercise 8
You’ll find that the duplicate product names have letying categories and subcategories.  (Yes, we fired the data entry clerk!)

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


function listCorrectedsubcategorySales()
{
	let loggingArray = [];
	const tableValues = populateProductDetailArray();

	for(let i = 0; i < tableValues.length; i++)
	{
		//If the array is empty add first entry
		if(loggingArray.length === 0)
		{
			loggingArray.push({product: tableValues[i].product,
				category: tableValues[i].category,	
				subcategory: tableValues[i].subcategory,	
				sales: tableValues[i].sales,
				Total: tableValues[i].Total});		
							
		}
		else
		{
			let counter = 0;
			//Loop over the final array to count entries
			for(let j = 0; j < loggingArray.length; j++)
			{
				//If an object matches add 1 to the Total
				if(loggingArray[j].product.includes(tableValues[i].product))
				{
					loggingArray[j].sales += tableValues[i].sales;
					loggingArray[j].Total ++;
					//Counter increments to indicate that a match was found
					counter ++;
				}
			}
			//If no matches were found add a new entry
			if(counter < 1)
			{
				loggingArray.push({product: tableValues[i].product,
					category: tableValues[i].category,	
					subcategory: tableValues[i].subcategory,	
					sales: tableValues[i].sales,
					Total: 1});
			}
		}
	}
	
	for(let i = 0; i < loggingArray.length; i++)
	{
		
		if(loggingArray[i].Total > 1)
		{
			console.log( loggingArray[i].product+"  |  "+ loggingArray[i].category+"  |  "+ loggingArray[i].subcategory+"  |  "+ loggingArray[i].sales);
		}
	}
}







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

function search(searchTerm = string, searchType = string, isCaseSensitive = Boolean )
{
	let loggingArray = [];
	const tableValues = populateProductDetailArray();
	// Due to non static Types I have tried to shape the types prior to functioning
	// If isCaseSensitive is not a Boolean type it will function as if set false
	if(typeof isCaseSensitive != "boolean" )
	{
		isCaseSensitive = false;
	}
	//If searchTerm is not a string it will function as if it were empty
	if(typeof searchTerm != "string" )
	{
		searchTerm = "";
	}
	//If searchType is not a string it will function as if it were empty

	if(typeof searchType != "string" )
	{
		searchType = "";
	}
	//If searchTerm is empty use contains as the function
	
	if(searchType === "")
	{
		searchType = "contains";
	}

	if(searchTerm === "")
	{
		loggingArray = tableValues;
	}
	else
	{
		//Gets a substring to compare
		if(searchType.toUpperCase()  === "STARTSWITH")
		{
			let count = searchTerm.length;
			for(let i = 0; i < tableValues.length; i++)
			{
				let str = tableValues[i].subcategory;
			
				if(isCaseSensitive)
				{
					if( str.substring(0, count) === searchTerm )
					{
						loggingArray.push(tableValues[i]);
					}
				}
				else
				{
					if( str.substring(0, count).toUpperCase() === searchTerm.toUpperCase())
					{
						loggingArray.push(tableValues[i]);
					}	
				}
				
			}
		}

		//In order to find what a string ends with use fuction reverse to compare the ends of the strings
		else if(searchType.toUpperCase()  === "ENDSWITH")
		{
			let count = searchTerm.length;
			for(let i = 0; i < tableValues.length; i++)
			{
				let str = tableValues[i].subcategory;
			
				if(isCaseSensitive)
				{
					if(reverseString(str).substring(0, count) === reverseString(searchTerm) )
					{
						loggingArray.push(tableValues[i]);
					}
				}
				else
				{
					if( reverseString(str).substring(0, count).toUpperCase() === reverseString(searchTerm.toUpperCase()))
					{
						loggingArray.push(tableValues[i]);
					}	
				}
				
			}
		}
		else if(searchType.toUpperCase()  === "CONTAINS")
		{
			
			for(let i = 0; i < tableValues.length; i++)
			{
				let str = tableValues[i].subcategory;
			
				if(isCaseSensitive)
				{
					if( str.includes(searchTerm) )
					{
						loggingArray.push(tableValues[i]);
					}
				}
				else
				{
					if( str.toUpperCase().includes(searchTerm.toUpperCase()))
					{
						loggingArray.push(tableValues[i]);
					}	
				}
				
			}
		}		
	}
	
	let html = "<dl>";
	for(let i = 0; i < loggingArray.length; i ++)
	{
		html +=
		"\n <dt>"+loggingArray[i].product+"</dt>\n"+
		" <dd>\n"+
		"   "+loggingArray[i].category+"-"+loggingArray[i].subcategory+"\n"+
		"   <ul>\n"+
		"     <li>"+loggingArray[i].price+"</li>\n"+
		"     <li>"+loggingArray[i].stock+"</li>\n"+
		"     <li>"+loggingArray[i].sales+"</li>\n"+
		"     <li>"+loggingArray[i].profit+"</li>\n"+
		"     <li>"+loggingArray[i].dateAdded+"</li>\n"+
		"   </ul>\n"+
		" </dd>";
	}
	html = html +"\n</dl>";
	console.log(html);
}



function reverseString(string)
{
	let split = string.split("");
	let reversed = split.reverse();
	let rejoin = reversed.join("");
	return rejoin;
}










