module.exports = class {
    toggleNav() {
        var el = this.getEl("site-nav");

        if (el != null) {
            if (el.className === "top-nav") {
                el.className += " responsive";
            } else {
                el.className = "top-nav";
            }
        }
    }
}