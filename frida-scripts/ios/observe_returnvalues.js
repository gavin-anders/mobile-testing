if (ObjC.available) {

    try {
        var className = "Backbase";
        var funcName = "isDeviceJailBroken";
        var hook = eval('ObjC.classes.' + className + '["' + funcName + '"]');

        Interceptor.attach(hook.implementation, {
            onLeave: function(retval) {
                var message = ObjC.Object(retval);

                console.log("\n\t[*] Class Name: " + className);
                console.log("\t[*] Method Name: " + funcName);
                console.log("\t[-] Type of return value: " + typeof retval);
                console.log("\t[-] Return Value: " + retval);
            }
        });
    } catch (err) {
        console.log("[!] Exception2: " + err.message);
    }
} else {
    console.log("Objective-C Runtime is not available!");
}
