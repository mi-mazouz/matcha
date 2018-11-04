#!/bin/bash

apt-get update && apt-get install -y gnupg && apt-get install -y gawk

cd /tmp && git clone https://github.com/sobolevn/git-secret.git git-secret
cd git-secret && make build && PREFIX="/usr/local" make install && cd /tmp

echo ${GPG_PRIVATE_KEY} | base64 --decode > gpg_private.key

gpg --batch --import gpg_private.key

cd /root/project

git secret tell ${GPG_UID}
git secret reveal -p ${GPG_PASSPHRASE}
rm **/*.secret
