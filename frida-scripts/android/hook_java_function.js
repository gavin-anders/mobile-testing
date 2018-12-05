Java.perform(function() { 
    // Hook RootDeviceDetecter class from 'my.package.com' package
    var RootDeviceDetecter = Java.use('my.package.com.RootDeviceDetecter');

    // Hook canExecuteSuCommand method, implementing its behaviour. 
    RootDeviceDetecter.canExecuteSuCommand.implementation = function () {
        // this.methodName() will execute the method for you
        var result = this.canExecuteSuCommand();
        console.log('canExecuteSuCommand bypassed! Original return: ' + result + ', replaced by 0');
        // Returning 0 will bypass this antiroot function
        return 0;
    }   

}); 
