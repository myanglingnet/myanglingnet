module.exports = {
    onMount() {
        
    },
    showModal() {
        var modal = this.getEl("modal-window");
        modal.style.display = "block";
    },
    closeModal() {
        var modal = this.getEl("modal-window");
        modal.style.display = "none";
    },
    updateModalText(text) {
        var modalText = this.getEl("modal-text");
        modalText.innerHTML = text;
    }
}