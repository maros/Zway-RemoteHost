# Zway-RemoteHost

Creates a switch that controls and checks the status of a remote host.

* Turning on is done via Wake on LAN. Since WOL packets are not routable,
zway and the target host must reside in the same network.
* Turning off is handled via SSH. You must ensure that the user running zway
(usually root) has its public SSH key on the target machine
* Checking is done via ping

# Configuration

## ip

IP address of the remote host (must be in the same network)

## username

Username for the remote host

## mac

MAC address of the remote host

# Events

No events are emitted

# Virtual Devices

This module creates a virtual binary switch that turns on/off a remote Linux
host. The state of the host is checked regularly by pinging the ip addres.

# Installation`

Install ethtool to get Wake on LAN (make sure that WOL is enabled on the
remote host). On debian(raspbian) this can be done running this command
```shell
sudo apt-get install ethtool
```

Create a SSH key pair and copy the public key to target machine
```shell
sudo su # change to the user running zway (usually root)
ssh-keygen -t rsa -b 3072 -C "yourname@zway.me"
ssh-copy-id -i ~/.ssh/id_rsa.pub remote-host
```

The prefered way of installing this module is via the "Zwave.me App Store"
available in 2.2.0 and higher. For stable module releases no access token is
required. If you want to test the latest pre-releases use 'k1_beta' as
app store access token.

Allow module to call the remote host command and make helper executable
```shell
echo '/opt/z-way-server/automation/userModules/RemoteHost/remotehost' >> /opt/z-way-server/automation/.syscommands
chmod a+x /opt/z-way-server/automation/userModules/RemoteHost/remotehost
```

For developers and users of older Zway versions installation via git is
recommended.

```shell
cd /opt/z-way-server/automation/userModules
git clone https://github.com/maros/Zway-RemoteHost.git RemoteHost --branch latest
```

To update or install a specific version
```shell
cd /opt/z-way-server/automation/userModules/RemoteHost
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
