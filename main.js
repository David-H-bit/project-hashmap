class HashMap{
    constructor(loadFactor = 0.75, capacity = 16){
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    resize(){
        const oldBuckets = this.buckets;
        const oldSize = this.size;
        this.capacity *= 2;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);

        for(let bucket of oldBuckets){
            for(let [key, value] of bucket){
                this.set(key, value); 
            }
        }
    }

    hash(key) {
        key = String(key);
        let hashCode = 0;
        const prime = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (hashCode * prime + key.charCodeAt(i)) | 0;
        }
        return Math.abs(hashCode) % this.capacity;
    }

    set(key, value){
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(let i = 0; i < bucket.length; i++){
            const [k, v] = bucket[i];
            if(k === key){
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this.size++;
        if(this.size / this.capacity >= this.loadFactor){
            this.resize();
        }
    }

    get(key){
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(let [k, v] of bucket){
            if (k === key){
                return v;
            }
        }
        return undefined;
    }

    has(key){
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(let [k, v] of bucket){
            if (k === key){
                return true;
            }
        }
        return false;
    }

    remove(key){
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(let i = 0; i < bucket.length; i++){
            if(bucket[i][0] === key){
                bucket.splice(i, 1);
                this.size--; 
                return true;
            }
        }
        return false;
    }

    length(){
        return this.size; 
    }

    clear(){
        this.buckets = new Array(this.capacity).fill(null).map(() => []); 
        this.size = 0; 
    }

    keys(){
        let result = [];
        for(let bucket of this.buckets){
            for(let [k, v] of bucket){
                result.push(k);
            }
        }
        return result;
    }

    values(){
        let result = [];
        for(let bucket of this.buckets){
            for (let [k, v] of bucket){
                result.push(v);
            }
        }
        return result;
    }

    entries(){
        let result = [];
        for(let bucket of this.buckets){
            for (let [k, v] of bucket){
                result.push([k, v]);
            }
        }
        return result;
    }
}
