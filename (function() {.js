(function() {
    // Interval handles
    var autoBuyer = null;
    var autoClicker = null;

    // Default speeds
    var autoBuyerInterval = 1000;
    var autoClickerInterval = 100;

    // Function to start the auto buyer
    function startAutoBuyer() {
        if (autoBuyer !== null) {
            console.log("Auto buyer is already running.");
            return;
        }
        console.log("Starting auto buyer.");
        autoBuyer = setInterval(function() {
            var names = Object.keys(Game.Objects);
            var mostExpensive = null;
            for (var i = 0; i < names.length; i++) {
                var building = Game.Objects[names[i]];
                if (mostExpensive === null || building.price > mostExpensive.price) {
                    if (Game.cookies >= building.price) {
                        mostExpensive = building;
                    }
                }
            }
            if (mostExpensive !== null) {
                mostExpensive.buy();
                console.log("Bought a " + mostExpensive.name);
            }
        }, autoBuyerInterval);
    }

    // Function to stop the auto buyer
    function stopAutoBuyer() {
        if (autoBuyer === null) {
            console.log("Auto buyer is not running.");
            return;
        }
        console.log("Stopping auto buyer.");
        clearInterval(autoBuyer);
        autoBuyer = null;
    }

    // Function to start the auto clicker
    function startAutoClicker() {
        if (autoClicker !== null) {
            console.log("Auto clicker is already running.");
            return;
        }
        console.log("Starting auto clicker.");
        autoClicker = setInterval(function() {
            Game.ClickCookie();
        }, autoClickerInterval);
    }

    // Function to stop the auto clicker
    function stopAutoClicker() {
        if (autoClicker === null) {
            console.log("Auto clicker is not running.");
            return;
        }
        console.log("Stopping auto clicker.");
        clearInterval(autoClicker);
        autoClicker = null;
    }

    // Function to create GUI
    function createGUI() {
        var controlPanel = document.createElement('div');
        controlPanel.style = 'position: fixed; bottom: 10px; right: 10px; padding: 10px; background: #333; border: 1px solid #ccc; color: #fff; font-family: monospace;';

        var title = document.createElement('h2');
        title.textContent = 'Cookie Clicker Mod Menu';
        title.style = 'text-align: center; color: #f90;';
        controlPanel.appendChild(title);

        var startAutoBuyerButton = document.createElement('button');
        startAutoBuyerButton.textContent = 'Start Auto Buyer';
        startAutoBuyerButton.onclick = startAutoBuyer;
        startAutoBuyerButton.style = 'width: 100%; margin-bottom: 5px;';

        var stopAutoBuyerButton = document.createElement('button');
        stopAutoBuyerButton.textContent = 'Stop Auto Buyer';
        stopAutoBuyerButton.onclick = stopAutoBuyer;
        stopAutoBuyerButton.style = 'width: 100%; margin-bottom: 5px;';

        var startAutoClickerButton = document.createElement('button');
        startAutoClickerButton.textContent = 'Start Auto Clicker';
        startAutoClickerButton.onclick = startAutoClicker;
        startAutoClickerButton.style = 'width: 100%; margin-bottom: 5px;';

        var stopAutoClickerButton = document.createElement('button');
        stopAutoClickerButton.textContent = 'Stop Auto Clicker';
        stopAutoClickerButton.onclick = stopAutoClicker;
        stopAutoClickerButton.style = 'width: 100%; margin-bottom: 5px;';

        var autoBuyerSpeedInput = document.createElement('input');
        autoBuyerSpeedInput.type = 'number';
        autoBuyerSpeedInput.min = '100';
        autoBuyerSpeedInput.value = autoBuyerInterval;
        autoBuyerSpeedInput.onchange = function() {
            autoBuyerInterval = autoBuyerSpeedInput.value;
            console.log("Auto buyer speed set to " + autoBuyerInterval + " ms");
        };
        autoBuyerSpeedInput.style = 'width: 100%; margin-bottom: 5px;';

        var autoClickerSpeedInput = document.createElement('input');
        autoClickerSpeedInput.type = 'number';
        autoClickerSpeedInput.min = '10';
        autoClickerSpeedInput.value = autoClickerInterval;
        autoClickerSpeedInput.onchange = function() {
            autoClickerInterval = autoClickerSpeedInput.value;
            console.log("Auto clicker speed set to " + autoClickerInterval + " ms");
        };
        autoClickerSpeedInput.style = 'width: 100%; margin-bottom: 5px;';

        controlPanel.appendChild(startAutoBuyerButton);
        controlPanel.appendChild(stopAutoBuyerButton);
        controlPanel.appendChild(autoBuyerSpeedInput);
        controlPanel.appendChild(startAutoClickerButton);
        controlPanel.appendChild(stopAutoClickerButton);
        controlPanel.appendChild(autoClickerSpeedInput);

        document.body.appendChild(controlPanel);
    }

    // Expose the start and stop functions to the global scope
    window.startAutoBuyer = startAutoBuyer;
    window.stopAutoBuyer = stopAutoBuyer;
    window.startAutoClicker = startAutoClicker;
    window.stopAutoClicker = stopAutoClicker;

    // Create the GUI when the script runs
    createGUI();
})();
