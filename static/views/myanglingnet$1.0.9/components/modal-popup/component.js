$_mod.def("/myanglingnet$1.0.9/components/modal-popup/component", function(require, exports, module, __filename, __dirname) { module.exports = {
    onInput() {
        this.state = {
            visible: false,
            latitude: 0,
            longitude: 0
        };
    },

    onMount() {
    },

    hideModal() {
        var modal = this.getEl("modal");
        modal.style.display = "none";
        this.state.visible = false;
    },
    
    showModal() {
        var modal = this.getEl("modal");
        modal.style.display = "block";
        this.state.visible = true;
    },

    setPosition(lat, lng) {
        var modalText = this.getEl("text");
        modalText.innerHTML = "Latitude: " + lat + "  Longitude: " + lng;
    }
}
});