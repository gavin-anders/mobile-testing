var searchterm = "jailbreak";  //must be lowercase
var results = [];

for (var className in ObjC.classes)
{ 
    if (ObjC.classes.hasOwnProperty(className))
	{     
		console.log("Processing: " + className)
		try 
		{ 
			var methods = eval('ObjC.classes.' + className + '.$methods'); 
			for (var i = 0; i < methods.length; i++) 
			{ 
				try 
				{
					var method = methods[i].toLowerCase();
					var n = method.search(searchterm);
					if (n >= 0) {
						console.log(methods[i]); 
						results.push(className + "." + methods[i])
					}
				} 
				catch(err) 
				{
				} 
			}
		} 
		catch(err) 
		{ 
			console.log("[!] Exception: " + err.message);
		} 
	} 
}
console.log("============ SEARCH RESULTS ============");
for (var i = 0; i < results.length; i++) {
	console.log(results[i]);
}
console.log("========================================");
