# D3 S1 : Wrapping Script

## Custom script with custom argument
```sh
#!/bin/bash
# Check if no arguments are provided
if [ $# -eq 0 ]; then
    echo "Error: No arguments provided."
    echo "Usage: ./script.sh <arg1> <arg2> ..."
    exit 1
fi

# If arguments are provided, process them
echo "Arguments provided: $@"

# Your script logic here
```
### Explanation:
1. Shebang Line: `#!/bin/bash`
This line tells the system to use the Bash shell to interpret the script.

2. Check if No Arguments are Provided:
`if [ $# -eq 0 ]; then` checks if the number of arguments (`$#`) is equal to zero.
If no arguments are provided, it prints an error message and usage instructions, then exits with a non-zero status (`exit 1`).

3. Process the Arguments:
If arguments are provided, `echo "Arguments provided: $@"` prints all the arguments (`$@`).

## Custom Github Push

```sh
#!/bin/bash

# Check if the commit message argument is provided
if [ $# -eq 0 ]; then
    echo "Error: No commit message provided."
    echo "Usage: ./push.sh <commit-message>"
    exit 1
fi

# Assign the commit message to a variable
commit_message="$1"

# Perform git add, commit, and push
git add .
git commit -m "$commit_message"
git push

# Check the exit status of git push to confirm if it was successful
if [ $? -eq 0 ]; then
    echo "Changes successfully pushed to the repository."
else
    echo "Failed to push changes to the repository."
fi
```

### Execute script
Add executable permission 
```sh
chmod +x push.sh
```