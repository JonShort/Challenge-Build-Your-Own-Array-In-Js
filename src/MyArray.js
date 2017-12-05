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

};

MyArray.prototype.lastIndexOf = function (element) {

};

MyArray.prototype.includes = function (element) {

};

MyArray.prototype.find = function (fn) {

};

MyArray.prototype.findIndex = function (fn) {

};

MyArray.prototype.equals = function (other) {

};

MyArray.prototype.forEach = function (fn) {

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