# Zway-RemoteHost

TODO

# Configuration

## ip

IP address of the remote host

## username

Username for the remote host

## mac

MAC address for the remote host

# Events

No events are emitted

# Virtual Devices

This module creates a virtual binary switch that turns on/off a remote Linux
host.

# Installation`

Install ethtool for wake on lan

```shell
sudo apt-get install ethtool
``

Allow module to call remotehost command and make helper executable

```shell
echo '/opt/z-way-server/automation/modules/RemoteHost/remotehost' >> /opt/z-way-server/automation/.syscommands
chmod a+x /opt/z-way-server/automation/modules/RemoteHost/remotehost
```

```shell
cd /opt/z-way-server/automation/modules
git clone https://github.com/maros/Zway-RemoteHost.git RemoteHost --branch latest
```

To update or install a specific version
```shell
cd /opt/z-way-server/automation/modules/RemoteHost
git fetch --tags
# For latest released version
git checkout tags/latest
# For a specific version
git checkout tags/1.02
# For development version
git checkout -b master --track origin/master
```

# License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or any 
later version.

Computer tower icon by Zlatko Najdenovski from the Noun Project

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
