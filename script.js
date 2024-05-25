// Grab basic variables
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
// Grab panels
let topPanel = document.querySelector(".cube__panel-top");
let backPanel = document.querySelector(".cube__panel-back");
console.log(backPanel.offsetHeight);
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

// slideInButtons()

function createCubeText(wordString, fromPanel, toPanel, transitionDuration) {
    let orientMeFrom = "";
    let directionRootMargin = "";
    let entryGridItem = document.createElement("div");
    let destinationGridItem = document.createElement("div");

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

    let containerGridItemsArray = [entryGridItem, destinationGridItem];

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
        containerGrids[i].appendChild(containerGridItemsArray[i]);
        containerGridItemsArray[i].classList.add("container-grid-content-area");
        containerGridItemsArray[i].appendChild(spans[i]);
        spans[i].classList.add("panel-span");
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

    let containerGridContentAreaHeight = destinationGridItem.offsetHeight;
    let containerGridContentAreaWidth = destinationGridItem.scrollWidth;


    let hdhfjs = document.querySelector(".panel-span");

    let destinationContainerSpanWidth = destinationContainerSpan.scrollWidth;
    let destinationContainerSpanHeight = destinationContainerSpan.offsetHeight;
    // Get the inital fontsize
    let spanFontSize = parseInt(window.getComputedStyle(destinationContainerSpan).fontSize);
    console.log(spanFontSize);


    console.log("spanWidth: " + destinationContainerSpanWidth, "Container Width: " + destinationContainerWidth);
    console.log("spanHeight: " + destinationContainerSpanHeight, "Container Height: " + destinationContainerHeight);


    // if the fontsize currently is bigger than the container set fontsize to 2px
    if (destinationContainerSpanWidth > destinationContainerWidth || destinationContainerSpanHeight > containerGridContentAreaHeight) {
        spans.forEach(span => {
            span.style.fontSize = "1px";
        })
    }

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
    console.log("spanWidth: " + destinationContainerSpanWidth, "Container Width: " + destinationContainerWidth);
    console.log("spanHeight: " + destinationContainerSpanHeight, "Container Height: " + destinationContainerHeight);

    requestAnimationFrame(() => {
        const reflow = entryContainerGrid.clientWidth;
        entryContainerGrid.style[orientMeFrom] = entryContainerHeightOrWidth + "px";
    })

    destinationContainerGrid.style[orientMeFrom] = - destinationContainerHeightOrWidth + "px";

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
    console.log("spanWidth: " + destinationContainerSpanWidth, "Container Width: " + destinationContainerWidth);
    console.log("spanHeight: " + destinationContainerSpanHeight, "Container Height: " + destinationContainerHeight);
}

// createCubeText("Yo!", bottomPanel, backPanel, 2000);
// createCubeText("Hi", topPanel, backPanel, 1000);
createCubeText("Hi!", leftPanel, backPanel, "2000ms");
// createCubeText("Do you want to play a game of Rock Paper Scissor?", rightPanel, backPanel, "end", "1000ms");


