$_mod.def("/myanglingnet$1.0.9/components/site-nav/component", function(require, exports, module, __filename, __dirname) { module.exports = class {
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
});