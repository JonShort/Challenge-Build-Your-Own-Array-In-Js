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
        return null;
    }

    if (isValidIndex) {
        this.elements[index] = value;
        this.size = (index + 1);
        return null;
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
    if (this.length() > 0) {
        const finalIndex = (this.length() - 1);
        const finalItem = this.elements[finalIndex];

        this.elements[finalIndex] = undefined;
        this.size -= 1;

        return finalItem;
    }

    return undefined;
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
        let doSomeMatch = false;

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
        let doAllMatch = true;

        for (let i = 0; i < baseArray.length(); i += 1) {
            const currentValue = baseArray.get(i);
            const funcIsSatisfied = func(currentValue);
    
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

};

MyArray.prototype.reverse = function () {

};

MyArray.prototype.shift = function () {

};

MyArray.prototype.unshift = function (element) {

};

MyArray.prototype.slice = function (start, end) {

};

MyArray.prototype.splice = function (start, deleteCount) {

};