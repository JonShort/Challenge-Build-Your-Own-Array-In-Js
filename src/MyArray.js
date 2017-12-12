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
    const getIndex = () => {
        let index = -1;
        for (let i = 0; i < this.length(); i += 1) {
            const value = this.get(i);
            if (value === element) {
                index = i;
                break;
            }
        }

        return index;
    };

    return getIndex();
};

MyArray.prototype.lastIndexOf = function (element) {
    const getLastIndex = () => {
        let index = -1;

        for (let i = this.length(); i > 0; i -= 1) {
            const value = this.get(i);
            if (value === element) {
                index = i;
                break;
            }
        }

        return index;
    };

    return getLastIndex();
};

MyArray.prototype.includes = function (element) {
    const doesExist = () => {
        let exists = false;

        for (let i = 0; i < this.length(); i += 1) {
            const value = this.get(i);
            if (value === element) {
                exists = true;
                break;
            }
        }

        return exists;
    };

    return doesExist();
};

MyArray.prototype.find = function (fn) {
    const getFirst = () => {
        let value = undefined;

        for (let i = 0; i < this.length(); i += 1) {
            const indexValue = this.get(i);
            if (fn(indexValue)) {
                value = indexValue;
                break;
            }
        }

        return value;
    };

    return getFirst();
};

MyArray.prototype.findIndex = function (fn) {
    const getIndex = () => {
        let index = -1;

        for (let i = 0; i < this.length(); i += 1) {
            const value = this.get(i);
            if (fn(value)) {
                index = i;
                break;
            }
        }

        return index;
    };

    return getIndex();
};

MyArray.prototype.equals = function (other) {
    const thisLength = this.length();
    const otherLength = other.length();
    const hasDifferentLength = thisLength !== otherLength;

    const progressiveCompare = () => {
        let matches = true;

        for (let i = 0; i < this.length(); i += 1) {
            if (this.get(i) !== other.get(i)) {
                matches = false;
                break;
            }
        }

        return matches;
    };

    if (hasDifferentLength) {
        return false;
    }

    return progressiveCompare();
};

MyArray.prototype.forEach = function (fn) {
    for (let i = 0; i < this.length(); i += 1) {
        fn(this.get(i), i);
    }
};

MyArray.prototype.join = function (separator) {

};

MyArray.prototype.toString = function () {

};

MyArray.prototype.map = function (fn) {

};

MyArray.prototype.filter = function (fn) {

};

MyArray.prototype.some = function (fn) {

};

MyArray.prototype.every = function (fn) {

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