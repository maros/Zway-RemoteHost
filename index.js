/*** RemoteHost Z-Way HA module *******************************************

Version: 1.00
(c) Maroš Kollár, 2015
-----------------------------------------------------------------------------
Author: Maroš Kollár <maros@k-1.com>
Description:
    Handle remote hosts as binary switches.

******************************************************************************/

function RemoteHost (id, controller) {
    // Call superconstructor first (AutomationModule)
    RemoteHost.super_.call(this, id, controller);
}

inherits(RemoteHost, AutomationModule);

_module = RemoteHost;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

RemoteHost.prototype.init = function (config) {
    RemoteHost.super_.prototype.init.call(this, config);

    var self = this;
    var langFile = self.controller.loadModuleLang("RemoteHost");
    
    // Create vdev
    self.vDev = this.controller.devices.create({
        deviceId: "RemoteHost_" + this.id,
        defaults: {
            metrics: {
                probeTitle: 'remte',
                title: langFile.title,
                level: 'off',
                icon: '/ZAutomation/api/v1/load/modulemedia/RemoteHost/icon_off.png'
            }
        },
        overlay: {
            deviceType: 'switchBinary'
        },
        handler: function(command,args) {
            switch(command){
                case 'on':
                    self.handleOn();
                    break;
                case 'off':
                    self.handleOff();
                    break;
                case 'update':
                    setTimeout(_.bind(self.checkState,self),1);
                    break;
            }
        },
        moduleId: this.id
    });
    
    self.vDev.performCommand('update');
};

RemoteHost.prototype.stop = function () {
    var self = this;
    
    if (self.vDev) {
        self.controller.devices.remove(self.vDev.id);
        self.vDev = undefined;
    }
    
    RemoteHost.super_.prototype.stop.call(this);
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------

RemoteHost.prototype.handleOn = function() {
    var self = this;
    self.runCommand('on',self.config.mac);
};

RemoteHost.prototype.handleOff = function() {
    var self = this;
    self.runCommand('off',self.config.username,self.config.ip);
};

RemoteHost.prototype.checkState = function() {
    var self = this;
    var state = self.runCommand('check');
    self.vDev.set("metrics:level", state);
    self.vDev.set("metrics:icon", "/ZAutomation/api/v1/load/modulemedia/MotionTrigger/icon_"+state+".png");
};

RemoteHost.prototype.runCommand = function() {
    var self = this;
    
    var args    = Array.prototype.slice.call(arguments, 1);
    var command = '/opt/z-way-server/automation/modules/RemoteHist/remotehost ' + args.join(' ');
    var output  = system(command);
    return output.replace(/\n$/s,"");
}