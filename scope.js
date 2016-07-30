// Steps
// 1. Register watchers
// 2. Make digest loop
// 3. Check if value has changed
// 4. Setting initial value for lastVal
// 5. Dirty Check
// 6. Digest while any watcher is dirty
// 7. TTL limit, infinite loop protection
// 8. Value-based optimization
// 9. Check for NaNs
// 10. Async Queue
// 11. Scope Phases
// 12. Post digest
// 13. Exceptions
// 14. Remove watcher
// 15. WatchGroup Method

function Scope() {

    // Watchers array
    this.$$watchers = [];

    // Async Queue
    this.$$asyncQueue = [];

    // Post Digest
    this.$$postDigestQueue = [];

    // Phases
    this.$$phase = null;

};

// Initial uniq value for wathcher's last property
function initWatcher() {
};

// Watch ------------------------------------------------------------------------------------------------------------------------------------------------
Scope.prototype.$watch = function (watchFn, listenerFn, equalValueFlag) {
    var watcherIndex;
    var watchObj = {
        watcher: watchFn,
        listener: listenerFn || function () {
        },
        last: initWatcher,
        equalByValue: !!equalValueFlag
    };

    this.$$watchers.unshift(watchObj);

    // Watcher remover
    return function (watchObj) {
        watcherIndex = _.indexOf(this.$$watchers, watchObj);
        if (watcherIndex >=0 ) {
            this.$$watchers.splice(watcherIndex,1);
        }
    }
};

// Digest  ------------------------------------------------------------------------------------------------------------------------------------------------
Scope.prototype.$digest = function () {
    var _this = this;
    var dirty;
    var maxCycles = 10;
    var asyncTask;

    this.$startPhase('$digest phase');
    do {
        // Async Queue
        while (this.$$asyncQueue.length) {
            asyncTask = this.$$asyncQueue.shift();
            asyncTask.scope.$eval(asyncTask.expression, asyncTask.args);
        }

        dirty = _this.$digestOnce();

        // Infinite loop protection
        if ((dirty || this.$$asyncQueue.length) && (maxCycles = 0)) {
            throw "Max iterations limit reached";
        }

        // Post Digest
        while (this.$$postDigestQueue.length) {
            try {
                this.$$postDigestQueue.shift()();
            } catch(e) {
                console.error(e);
            }

        }
        maxCycles--;

    } while (dirty || this.$$asyncQueue.length);

    this.$endPhase();
};

Scope.prototype.$digestOnce = function () {
    var _this = this;
    var oldVal;
    var newVal;
    var dirty = false;

    _.forEachRight(this.$$watchers, function (watchObj) {
        try {
            newVal = watchObj.watcher(_this);
            oldVal = watchObj.last;

            if (!_this.$checkEquality(newVal, oldVal, watchObj.equalByValue)) {

                // setting last value for watcher object
                watchObj.last = (watchObj.equalByValue ? _.cloneDeep(newVal) : newVal);

                // check for initial value for oldVal
                watchObj.listener(newVal, (oldVal === initWatcher ? newVal : oldVal), _this);

                // mark as dirty
                dirty = true;
            }
        } catch (e) {
            console.error(e);
        }
    });
    // return if current watcher is dirty or not
    return dirty;
};

Scope.prototype.$checkEquality = function (newVal, oldVal, equalByValue) {
    if (equalByValue) {
        // check for reference data types
        return _.isEqual(newVal, oldVal);
    } else {
        // check for primitive data types & NaN
        return (newVal === oldVal) || (_.isNumber(newVal) && _.isNumber(oldVal) && _.isNaN(newVal) && _.isNaN(oldVal));
    }
};

// Async Queue ------------------------------------------------------------------------------------------------------------------------------------------------
Scope.prototype.$eval = function (expression, arg) {
    try {
        return expression(this, arg);
    } catch (e) {
        console.error(e);
    }
};

Scope.prototype.$apply = function (func) {
    try {
        this.$beginPhase('$apply phase');
        //evaluating expression
        this.$eval(func);
    } finally {
        // starting loop after evaluating expression
        this.$digest();
        this.$endPhase();
    }
};

Scope.prototype.$evalAsync = function (expression) {
    var _this = this;

    // if no current phase and async queue is not empty - start $digest after a slight timeout
    if (!_this.$$phase && !_this.$$asyncQueue.length) {
        setTimeout(function () {
            if (_this.$$asyncQueue.length) {
                _this.$digest();
            }
        }, 0);
    }

    // adding task to async queue
    this.$$asyncQueue.push({
        expression: expression,
        scope: _this
    });
};

// Phases ------------------------------------------------------------------------------------------------------------------------------------------------
Scope.prototype.$startPhase = function (phase) {
    // if no current phase, start new
    if (this.$$phase) {
        throw this.$$phase + ' is already running!';
    } else {
        this.$$phase = phase;
    }
};

Scope.prototype.$endPhase = function () {
    // end current phase
    this.$$phase = null;
};

// Post Digest ------------------------------------------------------------------------------------------------------------------------------------------------
Scope.prototype.$postDigest = function (expression) {
    // adding task to $postDigest
    this.$$postDigestQueue.push(expression);
};


// Watch Group Method ------------------------------------------------------------------------------------------------------------------------------------------------
Scope.prototype.$watchGroup = function(watchFuncs, listenerFn) {
    var _this = this;

    var watchersCount = watchFuncs.length;
    var newVals = new Array(watchersCount);
    var oldVals = new Array(watchersCount);

    var removeWatchersArray = [];

    // if any watchers specified
    if (watchFuncs.length) {
        _.forEach(watchFuncs, function (watcherFn, i) {

            // collecting new and old values into custom listener function
            var removeWatch = _this.$watch(watcherFn, function watchMulti(newVal, oldVal) {
                newVals[i] = newVal;
                oldVals[i] = oldVal;
                _this.$evalAsync(executeListener);
            });

            // adding remove watch functions into array
            removeWatchersArray.push(removeWatch);
        });

        function executeListener() {
            listenerFn(newVals, oldVals, _this);
        }

        return function removeWatchers() {
            while(removeWatchersArray.length) {
                removeWatchersArray.shift()();
            }
        }
    } else {
        //if no watchers specified simply evaluate listener async
        _this.$evalAsync(listenerFn(newVals, oldVals, _this));
    }

};