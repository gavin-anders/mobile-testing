// Hook the dlopen method that is in charge of loading external libraries to know when the library we are searching for has been loaded
var didHookApis = false;
Interceptor.attach(Module.findExportByName(null, 'dlopen'), {
  onEnter: function (args) {
    this.path = Memory.readUtf8String(args[0]);
  },
  onLeave: function (retval) {
    if(!retval.isNull() && this.path.indexOf('librooted.so')!== -1 && !didHookApis) {
      didHookApis = true;
      console.log("Loaded library: " + this.path + " - Hooking library methods");
      // After we know that the library is loaded, we can intercept the methods we want:
      hook_librooted();
    }
  }
});

// This function contains the interceptors and it is only called after the "librooted.so" library is called
function hook_librooted() {
    // Hook the "Java_com_package_applicationname_app_RootDeviceDetecter_canExecuteSuCommand" method that we saw in the "librooted.so" library using IDA, radare2 or whatever you use
    Interceptor.attach(Module.findExportByName("librooted.so", "Java_com_package_applicationname_app_RootDeviceDetecter_canExecuteSuCommand"), {
      onEnter: function(args) { 
        //nothing
      },
      onLeave: function (retval) {
        if (retval.toInt32() != 0) {
          console.log("canExecuteSuCommand => " + retval.toInt32() + " - replaced to 0");
          retval.replace(0);
        } else {
          console.log("canExecuteSuCommand => " + retval.toInt32());
        }
      }
    });
}
