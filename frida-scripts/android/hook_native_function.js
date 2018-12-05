var paths = [ 
"system/xbin/su",
"system/bin/su",
"sbin/su",
"system/su",
"su",
"/system/app/Superuser.apk"
];

function contains(arr, obj) {
  return arr.indexOf(obj) != -1; 
}

// We hook the fopen method of any library (null):
Interceptor.attach(Module.findExportByName(null, "fopen"), {
  // we can access all the arguments in the onEnter function
  onEnter: function(args) {
    this.path = Memory.readUtf8String(ptr(args[0]));
  },  
  // We need to implement the onLeave function to access (and replace) the return value
  onLeave: function (retval) {
    if (contains(paths, this.path)) {
      if (retval != 0) {
        console.log("fopen("+this.path+") => " +retval.toInt32() + " replaced by 0");
        retval.replace(0);
      } else {
        console.log("fopen("+this.path+") => " +retval.toInt32());
      }     
    }
  }
});
