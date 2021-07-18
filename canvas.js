let canvas, width4, height4;
let order = 11, counter = 0;
let n;
let totalPoints;
let curvePath;

function hilbert(i) {
    const points = [
        new PointV(0, 0),
        new PointV(0, 1),
        new PointV(1, 1),
        new PointV(1, 0),
    ];

    let index = i & 3;
    let tempPoint = points[index];

    for (let j = 1; j < order; j++) {
        i = i >>> 2;
        index = i & 3;

        const len = pow(2, j);
        if (index === 0) {
            let temp = tempPoint[0];
            tempPoint.set(tempPoint[1], temp);
        } else if (index === 1) {
            tempPoint.add(0, len);
        } else if (index === 2) {
            tempPoint.add(len);
        } else if (index == 3) {
            let temp = len - 1 - tempPoint[0];
            tempPoint.set((len - 1 - tempPoint[1]) + len, temp);
        }
    }

    return tempPoint;
}

function calcHilbert() {
    const len = height / n;
    for (let i = 0; i < totalPoints; i++)
        curvePath[i] =
            hilbert(i)
                .mult(len)
                .add(len / 2);
}

function setup() {
    // canvas = createCanvas(window.innerHeight, window.innerHeight);
    canvas = createCanvas(1024 * 4, 1024 * 4);
    const mainNodeDOM = canvas.parent();
    canvas.parent("canvas-container");
    mainNodeDOM.remove();

    width4 = width / 4;
    height4 = height / 4;
    n = pow(2, order);
    totalPoints = n * n;
    curvePath = [];
    calcHilbert();

    colorMode(HSB);
    console.log(curvePath);
    background(220);
    noFill();
    strokeWeight(2);
    for (let i = 1; i < totalPoints; i++) {
        stroke(map(i, 1, totalPoints, 0, 360), 100, 100);
        // stroke(i % 360, 100, 100);
        line(
            curvePath[i][0], curvePath[i][1],
            curvePath[i - 1][0], curvePath[i - 1][1]
        );
    }
}

// function draw() {
//     drawCurve()
// }

function drawCurveIndex(path) {
    for (let i = 0; i < path.length; i++) {
        const p = path[i];
        stroke(230, 70, 100);
        strokeWeight(6);
        point(p[0], p[1]);
        strokeWeight(1);
        text(i, p[0] + 5, p[1]);
    }
}

function drawCurve() {
    background(220);
    noFill();
    strokeWeight(2);
    for (let i = 1; i < counter; i++) {
        stroke(map(i, 1, totalPoints, 0, 360), 100, 100);
        // stroke(i % 360, 100, 100);
        line(
            curvePath[i][0], curvePath[i][1],
            curvePath[i - 1][0], curvePath[i - 1][1]
        );
    }

    counter += 500;
    if (counter >= curvePath.length) counter = 0;
}
