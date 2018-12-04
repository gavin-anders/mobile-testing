if (ObjC.available) {

    try {
        var className = "";
        var funcName = "";

        var hook = eval('ObjC.classes.' + className + '["' + funcName + '"]');

        Interceptor.attach(hook.implementation, {
            onLeave: function(retval) {
                console.log("\n\t[*] Class Name: " + className);
                console.log("\t[*] Method Name: " + funcName);
                console.log("\t[-] Type of return value: " + typeof retval);
                console.log("\t[-] Original Return Value: " + retval);
                retval.replace(0x00)
	    }
        });
    } catch (err) {
        console.log("[!] Exception2: " + err.message);
    }
} else {
    console.log("Objective-C Runtime is not available!");
}
