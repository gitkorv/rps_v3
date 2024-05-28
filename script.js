// Grab basic variables
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
// Grab panels
let topPanel = document.querySelector(".cube__panel-top");
let backPanel = document.querySelector(".cube__panel-back");
let rightPanel = document.querySelector(".cube__panel-right");
let leftPanel = document.querySelector(".cube__panel-left");
let bottomPanel = document.querySelector(".cube__panel-bottom");

// Grab buttons
let scissorBtn = document.querySelector(".panel-bottom__btn--scissor");
let rpsBtnsAll = Array.from(document.querySelectorAll(".panel-bottom__btn"));
// Grab text/span in btns
let scissorBtnSpan = scissorBtn.querySelector("span");
const rpsBtnSpansAll = rpsBtnsAll.map(btn => btn.querySelector("span"));

let scissorBtnWidth = scissorBtn.offsetWidth;
let scissorBtnSpanWidth = scissorBtnSpan.getBoundingClientRect().width;
let originalRPSButtonSizeWidth = scissorBtnSpanWidth;

function increaseFontSizeUntilWidth(spanClass, targetWidth, increment) {
    let span = document.querySelector(spanClass)
    let currentWidth = span.offsetWidth;
    let fontSize = parseInt(window.getComputedStyle(span).fontSize)

    if (currentWidth >= targetWidth) {
        rpsBtnSpansAll.forEach(span => {
            span.style.fontSize = "2px";
        })
    }

    while (currentWidth * 1.11 < targetWidth) {
        fontSize += increment;
        rpsBtnSpansAll.forEach(span => {
            span.style.fontSize = fontSize + "px";
        })
        currentWidth = span.offsetWidth;
    }
}

increaseFontSizeUntilWidth(".scissor-span", scissorBtnWidth, 2)

function resizeThings() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    scissorBtnWidth = scissorBtn.offsetWidth;
    scissorBtnSpanWidth = scissorBtnSpan.getBoundingClientRect().width;
    // increaseFontSizeUntilWidth(".scissor-span", scissorBtnWidth, 2)
    adjustRockPaperScissorFontSizeOnResize(scissorBtnWidth, scissorBtnSpanWidth)
}

window.addEventListener('resize', resizeThings);

let rpsSpanFontSize = window.getComputedStyle(scissorBtnSpan).fontSize;

function adjustRockPaperScissorFontSizeOnResize(scissorBtnWidth, scissorBtnSpanWidth) {
    rpsSpanFontSize = window.getComputedStyle(scissorBtnSpan).fontSize;
    let fontSizeXValue = parseInt(rpsSpanFontSize) / parseInt(scissorBtnSpanWidth) * 0.65;

    rpsBtnSpansAll.forEach(span => {
        let newSize = scissorBtnWidth * fontSizeXValue;
        if (newSize < 1) { newSize = 1; }
        span.style.fontSize = newSize + "px";
    })

}
// Slide in rps buttons
function slideInButtons() {
    let animDelay = .75;

    for (let i = 0; i < rpsBtnsAll.length; i++) {
        rpsBtnsAll[i].classList.add("slide-in-from-left");
        rpsBtnsAll[i].style.animationDelay = animDelay * i + "s";
    }
}

slideInButtons()

function createCubeText({
    wordString = "text",
    fromPanel = rightPanel,
    toPanel = backPanel,
    transitionDuration = "1000ms",
    rows = "2-10",
    cols = "2-10",
    placeSelf = "center center",
    runNext = false
} = {}) {

    console.log(rows.split("-"));
    let gridArea = `${rows.split("-")[0]} / ${cols.split("-")[0]} / ${rows.split("-")[1]}  / ${cols.split("-")[1]}`;
    console.log(gridArea);
    let orientMeFrom = "";
    let directionRootMargin = "";
    let entryGridContentArea = document.createElement("div");
    let destinationGridContentArea = document.createElement("div");

    if (fromPanel === topPanel) {
        orientMeFrom = "top";
        directionRootMargin = "-99% 0px 0px 0px";
    }
    if (fromPanel === rightPanel) {
        orientMeFrom = "right";
        directionRootMargin = "0px -99% 0px 0px";
    }
    if (fromPanel === bottomPanel) {
        orientMeFrom = "bottom";
        directionRootMargin = "0px 0px -99% 0px";
    }
    if (fromPanel === leftPanel) {
        orientMeFrom = "left";
        directionRootMargin = "0px 0px 0px -99%";
    }

    console.log(orientMeFrom);


    let entryContainerGrid = document.createElement("div");
    let destinationContainerGrid = document.createElement("div");

    let entryContainerSpan = document.createElement("span");
    let destinationContainerSpan = document.createElement("span");

    let gridContentAreasArray = [entryGridContentArea, destinationGridContentArea];

    let basePanelsArray = [fromPanel, toPanel];

    let spans = [entryContainerSpan, destinationContainerSpan];
    let containerGrids = [entryContainerGrid, destinationContainerGrid];

    // Get height and width of destination container
    const destinationContainerWidth = toPanel.offsetWidth;
    const destinationContainerHeight = toPanel.offsetHeight;

    for (let i = 0; i < containerGrids.length; i++) {
        containerGrids[i].classList.add("panel-container-grid");
        containerGrids[i].style.height = destinationContainerHeight + "px";
        containerGrids[i].style.width = destinationContainerWidth + "px";
        containerGrids[i].appendChild(gridContentAreasArray[i]);
        gridContentAreasArray[i].classList.add("container-grid-content-area");
        gridContentAreasArray[i].style.gridArea = gridArea;
        gridContentAreasArray[i].appendChild(spans[i]);
        spans[i].classList.add("panel-span");
        spans[i].style.placeSelf = placeSelf;
        spans[i].innerHTML = wordString;
        basePanelsArray[i].appendChild(containerGrids[i]);
    }

    let entryContainerHeightOrWidth;
    let destinationContainerHeightOrWidth;
    let widthOrHeight;

    if (orientMeFrom === "top" || orientMeFrom === "bottom") {
        entryContainerHeightOrWidth = fromPanel.offsetHeight;
        destinationContainerHeightOrWidth = toPanel.offsetHeight;
        widthOrHeight = "height";
    }
    if (orientMeFrom === "right" || orientMeFrom === "left") {
        entryContainerHeightOrWidth = fromPanel.offsetWidth;
        destinationContainerHeightOrWidth = toPanel.offsetWidth;
        widthOrHeight = "width";
    }

    entryContainerGrid.style[widthOrHeight] = destinationContainerHeightOrWidth + "px";
    entryContainerGrid.style[orientMeFrom] = - destinationContainerHeightOrWidth + "px";
    entryContainerGrid.classList.add("transition-added", "transition-" + orientMeFrom);
    entryContainerGrid.style.transitionDuration = transitionDuration;

    let containerGridContentAreaHeight = destinationGridContentArea.offsetHeight;
    let containerGridContentAreaWidth = destinationGridContentArea.scrollWidth;
    console.log("gridcontentAreaH: " + containerGridContentAreaHeight);
    console.log("gridcontentAreaW: " + containerGridContentAreaWidth);

    let destinationContainerSpanWidth = destinationContainerSpan.offsetWidth;
    let destinationContainerSpanHeight = destinationContainerSpan.offsetHeight;
    // Get the inital fontsize
    let spanFontSize = parseInt(window.getComputedStyle(destinationContainerSpan).fontSize);
    console.log(spanFontSize);


    console.log("spanWidth: " + destinationContainerSpanWidth, "GridAreaWidth: " + containerGridContentAreaWidth);
    console.log("spanHeight: " + destinationContainerSpanHeight, "GridAreaHeight: " + containerGridContentAreaHeight);


    // if the fontsize currently is bigger than the container set fontsize to 2px
    if (destinationContainerSpanWidth > containerGridContentAreaWidth || destinationContainerSpanHeight > containerGridContentAreaHeight) {
        console.log("it's too small");
        spans.forEach(span => {
            span.style.fontSize = "1px";
        })
    }
    destinationContainerSpanWidth = destinationContainerSpan.offsetWidth;
    destinationContainerSpanHeight = destinationContainerSpan.offsetHeight;
    console.log("spanHeight: " + destinationContainerSpanHeight, "gridAreaHeight: " + containerGridContentAreaHeight);
    // increase fontsize 2px until its either too tall or too wide
    while (destinationContainerSpanWidth < containerGridContentAreaWidth && destinationContainerSpanHeight < containerGridContentAreaHeight) {
        spanFontSize += 1;
        console.log("its happening");
        spans.forEach(span => {
            span.style.fontSize = spanFontSize + "px";
        })
        destinationContainerSpanHeight = destinationContainerSpan.offsetHeight;
        destinationContainerSpanWidth = destinationContainerSpan.offsetWidth;
    }

    spans.forEach(span => {
        span.style.fontSize = (spanFontSize - 1) + "px";
    })

    destinationContainerSpanHeight = destinationContainerSpan.offsetHeight;
    destinationContainerSpanWidth = destinationContainerSpan.offsetWidth;

    console.log("spanWidth: " + destinationContainerSpanWidth, "GridAreaWidth: " + containerGridContentAreaWidth);
    console.log("spanHeight: " + destinationContainerSpanHeight, "GridAreaHeight: " + containerGridContentAreaHeight);


    if (destinationContainerSpanHeight < containerGridContentAreaHeight || destinationContainerSpanWidth < containerGridContentAreaWidth) {

        for (let i = destinationContainerSpanHeight; i < containerGridContentAreaHeight; i++) {
            spans.forEach(span => {
                span.style.fontSize = containerGridContentAreaHeight + "px";
            })
        }
        let thinnestVersionOfFont = 25;
        spans.forEach(span => {
            span.style.fontVariationSettings = `"slnt" 0, "wdth" ${thinnestVersionOfFont}`;
        })
        destinationContainerSpanWidth = destinationContainerSpan.offsetWidth;
        destinationContainerSpanHeight = destinationContainerSpan.offsetHeight;
        console.log("spanWidth: " + destinationContainerSpanWidth, "GridAreaWidth: " + containerGridContentAreaWidth);
        console.log("spanHeight: " + destinationContainerSpanHeight, "GridAreaHeight: " + containerGridContentAreaHeight);

        while (destinationContainerSpanWidth < containerGridContentAreaWidth) {
            thinnestVersionOfFont++;
            spans.forEach(span => {
                span.style.fontVariationSettings = `"slnt" 0, "wdth" ${thinnestVersionOfFont}`
            })
            destinationContainerSpanWidth = destinationContainerSpan.offsetWidth;
        }

        spans.forEach(span => {
            span.style.fontVariationSettings = `"slnt" 0, "wdth" ${thinnestVersionOfFont - 1}`
        })

        let currentFontSize = window.getComputedStyle(spans[0]).fontSize;
        let blah = parseInt(currentFontSize)
        console.log(blah);
        while (destinationContainerSpanHeight > containerGridContentAreaHeight) {
            blah--;
            spans.forEach(span => {
                span.style.fontSize = blah + "px";
            })
            destinationContainerSpanHeight = destinationContainerSpan.offsetHeight;
        }
    };


    requestAnimationFrame(() => {
        const reflow = entryContainerGrid.clientWidth;
        entryContainerGrid.style[orientMeFrom] = entryContainerHeightOrWidth + "px";
    })

    destinationContainerGrid.style[orientMeFrom] = - destinationContainerHeightOrWidth + "px";
    console.log(destinationContainerGrid.style[orientMeFrom]);

    const startTime = performance.now();

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const endTime = performance.now();
                const transitionTimeUntilIntersection = endTime - startTime;
                let transitionTime = getComputedStyle(entryContainerGrid).transitionDuration.slice(0, -1) * 1000;
                const transitionPercentageLeftForDestinationContainer = transitionTimeUntilIntersection / transitionTime;
                const transitionTimeLeftForDestinationContainer = transitionTime - transitionTime * transitionPercentageLeftForDestinationContainer;
                console.log("it's intersecting");
                destinationContainerGrid.classList.add("transition-" + orientMeFrom);
                destinationContainerGrid.style.transitionDuration = transitionTimeLeftForDestinationContainer + "ms";
                destinationContainerGrid.style.transitionTimingFunction = "linear";
                destinationContainerGrid.style[orientMeFrom] = `0px`
                observer.unobserve(entryContainerGrid);
            } else {
                console.log("no intersection");
            }
        });
    };

    const options = {
        root: fromPanel,
        rootMargin: directionRootMargin,
        threshold: 0
    }

    const observer = new IntersectionObserver(callback, options);

    observer.observe(entryContainerGrid)
    console.log("spanWidth: " + destinationContainerSpanWidth, "GridAreaWidth: " + containerGridContentAreaWidth);
    console.log("spanHeight: " + destinationContainerSpanHeight, "GridAreaHeight: " + containerGridContentAreaHeight);

    // console.log(runNext);

    if (runNext === false) {
        console.log("do nothing");

    } else {
        destinationContainerGrid.addEventListener('transitionend', function (e) {
            console.log(e.propertyName);
            createCubeText(runNext);
            // destinationContainerGrid.style[e.propertyName] = "-10px";
            console.log(destinationContainerGrid.style.cssText);
            console.log(destinationContainerGrid.style[e.propertyName]);
        })
    }

}




const testCubeText = {
    wordString: "do you",
    transitionDuration: "1000ms",
    fromPanel: rightPanel,
    toPanel: backPanel,
    rows: "5-8",
    cols: "3-9",
    placeSelf: "start start",
    runNext: false
};

const rpsCubeText = {
    wordString: "Rock, Paper, Scissor?",
    transitionDuration: "500ms",
    fromPanel: rightPanel,
    toPanel: backPanel,
    rows: "7-10",
    cols: "1-5",
    placeSelf: "center start",
    runNext: testCubeText
};

const hiCubeText = {
    wordString: "Hi!",
    transitionDuration: "800ms",
    fromPanel: bottomPanel,
    toPanel: backPanel,
    rows: "1-6",
    cols: "1-5",
    placeSelf: "end start",
    runNext: rpsCubeText
};

// createCubeText(hiCubeText)


function create3PanelText({
    string = "string",
    slideInFrom = "left",
    transitionDuration = "1000ms",
    transitionDelay = "0ms",
    runNext = false
} = {}) {

    let allThreePanels = [leftPanel, backPanel, rightPanel];
    let withOfEachPanelArray = [leftPanel.offsetWidth, backPanel.offsetWidth, rightPanel.offsetWidth]
    let total3PanelWidth = backPanel.offsetWidth + leftPanel.offsetWidth + rightPanel.offsetWidth;
    let panelHeight = backPanel.offsetHeight;

    for (let i = 0; i < allThreePanels.length; i++) {
        let basicBGPanel = document.createElement("div");
        basicBGPanel.classList.add("basic-bg-panel");
        allThreePanels[i].appendChild(basicBGPanel);
        let threePanelWideElement = document.createElement("div");
        threePanelWideElement.classList.add("three-panel", `three-panel--${string}`);
        threePanelWideElement.style.width = `${total3PanelWidth}px`;

        basicBGPanel.appendChild(threePanelWideElement);

        let threePanelText = document.createElement("div");
        threePanelText.classList.add("three-panel__text", `three-panel__text-${string}`)
        threePanelWideElement.appendChild(threePanelText);
        threePanelText.textContent = string;
        threePanelText.style.fontSize = backPanel.offsetHeight + "px";
    }

    let leftThreePanel = leftPanel.querySelector(`.three-panel--${string}`);
    let backThreePanel = backPanel.querySelector(`.three-panel--${string}`);
    let rightThreePanel = rightPanel.querySelector(`.three-panel--${string}`);
    let threePanelWideElementsArray = [leftThreePanel, backThreePanel, rightThreePanel];
    let leftPositionTicker = [0];

    for (let i = 0; i < allThreePanels.length; i++) {
        let newLeft = 0;
        leftPositionTicker.forEach(number => { newLeft += number; });
        threePanelWideElementsArray[i].style.left = `-${newLeft}px`;
        leftPositionTicker.push(withOfEachPanelArray[i]);
    }

    let threePanelTextArray = []

    threePanelWideElementsArray.forEach((panel) => {
        console.log(panel.firstChild);
        threePanelTextArray.push(panel.firstChild)
    })

    let threePanelTextWidth = threePanelTextArray[0].offsetWidth;

    let thinnestVersionOfFont = 24;

    if (threePanelTextWidth < total3PanelWidth) {
        while (total3PanelWidth > threePanelTextWidth) {
            thinnestVersionOfFont++;
            threePanelTextArray.forEach(textElement => {
                textElement.style.fontVariationSettings = `"slnt" 0, "wdth" ${thinnestVersionOfFont}`;
            })
            threePanelTextWidth = threePanelTextArray[0].offsetWidth;
        }
        thinnestVersionOfFont--;
        threePanelTextArray.forEach(textElement => {
            textElement.style.fontVariationSettings = `"slnt" 0, "wdth" ${thinnestVersionOfFont}`;
        })
        threePanelTextWidth = threePanelTextArray[0].offsetWidth;
    } else if (threePanelTextWidth > total3PanelWidth) {
        let currentFontSize = parseInt(threePanelTextArray[0].style.fontSize);
        let newFontSize = currentFontSize;

        while (threePanelTextWidth >= total3PanelWidth) {
            newFontSize--;
            threePanelTextArray.forEach(textElement => {
                textElement.style.fontSize = newFontSize + "px";
            })
            threePanelTextWidth = threePanelTextArray[0].offsetWidth;
        }
    }

    console.log(total3PanelWidth, threePanelTextWidth);
    let transitionProperty;

    threePanelWideElementsArray.forEach(panel => {
        if (slideInFrom === "left") {
            panel.style.left = parseInt(panel.style.left) - total3PanelWidth + "px";
            transitionProperty = "left"
        }
        if (slideInFrom === "right") {
            panel.style.left = parseInt(panel.style.left) + total3PanelWidth + "px";
            transitionProperty = "left"
        }
        if (slideInFrom === "top") {
            panel.style.top = - panelHeight + "px";
            transitionProperty = "top"
        }
        if (slideInFrom === "bottom") {
            panel.style.top = panelHeight + "px";
            transitionProperty = "top"
        }

    })
    console.log(threePanelWideElementsArray);
    requestAnimationFrame(() => {
        const reflow = topPanel.clientWidth;
        threePanelWideElementsArray.forEach(panel => {
            panel.classList.add("three-panel--transition");
            // panel.style.transitionDuration = transitionDuration;
            panel.style.cssText += `transition-duration: ${transitionDuration}; transition-property: ${transitionProperty}; transition-delay: ${transitionDelay}`;

            if (slideInFrom === "left") {
                panel.style.left = parseInt(panel.style.left) + total3PanelWidth + "px";
            }
            if (slideInFrom === "right") {
                panel.style.left = parseInt(panel.style.left) - total3PanelWidth + "px";
            }
            if (slideInFrom === "top") {
                panel.style.top = "0px";
            }
            if (slideInFrom === "bottom") {
                panel.style.top = "0px";
            }
        })
    })

    if (runNext === false) {
        console.log("do nothing");

    } else {
        threePanelWideElementsArray[0].addEventListener('transitionend', function (e) {
            create3PanelText(runNext);
        })
    }
}





const scissor3PanelText = {
    string: "SCISSOR",
    slideInFrom: "top",
    transitionDuration: "1000ms",
    transitionDelay : "300ms",
    runNext: false
}
const paper3PanelText = {
    string: "PAPER",
    slideInFrom: "right",
    transitionDuration: "1000ms",
    runNext: scissor3PanelText
}

const rock3PanelText = {
    string: "ROCK",
    slideInFrom: "left",
    transitionDuration: "1000ms",
    runNext: paper3PanelText
}

window.onload = () => {
    create3PanelText(rock3PanelText);
    // create3PanelText(paper3PanelText)
}
