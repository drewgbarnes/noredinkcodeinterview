//added index to keep track of which test was finished
function generateDummyTest(index) {
    var delay = 7000 + Math.random() * 7000;
    var testPassed = Math.random() > 0.5;

    return function(callback) {
        setTimeout(function() {
            callback(testPassed, index);
        }, delay);
    };
}

var tests = [
    { description: "commas are rotated properly", run: generateDummyTest(0) },
    { description: "exclamation points stand up straight", run: generateDummyTest(1) },
    { description: "run-on sentences don't run forever", run: generateDummyTest(2) },
    { description: "question marks curl down, not up", run: generateDummyTest(3) },
    { description: "semicolons are adequately waterproof", run: generateDummyTest(4) },
    { description: "capital letters can do yoga", run: generateDummyTest(5) },
    // { description: "easy to add new tests: just add it to this list with next index", run: generateDummyTest(6) }
];

var states = {
    not_started: 'Not Started Yet',
    running: 'Running',
    pass: 'Passed',
    fail: 'Failed'
};

var passed = 0,
    failed = 0,
    running = 0;

function onTestFinished(testPassed, index) {
    app.running -= 1;
    if (testPassed) {
        app.passed += 1;
        tests[index].state = states.pass;
    } else {
        app.failed += 1;
        tests[index].state = states.fail;
    }
    allTestsDone();
}

function allTestsDone() {
    if (app.running == 0) {
        $('#finished').show();
        $('#runbutton').show();
    }
}

function runTests() {
    app.passed = 0;
    app.failed = 0;
    app.running = 0;
    initTestStates();
    //not sure if this is ok for running "simulataneously" or should have dispatched all at once somehow
    for (var i = 0; i < tests.length; i++) {
        tests[i].run(onTestFinished);
        app.running += 1;
        tests[i].state = states.running;
        $('#runbutton').hide();
        $('#finished').hide();
    }

}

function initTestStates() {
    for (var i = 0; i < tests.length; i++) {
        tests[i].state = states.not_started;
    }
}
initTestStates();

var app = new Vue({
    el: '#app',
    data: {
        tests: tests,
        states: states,
        passed: passed,
        failed: failed,
        running: running
    }
})
