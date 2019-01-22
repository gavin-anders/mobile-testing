Java.perform(function(){
      var ANDROID_VERSION_M = 23;

      var DefaultConfigSource = Java.use("android.security.net.config.ManifestConfigSource$DefaultConfigSource");
      var NetworkSecurityConfig = Java.use("android.security.net.config.NetworkSecurityConfig");

      DefaultConfigSource.$init.overload("boolean", "int").implementation = function(usesCleartextTraffic, targetSdkVersion){
             console.log("[+] Modifying DefaultConfigSource constructor");
             return this.$init.overload("boolean", "int").call(this, usesCleartextTraffic, ANDROID_VERSION_M);
      };

      DefaultConfigSource.$init.overload("boolean", "int", "int").implementation = function(usesCleartextTraffic, targetSdkVersion, targetSandboxVersion){
             console.log("[+] Modifying DefaultConfigSource constructor");
             return this.$init.overload("boolean", "int", "int").call(this, usesCleartextTraffic, ANDROID_VERSION_M, targetSandboxVersion);
      };

      NetworkSecurityConfig.getDefaultBuilder.overload("int").implementation = function(targetSdkVersion){
             console.log("[+] getDefaultBuilder original targetSdkVersion => " + targetSdkVersion.toString());
             return this.getDefaultBuilder.overload("int").call(this, ANDROID_VERSION_M);
      };
 
      NetworkSecurityConfig.getDefaultBuilder.overload("int", "int").implementation = function(targetSdkVersion, targetSandboxVersion){
             console.log("[+] getDefaultBuilder original targetSdkVersion => " + targetSdkVersion.toString());
             return this.getDefaultBuilder.overload("int", "int").call(this, ANDROID_VERSION_M, targetSandboxVersion);
      };
});
