# Zway-RemoteHost

Creates a switch that controls and checks the status of a remote host.

* Turning on is done via Wake on LAN. Since WOL packets are not routable, 
zway and the target host must reside in the same network.
* Turning off is handled via SSH. You must ensure that the user running zway
(usually root) has its public SSH key on the target machine
* Checking is done via ping

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
host. The state of the host is checked regularly by pinging the machine.

# Installation`

Install ethtool for Wake on LAN

```shell
sudo apt-get install ethtool
``

Allow module to call the remotehost command and make helper executable

```shell
echo '/opt/z-way-server/automation/modules/RemoteHost/remotehost' >> /opt/z-way-server/automation/.syscommands
chmod a+x /opt/z-way-server/automation/modules/RemoteHost/remotehost
```

Create SSH key and copy to target machine
```shell
sudo su # change to the user running zway
ssh-keygen -t rsa -b 3072 -C "myname@zway.me"
ssh-copy-id -i ~/.ssh/id_rsa.pub remote-host

Now install

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
