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

function createHiMessage(delay) {
    // make elements for "hi"
    let topPanelContainerForHi = document.createElement("div");
    let topPanelSpanForHi = document.createElement("span");
    let backPanelContainerForHi = document.createElement("div");
    let backPanelSpanForHi = document.createElement("span");
    // make elements for "there"
    let rightPanelContainerForThere = document.createElement("div");
    let rightPanelSpanForThere = document.createElement("span");
    let backPanelContainerForThere = document.createElement("div");
    let backPanelSpanForThere = document.createElement("span");

    // Make arrays for "Hi," text
    let hiPanelSpans = [topPanelSpanForHi, backPanelSpanForHi]
    let mainPanelArrayForHi = [topPanel, backPanel];
    let hiContainers = [topPanelContainerForHi, backPanelContainerForHi];

    // Make arrays for "there" text 
    let therePanelSpans = [rightPanelSpanForThere, backPanelSpanForThere];
    let mainPanelArrayForThere = [rightPanel, backPanel];
    let thereContainers = [rightPanelContainerForThere, backPanelContainerForThere];


    for (let i = 0; i < hiContainers.length; i++) {
        hiContainers[i].classList.add("plain-panel", "hi");
        hiContainers[i].appendChild(hiPanelSpans[i]);
        hiPanelSpans[i].classList.add("panel-span", "hi");
        hiPanelSpans[i].textContent = "Hi,";
        mainPanelArrayForHi[i].appendChild(hiContainers[i]);
        hiContainers[0].classList.add("start-minus-100-top");
        hiContainers[1].classList.add("start-minus-200-top");
    }


    // for (let i = 0; i < thereContainers.length; i++) {
    //     thereContainers[i].classList.add("plain-panel", "there");
    //     thereContainers[i].appendChild(therePanelSpans[i]);
    //     therePanelSpans[i].classList.add("panel-span", "there");
    //     therePanelSpans[i].textContent = "there!";
    //     mainPanelArrayForThere[i].appendChild(thereContainers[i]);
    //     thereContainers[0].classList.add("start-plus-100-left");
    //     thereContainers[1].classList.add("start-plus-200-left");
    // }

    setInterval(() => {
        for (let i = 0; i < hiContainers.length; i++) {
            hiContainers[0].classList.add("end-plus-100-top");
            hiContainers[1].classList.add("end-zero-top");
            // thereContainers[0].classList.add("right");
            // thereContainers[1].classList.add("back");
        }
    }, delay);

}

// createHiMessage(500)

function createCubeText(wordString, fromPanel, toPanel) {
    let orientMeFrom = "";
    let directionRootMargin = "";

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

    let entryContainer = document.createElement("div");
    let destinationContainer = document.createElement("div");

    let entryContainerSpan = document.createElement("span");
    let destinationContainerSpan = document.createElement("span");

    let basePanelsArray = [fromPanel, toPanel];

    let spans = [entryContainerSpan, destinationContainerSpan];
    let containers = [entryContainer, destinationContainer];


    for (let i = 0; i < containers.length; i++) {
        containers[i].classList.add("plain-panel", "placement-on-panel")
        containers[i].appendChild(spans[i]);
        spans[i].classList.add("panel-span");
        spans[i].textContent = wordString;
        basePanelsArray[i].appendChild(containers[i]);
    }
    // Adjust font size to size of container
    // Get height and width of container and spans
    const destinationContainerWidth = destinationContainer.offsetWidth;
    const destinationContainerHeight = destinationContainer.offsetHeight;
    let destinationContainerSpanWidth = destinationContainerSpan.offsetWidth;
    let destinationContainerSpanHeight = destinationContainerSpan.offsetHeight;
    // Get the inital fontsize
    let spanFontSize = parseInt(window.getComputedStyle(destinationContainerSpan).fontSize);
    // if the fontsize currently is bigger than the container set fontsize to 2px
    if (destinationContainerSpanHeight >= destinationContainerHeight || destinationContainerSpanWidth >= destinationContainerWidth) {
        spans.forEach(span => {
            span.style.fontSize = "2px";
        })
    }
    // increase fontsize 2px until its eiter too tall or too wide
    while (destinationContainerSpanHeight * 1.2 < destinationContainerHeight && destinationContainerSpanWidth * 1.2 < destinationContainerWidth) {
        spanFontSize += 2;
        spans.forEach(span => {
            span.style.fontSize = spanFontSize + "px";
        })
        destinationContainerSpanHeight = destinationContainerSpan.offsetHeight;
        destinationContainerSpanWidth = destinationContainerSpan.offsetWidth;
    }

    let entryContainerHeightOrWidth;
    let destinationContainerHeightOrWidth;
    let widthOrHeight;

    if (orientMeFrom === "top" || orientMeFrom === "bottom") {
        entryContainerHeightOrWidth = entryContainer.offsetHeight;
        destinationContainerHeightOrWidth = destinationContainer.offsetHeight;
        widthOrHeight = "height";
    }
    if (orientMeFrom === "right" || orientMeFrom === "left") {
        entryContainerHeightOrWidth = entryContainer.offsetWidth;
        destinationContainerHeightOrWidth = destinationContainer.offsetWidth;
        widthOrHeight = "width";

    }
    console.log("entry:"+entryContainerHeightOrWidth, "dest:"+destinationContainerHeightOrWidth);

    entryContainer.style[widthOrHeight] = destinationContainerHeightOrWidth + "px";
    entryContainer.style[orientMeFrom] = - destinationContainerHeightOrWidth + "px";
    entryContainer.classList.add("transition-added", "transition-" + orientMeFrom);

    requestAnimationFrame(() => {
        const reflow = entryContainer.clientWidth;
        console.log(reflow);
        entryContainer.style[orientMeFrom] = entryContainerHeightOrWidth + "px";
        console.log(entryContainer.style.right);

    })



    destinationContainer.style[orientMeFrom] = - destinationContainerHeightOrWidth + "px";


    const startTime = performance.now();

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const endTime = performance.now();
                const transitionTimeUntilIntersection = endTime - startTime;
                let transitionTime = getComputedStyle(entryContainer).transitionDuration.slice(0, -1) * 1000;
                const transitionPercentageLeftForDestinationContainer = transitionTimeUntilIntersection / transitionTime;
                const transitionTimeLeftForDestinationContainer = transitionTime - transitionTime * transitionPercentageLeftForDestinationContainer;
                console.log("it's intersecting");
                destinationContainer.classList.add("transition-" + orientMeFrom);
                destinationContainer.style.transitionDuration = transitionTimeLeftForDestinationContainer + "ms";
                destinationContainer.style.transitionTimingFunction = "linear";
                destinationContainer.style[orientMeFrom] = `0px`
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

    observer.observe(entryContainer)

}

// createCubeText("Yo!", bottomPanel, backPanel, 2000);
// createCubeText("Hi", topPanel, backPanel, 1000);
createCubeText("Hi there!,", leftPanel, backPanel);






let hiContainersHeight = window.getComputedStyle(document.querySelector(".plain-panel", ".back")).height;
console.log(hiContainersHeight);

// console.log(backPanel.offsetHeight / 2);

function increaseFontSizeUntilHeightOrWidth(spanClass, targetHeight, increment) {
    let spans = Array.from(document.querySelectorAll(spanClass))
    console.log(spans);
    let currentHeight = spans[0].offsetHeight;
    let fontSize = parseInt(window.getComputedStyle(spans[0]).fontSize)
    targetHeight = parseInt(targetHeight);

    console.log(targetHeight);
    console.log(currentHeight);
    if (currentHeight >= targetHeight) {
        spans.forEach(span => {
            span.style.fontSize = "2px";
        })
    }

    while (currentHeight * 1.5 < targetHeight) {
        fontSize += increment;
        spans.forEach(span => {
            span.style.fontSize = fontSize + "px";
        })
        currentHeight = spans[0].offsetHeight;
    }
    console.log(targetHeight);
    console.log(currentHeight);
}

// increaseFontSizeUntilHeightOrWidth(".panel-span", backPanel, 2)


// let testHiContainer = document.createElement("div");
// testHiContainer.classList.add("plain-panel");
// testHiContainer.style.top = "0px"


// rightPanel.appendChild(testHiContainer);


// let testHi = document.createElement('span');
// testHiContainer.appendChild(testHi);
// testHi.classList.add("panel-span")
// testHi.textContent = "Hig"
// testHiContainer.style.right = "0px"
// testHi.style.transform = "scaleY(75%)"
// testHi.style.transformOrigin = "top"


let trySlice =  "2.5s"

console.log(trySlice.slice(0, -1));