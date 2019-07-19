const switcherButton = document.getElementById("content-filter-switcher");
const contentBlock = document.getElementById("flights-list");
const filterBlock = document.getElementById("list-filter");

var switcher = new Switcher(false);

switcherButton.onclick = function() {
    if(switcher.getState() == false) {
        switcher.doSwitch(contentBlock, filterBlock);
    }
    else {
        switcher.doSwitch(filterBlock, contentBlock);
    }
}

function Switcher(switched) {
    return {
        getState: () => {
            return switched;
        },

        doSwitch: (block1, block2) => {
            block1.style.width = "0px";
            block1.style.display = "none";

            block2.style.width = "100%";
            block2.style.display = "block";

            switched = !switched;
        }
    }
}