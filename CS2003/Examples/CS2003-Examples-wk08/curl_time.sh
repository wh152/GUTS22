#!/bin/bash

# not many comments in this script, but that is deliberate!

dir="https://tristan.host.cs.st-andrews.ac.uk/tmp/gifs"

# the first file in ${files} may have some clues

files="-I ${dir}/generate.sh"

for i in {1..500}; do
    files="${files} -I ${dir}/${i}.gif"
done

time curl -0 -s ${files} > /dev/null

time curl    -s ${files} > /dev/null

# more clues!

# man time

# man curl

# you could make curl more verbose if that might help
