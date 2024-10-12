var LRUCache = function(capacity){
    this.limit = capacity;
    this.cache = new Map();
}

LRUCache.prototype.get = function(key){
    let temp;
    if(this.cache.has(key)){
        temp = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key,temp);
    }
    return temp ?? -1;
}

LRUCache.prototype.put = function(key,value){
    if(this.cache.has(key)){
        this.cache.delete(key);
    }
    this.cache.set(key,value);
    if(this.cache.size > this.limit){
        this.cache.delete(this.cache.keys().next().value);
    }
}