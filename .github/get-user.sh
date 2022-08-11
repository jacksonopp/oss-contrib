#!/bin/bash

# get the user as the first argument
USERNAME=$1

echo "searching for user: $USERNAME"

# save a curl request to the server with the username as the last part of the url
res=$(curl -s "https://contribute.jacksonoppenheim.com/api/user/username/$USERNAME")

echo "result from server: $res"

# if res is ok, exit with 0, if res is not found, exit with 1, if any other error, exit with 2
if [ "$res" == "ok" ]; then
    echo "found user"
    exit 0
elif [ "$res" == "not found" ]; then
    echo "user not found"
    exit 1
else
    echo "server error: please open an issue on github"
    exit 2
fi
