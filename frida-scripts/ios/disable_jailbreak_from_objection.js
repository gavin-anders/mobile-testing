// Attempts to disable Jailbreak detection.
// This seems like an odd thing to do on a device that is probably not
// jailbroken. However, in the case of a device losing a jailbreak due to
// an OS upgrade, some filesystem artifacts may still exist, causing some
// of the typical checks to incorrectly detect the jailbreak status!

// Get the common_paths for iOS
//jinja: include 'ios/jailbreak/_common_paths.js'

// Hook NSFileManager calls and check if it is to a common path.
// TODO: Hook fopen too.
//

var original_paths = [
    '/Applications/Cydia.app',
    '/Applications/FakeCarrier.app',
    '/Applications/Icy.app',
    '/Applications/IntelliScreen.app',
    '/Applications/MxTube.app',
    '/Applications/RockApp.app',
    '/Applications/SBSetttings.app',
    '/Applications/WinterBoard.app',
    '/Applications/blackra1n.app',
    '/Library/MobileSubstrate/DynamicLibraries/Veency.plist',
    '/Library/MobileSubstrate/MobileSubstrate.dylib',
    '/System/Library/LaunchDaemons/com.ikey.bbot.plist',
    '/System/Library/LaunchDaemons/com.saurik.Cy@dia.Startup.plist',
    '/bin/bash',
    '/bin/sh',
    '/etc/apt',
    '/etc/ssh/sshd_config',
    '/private/var/stash',
    '/private/var/tmp/cydia.log',
    '/usr/bin/cycript',
    '/usr/bin/ssh',
    '/usr/bin/sshd',
    '/usr/libexec/sftp-server',
    '/usr/libexec/sftp-server',
    '/usr/libexec/ssh-keysign',
    '/usr/sbin/sshd',
    '/var/cache/apt',
    '/var/lib/cydia',
    '/var/log/syslog',
    '/var/tmp/cydia.log'
];
var electra_paths = [
   '/var/mobile/test.txt',
'/.bit_of_fun',
'/bin/bash',
'/authorize.sh',
'/Applications/jjjj.app/',
'/Applications/Extender.app/',
'/Applications/GBA4iOS.app/',
'/Applications/Filza.app/',
'/Library/dpkg/',
'/Library/Cylinder/',
'/Library/Zeppelin/',
'/etc/alternatives/',
'/etc/apt/',
'/etc/dpkg/',
'/etc/pam.d/',
'/etc/profile.d/',
'/etc/ssh/',
'/usr/include/',
'/usr/lib/apt/',
'/usr/lib/dpkg/',
'/usr/lib/pam/',
'/usr/lib/pkgconfig/',
'/usr/lib/cycript0.9/',
'/usr/libexec/cydia/',
'/usr/libexec/gnupg/',
'/usr/share/bigboss/',
'/usr/share/dpkg/',
'/usr/share/gnupg/',
'/usr/share/tabset/',
'/var/cache/apt/',
'/var/db/stash/',
'/var/lib/apt/',
'/var/lib/dpkg/',
'/var/stash/',
'/var/tweak/',
'/Applications/Anemone.app/',
'/Applications/SafeMode.app/',
'/usr/lib/SBInject.dylib',
'/usr/lib/SBInject/',
'/usr/lib/libsubstitute.0.dylib',
'/usr/lib/libsubstitute.dylib',
'/usr/lib/libsubstrate.dylib',
'/usr/lib/libjailbreak.dylib',
'/usr/bin/recache',
'/usr/bin/killall',
'/usr/share/terminfo/*',
'/usr/libexec/sftp-server',
'/usr/lib/SBInject.dylib',
'/Library/Frameworks/* ',
'/System/Library/Themes/',
'/Library/Themes/',
'/usr/lib/SBInject.dylib',
'/Library/MobileSubstrate/*',
'/etc/dropbear',
'/usr/lib/TweakInject.dylib',
'/usr/lib/TweakInject/',
'/Library/TweakInject/',
'/Applications/circuitbreaker.app/',
'/var/mobile/Library/Preferences/com.thecomputerwhisperer.cbtweaks.plist',
'/var/mobile/Library/Preferences/com.thecomputerwhisperer.cbprefs.plist',
'/var/mobile/Library/Preferences/com.thecomputerwhisperer.CBPrefsList.plist',
'/var/mobile/Library/Preferences/aaa.thecomputerwhisperer.fuku.plist',
'/var/mobile/Library/Preferences/com.thecomputerwhisperer.CircuitBreakerPrefs.plist',
'/Applications/Cydia.app/',
'/bin/bash',
'/bin/bunzip2',
'/bin/bzcat',
'/bin/bzip2',
'/bin/bzip2recover',
'/bin/cat',
'/bin/chgrp',
'/bin/chmod',
'/bin/chown',
'/bin/cp',
'/bin/date',
'/bin/dd',
'/bin/dir',
'/bin/echo',
'/bin/egrep',
'/bin/false',
'/bin/fgrep',
'/bin/grep',
'/bin/gtar',
'/bin/gunzip',
'/bin/gzexe',
'/bin/gzip',
'/bin/kill',
'/bin/ln',
'/bin/ls',
'/bin/mkdir',
'/bin/mknod',
'/bin/mktemp',
'/bin/mv',
'/bin/pwd',
'/bin/readlink',
'/bin/rmdir',
'/bin/run-parts',
'/bin/sed',
'/bin/sleep',
'/bin/stty',
'/bin/su',
'/bin/sync',
'/bin/tar',
'/bin/touch',
'/bin/true',
'/bin/uname',
'/bin/uncompress',
'/bin/vdir',
'/bin/zcat',
'/bin/zcmp',
'/bin/zdiff',
'/bin/zegrep',
'/bin/zfgrep',
'/bin/zforce',
'/bin/zgrep',
'/bin/zless',
'/bin/zmore',
'/bin/znew',
'/Library/dpkg/',
'/Library/LaunchDaemons/com.openssh.sshd.plist',
'/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist',
'/private/etc/alternatives/',
'/private/etc/apt/',
'/private/etc/default/',
'/private/etc/dpkg/',
'/private/etc/ssh/',
'/private/etc/ssl/',
'/private/etc/profile',
'/private/var/backups/',
'/private/var/cache/',
'/private/var/empty/',
'/private/var/lib/apt/',
'/private/var/lib/cydia/',
'/private/var/lib/misc/',
'/private/var/lib/dpkg',
'/sbin/dmesg',
'/sbin/dynamic_pager',
'/sbin/halt',
'/sbin/nologin',
'/sbin/reboot',
'/sbin/update_dyld_shared_cache',
'/usr/bin/apt-key',
'/usr/bin/arch',
'/usr/bin/bashbug',
'/usr/bin/captoinfo',
'/usr/bin/cfversion',
'/usr/bin/clear',
'/usr/bin/cmp',
'/usr/bin/c_rehash',
'/usr/bin/dbsql',
'/usr/bin/db_archive',
'/usr/bin/db_checkpoint',
'/usr/bin/db_deadlock',
'/usr/bin/db_dump',
'/usr/bin/db_hotbackup',
'/usr/bin/db_load',
'/usr/bin/db_log_verify',
'/usr/bin/db_printlog',
'/usr/bin/db_recover',
'/usr/bin/db_replicate',
'/usr/bin/db_sql_codegen',
'/usr/bin/db_stat',
'/usr/bin/db_tuner',
'/usr/bin/db_upgrade',
'/usr/bin/db_verify',
'/usr/bin/df',
'/usr/bin/diff',
'/usr/bin/diff3',
'/usr/bin/dirname',
'/usr/bin/dpkg',
'/usr/bin/dpkg-architecture',
'/usr/bin/dpkg-buildflags',
'/usr/bin/dpkg-buildpackage',
'/usr/bin/dpkg-checkbuilddeps',
'/usr/bin/dpkg-deb',
'/usr/bin/dpkg-distaddfile',
'/usr/bin/dpkg-divert',
'/usr/bin/dpkg-genbuildinfo',
'/usr/bin/dpkg-genchanges',
'/usr/bin/dpkg-gencontrol',
'/usr/bin/dpkg-gensymbols',
'/usr/bin/dpkg-maintscript-helper',
'/usr/bin/dpkg-mergechangelogs',
'/usr/bin/dpkg-name',
'/usr/bin/dpkg-parsechangelog',
'/usr/bin/dpkg-query',
'/usr/bin/dpkg-scanpackages',
'/usr/bin/dpkg-scansources',
'/usr/bin/dpkg-shlibdeps',
'/usr/bin/dpkg-source',
'/usr/bin/dpkg-split',
'/usr/bin/dpkg-statoverride',
'/usr/bin/dpkg-trigger',
'/usr/bin/dpkg-vendor',
'/usr/bin/find',
'/usr/bin/getconf',
'/usr/bin/getty',
'/usr/bin/gpg',
'/usr/bin/gpg-zip',
'/usr/bin/gpgsplit',
'/usr/bin/gpgv',
'/usr/bin/gssc',
'/usr/bin/hostinfo',
'/usr/bin/infocmp',
'/usr/bin/infotocap',
'/usr/bin/iomfsetgamma',
'/usr/bin/killall',
'/usr/bin/ldrestart',
'/usr/bin/locate',
'/usr/bin/login',
'/usr/bin/lzcat',
'/usr/bin/lzcmp',
'/usr/bin/lzdiff',
'/usr/bin/lzegrep',
'/usr/bin/lzfgrep',
'/usr/bin/lzgrep',
'/usr/bin/lzless',
'/usr/bin/lzma',
'/usr/bin/lzmadec',
'/usr/bin/lzmainfo',
'/usr/bin/lzmore',
'/usr/bin/ncurses5-config',
'/usr/bin/openssl',
'/usr/bin/pagesize',
'/usr/bin/passwd',
'/usr/bin/renice',
'/usr/bin/reset',
'/usr/bin/sbdidlaunch',
'/usr/bin/sbreload',
'/usr/bin/scp',
'/usr/bin/script',
'/usr/bin/sdiff',
'/usr/bin/sftp',
'/usr/bin/ssh',
'/usr/bin/ssh-add',
'/usr/bin/ssh-agent',
'/usr/bin/ssh-keygen',
'/usr/bin/ssh-keyscan',
'/usr/bin/sw_vers',
'/usr/bin/tabs',
'/usr/bin/tar',
'/usr/bin/tic',
'/usr/bin/time',
'/usr/bin/toe',
'/usr/bin/tput',
'/usr/bin/tset',
'/usr/bin/uiduid',
'/usr/bin/uiopen',
'/usr/bin/unlzma',
'/usr/bin/unxz',
'/usr/bin/update-alternatives',
'/usr/bin/updatedb',
'/usr/bin/which',
'/usr/bin/xargs',
'/usr/bin/xz',
'/usr/bin/xzcat',
'/usr/bin/xzcmp',
'/usr/bin/xzdec',
'/usr/bin/xzdiff',
'/usr/bin/xzegrep',
'/usr/bin/xzfgrep',
'/usr/bin/xzgrep',
'/usr/bin/xzless',
'/usr/bin/xzmore',
'/usr/lib/apt',
'/usr/lib/libapt-inst.2.0.0.dylib',
'/usr/lib/libapt-inst.2.0.dylib',
'/usr/lib/libapt-inst.dylib',
'/usr/lib/libapt-pkg.5.0.1.dylib',
'/usr/lib/libapt-pkg.5.0.dylib',
'/usr/lib/libapt-pkg.dylib',
'/usr/lib/libapt-private.0.0.0.dylib',
'/usr/lib/libapt-private.0.0.dylib',
'/usr/lib/libcrypto.1.0.0.dylib',
'/usr/lib/libcrypto.a',
'/usr/lib/libcrypto.dylib',
'/usr/lib/libcurses.a',
'/usr/lib/libdb-6.2.dylib',
'/usr/lib/libdb-6.dylib',
'/usr/lib/libdb.dylib',
'/usr/lib/libdb_sql-6.2.dylib',
'/usr/lib/libdb_sql-6.dylib',
'/usr/lib/libdb_sql.dylib',
'/usr/lib/libdpkg.a',
'/usr/lib/libdpkg.la',
'/usr/lib/libform.a',
'/usr/lib/libform_g.a',
'/usr/lib/liblzma.a',
'/usr/lib/liblzma.la',
'/usr/lib/libmenu.a',
'/usr/lib/libmenu_g.a',
'/usr/lib/libncurses.a',
'/usr/lib/libncurses_g.a',
'/usr/lib/libpanel.a',
'/usr/lib/libpanel_g.a',
'/usr/lib/libssl.1.0.0.dylib',
'/usr/lib/libssl.a',
'/usr/lib/libssl.dylib',
'/usr/lib/terminfo',
'/usr/lib/bash/',
'/usr/lib/engines/*',
'/usr/lib/pkgconfig/',
'/usr/lib/ssl/',
'/usr/libexec/bigram',
'/usr/libexec/code',
'/usr/libexec/frcode',
'/usr/libexec/rmt',
'/usr/libexec/sftp-server',
'/usr/libexec/ssh-keysign',
'/usr/libexec/ssh-pkcs11-helper',
'/usr/libexec/apt/',
'/usr/libexec/cydia/',
'/usr/libexec/dpkg/',
'/usr/libexec/gnupg/',
'/usr/local/lib/*',
'/usr/sbin/ac',
'/usr/sbin/accton',
'/usr/sbin/halt',
'/usr/sbin/iostat',
'/usr/sbin/mkfile',
'/usr/sbin/pwd_mkdb',
'/usr/sbin/reboot',
'/usr/sbin/sshd',
'/usr/sbin/startupfiletool',
'/usr/sbin/sysctl',
'/usr/sbin/vifs',
'/usr/sbin/vipw',
'/usr/sbin/zdump',
'/usr/sbin/zic',
'/usr/share/bash-completion/',
'/usr/share/bigboss/',
'/usr/share/dict/',
'/usr/share/doc/',
'/usr/share/dpkg/',
'/usr/share/gnupg/',
'/usr/share/tabset/',
'/usr/share/terminfo/*',
'/electra/',
'/.bootstrapped_electra',
'/bin/launchctl',
'/var/tmp/jailbreakd.pid',
'/var/run/jailbreakd.pid',
'/bin/bzip2_64',
'/bin/hostname',
'/Library/LaunchDaemons/0.reload.plist',
'/Library/LaunchDaemons/dropbear.plist',
'/Library/MobileSubstrate/DynamicLibraries/patcyh.plist',
'/Library/test_inject_springboard.cy',
'/private/etc/alternatives/README',
'/private/etc/pam.d/chkpasswd',
'/private/etc/pam.d/login',
'/private/etc/pam.d/other',
'/private/etc/pam.d/passwd',
'/private/etc/pam.d/samba',
'/private/etc/pam.d/sshd',
'/private/etc/pam.d/su',
'/private/etc/pam.d/sudo',
'/private/etc/profile.d/terminal.sh',
'/private/var/run/utmp',
'/usr/bin/apt',
'/usr/bin/apt-get',
'/usr/bin/chfn',
'/usr/bin/chsh',
'/usr/bin/cycc',
'/usr/bin/cycript',
'/usr/bin/cynject',
'/usr/bin/dselect',
'/usr/bin/env',
'/usr/bin/gnutar',
'/usr/bin/gtar',
'/usr/bin/ldid',
'/usr/bin/ncursesw5-config',
'/usr/lib/_ncurses',
'/usr/lib/libapt-inst.dylib.1.1',
'/usr/lib/libapt-inst.dylib.1.1.0',
'/usr/lib/libapt-pkg.dylib.4.6',
'/usr/lib/libapt-pkg.dylib.4.6.0',
'/usr/lib/libcurl.4.dylib',
'/usr/lib/libcurses.dylib',
'/usr/lib/libcycript.0.dylib',
'/usr/lib/libcycript.cy',
'/usr/lib/libcycript.db',
'/usr/lib/libcycript.dylib',
'/usr/lib/libcycript.jar',
'/usr/lib/libform.5.dylib',
'/usr/lib/libform.dylib',
'/usr/lib/libformw.5.dylib',
'/usr/lib/libformw.dylib',
'/usr/lib/libhistory.5.2.dylib',
'/usr/lib/libhistory.5.dylib',
'/usr/lib/libhistory.6.0.dylib',
'/usr/lib/libhistory.6.dylib',
'/usr/lib/libhistory.dylib',
'/usr/lib/liblzmadec.0.0.0.dylib',
'/usr/lib/liblzmadec.0.dylib',
'/usr/lib/liblzmadec.dylib',
'/usr/lib/liblzmadec.la',
'/usr/lib/libmenu.5.dylib',
'/usr/lib/libmenu.dylib',
'/usr/lib/libmenuw.5.dylib',
'/usr/lib/libmenuw.dylib',
'/usr/lib/libncurses.5.dylib',
'/usr/lib/libncurses.dylib',
'/usr/lib/libncursesw.5.dylib',
'/usr/lib/libncursesw.dylib',
'/usr/lib/libpam.1.0.dylib',
'/usr/lib/libpam.1.dylib',
'/usr/lib/libpam.dylib',
'/usr/lib/libpam_misc.1.dylib',
'/usr/lib/libpam_misc.dylib',
'/usr/lib/libpamc.1.dylib',
'/usr/lib/libpamc.dylib',
'/usr/lib/libpanel.5.dylib',
'/usr/lib/libpanel.dylib',
'/usr/lib/libpanelw.5.dylib',
'/usr/lib/libpanelw.dylib',
'/usr/lib/libpatcyh.dylib',
'/usr/lib/libreadline.5.2.dylib',
'/usr/lib/libreadline.5.dylib',
'/usr/lib/libreadline.6.0.dylib',
'/usr/lib/libreadline.6.dylib',
'/usr/lib/libreadline.dylib',
'/usr/lib/libsubstrate.0.dylib',
'/usr/libexec/MSUnrestrictProcess',
'/usr/libexec/reload',
'/usr/libexec/substrate',
'/usr/local/bin/dropbear',
'/usr/local/bin/dropbearconvert',
'/usr/local/bin/dropbearkey',
'/usr/local/lib/libluajit.a',
'/usr/sbin/start-stop-daemon',
'/usr/sbin/update',
'/usr/share/dict',
'/private/var/lib/dpkg/',
'/usr/libexec/cydia/' 
];
var common_paths = original_paths.concat(electra_paths);

Interceptor.attach(ObjC.classes.NSFileManager['- fileExistsAtPath:'].implementation, {
    onEnter: function (args) {

        // Use a marker to check onExit if we need to manipulate
        // the response.
        this.is_common_path = false;

        // Extract the path
        this.path = ObjC.Object(args[2]).toString();

        // check if the looked up path is in the list of common_paths
        if (common_paths.indexOf(this.path) >= 0) {

            // Mark this path as one that should have its response
            // modified if needed.
            this.is_common_path = true;
        }
    },
    onLeave: function (retval) {

        // check if the method call matched a common_path.
        // if that's the case, respond with a failure instead if needed.
        if (this.is_common_path) {

            if (retval != 0x0) {

                send({
                    status: 'success',
                    error_reason: NaN,
                    type: 'jailbreak-bypass',
                    data: 'A successful lookup for ' + this.path + ' occurred. Marking it as failed.'
                });

                retval.replace(0x0);
            }
        }
    }
});

// Hook fork() in libSystem.B.dylib and return 0
// TODO: Hook vfork
var libSystem_B_dylib_fork = Module.findExportByName('libSystem.B.dylib', 'fork');

if (libSystem_B_dylib_fork) {

    Interceptor.attach(libSystem_B_dylib_fork, {
        onLeave: function (retval) {

            send({
                status: 'success',
                error_reason: NaN,
                type: 'jailbreak-bypass',
                data: 'Making call to libSystem.B.dylib::fork() return 0x0'
            });

            retval.replace(0x0);
        }
    });
} else {

    send({
        status: 'error',
        error_reason: 'Unable to find libSystem.B.dylib::fork(). Running on simulator?',
        type: 'jailbreak-bypass',
        data: NaN
    });
}
