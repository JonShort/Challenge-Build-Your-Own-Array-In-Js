function MyArray(initialCapacity) {
    if (initialCapacity === undefined) {
        initialCapacity = 3;
    }

    this.elements = new PlainArray(initialCapacity);
    this.size = 0;
}

MyArray.prototype.length = function () {
    return this.size;
};

MyArray.prototype.push = function (value) {
    const lastItem = this.length();

    this.elements[lastItem] = value;
    this.size += 1;
};

MyArray.prototype.get = function (index) {
    return this.elements[index];
};

MyArray.prototype.set = function (index, value) {
    const isValidIndex = index >= 0;
    const isExistingItem = isValidIndex && index < this.length();

    if (isExistingItem) {
        this.elements[index] = value;
        return;
    }

    if (isValidIndex) {
        this.elements[index] = value;
        this.size = (index + 1);
        return;
    }

    throw `Can't set value of item in position ${index} - index is below 0`;
};

MyArray.of = function (...args) {
    const baseArray = new MyArray(args.length);
    let populatedArray = baseArray;

    for (i = 0; i < args.length; i += 1) {
        populatedArray.set(i, args[i]);
    }

    return populatedArray;
};

MyArray.prototype.pop = function () {
    if (this.length() <= 0) {
        return undefined;
    }

    const finalIndex = (this.length() - 1);
    const finalItem = this.get(finalIndex);

    this.elements[finalIndex] = undefined;
    this.size -= 1;

    return finalItem;
};

MyArray.prototype.concat = function (other) {
    const overallLength = this.length() + other.length();
    let newArray = new MyArray(overallLength);

    for (let i = 0; i < overallLength; i += 1) {
        if (i < this.length()) {
            newArray.set(i, this.get(i));
        } else {
            newArray.set(i, other.get(i - this.length()));
        }
    }

    return newArray;
};

MyArray.prototype.indexOf = function (element) {
    const getIndex = (matcher) => {
        let index = -1;
        for (let i = 0; i < this.length(); i += 1) {
            const value = this.get(i);
            if (value === matcher) {
                index = i;
                break;
            }
        }

        return index;
    };

    return getIndex(element);
};

MyArray.prototype.lastIndexOf = function (element) {
    const getLastIndex = (matcher) => {
        let index = -1;

        for (let i = this.length(); i > 0; i -= 1) {
            const value = this.get(i);
            if (value === matcher) {
                index = i;
                break;
            }
        }

        return index;
    };

    return getLastIndex(element);
};

MyArray.prototype.includes = function (element) {
    const doesExist = (matcher) => {
        let exists = false;

        for (let i = 0; i < this.length(); i += 1) {
            const value = this.get(i);
            if (value === matcher) {
                exists = true;
                break;
            }
        }

        return exists;
    };

    return doesExist(element);
};

MyArray.prototype.find = function (fn) {
    const getFirst = (func) => {
        let value = undefined;

        for (let i = 0; i < this.length(); i += 1) {
            const indexValue = this.get(i);
            if (func(indexValue)) {
                value = indexValue;
                break;
            }
        }

        return value;
    };

    return getFirst(fn);
};

MyArray.prototype.findIndex = function (fn) {
    const getIndex = (func) => {
        let index = -1;

        for (let i = 0; i < this.length(); i += 1) {
            const value = this.get(i);
            if (func(value)) {
                index = i;
                break;
            }
        }

        return index;
    };

    return getIndex(fn);
};

MyArray.prototype.equals = function (other) {
    const thisLength = this.length();
    const otherLength = other.length();
    const hasDifferentLength = thisLength !== otherLength;

    const progressiveCompare = (array) => {
        let matches = true;

        for (let i = 0; i < this.length(); i += 1) {
            if (this.get(i) !== array.get(i)) {
                matches = false;
                break;
            }
        }

        return matches;
    };

    if (hasDifferentLength) {
        return false;
    }

    return progressiveCompare(other);
};

MyArray.prototype.forEach = function (fn) {
    for (let i = 0; i < this.length(); i += 1) {
        fn(this.get(i), i);
    }
};

MyArray.prototype.join = function (separator) {
    const resolveSeparator = (userChoice) => {
        if (userChoice === '') {
            return userChoice;
        }
        
        return userChoice || ',';
    }

    let stringValue = null;
    for (let i = 0; i < this.length(); i +=1) {
        if (!stringValue) {
            stringValue = String(this.get(i));
        } else {
            stringValue =
                stringValue +
                resolveSeparator(separator) +
                String(this.get(i));
        }
    }

    return stringValue;
};

MyArray.prototype.toString = function () {
    let stringValue = null;
    for (let i = 0; i < this.length(); i +=1) {
        if (!stringValue) {
            stringValue = String(this.get(i));
        } else {
            stringValue =
                stringValue +
                ',' +
                String(this.get(i));
        }
    }

    return stringValue;
};

MyArray.prototype.map = function (fn) {
    const fillNewArray = (baseArray, func) => {
        let newArray = new MyArray();

        for (let i = 0; i < baseArray.length(); i += 1) {
            const value = func(baseArray.get(i));

            newArray.push(value);
        }

        return newArray;
    };

    return fillNewArray(this, fn);
};

MyArray.prototype.filter = function (fn) {
    const fillNewArray = (baseArray, func) => {
        let newArray = new MyArray();

        for (let i = 0; i < baseArray.length(); i += 1) {
            const currentValue = baseArray.get(i);
            const funcIsSatisfied = func(currentValue);

            if(funcIsSatisfied) {
                newArray.push(currentValue);
            }
        }

        return newArray;
    };

    return fillNewArray(this, fn);
};

MyArray.prototype.some = function (fn) {
    const checkValues = (baseArray, func) => {
        // By default, assume no values match the statement in the fn argument
        let doSomeMatch = false;

        // Iterate through the array
        for (let i = 0; i < baseArray.length(); i += 1) {
            const currentValue = baseArray.get(i);
            const funcIsSatisfied = func(currentValue);
    
            if(funcIsSatisfied) {
                doSomeMatch = true;
                break;
            }
        }

        return doSomeMatch;
    }

    return checkValues(this, fn);
};

MyArray.prototype.every = function (fn) {
    const checkValues = (baseArray, func) => {
        // By default, assume values match the statement within the fn argument
        let doAllMatch = true;

        // Iterate through array
        for (let i = 0; i < baseArray.length(); i += 1) {
            const currentValue = baseArray.get(i);
            const funcIsSatisfied = func(currentValue);

            // If function returns false, modify the variable and stop the loop
            if(!funcIsSatisfied) {
                doAllMatch = false;
                break;
            }
        }

        return doAllMatch;
    }

    return checkValues(this, fn);
};

MyArray.prototype.fill = function (value, start, end) {
    // If no arguments exist, start and end are relative to array
    const first = start || 0;
    const last = end || this.length();

    // Iterate from first to last, setting each key to the value argument
    for (let i = first; i < last; i += 1) {
        this.set(i, value);
    }

    return;
};

MyArray.prototype.reverse = function () {
    /*
        Iterate through half the array, keeping track of both the 
        current loop iteration (lowKey - iteration number) and
        it's 'mirror' (highkey - greatest position in the array minus iteration number)
    */
    for (let i = 0; i < this.length() / 2; i += 1) {
        const lastKey = this.length() - 1;
        const lowKey = i;
        const highKey = lastKey - i;

        // Get the items from each position
        const lowValue = this.get(lowKey);
        const highValue = this.get(highKey);

        // Set the items in the correct positions
        this.set(lowKey, highValue);
        this.set(highKey, lowValue);
    }

    return;
};

MyArray.prototype.shift = function () {
    // If array is empty, return undefined
    if (this.length() <= 0) {
        return undefined;
    }

    // Get the value at position 0 (this will be removed)
    const removedValue = this.get(0);

    // Iterate through the array (increasing), and copy each value to the position 1 above the current
    for (let i = 0; i < this.length(); i += 1) {
        const newValue = this.get(i + 1);
        this.set(i, newValue);
    }

    // Pop the last value from the array (see pop function method for more details)
    this.pop()

    // Return the value which was at position 0 (now removed)
    return removedValue;
};

MyArray.prototype.unshift = function (element) {
    // If array is empty, add the value and return
    if (this.length() <= 0) {
        this.push(element);

        return;
    }

    // Get the current last item and push a copy onto the end of the array
    const finalItemKey = this.length() - 1;
    this.push(this.get(finalItemKey));

    // Iterate through the array (decreasing), and copy each value to the position 1 below the current
    for (let i = finalItemKey; i > 0; i -= 1) {
        const newValue = this.get(i - 1);
        this.set(i, newValue);
    }

    // Set the value at position 0 to argument value
    this.set(0, element);

    return;
};

MyArray.prototype.slice = function (start, end) {
    const checkExists = (v, fallback) => {
        if (v === 0) {return v};
        if (v) {return v};
        return fallback;
    };
    const startPos = checkExists(start, 0);
    const endPos = checkExists(end, this.length());
    const size = endPos - startPos;
    // Initiate the array to expect the correct size
    let newArray = new MyArray(size);

    // Iterate through the base array, from start to end and push the new values into the new array
    for (let i = startPos; i < endPos; i += 1) {
        newArray.push(this.get(i));
    }

    return newArray;
};

MyArray.prototype.splice = function (start, deleteCount, ...items) {
    // If deleteCount wasn't provided, get the number of items after start
    const resolvedDeleteCount = (deleteCount || deleteCount === 0) || this.length() - start;

    // Determine where to stop deleting values
    const end = start + resolvedDeleteCount;

    // Make a new array with items which will be deleted
    const slicedItems = this.slice(start, end);

    // Make a new array with items in positions before those which will be deleted
    const preDeleteItems = this.slice(0, start);

    // Make a new array with items in positions after those which will be deleted
    const postDeleteItems = this.slice(end, this.length());

    // Make a new MyArray of argument items
    const argumentItems = new MyArray.of(...items);

    // Make a new array, adding pre-delete items with argument items
    const preWithArguments = preDeleteItems.concat(argumentItems);

    // Make a new array, with the values which weren't deleted added to pre + argument array
    const finalArray = preWithArguments.concat(postDeleteItems);

    // Change the elements in the parent array
    this.elements = finalArray.elements;
    this.size = finalArray.size;

    return slicedItems;
};
