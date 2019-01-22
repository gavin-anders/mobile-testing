var resolver = new ApiResolver('objc');
resolver.enumerateMatches('*[* isJailbroken*]', {
    onMatch: function (match) {
        var func = match["name"];
        var ptr = match["address"];
        console.log("Found method that matched wildcard:  " + func);
        Interceptor.attach(ptr, {
            onEnter: function () {
                console.log("Hooking: " + func  +" to return false");
            },
            onLeave: function (retval) {
                retval.replace(0x0);
            }
        });
    },
    onComplete: function () {
    }   
});

