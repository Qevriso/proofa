"use strict";
(self["webpackChunkkimai"] = self["webpackChunkkimai"] || []).push([["dashboard"],{

/***/ "./assets/dashboard.js":
/*!*****************************!*\
  !*** ./assets/dashboard.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gridstack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gridstack */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/gridstack.js");
/* harmony import */ var gridstack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gridstack__WEBPACK_IMPORTED_MODULE_0__);
/**
 * https://gridstackjs.com
 * https://github.com/gridstack/gridstack.js/tree/master/doc
 */
__webpack_require__(/*! gridstack/dist/gridstack.min.css */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/gridstack.min.css");
__webpack_require__(/*! gridstack/dist/gridstack-extra.min.css */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/gridstack-extra.min.css");

__webpack_require__.g.GridStack = gridstack__WEBPACK_IMPORTED_MODULE_0__.GridStack;

/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/gridstack-extra.min.css":
/*!*****************************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/gridstack-extra.min.css ***!
  \*****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/gridstack.min.css":
/*!***********************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/gridstack.min.css ***!
  \***********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-base-impl.js":
/*!*********************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-base-impl.js ***!
  \*********************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * dd-base-impl.ts 7.3.0
 * Copyright (c) 2021-2022 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DDBaseImplement = void 0;
class DDBaseImplement {
    constructor() {
        /** @internal */
        this._eventRegister = {};
    }
    /** returns the enable state, but you have to call enable()/disable() to change (as other things need to happen) */
    get disabled() { return this._disabled; }
    on(event, callback) {
        this._eventRegister[event] = callback;
    }
    off(event) {
        delete this._eventRegister[event];
    }
    enable() {
        this._disabled = false;
    }
    disable() {
        this._disabled = true;
    }
    destroy() {
        delete this._eventRegister;
    }
    triggerEvent(eventName, event) {
        if (!this.disabled && this._eventRegister && this._eventRegister[eventName])
            return this._eventRegister[eventName](event);
    }
}
exports.DDBaseImplement = DDBaseImplement;
//# sourceMappingURL=dd-base-impl.js.map

/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-draggable.js":
/*!*********************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-draggable.js ***!
  \*********************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * dd-draggable.ts 7.3.0
 * Copyright (c) 2021-2022 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DDDraggable = void 0;
const dd_manager_1 = __webpack_require__(/*! ./dd-manager */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-manager.js");
const utils_1 = __webpack_require__(/*! ./utils */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/utils.js");
const dd_base_impl_1 = __webpack_require__(/*! ./dd-base-impl */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-base-impl.js");
const dd_touch_1 = __webpack_require__(/*! ./dd-touch */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-touch.js");
// let count = 0; // TEST
class DDDraggable extends dd_base_impl_1.DDBaseImplement {
    constructor(el, option = {}) {
        super();
        this.el = el;
        this.option = option;
        // get the element that is actually supposed to be dragged by
        let handleName = option.handle.substring(1);
        this.dragEl = el.classList.contains(handleName) ? el : el.querySelector(option.handle) || el;
        // create var event binding so we can easily remove and still look like TS methods (unlike anonymous functions)
        this._mouseDown = this._mouseDown.bind(this);
        this._mouseMove = this._mouseMove.bind(this);
        this._mouseUp = this._mouseUp.bind(this);
        this.enable();
    }
    on(event, callback) {
        super.on(event, callback);
    }
    off(event) {
        super.off(event);
    }
    enable() {
        if (this.disabled === false)
            return;
        super.enable();
        this.dragEl.addEventListener('mousedown', this._mouseDown);
        if (dd_touch_1.isTouch) {
            this.dragEl.addEventListener('touchstart', dd_touch_1.touchstart);
            this.dragEl.addEventListener('pointerdown', dd_touch_1.pointerdown);
            // this.dragEl.style.touchAction = 'none'; // not needed unlike pointerdown doc comment
        }
        this.el.classList.remove('ui-draggable-disabled');
        this.el.classList.add('ui-draggable');
    }
    disable(forDestroy = false) {
        if (this.disabled === true)
            return;
        super.disable();
        this.dragEl.removeEventListener('mousedown', this._mouseDown);
        if (dd_touch_1.isTouch) {
            this.dragEl.removeEventListener('touchstart', dd_touch_1.touchstart);
            this.dragEl.removeEventListener('pointerdown', dd_touch_1.pointerdown);
        }
        this.el.classList.remove('ui-draggable');
        if (!forDestroy)
            this.el.classList.add('ui-draggable-disabled');
    }
    destroy() {
        if (this.dragTimeout)
            window.clearTimeout(this.dragTimeout);
        delete this.dragTimeout;
        if (this.dragging)
            this._mouseUp(this.mouseDownEvent);
        this.disable(true);
        delete this.el;
        delete this.helper;
        delete this.option;
        super.destroy();
    }
    updateOption(opts) {
        Object.keys(opts).forEach(key => this.option[key] = opts[key]);
        return this;
    }
    /** @internal call when mouse goes down before a dragstart happens */
    _mouseDown(e) {
        // don't let more than one widget handle mouseStart
        if (dd_manager_1.DDManager.mouseHandled)
            return;
        if (e.button !== 0)
            return true; // only left click
        // make sure we are not clicking on known object that handles mouseDown (TODO: make this extensible ?) #2054
        const skipMouseDown = ['input', 'textarea', 'button', 'select', 'option'];
        const name = e.target.nodeName.toLowerCase();
        if (skipMouseDown.find(skip => skip === name))
            return true;
        // also check for content editable
        if (e.target.closest('[contenteditable="true"]'))
            return true;
        // REMOVE: why would we get the event if it wasn't for us or child ?
        // make sure we are clicking on a drag handle or child of it...
        // Note: we don't need to check that's handle is an immediate child, as mouseHandled will prevent parents from also handling it (lowest wins)
        // let className = this.option.handle.substring(1);
        // let el = e.target as HTMLElement;
        // while (el && !el.classList.contains(className)) { el = el.parentElement; }
        // if (!el) return;
        this.mouseDownEvent = e;
        delete this.dragging;
        delete dd_manager_1.DDManager.dragElement;
        delete dd_manager_1.DDManager.dropElement;
        // document handler so we can continue receiving moves as the item is 'fixed' position, and capture=true so WE get a first crack
        document.addEventListener('mousemove', this._mouseMove, true); // true=capture, not bubble
        document.addEventListener('mouseup', this._mouseUp, true);
        if (dd_touch_1.isTouch) {
            this.dragEl.addEventListener('touchmove', dd_touch_1.touchmove);
            this.dragEl.addEventListener('touchend', dd_touch_1.touchend);
        }
        e.preventDefault();
        // preventDefault() prevents blur event which occurs just after mousedown event.
        // if an editable content has focus, then blur must be call
        if (document.activeElement)
            document.activeElement.blur();
        dd_manager_1.DDManager.mouseHandled = true;
        return true;
    }
    /** @internal method to call actual drag event */
    _callDrag(e) {
        if (!this.dragging)
            return;
        const ev = utils_1.Utils.initEvent(e, { target: this.el, type: 'drag' });
        if (this.option.drag) {
            this.option.drag(ev, this.ui());
        }
        this.triggerEvent('drag', ev);
    }
    /** @internal called when the main page (after successful mousedown) receives a move event to drag the item around the screen */
    _mouseMove(e) {
        var _a;
        // console.log(`${count++} move ${e.x},${e.y}`)
        let s = this.mouseDownEvent;
        if (this.dragging) {
            this._dragFollow(e);
            // delay actual grid handling drag until we pause for a while if set
            if (dd_manager_1.DDManager.pauseDrag) {
                const pause = Number.isInteger(dd_manager_1.DDManager.pauseDrag) ? dd_manager_1.DDManager.pauseDrag : 100;
                if (this.dragTimeout)
                    window.clearTimeout(this.dragTimeout);
                this.dragTimeout = window.setTimeout(() => this._callDrag(e), pause);
            }
            else {
                this._callDrag(e);
            }
        }
        else if (Math.abs(e.x - s.x) + Math.abs(e.y - s.y) > 3) {
            /**
             * don't start unless we've moved at least 3 pixels
             */
            this.dragging = true;
            dd_manager_1.DDManager.dragElement = this;
            // if we're dragging an actual grid item, set the current drop as the grid (to detect enter/leave)
            let grid = (_a = this.el.gridstackNode) === null || _a === void 0 ? void 0 : _a.grid;
            if (grid) {
                dd_manager_1.DDManager.dropElement = grid.el.ddElement.ddDroppable;
            }
            else {
                delete dd_manager_1.DDManager.dropElement;
            }
            this.helper = this._createHelper(e);
            this._setupHelperContainmentStyle();
            this.dragOffset = this._getDragOffset(e, this.el, this.helperContainment);
            const ev = utils_1.Utils.initEvent(e, { target: this.el, type: 'dragstart' });
            this._setupHelperStyle(e);
            if (this.option.start) {
                this.option.start(ev, this.ui());
            }
            this.triggerEvent('dragstart', ev);
        }
        e.preventDefault(); // needed otherwise we get text sweep text selection as we drag around
        return true;
    }
    /** @internal call when the mouse gets released to drop the item at current location */
    _mouseUp(e) {
        var _a;
        document.removeEventListener('mousemove', this._mouseMove, true);
        document.removeEventListener('mouseup', this._mouseUp, true);
        if (dd_touch_1.isTouch) {
            this.dragEl.removeEventListener('touchmove', dd_touch_1.touchmove, true);
            this.dragEl.removeEventListener('touchend', dd_touch_1.touchend, true);
        }
        if (this.dragging) {
            delete this.dragging;
            // reset the drop target if dragging over ourself (already parented, just moving during stop callback below)
            if (((_a = dd_manager_1.DDManager.dropElement) === null || _a === void 0 ? void 0 : _a.el) === this.el.parentElement) {
                delete dd_manager_1.DDManager.dropElement;
            }
            this.helperContainment.style.position = this.parentOriginStylePosition || null;
            if (this.helper === this.el) {
                this._removeHelperStyle();
            }
            else {
                this.helper.remove();
            }
            const ev = utils_1.Utils.initEvent(e, { target: this.el, type: 'dragstop' });
            if (this.option.stop) {
                this.option.stop(ev); // NOTE: destroy() will be called when removing item, so expect NULL ptr after!
            }
            this.triggerEvent('dragstop', ev);
            // call the droppable method to receive the item
            if (dd_manager_1.DDManager.dropElement) {
                dd_manager_1.DDManager.dropElement.drop(e);
            }
        }
        delete this.helper;
        delete this.mouseDownEvent;
        delete dd_manager_1.DDManager.dragElement;
        delete dd_manager_1.DDManager.dropElement;
        delete dd_manager_1.DDManager.mouseHandled;
        e.preventDefault();
    }
    /** @internal create a clone copy (or user defined method) of the original drag item if set */
    _createHelper(event) {
        let helper = this.el;
        if (typeof this.option.helper === 'function') {
            helper = this.option.helper(event);
        }
        else if (this.option.helper === 'clone') {
            helper = utils_1.Utils.cloneNode(this.el);
        }
        if (!document.body.contains(helper)) {
            utils_1.Utils.appendTo(helper, this.option.appendTo === 'parent' ? this.el.parentNode : this.option.appendTo);
        }
        if (helper === this.el) {
            this.dragElementOriginStyle = DDDraggable.originStyleProp.map(prop => this.el.style[prop]);
        }
        return helper;
    }
    /** @internal set the fix position of the dragged item */
    _setupHelperStyle(e) {
        this.helper.classList.add('ui-draggable-dragging');
        // TODO: set all at once with style.cssText += ... ? https://stackoverflow.com/questions/3968593
        const style = this.helper.style;
        style.pointerEvents = 'none'; // needed for over items to get enter/leave
        // style.cursor = 'move'; //  TODO: can't set with pointerEvents=none ! (done in CSS as well)
        style['min-width'] = 0; // since we no longer relative to our parent and we don't resize anyway (normally 100/#column %)
        style.width = this.dragOffset.width + 'px';
        style.height = this.dragOffset.height + 'px';
        style.willChange = 'left, top';
        style.position = 'fixed'; // let us drag between grids by not clipping as parent .grid-stack is position: 'relative'
        this._dragFollow(e); // now position it
        style.transition = 'none'; // show up instantly
        setTimeout(() => {
            if (this.helper) {
                style.transition = null; // recover animation
            }
        }, 0);
        return this;
    }
    /** @internal restore back the original style before dragging */
    _removeHelperStyle() {
        var _a;
        this.helper.classList.remove('ui-draggable-dragging');
        let node = (_a = this.helper) === null || _a === void 0 ? void 0 : _a.gridstackNode;
        // don't bother restoring styles if we're gonna remove anyway...
        if (!(node === null || node === void 0 ? void 0 : node._isAboutToRemove) && this.dragElementOriginStyle) {
            let helper = this.helper;
            // don't animate, otherwise we animate offseted when switching back to 'absolute' from 'fixed'.
            // TODO: this also removes resizing animation which doesn't have this issue, but others.
            // Ideally both would animate ('move' would immediately restore 'absolute' and adjust coordinate to match,
            // then trigger a delay (repaint) to restore to final dest with animate) but then we need to make sure 'resizestop'
            // is called AFTER 'transitionend' event is received (see https://github.com/gridstack/gridstack.js/issues/2033)
            let transition = this.dragElementOriginStyle['transition'] || null;
            helper.style.transition = this.dragElementOriginStyle['transition'] = 'none'; // can't be NULL #1973
            DDDraggable.originStyleProp.forEach(prop => helper.style[prop] = this.dragElementOriginStyle[prop] || null);
            setTimeout(() => helper.style.transition = transition, 50); // recover animation from saved vars after a pause (0 isn't enough #1973)
        }
        delete this.dragElementOriginStyle;
        return this;
    }
    /** @internal updates the top/left position to follow the mouse */
    _dragFollow(e) {
        let containmentRect = { left: 0, top: 0 };
        // if (this.helper.style.position === 'absolute') { // we use 'fixed'
        //   const { left, top } = this.helperContainment.getBoundingClientRect();
        //   containmentRect = { left, top };
        // }
        const style = this.helper.style;
        const offset = this.dragOffset;
        style.left = e.clientX + offset.offsetLeft - containmentRect.left + 'px';
        style.top = e.clientY + offset.offsetTop - containmentRect.top + 'px';
    }
    /** @internal */
    _setupHelperContainmentStyle() {
        this.helperContainment = this.helper.parentElement;
        if (this.helper.style.position !== 'fixed') {
            this.parentOriginStylePosition = this.helperContainment.style.position;
            if (window.getComputedStyle(this.helperContainment).position.match(/static/)) {
                this.helperContainment.style.position = 'relative';
            }
        }
        return this;
    }
    /** @internal */
    _getDragOffset(event, el, parent) {
        // in case ancestor has transform/perspective css properties that change the viewpoint
        let xformOffsetX = 0;
        let xformOffsetY = 0;
        if (parent) {
            const testEl = document.createElement('div');
            utils_1.Utils.addElStyles(testEl, {
                opacity: '0',
                position: 'fixed',
                top: 0 + 'px',
                left: 0 + 'px',
                width: '1px',
                height: '1px',
                zIndex: '-999999',
            });
            parent.appendChild(testEl);
            const testElPosition = testEl.getBoundingClientRect();
            parent.removeChild(testEl);
            xformOffsetX = testElPosition.left;
            xformOffsetY = testElPosition.top;
            // TODO: scale ?
        }
        const targetOffset = el.getBoundingClientRect();
        return {
            left: targetOffset.left,
            top: targetOffset.top,
            offsetLeft: -event.clientX + targetOffset.left - xformOffsetX,
            offsetTop: -event.clientY + targetOffset.top - xformOffsetY,
            width: targetOffset.width,
            height: targetOffset.height
        };
    }
    /** @internal TODO: set to public as called by DDDroppable! */
    ui() {
        const containmentEl = this.el.parentElement;
        const containmentRect = containmentEl.getBoundingClientRect();
        const offset = this.helper.getBoundingClientRect();
        return {
            position: {
                top: offset.top - containmentRect.top,
                left: offset.left - containmentRect.left
            }
            /* not used by GridStack for now...
            helper: [this.helper], //The object arr representing the helper that's being dragged.
            offset: { top: offset.top, left: offset.left } // Current offset position of the helper as { top, left } object.
            */
        };
    }
}
exports.DDDraggable = DDDraggable;
/** @internal properties we change during dragging, and restore back */
DDDraggable.originStyleProp = ['transition', 'pointerEvents', 'position', 'left', 'top', 'minWidth', 'willChange'];
//# sourceMappingURL=dd-draggable.js.map

/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-droppable.js":
/*!*********************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-droppable.js ***!
  \*********************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * dd-droppable.ts 7.3.0
 * Copyright (c) 2021-2022 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DDDroppable = void 0;
const dd_manager_1 = __webpack_require__(/*! ./dd-manager */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-manager.js");
const dd_base_impl_1 = __webpack_require__(/*! ./dd-base-impl */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-base-impl.js");
const utils_1 = __webpack_require__(/*! ./utils */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/utils.js");
const dd_touch_1 = __webpack_require__(/*! ./dd-touch */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-touch.js");
// let count = 0; // TEST
class DDDroppable extends dd_base_impl_1.DDBaseImplement {
    constructor(el, opts = {}) {
        super();
        this.el = el;
        this.option = opts;
        // create var event binding so we can easily remove and still look like TS methods (unlike anonymous functions)
        this._mouseEnter = this._mouseEnter.bind(this);
        this._mouseLeave = this._mouseLeave.bind(this);
        this.enable();
        this._setupAccept();
    }
    on(event, callback) {
        super.on(event, callback);
    }
    off(event) {
        super.off(event);
    }
    enable() {
        if (this.disabled === false)
            return;
        super.enable();
        this.el.classList.add('ui-droppable');
        this.el.classList.remove('ui-droppable-disabled');
        this.el.addEventListener('mouseenter', this._mouseEnter);
        this.el.addEventListener('mouseleave', this._mouseLeave);
        if (dd_touch_1.isTouch) {
            this.el.addEventListener('pointerenter', dd_touch_1.pointerenter);
            this.el.addEventListener('pointerleave', dd_touch_1.pointerleave);
        }
    }
    disable(forDestroy = false) {
        if (this.disabled === true)
            return;
        super.disable();
        this.el.classList.remove('ui-droppable');
        if (!forDestroy)
            this.el.classList.add('ui-droppable-disabled');
        this.el.removeEventListener('mouseenter', this._mouseEnter);
        this.el.removeEventListener('mouseleave', this._mouseLeave);
        if (dd_touch_1.isTouch) {
            this.el.removeEventListener('pointerenter', dd_touch_1.pointerenter);
            this.el.removeEventListener('pointerleave', dd_touch_1.pointerleave);
        }
    }
    destroy() {
        this.disable(true);
        this.el.classList.remove('ui-droppable');
        this.el.classList.remove('ui-droppable-disabled');
        super.destroy();
    }
    updateOption(opts) {
        Object.keys(opts).forEach(key => this.option[key] = opts[key]);
        this._setupAccept();
        return this;
    }
    /** @internal called when the cursor enters our area - prepare for a possible drop and track leaving */
    _mouseEnter(e) {
        // console.log(`${count++} Enter ${this.el.id || (this.el as GridHTMLElement).gridstack.opts.id}`); // TEST
        if (!dd_manager_1.DDManager.dragElement)
            return;
        if (!this._canDrop(dd_manager_1.DDManager.dragElement.el))
            return;
        e.preventDefault();
        e.stopPropagation();
        // make sure when we enter this, that the last one gets a leave FIRST to correctly cleanup as we don't always do
        if (dd_manager_1.DDManager.dropElement && dd_manager_1.DDManager.dropElement !== this) {
            dd_manager_1.DDManager.dropElement._mouseLeave(e);
        }
        dd_manager_1.DDManager.dropElement = this;
        const ev = utils_1.Utils.initEvent(e, { target: this.el, type: 'dropover' });
        if (this.option.over) {
            this.option.over(ev, this._ui(dd_manager_1.DDManager.dragElement));
        }
        this.triggerEvent('dropover', ev);
        this.el.classList.add('ui-droppable-over');
        // console.log('tracking'); // TEST
    }
    /** @internal called when the item is leaving our area, stop tracking if we had moving item */
    _mouseLeave(e) {
        var _a;
        // console.log(`${count++} Leave ${this.el.id || (this.el as GridHTMLElement).gridstack.opts.id}`); // TEST
        if (!dd_manager_1.DDManager.dragElement || dd_manager_1.DDManager.dropElement !== this)
            return;
        e.preventDefault();
        e.stopPropagation();
        const ev = utils_1.Utils.initEvent(e, { target: this.el, type: 'dropout' });
        if (this.option.out) {
            this.option.out(ev, this._ui(dd_manager_1.DDManager.dragElement));
        }
        this.triggerEvent('dropout', ev);
        if (dd_manager_1.DDManager.dropElement === this) {
            delete dd_manager_1.DDManager.dropElement;
            // console.log('not tracking'); // TEST
            // if we're still over a parent droppable, send it an enter as we don't get one from leaving nested children
            let parentDrop;
            let parent = this.el.parentElement;
            while (!parentDrop && parent) {
                parentDrop = (_a = parent.ddElement) === null || _a === void 0 ? void 0 : _a.ddDroppable;
                parent = parent.parentElement;
            }
            if (parentDrop) {
                parentDrop._mouseEnter(e);
            }
        }
    }
    /** item is being dropped on us - called by the drag mouseup handler - this calls the client drop event */
    drop(e) {
        e.preventDefault();
        const ev = utils_1.Utils.initEvent(e, { target: this.el, type: 'drop' });
        if (this.option.drop) {
            this.option.drop(ev, this._ui(dd_manager_1.DDManager.dragElement));
        }
        this.triggerEvent('drop', ev);
    }
    /** @internal true if element matches the string/method accept option */
    _canDrop(el) {
        return el && (!this.accept || this.accept(el));
    }
    /** @internal */
    _setupAccept() {
        if (!this.option.accept)
            return this;
        if (typeof this.option.accept === 'string') {
            this.accept = (el) => el.matches(this.option.accept);
        }
        else {
            this.accept = this.option.accept;
        }
        return this;
    }
    /** @internal */
    _ui(drag) {
        return Object.assign({ draggable: drag.el }, drag.ui());
    }
}
exports.DDDroppable = DDDroppable;
//# sourceMappingURL=dd-droppable.js.map

/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-element.js":
/*!*******************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-element.js ***!
  \*******************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * dd-elements.ts 7.3.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DDElement = void 0;
const dd_resizable_1 = __webpack_require__(/*! ./dd-resizable */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-resizable.js");
const dd_draggable_1 = __webpack_require__(/*! ./dd-draggable */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-draggable.js");
const dd_droppable_1 = __webpack_require__(/*! ./dd-droppable */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-droppable.js");
class DDElement {
    constructor(el) {
        this.el = el;
    }
    static init(el) {
        if (!el.ddElement) {
            el.ddElement = new DDElement(el);
        }
        return el.ddElement;
    }
    on(eventName, callback) {
        if (this.ddDraggable && ['drag', 'dragstart', 'dragstop'].indexOf(eventName) > -1) {
            this.ddDraggable.on(eventName, callback);
        }
        else if (this.ddDroppable && ['drop', 'dropover', 'dropout'].indexOf(eventName) > -1) {
            this.ddDroppable.on(eventName, callback);
        }
        else if (this.ddResizable && ['resizestart', 'resize', 'resizestop'].indexOf(eventName) > -1) {
            this.ddResizable.on(eventName, callback);
        }
        return this;
    }
    off(eventName) {
        if (this.ddDraggable && ['drag', 'dragstart', 'dragstop'].indexOf(eventName) > -1) {
            this.ddDraggable.off(eventName);
        }
        else if (this.ddDroppable && ['drop', 'dropover', 'dropout'].indexOf(eventName) > -1) {
            this.ddDroppable.off(eventName);
        }
        else if (this.ddResizable && ['resizestart', 'resize', 'resizestop'].indexOf(eventName) > -1) {
            this.ddResizable.off(eventName);
        }
        return this;
    }
    setupDraggable(opts) {
        if (!this.ddDraggable) {
            this.ddDraggable = new dd_draggable_1.DDDraggable(this.el, opts);
        }
        else {
            this.ddDraggable.updateOption(opts);
        }
        return this;
    }
    cleanDraggable() {
        if (this.ddDraggable) {
            this.ddDraggable.destroy();
            delete this.ddDraggable;
        }
        return this;
    }
    setupResizable(opts) {
        if (!this.ddResizable) {
            this.ddResizable = new dd_resizable_1.DDResizable(this.el, opts);
        }
        else {
            this.ddResizable.updateOption(opts);
        }
        return this;
    }
    cleanResizable() {
        if (this.ddResizable) {
            this.ddResizable.destroy();
            delete this.ddResizable;
        }
        return this;
    }
    setupDroppable(opts) {
        if (!this.ddDroppable) {
            this.ddDroppable = new dd_droppable_1.DDDroppable(this.el, opts);
        }
        else {
            this.ddDroppable.updateOption(opts);
        }
        return this;
    }
    cleanDroppable() {
        if (this.ddDroppable) {
            this.ddDroppable.destroy();
            delete this.ddDroppable;
        }
        return this;
    }
}
exports.DDElement = DDElement;
//# sourceMappingURL=dd-element.js.map

/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-gridstack.js":
/*!*********************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-gridstack.js ***!
  \*********************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * dd-gridstack.ts 7.3.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DDGridStack = void 0;
const utils_1 = __webpack_require__(/*! ./utils */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/utils.js");
const dd_manager_1 = __webpack_require__(/*! ./dd-manager */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-manager.js");
const dd_element_1 = __webpack_require__(/*! ./dd-element */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-element.js");
// let count = 0; // TEST
/**
 * HTML Native Mouse and Touch Events Drag and Drop functionality.
 */
class DDGridStack {
    resizable(el, opts, key, value) {
        this._getDDElements(el).forEach(dEl => {
            if (opts === 'disable' || opts === 'enable') {
                dEl.ddResizable && dEl.ddResizable[opts](); // can't create DD as it requires options for setupResizable()
            }
            else if (opts === 'destroy') {
                dEl.ddResizable && dEl.cleanResizable();
            }
            else if (opts === 'option') {
                dEl.setupResizable({ [key]: value });
            }
            else {
                const grid = dEl.el.gridstackNode.grid;
                let handles = dEl.el.getAttribute('gs-resize-handles') ? dEl.el.getAttribute('gs-resize-handles') : grid.opts.resizable.handles;
                let autoHide = !grid.opts.alwaysShowResizeHandle;
                dEl.setupResizable(Object.assign(Object.assign(Object.assign({}, grid.opts.resizable), { handles, autoHide }), {
                    start: opts.start,
                    stop: opts.stop,
                    resize: opts.resize
                }));
            }
        });
        return this;
    }
    draggable(el, opts, key, value) {
        this._getDDElements(el).forEach(dEl => {
            if (opts === 'disable' || opts === 'enable') {
                dEl.ddDraggable && dEl.ddDraggable[opts](); // can't create DD as it requires options for setupDraggable()
            }
            else if (opts === 'destroy') {
                dEl.ddDraggable && dEl.cleanDraggable();
            }
            else if (opts === 'option') {
                dEl.setupDraggable({ [key]: value });
            }
            else {
                const grid = dEl.el.gridstackNode.grid;
                dEl.setupDraggable(Object.assign(Object.assign({}, grid.opts.draggable), {
                    // containment: (grid.parentGridItem && !grid.opts.dragOut) ? grid.el.parentElement : (grid.opts.draggable.containment || null),
                    start: opts.start,
                    stop: opts.stop,
                    drag: opts.drag
                }));
            }
        });
        return this;
    }
    dragIn(el, opts) {
        this._getDDElements(el).forEach(dEl => dEl.setupDraggable(opts));
        return this;
    }
    droppable(el, opts, key, value) {
        if (typeof opts.accept === 'function' && !opts._accept) {
            opts._accept = opts.accept;
            opts.accept = (el) => opts._accept(el);
        }
        this._getDDElements(el).forEach(dEl => {
            if (opts === 'disable' || opts === 'enable') {
                dEl.ddDroppable && dEl.ddDroppable[opts]();
            }
            else if (opts === 'destroy') {
                if (dEl.ddDroppable) { // error to call destroy if not there
                    dEl.cleanDroppable();
                }
            }
            else if (opts === 'option') {
                dEl.setupDroppable({ [key]: value });
            }
            else {
                dEl.setupDroppable(opts);
            }
        });
        return this;
    }
    /** true if element is droppable */
    isDroppable(el) {
        return !!(el && el.ddElement && el.ddElement.ddDroppable && !el.ddElement.ddDroppable.disabled);
    }
    /** true if element is draggable */
    isDraggable(el) {
        return !!(el && el.ddElement && el.ddElement.ddDraggable && !el.ddElement.ddDraggable.disabled);
    }
    /** true if element is draggable */
    isResizable(el) {
        return !!(el && el.ddElement && el.ddElement.ddResizable && !el.ddElement.ddResizable.disabled);
    }
    on(el, name, callback) {
        this._getDDElements(el).forEach(dEl => dEl.on(name, (event) => {
            callback(event, dd_manager_1.DDManager.dragElement ? dd_manager_1.DDManager.dragElement.el : event.target, dd_manager_1.DDManager.dragElement ? dd_manager_1.DDManager.dragElement.helper : null);
        }));
        return this;
    }
    off(el, name) {
        this._getDDElements(el).forEach(dEl => dEl.off(name));
        return this;
    }
    /** @internal returns a list of DD elements, creating them on the fly by default */
    _getDDElements(els, create = true) {
        let hosts = utils_1.Utils.getElements(els);
        if (!hosts.length)
            return [];
        let list = hosts.map(e => e.ddElement || (create ? dd_element_1.DDElement.init(e) : null));
        if (!create) {
            list.filter(d => d);
        } // remove nulls
        return list;
    }
}
exports.DDGridStack = DDGridStack;
//# sourceMappingURL=dd-gridstack.js.map

/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-manager.js":
/*!*******************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-manager.js ***!
  \*******************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * dd-manager.ts 7.3.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DDManager = void 0;
/**
 * globals that are shared across Drag & Drop instances
 */
class DDManager {
}
exports.DDManager = DDManager;
//# sourceMappingURL=dd-manager.js.map

/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-resizable-handle.js":
/*!****************************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-resizable-handle.js ***!
  \****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * dd-resizable-handle.ts 7.3.0
 * Copyright (c) 2021-2022 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DDResizableHandle = void 0;
const dd_touch_1 = __webpack_require__(/*! ./dd-touch */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-touch.js");
class DDResizableHandle {
    constructor(host, direction, option) {
        /** @internal true after we've moved enough pixels to start a resize */
        this.moving = false;
        this.host = host;
        this.dir = direction;
        this.option = option;
        // create var event binding so we can easily remove and still look like TS methods (unlike anonymous functions)
        this._mouseDown = this._mouseDown.bind(this);
        this._mouseMove = this._mouseMove.bind(this);
        this._mouseUp = this._mouseUp.bind(this);
        this._init();
    }
    /** @internal */
    _init() {
        const el = document.createElement('div');
        el.classList.add('ui-resizable-handle');
        el.classList.add(`${DDResizableHandle.prefix}${this.dir}`);
        el.style.zIndex = '100';
        el.style.userSelect = 'none';
        this.el = el;
        this.host.appendChild(this.el);
        this.el.addEventListener('mousedown', this._mouseDown);
        if (dd_touch_1.isTouch) {
            this.el.addEventListener('touchstart', dd_touch_1.touchstart);
            this.el.addEventListener('pointerdown', dd_touch_1.pointerdown);
            // this.el.style.touchAction = 'none'; // not needed unlike pointerdown doc comment
        }
        return this;
    }
    /** call this when resize handle needs to be removed and cleaned up */
    destroy() {
        if (this.moving)
            this._mouseUp(this.mouseDownEvent);
        this.el.removeEventListener('mousedown', this._mouseDown);
        if (dd_touch_1.isTouch) {
            this.el.removeEventListener('touchstart', dd_touch_1.touchstart);
            this.el.removeEventListener('pointerdown', dd_touch_1.pointerdown);
        }
        this.host.removeChild(this.el);
        delete this.el;
        delete this.host;
        return this;
    }
    /** @internal called on mouse down on us: capture move on the entire document (mouse might not stay on us) until we release the mouse */
    _mouseDown(e) {
        this.mouseDownEvent = e;
        document.addEventListener('mousemove', this._mouseMove, true); // capture, not bubble
        document.addEventListener('mouseup', this._mouseUp, true);
        if (dd_touch_1.isTouch) {
            this.el.addEventListener('touchmove', dd_touch_1.touchmove);
            this.el.addEventListener('touchend', dd_touch_1.touchend);
        }
        e.stopPropagation();
        e.preventDefault();
    }
    /** @internal */
    _mouseMove(e) {
        let s = this.mouseDownEvent;
        if (this.moving) {
            this._triggerEvent('move', e);
        }
        else if (Math.abs(e.x - s.x) + Math.abs(e.y - s.y) > 2) {
            // don't start unless we've moved at least 3 pixels
            this.moving = true;
            this._triggerEvent('start', this.mouseDownEvent);
            this._triggerEvent('move', e);
        }
        e.stopPropagation();
        e.preventDefault();
    }
    /** @internal */
    _mouseUp(e) {
        if (this.moving) {
            this._triggerEvent('stop', e);
        }
        document.removeEventListener('mousemove', this._mouseMove, true);
        document.removeEventListener('mouseup', this._mouseUp, true);
        if (dd_touch_1.isTouch) {
            this.el.removeEventListener('touchmove', dd_touch_1.touchmove);
            this.el.removeEventListener('touchend', dd_touch_1.touchend);
        }
        delete this.moving;
        delete this.mouseDownEvent;
        e.stopPropagation();
        e.preventDefault();
    }
    /** @internal */
    _triggerEvent(name, event) {
        if (this.option[name])
            this.option[name](event);
        return this;
    }
}
exports.DDResizableHandle = DDResizableHandle;
/** @internal */
DDResizableHandle.prefix = 'ui-resizable-';
//# sourceMappingURL=dd-resizable-handle.js.map

/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-resizable.js":
/*!*********************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-resizable.js ***!
  \*********************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * dd-resizable.ts 7.3.0
 * Copyright (c) 2021-2022 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DDResizable = void 0;
const dd_resizable_handle_1 = __webpack_require__(/*! ./dd-resizable-handle */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-resizable-handle.js");
const dd_base_impl_1 = __webpack_require__(/*! ./dd-base-impl */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-base-impl.js");
const utils_1 = __webpack_require__(/*! ./utils */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/utils.js");
const dd_manager_1 = __webpack_require__(/*! ./dd-manager */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-manager.js");
class DDResizable extends dd_base_impl_1.DDBaseImplement {
    constructor(el, opts = {}) {
        super();
        /** @internal */
        this._ui = () => {
            const containmentEl = this.el.parentElement;
            const containmentRect = containmentEl.getBoundingClientRect();
            const newRect = {
                width: this.originalRect.width,
                height: this.originalRect.height + this.scrolled,
                left: this.originalRect.left,
                top: this.originalRect.top - this.scrolled
            };
            const rect = this.temporalRect || newRect;
            return {
                position: {
                    left: rect.left - containmentRect.left,
                    top: rect.top - containmentRect.top
                },
                size: {
                    width: rect.width,
                    height: rect.height
                }
                /* Gridstack ONLY needs position set above... keep around in case.
                element: [this.el], // The object representing the element to be resized
                helper: [], // TODO: not support yet - The object representing the helper that's being resized
                originalElement: [this.el],// we don't wrap here, so simplify as this.el //The object representing the original element before it is wrapped
                originalPosition: { // The position represented as { left, top } before the resizable is resized
                  left: this.originalRect.left - containmentRect.left,
                  top: this.originalRect.top - containmentRect.top
                },
                originalSize: { // The size represented as { width, height } before the resizable is resized
                  width: this.originalRect.width,
                  height: this.originalRect.height
                }
                */
            };
        };
        this.el = el;
        this.option = opts;
        // create var event binding so we can easily remove and still look like TS methods (unlike anonymous functions)
        this._mouseOver = this._mouseOver.bind(this);
        this._mouseOut = this._mouseOut.bind(this);
        this.enable();
        this._setupAutoHide(this.option.autoHide);
        this._setupHandlers();
    }
    on(event, callback) {
        super.on(event, callback);
    }
    off(event) {
        super.off(event);
    }
    enable() {
        super.enable();
        this.el.classList.add('ui-resizable');
        this.el.classList.remove('ui-resizable-disabled');
        this._setupAutoHide(this.option.autoHide);
    }
    disable() {
        super.disable();
        this.el.classList.add('ui-resizable-disabled');
        this.el.classList.remove('ui-resizable');
        this._setupAutoHide(false);
    }
    destroy() {
        this._removeHandlers();
        this._setupAutoHide(false);
        this.el.classList.remove('ui-resizable');
        delete this.el;
        super.destroy();
    }
    updateOption(opts) {
        let updateHandles = (opts.handles && opts.handles !== this.option.handles);
        let updateAutoHide = (opts.autoHide && opts.autoHide !== this.option.autoHide);
        Object.keys(opts).forEach(key => this.option[key] = opts[key]);
        if (updateHandles) {
            this._removeHandlers();
            this._setupHandlers();
        }
        if (updateAutoHide) {
            this._setupAutoHide(this.option.autoHide);
        }
        return this;
    }
    /** @internal turns auto hide on/off */
    _setupAutoHide(auto) {
        if (auto) {
            this.el.classList.add('ui-resizable-autohide');
            // use mouseover and not mouseenter to get better performance and track for nested cases
            this.el.addEventListener('mouseover', this._mouseOver);
            this.el.addEventListener('mouseout', this._mouseOut);
        }
        else {
            this.el.classList.remove('ui-resizable-autohide');
            this.el.removeEventListener('mouseover', this._mouseOver);
            this.el.removeEventListener('mouseout', this._mouseOut);
            if (dd_manager_1.DDManager.overResizeElement === this) {
                delete dd_manager_1.DDManager.overResizeElement;
            }
        }
        return this;
    }
    /** @internal */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _mouseOver(e) {
        // console.log(`${count++} pre-enter ${(this.el as GridItemHTMLElement).gridstackNode._id}`)
        // already over a child, ignore. Ideally we just call e.stopPropagation() but see https://github.com/gridstack/gridstack.js/issues/2018
        if (dd_manager_1.DDManager.overResizeElement || dd_manager_1.DDManager.dragElement)
            return;
        dd_manager_1.DDManager.overResizeElement = this;
        // console.log(`${count++} enter ${(this.el as GridItemHTMLElement).gridstackNode._id}`)
        this.el.classList.remove('ui-resizable-autohide');
    }
    /** @internal */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _mouseOut(e) {
        // console.log(`${count++} pre-leave ${(this.el as GridItemHTMLElement).gridstackNode._id}`)
        if (dd_manager_1.DDManager.overResizeElement !== this)
            return;
        delete dd_manager_1.DDManager.overResizeElement;
        // console.log(`${count++} leave ${(this.el as GridItemHTMLElement).gridstackNode._id}`)
        this.el.classList.add('ui-resizable-autohide');
    }
    /** @internal */
    _setupHandlers() {
        let handlerDirection = this.option.handles || 'e,s,se';
        if (handlerDirection === 'all') {
            handlerDirection = 'n,e,s,w,se,sw,ne,nw';
        }
        this.handlers = handlerDirection.split(',')
            .map(dir => dir.trim())
            .map(dir => new dd_resizable_handle_1.DDResizableHandle(this.el, dir, {
            start: (event) => {
                this._resizeStart(event);
            },
            stop: (event) => {
                this._resizeStop(event);
            },
            move: (event) => {
                this._resizing(event, dir);
            }
        }));
        return this;
    }
    /** @internal */
    _resizeStart(event) {
        this.originalRect = this.el.getBoundingClientRect();
        this.scrollEl = utils_1.Utils.getScrollElement(this.el);
        this.scrollY = this.scrollEl.scrollTop;
        this.scrolled = 0;
        this.startEvent = event;
        this._setupHelper();
        this._applyChange();
        const ev = utils_1.Utils.initEvent(event, { type: 'resizestart', target: this.el });
        if (this.option.start) {
            this.option.start(ev, this._ui());
        }
        this.el.classList.add('ui-resizable-resizing');
        this.triggerEvent('resizestart', ev);
        return this;
    }
    /** @internal */
    _resizing(event, dir) {
        this.scrolled = this.scrollEl.scrollTop - this.scrollY;
        this.temporalRect = this._getChange(event, dir);
        this._applyChange();
        const ev = utils_1.Utils.initEvent(event, { type: 'resize', target: this.el });
        if (this.option.resize) {
            this.option.resize(ev, this._ui());
        }
        this.triggerEvent('resize', ev);
        return this;
    }
    /** @internal */
    _resizeStop(event) {
        const ev = utils_1.Utils.initEvent(event, { type: 'resizestop', target: this.el });
        if (this.option.stop) {
            this.option.stop(ev); // Note: ui() not used by gridstack so don't pass
        }
        this.el.classList.remove('ui-resizable-resizing');
        this.triggerEvent('resizestop', ev);
        this._cleanHelper();
        delete this.startEvent;
        delete this.originalRect;
        delete this.temporalRect;
        delete this.scrollY;
        delete this.scrolled;
        return this;
    }
    /** @internal */
    _setupHelper() {
        this.elOriginStyleVal = DDResizable._originStyleProp.map(prop => this.el.style[prop]);
        this.parentOriginStylePosition = this.el.parentElement.style.position;
        if (window.getComputedStyle(this.el.parentElement).position.match(/static/)) {
            this.el.parentElement.style.position = 'relative';
        }
        this.el.style.position = 'absolute';
        this.el.style.opacity = '0.8';
        return this;
    }
    /** @internal */
    _cleanHelper() {
        DDResizable._originStyleProp.forEach((prop, i) => {
            this.el.style[prop] = this.elOriginStyleVal[i] || null;
        });
        this.el.parentElement.style.position = this.parentOriginStylePosition || null;
        return this;
    }
    /** @internal */
    _getChange(event, dir) {
        const oEvent = this.startEvent;
        const newRect = {
            width: this.originalRect.width,
            height: this.originalRect.height + this.scrolled,
            left: this.originalRect.left,
            top: this.originalRect.top - this.scrolled
        };
        const offsetX = event.clientX - oEvent.clientX;
        const offsetY = event.clientY - oEvent.clientY;
        if (dir.indexOf('e') > -1) {
            newRect.width += offsetX;
        }
        else if (dir.indexOf('w') > -1) {
            newRect.width -= offsetX;
            newRect.left += offsetX;
        }
        if (dir.indexOf('s') > -1) {
            newRect.height += offsetY;
        }
        else if (dir.indexOf('n') > -1) {
            newRect.height -= offsetY;
            newRect.top += offsetY;
        }
        const constrain = this._constrainSize(newRect.width, newRect.height);
        if (Math.round(newRect.width) !== Math.round(constrain.width)) { // round to ignore slight round-off errors
            if (dir.indexOf('w') > -1) {
                newRect.left += newRect.width - constrain.width;
            }
            newRect.width = constrain.width;
        }
        if (Math.round(newRect.height) !== Math.round(constrain.height)) {
            if (dir.indexOf('n') > -1) {
                newRect.top += newRect.height - constrain.height;
            }
            newRect.height = constrain.height;
        }
        return newRect;
    }
    /** @internal constrain the size to the set min/max values */
    _constrainSize(oWidth, oHeight) {
        const maxWidth = this.option.maxWidth || Number.MAX_SAFE_INTEGER;
        const minWidth = this.option.minWidth || oWidth;
        const maxHeight = this.option.maxHeight || Number.MAX_SAFE_INTEGER;
        const minHeight = this.option.minHeight || oHeight;
        const width = Math.min(maxWidth, Math.max(minWidth, oWidth));
        const height = Math.min(maxHeight, Math.max(minHeight, oHeight));
        return { width, height };
    }
    /** @internal */
    _applyChange() {
        let containmentRect = { left: 0, top: 0, width: 0, height: 0 };
        if (this.el.style.position === 'absolute') {
            const containmentEl = this.el.parentElement;
            const { left, top } = containmentEl.getBoundingClientRect();
            containmentRect = { left, top, width: 0, height: 0 };
        }
        if (!this.temporalRect)
            return this;
        Object.keys(this.temporalRect).forEach(key => {
            const value = this.temporalRect[key];
            this.el.style[key] = value - containmentRect[key] + 'px';
        });
        return this;
    }
    /** @internal */
    _removeHandlers() {
        this.handlers.forEach(handle => handle.destroy());
        delete this.handlers;
        return this;
    }
}
exports.DDResizable = DDResizable;
/** @internal */
DDResizable._originStyleProp = ['width', 'height', 'position', 'left', 'top', 'opacity', 'zIndex'];
//# sourceMappingURL=dd-resizable.js.map

/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-touch.js":
/*!*****************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-touch.js ***!
  \*****************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * touch.ts 7.3.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pointerleave = exports.pointerenter = exports.pointerdown = exports.touchend = exports.touchmove = exports.touchstart = exports.isTouch = void 0;
const dd_manager_1 = __webpack_require__(/*! ./dd-manager */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-manager.js");
/**
 * Detect touch support - Windows Surface devices and other touch devices
 * should we use this instead ? (what we had for always showing resize handles)
 * /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
 */
exports.isTouch = typeof window !== 'undefined' && typeof document !== 'undefined' &&
    ('ontouchstart' in document
        || 'ontouchstart' in window
        // || !!window.TouchEvent // true on Windows 10 Chrome desktop so don't use this
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        || (window.DocumentTouch && document instanceof window.DocumentTouch)
        || navigator.maxTouchPoints > 0
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        || navigator.msMaxTouchPoints > 0);
// interface TouchCoord {x: number, y: number};
class DDTouch {
}
/**
* Get the x,y position of a touch event
*/
// function getTouchCoords(e: TouchEvent): TouchCoord {
//   return {
//     x: e.changedTouches[0].pageX,
//     y: e.changedTouches[0].pageY
//   };
// }
/**
 * Simulate a mouse event based on a corresponding touch event
 * @param {Object} e A touch event
 * @param {String} simulatedType The corresponding mouse event
 */
function simulateMouseEvent(e, simulatedType) {
    // Ignore multi-touch events
    if (e.touches.length > 1)
        return;
    // Prevent "Ignored attempt to cancel a touchmove event with cancelable=false" errors
    if (e.cancelable)
        e.preventDefault();
    const touch = e.changedTouches[0], simulatedEvent = document.createEvent('MouseEvents');
    // Initialize the simulated mouse event using the touch event's coordinates
    simulatedEvent.initMouseEvent(simulatedType, // type
    true, // bubbles
    true, // cancelable
    window, // view
    1, // detail
    touch.screenX, // screenX
    touch.screenY, // screenY
    touch.clientX, // clientX
    touch.clientY, // clientY
    false, // ctrlKey
    false, // altKey
    false, // shiftKey
    false, // metaKey
    0, // button
    null // relatedTarget
    );
    // Dispatch the simulated event to the target element
    e.target.dispatchEvent(simulatedEvent);
}
/**
 * Simulate a mouse event based on a corresponding Pointer event
 * @param {Object} e A pointer event
 * @param {String} simulatedType The corresponding mouse event
 */
function simulatePointerMouseEvent(e, simulatedType) {
    // Prevent "Ignored attempt to cancel a touchmove event with cancelable=false" errors
    if (e.cancelable)
        e.preventDefault();
    const simulatedEvent = document.createEvent('MouseEvents');
    // Initialize the simulated mouse event using the touch event's coordinates
    simulatedEvent.initMouseEvent(simulatedType, // type
    true, // bubbles
    true, // cancelable
    window, // view
    1, // detail
    e.screenX, // screenX
    e.screenY, // screenY
    e.clientX, // clientX
    e.clientY, // clientY
    false, // ctrlKey
    false, // altKey
    false, // shiftKey
    false, // metaKey
    0, // button
    null // relatedTarget
    );
    // Dispatch the simulated event to the target element
    e.target.dispatchEvent(simulatedEvent);
}
/**
 * Handle the touchstart events
 * @param {Object} e The widget element's touchstart event
 */
function touchstart(e) {
    // Ignore the event if another widget is already being handled
    if (DDTouch.touchHandled)
        return;
    DDTouch.touchHandled = true;
    // Simulate the mouse events
    // simulateMouseEvent(e, 'mouseover');
    // simulateMouseEvent(e, 'mousemove');
    simulateMouseEvent(e, 'mousedown');
}
exports.touchstart = touchstart;
/**
 * Handle the touchmove events
 * @param {Object} e The document's touchmove event
 */
function touchmove(e) {
    // Ignore event if not handled by us
    if (!DDTouch.touchHandled)
        return;
    simulateMouseEvent(e, 'mousemove');
}
exports.touchmove = touchmove;
/**
 * Handle the touchend events
 * @param {Object} e The document's touchend event
 */
function touchend(e) {
    // Ignore event if not handled
    if (!DDTouch.touchHandled)
        return;
    // cancel delayed leave event when we release on ourself which happens BEFORE we get this!
    if (DDTouch.pointerLeaveTimeout) {
        window.clearTimeout(DDTouch.pointerLeaveTimeout);
        delete DDTouch.pointerLeaveTimeout;
    }
    const wasDragging = !!dd_manager_1.DDManager.dragElement;
    // Simulate the mouseup event
    simulateMouseEvent(e, 'mouseup');
    // simulateMouseEvent(event, 'mouseout');
    // If the touch interaction did not move, it should trigger a click
    if (!wasDragging) {
        simulateMouseEvent(e, 'click');
    }
    // Unset the flag to allow other widgets to inherit the touch event
    DDTouch.touchHandled = false;
}
exports.touchend = touchend;
/**
 * Note we don't get touchenter/touchleave (which are deprecated)
 * see https://stackoverflow.com/questions/27908339/js-touch-equivalent-for-mouseenter
 * so instead of PointerEvent to still get enter/leave and send the matching mouse event.
 */
function pointerdown(e) {
    // console.log("pointer down")
    e.target.releasePointerCapture(e.pointerId); // <- Important!
}
exports.pointerdown = pointerdown;
function pointerenter(e) {
    // ignore the initial one we get on pointerdown on ourself
    if (!dd_manager_1.DDManager.dragElement) {
        // console.log('pointerenter ignored');
        return;
    }
    // console.log('pointerenter');
    simulatePointerMouseEvent(e, 'mouseenter');
}
exports.pointerenter = pointerenter;
function pointerleave(e) {
    // ignore the leave on ourself we get before releasing the mouse over ourself
    // by delaying sending the event and having the up event cancel us
    if (!dd_manager_1.DDManager.dragElement) {
        // console.log('pointerleave ignored');
        return;
    }
    DDTouch.pointerLeaveTimeout = window.setTimeout(() => {
        delete DDTouch.pointerLeaveTimeout;
        // console.log('pointerleave delayed');
        simulatePointerMouseEvent(e, 'mouseleave');
    }, 10);
}
exports.pointerleave = pointerleave;
//# sourceMappingURL=dd-touch.js.map

/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/gridstack-engine.js":
/*!*************************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/gridstack-engine.js ***!
  \*************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * gridstack-engine.ts 7.3.0
 * Copyright (c) 2021-2022 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GridStackEngine = void 0;
const utils_1 = __webpack_require__(/*! ./utils */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/utils.js");
/**
 * Defines the GridStack engine that does most no DOM grid manipulation.
 * See GridStack methods and vars for descriptions.
 *
 * NOTE: values should not be modified directly - call the main GridStack API instead
 */
class GridStackEngine {
    constructor(opts = {}) {
        this.addedNodes = [];
        this.removedNodes = [];
        this.column = opts.column || 12;
        this.maxRow = opts.maxRow;
        this._float = opts.float;
        this.nodes = opts.nodes || [];
        this.onChange = opts.onChange;
    }
    batchUpdate(flag = true) {
        if (!!this.batchMode === flag)
            return this;
        this.batchMode = flag;
        if (flag) {
            this._prevFloat = this._float;
            this._float = true; // let things go anywhere for now... will restore and possibly reposition later
            this.saveInitial(); // since begin update (which is called multiple times) won't do this
        }
        else {
            this._float = this._prevFloat;
            delete this._prevFloat;
            this._packNodes()._notify();
        }
        return this;
    }
    // use entire row for hitting area (will use bottom reverse sorted first) if we not actively moving DOWN and didn't already skip
    _useEntireRowArea(node, nn) {
        return (!this.float || this.batchMode && !this._prevFloat) && !this._hasLocked && (!node._moving || node._skipDown || nn.y <= node.y);
    }
    /** @internal fix collision on given 'node', going to given new location 'nn', with optional 'collide' node already found.
     * return true if we moved. */
    _fixCollisions(node, nn = node, collide, opt = {}) {
        this.sortNodes(-1); // from last to first, so recursive collision move items in the right order
        collide = collide || this.collide(node, nn); // REAL area collide for swap and skip if none...
        if (!collide)
            return false;
        // swap check: if we're actively moving in gravity mode, see if we collide with an object the same size
        if (node._moving && !opt.nested && !this.float) {
            if (this.swap(node, collide))
                return true;
        }
        // during while() collisions MAKE SURE to check entire row so larger items don't leap frog small ones (push them all down starting last in grid)
        let area = nn;
        if (this._useEntireRowArea(node, nn)) {
            area = { x: 0, w: this.column, y: nn.y, h: nn.h };
            collide = this.collide(node, area, opt.skip); // force new hit
        }
        let didMove = false;
        let newOpt = { nested: true, pack: false };
        while (collide = collide || this.collide(node, area, opt.skip)) { // could collide with more than 1 item... so repeat for each
            let moved;
            // if colliding with a locked item OR moving down with top gravity (and collide could move up) -> skip past the collide,
            // but remember that skip down so we only do this once (and push others otherwise).
            if (collide.locked || node._moving && !node._skipDown && nn.y > node.y && !this.float &&
                // can take space we had, or before where we're going
                (!this.collide(collide, Object.assign(Object.assign({}, collide), { y: node.y }), node) || !this.collide(collide, Object.assign(Object.assign({}, collide), { y: nn.y - collide.h }), node))) {
                node._skipDown = (node._skipDown || nn.y > node.y);
                moved = this.moveNode(node, Object.assign(Object.assign(Object.assign({}, nn), { y: collide.y + collide.h }), newOpt));
                if (collide.locked && moved) {
                    utils_1.Utils.copyPos(nn, node); // moving after lock become our new desired location
                }
                else if (!collide.locked && moved && opt.pack) {
                    // we moved after and will pack: do it now and keep the original drop location, but past the old collide to see what else we might push way
                    this._packNodes();
                    nn.y = collide.y + collide.h;
                    utils_1.Utils.copyPos(node, nn);
                }
                didMove = didMove || moved;
            }
            else {
                // move collide down *after* where we will be, ignoring where we are now (don't collide with us)
                moved = this.moveNode(collide, Object.assign(Object.assign(Object.assign({}, collide), { y: nn.y + nn.h, skip: node }), newOpt));
            }
            if (!moved) {
                return didMove;
            } // break inf loop if we couldn't move after all (ex: maxRow, fixed)
            collide = undefined;
        }
        return didMove;
    }
    /** return the nodes that intercept the given node. Optionally a different area can be used, as well as a second node to skip */
    collide(skip, area = skip, skip2) {
        return this.nodes.find(n => n !== skip && n !== skip2 && utils_1.Utils.isIntercepted(n, area));
    }
    collideAll(skip, area = skip, skip2) {
        return this.nodes.filter(n => n !== skip && n !== skip2 && utils_1.Utils.isIntercepted(n, area));
    }
    /** does a pixel coverage collision based on where we started, returning the node that has the most coverage that is >50% mid line */
    directionCollideCoverage(node, o, collides) {
        if (!o.rect || !node._rect)
            return;
        let r0 = node._rect; // where started
        let r = Object.assign({}, o.rect); // where we are
        // update dragged rect to show where it's coming from (above or below, etc...)
        if (r.y > r0.y) {
            r.h += r.y - r0.y;
            r.y = r0.y;
        }
        else {
            r.h += r0.y - r.y;
        }
        if (r.x > r0.x) {
            r.w += r.x - r0.x;
            r.x = r0.x;
        }
        else {
            r.w += r0.x - r.x;
        }
        let collide;
        collides.forEach(n => {
            if (n.locked || !n._rect)
                return;
            let r2 = n._rect; // overlapping target
            let yOver = Number.MAX_VALUE, xOver = Number.MAX_VALUE, overMax = 0.5; // need >50%
            // depending on which side we started from, compute the overlap % of coverage
            // (ex: from above/below we only compute the max horizontal line coverage)
            if (r0.y < r2.y) { // from above
                yOver = ((r.y + r.h) - r2.y) / r2.h;
            }
            else if (r0.y + r0.h > r2.y + r2.h) { // from below
                yOver = ((r2.y + r2.h) - r.y) / r2.h;
            }
            if (r0.x < r2.x) { // from the left
                xOver = ((r.x + r.w) - r2.x) / r2.w;
            }
            else if (r0.x + r0.w > r2.x + r2.w) { // from the right
                xOver = ((r2.x + r2.w) - r.x) / r2.w;
            }
            let over = Math.min(xOver, yOver);
            if (over > overMax) {
                overMax = over;
                collide = n;
            }
        });
        o.collide = collide; // save it so we don't have to find it again
        return collide;
    }
    /** does a pixel coverage returning the node that has the most coverage by area */
    /*
    protected collideCoverage(r: GridStackPosition, collides: GridStackNode[]): {collide: GridStackNode, over: number} {
      let collide: GridStackNode;
      let overMax = 0;
      collides.forEach(n => {
        if (n.locked || !n._rect) return;
        let over = Utils.areaIntercept(r, n._rect);
        if (over > overMax) {
          overMax = over;
          collide = n;
        }
      });
      return {collide, over: overMax};
    }
    */
    /** called to cache the nodes pixel rectangles used for collision detection during drag */
    cacheRects(w, h, top, right, bottom, left) {
        this.nodes.forEach(n => n._rect = {
            y: n.y * h + top,
            x: n.x * w + left,
            w: n.w * w - left - right,
            h: n.h * h - top - bottom
        });
        return this;
    }
    /** called to possibly swap between 2 nodes (same size or column, not locked, touching), returning true if successful */
    swap(a, b) {
        if (!b || b.locked || !a || a.locked)
            return false;
        function _doSwap() {
            let x = b.x, y = b.y;
            b.x = a.x;
            b.y = a.y; // b -> a position
            if (a.h != b.h) {
                a.x = x;
                a.y = b.y + b.h; // a -> goes after b
            }
            else if (a.w != b.w) {
                a.x = b.x + b.w;
                a.y = y; // a -> goes after b
            }
            else {
                a.x = x;
                a.y = y; // a -> old b position
            }
            a._dirty = b._dirty = true;
            return true;
        }
        let touching; // remember if we called it (vs undefined)
        // same size and same row or column, and touching
        if (a.w === b.w && a.h === b.h && (a.x === b.x || a.y === b.y) && (touching = utils_1.Utils.isTouching(a, b)))
            return _doSwap();
        if (touching === false)
            return; // IFF ran test and fail, bail out
        // check for taking same columns (but different height) and touching
        if (a.w === b.w && a.x === b.x && (touching || (touching = utils_1.Utils.isTouching(a, b)))) {
            if (b.y < a.y) {
                let t = a;
                a = b;
                b = t;
            } // swap a <-> b vars so a is first
            return _doSwap();
        }
        if (touching === false)
            return;
        // check if taking same row (but different width) and touching
        if (a.h === b.h && a.y === b.y && (touching || (touching = utils_1.Utils.isTouching(a, b)))) {
            if (b.x < a.x) {
                let t = a;
                a = b;
                b = t;
            } // swap a <-> b vars so a is first
            return _doSwap();
        }
        return false;
    }
    isAreaEmpty(x, y, w, h) {
        let nn = { x: x || 0, y: y || 0, w: w || 1, h: h || 1 };
        return !this.collide(nn);
    }
    /** re-layout grid items to reclaim any empty space */
    compact() {
        if (this.nodes.length === 0)
            return this;
        this.batchUpdate()
            .sortNodes();
        let copyNodes = this.nodes;
        this.nodes = []; // pretend we have no nodes to conflict layout to start with...
        copyNodes.forEach(node => {
            if (!node.locked) {
                node.autoPosition = true;
            }
            this.addNode(node, false); // 'false' for add event trigger
            node._dirty = true; // will force attr update
        });
        return this.batchUpdate(false);
    }
    /** enable/disable floating widgets (default: `false`) See [example](http://gridstackjs.com/demo/float.html) */
    set float(val) {
        if (this._float === val)
            return;
        this._float = val || false;
        if (!val) {
            this._packNodes()._notify();
        }
    }
    /** float getter method */
    get float() { return this._float || false; }
    /** sort the nodes array from first to last, or reverse. Called during collision/placement to force an order */
    sortNodes(dir) {
        this.nodes = utils_1.Utils.sort(this.nodes, dir, this.column);
        return this;
    }
    /** @internal called to top gravity pack the items back OR revert back to original Y positions when floating */
    _packNodes() {
        if (this.batchMode) {
            return this;
        }
        this.sortNodes(); // first to last
        if (this.float) {
            // restore original Y pos
            this.nodes.forEach(n => {
                if (n._updating || n._orig === undefined || n.y === n._orig.y)
                    return;
                let newY = n.y;
                while (newY > n._orig.y) {
                    --newY;
                    let collide = this.collide(n, { x: n.x, y: newY, w: n.w, h: n.h });
                    if (!collide) {
                        n._dirty = true;
                        n.y = newY;
                    }
                }
            });
        }
        else {
            // top gravity pack
            this.nodes.forEach((n, i) => {
                if (n.locked)
                    return;
                while (n.y > 0) {
                    let newY = i === 0 ? 0 : n.y - 1;
                    let canBeMoved = i === 0 || !this.collide(n, { x: n.x, y: newY, w: n.w, h: n.h });
                    if (!canBeMoved)
                        break;
                    // Note: must be dirty (from last position) for GridStack::OnChange CB to update positions
                    // and move items back. The user 'change' CB should detect changes from the original
                    // starting position instead.
                    n._dirty = (n.y !== newY);
                    n.y = newY;
                }
            });
        }
        return this;
    }
    /**
     * given a random node, makes sure it's coordinates/values are valid in the current grid
     * @param node to adjust
     * @param resizing if out of bound, resize down or move into the grid to fit ?
     */
    prepareNode(node, resizing) {
        node = node || {};
        node._id = node._id || GridStackEngine._idSeq++;
        // if we're missing position, have the grid position us automatically (before we set them to 0,0)
        if (node.x === undefined || node.y === undefined || node.x === null || node.y === null) {
            node.autoPosition = true;
        }
        // assign defaults for missing required fields
        let defaults = { x: 0, y: 0, w: 1, h: 1 };
        utils_1.Utils.defaults(node, defaults);
        if (!node.autoPosition) {
            delete node.autoPosition;
        }
        if (!node.noResize) {
            delete node.noResize;
        }
        if (!node.noMove) {
            delete node.noMove;
        }
        // check for NaN (in case messed up strings were passed. can't do parseInt() || defaults.x above as 0 is valid #)
        if (typeof node.x == 'string') {
            node.x = Number(node.x);
        }
        if (typeof node.y == 'string') {
            node.y = Number(node.y);
        }
        if (typeof node.w == 'string') {
            node.w = Number(node.w);
        }
        if (typeof node.h == 'string') {
            node.h = Number(node.h);
        }
        if (isNaN(node.x)) {
            node.x = defaults.x;
            node.autoPosition = true;
        }
        if (isNaN(node.y)) {
            node.y = defaults.y;
            node.autoPosition = true;
        }
        if (isNaN(node.w)) {
            node.w = defaults.w;
        }
        if (isNaN(node.h)) {
            node.h = defaults.h;
        }
        return this.nodeBoundFix(node, resizing);
    }
    /** part2 of preparing a node to fit inside our grid - checks for x,y,w from grid dimensions */
    nodeBoundFix(node, resizing) {
        let before = node._orig || utils_1.Utils.copyPos({}, node);
        if (node.maxW) {
            node.w = Math.min(node.w, node.maxW);
        }
        if (node.maxH) {
            node.h = Math.min(node.h, node.maxH);
        }
        if (node.minW && node.minW <= this.column) {
            node.w = Math.max(node.w, node.minW);
        }
        if (node.minH) {
            node.h = Math.max(node.h, node.minH);
        }
        // if user loaded a larger than allowed widget for current # of columns (or force 1 column mode),
        // remember it's position & width so we can restore back (1 -> 12 column) #1655 #1985
        // IFF we're not in the middle of column resizing!
        const saveOrig = this.column === 1 || node.x + node.w > this.column;
        if (saveOrig && this.column < 12 && !this._inColumnResize && node._id && this.findCacheLayout(node, 12) === -1) {
            let copy = Object.assign({}, node); // need _id + positions
            if (copy.autoPosition) {
                delete copy.x;
                delete copy.y;
            }
            else
                copy.x = Math.min(11, copy.x);
            copy.w = Math.min(12, copy.w);
            this.cacheOneLayout(copy, 12);
        }
        if (node.w > this.column) {
            node.w = this.column;
        }
        else if (node.w < 1) {
            node.w = 1;
        }
        if (this.maxRow && node.h > this.maxRow) {
            node.h = this.maxRow;
        }
        else if (node.h < 1) {
            node.h = 1;
        }
        if (node.x < 0) {
            node.x = 0;
        }
        if (node.y < 0) {
            node.y = 0;
        }
        if (node.x + node.w > this.column) {
            if (resizing) {
                node.w = this.column - node.x;
            }
            else {
                node.x = this.column - node.w;
            }
        }
        if (this.maxRow && node.y + node.h > this.maxRow) {
            if (resizing) {
                node.h = this.maxRow - node.y;
            }
            else {
                node.y = this.maxRow - node.h;
            }
        }
        if (!utils_1.Utils.samePos(node, before)) {
            node._dirty = true;
        }
        return node;
    }
    /** returns a list of modified nodes from their original values */
    getDirtyNodes(verify) {
        // compare original x,y,w,h instead as _dirty can be a temporary state
        if (verify) {
            return this.nodes.filter(n => n._dirty && !utils_1.Utils.samePos(n, n._orig));
        }
        return this.nodes.filter(n => n._dirty);
    }
    /** @internal call this to call onChange callback with dirty nodes so DOM can be updated */
    _notify(removedNodes) {
        if (this.batchMode || !this.onChange)
            return this;
        let dirtyNodes = (removedNodes || []).concat(this.getDirtyNodes());
        this.onChange(dirtyNodes);
        return this;
    }
    /** @internal remove dirty and last tried info */
    cleanNodes() {
        if (this.batchMode)
            return this;
        this.nodes.forEach(n => {
            delete n._dirty;
            delete n._lastTried;
        });
        return this;
    }
    /** @internal called to save initial position/size to track real dirty state.
     * Note: should be called right after we call change event (so next API is can detect changes)
     * as well as right before we start move/resize/enter (so we can restore items to prev values) */
    saveInitial() {
        this.nodes.forEach(n => {
            n._orig = utils_1.Utils.copyPos({}, n);
            delete n._dirty;
        });
        this._hasLocked = this.nodes.some(n => n.locked);
        return this;
    }
    /** @internal restore all the nodes back to initial values (called when we leave) */
    restoreInitial() {
        this.nodes.forEach(n => {
            if (utils_1.Utils.samePos(n, n._orig))
                return;
            utils_1.Utils.copyPos(n, n._orig);
            n._dirty = true;
        });
        this._notify();
        return this;
    }
    /** find the first available empty spot for the given node width/height, updating the x,y attributes. return true if found.
     * optionally you can pass your own existing node list and column count, otherwise defaults to that engine data.
     */
    findEmptyPosition(node, nodeList = this.nodes, column = this.column) {
        nodeList = utils_1.Utils.sort(nodeList, -1, column);
        let found = false;
        for (let i = 0; !found; ++i) {
            let x = i % column;
            let y = Math.floor(i / column);
            if (x + node.w > column) {
                continue;
            }
            let box = { x, y, w: node.w, h: node.h };
            if (!nodeList.find(n => utils_1.Utils.isIntercepted(box, n))) {
                node.x = x;
                node.y = y;
                delete node.autoPosition;
                found = true;
            }
        }
        return found;
    }
    /** call to add the given node to our list, fixing collision and re-packing */
    addNode(node, triggerAddEvent = false) {
        let dup = this.nodes.find(n => n._id === node._id);
        if (dup)
            return dup; // prevent inserting twice! return it instead.
        // skip prepareNode if we're in middle of column resize (not new) but do check for bounds!
        node = this._inColumnResize ? this.nodeBoundFix(node) : this.prepareNode(node);
        delete node._temporaryRemoved;
        delete node._removeDOM;
        if (node.autoPosition && this.findEmptyPosition(node)) {
            delete node.autoPosition; // found our slot
        }
        this.nodes.push(node);
        if (triggerAddEvent) {
            this.addedNodes.push(node);
        }
        this._fixCollisions(node);
        if (!this.batchMode) {
            this._packNodes()._notify();
        }
        return node;
    }
    removeNode(node, removeDOM = true, triggerEvent = false) {
        if (!this.nodes.find(n => n === node)) {
            // TEST console.log(`Error: GridStackEngine.removeNode() node._id=${node._id} not found!`)
            return this;
        }
        if (triggerEvent) { // we wait until final drop to manually track removed items (rather than during drag)
            this.removedNodes.push(node);
        }
        if (removeDOM)
            node._removeDOM = true; // let CB remove actual HTML (used to set _id to null, but then we loose layout info)
        // don't use 'faster' .splice(findIndex(),1) in case node isn't in our list, or in multiple times.
        this.nodes = this.nodes.filter(n => n !== node);
        return this._packNodes()
            ._notify([node]);
    }
    removeAll(removeDOM = true) {
        delete this._layouts;
        if (this.nodes.length === 0)
            return this;
        removeDOM && this.nodes.forEach(n => n._removeDOM = true); // let CB remove actual HTML (used to set _id to null, but then we loose layout info)
        this.removedNodes = this.nodes;
        this.nodes = [];
        return this._notify(this.removedNodes);
    }
    /** checks if item can be moved (layout constrain) vs moveNode(), returning true if was able to move.
     * In more complicated cases (maxRow) it will attempt at moving the item and fixing
     * others in a clone first, then apply those changes if still within specs. */
    moveNodeCheck(node, o) {
        // if (node.locked) return false;
        if (!this.changedPosConstrain(node, o))
            return false;
        o.pack = true;
        // simpler case: move item directly...
        if (!this.maxRow) {
            return this.moveNode(node, o);
        }
        // complex case: create a clone with NO maxRow (will check for out of bounds at the end)
        let clonedNode;
        let clone = new GridStackEngine({
            column: this.column,
            float: this.float,
            nodes: this.nodes.map(n => {
                if (n === node) {
                    clonedNode = Object.assign({}, n);
                    return clonedNode;
                }
                return Object.assign({}, n);
            })
        });
        if (!clonedNode)
            return false;
        // check if we're covering 50% collision and could move
        let canMove = clone.moveNode(clonedNode, o) && clone.getRow() <= this.maxRow;
        // else check if we can force a swap (float=true, or different shapes) on non-resize
        if (!canMove && !o.resizing && o.collide) {
            let collide = o.collide.el.gridstackNode; // find the source node the clone collided with at 50%
            if (this.swap(node, collide)) { // swaps and mark dirty
                this._notify();
                return true;
            }
        }
        if (!canMove)
            return false;
        // if clone was able to move, copy those mods over to us now instead of caller trying to do this all over!
        // Note: we can't use the list directly as elements and other parts point to actual node, so copy content
        clone.nodes.filter(n => n._dirty).forEach(c => {
            let n = this.nodes.find(a => a._id === c._id);
            if (!n)
                return;
            utils_1.Utils.copyPos(n, c);
            n._dirty = true;
        });
        this._notify();
        return true;
    }
    /** return true if can fit in grid height constrain only (always true if no maxRow) */
    willItFit(node) {
        delete node._willFitPos;
        if (!this.maxRow)
            return true;
        // create a clone with NO maxRow and check if still within size
        let clone = new GridStackEngine({
            column: this.column,
            float: this.float,
            nodes: this.nodes.map(n => { return Object.assign({}, n); })
        });
        let n = Object.assign({}, node); // clone node so we don't mod any settings on it but have full autoPosition and min/max as well! #1687
        this.cleanupNode(n);
        delete n.el;
        delete n._id;
        delete n.content;
        delete n.grid;
        clone.addNode(n);
        if (clone.getRow() <= this.maxRow) {
            node._willFitPos = utils_1.Utils.copyPos({}, n);
            return true;
        }
        return false;
    }
    /** true if x,y or w,h are different after clamping to min/max */
    changedPosConstrain(node, p) {
        // first make sure w,h are set for caller
        p.w = p.w || node.w;
        p.h = p.h || node.h;
        if (node.x !== p.x || node.y !== p.y)
            return true;
        // check constrained w,h
        if (node.maxW) {
            p.w = Math.min(p.w, node.maxW);
        }
        if (node.maxH) {
            p.h = Math.min(p.h, node.maxH);
        }
        if (node.minW) {
            p.w = Math.max(p.w, node.minW);
        }
        if (node.minH) {
            p.h = Math.max(p.h, node.minH);
        }
        return (node.w !== p.w || node.h !== p.h);
    }
    /** return true if the passed in node was actually moved (checks for no-op and locked) */
    moveNode(node, o) {
        var _a, _b;
        if (!node || /*node.locked ||*/ !o)
            return false;
        let wasUndefinedPack;
        if (o.pack === undefined) {
            wasUndefinedPack = o.pack = true;
        }
        // constrain the passed in values and check if we're still changing our node
        if (typeof o.x !== 'number') {
            o.x = node.x;
        }
        if (typeof o.y !== 'number') {
            o.y = node.y;
        }
        if (typeof o.w !== 'number') {
            o.w = node.w;
        }
        if (typeof o.h !== 'number') {
            o.h = node.h;
        }
        let resizing = (node.w !== o.w || node.h !== o.h);
        let nn = utils_1.Utils.copyPos({}, node, true); // get min/max out first, then opt positions next
        utils_1.Utils.copyPos(nn, o);
        nn = this.nodeBoundFix(nn, resizing);
        utils_1.Utils.copyPos(o, nn);
        if (utils_1.Utils.samePos(node, o))
            return false;
        let prevPos = utils_1.Utils.copyPos({}, node);
        // check if we will need to fix collision at our new location
        let collides = this.collideAll(node, nn, o.skip);
        let needToMove = true;
        if (collides.length) {
            let activeDrag = node._moving && !o.nested;
            // check to make sure we actually collided over 50% surface area while dragging
            let collide = activeDrag ? this.directionCollideCoverage(node, o, collides) : collides[0];
            // if we're enabling creation of sub-grids on the fly, see if we're covering 80% of either one, if we didn't already do that
            if (activeDrag && collide && ((_b = (_a = node.grid) === null || _a === void 0 ? void 0 : _a.opts) === null || _b === void 0 ? void 0 : _b.subGridDynamic) && !node.grid._isTemp) {
                let over = utils_1.Utils.areaIntercept(o.rect, collide._rect);
                let a1 = utils_1.Utils.area(o.rect);
                let a2 = utils_1.Utils.area(collide._rect);
                let perc = over / (a1 < a2 ? a1 : a2);
                if (perc > .8) {
                    collide.grid.makeSubGrid(collide.el, undefined, node);
                    collide = undefined;
                }
            }
            if (collide) {
                needToMove = !this._fixCollisions(node, nn, collide, o); // check if already moved...
            }
            else {
                needToMove = false; // we didn't cover >50% for a move, skip...
                if (wasUndefinedPack)
                    delete o.pack;
            }
        }
        // now move (to the original ask vs the collision version which might differ) and repack things
        if (needToMove) {
            node._dirty = true;
            utils_1.Utils.copyPos(node, nn);
        }
        if (o.pack) {
            this._packNodes()
                ._notify();
        }
        return !utils_1.Utils.samePos(node, prevPos); // pack might have moved things back
    }
    getRow() {
        return this.nodes.reduce((row, n) => Math.max(row, n.y + n.h), 0);
    }
    beginUpdate(node) {
        if (!node._updating) {
            node._updating = true;
            delete node._skipDown;
            if (!this.batchMode)
                this.saveInitial();
        }
        return this;
    }
    endUpdate() {
        let n = this.nodes.find(n => n._updating);
        if (n) {
            delete n._updating;
            delete n._skipDown;
        }
        return this;
    }
    /** saves a copy of the largest column layout (eg 12 even when rendering oneColumnMode) so we don't loose orig layout,
     * returning a list of widgets for serialization */
    save(saveElement = true) {
        var _a;
        // use the highest layout for any saved info so we can have full detail on reload #1849
        let len = (_a = this._layouts) === null || _a === void 0 ? void 0 : _a.length;
        let layout = len && this.column !== (len - 1) ? this._layouts[len - 1] : null;
        let list = [];
        this.sortNodes();
        this.nodes.forEach(n => {
            let wl = layout === null || layout === void 0 ? void 0 : layout.find(l => l._id === n._id);
            let w = Object.assign({}, n);
            // use layout info instead if set
            if (wl) {
                w.x = wl.x;
                w.y = wl.y;
                w.w = wl.w;
            }
            utils_1.Utils.removeInternalForSave(w, !saveElement);
            list.push(w);
        });
        return list;
    }
    /** @internal called whenever a node is added or moved - updates the cached layouts */
    layoutsNodesChange(nodes) {
        if (!this._layouts || this._inColumnResize)
            return this;
        // remove smaller layouts - we will re-generate those on the fly... larger ones need to update
        this._layouts.forEach((layout, column) => {
            if (!layout || column === this.column)
                return this;
            if (column < this.column) {
                this._layouts[column] = undefined;
            }
            else {
                // we save the original x,y,w (h isn't cached) to see what actually changed to propagate better.
                // NOTE: we don't need to check against out of bound scaling/moving as that will be done when using those cache values. #1785
                let ratio = column / this.column;
                nodes.forEach(node => {
                    if (!node._orig)
                        return; // didn't change (newly added ?)
                    let n = layout.find(l => l._id === node._id);
                    if (!n)
                        return; // no cache for new nodes. Will use those values.
                    // Y changed, push down same amount
                    // TODO: detect doing item 'swaps' will help instead of move (especially in 1 column mode)
                    if (node.y !== node._orig.y) {
                        n.y += (node.y - node._orig.y);
                    }
                    // X changed, scale from new position
                    if (node.x !== node._orig.x) {
                        n.x = Math.round(node.x * ratio);
                    }
                    // width changed, scale from new width
                    if (node.w !== node._orig.w) {
                        n.w = Math.round(node.w * ratio);
                    }
                    // ...height always carries over from cache
                });
            }
        });
        return this;
    }
    /**
     * @internal Called to scale the widget width & position up/down based on the column change.
     * Note we store previous layouts (especially original ones) to make it possible to go
     * from say 12 -> 1 -> 12 and get back to where we were.
     *
     * @param prevColumn previous number of columns
     * @param column  new column number
     * @param nodes different sorted list (ex: DOM order) instead of current list
     * @param layout specify the type of re-layout that will happen (position, size, etc...).
     * Note: items will never be outside of the current column boundaries. default (moveScale). Ignored for 1 column
     */
    updateNodeWidths(prevColumn, column, nodes, layout = 'moveScale') {
        var _a;
        if (!this.nodes.length || !column || prevColumn === column)
            return this;
        // cache the current layout in case they want to go back (like 12 -> 1 -> 12) as it requires original data
        this.cacheLayout(this.nodes, prevColumn);
        this.batchUpdate(); // do this EARLY as it will call saveInitial() so we can detect where we started for _dirty and collision
        let newNodes = [];
        // if we're going to 1 column and using DOM order rather than default sorting, then generate that layout
        let domOrder = false;
        if (column === 1 && (nodes === null || nodes === void 0 ? void 0 : nodes.length)) {
            domOrder = true;
            let top = 0;
            nodes.forEach(n => {
                n.x = 0;
                n.w = 1;
                n.y = Math.max(n.y, top);
                top = n.y + n.h;
            });
            newNodes = nodes;
            nodes = [];
        }
        else {
            nodes = utils_1.Utils.sort(this.nodes, -1, prevColumn); // current column reverse sorting so we can insert last to front (limit collision)
        }
        // see if we have cached previous layout IFF we are going up in size (restore) otherwise always
        // generate next size down from where we are (looks more natural as you gradually size down).
        let cacheNodes = [];
        if (column > prevColumn) {
            cacheNodes = this._layouts[column] || [];
            // ...if not, start with the largest layout (if not already there) as down-scaling is more accurate
            // by pretending we came from that larger column by assigning those values as starting point
            let lastIndex = this._layouts.length - 1;
            if (!cacheNodes.length && prevColumn !== lastIndex && ((_a = this._layouts[lastIndex]) === null || _a === void 0 ? void 0 : _a.length)) {
                prevColumn = lastIndex;
                this._layouts[lastIndex].forEach(cacheNode => {
                    let n = nodes.find(n => n._id === cacheNode._id);
                    if (n) {
                        // still current, use cache info positions
                        n.x = cacheNode.x;
                        n.y = cacheNode.y;
                        n.w = cacheNode.w;
                    }
                });
            }
        }
        // if we found cache re-use those nodes that are still current
        cacheNodes.forEach(cacheNode => {
            let j = nodes.findIndex(n => n._id === cacheNode._id);
            if (j !== -1) {
                // still current, use cache info positions
                if (cacheNode.autoPosition || isNaN(cacheNode.x) || isNaN(cacheNode.y)) {
                    this.findEmptyPosition(cacheNode, newNodes);
                }
                if (!cacheNode.autoPosition) {
                    nodes[j].x = cacheNode.x;
                    nodes[j].y = cacheNode.y;
                    nodes[j].w = cacheNode.w;
                    newNodes.push(nodes[j]);
                }
                nodes.splice(j, 1);
            }
        });
        // ...and add any extra non-cached ones
        if (nodes.length) {
            if (typeof layout === 'function') {
                layout(column, prevColumn, newNodes, nodes);
            }
            else if (!domOrder) {
                let ratio = column / prevColumn;
                let move = (layout === 'move' || layout === 'moveScale');
                let scale = (layout === 'scale' || layout === 'moveScale');
                nodes.forEach(node => {
                    // NOTE: x + w could be outside of the grid, but addNode() below will handle that
                    node.x = (column === 1 ? 0 : (move ? Math.round(node.x * ratio) : Math.min(node.x, column - 1)));
                    node.w = ((column === 1 || prevColumn === 1) ? 1 :
                        scale ? (Math.round(node.w * ratio) || 1) : (Math.min(node.w, column)));
                    newNodes.push(node);
                });
                nodes = [];
            }
        }
        // finally re-layout them in reverse order (to get correct placement)
        if (!domOrder)
            newNodes = utils_1.Utils.sort(newNodes, -1, column);
        this._inColumnResize = true; // prevent cache update
        this.nodes = []; // pretend we have no nodes to start with (add() will use same structures) to simplify layout
        newNodes.forEach(node => {
            this.addNode(node, false); // 'false' for add event trigger
            delete node._orig; // make sure the commit doesn't try to restore things back to original
        });
        this.batchUpdate(false);
        delete this._inColumnResize;
        return this;
    }
    /**
     * call to cache the given layout internally to the given location so we can restore back when column changes size
     * @param nodes list of nodes
     * @param column corresponding column index to save it under
     * @param clear if true, will force other caches to be removed (default false)
     */
    cacheLayout(nodes, column, clear = false) {
        let copy = [];
        nodes.forEach((n, i) => {
            n._id = n._id || GridStackEngine._idSeq++; // make sure we have an id in case this is new layout, else re-use id already set
            copy[i] = { x: n.x, y: n.y, w: n.w, _id: n._id }; // only thing we change is x,y,w and id to find it back
        });
        this._layouts = clear ? [] : this._layouts || []; // use array to find larger quick
        this._layouts[column] = copy;
        return this;
    }
    /**
     * call to cache the given node layout internally to the given location so we can restore back when column changes size
     * @param node single node to cache
     * @param column corresponding column index to save it under
     */
    cacheOneLayout(n, column) {
        n._id = n._id || GridStackEngine._idSeq++;
        let l = { x: n.x, y: n.y, w: n.w, _id: n._id };
        if (n.autoPosition) {
            delete l.x;
            delete l.y;
            l.autoPosition = true;
        }
        this._layouts = this._layouts || [];
        this._layouts[column] = this._layouts[column] || [];
        let index = this.findCacheLayout(n, column);
        if (index === -1)
            this._layouts[column].push(l);
        else
            this._layouts[column][index] = l;
        return this;
    }
    findCacheLayout(n, column) {
        var _a, _b, _c;
        return (_c = (_b = (_a = this._layouts) === null || _a === void 0 ? void 0 : _a[column]) === null || _b === void 0 ? void 0 : _b.findIndex(l => l._id === n._id)) !== null && _c !== void 0 ? _c : -1;
    }
    /** called to remove all internal values but the _id */
    cleanupNode(node) {
        for (let prop in node) {
            if (prop[0] === '_' && prop !== '_id')
                delete node[prop];
        }
        return this;
    }
}
exports.GridStackEngine = GridStackEngine;
/** @internal unique global internal _id counter NOT starting at 0 */
GridStackEngine._idSeq = 1;
//# sourceMappingURL=gridstack-engine.js.map

/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/gridstack.js":
/*!******************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/gridstack.js ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GridStack = void 0;
/*!
 * GridStack 7.3.0
 * https://gridstackjs.com/
 *
 * Copyright (c) 2021-2022 Alain Dumesny
 * see root license https://github.com/gridstack/gridstack.js/tree/master/LICENSE
 */
const gridstack_engine_1 = __webpack_require__(/*! ./gridstack-engine */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/gridstack-engine.js");
const utils_1 = __webpack_require__(/*! ./utils */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/utils.js");
const types_1 = __webpack_require__(/*! ./types */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/types.js");
/*
 * and include D&D by default
 * TODO: while we could generate a gridstack-static.js at smaller size - saves about 31k (41k -> 72k)
 * I don't know how to generate the DD only code at the remaining 31k to delay load as code depends on Gridstack.ts
 * also it caused loading issues in prod - see https://github.com/gridstack/gridstack.js/issues/2039
 */
const dd_gridstack_1 = __webpack_require__(/*! ./dd-gridstack */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-gridstack.js");
const dd_touch_1 = __webpack_require__(/*! ./dd-touch */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-touch.js");
const dd_manager_1 = __webpack_require__(/*! ./dd-manager */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-manager.js");
/** global instance */
const dd = new dd_gridstack_1.DDGridStack;
// export all dependent file as well to make it easier for users to just import the main file
__exportStar(__webpack_require__(/*! ./types */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/types.js"), exports);
__exportStar(__webpack_require__(/*! ./utils */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/utils.js"), exports);
__exportStar(__webpack_require__(/*! ./gridstack-engine */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/gridstack-engine.js"), exports);
__exportStar(__webpack_require__(/*! ./dd-gridstack */ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/dd-gridstack.js"), exports);
/**
 * Main gridstack class - you will need to call `GridStack.init()` first to initialize your grid.
 * Note: your grid elements MUST have the following classes for the CSS layout to work:
 * @example
 * <div class="grid-stack">
 *   <div class="grid-stack-item">
 *     <div class="grid-stack-item-content">Item 1</div>
 *   </div>
 * </div>
 */
class GridStack {
    /**
     * Construct a grid item from the given element and options
     * @param el
     * @param opts
     */
    constructor(el, opts = {}) {
        var _a, _b;
        /** @internal */
        this._gsEventHandler = {};
        /** @internal extra row added when dragging at the bottom of the grid */
        this._extraDragRow = 0;
        this.el = el; // exposed HTML element to the user
        opts = opts || {}; // handles null/undefined/0
        if (!el.classList.contains('grid-stack')) {
            this.el.classList.add('grid-stack');
        }
        // if row property exists, replace minRow and maxRow instead
        if (opts.row) {
            opts.minRow = opts.maxRow = opts.row;
            delete opts.row;
        }
        let rowAttr = utils_1.Utils.toNumber(el.getAttribute('gs-row'));
        // flag only valid in sub-grids (handled by parent, not here)
        if (opts.column === 'auto') {
            delete opts.column;
        }
        // 'minWidth' legacy support in 5.1
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        let anyOpts = opts;
        if (anyOpts.minWidth !== undefined) {
            opts.oneColumnSize = opts.oneColumnSize || anyOpts.minWidth;
            delete anyOpts.minWidth;
        }
        // save original setting so we can restore on save
        if (opts.alwaysShowResizeHandle !== undefined) {
            opts._alwaysShowResizeHandle = opts.alwaysShowResizeHandle;
        }
        // elements DOM attributes override any passed options (like CSS style) - merge the two together
        let defaults = Object.assign(Object.assign({}, utils_1.Utils.cloneDeep(types_1.gridDefaults)), { column: utils_1.Utils.toNumber(el.getAttribute('gs-column')) || types_1.gridDefaults.column, minRow: rowAttr ? rowAttr : utils_1.Utils.toNumber(el.getAttribute('gs-min-row')) || types_1.gridDefaults.minRow, maxRow: rowAttr ? rowAttr : utils_1.Utils.toNumber(el.getAttribute('gs-max-row')) || types_1.gridDefaults.maxRow, staticGrid: utils_1.Utils.toBool(el.getAttribute('gs-static')) || types_1.gridDefaults.staticGrid, draggable: {
                handle: (opts.handleClass ? '.' + opts.handleClass : (opts.handle ? opts.handle : '')) || types_1.gridDefaults.draggable.handle,
            }, removableOptions: {
                accept: opts.itemClass ? '.' + opts.itemClass : types_1.gridDefaults.removableOptions.accept,
            } });
        if (el.getAttribute('gs-animate')) { // default to true, but if set to false use that instead
            defaults.animate = utils_1.Utils.toBool(el.getAttribute('gs-animate'));
        }
        this.opts = utils_1.Utils.defaults(opts, defaults);
        opts = null; // make sure we use this.opts instead
        this._initMargin(); // part of settings defaults...
        // Now check if we're loading into 1 column mode FIRST so we don't do un-necessary work (like cellHeight = width / 12 then go 1 column)
        if (this.opts.column !== 1 && !this.opts.disableOneColumnMode && this._widthOrContainer() <= this.opts.oneColumnSize) {
            this._prevColumn = this.getColumn();
            this.opts.column = 1;
        }
        if (this.opts.rtl === 'auto') {
            this.opts.rtl = (el.style.direction === 'rtl');
        }
        if (this.opts.rtl) {
            this.el.classList.add('grid-stack-rtl');
        }
        // check if we're been nested, and if so update our style and keep pointer around (used during save)
        let parentGridItem = (_a = utils_1.Utils.closestUpByClass(this.el, types_1.gridDefaults.itemClass)) === null || _a === void 0 ? void 0 : _a.gridstackNode;
        if (parentGridItem) {
            parentGridItem.subGrid = this;
            this.parentGridItem = parentGridItem;
            this.el.classList.add('grid-stack-nested');
            parentGridItem.el.classList.add('grid-stack-sub-grid');
        }
        this._isAutoCellHeight = (this.opts.cellHeight === 'auto');
        if (this._isAutoCellHeight || this.opts.cellHeight === 'initial') {
            // make the cell content square initially (will use resize/column event to keep it square)
            this.cellHeight(undefined, false);
        }
        else {
            // append unit if any are set
            if (typeof this.opts.cellHeight == 'number' && this.opts.cellHeightUnit && this.opts.cellHeightUnit !== types_1.gridDefaults.cellHeightUnit) {
                this.opts.cellHeight = this.opts.cellHeight + this.opts.cellHeightUnit;
                delete this.opts.cellHeightUnit;
            }
            this.cellHeight(this.opts.cellHeight, false);
        }
        // see if we need to adjust auto-hide
        if (this.opts.alwaysShowResizeHandle === 'mobile') {
            this.opts.alwaysShowResizeHandle = dd_touch_1.isTouch;
        }
        this._styleSheetClass = 'grid-stack-instance-' + gridstack_engine_1.GridStackEngine._idSeq++;
        this.el.classList.add(this._styleSheetClass);
        this._setStaticClass();
        let engineClass = this.opts.engineClass || GridStack.engineClass || gridstack_engine_1.GridStackEngine;
        this.engine = new engineClass({
            column: this.getColumn(),
            float: this.opts.float,
            maxRow: this.opts.maxRow,
            onChange: (cbNodes) => {
                let maxH = 0;
                this.engine.nodes.forEach(n => { maxH = Math.max(maxH, n.y + n.h); });
                cbNodes.forEach(n => {
                    let el = n.el;
                    if (!el)
                        return;
                    if (n._removeDOM) {
                        if (el)
                            el.remove();
                        delete n._removeDOM;
                    }
                    else {
                        this._writePosAttr(el, n);
                    }
                });
                this._updateStyles(false, maxH); // false = don't recreate, just append if need be
            }
        });
        if (this.opts.auto) {
            this.batchUpdate(); // prevent in between re-layout #1535 TODO: this only set float=true, need to prevent collision check...
            this.getGridItems().forEach(el => this._prepareElement(el));
            this.batchUpdate(false);
        }
        // load any passed in children as well, which overrides any DOM layout done above
        if (this.opts.children) {
            let children = this.opts.children;
            delete this.opts.children;
            if (children.length)
                this.load(children); // don't load empty
        }
        this.setAnimation(this.opts.animate);
        this._updateStyles();
        if (this.opts.column != 12) {
            this.el.classList.add('grid-stack-' + this.opts.column);
        }
        // legacy support to appear 'per grid` options when really global.
        if (this.opts.dragIn)
            GridStack.setupDragIn(this.opts.dragIn, this.opts.dragInOptions);
        delete this.opts.dragIn;
        delete this.opts.dragInOptions;
        // dynamic grids require pausing during drag to detect over to nest vs push
        if (this.opts.subGridDynamic && !dd_manager_1.DDManager.pauseDrag)
            dd_manager_1.DDManager.pauseDrag = true;
        if (((_b = this.opts.draggable) === null || _b === void 0 ? void 0 : _b.pause) !== undefined)
            dd_manager_1.DDManager.pauseDrag = this.opts.draggable.pause;
        this._setupRemoveDrop();
        this._setupAcceptWidget();
        this._updateWindowResizeEvent();
    }
    /**
     * initializing the HTML element, or selector string, into a grid will return the grid. Calling it again will
     * simply return the existing instance (ignore any passed options). There is also an initAll() version that support
     * multiple grids initialization at once. Or you can use addGrid() to create the entire grid from JSON.
     * @param options grid options (optional)
     * @param elOrString element or CSS selector (first one used) to convert to a grid (default to '.grid-stack' class selector)
     *
     * @example
     * let grid = GridStack.init();
     *
     * Note: the HTMLElement (of type GridHTMLElement) will store a `gridstack: GridStack` value that can be retrieve later
     * let grid = document.querySelector('.grid-stack').gridstack;
     */
    static init(options = {}, elOrString = '.grid-stack') {
        let el = GridStack.getGridElement(elOrString);
        if (!el) {
            if (typeof elOrString === 'string') {
                console.error('GridStack.initAll() no grid was found with selector "' + elOrString + '" - element missing or wrong selector ?' +
                    '\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.');
            }
            else {
                console.error('GridStack.init() no grid element was passed.');
            }
            return null;
        }
        if (!el.gridstack) {
            el.gridstack = new GridStack(el, utils_1.Utils.cloneDeep(options));
        }
        return el.gridstack;
    }
    /**
     * Will initialize a list of elements (given a selector) and return an array of grids.
     * @param options grid options (optional)
     * @param selector elements selector to convert to grids (default to '.grid-stack' class selector)
     *
     * @example
     * let grids = GridStack.initAll();
     * grids.forEach(...)
     */
    static initAll(options = {}, selector = '.grid-stack') {
        let grids = [];
        GridStack.getGridElements(selector).forEach(el => {
            if (!el.gridstack) {
                el.gridstack = new GridStack(el, utils_1.Utils.cloneDeep(options));
                delete options.dragIn;
                delete options.dragInOptions; // only need to be done once (really a static global thing, not per grid)
            }
            grids.push(el.gridstack);
        });
        if (grids.length === 0) {
            console.error('GridStack.initAll() no grid was found with selector "' + selector + '" - element missing or wrong selector ?' +
                '\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.');
        }
        return grids;
    }
    /**
     * call to create a grid with the given options, including loading any children from JSON structure. This will call GridStack.init(), then
     * grid.load() on any passed children (recursively). Great alternative to calling init() if you want entire grid to come from
     * JSON serialized data, including options.
     * @param parent HTML element parent to the grid
     * @param opt grids options used to initialize the grid, and list of children
     */
    static addGrid(parent, opt = {}) {
        if (!parent)
            return null;
        // create the grid element, but check if the passed 'parent' already has grid styling and should be used instead
        let el = parent;
        const parentIsGrid = parent.classList.contains('grid-stack');
        if (!parentIsGrid || opt.addRemoveCB) {
            if (opt.addRemoveCB) {
                el = opt.addRemoveCB(parent, opt, true, true);
            }
            else {
                let doc = document.implementation.createHTMLDocument(''); // IE needs a param
                doc.body.innerHTML = `<div class="grid-stack ${opt.class || ''}"></div>`;
                el = doc.body.children[0];
                parent.appendChild(el);
            }
        }
        // create grid class and load any children
        let grid = GridStack.init(opt, el);
        return grid;
    }
    /** call this method to register your engine instead of the default one.
     * See instead `GridStackOptions.engineClass` if you only need to
     * replace just one instance.
     */
    static registerEngine(engineClass) {
        GridStack.engineClass = engineClass;
    }
    /** @internal create placeholder DIV as needed */
    get placeholder() {
        if (!this._placeholder) {
            let placeholderChild = document.createElement('div'); // child so padding match item-content
            placeholderChild.className = 'placeholder-content';
            if (this.opts.placeholderText) {
                placeholderChild.innerHTML = this.opts.placeholderText;
            }
            this._placeholder = document.createElement('div');
            this._placeholder.classList.add(this.opts.placeholderClass, types_1.gridDefaults.itemClass, this.opts.itemClass);
            this.placeholder.appendChild(placeholderChild);
        }
        return this._placeholder;
    }
    /**
     * add a new widget and returns it.
     *
     * Widget will be always placed even if result height is more than actual grid height.
     * You need to use `willItFit()` before calling addWidget for additional check.
     * See also `makeWidget()`.
     *
     * @example
     * let grid = GridStack.init();
     * grid.addWidget({w: 3, content: 'hello'});
     * grid.addWidget('<div class="grid-stack-item"><div class="grid-stack-item-content">hello</div></div>', {w: 3});
     *
     * @param el  GridStackWidget (which can have content string as well), html element, or string definition to add
     * @param options widget position/size options (optional, and ignore if first param is already option) - see GridStackWidget
     */
    addWidget(els, options) {
        function isGridStackWidget(w) {
            return w.el !== undefined || w.x !== undefined || w.y !== undefined || w.w !== undefined || w.h !== undefined || w.content !== undefined ? true : false;
        }
        let el;
        let node;
        if (typeof els === 'string') {
            let doc = document.implementation.createHTMLDocument(''); // IE needs a param
            doc.body.innerHTML = els;
            el = doc.body.children[0];
        }
        else if (arguments.length === 0 || arguments.length === 1 && isGridStackWidget(els)) {
            node = options = els;
            if (node === null || node === void 0 ? void 0 : node.el) {
                el = node.el; // re-use element stored in the node
            }
            else if (this.opts.addRemoveCB) {
                el = this.opts.addRemoveCB(this.el, options, true, false);
            }
            else {
                let content = (options === null || options === void 0 ? void 0 : options.content) || '';
                let doc = document.implementation.createHTMLDocument(''); // IE needs a param
                doc.body.innerHTML = `<div class="grid-stack-item ${this.opts.itemClass || ''}"><div class="grid-stack-item-content">${content}</div></div>`;
                el = doc.body.children[0];
            }
        }
        else {
            el = els;
        }
        if (!el)
            return;
        // Tempting to initialize the passed in opt with default and valid values, but this break knockout demos
        // as the actual value are filled in when _prepareElement() calls el.getAttribute('gs-xyz') before adding the node.
        // So make sure we load any DOM attributes that are not specified in passed in options (which override)
        let domAttr = this._readAttr(el);
        options = utils_1.Utils.cloneDeep(options) || {}; // make a copy before we modify in case caller re-uses it
        utils_1.Utils.defaults(options, domAttr);
        node = this.engine.prepareNode(options);
        this._writeAttr(el, options);
        if (this._insertNotAppend) {
            this.el.prepend(el);
        }
        else {
            this.el.appendChild(el);
        }
        // similar to makeWidget() that doesn't read attr again and worse re-create a new node and loose any _id
        this._prepareElement(el, true, options);
        this._updateContainerHeight();
        // see if there is a sub-grid to create
        if (node.subGrid) {
            this.makeSubGrid(node.el, undefined, undefined, false); //node.subGrid will be used as option in method, no need to pass
        }
        // if we're adding an item into 1 column (_prevColumn is set only when going to 1) make sure
        // we don't override the larger 12 column layout that was already saved. #1985
        if (this._prevColumn && this.opts.column === 1) {
            this._ignoreLayoutsNodeChange = true;
        }
        this._triggerAddEvent();
        this._triggerChangeEvent();
        delete this._ignoreLayoutsNodeChange;
        return el;
    }
    /**
     * Convert an existing gridItem element into a sub-grid with the given (optional) options, else inherit them
     * from the parent's subGrid options.
     * @param el gridItem element to convert
     * @param ops (optional) sub-grid options, else default to node, then parent settings, else defaults
     * @param nodeToAdd (optional) node to add to the newly created sub grid (used when dragging over existing regular item)
     * @returns newly created grid
     */
    makeSubGrid(el, ops, nodeToAdd, saveContent = true) {
        var _a, _b, _c;
        let node = el.gridstackNode;
        if (!node) {
            node = this.makeWidget(el).gridstackNode;
        }
        if ((_a = node.subGrid) === null || _a === void 0 ? void 0 : _a.el)
            return node.subGrid; // already done
        // find the template subGrid stored on a parent as fallback...
        let subGridTemplate; // eslint-disable-next-line @typescript-eslint/no-this-alias
        let grid = this;
        while (grid && !subGridTemplate) {
            subGridTemplate = (_b = grid.opts) === null || _b === void 0 ? void 0 : _b.subGrid;
            grid = (_c = grid.parentGridItem) === null || _c === void 0 ? void 0 : _c.grid;
        }
        //... and set the create options
        ops = utils_1.Utils.cloneDeep(Object.assign(Object.assign(Object.assign({}, (subGridTemplate || {})), { children: undefined }), (ops || node.subGrid)));
        node.subGrid = ops;
        // if column special case it set, remember that flag and set default
        let autoColumn;
        if (ops.column === 'auto') {
            autoColumn = true;
            ops.column = Math.max(node.w || 1, (nodeToAdd === null || nodeToAdd === void 0 ? void 0 : nodeToAdd.w) || 1);
            ops.disableOneColumnMode = true; // driven by parent
        }
        // if we're converting an existing full item, move over the content to be the first sub item in the new grid
        let content = node.el.querySelector('.grid-stack-item-content');
        let newItem;
        let newItemOpt;
        if (saveContent) {
            this._removeDD(node.el); // remove D&D since it's set on content div
            newItemOpt = Object.assign(Object.assign({}, node), { x: 0, y: 0 });
            utils_1.Utils.removeInternalForSave(newItemOpt);
            delete newItemOpt.subGrid;
            if (node.content) {
                newItemOpt.content = node.content;
                delete node.content;
            }
            if (this.opts.addRemoveCB) {
                newItem = this.opts.addRemoveCB(this.el, newItemOpt, true, false);
            }
            else {
                let doc = document.implementation.createHTMLDocument(''); // IE needs a param
                doc.body.innerHTML = `<div class="grid-stack-item"></div>`;
                newItem = doc.body.children[0];
                newItem.appendChild(content);
                doc.body.innerHTML = `<div class="grid-stack-item-content"></div>`;
                content = doc.body.children[0];
                node.el.appendChild(content);
            }
            this._prepareDragDropByNode(node); // ... and restore original D&D
        }
        // if we're adding an additional item, make the container large enough to have them both
        if (nodeToAdd) {
            let w = autoColumn ? ops.column : node.w;
            let h = node.h + nodeToAdd.h;
            let style = node.el.style;
            style.transition = 'none'; // show up instantly so we don't see scrollbar with nodeToAdd
            this.update(node.el, { w, h });
            setTimeout(() => style.transition = null); // recover animation
        }
        if (this.opts.addRemoveCB) {
            ops.addRemoveCB = ops.addRemoveCB || this.opts.addRemoveCB;
        }
        let subGrid = node.subGrid = GridStack.addGrid(content, ops);
        if (nodeToAdd === null || nodeToAdd === void 0 ? void 0 : nodeToAdd._moving)
            subGrid._isTemp = true; // prevent re-nesting as we add over
        if (autoColumn)
            subGrid._autoColumn = true;
        // add the original content back as a child of hte newly created grid
        if (saveContent) {
            subGrid.addWidget(newItem, newItemOpt);
        }
        // now add any additional node
        if (nodeToAdd) {
            if (nodeToAdd._moving) {
                // create an artificial event even for the just created grid to receive this item
                window.setTimeout(() => utils_1.Utils.simulateMouseEvent(nodeToAdd._event, 'mouseenter', subGrid.el), 0);
            }
            else {
                subGrid.addWidget(node.el, node);
            }
        }
        return subGrid;
    }
    /**
     * called when an item was converted into a nested grid to accommodate a dragged over item, but then item leaves - return back
     * to the original grid-item. Also called to remove empty sub-grids when last item is dragged out (since re-creating is simple)
     */
    removeAsSubGrid(nodeThatRemoved) {
        var _a;
        let pGrid = (_a = this.parentGridItem) === null || _a === void 0 ? void 0 : _a.grid;
        if (!pGrid)
            return;
        pGrid.batchUpdate();
        pGrid.removeWidget(this.parentGridItem.el, true, true);
        this.engine.nodes.forEach(n => {
            // migrate any children over and offsetting by our location
            n.x += this.parentGridItem.x;
            n.y += this.parentGridItem.y;
            pGrid.addWidget(n.el, n);
        });
        pGrid.batchUpdate(false);
        if (this.parentGridItem)
            delete this.parentGridItem.subGrid;
        delete this.parentGridItem;
        // create an artificial event for the original grid now that this one is gone (got a leave, but won't get enter)
        if (nodeThatRemoved) {
            window.setTimeout(() => utils_1.Utils.simulateMouseEvent(nodeThatRemoved._event, 'mouseenter', pGrid.el), 0);
        }
    }
    /**
    /**
     * saves the current layout returning a list of widgets for serialization which might include any nested grids.
     * @param saveContent if true (default) the latest html inside .grid-stack-content will be saved to GridStackWidget.content field, else it will
     * be removed.
     * @param saveGridOpt if true (default false), save the grid options itself, so you can call the new GridStack.addGrid()
     * to recreate everything from scratch. GridStackOptions.children would then contain the widget list instead.
     * @returns list of widgets or full grid option, including .children list of widgets
     */
    save(saveContent = true, saveGridOpt = false) {
        // return copied nodes we can modify at will...
        let list = this.engine.save(saveContent);
        // check for HTML content and nested grids
        list.forEach(n => {
            var _a;
            if (saveContent && n.el && !n.subGrid) { // sub-grid are saved differently, not plain content
                let sub = n.el.querySelector('.grid-stack-item-content');
                n.content = sub ? sub.innerHTML : undefined;
                if (!n.content)
                    delete n.content;
            }
            else {
                if (!saveContent) {
                    delete n.content;
                }
                // check for nested grid
                if ((_a = n.subGrid) === null || _a === void 0 ? void 0 : _a.el) {
                    const listOrOpt = n.subGrid.save(saveContent, saveGridOpt);
                    n.subGrid = (saveGridOpt ? listOrOpt : { children: listOrOpt });
                }
            }
            delete n.el;
        });
        // check if save entire grid options (needed for recursive) + children...
        if (saveGridOpt) {
            let o = utils_1.Utils.cloneDeep(this.opts);
            // delete default values that will be recreated on launch
            if (o.marginBottom === o.marginTop && o.marginRight === o.marginLeft && o.marginTop === o.marginRight) {
                o.margin = o.marginTop;
                delete o.marginTop;
                delete o.marginRight;
                delete o.marginBottom;
                delete o.marginLeft;
            }
            if (o.rtl === (this.el.style.direction === 'rtl')) {
                o.rtl = 'auto';
            }
            if (this._isAutoCellHeight) {
                o.cellHeight = 'auto';
            }
            if (this._autoColumn) {
                o.column = 'auto';
                delete o.disableOneColumnMode;
            }
            const origShow = o._alwaysShowResizeHandle;
            delete o._alwaysShowResizeHandle;
            if (origShow !== undefined) {
                o.alwaysShowResizeHandle = origShow;
            }
            else {
                delete o.alwaysShowResizeHandle;
            }
            utils_1.Utils.removeInternalAndSame(o, types_1.gridDefaults);
            o.children = list;
            return o;
        }
        return list;
    }
    /**
     * load the widgets from a list. This will call update() on each (matching by id) or add/remove widgets that are not there.
     *
     * @param layout list of widgets definition to update/create
     * @param addAndRemove boolean (default true) or callback method can be passed to control if and how missing widgets can be added/removed, giving
     * the user control of insertion.
     *
     * @example
     * see http://gridstackjs.com/demo/serialization.html
     **/
    load(layout, addRemove = this.opts.addRemoveCB || true) {
        let items = GridStack.Utils.sort([...layout], -1, this._prevColumn || this.getColumn()); // make copy before we mod/sort
        this._insertNotAppend = true; // since create in reverse order...
        // if we're loading a layout into for example 1 column (_prevColumn is set only when going to 1) and items don't fit, make sure to save
        // the original wanted layout so we can scale back up correctly #1471
        if (this._prevColumn && this._prevColumn !== this.opts.column && items.some(n => (n.x + n.w) > this.opts.column)) {
            this._ignoreLayoutsNodeChange = true; // skip layout update
            this.engine.cacheLayout(items, this._prevColumn, true);
        }
        // if given a different callback, temporally set it as global option to creating will use it
        const prevCB = this.opts.addRemoveCB;
        if (typeof (addRemove) === 'function')
            this.opts.addRemoveCB = addRemove;
        let removed = [];
        this.batchUpdate();
        // see if any items are missing from new layout and need to be removed first
        if (addRemove) {
            let copyNodes = [...this.engine.nodes]; // don't loop through array you modify
            copyNodes.forEach(n => {
                let item = items.find(w => n.id === w.id);
                if (!item) {
                    if (this.opts.addRemoveCB)
                        this.opts.addRemoveCB(this.el, n, false, false);
                    removed.push(n); // batch keep track
                    this.removeWidget(n.el, true, false);
                }
            });
        }
        // now add/update the widgets
        items.forEach(w => {
            let item = (w.id || w.id === 0) ? this.engine.nodes.find(n => n.id === w.id) : undefined;
            if (item) {
                this.update(item.el, w);
                if (w.subGrid && w.subGrid.children) { // update any sub grid as well
                    let sub = item.el.querySelector('.grid-stack');
                    if (sub && sub.gridstack) {
                        sub.gridstack.load(w.subGrid.children); // TODO: support updating grid options ?
                        this._insertNotAppend = true; // got reset by above call
                    }
                }
            }
            else if (addRemove) {
                this.addWidget(w);
            }
        });
        this.engine.removedNodes = removed;
        this.batchUpdate(false);
        // after commit, clear that flag
        delete this._ignoreLayoutsNodeChange;
        delete this._insertNotAppend;
        prevCB ? this.opts.addRemoveCB = prevCB : delete this.opts.addRemoveCB;
        return this;
    }
    /**
     * use before calling a bunch of `addWidget()` to prevent un-necessary relayouts in between (more efficient)
     * and get a single event callback. You will see no changes until `batchUpdate(false)` is called.
     */
    batchUpdate(flag = true) {
        this.engine.batchUpdate(flag);
        if (!flag) {
            this._triggerRemoveEvent();
            this._triggerAddEvent();
            this._triggerChangeEvent();
        }
        return this;
    }
    /**
     * Gets current cell height.
     */
    getCellHeight(forcePixel = false) {
        if (this.opts.cellHeight && this.opts.cellHeight !== 'auto' &&
            (!forcePixel || !this.opts.cellHeightUnit || this.opts.cellHeightUnit === 'px')) {
            return this.opts.cellHeight;
        }
        // else get first cell height
        let el = this.el.querySelector('.' + this.opts.itemClass);
        if (el) {
            let height = utils_1.Utils.toNumber(el.getAttribute('gs-h'));
            return Math.round(el.offsetHeight / height);
        }
        // else do entire grid and # of rows (but doesn't work if min-height is the actual constrain)
        let rows = parseInt(this.el.getAttribute('gs-current-row'));
        return rows ? Math.round(this.el.getBoundingClientRect().height / rows) : this.opts.cellHeight;
    }
    /**
     * Update current cell height - see `GridStackOptions.cellHeight` for format.
     * This method rebuilds an internal CSS style sheet.
     * Note: You can expect performance issues if call this method too often.
     *
     * @param val the cell height. If not passed (undefined), cells content will be made square (match width minus margin),
     * if pass 0 the CSS will be generated by the application instead.
     * @param update (Optional) if false, styles will not be updated
     *
     * @example
     * grid.cellHeight(100); // same as 100px
     * grid.cellHeight('70px');
     * grid.cellHeight(grid.cellWidth() * 1.2);
     */
    cellHeight(val, update = true) {
        // if not called internally, check if we're changing mode
        if (update && val !== undefined) {
            if (this._isAutoCellHeight !== (val === 'auto')) {
                this._isAutoCellHeight = (val === 'auto');
                this._updateWindowResizeEvent();
            }
        }
        if (val === 'initial' || val === 'auto') {
            val = undefined;
        }
        // make item content be square
        if (val === undefined) {
            let marginDiff = -this.opts.marginRight - this.opts.marginLeft
                + this.opts.marginTop + this.opts.marginBottom;
            val = this.cellWidth() + marginDiff;
        }
        let data = utils_1.Utils.parseHeight(val);
        if (this.opts.cellHeightUnit === data.unit && this.opts.cellHeight === data.h) {
            return this;
        }
        this.opts.cellHeightUnit = data.unit;
        this.opts.cellHeight = data.h;
        if (update) {
            this._updateStyles(true); // true = force re-create for current # of rows
        }
        return this;
    }
    /** Gets current cell width. */
    cellWidth() {
        return this._widthOrContainer() / this.getColumn();
    }
    /** return our expected width (or parent) for 1 column check */
    _widthOrContainer() {
        // use `offsetWidth` or `clientWidth` (no scrollbar) ?
        // https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively
        return (this.el.clientWidth || this.el.parentElement.clientWidth || window.innerWidth);
    }
    /** re-layout grid items to reclaim any empty space */
    compact() {
        this.engine.compact();
        this._triggerChangeEvent();
        return this;
    }
    /**
     * set the number of columns in the grid. Will update existing widgets to conform to new number of columns,
     * as well as cache the original layout so you can revert back to previous positions without loss.
     * Requires `gridstack-extra.css` or `gridstack-extra.min.css` for [2-11],
     * else you will need to generate correct CSS (see https://github.com/gridstack/gridstack.js#change-grid-columns)
     * @param column - Integer > 0 (default 12).
     * @param layout specify the type of re-layout that will happen (position, size, etc...).
     * Note: items will never be outside of the current column boundaries. default (moveScale). Ignored for 1 column
     */
    column(column, layout = 'moveScale') {
        if (column < 1 || this.opts.column === column)
            return this;
        let oldColumn = this.getColumn();
        // if we go into 1 column mode (which happens if we're sized less than minW unless disableOneColumnMode is on)
        // then remember the original columns so we can restore.
        if (column === 1) {
            this._prevColumn = oldColumn;
        }
        else {
            delete this._prevColumn;
        }
        this.el.classList.remove('grid-stack-' + oldColumn);
        this.el.classList.add('grid-stack-' + column);
        this.opts.column = this.engine.column = column;
        // update the items now - see if the dom order nodes should be passed instead (else default to current list)
        let domNodes;
        if (column === 1 && this.opts.oneColumnModeDomSort) {
            domNodes = [];
            this.getGridItems().forEach(el => {
                if (el.gridstackNode) {
                    domNodes.push(el.gridstackNode);
                }
            });
            if (!domNodes.length) {
                domNodes = undefined;
            }
        }
        this.engine.updateNodeWidths(oldColumn, column, domNodes, layout);
        if (this._isAutoCellHeight)
            this.cellHeight();
        // and trigger our event last...
        this._ignoreLayoutsNodeChange = true; // skip layout update
        this._triggerChangeEvent();
        delete this._ignoreLayoutsNodeChange;
        return this;
    }
    /**
     * get the number of columns in the grid (default 12)
     */
    getColumn() {
        return this.opts.column;
    }
    /** returns an array of grid HTML elements (no placeholder) - used to iterate through our children in DOM order */
    getGridItems() {
        return Array.from(this.el.children)
            .filter((el) => el.matches('.' + this.opts.itemClass) && !el.matches('.' + this.opts.placeholderClass));
    }
    /**
     * Destroys a grid instance. DO NOT CALL any methods or access any vars after this as it will free up members.
     * @param removeDOM if `false` grid and items HTML elements will not be removed from the DOM (Optional. Default `true`).
     */
    destroy(removeDOM = true) {
        if (!this.el)
            return; // prevent multiple calls
        this._updateWindowResizeEvent(true);
        this.setStatic(true, false); // permanently removes DD but don't set CSS class (we're going away)
        this.setAnimation(false);
        if (!removeDOM) {
            this.removeAll(removeDOM);
            this.el.classList.remove(this._styleSheetClass);
        }
        else {
            this.el.parentNode.removeChild(this.el);
        }
        this._removeStylesheet();
        this.el.removeAttribute('gs-current-row');
        if (this.parentGridItem)
            delete this.parentGridItem.subGrid;
        delete this.parentGridItem;
        delete this.opts;
        delete this._placeholder;
        delete this.engine;
        delete this.el.gridstack; // remove circular dependency that would prevent a freeing
        delete this.el;
        return this;
    }
    /**
     * enable/disable floating widgets (default: `false`) See [example](http://gridstackjs.com/demo/float.html)
     */
    float(val) {
        if (this.opts.float !== val) {
            this.opts.float = this.engine.float = val;
            this._triggerChangeEvent();
        }
        return this;
    }
    /**
     * get the current float mode
     */
    getFloat() {
        return this.engine.float;
    }
    /**
     * Get the position of the cell under a pixel on screen.
     * @param position the position of the pixel to resolve in
     * absolute coordinates, as an object with top and left properties
     * @param useDocRelative if true, value will be based on document position vs parent position (Optional. Default false).
     * Useful when grid is within `position: relative` element
     *
     * Returns an object with properties `x` and `y` i.e. the column and row in the grid.
     */
    getCellFromPixel(position, useDocRelative = false) {
        let box = this.el.getBoundingClientRect();
        // console.log(`getBoundingClientRect left: ${box.left} top: ${box.top} w: ${box.w} h: ${box.h}`)
        let containerPos;
        if (useDocRelative) {
            containerPos = { top: box.top + document.documentElement.scrollTop, left: box.left };
            // console.log(`getCellFromPixel scrollTop: ${document.documentElement.scrollTop}`)
        }
        else {
            containerPos = { top: this.el.offsetTop, left: this.el.offsetLeft };
            // console.log(`getCellFromPixel offsetTop: ${containerPos.left} offsetLeft: ${containerPos.top}`)
        }
        let relativeLeft = position.left - containerPos.left;
        let relativeTop = position.top - containerPos.top;
        let columnWidth = (box.width / this.getColumn());
        let rowHeight = (box.height / parseInt(this.el.getAttribute('gs-current-row')));
        return { x: Math.floor(relativeLeft / columnWidth), y: Math.floor(relativeTop / rowHeight) };
    }
    /** returns the current number of rows, which will be at least `minRow` if set */
    getRow() {
        return Math.max(this.engine.getRow(), this.opts.minRow);
    }
    /**
     * Checks if specified area is empty.
     * @param x the position x.
     * @param y the position y.
     * @param w the width of to check
     * @param h the height of to check
     */
    isAreaEmpty(x, y, w, h) {
        return this.engine.isAreaEmpty(x, y, w, h);
    }
    /**
     * If you add elements to your grid by hand, you have to tell gridstack afterwards to make them widgets.
     * If you want gridstack to add the elements for you, use `addWidget()` instead.
     * Makes the given element a widget and returns it.
     * @param els widget or single selector to convert.
     *
     * @example
     * let grid = GridStack.init();
     * grid.el.appendChild('<div id="gsi-1" gs-w="3"></div>');
     * grid.makeWidget('#gsi-1');
     */
    makeWidget(els) {
        let el = GridStack.getElement(els);
        this._prepareElement(el, true);
        this._updateContainerHeight();
        this._triggerAddEvent();
        this._triggerChangeEvent();
        return el;
    }
    /**
     * Event handler that extracts our CustomEvent data out automatically for receiving custom
     * notifications (see doc for supported events)
     * @param name of the event (see possible values) or list of names space separated
     * @param callback function called with event and optional second/third param
     * (see README documentation for each signature).
     *
     * @example
     * grid.on('added', function(e, items) { log('added ', items)} );
     * or
     * grid.on('added removed change', function(e, items) { log(e.type, items)} );
     *
     * Note: in some cases it is the same as calling native handler and parsing the event.
     * grid.el.addEventListener('added', function(event) { log('added ', event.detail)} );
     *
     */
    on(name, callback) {
        // check for array of names being passed instead
        if (name.indexOf(' ') !== -1) {
            let names = name.split(' ');
            names.forEach(name => this.on(name, callback));
            return this;
        }
        if (name === 'change' || name === 'added' || name === 'removed' || name === 'enable' || name === 'disable') {
            // native CustomEvent handlers - cash the generic handlers so we can easily remove
            let noData = (name === 'enable' || name === 'disable');
            if (noData) {
                this._gsEventHandler[name] = (event) => callback(event);
            }
            else {
                this._gsEventHandler[name] = (event) => callback(event, event.detail);
            }
            this.el.addEventListener(name, this._gsEventHandler[name]);
        }
        else if (name === 'drag' || name === 'dragstart' || name === 'dragstop' || name === 'resizestart' || name === 'resize' || name === 'resizestop' || name === 'dropped') {
            // drag&drop stop events NEED to be call them AFTER we update node attributes so handle them ourself.
            // do same for start event to make it easier...
            this._gsEventHandler[name] = callback;
        }
        else {
            console.log('GridStack.on(' + name + ') event not supported, but you can still use $(".grid-stack").on(...) while jquery-ui is still used internally.');
        }
        return this;
    }
    /**
     * unsubscribe from the 'on' event below
     * @param name of the event (see possible values)
     */
    off(name) {
        // check for array of names being passed instead
        if (name.indexOf(' ') !== -1) {
            let names = name.split(' ');
            names.forEach(name => this.off(name));
            return this;
        }
        if (name === 'change' || name === 'added' || name === 'removed' || name === 'enable' || name === 'disable') {
            // remove native CustomEvent handlers
            if (this._gsEventHandler[name]) {
                this.el.removeEventListener(name, this._gsEventHandler[name]);
            }
        }
        delete this._gsEventHandler[name];
        return this;
    }
    /**
     * Removes widget from the grid.
     * @param el  widget or selector to modify
     * @param removeDOM if `false` DOM element won't be removed from the tree (Default? true).
     * @param triggerEvent if `false` (quiet mode) element will not be added to removed list and no 'removed' callbacks will be called (Default? true).
     */
    removeWidget(els, removeDOM = true, triggerEvent = true) {
        GridStack.getElements(els).forEach(el => {
            if (el.parentElement && el.parentElement !== this.el)
                return; // not our child!
            let node = el.gridstackNode;
            // For Meteor support: https://github.com/gridstack/gridstack.js/pull/272
            if (!node) {
                node = this.engine.nodes.find(n => el === n.el);
            }
            if (!node)
                return;
            // remove our DOM data (circular link) and drag&drop permanently
            delete el.gridstackNode;
            this._removeDD(el);
            this.engine.removeNode(node, removeDOM, triggerEvent);
            if (removeDOM && el.parentElement) {
                el.remove(); // in batch mode engine.removeNode doesn't call back to remove DOM
            }
        });
        if (triggerEvent) {
            this._triggerRemoveEvent();
            this._triggerChangeEvent();
        }
        return this;
    }
    /**
     * Removes all widgets from the grid.
     * @param removeDOM if `false` DOM elements won't be removed from the tree (Default? `true`).
     */
    removeAll(removeDOM = true) {
        // always remove our DOM data (circular link) before list gets emptied and drag&drop permanently
        this.engine.nodes.forEach(n => {
            delete n.el.gridstackNode;
            this._removeDD(n.el);
        });
        this.engine.removeAll(removeDOM);
        this._triggerRemoveEvent();
        return this;
    }
    /**
     * Toggle the grid animation state.  Toggles the `grid-stack-animate` class.
     * @param doAnimate if true the grid will animate.
     */
    setAnimation(doAnimate) {
        if (doAnimate) {
            this.el.classList.add('grid-stack-animate');
        }
        else {
            this.el.classList.remove('grid-stack-animate');
        }
        return this;
    }
    /**
     * Toggle the grid static state, which permanently removes/add Drag&Drop support, unlike disable()/enable() that just turns it off/on.
     * Also toggle the grid-stack-static class.
     * @param val if true the grid become static.
     * @param updateClass true (default) if css class gets updated
     * @param recurse true (default) if sub-grids also get updated
     */
    setStatic(val, updateClass = true, recurse = true) {
        if (this.opts.staticGrid === val)
            return this;
        this.opts.staticGrid = val;
        this._setupRemoveDrop();
        this._setupAcceptWidget();
        this.engine.nodes.forEach(n => {
            this._prepareDragDropByNode(n); // either delete or init Drag&drop
            if (n.subGrid && recurse)
                n.subGrid.setStatic(val, updateClass, recurse);
        });
        if (updateClass) {
            this._setStaticClass();
        }
        return this;
    }
    /**
     * Updates widget position/size and other info. Note: if you need to call this on all nodes, use load() instead which will update what changed.
     * @param els  widget or selector of objects to modify (note: setting the same x,y for multiple items will be indeterministic and likely unwanted)
     * @param opt new widget options (x,y,w,h, etc..). Only those set will be updated.
     */
    update(els, opt) {
        // support legacy call for now ?
        if (arguments.length > 2) {
            console.warn('gridstack.ts: `update(el, x, y, w, h)` is deprecated. Use `update(el, {x, w, content, ...})`. It will be removed soon');
            // eslint-disable-next-line prefer-rest-params
            let a = arguments, i = 1;
            opt = { x: a[i++], y: a[i++], w: a[i++], h: a[i++] };
            return this.update(els, opt);
        }
        GridStack.getElements(els).forEach(el => {
            if (!el || !el.gridstackNode)
                return;
            let n = el.gridstackNode;
            let w = utils_1.Utils.cloneDeep(opt); // make a copy we can modify in case they re-use it or multiple items
            delete w.autoPosition;
            // move/resize widget if anything changed
            let keys = ['x', 'y', 'w', 'h'];
            let m;
            if (keys.some(k => w[k] !== undefined && w[k] !== n[k])) {
                m = {};
                keys.forEach(k => {
                    m[k] = (w[k] !== undefined) ? w[k] : n[k];
                    delete w[k];
                });
            }
            // for a move as well IFF there is any min/max fields set
            if (!m && (w.minW || w.minH || w.maxW || w.maxH)) {
                m = {}; // will use node position but validate values
            }
            // check for content changing
            if (w.content) {
                let sub = el.querySelector('.grid-stack-item-content');
                if (sub && sub.innerHTML !== w.content) {
                    sub.innerHTML = w.content;
                }
                delete w.content;
            }
            // any remaining fields are assigned, but check for dragging changes, resize constrain
            let changed = false;
            let ddChanged = false;
            for (const key in w) {
                if (key[0] !== '_' && n[key] !== w[key]) {
                    n[key] = w[key];
                    changed = true;
                    ddChanged = ddChanged || (!this.opts.staticGrid && (key === 'noResize' || key === 'noMove' || key === 'locked'));
                }
            }
            // finally move the widget
            if (m) {
                this.engine.cleanNodes()
                    .beginUpdate(n)
                    .moveNode(n, m);
                this._updateContainerHeight();
                this._triggerChangeEvent();
                this.engine.endUpdate();
            }
            if (changed) { // move will only update x,y,w,h so update the rest too
                this._writeAttr(el, n);
            }
            if (ddChanged) {
                this._prepareDragDropByNode(n);
            }
        });
        return this;
    }
    /**
     * Updates the margins which will set all 4 sides at once - see `GridStackOptions.margin` for format options (CSS string format of 1,2,4 values or single number).
     * @param value margin value
     */
    margin(value) {
        let isMultiValue = (typeof value === 'string' && value.split(' ').length > 1);
        // check if we can skip re-creating our CSS file... won't check if multi values (too much hassle)
        if (!isMultiValue) {
            let data = utils_1.Utils.parseHeight(value);
            if (this.opts.marginUnit === data.unit && this.opts.margin === data.h)
                return;
        }
        // re-use existing margin handling
        this.opts.margin = value;
        this.opts.marginTop = this.opts.marginBottom = this.opts.marginLeft = this.opts.marginRight = undefined;
        this._initMargin();
        this._updateStyles(true); // true = force re-create
        return this;
    }
    /** returns current margin number value (undefined if 4 sides don't match) */
    getMargin() { return this.opts.margin; }
    /**
     * Returns true if the height of the grid will be less than the vertical
     * constraint. Always returns true if grid doesn't have height constraint.
     * @param node contains x,y,w,h,auto-position options
     *
     * @example
     * if (grid.willItFit(newWidget)) {
     *   grid.addWidget(newWidget);
     * } else {
     *   alert('Not enough free space to place the widget');
     * }
     */
    willItFit(node) {
        // support legacy call for now
        if (arguments.length > 1) {
            console.warn('gridstack.ts: `willItFit(x,y,w,h,autoPosition)` is deprecated. Use `willItFit({x, y,...})`. It will be removed soon');
            // eslint-disable-next-line prefer-rest-params
            let a = arguments, i = 0, w = { x: a[i++], y: a[i++], w: a[i++], h: a[i++], autoPosition: a[i++] };
            return this.willItFit(w);
        }
        return this.engine.willItFit(node);
    }
    /** @internal */
    _triggerChangeEvent() {
        if (this.engine.batchMode)
            return this;
        let elements = this.engine.getDirtyNodes(true); // verify they really changed
        if (elements && elements.length) {
            if (!this._ignoreLayoutsNodeChange) {
                this.engine.layoutsNodesChange(elements);
            }
            this._triggerEvent('change', elements);
        }
        this.engine.saveInitial(); // we called, now reset initial values & dirty flags
        return this;
    }
    /** @internal */
    _triggerAddEvent() {
        if (this.engine.batchMode)
            return this;
        if (this.engine.addedNodes && this.engine.addedNodes.length > 0) {
            if (!this._ignoreLayoutsNodeChange) {
                this.engine.layoutsNodesChange(this.engine.addedNodes);
            }
            // prevent added nodes from also triggering 'change' event (which is called next)
            this.engine.addedNodes.forEach(n => { delete n._dirty; });
            this._triggerEvent('added', this.engine.addedNodes);
            this.engine.addedNodes = [];
        }
        return this;
    }
    /** @internal */
    _triggerRemoveEvent() {
        if (this.engine.batchMode)
            return this;
        if (this.engine.removedNodes && this.engine.removedNodes.length > 0) {
            this._triggerEvent('removed', this.engine.removedNodes);
            this.engine.removedNodes = [];
        }
        return this;
    }
    /** @internal */
    _triggerEvent(type, data) {
        let event = data ? new CustomEvent(type, { bubbles: false, detail: data }) : new Event(type);
        this.el.dispatchEvent(event);
        return this;
    }
    /** @internal called to delete the current dynamic style sheet used for our layout */
    _removeStylesheet() {
        if (this._styles) {
            utils_1.Utils.removeStylesheet(this._styleSheetClass);
            delete this._styles;
        }
        return this;
    }
    /** @internal updated/create the CSS styles for row based layout and initial margin setting */
    _updateStyles(forceUpdate = false, maxH) {
        // call to delete existing one if we change cellHeight / margin
        if (forceUpdate) {
            this._removeStylesheet();
        }
        if (!maxH)
            maxH = this.getRow();
        this._updateContainerHeight();
        // if user is telling us they will handle the CSS themselves by setting heights to 0. Do we need this opts really ??
        if (this.opts.cellHeight === 0) {
            return this;
        }
        let cellHeight = this.opts.cellHeight;
        let cellHeightUnit = this.opts.cellHeightUnit;
        let prefix = `.${this._styleSheetClass} > .${this.opts.itemClass}`;
        // create one as needed
        if (!this._styles) {
            // insert style to parent (instead of 'head' by default) to support WebComponent
            let styleLocation = this.opts.styleInHead ? undefined : this.el.parentNode;
            this._styles = utils_1.Utils.createStylesheet(this._styleSheetClass, styleLocation, {
                nonce: this.opts.nonce,
            });
            if (!this._styles)
                return this;
            this._styles._max = 0;
            // these are done once only
            utils_1.Utils.addCSSRule(this._styles, prefix, `min-height: ${cellHeight}${cellHeightUnit}`);
            // content margins
            let top = this.opts.marginTop + this.opts.marginUnit;
            let bottom = this.opts.marginBottom + this.opts.marginUnit;
            let right = this.opts.marginRight + this.opts.marginUnit;
            let left = this.opts.marginLeft + this.opts.marginUnit;
            let content = `${prefix} > .grid-stack-item-content`;
            let placeholder = `.${this._styleSheetClass} > .grid-stack-placeholder > .placeholder-content`;
            utils_1.Utils.addCSSRule(this._styles, content, `top: ${top}; right: ${right}; bottom: ${bottom}; left: ${left};`);
            utils_1.Utils.addCSSRule(this._styles, placeholder, `top: ${top}; right: ${right}; bottom: ${bottom}; left: ${left};`);
            // resize handles offset (to match margin)
            utils_1.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-ne`, `right: ${right}`);
            utils_1.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-e`, `right: ${right}`);
            utils_1.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-se`, `right: ${right}; bottom: ${bottom}`);
            utils_1.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-nw`, `left: ${left}`);
            utils_1.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-w`, `left: ${left}`);
            utils_1.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-sw`, `left: ${left}; bottom: ${bottom}`);
        }
        // now update the height specific fields
        maxH = maxH || this._styles._max;
        if (maxH > this._styles._max) {
            let getHeight = (rows) => (cellHeight * rows) + cellHeightUnit;
            for (let i = this._styles._max + 1; i <= maxH; i++) { // start at 1
                let h = getHeight(i);
                utils_1.Utils.addCSSRule(this._styles, `${prefix}[gs-y="${i - 1}"]`, `top: ${getHeight(i - 1)}`); // start at 0
                utils_1.Utils.addCSSRule(this._styles, `${prefix}[gs-h="${i}"]`, `height: ${h}`);
                utils_1.Utils.addCSSRule(this._styles, `${prefix}[gs-min-h="${i}"]`, `min-height: ${h}`);
                utils_1.Utils.addCSSRule(this._styles, `${prefix}[gs-max-h="${i}"]`, `max-height: ${h}`);
            }
            this._styles._max = maxH;
        }
        return this;
    }
    /** @internal */
    _updateContainerHeight() {
        if (!this.engine || this.engine.batchMode)
            return this;
        let row = this.getRow() + this._extraDragRow; // checks for minRow already
        // check for css min height
        // Note: we don't handle %,rem correctly so comment out, beside we don't need need to create un-necessary
        // rows as the CSS will make us bigger than our set height if needed... not sure why we had this.
        // let cssMinHeight = parseInt(getComputedStyle(this.el)['min-height']);
        // if (cssMinHeight > 0) {
        //   let minRow = Math.round(cssMinHeight / this.getCellHeight(true));
        //   if (row < minRow) {
        //     row = minRow;
        //   }
        // }
        this.el.setAttribute('gs-current-row', String(row));
        if (row === 0) {
            this.el.style.removeProperty('min-height');
            return this;
        }
        let cellHeight = this.opts.cellHeight;
        let unit = this.opts.cellHeightUnit;
        if (!cellHeight)
            return this;
        this.el.style.minHeight = row * cellHeight + unit;
        return this;
    }
    /** @internal */
    _prepareElement(el, triggerAddEvent = false, node) {
        el.classList.add(this.opts.itemClass);
        node = node || this._readAttr(el);
        el.gridstackNode = node;
        node.el = el;
        node.grid = this;
        let copy = Object.assign({}, node);
        node = this.engine.addNode(node, triggerAddEvent);
        // write node attr back in case there was collision or we have to fix bad values during addNode()
        if (!utils_1.Utils.same(node, copy)) {
            this._writeAttr(el, node);
        }
        this._prepareDragDropByNode(node);
        return this;
    }
    /** @internal call to write position x,y,w,h attributes back to element */
    _writePosAttr(el, n) {
        if (n.x !== undefined && n.x !== null) {
            el.setAttribute('gs-x', String(n.x));
        }
        if (n.y !== undefined && n.y !== null) {
            el.setAttribute('gs-y', String(n.y));
        }
        if (n.w) {
            el.setAttribute('gs-w', String(n.w));
        }
        if (n.h) {
            el.setAttribute('gs-h', String(n.h));
        }
        return this;
    }
    /** @internal call to write any default attributes back to element */
    _writeAttr(el, node) {
        if (!node)
            return this;
        this._writePosAttr(el, node);
        let attrs /*: GridStackWidget but strings */ = {
            autoPosition: 'gs-auto-position',
            minW: 'gs-min-w',
            minH: 'gs-min-h',
            maxW: 'gs-max-w',
            maxH: 'gs-max-h',
            noResize: 'gs-no-resize',
            noMove: 'gs-no-move',
            locked: 'gs-locked',
            id: 'gs-id',
        };
        for (const key in attrs) {
            if (node[key]) { // 0 is valid for x,y only but done above already and not in list anyway
                el.setAttribute(attrs[key], String(node[key]));
            }
            else {
                el.removeAttribute(attrs[key]);
            }
        }
        return this;
    }
    /** @internal call to read any default attributes from element */
    _readAttr(el) {
        let node = {};
        node.x = utils_1.Utils.toNumber(el.getAttribute('gs-x'));
        node.y = utils_1.Utils.toNumber(el.getAttribute('gs-y'));
        node.w = utils_1.Utils.toNumber(el.getAttribute('gs-w'));
        node.h = utils_1.Utils.toNumber(el.getAttribute('gs-h'));
        node.maxW = utils_1.Utils.toNumber(el.getAttribute('gs-max-w'));
        node.minW = utils_1.Utils.toNumber(el.getAttribute('gs-min-w'));
        node.maxH = utils_1.Utils.toNumber(el.getAttribute('gs-max-h'));
        node.minH = utils_1.Utils.toNumber(el.getAttribute('gs-min-h'));
        node.autoPosition = utils_1.Utils.toBool(el.getAttribute('gs-auto-position'));
        node.noResize = utils_1.Utils.toBool(el.getAttribute('gs-no-resize'));
        node.noMove = utils_1.Utils.toBool(el.getAttribute('gs-no-move'));
        node.locked = utils_1.Utils.toBool(el.getAttribute('gs-locked'));
        node.id = el.getAttribute('gs-id');
        // remove any key not found (null or false which is default)
        for (const key in node) {
            if (!node.hasOwnProperty(key))
                return;
            if (!node[key] && node[key] !== 0) { // 0 can be valid value (x,y only really)
                delete node[key];
            }
        }
        return node;
    }
    /** @internal */
    _setStaticClass() {
        let classes = ['grid-stack-static'];
        if (this.opts.staticGrid) {
            this.el.classList.add(...classes);
            this.el.setAttribute('gs-static', 'true');
        }
        else {
            this.el.classList.remove(...classes);
            this.el.removeAttribute('gs-static');
        }
        return this;
    }
    /**
     * called when we are being resized by the window - check if the one Column Mode needs to be turned on/off
     * and remember the prev columns we used, or get our count from parent, as well as check for auto cell height (square)
     */
    onParentResize() {
        if (!this.el || !this.el.clientWidth)
            return; // return if we're gone or no size yet (will get called again)
        let changedColumn = false;
        // see if we're nested and take our column count from our parent....
        if (this._autoColumn && this.parentGridItem) {
            if (this.opts.column !== this.parentGridItem.w) {
                changedColumn = true;
                this.column(this.parentGridItem.w, 'none');
            }
        }
        else {
            // else check for 1 column in/out behavior
            let oneColumn = !this.opts.disableOneColumnMode && this.el.clientWidth <= this.opts.oneColumnSize;
            if ((this.opts.column === 1) !== oneColumn) {
                changedColumn = true;
                if (this.opts.animate) {
                    this.setAnimation(false);
                } // 1 <-> 12 is too radical, turn off animation
                this.column(oneColumn ? 1 : this._prevColumn);
                if (this.opts.animate) {
                    this.setAnimation(true);
                }
            }
        }
        // make the cells content square again
        if (this._isAutoCellHeight) {
            if (!changedColumn && this.opts.cellHeightThrottle) {
                if (!this._cellHeightThrottle) {
                    this._cellHeightThrottle = utils_1.Utils.throttle(() => this.cellHeight(), this.opts.cellHeightThrottle);
                }
                this._cellHeightThrottle();
            }
            else {
                // immediate update if we've changed column count or have no threshold
                this.cellHeight();
            }
        }
        // finally update any nested grids
        this.engine.nodes.forEach(n => {
            if (n.subGrid) {
                n.subGrid.onParentResize();
            }
        });
        return this;
    }
    /** add or remove the window size event handler */
    _updateWindowResizeEvent(forceRemove = false) {
        // only add event if we're not nested (parent will call us) and we're auto sizing cells or supporting oneColumn (i.e. doing work)
        const workTodo = (this._isAutoCellHeight || !this.opts.disableOneColumnMode) && !this.parentGridItem;
        if (!forceRemove && workTodo && !this._windowResizeBind) {
            this._windowResizeBind = this.onParentResize.bind(this); // so we can properly remove later
            window.addEventListener('resize', this._windowResizeBind);
        }
        else if ((forceRemove || !workTodo) && this._windowResizeBind) {
            window.removeEventListener('resize', this._windowResizeBind);
            delete this._windowResizeBind; // remove link to us so we can free
        }
        return this;
    }
    /** @internal convert a potential selector into actual element */
    static getElement(els = '.grid-stack-item') { return utils_1.Utils.getElement(els); }
    /** @internal */
    static getElements(els = '.grid-stack-item') { return utils_1.Utils.getElements(els); }
    /** @internal */
    static getGridElement(els) { return GridStack.getElement(els); }
    /** @internal */
    static getGridElements(els) { return utils_1.Utils.getElements(els); }
    /** @internal initialize margin top/bottom/left/right and units */
    _initMargin() {
        let data;
        let margin = 0;
        // support passing multiple values like CSS (ex: '5px 10px 0 20px')
        let margins = [];
        if (typeof this.opts.margin === 'string') {
            margins = this.opts.margin.split(' ');
        }
        if (margins.length === 2) { // top/bot, left/right like CSS
            this.opts.marginTop = this.opts.marginBottom = margins[0];
            this.opts.marginLeft = this.opts.marginRight = margins[1];
        }
        else if (margins.length === 4) { // Clockwise like CSS
            this.opts.marginTop = margins[0];
            this.opts.marginRight = margins[1];
            this.opts.marginBottom = margins[2];
            this.opts.marginLeft = margins[3];
        }
        else {
            data = utils_1.Utils.parseHeight(this.opts.margin);
            this.opts.marginUnit = data.unit;
            margin = this.opts.margin = data.h;
        }
        // see if top/bottom/left/right need to be set as well
        if (this.opts.marginTop === undefined) {
            this.opts.marginTop = margin;
        }
        else {
            data = utils_1.Utils.parseHeight(this.opts.marginTop);
            this.opts.marginTop = data.h;
            delete this.opts.margin;
        }
        if (this.opts.marginBottom === undefined) {
            this.opts.marginBottom = margin;
        }
        else {
            data = utils_1.Utils.parseHeight(this.opts.marginBottom);
            this.opts.marginBottom = data.h;
            delete this.opts.margin;
        }
        if (this.opts.marginRight === undefined) {
            this.opts.marginRight = margin;
        }
        else {
            data = utils_1.Utils.parseHeight(this.opts.marginRight);
            this.opts.marginRight = data.h;
            delete this.opts.margin;
        }
        if (this.opts.marginLeft === undefined) {
            this.opts.marginLeft = margin;
        }
        else {
            data = utils_1.Utils.parseHeight(this.opts.marginLeft);
            this.opts.marginLeft = data.h;
            delete this.opts.margin;
        }
        this.opts.marginUnit = data.unit; // in case side were spelled out, use those units instead...
        if (this.opts.marginTop === this.opts.marginBottom && this.opts.marginLeft === this.opts.marginRight && this.opts.marginTop === this.opts.marginRight) {
            this.opts.margin = this.opts.marginTop; // makes it easier to check for no-ops in setMargin()
        }
        return this;
    }
    /* ===========================================================================================
     * drag&drop methods that used to be stubbed out and implemented in dd-gridstack.ts
     * but caused loading issues in prod - see https://github.com/gridstack/gridstack.js/issues/2039
     * ===========================================================================================
     */
    /** get the global (but static to this code) DD implementation */
    static getDD() {
        return dd;
    }
    /**
     * call to setup dragging in from the outside (say toolbar), by specifying the class selection and options.
     * Called during GridStack.init() as options, but can also be called directly (last param are used) in case the toolbar
     * is dynamically create and needs to be set later.
     * @param dragIn string selector (ex: '.sidebar .grid-stack-item')
     * @param dragInOptions options - see DDDragInOpt. (default: {handle: '.grid-stack-item-content', appendTo: 'body'}
     **/
    static setupDragIn(dragIn, dragInOptions) {
        if ((dragInOptions === null || dragInOptions === void 0 ? void 0 : dragInOptions.pause) !== undefined) {
            dd_manager_1.DDManager.pauseDrag = dragInOptions.pause;
        }
        if (typeof dragIn === 'string') {
            dragInOptions = Object.assign(Object.assign({}, types_1.dragInDefaultOptions), (dragInOptions || {}));
            utils_1.Utils.getElements(dragIn).forEach(el => {
                if (!dd.isDraggable(el))
                    dd.dragIn(el, dragInOptions);
            });
        }
    }
    /**
     * Enables/Disables dragging by the user of specific grid element. If you want all items, and have it affect future items, use enableMove() instead. No-op for static grids.
     * IF you are looking to prevent an item from moving (due to being pushed around by another during collision) use locked property instead.
     * @param els widget or selector to modify.
     * @param val if true widget will be draggable.
     */
    movable(els, val) {
        if (this.opts.staticGrid)
            return this; // can't move a static grid!
        GridStack.getElements(els).forEach(el => {
            let node = el.gridstackNode;
            if (!node)
                return;
            if (val)
                delete node.noMove;
            else
                node.noMove = true;
            this._prepareDragDropByNode(node); // init DD if need be, and adjust
        });
        return this;
    }
    /**
     * Enables/Disables user resizing of specific grid element. If you want all items, and have it affect future items, use enableResize() instead. No-op for static grids.
     * @param els  widget or selector to modify
     * @param val  if true widget will be resizable.
     */
    resizable(els, val) {
        if (this.opts.staticGrid)
            return this; // can't resize a static grid!
        GridStack.getElements(els).forEach(el => {
            let node = el.gridstackNode;
            if (!node)
                return;
            if (val)
                delete node.noResize;
            else
                node.noResize = true;
            this._prepareDragDropByNode(node); // init DD if need be, and adjust
        });
        return this;
    }
    /**
     * Temporarily disables widgets moving/resizing.
     * If you want a more permanent way (which freezes up resources) use `setStatic(true)` instead.
     * Note: no-op for static grid
     * This is a shortcut for:
     * @example
     *  grid.enableMove(false);
     *  grid.enableResize(false);
     * @param recurse true (default) if sub-grids also get updated
     */
    disable(recurse = true) {
        if (this.opts.staticGrid)
            return;
        this.enableMove(false, recurse);
        this.enableResize(false, recurse); // @ts-ignore
        this._triggerEvent('disable');
        return this;
    }
    /**
     * Re-enables widgets moving/resizing - see disable().
     * Note: no-op for static grid.
     * This is a shortcut for:
     * @example
     *  grid.enableMove(true);
     *  grid.enableResize(true);
     * @param recurse true (default) if sub-grids also get updated
     */
    enable(recurse = true) {
        if (this.opts.staticGrid)
            return;
        this.enableMove(true, recurse);
        this.enableResize(true, recurse); // @ts-ignore
        this._triggerEvent('enable');
        return this;
    }
    /**
     * Enables/disables widget moving. No-op for static grids.
     * @param recurse true (default) if sub-grids also get updated
     */
    enableMove(doEnable, recurse = true) {
        if (this.opts.staticGrid)
            return this; // can't move a static grid!
        this.opts.disableDrag = !doEnable; // FIRST before we update children as grid overrides #1658
        this.engine.nodes.forEach(n => {
            this.movable(n.el, doEnable);
            if (n.subGrid && recurse)
                n.subGrid.enableMove(doEnable, recurse);
        });
        return this;
    }
    /**
     * Enables/disables widget resizing. No-op for static grids.
     * @param recurse true (default) if sub-grids also get updated
     */
    enableResize(doEnable, recurse = true) {
        if (this.opts.staticGrid)
            return this; // can't size a static grid!
        this.opts.disableResize = !doEnable; // FIRST before we update children as grid overrides #1658
        this.engine.nodes.forEach(n => {
            this.resizable(n.el, doEnable);
            if (n.subGrid && recurse)
                n.subGrid.enableResize(doEnable, recurse);
        });
        return this;
    }
    /** @internal removes any drag&drop present (called during destroy) */
    _removeDD(el) {
        dd.draggable(el, 'destroy').resizable(el, 'destroy');
        if (el.gridstackNode) {
            delete el.gridstackNode._initDD; // reset our DD init flag
        }
        delete el.ddElement;
        return this;
    }
    /** @internal called to add drag over to support widgets being added externally */
    _setupAcceptWidget() {
        // check if we need to disable things
        if (this.opts.staticGrid || (!this.opts.acceptWidgets && !this.opts.removable)) {
            dd.droppable(this.el, 'destroy');
            return this;
        }
        // vars shared across all methods
        let cellHeight, cellWidth;
        let onDrag = (event, el, helper) => {
            let node = el.gridstackNode;
            if (!node)
                return;
            helper = helper || el;
            let parent = this.el.getBoundingClientRect();
            let { top, left } = helper.getBoundingClientRect();
            left -= parent.left;
            top -= parent.top;
            let ui = { position: { top, left } };
            if (node._temporaryRemoved) {
                node.x = Math.max(0, Math.round(left / cellWidth));
                node.y = Math.max(0, Math.round(top / cellHeight));
                delete node.autoPosition;
                this.engine.nodeBoundFix(node);
                // don't accept *initial* location if doesn't fit #1419 (locked drop region, or can't grow), but maybe try if it will go somewhere
                if (!this.engine.willItFit(node)) {
                    node.autoPosition = true; // ignore x,y and try for any slot...
                    if (!this.engine.willItFit(node)) {
                        dd.off(el, 'drag'); // stop calling us
                        return; // full grid or can't grow
                    }
                    if (node._willFitPos) {
                        // use the auto position instead #1687
                        utils_1.Utils.copyPos(node, node._willFitPos);
                        delete node._willFitPos;
                    }
                }
                // re-use the existing node dragging method
                this._onStartMoving(helper, event, ui, node, cellWidth, cellHeight);
            }
            else {
                // re-use the existing node dragging that does so much of the collision detection
                this._dragOrResize(helper, event, ui, node, cellWidth, cellHeight);
            }
        };
        dd.droppable(this.el, {
            accept: (el) => {
                let node = el.gridstackNode;
                // set accept drop to true on ourself (which we ignore) so we don't get "can't drop" icon in HTML5 mode while moving
                if ((node === null || node === void 0 ? void 0 : node.grid) === this)
                    return true;
                if (!this.opts.acceptWidgets)
                    return false;
                // check for accept method or class matching
                let canAccept = true;
                if (typeof this.opts.acceptWidgets === 'function') {
                    canAccept = this.opts.acceptWidgets(el);
                }
                else {
                    let selector = (this.opts.acceptWidgets === true ? '.grid-stack-item' : this.opts.acceptWidgets);
                    canAccept = el.matches(selector);
                }
                // finally check to make sure we actually have space left #1571
                if (canAccept && node && this.opts.maxRow) {
                    let n = { w: node.w, h: node.h, minW: node.minW, minH: node.minH }; // only width/height matters and autoPosition
                    canAccept = this.engine.willItFit(n);
                }
                return canAccept;
            }
        })
            /**
             * entering our grid area
             */
            .on(this.el, 'dropover', (event, el, helper) => {
            // console.log(`over ${this.el.gridstack.opts.id} ${count++}`); // TEST
            let node = el.gridstackNode;
            // ignore drop enter on ourself (unless we temporarily removed) which happens on a simple drag of our item
            if ((node === null || node === void 0 ? void 0 : node.grid) === this && !node._temporaryRemoved) {
                // delete node._added; // reset this to track placeholder again in case we were over other grid #1484 (dropout doesn't always clear)
                return false; // prevent parent from receiving msg (which may be a grid as well)
            }
            // fix #1578 when dragging fast, we may not get a leave on the previous grid so force one now
            if ((node === null || node === void 0 ? void 0 : node.grid) && node.grid !== this && !node._temporaryRemoved) {
                // console.log('dropover without leave'); // TEST
                let otherGrid = node.grid;
                otherGrid._leave(el, helper);
            }
            // cache cell dimensions (which don't change), position can animate if we removed an item in otherGrid that affects us...
            cellWidth = this.cellWidth();
            cellHeight = this.getCellHeight(true);
            // load any element attributes if we don't have a node
            if (!node) { // @ts-ignore private read only on ourself
                node = this._readAttr(el);
            }
            if (!node.grid) {
                node._isExternal = true;
                el.gridstackNode = node;
            }
            // calculate the grid size based on element outer size
            helper = helper || el;
            let w = node.w || Math.round(helper.offsetWidth / cellWidth) || 1;
            let h = node.h || Math.round(helper.offsetHeight / cellHeight) || 1;
            // if the item came from another grid, make a copy and save the original info in case we go back there
            if (node.grid && node.grid !== this) {
                // copy the node original values (min/max/id/etc...) but override width/height/other flags which are this grid specific
                // console.log('dropover cloning node'); // TEST
                if (!el._gridstackNodeOrig)
                    el._gridstackNodeOrig = node; // shouldn't have multiple nested!
                el.gridstackNode = node = Object.assign(Object.assign({}, node), { w, h, grid: this });
                this.engine.cleanupNode(node)
                    .nodeBoundFix(node);
                // restore some internal fields we need after clearing them all
                node._initDD =
                    node._isExternal = // DOM needs to be re-parented on a drop
                        node._temporaryRemoved = true; // so it can be inserted onDrag below
            }
            else {
                node.w = w;
                node.h = h;
                node._temporaryRemoved = true; // so we can insert it
            }
            // clear any marked for complete removal (Note: don't check _isAboutToRemove as that is cleared above - just do it)
            this._itemRemoving(node.el, false);
            dd.on(el, 'drag', onDrag);
            // make sure this is called at least once when going fast #1578
            onDrag(event, el, helper);
            return false; // prevent parent from receiving msg (which may be a grid as well)
        })
            /**
             * Leaving our grid area...
             */
            .on(this.el, 'dropout', (event, el, helper) => {
            // console.log(`out ${this.el.gridstack.opts.id} ${count++}`); // TEST
            let node = el.gridstackNode;
            if (!node)
                return false;
            // fix #1578 when dragging fast, we might get leave after other grid gets enter (which calls us to clean)
            // so skip this one if we're not the active grid really..
            if (!node.grid || node.grid === this) {
                this._leave(el, helper);
                // if we were created as temporary nested grid, go back to before state
                if (this._isTemp) {
                    this.removeAsSubGrid(node);
                }
            }
            return false; // prevent parent from receiving msg (which may be grid as well)
        })
            /**
             * end - releasing the mouse
             */
            .on(this.el, 'drop', (event, el, helper) => {
            var _a, _b;
            let node = el.gridstackNode;
            // ignore drop on ourself from ourself that didn't come from the outside - dragend will handle the simple move instead
            if ((node === null || node === void 0 ? void 0 : node.grid) === this && !node._isExternal)
                return false;
            let wasAdded = !!this.placeholder.parentElement; // skip items not actually added to us because of constrains, but do cleanup #1419
            this.placeholder.remove();
            // notify previous grid of removal
            // console.log('drop delete _gridstackNodeOrig') // TEST
            let origNode = el._gridstackNodeOrig;
            delete el._gridstackNodeOrig;
            if (wasAdded && (origNode === null || origNode === void 0 ? void 0 : origNode.grid) && origNode.grid !== this) {
                let oGrid = origNode.grid;
                oGrid.engine.removedNodes.push(origNode);
                oGrid._triggerRemoveEvent()._triggerChangeEvent();
                // if it's an empty sub-grid that got auto-created, nuke it
                if (oGrid.parentGridItem && !oGrid.engine.nodes.length && oGrid.opts.subGridDynamic) {
                    oGrid.removeAsSubGrid();
                }
            }
            if (!node)
                return false;
            // use existing placeholder node as it's already in our list with drop location
            if (wasAdded) {
                this.engine.cleanupNode(node); // removes all internal _xyz values
                node.grid = this;
            }
            dd.off(el, 'drag');
            // if we made a copy ('helper' which is temp) of the original node then insert a copy, else we move the original node (#1102)
            // as the helper will be nuked by jquery-ui otherwise. TODO: update old code path
            if (helper !== el) {
                helper.remove();
                el.gridstackNode = origNode; // original item (left behind) is re-stored to pre dragging as the node now has drop info
                if (wasAdded) {
                    el = el.cloneNode(true);
                }
            }
            else {
                el.remove(); // reduce flicker as we change depth here, and size further down
                this._removeDD(el);
            }
            if (!wasAdded)
                return false;
            el.gridstackNode = node;
            node.el = el;
            let subGrid = (_b = (_a = node.subGrid) === null || _a === void 0 ? void 0 : _a.el) === null || _b === void 0 ? void 0 : _b.gridstack; // set when actual sub-grid present
            // @ts-ignore
            utils_1.Utils.copyPos(node, this._readAttr(this.placeholder)); // placeholder values as moving VERY fast can throw things off #1578
            utils_1.Utils.removePositioningStyles(el); // @ts-ignore
            this._writeAttr(el, node);
            el.classList.add(types_1.gridDefaults.itemClass, this.opts.itemClass);
            this.el.appendChild(el); // @ts-ignore // TODO: now would be ideal time to _removeHelperStyle() overriding floating styles (native only)
            if (subGrid) {
                subGrid.parentGridItem = node;
                if (!subGrid.opts.styleInHead)
                    subGrid._updateStyles(true); // re-create sub-grid styles now that we've moved
            }
            this._updateContainerHeight();
            this.engine.addedNodes.push(node); // @ts-ignore
            this._triggerAddEvent(); // @ts-ignore
            this._triggerChangeEvent();
            this.engine.endUpdate();
            if (this._gsEventHandler['dropped']) {
                this._gsEventHandler['dropped'](Object.assign(Object.assign({}, event), { type: 'dropped' }), origNode && origNode.grid ? origNode : undefined, node);
            }
            // wait till we return out of the drag callback to set the new drag&resize handler or they may get messed up
            window.setTimeout(() => {
                // IFF we are still there (some application will use as placeholder and insert their real widget instead and better call makeWidget())
                if (node.el && node.el.parentElement) {
                    this._prepareDragDropByNode(node);
                }
                else {
                    this.engine.removeNode(node);
                }
                delete node.grid._isTemp;
            });
            return false; // prevent parent from receiving msg (which may be grid as well)
        });
        return this;
    }
    /** @internal mark item for removal */
    _itemRemoving(el, remove) {
        let node = el ? el.gridstackNode : undefined;
        if (!node || !node.grid)
            return;
        remove ? node._isAboutToRemove = true : delete node._isAboutToRemove;
        remove ? el.classList.add('grid-stack-item-removing') : el.classList.remove('grid-stack-item-removing');
    }
    /** @internal called to setup a trash drop zone if the user specifies it */
    _setupRemoveDrop() {
        if (!this.opts.staticGrid && typeof this.opts.removable === 'string') {
            let trashEl = document.querySelector(this.opts.removable);
            if (!trashEl)
                return this;
            // only register ONE drop-over/dropout callback for the 'trash', and it will
            // update the passed in item and parent grid because the 'trash' is a shared resource anyway,
            // and Native DD only has 1 event CB (having a list and technically a per grid removableOptions complicates things greatly)
            if (!dd.isDroppable(trashEl)) {
                dd.droppable(trashEl, this.opts.removableOptions)
                    .on(trashEl, 'dropover', (event, el) => this._itemRemoving(el, true))
                    .on(trashEl, 'dropout', (event, el) => this._itemRemoving(el, false));
            }
        }
        return this;
    }
    /** @internal prepares the element for drag&drop **/
    _prepareDragDropByNode(node) {
        let el = node.el;
        const noMove = node.noMove || this.opts.disableDrag;
        const noResize = node.noResize || this.opts.disableResize;
        // check for disabled grid first
        if (this.opts.staticGrid || (noMove && noResize)) {
            if (node._initDD) {
                this._removeDD(el); // nukes everything instead of just disable, will add some styles back next
                delete node._initDD;
            }
            el.classList.add('ui-draggable-disabled', 'ui-resizable-disabled'); // add styles one might depend on #1435
            return this;
        }
        if (!node._initDD) {
            // variables used/cashed between the 3 start/move/end methods, in addition to node passed above
            let cellWidth;
            let cellHeight;
            /** called when item starts moving/resizing */
            let onStartMoving = (event, ui) => {
                // trigger any 'dragstart' / 'resizestart' manually
                if (this._gsEventHandler[event.type]) {
                    this._gsEventHandler[event.type](event, event.target);
                }
                cellWidth = this.cellWidth();
                cellHeight = this.getCellHeight(true); // force pixels for calculations
                this._onStartMoving(el, event, ui, node, cellWidth, cellHeight);
            };
            /** called when item is being dragged/resized */
            let dragOrResize = (event, ui) => {
                this._dragOrResize(el, event, ui, node, cellWidth, cellHeight);
            };
            /** called when the item stops moving/resizing */
            let onEndMoving = (event) => {
                this.placeholder.remove();
                delete node._moving;
                delete node._event;
                delete node._lastTried;
                // if the item has moved to another grid, we're done here
                let target = event.target;
                if (!target.gridstackNode || target.gridstackNode.grid !== this)
                    return;
                node.el = target;
                if (node._isAboutToRemove) {
                    let gridToNotify = el.gridstackNode.grid;
                    if (gridToNotify._gsEventHandler[event.type]) {
                        gridToNotify._gsEventHandler[event.type](event, target);
                    }
                    this._removeDD(el);
                    gridToNotify.engine.removedNodes.push(node);
                    gridToNotify._triggerRemoveEvent();
                    // break circular links and remove DOM
                    delete el.gridstackNode;
                    delete node.el;
                    el.remove();
                }
                else {
                    utils_1.Utils.removePositioningStyles(target);
                    if (node._temporaryRemoved) {
                        // got removed - restore item back to before dragging position
                        utils_1.Utils.copyPos(node, node._orig); // @ts-ignore
                        this._writePosAttr(target, node);
                        this.engine.addNode(node);
                    }
                    else {
                        // move to new placeholder location
                        this._writePosAttr(target, node);
                    }
                    if (this._gsEventHandler[event.type]) {
                        this._gsEventHandler[event.type](event, target);
                    }
                }
                // @ts-ignore
                this._extraDragRow = 0; // @ts-ignore
                this._updateContainerHeight(); // @ts-ignore
                this._triggerChangeEvent();
                this.engine.endUpdate();
            };
            dd.draggable(el, {
                start: onStartMoving,
                stop: onEndMoving,
                drag: dragOrResize
            }).resizable(el, {
                start: onStartMoving,
                stop: onEndMoving,
                resize: dragOrResize
            });
            node._initDD = true; // we've set DD support now
        }
        // finally fine tune move vs resize by disabling any part...
        dd.draggable(el, noMove ? 'disable' : 'enable')
            .resizable(el, noResize ? 'disable' : 'enable');
        return this;
    }
    /** @internal handles actual drag/resize start **/
    _onStartMoving(el, event, ui, node, cellWidth, cellHeight) {
        this.engine.cleanNodes()
            .beginUpdate(node);
        // @ts-ignore
        this._writePosAttr(this.placeholder, node);
        this.el.appendChild(this.placeholder);
        // console.log('_onStartMoving placeholder') // TEST
        node.el = this.placeholder;
        node._lastUiPosition = ui.position;
        node._prevYPix = ui.position.top;
        node._moving = (event.type === 'dragstart'); // 'dropover' are not initially moving so they can go exactly where they enter (will push stuff out of the way)
        delete node._lastTried;
        if (event.type === 'dropover' && node._temporaryRemoved) {
            // console.log('engine.addNode x=' + node.x); // TEST
            this.engine.addNode(node); // will add, fix collisions, update attr and clear _temporaryRemoved
            node._moving = true; // AFTER, mark as moving object (wanted fix location before)
        }
        // set the min/max resize info
        this.engine.cacheRects(cellWidth, cellHeight, this.opts.marginTop, this.opts.marginRight, this.opts.marginBottom, this.opts.marginLeft);
        if (event.type === 'resizestart') {
            dd.resizable(el, 'option', 'minWidth', cellWidth * (node.minW || 1))
                .resizable(el, 'option', 'minHeight', cellHeight * (node.minH || 1));
            if (node.maxW) {
                dd.resizable(el, 'option', 'maxWidth', cellWidth * node.maxW);
            }
            if (node.maxH) {
                dd.resizable(el, 'option', 'maxHeight', cellHeight * node.maxH);
            }
        }
    }
    /** @internal handles actual drag/resize **/
    _dragOrResize(el, event, ui, node, cellWidth, cellHeight) {
        let p = Object.assign({}, node._orig); // could be undefined (_isExternal) which is ok (drag only set x,y and w,h will default to node value)
        let resizing;
        let mLeft = this.opts.marginLeft, mRight = this.opts.marginRight, mTop = this.opts.marginTop, mBottom = this.opts.marginBottom;
        // if margins (which are used to pass mid point by) are large relative to cell height/width, reduce them down #1855
        let mHeight = Math.round(cellHeight * 0.1), mWidth = Math.round(cellWidth * 0.1);
        mLeft = Math.min(mLeft, mWidth);
        mRight = Math.min(mRight, mWidth);
        mTop = Math.min(mTop, mHeight);
        mBottom = Math.min(mBottom, mHeight);
        if (event.type === 'drag') {
            if (node._temporaryRemoved)
                return; // handled by dropover
            let distance = ui.position.top - node._prevYPix;
            node._prevYPix = ui.position.top;
            if (this.opts.draggable.scroll !== false) {
                utils_1.Utils.updateScrollPosition(el, ui.position, distance);
            }
            // get new position taking into account the margin in the direction we are moving! (need to pass mid point by margin)
            let left = ui.position.left + (ui.position.left > node._lastUiPosition.left ? -mRight : mLeft);
            let top = ui.position.top + (ui.position.top > node._lastUiPosition.top ? -mBottom : mTop);
            p.x = Math.round(left / cellWidth);
            p.y = Math.round(top / cellHeight);
            // @ts-ignore// if we're at the bottom hitting something else, grow the grid so cursor doesn't leave when trying to place below others
            let prev = this._extraDragRow;
            if (this.engine.collide(node, p)) {
                let row = this.getRow();
                let extra = Math.max(0, (p.y + node.h) - row);
                if (this.opts.maxRow && row + extra > this.opts.maxRow) {
                    extra = Math.max(0, this.opts.maxRow - row);
                } // @ts-ignore
                this._extraDragRow = extra; // @ts-ignore
            }
            else
                this._extraDragRow = 0; // @ts-ignore
            if (this._extraDragRow !== prev)
                this._updateContainerHeight();
            if (node.x === p.x && node.y === p.y)
                return; // skip same
            // DON'T skip one we tried as we might have failed because of coverage <50% before
            // if (node._lastTried && node._lastTried.x === x && node._lastTried.y === y) return;
        }
        else if (event.type === 'resize') {
            if (p.x < 0)
                return;
            // Scrolling page if needed
            utils_1.Utils.updateScrollResize(event, el, cellHeight);
            // get new size
            p.w = Math.round((ui.size.width - mLeft) / cellWidth);
            p.h = Math.round((ui.size.height - mTop) / cellHeight);
            if (node.w === p.w && node.h === p.h)
                return;
            if (node._lastTried && node._lastTried.w === p.w && node._lastTried.h === p.h)
                return; // skip one we tried (but failed)
            // if we size on left/top side this might move us, so get possible new position as well
            let left = ui.position.left + mLeft;
            let top = ui.position.top + mTop;
            p.x = Math.round(left / cellWidth);
            p.y = Math.round(top / cellHeight);
            resizing = true;
        }
        node._event = event;
        node._lastTried = p; // set as last tried (will nuke if we go there)
        let rect = {
            x: ui.position.left + mLeft,
            y: ui.position.top + mTop,
            w: (ui.size ? ui.size.width : node.w * cellWidth) - mLeft - mRight,
            h: (ui.size ? ui.size.height : node.h * cellHeight) - mTop - mBottom
        };
        if (this.engine.moveNodeCheck(node, Object.assign(Object.assign({}, p), { cellWidth, cellHeight, rect, resizing }))) {
            node._lastUiPosition = ui.position;
            this.engine.cacheRects(cellWidth, cellHeight, mTop, mRight, mBottom, mLeft);
            delete node._skipDown;
            if (resizing && node.subGrid) {
                node.subGrid.onParentResize();
            } // @ts-ignore
            this._extraDragRow = 0; // @ts-ignore
            this._updateContainerHeight();
            let target = event.target; // @ts-ignore
            this._writePosAttr(target, node);
            if (this._gsEventHandler[event.type]) {
                this._gsEventHandler[event.type](event, target);
            }
        }
    }
    /** @internal called when item leaving our area by either cursor dropout event
     * or shape is outside our boundaries. remove it from us, and mark temporary if this was
     * our item to start with else restore prev node values from prev grid it came from.
     **/
    _leave(el, helper) {
        let node = el.gridstackNode;
        if (!node)
            return;
        dd.off(el, 'drag'); // no need to track while being outside
        // this gets called when cursor leaves and shape is outside, so only do this once
        if (node._temporaryRemoved)
            return;
        node._temporaryRemoved = true;
        this.engine.removeNode(node); // remove placeholder as well, otherwise it's a sign node is not in our list, which is a bigger issue
        node.el = node._isExternal && helper ? helper : el; // point back to real item being dragged
        if (this.opts.removable === true) { // boolean vs a class string
            // item leaving us and we are supposed to remove on leave (no need to drag onto trash) mark it so
            this._itemRemoving(el, true);
        }
        // finally if item originally came from another grid, but left us, restore things back to prev info
        if (el._gridstackNodeOrig) {
            // console.log('leave delete _gridstackNodeOrig') // TEST
            el.gridstackNode = el._gridstackNodeOrig;
            delete el._gridstackNodeOrig;
        }
        else if (node._isExternal) {
            // item came from outside (like a toolbar) so nuke any node info
            delete node.el;
            delete el.gridstackNode;
            // and restore all nodes back to original
            this.engine.restoreInitial();
        }
    }
    // legacy method removed
    commit() { utils_1.obsolete(this, this.batchUpdate(false), 'commit', 'batchUpdate', '5.2'); return this; }
}
exports.GridStack = GridStack;
/** scoping so users can call GridStack.Utils.sort() for example */
GridStack.Utils = utils_1.Utils;
/** scoping so users can call new GridStack.Engine(12) for example */
GridStack.Engine = gridstack_engine_1.GridStackEngine;
GridStack.GDRev = '7.3.0';
//# sourceMappingURL=gridstack.js.map

/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/types.js":
/*!**************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/types.js ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * types.ts 7.3.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dragInDefaultOptions = exports.gridDefaults = void 0;
// default values for grid options - used during init and when saving out
exports.gridDefaults = {
    alwaysShowResizeHandle: 'mobile',
    animate: true,
    auto: true,
    cellHeight: 'auto',
    cellHeightThrottle: 100,
    cellHeightUnit: 'px',
    column: 12,
    draggable: { handle: '.grid-stack-item-content', appendTo: 'body', scroll: true },
    handle: '.grid-stack-item-content',
    itemClass: 'grid-stack-item',
    margin: 10,
    marginUnit: 'px',
    maxRow: 0,
    minRow: 0,
    oneColumnSize: 768,
    placeholderClass: 'grid-stack-placeholder',
    placeholderText: '',
    removableOptions: { accept: '.grid-stack-item' },
    resizable: { handles: 'se' },
    rtl: 'auto',
};
/** default dragIn options */
exports.dragInDefaultOptions = {
    handle: '.grid-stack-item-content',
    appendTo: 'body',
};
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/utils.js":
/*!**************************************************************************************************************!*\
  !*** ../root/.yarn/berry/cache/gridstack-npm-7.3.0-9ea8b49bae-10c0.zip/node_modules/gridstack/dist/utils.js ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * utils.ts 7.3.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Utils = exports.obsoleteAttr = exports.obsoleteOptsDel = exports.obsoleteOpts = exports.obsolete = void 0;
/** checks for obsolete method names */
// eslint-disable-next-line
function obsolete(self, f, oldName, newName, rev) {
    let wrapper = (...args) => {
        console.warn('gridstack.js: Function `' + oldName + '` is deprecated in ' + rev + ' and has been replaced ' +
            'with `' + newName + '`. It will be **removed** in a future release');
        return f.apply(self, args);
    };
    wrapper.prototype = f.prototype;
    return wrapper;
}
exports.obsolete = obsolete;
/** checks for obsolete grid options (can be used for any fields, but msg is about options) */
function obsoleteOpts(opts, oldName, newName, rev) {
    if (opts[oldName] !== undefined) {
        opts[newName] = opts[oldName];
        console.warn('gridstack.js: Option `' + oldName + '` is deprecated in ' + rev + ' and has been replaced with `' +
            newName + '`. It will be **removed** in a future release');
    }
}
exports.obsoleteOpts = obsoleteOpts;
/** checks for obsolete grid options which are gone */
function obsoleteOptsDel(opts, oldName, rev, info) {
    if (opts[oldName] !== undefined) {
        console.warn('gridstack.js: Option `' + oldName + '` is deprecated in ' + rev + info);
    }
}
exports.obsoleteOptsDel = obsoleteOptsDel;
/** checks for obsolete Jquery element attributes */
function obsoleteAttr(el, oldName, newName, rev) {
    let oldAttr = el.getAttribute(oldName);
    if (oldAttr !== null) {
        el.setAttribute(newName, oldAttr);
        console.warn('gridstack.js: attribute `' + oldName + '`=' + oldAttr + ' is deprecated on this object in ' + rev + ' and has been replaced with `' +
            newName + '`. It will be **removed** in a future release');
    }
}
exports.obsoleteAttr = obsoleteAttr;
/**
 * Utility methods
 */
class Utils {
    /** convert a potential selector into actual list of html elements */
    static getElements(els) {
        if (typeof els === 'string') {
            let list = document.querySelectorAll(els);
            if (!list.length && els[0] !== '.' && els[0] !== '#') {
                list = document.querySelectorAll('.' + els);
                if (!list.length) {
                    list = document.querySelectorAll('#' + els);
                }
            }
            return Array.from(list);
        }
        return [els];
    }
    /** convert a potential selector into actual single element */
    static getElement(els) {
        if (typeof els === 'string') {
            if (!els.length)
                return null;
            if (els[0] === '#') {
                return document.getElementById(els.substring(1));
            }
            if (els[0] === '.' || els[0] === '[') {
                return document.querySelector(els);
            }
            // if we start with a digit, assume it's an id (error calling querySelector('#1')) as class are not valid CSS
            if (!isNaN(+els[0])) { // start with digit
                return document.getElementById(els);
            }
            // finally try string, then id then class
            let el = document.querySelector(els);
            if (!el) {
                el = document.getElementById(els);
            }
            if (!el) {
                el = document.querySelector('.' + els);
            }
            return el;
        }
        return els;
    }
    /** returns true if a and b overlap */
    static isIntercepted(a, b) {
        return !(a.y >= b.y + b.h || a.y + a.h <= b.y || a.x + a.w <= b.x || a.x >= b.x + b.w);
    }
    /** returns true if a and b touch edges or corners */
    static isTouching(a, b) {
        return Utils.isIntercepted(a, { x: b.x - 0.5, y: b.y - 0.5, w: b.w + 1, h: b.h + 1 });
    }
    /** returns the area a and b overlap */
    static areaIntercept(a, b) {
        let x0 = (a.x > b.x) ? a.x : b.x;
        let x1 = (a.x + a.w < b.x + b.w) ? a.x + a.w : b.x + b.w;
        if (x1 <= x0)
            return 0; // no overlap
        let y0 = (a.y > b.y) ? a.y : b.y;
        let y1 = (a.y + a.h < b.y + b.h) ? a.y + a.h : b.y + b.h;
        if (y1 <= y0)
            return 0; // no overlap
        return (x1 - x0) * (y1 - y0);
    }
    /** returns the area */
    static area(a) {
        return a.w * a.h;
    }
    /**
     * Sorts array of nodes
     * @param nodes array to sort
     * @param dir 1 for asc, -1 for desc (optional)
     * @param width width of the grid. If undefined the width will be calculated automatically (optional).
     **/
    static sort(nodes, dir, column) {
        column = column || nodes.reduce((col, n) => Math.max(n.x + n.w, col), 0) || 12;
        if (dir === -1)
            return nodes.sort((a, b) => (b.x + b.y * column) - (a.x + a.y * column));
        else
            return nodes.sort((b, a) => (b.x + b.y * column) - (a.x + a.y * column));
    }
    /**
     * creates a style sheet with style id under given parent
     * @param id will set the 'gs-style-id' attribute to that id
     * @param parent to insert the stylesheet as first child,
     * if none supplied it will be appended to the document head instead.
     */
    static createStylesheet(id, parent, options) {
        let style = document.createElement('style');
        const nonce = options === null || options === void 0 ? void 0 : options.nonce;
        if (nonce)
            style.nonce = nonce;
        style.setAttribute('type', 'text/css');
        style.setAttribute('gs-style-id', id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (style.styleSheet) { // TODO: only CSSImportRule have that and different beast ??
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style.styleSheet.cssText = '';
        }
        else {
            style.appendChild(document.createTextNode('')); // WebKit hack
        }
        if (!parent) {
            // default to head
            parent = document.getElementsByTagName('head')[0];
            parent.appendChild(style);
        }
        else {
            parent.insertBefore(style, parent.firstChild);
        }
        return style.sheet;
    }
    /** removed the given stylesheet id */
    static removeStylesheet(id) {
        let el = document.querySelector('STYLE[gs-style-id=' + id + ']');
        if (el && el.parentNode)
            el.remove();
    }
    /** inserts a CSS rule */
    static addCSSRule(sheet, selector, rules) {
        if (typeof sheet.addRule === 'function') {
            sheet.addRule(selector, rules);
        }
        else if (typeof sheet.insertRule === 'function') {
            sheet.insertRule(`${selector}{${rules}}`);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static toBool(v) {
        if (typeof v === 'boolean') {
            return v;
        }
        if (typeof v === 'string') {
            v = v.toLowerCase();
            return !(v === '' || v === 'no' || v === 'false' || v === '0');
        }
        return Boolean(v);
    }
    static toNumber(value) {
        return (value === null || value.length === 0) ? undefined : Number(value);
    }
    static parseHeight(val) {
        let h;
        let unit = 'px';
        if (typeof val === 'string') {
            let match = val.match(/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw|%)?$/);
            if (!match) {
                throw new Error('Invalid height');
            }
            unit = match[2] || 'px';
            h = parseFloat(match[1]);
        }
        else {
            h = val;
        }
        return { h, unit };
    }
    /** copies unset fields in target to use the given default sources values */
    // eslint-disable-next-line
    static defaults(target, ...sources) {
        sources.forEach(source => {
            for (const key in source) {
                if (!source.hasOwnProperty(key))
                    return;
                if (target[key] === null || target[key] === undefined) {
                    target[key] = source[key];
                }
                else if (typeof source[key] === 'object' && typeof target[key] === 'object') {
                    // property is an object, recursively add it's field over... #1373
                    this.defaults(target[key], source[key]);
                }
            }
        });
        return target;
    }
    /** given 2 objects return true if they have the same values. Checks for Object {} having same fields and values (just 1 level down) */
    static same(a, b) {
        if (typeof a !== 'object')
            return a == b;
        if (typeof a !== typeof b)
            return false;
        // else we have object, check just 1 level deep for being same things...
        if (Object.keys(a).length !== Object.keys(b).length)
            return false;
        for (const key in a) {
            if (a[key] !== b[key])
                return false;
        }
        return true;
    }
    /** copies over b size & position (GridStackPosition), and optionally min/max as well */
    static copyPos(a, b, doMinMax = false) {
        a.x = b.x;
        a.y = b.y;
        a.w = b.w;
        a.h = b.h;
        if (doMinMax) {
            if (b.minW)
                a.minW = b.minW;
            if (b.minH)
                a.minH = b.minH;
            if (b.maxW)
                a.maxW = b.maxW;
            if (b.maxH)
                a.maxH = b.maxH;
        }
        return a;
    }
    /** true if a and b has same size & position */
    static samePos(a, b) {
        return a && b && a.x === b.x && a.y === b.y && a.w === b.w && a.h === b.h;
    }
    /** removes field from the first object if same as the second objects (like diffing) and internal '_' for saving */
    static removeInternalAndSame(a, b) {
        if (typeof a !== 'object' || typeof b !== 'object')
            return;
        for (let key in a) {
            let val = a[key];
            if (key[0] === '_' || val === b[key]) {
                delete a[key];
            }
            else if (val && typeof val === 'object' && b[key] !== undefined) {
                for (let i in val) {
                    if (val[i] === b[key][i] || i[0] === '_') {
                        delete val[i];
                    }
                }
                if (!Object.keys(val).length) {
                    delete a[key];
                }
            }
        }
    }
    /** removes internal fields '_' and default values for saving */
    static removeInternalForSave(n, removeEl = true) {
        for (let key in n) {
            if (key[0] === '_' || n[key] === null || n[key] === undefined)
                delete n[key];
        }
        delete n.grid;
        if (removeEl)
            delete n.el;
        // delete default values (will be re-created on read)
        if (!n.autoPosition)
            delete n.autoPosition;
        if (!n.noResize)
            delete n.noResize;
        if (!n.noMove)
            delete n.noMove;
        if (!n.locked)
            delete n.locked;
        if (n.w === 1 || n.w === n.minW)
            delete n.w;
        if (n.h === 1 || n.h === n.minH)
            delete n.h;
    }
    /** return the closest parent (or itself) matching the given class */
    static closestUpByClass(el, name) {
        while (el) {
            if (el.classList.contains(name))
                return el;
            el = el.parentElement;
        }
        return null;
    }
    /** delay calling the given function for given delay, preventing new calls from happening while waiting */
    static throttle(func, delay) {
        let isWaiting = false;
        return (...args) => {
            if (!isWaiting) {
                isWaiting = true;
                setTimeout(() => { func(...args); isWaiting = false; }, delay);
            }
        };
    }
    static removePositioningStyles(el) {
        let style = el.style;
        if (style.position) {
            style.removeProperty('position');
        }
        if (style.left) {
            style.removeProperty('left');
        }
        if (style.top) {
            style.removeProperty('top');
        }
        if (style.width) {
            style.removeProperty('width');
        }
        if (style.height) {
            style.removeProperty('height');
        }
    }
    /** @internal returns the passed element if scrollable, else the closest parent that will, up to the entire document scrolling element */
    static getScrollElement(el) {
        if (!el)
            return document.scrollingElement || document.documentElement; // IE support
        const style = getComputedStyle(el);
        const overflowRegex = /(auto|scroll)/;
        if (overflowRegex.test(style.overflow + style.overflowY)) {
            return el;
        }
        else {
            return this.getScrollElement(el.parentElement);
        }
    }
    /** @internal */
    static updateScrollPosition(el, position, distance) {
        // is widget in view?
        let rect = el.getBoundingClientRect();
        let innerHeightOrClientHeight = (window.innerHeight || document.documentElement.clientHeight);
        if (rect.top < 0 ||
            rect.bottom > innerHeightOrClientHeight) {
            // set scrollTop of first parent that scrolls
            // if parent is larger than el, set as low as possible
            // to get entire widget on screen
            let offsetDiffDown = rect.bottom - innerHeightOrClientHeight;
            let offsetDiffUp = rect.top;
            let scrollEl = this.getScrollElement(el);
            if (scrollEl !== null) {
                let prevScroll = scrollEl.scrollTop;
                if (rect.top < 0 && distance < 0) {
                    // moving up
                    if (el.offsetHeight > innerHeightOrClientHeight) {
                        scrollEl.scrollTop += distance;
                    }
                    else {
                        scrollEl.scrollTop += Math.abs(offsetDiffUp) > Math.abs(distance) ? distance : offsetDiffUp;
                    }
                }
                else if (distance > 0) {
                    // moving down
                    if (el.offsetHeight > innerHeightOrClientHeight) {
                        scrollEl.scrollTop += distance;
                    }
                    else {
                        scrollEl.scrollTop += offsetDiffDown > distance ? distance : offsetDiffDown;
                    }
                }
                // move widget y by amount scrolled
                position.top += scrollEl.scrollTop - prevScroll;
            }
        }
    }
    /**
     * @internal Function used to scroll the page.
     *
     * @param event `MouseEvent` that triggers the resize
     * @param el `HTMLElement` that's being resized
     * @param distance Distance from the V edges to start scrolling
     */
    static updateScrollResize(event, el, distance) {
        const scrollEl = this.getScrollElement(el);
        const height = scrollEl.clientHeight;
        // #1727 event.clientY is relative to viewport, so must compare this against position of scrollEl getBoundingClientRect().top
        // #1745 Special situation if scrollEl is document 'html': here browser spec states that
        // clientHeight is height of viewport, but getBoundingClientRect() is rectangle of html element;
        // this discrepancy arises because in reality scrollbar is attached to viewport, not html element itself.
        const offsetTop = (scrollEl === this.getScrollElement()) ? 0 : scrollEl.getBoundingClientRect().top;
        const pointerPosY = event.clientY - offsetTop;
        const top = pointerPosY < distance;
        const bottom = pointerPosY > height - distance;
        if (top) {
            // This also can be done with a timeout to keep scrolling while the mouse is
            // in the scrolling zone. (will have smoother behavior)
            scrollEl.scrollBy({ behavior: 'smooth', top: pointerPosY - distance });
        }
        else if (bottom) {
            scrollEl.scrollBy({ behavior: 'smooth', top: distance - (height - pointerPosY) });
        }
    }
    /** single level clone, returning a new object with same top fields. This will share sub objects and arrays */
    static clone(obj) {
        if (obj === null || obj === undefined || typeof (obj) !== 'object') {
            return obj;
        }
        // return Object.assign({}, obj);
        if (obj instanceof Array) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return [...obj];
        }
        return Object.assign({}, obj);
    }
    /**
     * Recursive clone version that returns a full copy, checking for nested objects and arrays ONLY.
     * Note: this will use as-is any key starting with double __ (and not copy inside) some lib have circular dependencies.
     */
    static cloneDeep(obj) {
        // list of fields we will skip during cloneDeep (nested objects, other internal)
        const skipFields = ['parentGrid', 'el', 'grid', 'subGrid', 'engine'];
        // return JSON.parse(JSON.stringify(obj)); // doesn't work with date format ?
        const ret = Utils.clone(obj);
        for (const key in ret) {
            // NOTE: we don't support function/circular dependencies so skip those properties for now...
            if (ret.hasOwnProperty(key) && typeof (ret[key]) === 'object' && key.substring(0, 2) !== '__' && !skipFields.find(k => k === key)) {
                ret[key] = Utils.cloneDeep(obj[key]);
            }
        }
        return ret;
    }
    /** deep clone the given HTML node, removing teh unique id field */
    static cloneNode(el) {
        const node = el.cloneNode(true);
        node.removeAttribute('id');
        return node;
    }
    static appendTo(el, parent) {
        let parentNode;
        if (typeof parent === 'string') {
            parentNode = document.querySelector(parent);
        }
        else {
            parentNode = parent;
        }
        if (parentNode) {
            parentNode.appendChild(el);
        }
    }
    // public static setPositionRelative(el: HTMLElement): void {
    //   if (!(/^(?:r|a|f)/).test(window.getComputedStyle(el).position)) {
    //     el.style.position = "relative";
    //   }
    // }
    static addElStyles(el, styles) {
        if (styles instanceof Object) {
            for (const s in styles) {
                if (styles.hasOwnProperty(s)) {
                    if (Array.isArray(styles[s])) {
                        // support fallback value
                        styles[s].forEach(val => {
                            el.style[s] = val;
                        });
                    }
                    else {
                        el.style[s] = styles[s];
                    }
                }
            }
        }
    }
    static initEvent(e, info) {
        const evt = { type: info.type };
        const obj = {
            button: 0,
            which: 0,
            buttons: 1,
            bubbles: true,
            cancelable: true,
            target: info.target ? info.target : e.target
        };
        // don't check for `instanceof DragEvent` as Safari use MouseEvent #1540
        if (e.dataTransfer) {
            evt['dataTransfer'] = e.dataTransfer; // workaround 'readonly' field.
        }
        ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].forEach(p => evt[p] = e[p]); // keys
        ['pageX', 'pageY', 'clientX', 'clientY', 'screenX', 'screenY'].forEach(p => evt[p] = e[p]); // point info
        return Object.assign(Object.assign({}, evt), obj);
    }
    /** copies the MouseEvent properties and sends it as another event to the given target */
    static simulateMouseEvent(e, simulatedType, target) {
        const simulatedEvent = document.createEvent('MouseEvents');
        simulatedEvent.initMouseEvent(simulatedType, // type
        true, // bubbles
        true, // cancelable
        window, // view
        1, // detail
        e.screenX, // screenX
        e.screenY, // screenY
        e.clientX, // clientX
        e.clientY, // clientY
        e.ctrlKey, // ctrlKey
        e.altKey, // altKey
        e.shiftKey, // shiftKey
        e.metaKey, // metaKey
        0, // button
        e.target // relatedTarget
        );
        (target || e.target).dispatchEvent(simulatedEvent);
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./assets/dashboard.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHVGQUF1RjtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGVBQWUsb0JBQW9CO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGlEQUFpRDtBQUNqRjtBQUNBO0FBQ0EsZ0NBQWdDLDREQUE0RDtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBLGtGQUFrRjtBQUNsRixvR0FBb0c7QUFDcEcsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9raW1haS8uL2Fzc2V0cy9kYXNoYm9hcmQuanMiLCJ3ZWJwYWNrOi8va2ltYWkvLi4vcm9vdC8ueWFybi9iZXJyeS9jYWNoZS9ncmlkc3RhY2stbnBtLTcuMy4wLTllYThiNDliYWUtMTBjMC56aXAvbm9kZV9tb2R1bGVzL2dyaWRzdGFjay9kaXN0L2dyaWRzdGFjay1leHRyYS5taW4uY3NzPzVhZmMiLCJ3ZWJwYWNrOi8va2ltYWkvLi4vcm9vdC8ueWFybi9iZXJyeS9jYWNoZS9ncmlkc3RhY2stbnBtLTcuMy4wLTllYThiNDliYWUtMTBjMC56aXAvbm9kZV9tb2R1bGVzL2dyaWRzdGFjay9kaXN0L2dyaWRzdGFjay5taW4uY3NzPzQyOTIiLCJ3ZWJwYWNrOi8va2ltYWkvLi4vcm9vdC8ueWFybi9iZXJyeS9jYWNoZS9ncmlkc3RhY2stbnBtLTcuMy4wLTllYThiNDliYWUtMTBjMC56aXAvbm9kZV9tb2R1bGVzL2dyaWRzdGFjay9kaXN0L2RkLWJhc2UtaW1wbC5qcyIsIndlYnBhY2s6Ly9raW1haS8uLi9yb290Ly55YXJuL2JlcnJ5L2NhY2hlL2dyaWRzdGFjay1ucG0tNy4zLjAtOWVhOGI0OWJhZS0xMGMwLnppcC9ub2RlX21vZHVsZXMvZ3JpZHN0YWNrL2Rpc3QvZGQtZHJhZ2dhYmxlLmpzIiwid2VicGFjazovL2tpbWFpLy4uL3Jvb3QvLnlhcm4vYmVycnkvY2FjaGUvZ3JpZHN0YWNrLW5wbS03LjMuMC05ZWE4YjQ5YmFlLTEwYzAuemlwL25vZGVfbW9kdWxlcy9ncmlkc3RhY2svZGlzdC9kZC1kcm9wcGFibGUuanMiLCJ3ZWJwYWNrOi8va2ltYWkvLi4vcm9vdC8ueWFybi9iZXJyeS9jYWNoZS9ncmlkc3RhY2stbnBtLTcuMy4wLTllYThiNDliYWUtMTBjMC56aXAvbm9kZV9tb2R1bGVzL2dyaWRzdGFjay9kaXN0L2RkLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8va2ltYWkvLi4vcm9vdC8ueWFybi9iZXJyeS9jYWNoZS9ncmlkc3RhY2stbnBtLTcuMy4wLTllYThiNDliYWUtMTBjMC56aXAvbm9kZV9tb2R1bGVzL2dyaWRzdGFjay9kaXN0L2RkLWdyaWRzdGFjay5qcyIsIndlYnBhY2s6Ly9raW1haS8uLi9yb290Ly55YXJuL2JlcnJ5L2NhY2hlL2dyaWRzdGFjay1ucG0tNy4zLjAtOWVhOGI0OWJhZS0xMGMwLnppcC9ub2RlX21vZHVsZXMvZ3JpZHN0YWNrL2Rpc3QvZGQtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9raW1haS8uLi9yb290Ly55YXJuL2JlcnJ5L2NhY2hlL2dyaWRzdGFjay1ucG0tNy4zLjAtOWVhOGI0OWJhZS0xMGMwLnppcC9ub2RlX21vZHVsZXMvZ3JpZHN0YWNrL2Rpc3QvZGQtcmVzaXphYmxlLWhhbmRsZS5qcyIsIndlYnBhY2s6Ly9raW1haS8uLi9yb290Ly55YXJuL2JlcnJ5L2NhY2hlL2dyaWRzdGFjay1ucG0tNy4zLjAtOWVhOGI0OWJhZS0xMGMwLnppcC9ub2RlX21vZHVsZXMvZ3JpZHN0YWNrL2Rpc3QvZGQtcmVzaXphYmxlLmpzIiwid2VicGFjazovL2tpbWFpLy4uL3Jvb3QvLnlhcm4vYmVycnkvY2FjaGUvZ3JpZHN0YWNrLW5wbS03LjMuMC05ZWE4YjQ5YmFlLTEwYzAuemlwL25vZGVfbW9kdWxlcy9ncmlkc3RhY2svZGlzdC9kZC10b3VjaC5qcyIsIndlYnBhY2s6Ly9raW1haS8uLi9yb290Ly55YXJuL2JlcnJ5L2NhY2hlL2dyaWRzdGFjay1ucG0tNy4zLjAtOWVhOGI0OWJhZS0xMGMwLnppcC9ub2RlX21vZHVsZXMvZ3JpZHN0YWNrL2Rpc3QvZ3JpZHN0YWNrLWVuZ2luZS5qcyIsIndlYnBhY2s6Ly9raW1haS8uLi9yb290Ly55YXJuL2JlcnJ5L2NhY2hlL2dyaWRzdGFjay1ucG0tNy4zLjAtOWVhOGI0OWJhZS0xMGMwLnppcC9ub2RlX21vZHVsZXMvZ3JpZHN0YWNrL2Rpc3QvZ3JpZHN0YWNrLmpzIiwid2VicGFjazovL2tpbWFpLy4uL3Jvb3QvLnlhcm4vYmVycnkvY2FjaGUvZ3JpZHN0YWNrLW5wbS03LjMuMC05ZWE4YjQ5YmFlLTEwYzAuemlwL25vZGVfbW9kdWxlcy9ncmlkc3RhY2svZGlzdC90eXBlcy5qcyIsIndlYnBhY2s6Ly9raW1haS8uLi9yb290Ly55YXJuL2JlcnJ5L2NhY2hlL2dyaWRzdGFjay1ucG0tNy4zLjAtOWVhOGI0OWJhZS0xMGMwLnppcC9ub2RlX21vZHVsZXMvZ3JpZHN0YWNrL2Rpc3QvdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBodHRwczovL2dyaWRzdGFja2pzLmNvbVxuICogaHR0cHM6Ly9naXRodWIuY29tL2dyaWRzdGFjay9ncmlkc3RhY2suanMvdHJlZS9tYXN0ZXIvZG9jXG4gKi9cbnJlcXVpcmUoJ2dyaWRzdGFjay9kaXN0L2dyaWRzdGFjay5taW4uY3NzJyk7XG5yZXF1aXJlKCdncmlkc3RhY2svZGlzdC9ncmlkc3RhY2stZXh0cmEubWluLmNzcycpO1xuaW1wb3J0IHsgR3JpZFN0YWNrIH0gZnJvbSAnZ3JpZHN0YWNrJztcbmdsb2JhbC5HcmlkU3RhY2sgPSBHcmlkU3RhY2s7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qKlxyXG4gKiBkZC1iYXNlLWltcGwudHMgNy4zLjBcclxuICogQ29weXJpZ2h0IChjKSAyMDIxLTIwMjIgQWxhaW4gRHVtZXNueSAtIHNlZSBHcmlkU3RhY2sgcm9vdCBsaWNlbnNlXHJcbiAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuRERCYXNlSW1wbGVtZW50ID0gdm9pZCAwO1xyXG5jbGFzcyBEREJhc2VJbXBsZW1lbnQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgICAgIHRoaXMuX2V2ZW50UmVnaXN0ZXIgPSB7fTtcclxuICAgIH1cclxuICAgIC8qKiByZXR1cm5zIHRoZSBlbmFibGUgc3RhdGUsIGJ1dCB5b3UgaGF2ZSB0byBjYWxsIGVuYWJsZSgpL2Rpc2FibGUoKSB0byBjaGFuZ2UgKGFzIG90aGVyIHRoaW5ncyBuZWVkIHRvIGhhcHBlbikgKi9cclxuICAgIGdldCBkaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XHJcbiAgICBvbihldmVudCwgY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9ldmVudFJlZ2lzdGVyW2V2ZW50XSA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG4gICAgb2ZmKGV2ZW50KSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50UmVnaXN0ZXJbZXZlbnRdO1xyXG4gICAgfVxyXG4gICAgZW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBkaXNhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50UmVnaXN0ZXI7XHJcbiAgICB9XHJcbiAgICB0cmlnZ2VyRXZlbnQoZXZlbnROYW1lLCBldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiB0aGlzLl9ldmVudFJlZ2lzdGVyICYmIHRoaXMuX2V2ZW50UmVnaXN0ZXJbZXZlbnROYW1lXSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50UmVnaXN0ZXJbZXZlbnROYW1lXShldmVudCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5EREJhc2VJbXBsZW1lbnQgPSBEREJhc2VJbXBsZW1lbnQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRkLWJhc2UtaW1wbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuLyoqXHJcbiAqIGRkLWRyYWdnYWJsZS50cyA3LjMuMFxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEtMjAyMiBBbGFpbiBEdW1lc255IC0gc2VlIEdyaWRTdGFjayByb290IGxpY2Vuc2VcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5ERERyYWdnYWJsZSA9IHZvaWQgMDtcclxuY29uc3QgZGRfbWFuYWdlcl8xID0gcmVxdWlyZShcIi4vZGQtbWFuYWdlclwiKTtcclxuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xyXG5jb25zdCBkZF9iYXNlX2ltcGxfMSA9IHJlcXVpcmUoXCIuL2RkLWJhc2UtaW1wbFwiKTtcclxuY29uc3QgZGRfdG91Y2hfMSA9IHJlcXVpcmUoXCIuL2RkLXRvdWNoXCIpO1xyXG4vLyBsZXQgY291bnQgPSAwOyAvLyBURVNUXHJcbmNsYXNzIERERHJhZ2dhYmxlIGV4dGVuZHMgZGRfYmFzZV9pbXBsXzEuRERCYXNlSW1wbGVtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsLCBvcHRpb24gPSB7fSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xyXG4gICAgICAgIHRoaXMub3B0aW9uID0gb3B0aW9uO1xyXG4gICAgICAgIC8vIGdldCB0aGUgZWxlbWVudCB0aGF0IGlzIGFjdHVhbGx5IHN1cHBvc2VkIHRvIGJlIGRyYWdnZWQgYnlcclxuICAgICAgICBsZXQgaGFuZGxlTmFtZSA9IG9wdGlvbi5oYW5kbGUuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIHRoaXMuZHJhZ0VsID0gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGhhbmRsZU5hbWUpID8gZWwgOiBlbC5xdWVyeVNlbGVjdG9yKG9wdGlvbi5oYW5kbGUpIHx8IGVsO1xyXG4gICAgICAgIC8vIGNyZWF0ZSB2YXIgZXZlbnQgYmluZGluZyBzbyB3ZSBjYW4gZWFzaWx5IHJlbW92ZSBhbmQgc3RpbGwgbG9vayBsaWtlIFRTIG1ldGhvZHMgKHVubGlrZSBhbm9ueW1vdXMgZnVuY3Rpb25zKVxyXG4gICAgICAgIHRoaXMuX21vdXNlRG93biA9IHRoaXMuX21vdXNlRG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX21vdXNlTW92ZSA9IHRoaXMuX21vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX21vdXNlVXAgPSB0aGlzLl9tb3VzZVVwLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5lbmFibGUoKTtcclxuICAgIH1cclxuICAgIG9uKGV2ZW50LCBjYWxsYmFjaykge1xyXG4gICAgICAgIHN1cGVyLm9uKGV2ZW50LCBjYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBvZmYoZXZlbnQpIHtcclxuICAgICAgICBzdXBlci5vZmYoZXZlbnQpO1xyXG4gICAgfVxyXG4gICAgZW5hYmxlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkID09PSBmYWxzZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHN1cGVyLmVuYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuZHJhZ0VsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX21vdXNlRG93bik7XHJcbiAgICAgICAgaWYgKGRkX3RvdWNoXzEuaXNUb3VjaCkge1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdFbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZGRfdG91Y2hfMS50b3VjaHN0YXJ0KTtcclxuICAgICAgICAgICAgdGhpcy5kcmFnRWwuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBkZF90b3VjaF8xLnBvaW50ZXJkb3duKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5kcmFnRWwuc3R5bGUudG91Y2hBY3Rpb24gPSAnbm9uZSc7IC8vIG5vdCBuZWVkZWQgdW5saWtlIHBvaW50ZXJkb3duIGRvYyBjb21tZW50XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgndWktZHJhZ2dhYmxlLWRpc2FibGVkJyk7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCd1aS1kcmFnZ2FibGUnKTtcclxuICAgIH1cclxuICAgIGRpc2FibGUoZm9yRGVzdHJveSA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgPT09IHRydWUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBzdXBlci5kaXNhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5kcmFnRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fbW91c2VEb3duKTtcclxuICAgICAgICBpZiAoZGRfdG91Y2hfMS5pc1RvdWNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBkZF90b3VjaF8xLnRvdWNoc3RhcnQpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIGRkX3RvdWNoXzEucG9pbnRlcmRvd24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLWRyYWdnYWJsZScpO1xyXG4gICAgICAgIGlmICghZm9yRGVzdHJveSlcclxuICAgICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCd1aS1kcmFnZ2FibGUtZGlzYWJsZWQnKTtcclxuICAgIH1cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1RpbWVvdXQpXHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5kcmFnVGltZW91dCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuZHJhZ1RpbWVvdXQ7XHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpXHJcbiAgICAgICAgICAgIHRoaXMuX21vdXNlVXAodGhpcy5tb3VzZURvd25FdmVudCk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlKHRydWUpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmVsO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmhlbHBlcjtcclxuICAgICAgICBkZWxldGUgdGhpcy5vcHRpb247XHJcbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlT3B0aW9uKG9wdHMpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRzKS5mb3JFYWNoKGtleSA9PiB0aGlzLm9wdGlvbltrZXldID0gb3B0c1trZXldKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgY2FsbCB3aGVuIG1vdXNlIGdvZXMgZG93biBiZWZvcmUgYSBkcmFnc3RhcnQgaGFwcGVucyAqL1xyXG4gICAgX21vdXNlRG93bihlKSB7XHJcbiAgICAgICAgLy8gZG9uJ3QgbGV0IG1vcmUgdGhhbiBvbmUgd2lkZ2V0IGhhbmRsZSBtb3VzZVN0YXJ0XHJcbiAgICAgICAgaWYgKGRkX21hbmFnZXJfMS5ERE1hbmFnZXIubW91c2VIYW5kbGVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKGUuYnV0dG9uICE9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gb25seSBsZWZ0IGNsaWNrXHJcbiAgICAgICAgLy8gbWFrZSBzdXJlIHdlIGFyZSBub3QgY2xpY2tpbmcgb24ga25vd24gb2JqZWN0IHRoYXQgaGFuZGxlcyBtb3VzZURvd24gKFRPRE86IG1ha2UgdGhpcyBleHRlbnNpYmxlID8pICMyMDU0XHJcbiAgICAgICAgY29uc3Qgc2tpcE1vdXNlRG93biA9IFsnaW5wdXQnLCAndGV4dGFyZWEnLCAnYnV0dG9uJywgJ3NlbGVjdCcsICdvcHRpb24nXTtcclxuICAgICAgICBjb25zdCBuYW1lID0gZS50YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAoc2tpcE1vdXNlRG93bi5maW5kKHNraXAgPT4gc2tpcCA9PT0gbmFtZSkpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vIGFsc28gY2hlY2sgZm9yIGNvbnRlbnQgZWRpdGFibGVcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xvc2VzdCgnW2NvbnRlbnRlZGl0YWJsZT1cInRydWVcIl0nKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy8gUkVNT1ZFOiB3aHkgd291bGQgd2UgZ2V0IHRoZSBldmVudCBpZiBpdCB3YXNuJ3QgZm9yIHVzIG9yIGNoaWxkID9cclxuICAgICAgICAvLyBtYWtlIHN1cmUgd2UgYXJlIGNsaWNraW5nIG9uIGEgZHJhZyBoYW5kbGUgb3IgY2hpbGQgb2YgaXQuLi5cclxuICAgICAgICAvLyBOb3RlOiB3ZSBkb24ndCBuZWVkIHRvIGNoZWNrIHRoYXQncyBoYW5kbGUgaXMgYW4gaW1tZWRpYXRlIGNoaWxkLCBhcyBtb3VzZUhhbmRsZWQgd2lsbCBwcmV2ZW50IHBhcmVudHMgZnJvbSBhbHNvIGhhbmRsaW5nIGl0IChsb3dlc3Qgd2lucylcclxuICAgICAgICAvLyBsZXQgY2xhc3NOYW1lID0gdGhpcy5vcHRpb24uaGFuZGxlLnN1YnN0cmluZygxKTtcclxuICAgICAgICAvLyBsZXQgZWwgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAvLyB3aGlsZSAoZWwgJiYgIWVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7IGVsID0gZWwucGFyZW50RWxlbWVudDsgfVxyXG4gICAgICAgIC8vIGlmICghZWwpIHJldHVybjtcclxuICAgICAgICB0aGlzLm1vdXNlRG93bkV2ZW50ID0gZTtcclxuICAgICAgICBkZWxldGUgdGhpcy5kcmFnZ2luZztcclxuICAgICAgICBkZWxldGUgZGRfbWFuYWdlcl8xLkRETWFuYWdlci5kcmFnRWxlbWVudDtcclxuICAgICAgICBkZWxldGUgZGRfbWFuYWdlcl8xLkRETWFuYWdlci5kcm9wRWxlbWVudDtcclxuICAgICAgICAvLyBkb2N1bWVudCBoYW5kbGVyIHNvIHdlIGNhbiBjb250aW51ZSByZWNlaXZpbmcgbW92ZXMgYXMgdGhlIGl0ZW0gaXMgJ2ZpeGVkJyBwb3NpdGlvbiwgYW5kIGNhcHR1cmU9dHJ1ZSBzbyBXRSBnZXQgYSBmaXJzdCBjcmFja1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX21vdXNlTW92ZSwgdHJ1ZSk7IC8vIHRydWU9Y2FwdHVyZSwgbm90IGJ1YmJsZVxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9tb3VzZVVwLCB0cnVlKTtcclxuICAgICAgICBpZiAoZGRfdG91Y2hfMS5pc1RvdWNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGRkX3RvdWNoXzEudG91Y2htb3ZlKTtcclxuICAgICAgICAgICAgdGhpcy5kcmFnRWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBkZF90b3VjaF8xLnRvdWNoZW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIC8vIHByZXZlbnREZWZhdWx0KCkgcHJldmVudHMgYmx1ciBldmVudCB3aGljaCBvY2N1cnMganVzdCBhZnRlciBtb3VzZWRvd24gZXZlbnQuXHJcbiAgICAgICAgLy8gaWYgYW4gZWRpdGFibGUgY29udGVudCBoYXMgZm9jdXMsIHRoZW4gYmx1ciBtdXN0IGJlIGNhbGxcclxuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudClcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XHJcbiAgICAgICAgZGRfbWFuYWdlcl8xLkRETWFuYWdlci5tb3VzZUhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCBtZXRob2QgdG8gY2FsbCBhY3R1YWwgZHJhZyBldmVudCAqL1xyXG4gICAgX2NhbGxEcmFnKGUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjb25zdCBldiA9IHV0aWxzXzEuVXRpbHMuaW5pdEV2ZW50KGUsIHsgdGFyZ2V0OiB0aGlzLmVsLCB0eXBlOiAnZHJhZycgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uLmRyYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb24uZHJhZyhldiwgdGhpcy51aSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2RyYWcnLCBldik7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIGNhbGxlZCB3aGVuIHRoZSBtYWluIHBhZ2UgKGFmdGVyIHN1Y2Nlc3NmdWwgbW91c2Vkb3duKSByZWNlaXZlcyBhIG1vdmUgZXZlbnQgdG8gZHJhZyB0aGUgaXRlbSBhcm91bmQgdGhlIHNjcmVlbiAqL1xyXG4gICAgX21vdXNlTW92ZShlKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAke2NvdW50Kyt9IG1vdmUgJHtlLnh9LCR7ZS55fWApXHJcbiAgICAgICAgbGV0IHMgPSB0aGlzLm1vdXNlRG93bkV2ZW50O1xyXG4gICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RyYWdGb2xsb3coZSk7XHJcbiAgICAgICAgICAgIC8vIGRlbGF5IGFjdHVhbCBncmlkIGhhbmRsaW5nIGRyYWcgdW50aWwgd2UgcGF1c2UgZm9yIGEgd2hpbGUgaWYgc2V0XHJcbiAgICAgICAgICAgIGlmIChkZF9tYW5hZ2VyXzEuRERNYW5hZ2VyLnBhdXNlRHJhZykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF1c2UgPSBOdW1iZXIuaXNJbnRlZ2VyKGRkX21hbmFnZXJfMS5ERE1hbmFnZXIucGF1c2VEcmFnKSA/IGRkX21hbmFnZXJfMS5ERE1hbmFnZXIucGF1c2VEcmFnIDogMTAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ1RpbWVvdXQpXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmRyYWdUaW1lb3V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1RpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLl9jYWxsRHJhZyhlKSwgcGF1c2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbERyYWcoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoTWF0aC5hYnMoZS54IC0gcy54KSArIE1hdGguYWJzKGUueSAtIHMueSkgPiAzKSB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBkb24ndCBzdGFydCB1bmxlc3Mgd2UndmUgbW92ZWQgYXQgbGVhc3QgMyBwaXhlbHNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBkZF9tYW5hZ2VyXzEuRERNYW5hZ2VyLmRyYWdFbGVtZW50ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gaWYgd2UncmUgZHJhZ2dpbmcgYW4gYWN0dWFsIGdyaWQgaXRlbSwgc2V0IHRoZSBjdXJyZW50IGRyb3AgYXMgdGhlIGdyaWQgKHRvIGRldGVjdCBlbnRlci9sZWF2ZSlcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSAoX2EgPSB0aGlzLmVsLmdyaWRzdGFja05vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ncmlkO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCkge1xyXG4gICAgICAgICAgICAgICAgZGRfbWFuYWdlcl8xLkRETWFuYWdlci5kcm9wRWxlbWVudCA9IGdyaWQuZWwuZGRFbGVtZW50LmRkRHJvcHBhYmxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGRkX21hbmFnZXJfMS5ERE1hbmFnZXIuZHJvcEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5oZWxwZXIgPSB0aGlzLl9jcmVhdGVIZWxwZXIoZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldHVwSGVscGVyQ29udGFpbm1lbnRTdHlsZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdPZmZzZXQgPSB0aGlzLl9nZXREcmFnT2Zmc2V0KGUsIHRoaXMuZWwsIHRoaXMuaGVscGVyQ29udGFpbm1lbnQpO1xyXG4gICAgICAgICAgICBjb25zdCBldiA9IHV0aWxzXzEuVXRpbHMuaW5pdEV2ZW50KGUsIHsgdGFyZ2V0OiB0aGlzLmVsLCB0eXBlOiAnZHJhZ3N0YXJ0JyB9KTtcclxuICAgICAgICAgICAgdGhpcy5fc2V0dXBIZWxwZXJTdHlsZShlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uLnN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbi5zdGFydChldiwgdGhpcy51aSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnZHJhZ3N0YXJ0JywgZXYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIG5lZWRlZCBvdGhlcndpc2Ugd2UgZ2V0IHRleHQgc3dlZXAgdGV4dCBzZWxlY3Rpb24gYXMgd2UgZHJhZyBhcm91bmRcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgY2FsbCB3aGVuIHRoZSBtb3VzZSBnZXRzIHJlbGVhc2VkIHRvIGRyb3AgdGhlIGl0ZW0gYXQgY3VycmVudCBsb2NhdGlvbiAqL1xyXG4gICAgX21vdXNlVXAoZSkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZU1vdmUsIHRydWUpO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9tb3VzZVVwLCB0cnVlKTtcclxuICAgICAgICBpZiAoZGRfdG91Y2hfMS5pc1RvdWNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGRkX3RvdWNoXzEudG91Y2htb3ZlLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5kcmFnRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBkZF90b3VjaF8xLnRvdWNoZW5kLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZHJhZ2dpbmc7XHJcbiAgICAgICAgICAgIC8vIHJlc2V0IHRoZSBkcm9wIHRhcmdldCBpZiBkcmFnZ2luZyBvdmVyIG91cnNlbGYgKGFscmVhZHkgcGFyZW50ZWQsIGp1c3QgbW92aW5nIGR1cmluZyBzdG9wIGNhbGxiYWNrIGJlbG93KVxyXG4gICAgICAgICAgICBpZiAoKChfYSA9IGRkX21hbmFnZXJfMS5ERE1hbmFnZXIuZHJvcEVsZW1lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5lbCkgPT09IHRoaXMuZWwucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGRkX21hbmFnZXJfMS5ERE1hbmFnZXIuZHJvcEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5oZWxwZXJDb250YWlubWVudC5zdHlsZS5wb3NpdGlvbiA9IHRoaXMucGFyZW50T3JpZ2luU3R5bGVQb3NpdGlvbiB8fCBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oZWxwZXIgPT09IHRoaXMuZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUhlbHBlclN0eWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBlci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBldiA9IHV0aWxzXzEuVXRpbHMuaW5pdEV2ZW50KGUsIHsgdGFyZ2V0OiB0aGlzLmVsLCB0eXBlOiAnZHJhZ3N0b3AnIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb24uc3RvcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb24uc3RvcChldik7IC8vIE5PVEU6IGRlc3Ryb3koKSB3aWxsIGJlIGNhbGxlZCB3aGVuIHJlbW92aW5nIGl0ZW0sIHNvIGV4cGVjdCBOVUxMIHB0ciBhZnRlciFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnZHJhZ3N0b3AnLCBldik7XHJcbiAgICAgICAgICAgIC8vIGNhbGwgdGhlIGRyb3BwYWJsZSBtZXRob2QgdG8gcmVjZWl2ZSB0aGUgaXRlbVxyXG4gICAgICAgICAgICBpZiAoZGRfbWFuYWdlcl8xLkRETWFuYWdlci5kcm9wRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgZGRfbWFuYWdlcl8xLkRETWFuYWdlci5kcm9wRWxlbWVudC5kcm9wKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmhlbHBlcjtcclxuICAgICAgICBkZWxldGUgdGhpcy5tb3VzZURvd25FdmVudDtcclxuICAgICAgICBkZWxldGUgZGRfbWFuYWdlcl8xLkRETWFuYWdlci5kcmFnRWxlbWVudDtcclxuICAgICAgICBkZWxldGUgZGRfbWFuYWdlcl8xLkRETWFuYWdlci5kcm9wRWxlbWVudDtcclxuICAgICAgICBkZWxldGUgZGRfbWFuYWdlcl8xLkRETWFuYWdlci5tb3VzZUhhbmRsZWQ7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCBjcmVhdGUgYSBjbG9uZSBjb3B5IChvciB1c2VyIGRlZmluZWQgbWV0aG9kKSBvZiB0aGUgb3JpZ2luYWwgZHJhZyBpdGVtIGlmIHNldCAqL1xyXG4gICAgX2NyZWF0ZUhlbHBlcihldmVudCkge1xyXG4gICAgICAgIGxldCBoZWxwZXIgPSB0aGlzLmVsO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb24uaGVscGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGhlbHBlciA9IHRoaXMub3B0aW9uLmhlbHBlcihldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMub3B0aW9uLmhlbHBlciA9PT0gJ2Nsb25lJykge1xyXG4gICAgICAgICAgICBoZWxwZXIgPSB1dGlsc18xLlV0aWxzLmNsb25lTm9kZSh0aGlzLmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGhlbHBlcikpIHtcclxuICAgICAgICAgICAgdXRpbHNfMS5VdGlscy5hcHBlbmRUbyhoZWxwZXIsIHRoaXMub3B0aW9uLmFwcGVuZFRvID09PSAncGFyZW50JyA/IHRoaXMuZWwucGFyZW50Tm9kZSA6IHRoaXMub3B0aW9uLmFwcGVuZFRvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGhlbHBlciA9PT0gdGhpcy5lbCkge1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdFbGVtZW50T3JpZ2luU3R5bGUgPSBERERyYWdnYWJsZS5vcmlnaW5TdHlsZVByb3AubWFwKHByb3AgPT4gdGhpcy5lbC5zdHlsZVtwcm9wXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoZWxwZXI7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIHNldCB0aGUgZml4IHBvc2l0aW9uIG9mIHRoZSBkcmFnZ2VkIGl0ZW0gKi9cclxuICAgIF9zZXR1cEhlbHBlclN0eWxlKGUpIHtcclxuICAgICAgICB0aGlzLmhlbHBlci5jbGFzc0xpc3QuYWRkKCd1aS1kcmFnZ2FibGUtZHJhZ2dpbmcnKTtcclxuICAgICAgICAvLyBUT0RPOiBzZXQgYWxsIGF0IG9uY2Ugd2l0aCBzdHlsZS5jc3NUZXh0ICs9IC4uLiA/IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM5Njg1OTNcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMuaGVscGVyLnN0eWxlO1xyXG4gICAgICAgIHN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7IC8vIG5lZWRlZCBmb3Igb3ZlciBpdGVtcyB0byBnZXQgZW50ZXIvbGVhdmVcclxuICAgICAgICAvLyBzdHlsZS5jdXJzb3IgPSAnbW92ZSc7IC8vICBUT0RPOiBjYW4ndCBzZXQgd2l0aCBwb2ludGVyRXZlbnRzPW5vbmUgISAoZG9uZSBpbiBDU1MgYXMgd2VsbClcclxuICAgICAgICBzdHlsZVsnbWluLXdpZHRoJ10gPSAwOyAvLyBzaW5jZSB3ZSBubyBsb25nZXIgcmVsYXRpdmUgdG8gb3VyIHBhcmVudCBhbmQgd2UgZG9uJ3QgcmVzaXplIGFueXdheSAobm9ybWFsbHkgMTAwLyNjb2x1bW4gJSlcclxuICAgICAgICBzdHlsZS53aWR0aCA9IHRoaXMuZHJhZ09mZnNldC53aWR0aCArICdweCc7XHJcbiAgICAgICAgc3R5bGUuaGVpZ2h0ID0gdGhpcy5kcmFnT2Zmc2V0LmhlaWdodCArICdweCc7XHJcbiAgICAgICAgc3R5bGUud2lsbENoYW5nZSA9ICdsZWZ0LCB0b3AnO1xyXG4gICAgICAgIHN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJzsgLy8gbGV0IHVzIGRyYWcgYmV0d2VlbiBncmlkcyBieSBub3QgY2xpcHBpbmcgYXMgcGFyZW50IC5ncmlkLXN0YWNrIGlzIHBvc2l0aW9uOiAncmVsYXRpdmUnXHJcbiAgICAgICAgdGhpcy5fZHJhZ0ZvbGxvdyhlKTsgLy8gbm93IHBvc2l0aW9uIGl0XHJcbiAgICAgICAgc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJzsgLy8gc2hvdyB1cCBpbnN0YW50bHlcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGVscGVyKSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZS50cmFuc2l0aW9uID0gbnVsbDsgLy8gcmVjb3ZlciBhbmltYXRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDApO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCByZXN0b3JlIGJhY2sgdGhlIG9yaWdpbmFsIHN0eWxlIGJlZm9yZSBkcmFnZ2luZyAqL1xyXG4gICAgX3JlbW92ZUhlbHBlclN0eWxlKCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICB0aGlzLmhlbHBlci5jbGFzc0xpc3QucmVtb3ZlKCd1aS1kcmFnZ2FibGUtZHJhZ2dpbmcnKTtcclxuICAgICAgICBsZXQgbm9kZSA9IChfYSA9IHRoaXMuaGVscGVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ3JpZHN0YWNrTm9kZTtcclxuICAgICAgICAvLyBkb24ndCBib3RoZXIgcmVzdG9yaW5nIHN0eWxlcyBpZiB3ZSdyZSBnb25uYSByZW1vdmUgYW55d2F5Li4uXHJcbiAgICAgICAgaWYgKCEobm9kZSA9PT0gbnVsbCB8fCBub2RlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBub2RlLl9pc0Fib3V0VG9SZW1vdmUpICYmIHRoaXMuZHJhZ0VsZW1lbnRPcmlnaW5TdHlsZSkge1xyXG4gICAgICAgICAgICBsZXQgaGVscGVyID0gdGhpcy5oZWxwZXI7XHJcbiAgICAgICAgICAgIC8vIGRvbid0IGFuaW1hdGUsIG90aGVyd2lzZSB3ZSBhbmltYXRlIG9mZnNldGVkIHdoZW4gc3dpdGNoaW5nIGJhY2sgdG8gJ2Fic29sdXRlJyBmcm9tICdmaXhlZCcuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IHRoaXMgYWxzbyByZW1vdmVzIHJlc2l6aW5nIGFuaW1hdGlvbiB3aGljaCBkb2Vzbid0IGhhdmUgdGhpcyBpc3N1ZSwgYnV0IG90aGVycy5cclxuICAgICAgICAgICAgLy8gSWRlYWxseSBib3RoIHdvdWxkIGFuaW1hdGUgKCdtb3ZlJyB3b3VsZCBpbW1lZGlhdGVseSByZXN0b3JlICdhYnNvbHV0ZScgYW5kIGFkanVzdCBjb29yZGluYXRlIHRvIG1hdGNoLFxyXG4gICAgICAgICAgICAvLyB0aGVuIHRyaWdnZXIgYSBkZWxheSAocmVwYWludCkgdG8gcmVzdG9yZSB0byBmaW5hbCBkZXN0IHdpdGggYW5pbWF0ZSkgYnV0IHRoZW4gd2UgbmVlZCB0byBtYWtlIHN1cmUgJ3Jlc2l6ZXN0b3AnXHJcbiAgICAgICAgICAgIC8vIGlzIGNhbGxlZCBBRlRFUiAndHJhbnNpdGlvbmVuZCcgZXZlbnQgaXMgcmVjZWl2ZWQgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vZ3JpZHN0YWNrL2dyaWRzdGFjay5qcy9pc3N1ZXMvMjAzMylcclxuICAgICAgICAgICAgbGV0IHRyYW5zaXRpb24gPSB0aGlzLmRyYWdFbGVtZW50T3JpZ2luU3R5bGVbJ3RyYW5zaXRpb24nXSB8fCBudWxsO1xyXG4gICAgICAgICAgICBoZWxwZXIuc3R5bGUudHJhbnNpdGlvbiA9IHRoaXMuZHJhZ0VsZW1lbnRPcmlnaW5TdHlsZVsndHJhbnNpdGlvbiddID0gJ25vbmUnOyAvLyBjYW4ndCBiZSBOVUxMICMxOTczXHJcbiAgICAgICAgICAgIERERHJhZ2dhYmxlLm9yaWdpblN0eWxlUHJvcC5mb3JFYWNoKHByb3AgPT4gaGVscGVyLnN0eWxlW3Byb3BdID0gdGhpcy5kcmFnRWxlbWVudE9yaWdpblN0eWxlW3Byb3BdIHx8IG51bGwpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGhlbHBlci5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvbiwgNTApOyAvLyByZWNvdmVyIGFuaW1hdGlvbiBmcm9tIHNhdmVkIHZhcnMgYWZ0ZXIgYSBwYXVzZSAoMCBpc24ndCBlbm91Z2ggIzE5NzMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRyYWdFbGVtZW50T3JpZ2luU3R5bGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIHVwZGF0ZXMgdGhlIHRvcC9sZWZ0IHBvc2l0aW9uIHRvIGZvbGxvdyB0aGUgbW91c2UgKi9cclxuICAgIF9kcmFnRm9sbG93KGUpIHtcclxuICAgICAgICBsZXQgY29udGFpbm1lbnRSZWN0ID0geyBsZWZ0OiAwLCB0b3A6IDAgfTtcclxuICAgICAgICAvLyBpZiAodGhpcy5oZWxwZXIuc3R5bGUucG9zaXRpb24gPT09ICdhYnNvbHV0ZScpIHsgLy8gd2UgdXNlICdmaXhlZCdcclxuICAgICAgICAvLyAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSB0aGlzLmhlbHBlckNvbnRhaW5tZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIC8vICAgY29udGFpbm1lbnRSZWN0ID0geyBsZWZ0LCB0b3AgfTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLmhlbHBlci5zdHlsZTtcclxuICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLmRyYWdPZmZzZXQ7XHJcbiAgICAgICAgc3R5bGUubGVmdCA9IGUuY2xpZW50WCArIG9mZnNldC5vZmZzZXRMZWZ0IC0gY29udGFpbm1lbnRSZWN0LmxlZnQgKyAncHgnO1xyXG4gICAgICAgIHN0eWxlLnRvcCA9IGUuY2xpZW50WSArIG9mZnNldC5vZmZzZXRUb3AgLSBjb250YWlubWVudFJlY3QudG9wICsgJ3B4JztcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIF9zZXR1cEhlbHBlckNvbnRhaW5tZW50U3R5bGUoKSB7XHJcbiAgICAgICAgdGhpcy5oZWxwZXJDb250YWlubWVudCA9IHRoaXMuaGVscGVyLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuaGVscGVyLnN0eWxlLnBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50T3JpZ2luU3R5bGVQb3NpdGlvbiA9IHRoaXMuaGVscGVyQ29udGFpbm1lbnQuc3R5bGUucG9zaXRpb247XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmhlbHBlckNvbnRhaW5tZW50KS5wb3NpdGlvbi5tYXRjaCgvc3RhdGljLykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVscGVyQ29udGFpbm1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgX2dldERyYWdPZmZzZXQoZXZlbnQsIGVsLCBwYXJlbnQpIHtcclxuICAgICAgICAvLyBpbiBjYXNlIGFuY2VzdG9yIGhhcyB0cmFuc2Zvcm0vcGVyc3BlY3RpdmUgY3NzIHByb3BlcnRpZXMgdGhhdCBjaGFuZ2UgdGhlIHZpZXdwb2ludFxyXG4gICAgICAgIGxldCB4Zm9ybU9mZnNldFggPSAwO1xyXG4gICAgICAgIGxldCB4Zm9ybU9mZnNldFkgPSAwO1xyXG4gICAgICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgdGVzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHV0aWxzXzEuVXRpbHMuYWRkRWxTdHlsZXModGVzdEVsLCB7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAnMCcsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgIHRvcDogMCArICdweCcsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAwICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMXB4JyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJzFweCcsXHJcbiAgICAgICAgICAgICAgICB6SW5kZXg6ICctOTk5OTk5JyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0ZXN0RWwpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZXN0RWxQb3NpdGlvbiA9IHRlc3RFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHRlc3RFbCk7XHJcbiAgICAgICAgICAgIHhmb3JtT2Zmc2V0WCA9IHRlc3RFbFBvc2l0aW9uLmxlZnQ7XHJcbiAgICAgICAgICAgIHhmb3JtT2Zmc2V0WSA9IHRlc3RFbFBvc2l0aW9uLnRvcDtcclxuICAgICAgICAgICAgLy8gVE9ETzogc2NhbGUgP1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0YXJnZXRPZmZzZXQgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsZWZ0OiB0YXJnZXRPZmZzZXQubGVmdCxcclxuICAgICAgICAgICAgdG9wOiB0YXJnZXRPZmZzZXQudG9wLFxyXG4gICAgICAgICAgICBvZmZzZXRMZWZ0OiAtZXZlbnQuY2xpZW50WCArIHRhcmdldE9mZnNldC5sZWZ0IC0geGZvcm1PZmZzZXRYLFxyXG4gICAgICAgICAgICBvZmZzZXRUb3A6IC1ldmVudC5jbGllbnRZICsgdGFyZ2V0T2Zmc2V0LnRvcCAtIHhmb3JtT2Zmc2V0WSxcclxuICAgICAgICAgICAgd2lkdGg6IHRhcmdldE9mZnNldC53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiB0YXJnZXRPZmZzZXQuaGVpZ2h0XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgVE9ETzogc2V0IHRvIHB1YmxpYyBhcyBjYWxsZWQgYnkgREREcm9wcGFibGUhICovXHJcbiAgICB1aSgpIHtcclxuICAgICAgICBjb25zdCBjb250YWlubWVudEVsID0gdGhpcy5lbC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5tZW50UmVjdCA9IGNvbnRhaW5tZW50RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5oZWxwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICAgICAgICAgIHRvcDogb2Zmc2V0LnRvcCAtIGNvbnRhaW5tZW50UmVjdC50b3AsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBvZmZzZXQubGVmdCAtIGNvbnRhaW5tZW50UmVjdC5sZWZ0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyogbm90IHVzZWQgYnkgR3JpZFN0YWNrIGZvciBub3cuLi5cclxuICAgICAgICAgICAgaGVscGVyOiBbdGhpcy5oZWxwZXJdLCAvL1RoZSBvYmplY3QgYXJyIHJlcHJlc2VudGluZyB0aGUgaGVscGVyIHRoYXQncyBiZWluZyBkcmFnZ2VkLlxyXG4gICAgICAgICAgICBvZmZzZXQ6IHsgdG9wOiBvZmZzZXQudG9wLCBsZWZ0OiBvZmZzZXQubGVmdCB9IC8vIEN1cnJlbnQgb2Zmc2V0IHBvc2l0aW9uIG9mIHRoZSBoZWxwZXIgYXMgeyB0b3AsIGxlZnQgfSBvYmplY3QuXHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkRERHJhZ2dhYmxlID0gREREcmFnZ2FibGU7XHJcbi8qKiBAaW50ZXJuYWwgcHJvcGVydGllcyB3ZSBjaGFuZ2UgZHVyaW5nIGRyYWdnaW5nLCBhbmQgcmVzdG9yZSBiYWNrICovXHJcbkRERHJhZ2dhYmxlLm9yaWdpblN0eWxlUHJvcCA9IFsndHJhbnNpdGlvbicsICdwb2ludGVyRXZlbnRzJywgJ3Bvc2l0aW9uJywgJ2xlZnQnLCAndG9wJywgJ21pbldpZHRoJywgJ3dpbGxDaGFuZ2UnXTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGQtZHJhZ2dhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG4vKipcclxuICogZGQtZHJvcHBhYmxlLnRzIDcuMy4wXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMS0yMDIyIEFsYWluIER1bWVzbnkgLSBzZWUgR3JpZFN0YWNrIHJvb3QgbGljZW5zZVxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkRERHJvcHBhYmxlID0gdm9pZCAwO1xyXG5jb25zdCBkZF9tYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9kZC1tYW5hZ2VyXCIpO1xyXG5jb25zdCBkZF9iYXNlX2ltcGxfMSA9IHJlcXVpcmUoXCIuL2RkLWJhc2UtaW1wbFwiKTtcclxuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xyXG5jb25zdCBkZF90b3VjaF8xID0gcmVxdWlyZShcIi4vZGQtdG91Y2hcIik7XHJcbi8vIGxldCBjb3VudCA9IDA7IC8vIFRFU1RcclxuY2xhc3MgREREcm9wcGFibGUgZXh0ZW5kcyBkZF9iYXNlX2ltcGxfMS5EREJhc2VJbXBsZW1lbnQge1xyXG4gICAgY29uc3RydWN0b3IoZWwsIG9wdHMgPSB7fSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xyXG4gICAgICAgIHRoaXMub3B0aW9uID0gb3B0cztcclxuICAgICAgICAvLyBjcmVhdGUgdmFyIGV2ZW50IGJpbmRpbmcgc28gd2UgY2FuIGVhc2lseSByZW1vdmUgYW5kIHN0aWxsIGxvb2sgbGlrZSBUUyBtZXRob2RzICh1bmxpa2UgYW5vbnltb3VzIGZ1bmN0aW9ucylcclxuICAgICAgICB0aGlzLl9tb3VzZUVudGVyID0gdGhpcy5fbW91c2VFbnRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX21vdXNlTGVhdmUgPSB0aGlzLl9tb3VzZUxlYXZlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5lbmFibGUoKTtcclxuICAgICAgICB0aGlzLl9zZXR1cEFjY2VwdCgpO1xyXG4gICAgfVxyXG4gICAgb24oZXZlbnQsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgc3VwZXIub24oZXZlbnQsIGNhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIG9mZihldmVudCkge1xyXG4gICAgICAgIHN1cGVyLm9mZihldmVudCk7XHJcbiAgICB9XHJcbiAgICBlbmFibGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgc3VwZXIuZW5hYmxlKCk7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCd1aS1kcm9wcGFibGUnKTtcclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLWRyb3BwYWJsZS1kaXNhYmxlZCcpO1xyXG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX21vdXNlRW50ZXIpO1xyXG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX21vdXNlTGVhdmUpO1xyXG4gICAgICAgIGlmIChkZF90b3VjaF8xLmlzVG91Y2gpIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZW50ZXInLCBkZF90b3VjaF8xLnBvaW50ZXJlbnRlcik7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmxlYXZlJywgZGRfdG91Y2hfMS5wb2ludGVybGVhdmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRpc2FibGUoZm9yRGVzdHJveSA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgPT09IHRydWUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBzdXBlci5kaXNhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1kcm9wcGFibGUnKTtcclxuICAgICAgICBpZiAoIWZvckRlc3Ryb3kpXHJcbiAgICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgndWktZHJvcHBhYmxlLWRpc2FibGVkJyk7XHJcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5fbW91c2VFbnRlcik7XHJcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5fbW91c2VMZWF2ZSk7XHJcbiAgICAgICAgaWYgKGRkX3RvdWNoXzEuaXNUb3VjaCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJlbnRlcicsIGRkX3RvdWNoXzEucG9pbnRlcmVudGVyKTtcclxuICAgICAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybGVhdmUnLCBkZF90b3VjaF8xLnBvaW50ZXJsZWF2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGUodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1kcm9wcGFibGUnKTtcclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLWRyb3BwYWJsZS1kaXNhYmxlZCcpO1xyXG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZU9wdGlvbihvcHRzKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0cykuZm9yRWFjaChrZXkgPT4gdGhpcy5vcHRpb25ba2V5XSA9IG9wdHNba2V5XSk7XHJcbiAgICAgICAgdGhpcy5fc2V0dXBBY2NlcHQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgY2FsbGVkIHdoZW4gdGhlIGN1cnNvciBlbnRlcnMgb3VyIGFyZWEgLSBwcmVwYXJlIGZvciBhIHBvc3NpYmxlIGRyb3AgYW5kIHRyYWNrIGxlYXZpbmcgKi9cclxuICAgIF9tb3VzZUVudGVyKGUpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtjb3VudCsrfSBFbnRlciAke3RoaXMuZWwuaWQgfHwgKHRoaXMuZWwgYXMgR3JpZEhUTUxFbGVtZW50KS5ncmlkc3RhY2sub3B0cy5pZH1gKTsgLy8gVEVTVFxyXG4gICAgICAgIGlmICghZGRfbWFuYWdlcl8xLkRETWFuYWdlci5kcmFnRWxlbWVudClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5fY2FuRHJvcChkZF9tYW5hZ2VyXzEuRERNYW5hZ2VyLmRyYWdFbGVtZW50LmVsKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB3aGVuIHdlIGVudGVyIHRoaXMsIHRoYXQgdGhlIGxhc3Qgb25lIGdldHMgYSBsZWF2ZSBGSVJTVCB0byBjb3JyZWN0bHkgY2xlYW51cCBhcyB3ZSBkb24ndCBhbHdheXMgZG9cclxuICAgICAgICBpZiAoZGRfbWFuYWdlcl8xLkRETWFuYWdlci5kcm9wRWxlbWVudCAmJiBkZF9tYW5hZ2VyXzEuRERNYW5hZ2VyLmRyb3BFbGVtZW50ICE9PSB0aGlzKSB7XHJcbiAgICAgICAgICAgIGRkX21hbmFnZXJfMS5ERE1hbmFnZXIuZHJvcEVsZW1lbnQuX21vdXNlTGVhdmUoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRkX21hbmFnZXJfMS5ERE1hbmFnZXIuZHJvcEVsZW1lbnQgPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGV2ID0gdXRpbHNfMS5VdGlscy5pbml0RXZlbnQoZSwgeyB0YXJnZXQ6IHRoaXMuZWwsIHR5cGU6ICdkcm9wb3ZlcicgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uLm92ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb24ub3ZlcihldiwgdGhpcy5fdWkoZGRfbWFuYWdlcl8xLkRETWFuYWdlci5kcmFnRWxlbWVudCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnZHJvcG92ZXInLCBldik7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCd1aS1kcm9wcGFibGUtb3ZlcicpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0cmFja2luZycpOyAvLyBURVNUXHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIGNhbGxlZCB3aGVuIHRoZSBpdGVtIGlzIGxlYXZpbmcgb3VyIGFyZWEsIHN0b3AgdHJhY2tpbmcgaWYgd2UgaGFkIG1vdmluZyBpdGVtICovXHJcbiAgICBfbW91c2VMZWF2ZShlKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAke2NvdW50Kyt9IExlYXZlICR7dGhpcy5lbC5pZCB8fCAodGhpcy5lbCBhcyBHcmlkSFRNTEVsZW1lbnQpLmdyaWRzdGFjay5vcHRzLmlkfWApOyAvLyBURVNUXHJcbiAgICAgICAgaWYgKCFkZF9tYW5hZ2VyXzEuRERNYW5hZ2VyLmRyYWdFbGVtZW50IHx8IGRkX21hbmFnZXJfMS5ERE1hbmFnZXIuZHJvcEVsZW1lbnQgIT09IHRoaXMpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBjb25zdCBldiA9IHV0aWxzXzEuVXRpbHMuaW5pdEV2ZW50KGUsIHsgdGFyZ2V0OiB0aGlzLmVsLCB0eXBlOiAnZHJvcG91dCcgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uLm91dCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbi5vdXQoZXYsIHRoaXMuX3VpKGRkX21hbmFnZXJfMS5ERE1hbmFnZXIuZHJhZ0VsZW1lbnQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2Ryb3BvdXQnLCBldik7XHJcbiAgICAgICAgaWYgKGRkX21hbmFnZXJfMS5ERE1hbmFnZXIuZHJvcEVsZW1lbnQgPT09IHRoaXMpIHtcclxuICAgICAgICAgICAgZGVsZXRlIGRkX21hbmFnZXJfMS5ERE1hbmFnZXIuZHJvcEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdub3QgdHJhY2tpbmcnKTsgLy8gVEVTVFxyXG4gICAgICAgICAgICAvLyBpZiB3ZSdyZSBzdGlsbCBvdmVyIGEgcGFyZW50IGRyb3BwYWJsZSwgc2VuZCBpdCBhbiBlbnRlciBhcyB3ZSBkb24ndCBnZXQgb25lIGZyb20gbGVhdmluZyBuZXN0ZWQgY2hpbGRyZW5cclxuICAgICAgICAgICAgbGV0IHBhcmVudERyb3A7XHJcbiAgICAgICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmVsLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHdoaWxlICghcGFyZW50RHJvcCAmJiBwYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudERyb3AgPSAoX2EgPSBwYXJlbnQuZGRFbGVtZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGREcm9wcGFibGU7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFyZW50RHJvcCkge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50RHJvcC5fbW91c2VFbnRlcihlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKiBpdGVtIGlzIGJlaW5nIGRyb3BwZWQgb24gdXMgLSBjYWxsZWQgYnkgdGhlIGRyYWcgbW91c2V1cCBoYW5kbGVyIC0gdGhpcyBjYWxscyB0aGUgY2xpZW50IGRyb3AgZXZlbnQgKi9cclxuICAgIGRyb3AoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCBldiA9IHV0aWxzXzEuVXRpbHMuaW5pdEV2ZW50KGUsIHsgdGFyZ2V0OiB0aGlzLmVsLCB0eXBlOiAnZHJvcCcgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uLmRyb3ApIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb24uZHJvcChldiwgdGhpcy5fdWkoZGRfbWFuYWdlcl8xLkRETWFuYWdlci5kcmFnRWxlbWVudCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnZHJvcCcsIGV2KTtcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgdHJ1ZSBpZiBlbGVtZW50IG1hdGNoZXMgdGhlIHN0cmluZy9tZXRob2QgYWNjZXB0IG9wdGlvbiAqL1xyXG4gICAgX2NhbkRyb3AoZWwpIHtcclxuICAgICAgICByZXR1cm4gZWwgJiYgKCF0aGlzLmFjY2VwdCB8fCB0aGlzLmFjY2VwdChlbCkpO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgX3NldHVwQWNjZXB0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5vcHRpb24uYWNjZXB0KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9uLmFjY2VwdCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2NlcHQgPSAoZWwpID0+IGVsLm1hdGNoZXModGhpcy5vcHRpb24uYWNjZXB0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjZXB0ID0gdGhpcy5vcHRpb24uYWNjZXB0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIF91aShkcmFnKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyBkcmFnZ2FibGU6IGRyYWcuZWwgfSwgZHJhZy51aSgpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkRERHJvcHBhYmxlID0gREREcm9wcGFibGU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRkLWRyb3BwYWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuLyoqXHJcbiAqIGRkLWVsZW1lbnRzLnRzIDcuMy4wXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMSBBbGFpbiBEdW1lc255IC0gc2VlIEdyaWRTdGFjayByb290IGxpY2Vuc2VcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5EREVsZW1lbnQgPSB2b2lkIDA7XHJcbmNvbnN0IGRkX3Jlc2l6YWJsZV8xID0gcmVxdWlyZShcIi4vZGQtcmVzaXphYmxlXCIpO1xyXG5jb25zdCBkZF9kcmFnZ2FibGVfMSA9IHJlcXVpcmUoXCIuL2RkLWRyYWdnYWJsZVwiKTtcclxuY29uc3QgZGRfZHJvcHBhYmxlXzEgPSByZXF1aXJlKFwiLi9kZC1kcm9wcGFibGVcIik7XHJcbmNsYXNzIERERWxlbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbCkge1xyXG4gICAgICAgIHRoaXMuZWwgPSBlbDtcclxuICAgIH1cclxuICAgIHN0YXRpYyBpbml0KGVsKSB7XHJcbiAgICAgICAgaWYgKCFlbC5kZEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWwuZGRFbGVtZW50ID0gbmV3IERERWxlbWVudChlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbC5kZEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGREcmFnZ2FibGUgJiYgWydkcmFnJywgJ2RyYWdzdGFydCcsICdkcmFnc3RvcCddLmluZGV4T2YoZXZlbnROYW1lKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGREcmFnZ2FibGUub24oZXZlbnROYW1lLCBjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZGREcm9wcGFibGUgJiYgWydkcm9wJywgJ2Ryb3BvdmVyJywgJ2Ryb3BvdXQnXS5pbmRleE9mKGV2ZW50TmFtZSkgPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmRkRHJvcHBhYmxlLm9uKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmRkUmVzaXphYmxlICYmIFsncmVzaXplc3RhcnQnLCAncmVzaXplJywgJ3Jlc2l6ZXN0b3AnXS5pbmRleE9mKGV2ZW50TmFtZSkgPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmRkUmVzaXphYmxlLm9uKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9mZihldmVudE5hbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5kZERyYWdnYWJsZSAmJiBbJ2RyYWcnLCAnZHJhZ3N0YXJ0JywgJ2RyYWdzdG9wJ10uaW5kZXhPZihldmVudE5hbWUpID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5kZERyYWdnYWJsZS5vZmYoZXZlbnROYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5kZERyb3BwYWJsZSAmJiBbJ2Ryb3AnLCAnZHJvcG92ZXInLCAnZHJvcG91dCddLmluZGV4T2YoZXZlbnROYW1lKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGREcm9wcGFibGUub2ZmKGV2ZW50TmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZGRSZXNpemFibGUgJiYgWydyZXNpemVzdGFydCcsICdyZXNpemUnLCAncmVzaXplc3RvcCddLmluZGV4T2YoZXZlbnROYW1lKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGRSZXNpemFibGUub2ZmKGV2ZW50TmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0dXBEcmFnZ2FibGUob3B0cykge1xyXG4gICAgICAgIGlmICghdGhpcy5kZERyYWdnYWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRkRHJhZ2dhYmxlID0gbmV3IGRkX2RyYWdnYWJsZV8xLkRERHJhZ2dhYmxlKHRoaXMuZWwsIG9wdHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kZERyYWdnYWJsZS51cGRhdGVPcHRpb24ob3B0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgY2xlYW5EcmFnZ2FibGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGREcmFnZ2FibGUpIHtcclxuICAgICAgICAgICAgdGhpcy5kZERyYWdnYWJsZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRkRHJhZ2dhYmxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldHVwUmVzaXphYmxlKG9wdHMpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGRSZXNpemFibGUpIHtcclxuICAgICAgICAgICAgdGhpcy5kZFJlc2l6YWJsZSA9IG5ldyBkZF9yZXNpemFibGVfMS5ERFJlc2l6YWJsZSh0aGlzLmVsLCBvcHRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGRSZXNpemFibGUudXBkYXRlT3B0aW9uKG9wdHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNsZWFuUmVzaXphYmxlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRkUmVzaXphYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGRSZXNpemFibGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5kZFJlc2l6YWJsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXR1cERyb3BwYWJsZShvcHRzKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRkRHJvcHBhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGREcm9wcGFibGUgPSBuZXcgZGRfZHJvcHBhYmxlXzEuREREcm9wcGFibGUodGhpcy5lbCwgb3B0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRkRHJvcHBhYmxlLnVwZGF0ZU9wdGlvbihvcHRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBjbGVhbkRyb3BwYWJsZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5kZERyb3BwYWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRkRHJvcHBhYmxlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGREcm9wcGFibGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuRERFbGVtZW50ID0gRERFbGVtZW50O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZC1lbGVtZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG4vKipcclxuICogZGQtZ3JpZHN0YWNrLnRzIDcuMy4wXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMSBBbGFpbiBEdW1lc255IC0gc2VlIEdyaWRTdGFjayByb290IGxpY2Vuc2VcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5EREdyaWRTdGFjayA9IHZvaWQgMDtcclxuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xyXG5jb25zdCBkZF9tYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9kZC1tYW5hZ2VyXCIpO1xyXG5jb25zdCBkZF9lbGVtZW50XzEgPSByZXF1aXJlKFwiLi9kZC1lbGVtZW50XCIpO1xyXG4vLyBsZXQgY291bnQgPSAwOyAvLyBURVNUXHJcbi8qKlxyXG4gKiBIVE1MIE5hdGl2ZSBNb3VzZSBhbmQgVG91Y2ggRXZlbnRzIERyYWcgYW5kIERyb3AgZnVuY3Rpb25hbGl0eS5cclxuICovXHJcbmNsYXNzIERER3JpZFN0YWNrIHtcclxuICAgIHJlc2l6YWJsZShlbCwgb3B0cywga2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2dldERERWxlbWVudHMoZWwpLmZvckVhY2goZEVsID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdHMgPT09ICdkaXNhYmxlJyB8fCBvcHRzID09PSAnZW5hYmxlJykge1xyXG4gICAgICAgICAgICAgICAgZEVsLmRkUmVzaXphYmxlICYmIGRFbC5kZFJlc2l6YWJsZVtvcHRzXSgpOyAvLyBjYW4ndCBjcmVhdGUgREQgYXMgaXQgcmVxdWlyZXMgb3B0aW9ucyBmb3Igc2V0dXBSZXNpemFibGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdHMgPT09ICdkZXN0cm95Jykge1xyXG4gICAgICAgICAgICAgICAgZEVsLmRkUmVzaXphYmxlICYmIGRFbC5jbGVhblJlc2l6YWJsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdHMgPT09ICdvcHRpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBkRWwuc2V0dXBSZXNpemFibGUoeyBba2V5XTogdmFsdWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBncmlkID0gZEVsLmVsLmdyaWRzdGFja05vZGUuZ3JpZDtcclxuICAgICAgICAgICAgICAgIGxldCBoYW5kbGVzID0gZEVsLmVsLmdldEF0dHJpYnV0ZSgnZ3MtcmVzaXplLWhhbmRsZXMnKSA/IGRFbC5lbC5nZXRBdHRyaWJ1dGUoJ2dzLXJlc2l6ZS1oYW5kbGVzJykgOiBncmlkLm9wdHMucmVzaXphYmxlLmhhbmRsZXM7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXV0b0hpZGUgPSAhZ3JpZC5vcHRzLmFsd2F5c1Nob3dSZXNpemVIYW5kbGU7XHJcbiAgICAgICAgICAgICAgICBkRWwuc2V0dXBSZXNpemFibGUoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGdyaWQub3B0cy5yZXNpemFibGUpLCB7IGhhbmRsZXMsIGF1dG9IaWRlIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IG9wdHMuc3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcDogb3B0cy5zdG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZTogb3B0cy5yZXNpemVcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZHJhZ2dhYmxlKGVsLCBvcHRzLCBrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fZ2V0RERFbGVtZW50cyhlbCkuZm9yRWFjaChkRWwgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0cyA9PT0gJ2Rpc2FibGUnIHx8IG9wdHMgPT09ICdlbmFibGUnKSB7XHJcbiAgICAgICAgICAgICAgICBkRWwuZGREcmFnZ2FibGUgJiYgZEVsLmRkRHJhZ2dhYmxlW29wdHNdKCk7IC8vIGNhbid0IGNyZWF0ZSBERCBhcyBpdCByZXF1aXJlcyBvcHRpb25zIGZvciBzZXR1cERyYWdnYWJsZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob3B0cyA9PT0gJ2Rlc3Ryb3knKSB7XHJcbiAgICAgICAgICAgICAgICBkRWwuZGREcmFnZ2FibGUgJiYgZEVsLmNsZWFuRHJhZ2dhYmxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob3B0cyA9PT0gJ29wdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGRFbC5zZXR1cERyYWdnYWJsZSh7IFtrZXldOiB2YWx1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdyaWQgPSBkRWwuZWwuZ3JpZHN0YWNrTm9kZS5ncmlkO1xyXG4gICAgICAgICAgICAgICAgZEVsLnNldHVwRHJhZ2dhYmxlKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZ3JpZC5vcHRzLmRyYWdnYWJsZSksIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb250YWlubWVudDogKGdyaWQucGFyZW50R3JpZEl0ZW0gJiYgIWdyaWQub3B0cy5kcmFnT3V0KSA/IGdyaWQuZWwucGFyZW50RWxlbWVudCA6IChncmlkLm9wdHMuZHJhZ2dhYmxlLmNvbnRhaW5tZW50IHx8IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBvcHRzLnN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3A6IG9wdHMuc3RvcCxcclxuICAgICAgICAgICAgICAgICAgICBkcmFnOiBvcHRzLmRyYWdcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZHJhZ0luKGVsLCBvcHRzKSB7XHJcbiAgICAgICAgdGhpcy5fZ2V0RERFbGVtZW50cyhlbCkuZm9yRWFjaChkRWwgPT4gZEVsLnNldHVwRHJhZ2dhYmxlKG9wdHMpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGRyb3BwYWJsZShlbCwgb3B0cywga2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cy5hY2NlcHQgPT09ICdmdW5jdGlvbicgJiYgIW9wdHMuX2FjY2VwdCkge1xyXG4gICAgICAgICAgICBvcHRzLl9hY2NlcHQgPSBvcHRzLmFjY2VwdDtcclxuICAgICAgICAgICAgb3B0cy5hY2NlcHQgPSAoZWwpID0+IG9wdHMuX2FjY2VwdChlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2dldERERWxlbWVudHMoZWwpLmZvckVhY2goZEVsID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdHMgPT09ICdkaXNhYmxlJyB8fCBvcHRzID09PSAnZW5hYmxlJykge1xyXG4gICAgICAgICAgICAgICAgZEVsLmRkRHJvcHBhYmxlICYmIGRFbC5kZERyb3BwYWJsZVtvcHRzXSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdHMgPT09ICdkZXN0cm95Jykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRFbC5kZERyb3BwYWJsZSkgeyAvLyBlcnJvciB0byBjYWxsIGRlc3Ryb3kgaWYgbm90IHRoZXJlXHJcbiAgICAgICAgICAgICAgICAgICAgZEVsLmNsZWFuRHJvcHBhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob3B0cyA9PT0gJ29wdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGRFbC5zZXR1cERyb3BwYWJsZSh7IFtrZXldOiB2YWx1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRFbC5zZXR1cERyb3BwYWJsZShvcHRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIHRydWUgaWYgZWxlbWVudCBpcyBkcm9wcGFibGUgKi9cclxuICAgIGlzRHJvcHBhYmxlKGVsKSB7XHJcbiAgICAgICAgcmV0dXJuICEhKGVsICYmIGVsLmRkRWxlbWVudCAmJiBlbC5kZEVsZW1lbnQuZGREcm9wcGFibGUgJiYgIWVsLmRkRWxlbWVudC5kZERyb3BwYWJsZS5kaXNhYmxlZCk7XHJcbiAgICB9XHJcbiAgICAvKiogdHJ1ZSBpZiBlbGVtZW50IGlzIGRyYWdnYWJsZSAqL1xyXG4gICAgaXNEcmFnZ2FibGUoZWwpIHtcclxuICAgICAgICByZXR1cm4gISEoZWwgJiYgZWwuZGRFbGVtZW50ICYmIGVsLmRkRWxlbWVudC5kZERyYWdnYWJsZSAmJiAhZWwuZGRFbGVtZW50LmRkRHJhZ2dhYmxlLmRpc2FibGVkKTtcclxuICAgIH1cclxuICAgIC8qKiB0cnVlIGlmIGVsZW1lbnQgaXMgZHJhZ2dhYmxlICovXHJcbiAgICBpc1Jlc2l6YWJsZShlbCkge1xyXG4gICAgICAgIHJldHVybiAhIShlbCAmJiBlbC5kZEVsZW1lbnQgJiYgZWwuZGRFbGVtZW50LmRkUmVzaXphYmxlICYmICFlbC5kZEVsZW1lbnQuZGRSZXNpemFibGUuZGlzYWJsZWQpO1xyXG4gICAgfVxyXG4gICAgb24oZWwsIG5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5fZ2V0RERFbGVtZW50cyhlbCkuZm9yRWFjaChkRWwgPT4gZEVsLm9uKG5hbWUsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhldmVudCwgZGRfbWFuYWdlcl8xLkRETWFuYWdlci5kcmFnRWxlbWVudCA/IGRkX21hbmFnZXJfMS5ERE1hbmFnZXIuZHJhZ0VsZW1lbnQuZWwgOiBldmVudC50YXJnZXQsIGRkX21hbmFnZXJfMS5ERE1hbmFnZXIuZHJhZ0VsZW1lbnQgPyBkZF9tYW5hZ2VyXzEuRERNYW5hZ2VyLmRyYWdFbGVtZW50LmhlbHBlciA6IG51bGwpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9mZihlbCwgbmFtZSkge1xyXG4gICAgICAgIHRoaXMuX2dldERERWxlbWVudHMoZWwpLmZvckVhY2goZEVsID0+IGRFbC5vZmYobmFtZSkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCByZXR1cm5zIGEgbGlzdCBvZiBERCBlbGVtZW50cywgY3JlYXRpbmcgdGhlbSBvbiB0aGUgZmx5IGJ5IGRlZmF1bHQgKi9cclxuICAgIF9nZXREREVsZW1lbnRzKGVscywgY3JlYXRlID0gdHJ1ZSkge1xyXG4gICAgICAgIGxldCBob3N0cyA9IHV0aWxzXzEuVXRpbHMuZ2V0RWxlbWVudHMoZWxzKTtcclxuICAgICAgICBpZiAoIWhvc3RzLmxlbmd0aClcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIGxldCBsaXN0ID0gaG9zdHMubWFwKGUgPT4gZS5kZEVsZW1lbnQgfHwgKGNyZWF0ZSA/IGRkX2VsZW1lbnRfMS5EREVsZW1lbnQuaW5pdChlKSA6IG51bGwpKTtcclxuICAgICAgICBpZiAoIWNyZWF0ZSkge1xyXG4gICAgICAgICAgICBsaXN0LmZpbHRlcihkID0+IGQpO1xyXG4gICAgICAgIH0gLy8gcmVtb3ZlIG51bGxzXHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5EREdyaWRTdGFjayA9IERER3JpZFN0YWNrO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZC1ncmlkc3RhY2suanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qKlxyXG4gKiBkZC1tYW5hZ2VyLnRzIDcuMy4wXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMSBBbGFpbiBEdW1lc255IC0gc2VlIEdyaWRTdGFjayByb290IGxpY2Vuc2VcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5ERE1hbmFnZXIgPSB2b2lkIDA7XHJcbi8qKlxyXG4gKiBnbG9iYWxzIHRoYXQgYXJlIHNoYXJlZCBhY3Jvc3MgRHJhZyAmIERyb3AgaW5zdGFuY2VzXHJcbiAqL1xyXG5jbGFzcyBERE1hbmFnZXIge1xyXG59XHJcbmV4cG9ydHMuRERNYW5hZ2VyID0gRERNYW5hZ2VyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZC1tYW5hZ2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG4vKipcclxuICogZGQtcmVzaXphYmxlLWhhbmRsZS50cyA3LjMuMFxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEtMjAyMiBBbGFpbiBEdW1lc255IC0gc2VlIEdyaWRTdGFjayByb290IGxpY2Vuc2VcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5ERFJlc2l6YWJsZUhhbmRsZSA9IHZvaWQgMDtcclxuY29uc3QgZGRfdG91Y2hfMSA9IHJlcXVpcmUoXCIuL2RkLXRvdWNoXCIpO1xyXG5jbGFzcyBERFJlc2l6YWJsZUhhbmRsZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihob3N0LCBkaXJlY3Rpb24sIG9wdGlvbikge1xyXG4gICAgICAgIC8qKiBAaW50ZXJuYWwgdHJ1ZSBhZnRlciB3ZSd2ZSBtb3ZlZCBlbm91Z2ggcGl4ZWxzIHRvIHN0YXJ0IGEgcmVzaXplICovXHJcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xyXG4gICAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xyXG4gICAgICAgIHRoaXMub3B0aW9uID0gb3B0aW9uO1xyXG4gICAgICAgIC8vIGNyZWF0ZSB2YXIgZXZlbnQgYmluZGluZyBzbyB3ZSBjYW4gZWFzaWx5IHJlbW92ZSBhbmQgc3RpbGwgbG9vayBsaWtlIFRTIG1ldGhvZHMgKHVubGlrZSBhbm9ueW1vdXMgZnVuY3Rpb25zKVxyXG4gICAgICAgIHRoaXMuX21vdXNlRG93biA9IHRoaXMuX21vdXNlRG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX21vdXNlTW92ZSA9IHRoaXMuX21vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX21vdXNlVXAgPSB0aGlzLl9tb3VzZVVwLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5faW5pdCgpO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgX2luaXQoKSB7XHJcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd1aS1yZXNpemFibGUtaGFuZGxlJyk7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChgJHtERFJlc2l6YWJsZUhhbmRsZS5wcmVmaXh9JHt0aGlzLmRpcn1gKTtcclxuICAgICAgICBlbC5zdHlsZS56SW5kZXggPSAnMTAwJztcclxuICAgICAgICBlbC5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMuZWwgPSBlbDtcclxuICAgICAgICB0aGlzLmhvc3QuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XHJcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9tb3VzZURvd24pO1xyXG4gICAgICAgIGlmIChkZF90b3VjaF8xLmlzVG91Y2gpIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZGRfdG91Y2hfMS50b3VjaHN0YXJ0KTtcclxuICAgICAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIGRkX3RvdWNoXzEucG9pbnRlcmRvd24pO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmVsLnN0eWxlLnRvdWNoQWN0aW9uID0gJ25vbmUnOyAvLyBub3QgbmVlZGVkIHVubGlrZSBwb2ludGVyZG93biBkb2MgY29tbWVudFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKiBjYWxsIHRoaXMgd2hlbiByZXNpemUgaGFuZGxlIG5lZWRzIHRvIGJlIHJlbW92ZWQgYW5kIGNsZWFuZWQgdXAgKi9cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW92aW5nKVxyXG4gICAgICAgICAgICB0aGlzLl9tb3VzZVVwKHRoaXMubW91c2VEb3duRXZlbnQpO1xyXG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fbW91c2VEb3duKTtcclxuICAgICAgICBpZiAoZGRfdG91Y2hfMS5pc1RvdWNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGRkX3RvdWNoXzEudG91Y2hzdGFydCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBkZF90b3VjaF8xLnBvaW50ZXJkb3duKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ob3N0LnJlbW92ZUNoaWxkKHRoaXMuZWwpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmVsO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmhvc3Q7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIGNhbGxlZCBvbiBtb3VzZSBkb3duIG9uIHVzOiBjYXB0dXJlIG1vdmUgb24gdGhlIGVudGlyZSBkb2N1bWVudCAobW91c2UgbWlnaHQgbm90IHN0YXkgb24gdXMpIHVudGlsIHdlIHJlbGVhc2UgdGhlIG1vdXNlICovXHJcbiAgICBfbW91c2VEb3duKGUpIHtcclxuICAgICAgICB0aGlzLm1vdXNlRG93bkV2ZW50ID0gZTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZU1vdmUsIHRydWUpOyAvLyBjYXB0dXJlLCBub3QgYnViYmxlXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX21vdXNlVXAsIHRydWUpO1xyXG4gICAgICAgIGlmIChkZF90b3VjaF8xLmlzVG91Y2gpIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBkZF90b3VjaF8xLnRvdWNobW92ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBkZF90b3VjaF8xLnRvdWNoZW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBfbW91c2VNb3ZlKGUpIHtcclxuICAgICAgICBsZXQgcyA9IHRoaXMubW91c2VEb3duRXZlbnQ7XHJcbiAgICAgICAgaWYgKHRoaXMubW92aW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFdmVudCgnbW92ZScsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChNYXRoLmFicyhlLnggLSBzLngpICsgTWF0aC5hYnMoZS55IC0gcy55KSA+IDIpIHtcclxuICAgICAgICAgICAgLy8gZG9uJ3Qgc3RhcnQgdW5sZXNzIHdlJ3ZlIG1vdmVkIGF0IGxlYXN0IDMgcGl4ZWxzXHJcbiAgICAgICAgICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckV2ZW50KCdzdGFydCcsIHRoaXMubW91c2VEb3duRXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyRXZlbnQoJ21vdmUnLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBfbW91c2VVcChlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW92aW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFdmVudCgnc3RvcCcsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZU1vdmUsIHRydWUpO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9tb3VzZVVwLCB0cnVlKTtcclxuICAgICAgICBpZiAoZGRfdG91Y2hfMS5pc1RvdWNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZGRfdG91Y2hfMS50b3VjaG1vdmUpO1xyXG4gICAgICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZGRfdG91Y2hfMS50b3VjaGVuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1vdmluZztcclxuICAgICAgICBkZWxldGUgdGhpcy5tb3VzZURvd25FdmVudDtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIF90cmlnZ2VyRXZlbnQobmFtZSwgZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25bbmFtZV0pXHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uW25hbWVdKGV2ZW50KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkREUmVzaXphYmxlSGFuZGxlID0gRERSZXNpemFibGVIYW5kbGU7XHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuRERSZXNpemFibGVIYW5kbGUucHJlZml4ID0gJ3VpLXJlc2l6YWJsZS0nO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZC1yZXNpemFibGUtaGFuZGxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG4vKipcclxuICogZGQtcmVzaXphYmxlLnRzIDcuMy4wXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMS0yMDIyIEFsYWluIER1bWVzbnkgLSBzZWUgR3JpZFN0YWNrIHJvb3QgbGljZW5zZVxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkREUmVzaXphYmxlID0gdm9pZCAwO1xyXG5jb25zdCBkZF9yZXNpemFibGVfaGFuZGxlXzEgPSByZXF1aXJlKFwiLi9kZC1yZXNpemFibGUtaGFuZGxlXCIpO1xyXG5jb25zdCBkZF9iYXNlX2ltcGxfMSA9IHJlcXVpcmUoXCIuL2RkLWJhc2UtaW1wbFwiKTtcclxuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xyXG5jb25zdCBkZF9tYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9kZC1tYW5hZ2VyXCIpO1xyXG5jbGFzcyBERFJlc2l6YWJsZSBleHRlbmRzIGRkX2Jhc2VfaW1wbF8xLkREQmFzZUltcGxlbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbCwgb3B0cyA9IHt9KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvKiogQGludGVybmFsICovXHJcbiAgICAgICAgdGhpcy5fdWkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5tZW50RWwgPSB0aGlzLmVsLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5tZW50UmVjdCA9IGNvbnRhaW5tZW50RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1JlY3QgPSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5vcmlnaW5hbFJlY3Qud2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMub3JpZ2luYWxSZWN0LmhlaWdodCArIHRoaXMuc2Nyb2xsZWQsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLm9yaWdpbmFsUmVjdC5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLm9yaWdpbmFsUmVjdC50b3AgLSB0aGlzLnNjcm9sbGVkXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLnRlbXBvcmFsUmVjdCB8fCBuZXdSZWN0O1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgLSBjb250YWlubWVudFJlY3QubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHJlY3QudG9wIC0gY29udGFpbm1lbnRSZWN0LnRvcFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNpemU6IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogcmVjdC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvKiBHcmlkc3RhY2sgT05MWSBuZWVkcyBwb3NpdGlvbiBzZXQgYWJvdmUuLi4ga2VlcCBhcm91bmQgaW4gY2FzZS5cclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IFt0aGlzLmVsXSwgLy8gVGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGVsZW1lbnQgdG8gYmUgcmVzaXplZFxyXG4gICAgICAgICAgICAgICAgaGVscGVyOiBbXSwgLy8gVE9ETzogbm90IHN1cHBvcnQgeWV0IC0gVGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGhlbHBlciB0aGF0J3MgYmVpbmcgcmVzaXplZFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFbGVtZW50OiBbdGhpcy5lbF0sLy8gd2UgZG9uJ3Qgd3JhcCBoZXJlLCBzbyBzaW1wbGlmeSBhcyB0aGlzLmVsIC8vVGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG9yaWdpbmFsIGVsZW1lbnQgYmVmb3JlIGl0IGlzIHdyYXBwZWRcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsUG9zaXRpb246IHsgLy8gVGhlIHBvc2l0aW9uIHJlcHJlc2VudGVkIGFzIHsgbGVmdCwgdG9wIH0gYmVmb3JlIHRoZSByZXNpemFibGUgaXMgcmVzaXplZFxyXG4gICAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLm9yaWdpbmFsUmVjdC5sZWZ0IC0gY29udGFpbm1lbnRSZWN0LmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5vcmlnaW5hbFJlY3QudG9wIC0gY29udGFpbm1lbnRSZWN0LnRvcFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsU2l6ZTogeyAvLyBUaGUgc2l6ZSByZXByZXNlbnRlZCBhcyB7IHdpZHRoLCBoZWlnaHQgfSBiZWZvcmUgdGhlIHJlc2l6YWJsZSBpcyByZXNpemVkXHJcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLm9yaWdpbmFsUmVjdC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLm9yaWdpbmFsUmVjdC5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVsID0gZWw7XHJcbiAgICAgICAgdGhpcy5vcHRpb24gPSBvcHRzO1xyXG4gICAgICAgIC8vIGNyZWF0ZSB2YXIgZXZlbnQgYmluZGluZyBzbyB3ZSBjYW4gZWFzaWx5IHJlbW92ZSBhbmQgc3RpbGwgbG9vayBsaWtlIFRTIG1ldGhvZHMgKHVubGlrZSBhbm9ueW1vdXMgZnVuY3Rpb25zKVxyXG4gICAgICAgIHRoaXMuX21vdXNlT3ZlciA9IHRoaXMuX21vdXNlT3Zlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX21vdXNlT3V0ID0gdGhpcy5fbW91c2VPdXQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmVuYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuX3NldHVwQXV0b0hpZGUodGhpcy5vcHRpb24uYXV0b0hpZGUpO1xyXG4gICAgICAgIHRoaXMuX3NldHVwSGFuZGxlcnMoKTtcclxuICAgIH1cclxuICAgIG9uKGV2ZW50LCBjYWxsYmFjaykge1xyXG4gICAgICAgIHN1cGVyLm9uKGV2ZW50LCBjYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBvZmYoZXZlbnQpIHtcclxuICAgICAgICBzdXBlci5vZmYoZXZlbnQpO1xyXG4gICAgfVxyXG4gICAgZW5hYmxlKCkge1xyXG4gICAgICAgIHN1cGVyLmVuYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgndWktcmVzaXphYmxlJyk7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1yZXNpemFibGUtZGlzYWJsZWQnKTtcclxuICAgICAgICB0aGlzLl9zZXR1cEF1dG9IaWRlKHRoaXMub3B0aW9uLmF1dG9IaWRlKTtcclxuICAgIH1cclxuICAgIGRpc2FibGUoKSB7XHJcbiAgICAgICAgc3VwZXIuZGlzYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgndWktcmVzaXphYmxlLWRpc2FibGVkJyk7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1yZXNpemFibGUnKTtcclxuICAgICAgICB0aGlzLl9zZXR1cEF1dG9IaWRlKGZhbHNlKTtcclxuICAgIH1cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5fcmVtb3ZlSGFuZGxlcnMoKTtcclxuICAgICAgICB0aGlzLl9zZXR1cEF1dG9IaWRlKGZhbHNlKTtcclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLXJlc2l6YWJsZScpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmVsO1xyXG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZU9wdGlvbihvcHRzKSB7XHJcbiAgICAgICAgbGV0IHVwZGF0ZUhhbmRsZXMgPSAob3B0cy5oYW5kbGVzICYmIG9wdHMuaGFuZGxlcyAhPT0gdGhpcy5vcHRpb24uaGFuZGxlcyk7XHJcbiAgICAgICAgbGV0IHVwZGF0ZUF1dG9IaWRlID0gKG9wdHMuYXV0b0hpZGUgJiYgb3B0cy5hdXRvSGlkZSAhPT0gdGhpcy5vcHRpb24uYXV0b0hpZGUpO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdHMpLmZvckVhY2goa2V5ID0+IHRoaXMub3B0aW9uW2tleV0gPSBvcHRzW2tleV0pO1xyXG4gICAgICAgIGlmICh1cGRhdGVIYW5kbGVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUhhbmRsZXJzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldHVwSGFuZGxlcnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVwZGF0ZUF1dG9IaWRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldHVwQXV0b0hpZGUodGhpcy5vcHRpb24uYXV0b0hpZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgdHVybnMgYXV0byBoaWRlIG9uL29mZiAqL1xyXG4gICAgX3NldHVwQXV0b0hpZGUoYXV0bykge1xyXG4gICAgICAgIGlmIChhdXRvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgndWktcmVzaXphYmxlLWF1dG9oaWRlJyk7XHJcbiAgICAgICAgICAgIC8vIHVzZSBtb3VzZW92ZXIgYW5kIG5vdCBtb3VzZWVudGVyIHRvIGdldCBiZXR0ZXIgcGVyZm9ybWFuY2UgYW5kIHRyYWNrIGZvciBuZXN0ZWQgY2FzZXNcclxuICAgICAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLl9tb3VzZU92ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5fbW91c2VPdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1yZXNpemFibGUtYXV0b2hpZGUnKTtcclxuICAgICAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLl9tb3VzZU92ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5fbW91c2VPdXQpO1xyXG4gICAgICAgICAgICBpZiAoZGRfbWFuYWdlcl8xLkRETWFuYWdlci5vdmVyUmVzaXplRWxlbWVudCA9PT0gdGhpcykge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGRkX21hbmFnZXJfMS5ERE1hbmFnZXIub3ZlclJlc2l6ZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICBfbW91c2VPdmVyKGUpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtjb3VudCsrfSBwcmUtZW50ZXIgJHsodGhpcy5lbCBhcyBHcmlkSXRlbUhUTUxFbGVtZW50KS5ncmlkc3RhY2tOb2RlLl9pZH1gKVxyXG4gICAgICAgIC8vIGFscmVhZHkgb3ZlciBhIGNoaWxkLCBpZ25vcmUuIElkZWFsbHkgd2UganVzdCBjYWxsIGUuc3RvcFByb3BhZ2F0aW9uKCkgYnV0IHNlZSBodHRwczovL2dpdGh1Yi5jb20vZ3JpZHN0YWNrL2dyaWRzdGFjay5qcy9pc3N1ZXMvMjAxOFxyXG4gICAgICAgIGlmIChkZF9tYW5hZ2VyXzEuRERNYW5hZ2VyLm92ZXJSZXNpemVFbGVtZW50IHx8IGRkX21hbmFnZXJfMS5ERE1hbmFnZXIuZHJhZ0VsZW1lbnQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBkZF9tYW5hZ2VyXzEuRERNYW5hZ2VyLm92ZXJSZXNpemVFbGVtZW50ID0gdGhpcztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtjb3VudCsrfSBlbnRlciAkeyh0aGlzLmVsIGFzIEdyaWRJdGVtSFRNTEVsZW1lbnQpLmdyaWRzdGFja05vZGUuX2lkfWApXHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1yZXNpemFibGUtYXV0b2hpZGUnKTtcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIF9tb3VzZU91dChlKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYCR7Y291bnQrK30gcHJlLWxlYXZlICR7KHRoaXMuZWwgYXMgR3JpZEl0ZW1IVE1MRWxlbWVudCkuZ3JpZHN0YWNrTm9kZS5faWR9YClcclxuICAgICAgICBpZiAoZGRfbWFuYWdlcl8xLkRETWFuYWdlci5vdmVyUmVzaXplRWxlbWVudCAhPT0gdGhpcylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGRlbGV0ZSBkZF9tYW5hZ2VyXzEuRERNYW5hZ2VyLm92ZXJSZXNpemVFbGVtZW50O1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAke2NvdW50Kyt9IGxlYXZlICR7KHRoaXMuZWwgYXMgR3JpZEl0ZW1IVE1MRWxlbWVudCkuZ3JpZHN0YWNrTm9kZS5faWR9YClcclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3VpLXJlc2l6YWJsZS1hdXRvaGlkZScpO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgX3NldHVwSGFuZGxlcnMoKSB7XHJcbiAgICAgICAgbGV0IGhhbmRsZXJEaXJlY3Rpb24gPSB0aGlzLm9wdGlvbi5oYW5kbGVzIHx8ICdlLHMsc2UnO1xyXG4gICAgICAgIGlmIChoYW5kbGVyRGlyZWN0aW9uID09PSAnYWxsJykge1xyXG4gICAgICAgICAgICBoYW5kbGVyRGlyZWN0aW9uID0gJ24sZSxzLHcsc2Usc3csbmUsbncnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhhbmRsZXJzID0gaGFuZGxlckRpcmVjdGlvbi5zcGxpdCgnLCcpXHJcbiAgICAgICAgICAgIC5tYXAoZGlyID0+IGRpci50cmltKCkpXHJcbiAgICAgICAgICAgIC5tYXAoZGlyID0+IG5ldyBkZF9yZXNpemFibGVfaGFuZGxlXzEuRERSZXNpemFibGVIYW5kbGUodGhpcy5lbCwgZGlyLCB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZVN0YXJ0KGV2ZW50KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RvcDogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNpemVTdG9wKGV2ZW50KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbW92ZTogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNpemluZyhldmVudCwgZGlyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIF9yZXNpemVTdGFydChldmVudCkge1xyXG4gICAgICAgIHRoaXMub3JpZ2luYWxSZWN0ID0gdGhpcy5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLnNjcm9sbEVsID0gdXRpbHNfMS5VdGlscy5nZXRTY3JvbGxFbGVtZW50KHRoaXMuZWwpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsWSA9IHRoaXMuc2Nyb2xsRWwuc2Nyb2xsVG9wO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsZWQgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhcnRFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgIHRoaXMuX3NldHVwSGVscGVyKCk7XHJcbiAgICAgICAgdGhpcy5fYXBwbHlDaGFuZ2UoKTtcclxuICAgICAgICBjb25zdCBldiA9IHV0aWxzXzEuVXRpbHMuaW5pdEV2ZW50KGV2ZW50LCB7IHR5cGU6ICdyZXNpemVzdGFydCcsIHRhcmdldDogdGhpcy5lbCB9KTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb24uc3RhcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb24uc3RhcnQoZXYsIHRoaXMuX3VpKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3VpLXJlc2l6YWJsZS1yZXNpemluZycpO1xyXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdyZXNpemVzdGFydCcsIGV2KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIF9yZXNpemluZyhldmVudCwgZGlyKSB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxlZCA9IHRoaXMuc2Nyb2xsRWwuc2Nyb2xsVG9wIC0gdGhpcy5zY3JvbGxZO1xyXG4gICAgICAgIHRoaXMudGVtcG9yYWxSZWN0ID0gdGhpcy5fZ2V0Q2hhbmdlKGV2ZW50LCBkaXIpO1xyXG4gICAgICAgIHRoaXMuX2FwcGx5Q2hhbmdlKCk7XHJcbiAgICAgICAgY29uc3QgZXYgPSB1dGlsc18xLlV0aWxzLmluaXRFdmVudChldmVudCwgeyB0eXBlOiAncmVzaXplJywgdGFyZ2V0OiB0aGlzLmVsIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbi5yZXNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb24ucmVzaXplKGV2LCB0aGlzLl91aSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ3Jlc2l6ZScsIGV2KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIF9yZXNpemVTdG9wKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgZXYgPSB1dGlsc18xLlV0aWxzLmluaXRFdmVudChldmVudCwgeyB0eXBlOiAncmVzaXplc3RvcCcsIHRhcmdldDogdGhpcy5lbCB9KTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb24uc3RvcCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbi5zdG9wKGV2KTsgLy8gTm90ZTogdWkoKSBub3QgdXNlZCBieSBncmlkc3RhY2sgc28gZG9uJ3QgcGFzc1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLXJlc2l6YWJsZS1yZXNpemluZycpO1xyXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdyZXNpemVzdG9wJywgZXYpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFuSGVscGVyKCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuc3RhcnRFdmVudDtcclxuICAgICAgICBkZWxldGUgdGhpcy5vcmlnaW5hbFJlY3Q7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMudGVtcG9yYWxSZWN0O1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnNjcm9sbFk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuc2Nyb2xsZWQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBfc2V0dXBIZWxwZXIoKSB7XHJcbiAgICAgICAgdGhpcy5lbE9yaWdpblN0eWxlVmFsID0gRERSZXNpemFibGUuX29yaWdpblN0eWxlUHJvcC5tYXAocHJvcCA9PiB0aGlzLmVsLnN0eWxlW3Byb3BdKTtcclxuICAgICAgICB0aGlzLnBhcmVudE9yaWdpblN0eWxlUG9zaXRpb24gPSB0aGlzLmVsLnBhcmVudEVsZW1lbnQuc3R5bGUucG9zaXRpb247XHJcbiAgICAgICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWwucGFyZW50RWxlbWVudCkucG9zaXRpb24ubWF0Y2goL3N0YXRpYy8pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwucGFyZW50RWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUub3BhY2l0eSA9ICcwLjgnO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgX2NsZWFuSGVscGVyKCkge1xyXG4gICAgICAgIEREUmVzaXphYmxlLl9vcmlnaW5TdHlsZVByb3AuZm9yRWFjaCgocHJvcCwgaSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlW3Byb3BdID0gdGhpcy5lbE9yaWdpblN0eWxlVmFsW2ldIHx8IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5lbC5wYXJlbnRFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gdGhpcy5wYXJlbnRPcmlnaW5TdHlsZVBvc2l0aW9uIHx8IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBfZ2V0Q2hhbmdlKGV2ZW50LCBkaXIpIHtcclxuICAgICAgICBjb25zdCBvRXZlbnQgPSB0aGlzLnN0YXJ0RXZlbnQ7XHJcbiAgICAgICAgY29uc3QgbmV3UmVjdCA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMub3JpZ2luYWxSZWN0LndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMub3JpZ2luYWxSZWN0LmhlaWdodCArIHRoaXMuc2Nyb2xsZWQsXHJcbiAgICAgICAgICAgIGxlZnQ6IHRoaXMub3JpZ2luYWxSZWN0LmxlZnQsXHJcbiAgICAgICAgICAgIHRvcDogdGhpcy5vcmlnaW5hbFJlY3QudG9wIC0gdGhpcy5zY3JvbGxlZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0WCA9IGV2ZW50LmNsaWVudFggLSBvRXZlbnQuY2xpZW50WDtcclxuICAgICAgICBjb25zdCBvZmZzZXRZID0gZXZlbnQuY2xpZW50WSAtIG9FdmVudC5jbGllbnRZO1xyXG4gICAgICAgIGlmIChkaXIuaW5kZXhPZignZScpID4gLTEpIHtcclxuICAgICAgICAgICAgbmV3UmVjdC53aWR0aCArPSBvZmZzZXRYO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkaXIuaW5kZXhPZigndycpID4gLTEpIHtcclxuICAgICAgICAgICAgbmV3UmVjdC53aWR0aCAtPSBvZmZzZXRYO1xyXG4gICAgICAgICAgICBuZXdSZWN0LmxlZnQgKz0gb2Zmc2V0WDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpci5pbmRleE9mKCdzJykgPiAtMSkge1xyXG4gICAgICAgICAgICBuZXdSZWN0LmhlaWdodCArPSBvZmZzZXRZO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkaXIuaW5kZXhPZignbicpID4gLTEpIHtcclxuICAgICAgICAgICAgbmV3UmVjdC5oZWlnaHQgLT0gb2Zmc2V0WTtcclxuICAgICAgICAgICAgbmV3UmVjdC50b3AgKz0gb2Zmc2V0WTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29uc3RyYWluID0gdGhpcy5fY29uc3RyYWluU2l6ZShuZXdSZWN0LndpZHRoLCBuZXdSZWN0LmhlaWdodCk7XHJcbiAgICAgICAgaWYgKE1hdGgucm91bmQobmV3UmVjdC53aWR0aCkgIT09IE1hdGgucm91bmQoY29uc3RyYWluLndpZHRoKSkgeyAvLyByb3VuZCB0byBpZ25vcmUgc2xpZ2h0IHJvdW5kLW9mZiBlcnJvcnNcclxuICAgICAgICAgICAgaWYgKGRpci5pbmRleE9mKCd3JykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgbmV3UmVjdC5sZWZ0ICs9IG5ld1JlY3Qud2lkdGggLSBjb25zdHJhaW4ud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3UmVjdC53aWR0aCA9IGNvbnN0cmFpbi53aWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGgucm91bmQobmV3UmVjdC5oZWlnaHQpICE9PSBNYXRoLnJvdW5kKGNvbnN0cmFpbi5oZWlnaHQpKSB7XHJcbiAgICAgICAgICAgIGlmIChkaXIuaW5kZXhPZignbicpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIG5ld1JlY3QudG9wICs9IG5ld1JlY3QuaGVpZ2h0IC0gY29uc3RyYWluLmhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdSZWN0LmhlaWdodCA9IGNvbnN0cmFpbi5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdSZWN0O1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCBjb25zdHJhaW4gdGhlIHNpemUgdG8gdGhlIHNldCBtaW4vbWF4IHZhbHVlcyAqL1xyXG4gICAgX2NvbnN0cmFpblNpemUob1dpZHRoLCBvSGVpZ2h0KSB7XHJcbiAgICAgICAgY29uc3QgbWF4V2lkdGggPSB0aGlzLm9wdGlvbi5tYXhXaWR0aCB8fCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcclxuICAgICAgICBjb25zdCBtaW5XaWR0aCA9IHRoaXMub3B0aW9uLm1pbldpZHRoIHx8IG9XaWR0aDtcclxuICAgICAgICBjb25zdCBtYXhIZWlnaHQgPSB0aGlzLm9wdGlvbi5tYXhIZWlnaHQgfHwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XHJcbiAgICAgICAgY29uc3QgbWluSGVpZ2h0ID0gdGhpcy5vcHRpb24ubWluSGVpZ2h0IHx8IG9IZWlnaHQ7XHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSBNYXRoLm1pbihtYXhXaWR0aCwgTWF0aC5tYXgobWluV2lkdGgsIG9XaWR0aCkpO1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWluKG1heEhlaWdodCwgTWF0aC5tYXgobWluSGVpZ2h0LCBvSGVpZ2h0KSk7XHJcbiAgICAgICAgcmV0dXJuIHsgd2lkdGgsIGhlaWdodCB9O1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgX2FwcGx5Q2hhbmdlKCkge1xyXG4gICAgICAgIGxldCBjb250YWlubWVudFJlY3QgPSB7IGxlZnQ6IDAsIHRvcDogMCwgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xyXG4gICAgICAgIGlmICh0aGlzLmVsLnN0eWxlLnBvc2l0aW9uID09PSAnYWJzb2x1dGUnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5tZW50RWwgPSB0aGlzLmVsLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBjb250YWlubWVudEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb250YWlubWVudFJlY3QgPSB7IGxlZnQsIHRvcCwgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMudGVtcG9yYWxSZWN0KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnRlbXBvcmFsUmVjdCkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudGVtcG9yYWxSZWN0W2tleV07XHJcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGVba2V5XSA9IHZhbHVlIC0gY29udGFpbm1lbnRSZWN0W2tleV0gKyAncHgnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgX3JlbW92ZUhhbmRsZXJzKCkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlcnMuZm9yRWFjaChoYW5kbGUgPT4gaGFuZGxlLmRlc3Ryb3koKSk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuaGFuZGxlcnM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5ERFJlc2l6YWJsZSA9IEREUmVzaXphYmxlO1xyXG4vKiogQGludGVybmFsICovXHJcbkREUmVzaXphYmxlLl9vcmlnaW5TdHlsZVByb3AgPSBbJ3dpZHRoJywgJ2hlaWdodCcsICdwb3NpdGlvbicsICdsZWZ0JywgJ3RvcCcsICdvcGFjaXR5JywgJ3pJbmRleCddO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZC1yZXNpemFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qKlxyXG4gKiB0b3VjaC50cyA3LjMuMFxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEgQWxhaW4gRHVtZXNueSAtIHNlZSBHcmlkU3RhY2sgcm9vdCBsaWNlbnNlXHJcbiAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMucG9pbnRlcmxlYXZlID0gZXhwb3J0cy5wb2ludGVyZW50ZXIgPSBleHBvcnRzLnBvaW50ZXJkb3duID0gZXhwb3J0cy50b3VjaGVuZCA9IGV4cG9ydHMudG91Y2htb3ZlID0gZXhwb3J0cy50b3VjaHN0YXJ0ID0gZXhwb3J0cy5pc1RvdWNoID0gdm9pZCAwO1xyXG5jb25zdCBkZF9tYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9kZC1tYW5hZ2VyXCIpO1xyXG4vKipcclxuICogRGV0ZWN0IHRvdWNoIHN1cHBvcnQgLSBXaW5kb3dzIFN1cmZhY2UgZGV2aWNlcyBhbmQgb3RoZXIgdG91Y2ggZGV2aWNlc1xyXG4gKiBzaG91bGQgd2UgdXNlIHRoaXMgaW5zdGVhZCA/ICh3aGF0IHdlIGhhZCBmb3IgYWx3YXlzIHNob3dpbmcgcmVzaXplIGhhbmRsZXMpXHJcbiAqIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KVxyXG4gKi9cclxuZXhwb3J0cy5pc1RvdWNoID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJlxyXG4gICAgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50XHJcbiAgICAgICAgfHwgJ29udG91Y2hzdGFydCcgaW4gd2luZG93XHJcbiAgICAgICAgLy8gfHwgISF3aW5kb3cuVG91Y2hFdmVudCAvLyB0cnVlIG9uIFdpbmRvd3MgMTAgQ2hyb21lIGRlc2t0b3Agc28gZG9uJ3QgdXNlIHRoaXNcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIHx8ICh3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKVxyXG4gICAgICAgIHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDBcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIHx8IG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMCk7XHJcbi8vIGludGVyZmFjZSBUb3VjaENvb3JkIHt4OiBudW1iZXIsIHk6IG51bWJlcn07XHJcbmNsYXNzIEREVG91Y2gge1xyXG59XHJcbi8qKlxyXG4qIEdldCB0aGUgeCx5IHBvc2l0aW9uIG9mIGEgdG91Y2ggZXZlbnRcclxuKi9cclxuLy8gZnVuY3Rpb24gZ2V0VG91Y2hDb29yZHMoZTogVG91Y2hFdmVudCk6IFRvdWNoQ29vcmQge1xyXG4vLyAgIHJldHVybiB7XHJcbi8vICAgICB4OiBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYLFxyXG4vLyAgICAgeTogZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWVxyXG4vLyAgIH07XHJcbi8vIH1cclxuLyoqXHJcbiAqIFNpbXVsYXRlIGEgbW91c2UgZXZlbnQgYmFzZWQgb24gYSBjb3JyZXNwb25kaW5nIHRvdWNoIGV2ZW50XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBlIEEgdG91Y2ggZXZlbnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNpbXVsYXRlZFR5cGUgVGhlIGNvcnJlc3BvbmRpbmcgbW91c2UgZXZlbnRcclxuICovXHJcbmZ1bmN0aW9uIHNpbXVsYXRlTW91c2VFdmVudChlLCBzaW11bGF0ZWRUeXBlKSB7XHJcbiAgICAvLyBJZ25vcmUgbXVsdGktdG91Y2ggZXZlbnRzXHJcbiAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gUHJldmVudCBcIklnbm9yZWQgYXR0ZW1wdCB0byBjYW5jZWwgYSB0b3VjaG1vdmUgZXZlbnQgd2l0aCBjYW5jZWxhYmxlPWZhbHNlXCIgZXJyb3JzXHJcbiAgICBpZiAoZS5jYW5jZWxhYmxlKVxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1swXSwgc2ltdWxhdGVkRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcclxuICAgIC8vIEluaXRpYWxpemUgdGhlIHNpbXVsYXRlZCBtb3VzZSBldmVudCB1c2luZyB0aGUgdG91Y2ggZXZlbnQncyBjb29yZGluYXRlc1xyXG4gICAgc2ltdWxhdGVkRXZlbnQuaW5pdE1vdXNlRXZlbnQoc2ltdWxhdGVkVHlwZSwgLy8gdHlwZVxyXG4gICAgdHJ1ZSwgLy8gYnViYmxlc1xyXG4gICAgdHJ1ZSwgLy8gY2FuY2VsYWJsZVxyXG4gICAgd2luZG93LCAvLyB2aWV3XHJcbiAgICAxLCAvLyBkZXRhaWxcclxuICAgIHRvdWNoLnNjcmVlblgsIC8vIHNjcmVlblhcclxuICAgIHRvdWNoLnNjcmVlblksIC8vIHNjcmVlbllcclxuICAgIHRvdWNoLmNsaWVudFgsIC8vIGNsaWVudFhcclxuICAgIHRvdWNoLmNsaWVudFksIC8vIGNsaWVudFlcclxuICAgIGZhbHNlLCAvLyBjdHJsS2V5XHJcbiAgICBmYWxzZSwgLy8gYWx0S2V5XHJcbiAgICBmYWxzZSwgLy8gc2hpZnRLZXlcclxuICAgIGZhbHNlLCAvLyBtZXRhS2V5XHJcbiAgICAwLCAvLyBidXR0b25cclxuICAgIG51bGwgLy8gcmVsYXRlZFRhcmdldFxyXG4gICAgKTtcclxuICAgIC8vIERpc3BhdGNoIHRoZSBzaW11bGF0ZWQgZXZlbnQgdG8gdGhlIHRhcmdldCBlbGVtZW50XHJcbiAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KHNpbXVsYXRlZEV2ZW50KTtcclxufVxyXG4vKipcclxuICogU2ltdWxhdGUgYSBtb3VzZSBldmVudCBiYXNlZCBvbiBhIGNvcnJlc3BvbmRpbmcgUG9pbnRlciBldmVudFxyXG4gKiBAcGFyYW0ge09iamVjdH0gZSBBIHBvaW50ZXIgZXZlbnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNpbXVsYXRlZFR5cGUgVGhlIGNvcnJlc3BvbmRpbmcgbW91c2UgZXZlbnRcclxuICovXHJcbmZ1bmN0aW9uIHNpbXVsYXRlUG9pbnRlck1vdXNlRXZlbnQoZSwgc2ltdWxhdGVkVHlwZSkge1xyXG4gICAgLy8gUHJldmVudCBcIklnbm9yZWQgYXR0ZW1wdCB0byBjYW5jZWwgYSB0b3VjaG1vdmUgZXZlbnQgd2l0aCBjYW5jZWxhYmxlPWZhbHNlXCIgZXJyb3JzXHJcbiAgICBpZiAoZS5jYW5jZWxhYmxlKVxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHNpbXVsYXRlZEV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyk7XHJcbiAgICAvLyBJbml0aWFsaXplIHRoZSBzaW11bGF0ZWQgbW91c2UgZXZlbnQgdXNpbmcgdGhlIHRvdWNoIGV2ZW50J3MgY29vcmRpbmF0ZXNcclxuICAgIHNpbXVsYXRlZEV2ZW50LmluaXRNb3VzZUV2ZW50KHNpbXVsYXRlZFR5cGUsIC8vIHR5cGVcclxuICAgIHRydWUsIC8vIGJ1YmJsZXNcclxuICAgIHRydWUsIC8vIGNhbmNlbGFibGVcclxuICAgIHdpbmRvdywgLy8gdmlld1xyXG4gICAgMSwgLy8gZGV0YWlsXHJcbiAgICBlLnNjcmVlblgsIC8vIHNjcmVlblhcclxuICAgIGUuc2NyZWVuWSwgLy8gc2NyZWVuWVxyXG4gICAgZS5jbGllbnRYLCAvLyBjbGllbnRYXHJcbiAgICBlLmNsaWVudFksIC8vIGNsaWVudFlcclxuICAgIGZhbHNlLCAvLyBjdHJsS2V5XHJcbiAgICBmYWxzZSwgLy8gYWx0S2V5XHJcbiAgICBmYWxzZSwgLy8gc2hpZnRLZXlcclxuICAgIGZhbHNlLCAvLyBtZXRhS2V5XHJcbiAgICAwLCAvLyBidXR0b25cclxuICAgIG51bGwgLy8gcmVsYXRlZFRhcmdldFxyXG4gICAgKTtcclxuICAgIC8vIERpc3BhdGNoIHRoZSBzaW11bGF0ZWQgZXZlbnQgdG8gdGhlIHRhcmdldCBlbGVtZW50XHJcbiAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KHNpbXVsYXRlZEV2ZW50KTtcclxufVxyXG4vKipcclxuICogSGFuZGxlIHRoZSB0b3VjaHN0YXJ0IGV2ZW50c1xyXG4gKiBAcGFyYW0ge09iamVjdH0gZSBUaGUgd2lkZ2V0IGVsZW1lbnQncyB0b3VjaHN0YXJ0IGV2ZW50XHJcbiAqL1xyXG5mdW5jdGlvbiB0b3VjaHN0YXJ0KGUpIHtcclxuICAgIC8vIElnbm9yZSB0aGUgZXZlbnQgaWYgYW5vdGhlciB3aWRnZXQgaXMgYWxyZWFkeSBiZWluZyBoYW5kbGVkXHJcbiAgICBpZiAoRERUb3VjaC50b3VjaEhhbmRsZWQpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgRERUb3VjaC50b3VjaEhhbmRsZWQgPSB0cnVlO1xyXG4gICAgLy8gU2ltdWxhdGUgdGhlIG1vdXNlIGV2ZW50c1xyXG4gICAgLy8gc2ltdWxhdGVNb3VzZUV2ZW50KGUsICdtb3VzZW92ZXInKTtcclxuICAgIC8vIHNpbXVsYXRlTW91c2VFdmVudChlLCAnbW91c2Vtb3ZlJyk7XHJcbiAgICBzaW11bGF0ZU1vdXNlRXZlbnQoZSwgJ21vdXNlZG93bicpO1xyXG59XHJcbmV4cG9ydHMudG91Y2hzdGFydCA9IHRvdWNoc3RhcnQ7XHJcbi8qKlxyXG4gKiBIYW5kbGUgdGhlIHRvdWNobW92ZSBldmVudHNcclxuICogQHBhcmFtIHtPYmplY3R9IGUgVGhlIGRvY3VtZW50J3MgdG91Y2htb3ZlIGV2ZW50XHJcbiAqL1xyXG5mdW5jdGlvbiB0b3VjaG1vdmUoZSkge1xyXG4gICAgLy8gSWdub3JlIGV2ZW50IGlmIG5vdCBoYW5kbGVkIGJ5IHVzXHJcbiAgICBpZiAoIUREVG91Y2gudG91Y2hIYW5kbGVkKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIHNpbXVsYXRlTW91c2VFdmVudChlLCAnbW91c2Vtb3ZlJyk7XHJcbn1cclxuZXhwb3J0cy50b3VjaG1vdmUgPSB0b3VjaG1vdmU7XHJcbi8qKlxyXG4gKiBIYW5kbGUgdGhlIHRvdWNoZW5kIGV2ZW50c1xyXG4gKiBAcGFyYW0ge09iamVjdH0gZSBUaGUgZG9jdW1lbnQncyB0b3VjaGVuZCBldmVudFxyXG4gKi9cclxuZnVuY3Rpb24gdG91Y2hlbmQoZSkge1xyXG4gICAgLy8gSWdub3JlIGV2ZW50IGlmIG5vdCBoYW5kbGVkXHJcbiAgICBpZiAoIUREVG91Y2gudG91Y2hIYW5kbGVkKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIC8vIGNhbmNlbCBkZWxheWVkIGxlYXZlIGV2ZW50IHdoZW4gd2UgcmVsZWFzZSBvbiBvdXJzZWxmIHdoaWNoIGhhcHBlbnMgQkVGT1JFIHdlIGdldCB0aGlzIVxyXG4gICAgaWYgKEREVG91Y2gucG9pbnRlckxlYXZlVGltZW91dCkge1xyXG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoRERUb3VjaC5wb2ludGVyTGVhdmVUaW1lb3V0KTtcclxuICAgICAgICBkZWxldGUgRERUb3VjaC5wb2ludGVyTGVhdmVUaW1lb3V0O1xyXG4gICAgfVxyXG4gICAgY29uc3Qgd2FzRHJhZ2dpbmcgPSAhIWRkX21hbmFnZXJfMS5ERE1hbmFnZXIuZHJhZ0VsZW1lbnQ7XHJcbiAgICAvLyBTaW11bGF0ZSB0aGUgbW91c2V1cCBldmVudFxyXG4gICAgc2ltdWxhdGVNb3VzZUV2ZW50KGUsICdtb3VzZXVwJyk7XHJcbiAgICAvLyBzaW11bGF0ZU1vdXNlRXZlbnQoZXZlbnQsICdtb3VzZW91dCcpO1xyXG4gICAgLy8gSWYgdGhlIHRvdWNoIGludGVyYWN0aW9uIGRpZCBub3QgbW92ZSwgaXQgc2hvdWxkIHRyaWdnZXIgYSBjbGlja1xyXG4gICAgaWYgKCF3YXNEcmFnZ2luZykge1xyXG4gICAgICAgIHNpbXVsYXRlTW91c2VFdmVudChlLCAnY2xpY2snKTtcclxuICAgIH1cclxuICAgIC8vIFVuc2V0IHRoZSBmbGFnIHRvIGFsbG93IG90aGVyIHdpZGdldHMgdG8gaW5oZXJpdCB0aGUgdG91Y2ggZXZlbnRcclxuICAgIEREVG91Y2gudG91Y2hIYW5kbGVkID0gZmFsc2U7XHJcbn1cclxuZXhwb3J0cy50b3VjaGVuZCA9IHRvdWNoZW5kO1xyXG4vKipcclxuICogTm90ZSB3ZSBkb24ndCBnZXQgdG91Y2hlbnRlci90b3VjaGxlYXZlICh3aGljaCBhcmUgZGVwcmVjYXRlZClcclxuICogc2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI3OTA4MzM5L2pzLXRvdWNoLWVxdWl2YWxlbnQtZm9yLW1vdXNlZW50ZXJcclxuICogc28gaW5zdGVhZCBvZiBQb2ludGVyRXZlbnQgdG8gc3RpbGwgZ2V0IGVudGVyL2xlYXZlIGFuZCBzZW5kIHRoZSBtYXRjaGluZyBtb3VzZSBldmVudC5cclxuICovXHJcbmZ1bmN0aW9uIHBvaW50ZXJkb3duKGUpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwicG9pbnRlciBkb3duXCIpXHJcbiAgICBlLnRhcmdldC5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZS5wb2ludGVySWQpOyAvLyA8LSBJbXBvcnRhbnQhXHJcbn1cclxuZXhwb3J0cy5wb2ludGVyZG93biA9IHBvaW50ZXJkb3duO1xyXG5mdW5jdGlvbiBwb2ludGVyZW50ZXIoZSkge1xyXG4gICAgLy8gaWdub3JlIHRoZSBpbml0aWFsIG9uZSB3ZSBnZXQgb24gcG9pbnRlcmRvd24gb24gb3Vyc2VsZlxyXG4gICAgaWYgKCFkZF9tYW5hZ2VyXzEuRERNYW5hZ2VyLmRyYWdFbGVtZW50KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3BvaW50ZXJlbnRlciBpZ25vcmVkJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gY29uc29sZS5sb2coJ3BvaW50ZXJlbnRlcicpO1xyXG4gICAgc2ltdWxhdGVQb2ludGVyTW91c2VFdmVudChlLCAnbW91c2VlbnRlcicpO1xyXG59XHJcbmV4cG9ydHMucG9pbnRlcmVudGVyID0gcG9pbnRlcmVudGVyO1xyXG5mdW5jdGlvbiBwb2ludGVybGVhdmUoZSkge1xyXG4gICAgLy8gaWdub3JlIHRoZSBsZWF2ZSBvbiBvdXJzZWxmIHdlIGdldCBiZWZvcmUgcmVsZWFzaW5nIHRoZSBtb3VzZSBvdmVyIG91cnNlbGZcclxuICAgIC8vIGJ5IGRlbGF5aW5nIHNlbmRpbmcgdGhlIGV2ZW50IGFuZCBoYXZpbmcgdGhlIHVwIGV2ZW50IGNhbmNlbCB1c1xyXG4gICAgaWYgKCFkZF9tYW5hZ2VyXzEuRERNYW5hZ2VyLmRyYWdFbGVtZW50KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3BvaW50ZXJsZWF2ZSBpZ25vcmVkJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgRERUb3VjaC5wb2ludGVyTGVhdmVUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGRlbGV0ZSBERFRvdWNoLnBvaW50ZXJMZWF2ZVRpbWVvdXQ7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3BvaW50ZXJsZWF2ZSBkZWxheWVkJyk7XHJcbiAgICAgICAgc2ltdWxhdGVQb2ludGVyTW91c2VFdmVudChlLCAnbW91c2VsZWF2ZScpO1xyXG4gICAgfSwgMTApO1xyXG59XHJcbmV4cG9ydHMucG9pbnRlcmxlYXZlID0gcG9pbnRlcmxlYXZlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZC10b3VjaC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuLyoqXHJcbiAqIGdyaWRzdGFjay1lbmdpbmUudHMgNy4zLjBcclxuICogQ29weXJpZ2h0IChjKSAyMDIxLTIwMjIgQWxhaW4gRHVtZXNueSAtIHNlZSBHcmlkU3RhY2sgcm9vdCBsaWNlbnNlXHJcbiAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuR3JpZFN0YWNrRW5naW5lID0gdm9pZCAwO1xyXG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSBHcmlkU3RhY2sgZW5naW5lIHRoYXQgZG9lcyBtb3N0IG5vIERPTSBncmlkIG1hbmlwdWxhdGlvbi5cclxuICogU2VlIEdyaWRTdGFjayBtZXRob2RzIGFuZCB2YXJzIGZvciBkZXNjcmlwdGlvbnMuXHJcbiAqXHJcbiAqIE5PVEU6IHZhbHVlcyBzaG91bGQgbm90IGJlIG1vZGlmaWVkIGRpcmVjdGx5IC0gY2FsbCB0aGUgbWFpbiBHcmlkU3RhY2sgQVBJIGluc3RlYWRcclxuICovXHJcbmNsYXNzIEdyaWRTdGFja0VuZ2luZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRzID0ge30pIHtcclxuICAgICAgICB0aGlzLmFkZGVkTm9kZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbW92ZWROb2RlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY29sdW1uID0gb3B0cy5jb2x1bW4gfHwgMTI7XHJcbiAgICAgICAgdGhpcy5tYXhSb3cgPSBvcHRzLm1heFJvdztcclxuICAgICAgICB0aGlzLl9mbG9hdCA9IG9wdHMuZmxvYXQ7XHJcbiAgICAgICAgdGhpcy5ub2RlcyA9IG9wdHMubm9kZXMgfHwgW107XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IG9wdHMub25DaGFuZ2U7XHJcbiAgICB9XHJcbiAgICBiYXRjaFVwZGF0ZShmbGFnID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICghIXRoaXMuYmF0Y2hNb2RlID09PSBmbGFnKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB0aGlzLmJhdGNoTW9kZSA9IGZsYWc7XHJcbiAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJldkZsb2F0ID0gdGhpcy5fZmxvYXQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zsb2F0ID0gdHJ1ZTsgLy8gbGV0IHRoaW5ncyBnbyBhbnl3aGVyZSBmb3Igbm93Li4uIHdpbGwgcmVzdG9yZSBhbmQgcG9zc2libHkgcmVwb3NpdGlvbiBsYXRlclxyXG4gICAgICAgICAgICB0aGlzLnNhdmVJbml0aWFsKCk7IC8vIHNpbmNlIGJlZ2luIHVwZGF0ZSAod2hpY2ggaXMgY2FsbGVkIG11bHRpcGxlIHRpbWVzKSB3b24ndCBkbyB0aGlzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9mbG9hdCA9IHRoaXMuX3ByZXZGbG9hdDtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3ByZXZGbG9hdDtcclxuICAgICAgICAgICAgdGhpcy5fcGFja05vZGVzKCkuX25vdGlmeSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8vIHVzZSBlbnRpcmUgcm93IGZvciBoaXR0aW5nIGFyZWEgKHdpbGwgdXNlIGJvdHRvbSByZXZlcnNlIHNvcnRlZCBmaXJzdCkgaWYgd2Ugbm90IGFjdGl2ZWx5IG1vdmluZyBET1dOIGFuZCBkaWRuJ3QgYWxyZWFkeSBza2lwXHJcbiAgICBfdXNlRW50aXJlUm93QXJlYShub2RlLCBubikge1xyXG4gICAgICAgIHJldHVybiAoIXRoaXMuZmxvYXQgfHwgdGhpcy5iYXRjaE1vZGUgJiYgIXRoaXMuX3ByZXZGbG9hdCkgJiYgIXRoaXMuX2hhc0xvY2tlZCAmJiAoIW5vZGUuX21vdmluZyB8fCBub2RlLl9za2lwRG93biB8fCBubi55IDw9IG5vZGUueSk7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIGZpeCBjb2xsaXNpb24gb24gZ2l2ZW4gJ25vZGUnLCBnb2luZyB0byBnaXZlbiBuZXcgbG9jYXRpb24gJ25uJywgd2l0aCBvcHRpb25hbCAnY29sbGlkZScgbm9kZSBhbHJlYWR5IGZvdW5kLlxyXG4gICAgICogcmV0dXJuIHRydWUgaWYgd2UgbW92ZWQuICovXHJcbiAgICBfZml4Q29sbGlzaW9ucyhub2RlLCBubiA9IG5vZGUsIGNvbGxpZGUsIG9wdCA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy5zb3J0Tm9kZXMoLTEpOyAvLyBmcm9tIGxhc3QgdG8gZmlyc3QsIHNvIHJlY3Vyc2l2ZSBjb2xsaXNpb24gbW92ZSBpdGVtcyBpbiB0aGUgcmlnaHQgb3JkZXJcclxuICAgICAgICBjb2xsaWRlID0gY29sbGlkZSB8fCB0aGlzLmNvbGxpZGUobm9kZSwgbm4pOyAvLyBSRUFMIGFyZWEgY29sbGlkZSBmb3Igc3dhcCBhbmQgc2tpcCBpZiBub25lLi4uXHJcbiAgICAgICAgaWYgKCFjb2xsaWRlKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gc3dhcCBjaGVjazogaWYgd2UncmUgYWN0aXZlbHkgbW92aW5nIGluIGdyYXZpdHkgbW9kZSwgc2VlIGlmIHdlIGNvbGxpZGUgd2l0aCBhbiBvYmplY3QgdGhlIHNhbWUgc2l6ZVxyXG4gICAgICAgIGlmIChub2RlLl9tb3ZpbmcgJiYgIW9wdC5uZXN0ZWQgJiYgIXRoaXMuZmxvYXQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3dhcChub2RlLCBjb2xsaWRlKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBkdXJpbmcgd2hpbGUoKSBjb2xsaXNpb25zIE1BS0UgU1VSRSB0byBjaGVjayBlbnRpcmUgcm93IHNvIGxhcmdlciBpdGVtcyBkb24ndCBsZWFwIGZyb2cgc21hbGwgb25lcyAocHVzaCB0aGVtIGFsbCBkb3duIHN0YXJ0aW5nIGxhc3QgaW4gZ3JpZClcclxuICAgICAgICBsZXQgYXJlYSA9IG5uO1xyXG4gICAgICAgIGlmICh0aGlzLl91c2VFbnRpcmVSb3dBcmVhKG5vZGUsIG5uKSkge1xyXG4gICAgICAgICAgICBhcmVhID0geyB4OiAwLCB3OiB0aGlzLmNvbHVtbiwgeTogbm4ueSwgaDogbm4uaCB9O1xyXG4gICAgICAgICAgICBjb2xsaWRlID0gdGhpcy5jb2xsaWRlKG5vZGUsIGFyZWEsIG9wdC5za2lwKTsgLy8gZm9yY2UgbmV3IGhpdFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGlkTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBuZXdPcHQgPSB7IG5lc3RlZDogdHJ1ZSwgcGFjazogZmFsc2UgfTtcclxuICAgICAgICB3aGlsZSAoY29sbGlkZSA9IGNvbGxpZGUgfHwgdGhpcy5jb2xsaWRlKG5vZGUsIGFyZWEsIG9wdC5za2lwKSkgeyAvLyBjb3VsZCBjb2xsaWRlIHdpdGggbW9yZSB0aGFuIDEgaXRlbS4uLiBzbyByZXBlYXQgZm9yIGVhY2hcclxuICAgICAgICAgICAgbGV0IG1vdmVkO1xyXG4gICAgICAgICAgICAvLyBpZiBjb2xsaWRpbmcgd2l0aCBhIGxvY2tlZCBpdGVtIE9SIG1vdmluZyBkb3duIHdpdGggdG9wIGdyYXZpdHkgKGFuZCBjb2xsaWRlIGNvdWxkIG1vdmUgdXApIC0+IHNraXAgcGFzdCB0aGUgY29sbGlkZSxcclxuICAgICAgICAgICAgLy8gYnV0IHJlbWVtYmVyIHRoYXQgc2tpcCBkb3duIHNvIHdlIG9ubHkgZG8gdGhpcyBvbmNlIChhbmQgcHVzaCBvdGhlcnMgb3RoZXJ3aXNlKS5cclxuICAgICAgICAgICAgaWYgKGNvbGxpZGUubG9ja2VkIHx8IG5vZGUuX21vdmluZyAmJiAhbm9kZS5fc2tpcERvd24gJiYgbm4ueSA+IG5vZGUueSAmJiAhdGhpcy5mbG9hdCAmJlxyXG4gICAgICAgICAgICAgICAgLy8gY2FuIHRha2Ugc3BhY2Ugd2UgaGFkLCBvciBiZWZvcmUgd2hlcmUgd2UncmUgZ29pbmdcclxuICAgICAgICAgICAgICAgICghdGhpcy5jb2xsaWRlKGNvbGxpZGUsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY29sbGlkZSksIHsgeTogbm9kZS55IH0pLCBub2RlKSB8fCAhdGhpcy5jb2xsaWRlKGNvbGxpZGUsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY29sbGlkZSksIHsgeTogbm4ueSAtIGNvbGxpZGUuaCB9KSwgbm9kZSkpKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLl9za2lwRG93biA9IChub2RlLl9za2lwRG93biB8fCBubi55ID4gbm9kZS55KTtcclxuICAgICAgICAgICAgICAgIG1vdmVkID0gdGhpcy5tb3ZlTm9kZShub2RlLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbm4pLCB7IHk6IGNvbGxpZGUueSArIGNvbGxpZGUuaCB9KSwgbmV3T3B0KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sbGlkZS5sb2NrZWQgJiYgbW92ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dGlsc18xLlV0aWxzLmNvcHlQb3Mobm4sIG5vZGUpOyAvLyBtb3ZpbmcgYWZ0ZXIgbG9jayBiZWNvbWUgb3VyIG5ldyBkZXNpcmVkIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghY29sbGlkZS5sb2NrZWQgJiYgbW92ZWQgJiYgb3B0LnBhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBtb3ZlZCBhZnRlciBhbmQgd2lsbCBwYWNrOiBkbyBpdCBub3cgYW5kIGtlZXAgdGhlIG9yaWdpbmFsIGRyb3AgbG9jYXRpb24sIGJ1dCBwYXN0IHRoZSBvbGQgY29sbGlkZSB0byBzZWUgd2hhdCBlbHNlIHdlIG1pZ2h0IHB1c2ggd2F5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFja05vZGVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm4ueSA9IGNvbGxpZGUueSArIGNvbGxpZGUuaDtcclxuICAgICAgICAgICAgICAgICAgICB1dGlsc18xLlV0aWxzLmNvcHlQb3Mobm9kZSwgbm4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGlkTW92ZSA9IGRpZE1vdmUgfHwgbW92ZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBtb3ZlIGNvbGxpZGUgZG93biAqYWZ0ZXIqIHdoZXJlIHdlIHdpbGwgYmUsIGlnbm9yaW5nIHdoZXJlIHdlIGFyZSBub3cgKGRvbid0IGNvbGxpZGUgd2l0aCB1cylcclxuICAgICAgICAgICAgICAgIG1vdmVkID0gdGhpcy5tb3ZlTm9kZShjb2xsaWRlLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY29sbGlkZSksIHsgeTogbm4ueSArIG5uLmgsIHNraXA6IG5vZGUgfSksIG5ld09wdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghbW92ZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkaWRNb3ZlO1xyXG4gICAgICAgICAgICB9IC8vIGJyZWFrIGluZiBsb29wIGlmIHdlIGNvdWxkbid0IG1vdmUgYWZ0ZXIgYWxsIChleDogbWF4Um93LCBmaXhlZClcclxuICAgICAgICAgICAgY29sbGlkZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRpZE1vdmU7XHJcbiAgICB9XHJcbiAgICAvKiogcmV0dXJuIHRoZSBub2RlcyB0aGF0IGludGVyY2VwdCB0aGUgZ2l2ZW4gbm9kZS4gT3B0aW9uYWxseSBhIGRpZmZlcmVudCBhcmVhIGNhbiBiZSB1c2VkLCBhcyB3ZWxsIGFzIGEgc2Vjb25kIG5vZGUgdG8gc2tpcCAqL1xyXG4gICAgY29sbGlkZShza2lwLCBhcmVhID0gc2tpcCwgc2tpcDIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5maW5kKG4gPT4gbiAhPT0gc2tpcCAmJiBuICE9PSBza2lwMiAmJiB1dGlsc18xLlV0aWxzLmlzSW50ZXJjZXB0ZWQobiwgYXJlYSkpO1xyXG4gICAgfVxyXG4gICAgY29sbGlkZUFsbChza2lwLCBhcmVhID0gc2tpcCwgc2tpcDIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5maWx0ZXIobiA9PiBuICE9PSBza2lwICYmIG4gIT09IHNraXAyICYmIHV0aWxzXzEuVXRpbHMuaXNJbnRlcmNlcHRlZChuLCBhcmVhKSk7XHJcbiAgICB9XHJcbiAgICAvKiogZG9lcyBhIHBpeGVsIGNvdmVyYWdlIGNvbGxpc2lvbiBiYXNlZCBvbiB3aGVyZSB3ZSBzdGFydGVkLCByZXR1cm5pbmcgdGhlIG5vZGUgdGhhdCBoYXMgdGhlIG1vc3QgY292ZXJhZ2UgdGhhdCBpcyA+NTAlIG1pZCBsaW5lICovXHJcbiAgICBkaXJlY3Rpb25Db2xsaWRlQ292ZXJhZ2Uobm9kZSwgbywgY29sbGlkZXMpIHtcclxuICAgICAgICBpZiAoIW8ucmVjdCB8fCAhbm9kZS5fcmVjdClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCByMCA9IG5vZGUuX3JlY3Q7IC8vIHdoZXJlIHN0YXJ0ZWRcclxuICAgICAgICBsZXQgciA9IE9iamVjdC5hc3NpZ24oe30sIG8ucmVjdCk7IC8vIHdoZXJlIHdlIGFyZVxyXG4gICAgICAgIC8vIHVwZGF0ZSBkcmFnZ2VkIHJlY3QgdG8gc2hvdyB3aGVyZSBpdCdzIGNvbWluZyBmcm9tIChhYm92ZSBvciBiZWxvdywgZXRjLi4uKVxyXG4gICAgICAgIGlmIChyLnkgPiByMC55KSB7XHJcbiAgICAgICAgICAgIHIuaCArPSByLnkgLSByMC55O1xyXG4gICAgICAgICAgICByLnkgPSByMC55O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgci5oICs9IHIwLnkgLSByLnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyLnggPiByMC54KSB7XHJcbiAgICAgICAgICAgIHIudyArPSByLnggLSByMC54O1xyXG4gICAgICAgICAgICByLnggPSByMC54O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgci53ICs9IHIwLnggLSByLng7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb2xsaWRlO1xyXG4gICAgICAgIGNvbGxpZGVzLmZvckVhY2gobiA9PiB7XHJcbiAgICAgICAgICAgIGlmIChuLmxvY2tlZCB8fCAhbi5fcmVjdClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IHIyID0gbi5fcmVjdDsgLy8gb3ZlcmxhcHBpbmcgdGFyZ2V0XHJcbiAgICAgICAgICAgIGxldCB5T3ZlciA9IE51bWJlci5NQVhfVkFMVUUsIHhPdmVyID0gTnVtYmVyLk1BWF9WQUxVRSwgb3Zlck1heCA9IDAuNTsgLy8gbmVlZCA+NTAlXHJcbiAgICAgICAgICAgIC8vIGRlcGVuZGluZyBvbiB3aGljaCBzaWRlIHdlIHN0YXJ0ZWQgZnJvbSwgY29tcHV0ZSB0aGUgb3ZlcmxhcCAlIG9mIGNvdmVyYWdlXHJcbiAgICAgICAgICAgIC8vIChleDogZnJvbSBhYm92ZS9iZWxvdyB3ZSBvbmx5IGNvbXB1dGUgdGhlIG1heCBob3Jpem9udGFsIGxpbmUgY292ZXJhZ2UpXHJcbiAgICAgICAgICAgIGlmIChyMC55IDwgcjIueSkgeyAvLyBmcm9tIGFib3ZlXHJcbiAgICAgICAgICAgICAgICB5T3ZlciA9ICgoci55ICsgci5oKSAtIHIyLnkpIC8gcjIuaDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChyMC55ICsgcjAuaCA+IHIyLnkgKyByMi5oKSB7IC8vIGZyb20gYmVsb3dcclxuICAgICAgICAgICAgICAgIHlPdmVyID0gKChyMi55ICsgcjIuaCkgLSByLnkpIC8gcjIuaDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocjAueCA8IHIyLngpIHsgLy8gZnJvbSB0aGUgbGVmdFxyXG4gICAgICAgICAgICAgICAgeE92ZXIgPSAoKHIueCArIHIudykgLSByMi54KSAvIHIyLnc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAocjAueCArIHIwLncgPiByMi54ICsgcjIudykgeyAvLyBmcm9tIHRoZSByaWdodFxyXG4gICAgICAgICAgICAgICAgeE92ZXIgPSAoKHIyLnggKyByMi53KSAtIHIueCkgLyByMi53O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBvdmVyID0gTWF0aC5taW4oeE92ZXIsIHlPdmVyKTtcclxuICAgICAgICAgICAgaWYgKG92ZXIgPiBvdmVyTWF4KSB7XHJcbiAgICAgICAgICAgICAgICBvdmVyTWF4ID0gb3ZlcjtcclxuICAgICAgICAgICAgICAgIGNvbGxpZGUgPSBuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgby5jb2xsaWRlID0gY29sbGlkZTsgLy8gc2F2ZSBpdCBzbyB3ZSBkb24ndCBoYXZlIHRvIGZpbmQgaXQgYWdhaW5cclxuICAgICAgICByZXR1cm4gY29sbGlkZTtcclxuICAgIH1cclxuICAgIC8qKiBkb2VzIGEgcGl4ZWwgY292ZXJhZ2UgcmV0dXJuaW5nIHRoZSBub2RlIHRoYXQgaGFzIHRoZSBtb3N0IGNvdmVyYWdlIGJ5IGFyZWEgKi9cclxuICAgIC8qXHJcbiAgICBwcm90ZWN0ZWQgY29sbGlkZUNvdmVyYWdlKHI6IEdyaWRTdGFja1Bvc2l0aW9uLCBjb2xsaWRlczogR3JpZFN0YWNrTm9kZVtdKToge2NvbGxpZGU6IEdyaWRTdGFja05vZGUsIG92ZXI6IG51bWJlcn0ge1xyXG4gICAgICBsZXQgY29sbGlkZTogR3JpZFN0YWNrTm9kZTtcclxuICAgICAgbGV0IG92ZXJNYXggPSAwO1xyXG4gICAgICBjb2xsaWRlcy5mb3JFYWNoKG4gPT4ge1xyXG4gICAgICAgIGlmIChuLmxvY2tlZCB8fCAhbi5fcmVjdCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBvdmVyID0gVXRpbHMuYXJlYUludGVyY2VwdChyLCBuLl9yZWN0KTtcclxuICAgICAgICBpZiAob3ZlciA+IG92ZXJNYXgpIHtcclxuICAgICAgICAgIG92ZXJNYXggPSBvdmVyO1xyXG4gICAgICAgICAgY29sbGlkZSA9IG47XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHtjb2xsaWRlLCBvdmVyOiBvdmVyTWF4fTtcclxuICAgIH1cclxuICAgICovXHJcbiAgICAvKiogY2FsbGVkIHRvIGNhY2hlIHRoZSBub2RlcyBwaXhlbCByZWN0YW5nbGVzIHVzZWQgZm9yIGNvbGxpc2lvbiBkZXRlY3Rpb24gZHVyaW5nIGRyYWcgKi9cclxuICAgIGNhY2hlUmVjdHModywgaCwgdG9wLCByaWdodCwgYm90dG9tLCBsZWZ0KSB7XHJcbiAgICAgICAgdGhpcy5ub2Rlcy5mb3JFYWNoKG4gPT4gbi5fcmVjdCA9IHtcclxuICAgICAgICAgICAgeTogbi55ICogaCArIHRvcCxcclxuICAgICAgICAgICAgeDogbi54ICogdyArIGxlZnQsXHJcbiAgICAgICAgICAgIHc6IG4udyAqIHcgLSBsZWZ0IC0gcmlnaHQsXHJcbiAgICAgICAgICAgIGg6IG4uaCAqIGggLSB0b3AgLSBib3R0b21cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKiBjYWxsZWQgdG8gcG9zc2libHkgc3dhcCBiZXR3ZWVuIDIgbm9kZXMgKHNhbWUgc2l6ZSBvciBjb2x1bW4sIG5vdCBsb2NrZWQsIHRvdWNoaW5nKSwgcmV0dXJuaW5nIHRydWUgaWYgc3VjY2Vzc2Z1bCAqL1xyXG4gICAgc3dhcChhLCBiKSB7XHJcbiAgICAgICAgaWYgKCFiIHx8IGIubG9ja2VkIHx8ICFhIHx8IGEubG9ja2VkKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZnVuY3Rpb24gX2RvU3dhcCgpIHtcclxuICAgICAgICAgICAgbGV0IHggPSBiLngsIHkgPSBiLnk7XHJcbiAgICAgICAgICAgIGIueCA9IGEueDtcclxuICAgICAgICAgICAgYi55ID0gYS55OyAvLyBiIC0+IGEgcG9zaXRpb25cclxuICAgICAgICAgICAgaWYgKGEuaCAhPSBiLmgpIHtcclxuICAgICAgICAgICAgICAgIGEueCA9IHg7XHJcbiAgICAgICAgICAgICAgICBhLnkgPSBiLnkgKyBiLmg7IC8vIGEgLT4gZ29lcyBhZnRlciBiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYS53ICE9IGIudykge1xyXG4gICAgICAgICAgICAgICAgYS54ID0gYi54ICsgYi53O1xyXG4gICAgICAgICAgICAgICAgYS55ID0geTsgLy8gYSAtPiBnb2VzIGFmdGVyIGJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGEueCA9IHg7XHJcbiAgICAgICAgICAgICAgICBhLnkgPSB5OyAvLyBhIC0+IG9sZCBiIHBvc2l0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYS5fZGlydHkgPSBiLl9kaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdG91Y2hpbmc7IC8vIHJlbWVtYmVyIGlmIHdlIGNhbGxlZCBpdCAodnMgdW5kZWZpbmVkKVxyXG4gICAgICAgIC8vIHNhbWUgc2l6ZSBhbmQgc2FtZSByb3cgb3IgY29sdW1uLCBhbmQgdG91Y2hpbmdcclxuICAgICAgICBpZiAoYS53ID09PSBiLncgJiYgYS5oID09PSBiLmggJiYgKGEueCA9PT0gYi54IHx8IGEueSA9PT0gYi55KSAmJiAodG91Y2hpbmcgPSB1dGlsc18xLlV0aWxzLmlzVG91Y2hpbmcoYSwgYikpKVxyXG4gICAgICAgICAgICByZXR1cm4gX2RvU3dhcCgpO1xyXG4gICAgICAgIGlmICh0b3VjaGluZyA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHJldHVybjsgLy8gSUZGIHJhbiB0ZXN0IGFuZCBmYWlsLCBiYWlsIG91dFxyXG4gICAgICAgIC8vIGNoZWNrIGZvciB0YWtpbmcgc2FtZSBjb2x1bW5zIChidXQgZGlmZmVyZW50IGhlaWdodCkgYW5kIHRvdWNoaW5nXHJcbiAgICAgICAgaWYgKGEudyA9PT0gYi53ICYmIGEueCA9PT0gYi54ICYmICh0b3VjaGluZyB8fCAodG91Y2hpbmcgPSB1dGlsc18xLlV0aWxzLmlzVG91Y2hpbmcoYSwgYikpKSkge1xyXG4gICAgICAgICAgICBpZiAoYi55IDwgYS55KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdCA9IGE7XHJcbiAgICAgICAgICAgICAgICBhID0gYjtcclxuICAgICAgICAgICAgICAgIGIgPSB0O1xyXG4gICAgICAgICAgICB9IC8vIHN3YXAgYSA8LT4gYiB2YXJzIHNvIGEgaXMgZmlyc3RcclxuICAgICAgICAgICAgcmV0dXJuIF9kb1N3YXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRvdWNoaW5nID09PSBmYWxzZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRha2luZyBzYW1lIHJvdyAoYnV0IGRpZmZlcmVudCB3aWR0aCkgYW5kIHRvdWNoaW5nXHJcbiAgICAgICAgaWYgKGEuaCA9PT0gYi5oICYmIGEueSA9PT0gYi55ICYmICh0b3VjaGluZyB8fCAodG91Y2hpbmcgPSB1dGlsc18xLlV0aWxzLmlzVG91Y2hpbmcoYSwgYikpKSkge1xyXG4gICAgICAgICAgICBpZiAoYi54IDwgYS54KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdCA9IGE7XHJcbiAgICAgICAgICAgICAgICBhID0gYjtcclxuICAgICAgICAgICAgICAgIGIgPSB0O1xyXG4gICAgICAgICAgICB9IC8vIHN3YXAgYSA8LT4gYiB2YXJzIHNvIGEgaXMgZmlyc3RcclxuICAgICAgICAgICAgcmV0dXJuIF9kb1N3YXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNBcmVhRW1wdHkoeCwgeSwgdywgaCkge1xyXG4gICAgICAgIGxldCBubiA9IHsgeDogeCB8fCAwLCB5OiB5IHx8IDAsIHc6IHcgfHwgMSwgaDogaCB8fCAxIH07XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmNvbGxpZGUobm4pO1xyXG4gICAgfVxyXG4gICAgLyoqIHJlLWxheW91dCBncmlkIGl0ZW1zIHRvIHJlY2xhaW0gYW55IGVtcHR5IHNwYWNlICovXHJcbiAgICBjb21wYWN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGVzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgdGhpcy5iYXRjaFVwZGF0ZSgpXHJcbiAgICAgICAgICAgIC5zb3J0Tm9kZXMoKTtcclxuICAgICAgICBsZXQgY29weU5vZGVzID0gdGhpcy5ub2RlcztcclxuICAgICAgICB0aGlzLm5vZGVzID0gW107IC8vIHByZXRlbmQgd2UgaGF2ZSBubyBub2RlcyB0byBjb25mbGljdCBsYXlvdXQgdG8gc3RhcnQgd2l0aC4uLlxyXG4gICAgICAgIGNvcHlOb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUubG9ja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmF1dG9Qb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hZGROb2RlKG5vZGUsIGZhbHNlKTsgLy8gJ2ZhbHNlJyBmb3IgYWRkIGV2ZW50IHRyaWdnZXJcclxuICAgICAgICAgICAgbm9kZS5fZGlydHkgPSB0cnVlOyAvLyB3aWxsIGZvcmNlIGF0dHIgdXBkYXRlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmF0Y2hVcGRhdGUoZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgLyoqIGVuYWJsZS9kaXNhYmxlIGZsb2F0aW5nIHdpZGdldHMgKGRlZmF1bHQ6IGBmYWxzZWApIFNlZSBbZXhhbXBsZV0oaHR0cDovL2dyaWRzdGFja2pzLmNvbS9kZW1vL2Zsb2F0Lmh0bWwpICovXHJcbiAgICBzZXQgZmxvYXQodmFsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Zsb2F0ID09PSB2YWwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl9mbG9hdCA9IHZhbCB8fCBmYWxzZTtcclxuICAgICAgICBpZiAoIXZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wYWNrTm9kZXMoKS5fbm90aWZ5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqIGZsb2F0IGdldHRlciBtZXRob2QgKi9cclxuICAgIGdldCBmbG9hdCgpIHsgcmV0dXJuIHRoaXMuX2Zsb2F0IHx8IGZhbHNlOyB9XHJcbiAgICAvKiogc29ydCB0aGUgbm9kZXMgYXJyYXkgZnJvbSBmaXJzdCB0byBsYXN0LCBvciByZXZlcnNlLiBDYWxsZWQgZHVyaW5nIGNvbGxpc2lvbi9wbGFjZW1lbnQgdG8gZm9yY2UgYW4gb3JkZXIgKi9cclxuICAgIHNvcnROb2RlcyhkaXIpIHtcclxuICAgICAgICB0aGlzLm5vZGVzID0gdXRpbHNfMS5VdGlscy5zb3J0KHRoaXMubm9kZXMsIGRpciwgdGhpcy5jb2x1bW4pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCBjYWxsZWQgdG8gdG9wIGdyYXZpdHkgcGFjayB0aGUgaXRlbXMgYmFjayBPUiByZXZlcnQgYmFjayB0byBvcmlnaW5hbCBZIHBvc2l0aW9ucyB3aGVuIGZsb2F0aW5nICovXHJcbiAgICBfcGFja05vZGVzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmJhdGNoTW9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zb3J0Tm9kZXMoKTsgLy8gZmlyc3QgdG8gbGFzdFxyXG4gICAgICAgIGlmICh0aGlzLmZsb2F0KSB7XHJcbiAgICAgICAgICAgIC8vIHJlc3RvcmUgb3JpZ2luYWwgWSBwb3NcclxuICAgICAgICAgICAgdGhpcy5ub2Rlcy5mb3JFYWNoKG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG4uX3VwZGF0aW5nIHx8IG4uX29yaWcgPT09IHVuZGVmaW5lZCB8fCBuLnkgPT09IG4uX29yaWcueSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3WSA9IG4ueTtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChuZXdZID4gbi5fb3JpZy55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLS1uZXdZO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlID0gdGhpcy5jb2xsaWRlKG4sIHsgeDogbi54LCB5OiBuZXdZLCB3OiBuLncsIGg6IG4uaCB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbGxpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbi5fZGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuLnkgPSBuZXdZO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB0b3AgZ3Jhdml0eSBwYWNrXHJcbiAgICAgICAgICAgIHRoaXMubm9kZXMuZm9yRWFjaCgobiwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG4ubG9ja2VkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChuLnkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1kgPSBpID09PSAwID8gMCA6IG4ueSAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhbkJlTW92ZWQgPSBpID09PSAwIHx8ICF0aGlzLmNvbGxpZGUobiwgeyB4OiBuLngsIHk6IG5ld1ksIHc6IG4udywgaDogbi5oIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuQmVNb3ZlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTm90ZTogbXVzdCBiZSBkaXJ0eSAoZnJvbSBsYXN0IHBvc2l0aW9uKSBmb3IgR3JpZFN0YWNrOjpPbkNoYW5nZSBDQiB0byB1cGRhdGUgcG9zaXRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIG1vdmUgaXRlbXMgYmFjay4gVGhlIHVzZXIgJ2NoYW5nZScgQ0Igc2hvdWxkIGRldGVjdCBjaGFuZ2VzIGZyb20gdGhlIG9yaWdpbmFsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnRpbmcgcG9zaXRpb24gaW5zdGVhZC5cclxuICAgICAgICAgICAgICAgICAgICBuLl9kaXJ0eSA9IChuLnkgIT09IG5ld1kpO1xyXG4gICAgICAgICAgICAgICAgICAgIG4ueSA9IG5ld1k7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogZ2l2ZW4gYSByYW5kb20gbm9kZSwgbWFrZXMgc3VyZSBpdCdzIGNvb3JkaW5hdGVzL3ZhbHVlcyBhcmUgdmFsaWQgaW4gdGhlIGN1cnJlbnQgZ3JpZFxyXG4gICAgICogQHBhcmFtIG5vZGUgdG8gYWRqdXN0XHJcbiAgICAgKiBAcGFyYW0gcmVzaXppbmcgaWYgb3V0IG9mIGJvdW5kLCByZXNpemUgZG93biBvciBtb3ZlIGludG8gdGhlIGdyaWQgdG8gZml0ID9cclxuICAgICAqL1xyXG4gICAgcHJlcGFyZU5vZGUobm9kZSwgcmVzaXppbmcpIHtcclxuICAgICAgICBub2RlID0gbm9kZSB8fCB7fTtcclxuICAgICAgICBub2RlLl9pZCA9IG5vZGUuX2lkIHx8IEdyaWRTdGFja0VuZ2luZS5faWRTZXErKztcclxuICAgICAgICAvLyBpZiB3ZSdyZSBtaXNzaW5nIHBvc2l0aW9uLCBoYXZlIHRoZSBncmlkIHBvc2l0aW9uIHVzIGF1dG9tYXRpY2FsbHkgKGJlZm9yZSB3ZSBzZXQgdGhlbSB0byAwLDApXHJcbiAgICAgICAgaWYgKG5vZGUueCA9PT0gdW5kZWZpbmVkIHx8IG5vZGUueSA9PT0gdW5kZWZpbmVkIHx8IG5vZGUueCA9PT0gbnVsbCB8fCBub2RlLnkgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgbm9kZS5hdXRvUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBhc3NpZ24gZGVmYXVsdHMgZm9yIG1pc3NpbmcgcmVxdWlyZWQgZmllbGRzXHJcbiAgICAgICAgbGV0IGRlZmF1bHRzID0geyB4OiAwLCB5OiAwLCB3OiAxLCBoOiAxIH07XHJcbiAgICAgICAgdXRpbHNfMS5VdGlscy5kZWZhdWx0cyhub2RlLCBkZWZhdWx0cyk7XHJcbiAgICAgICAgaWYgKCFub2RlLmF1dG9Qb3NpdGlvbikge1xyXG4gICAgICAgICAgICBkZWxldGUgbm9kZS5hdXRvUG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbm9kZS5ub1Jlc2l6ZSkge1xyXG4gICAgICAgICAgICBkZWxldGUgbm9kZS5ub1Jlc2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFub2RlLm5vTW92ZSkge1xyXG4gICAgICAgICAgICBkZWxldGUgbm9kZS5ub01vdmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNoZWNrIGZvciBOYU4gKGluIGNhc2UgbWVzc2VkIHVwIHN0cmluZ3Mgd2VyZSBwYXNzZWQuIGNhbid0IGRvIHBhcnNlSW50KCkgfHwgZGVmYXVsdHMueCBhYm92ZSBhcyAwIGlzIHZhbGlkICMpXHJcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlLnggPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgbm9kZS54ID0gTnVtYmVyKG5vZGUueCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZS55ID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIG5vZGUueSA9IE51bWJlcihub2RlLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIG5vZGUudyA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBub2RlLncgPSBOdW1iZXIobm9kZS53KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlLmggPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgbm9kZS5oID0gTnVtYmVyKG5vZGUuaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc05hTihub2RlLngpKSB7XHJcbiAgICAgICAgICAgIG5vZGUueCA9IGRlZmF1bHRzLng7XHJcbiAgICAgICAgICAgIG5vZGUuYXV0b1Bvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzTmFOKG5vZGUueSkpIHtcclxuICAgICAgICAgICAgbm9kZS55ID0gZGVmYXVsdHMueTtcclxuICAgICAgICAgICAgbm9kZS5hdXRvUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNOYU4obm9kZS53KSkge1xyXG4gICAgICAgICAgICBub2RlLncgPSBkZWZhdWx0cy53O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNOYU4obm9kZS5oKSkge1xyXG4gICAgICAgICAgICBub2RlLmggPSBkZWZhdWx0cy5oO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5ub2RlQm91bmRGaXgobm9kZSwgcmVzaXppbmcpO1xyXG4gICAgfVxyXG4gICAgLyoqIHBhcnQyIG9mIHByZXBhcmluZyBhIG5vZGUgdG8gZml0IGluc2lkZSBvdXIgZ3JpZCAtIGNoZWNrcyBmb3IgeCx5LHcgZnJvbSBncmlkIGRpbWVuc2lvbnMgKi9cclxuICAgIG5vZGVCb3VuZEZpeChub2RlLCByZXNpemluZykge1xyXG4gICAgICAgIGxldCBiZWZvcmUgPSBub2RlLl9vcmlnIHx8IHV0aWxzXzEuVXRpbHMuY29weVBvcyh7fSwgbm9kZSk7XHJcbiAgICAgICAgaWYgKG5vZGUubWF4Vykge1xyXG4gICAgICAgICAgICBub2RlLncgPSBNYXRoLm1pbihub2RlLncsIG5vZGUubWF4Vyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLm1heEgpIHtcclxuICAgICAgICAgICAgbm9kZS5oID0gTWF0aC5taW4obm9kZS5oLCBub2RlLm1heEgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9kZS5taW5XICYmIG5vZGUubWluVyA8PSB0aGlzLmNvbHVtbikge1xyXG4gICAgICAgICAgICBub2RlLncgPSBNYXRoLm1heChub2RlLncsIG5vZGUubWluVyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLm1pbkgpIHtcclxuICAgICAgICAgICAgbm9kZS5oID0gTWF0aC5tYXgobm9kZS5oLCBub2RlLm1pbkgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiB1c2VyIGxvYWRlZCBhIGxhcmdlciB0aGFuIGFsbG93ZWQgd2lkZ2V0IGZvciBjdXJyZW50ICMgb2YgY29sdW1ucyAob3IgZm9yY2UgMSBjb2x1bW4gbW9kZSksXHJcbiAgICAgICAgLy8gcmVtZW1iZXIgaXQncyBwb3NpdGlvbiAmIHdpZHRoIHNvIHdlIGNhbiByZXN0b3JlIGJhY2sgKDEgLT4gMTIgY29sdW1uKSAjMTY1NSAjMTk4NVxyXG4gICAgICAgIC8vIElGRiB3ZSdyZSBub3QgaW4gdGhlIG1pZGRsZSBvZiBjb2x1bW4gcmVzaXppbmchXHJcbiAgICAgICAgY29uc3Qgc2F2ZU9yaWcgPSB0aGlzLmNvbHVtbiA9PT0gMSB8fCBub2RlLnggKyBub2RlLncgPiB0aGlzLmNvbHVtbjtcclxuICAgICAgICBpZiAoc2F2ZU9yaWcgJiYgdGhpcy5jb2x1bW4gPCAxMiAmJiAhdGhpcy5faW5Db2x1bW5SZXNpemUgJiYgbm9kZS5faWQgJiYgdGhpcy5maW5kQ2FjaGVMYXlvdXQobm9kZSwgMTIpID09PSAtMSkge1xyXG4gICAgICAgICAgICBsZXQgY29weSA9IE9iamVjdC5hc3NpZ24oe30sIG5vZGUpOyAvLyBuZWVkIF9pZCArIHBvc2l0aW9uc1xyXG4gICAgICAgICAgICBpZiAoY29weS5hdXRvUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb3B5Lng7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29weS55O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGNvcHkueCA9IE1hdGgubWluKDExLCBjb3B5LngpO1xyXG4gICAgICAgICAgICBjb3B5LncgPSBNYXRoLm1pbigxMiwgY29weS53KTtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZU9uZUxheW91dChjb3B5LCAxMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLncgPiB0aGlzLmNvbHVtbikge1xyXG4gICAgICAgICAgICBub2RlLncgPSB0aGlzLmNvbHVtbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobm9kZS53IDwgMSkge1xyXG4gICAgICAgICAgICBub2RlLncgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tYXhSb3cgJiYgbm9kZS5oID4gdGhpcy5tYXhSb3cpIHtcclxuICAgICAgICAgICAgbm9kZS5oID0gdGhpcy5tYXhSb3c7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG5vZGUuaCA8IDEpIHtcclxuICAgICAgICAgICAgbm9kZS5oID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUueCA8IDApIHtcclxuICAgICAgICAgICAgbm9kZS54ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUueSA8IDApIHtcclxuICAgICAgICAgICAgbm9kZS55ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUueCArIG5vZGUudyA+IHRoaXMuY29sdW1uKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNpemluZykge1xyXG4gICAgICAgICAgICAgICAgbm9kZS53ID0gdGhpcy5jb2x1bW4gLSBub2RlLng7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnggPSB0aGlzLmNvbHVtbiAtIG5vZGUudztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tYXhSb3cgJiYgbm9kZS55ICsgbm9kZS5oID4gdGhpcy5tYXhSb3cpIHtcclxuICAgICAgICAgICAgaWYgKHJlc2l6aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmggPSB0aGlzLm1heFJvdyAtIG5vZGUueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGUueSA9IHRoaXMubWF4Um93IC0gbm9kZS5oO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdXRpbHNfMS5VdGlscy5zYW1lUG9zKG5vZGUsIGJlZm9yZSkpIHtcclxuICAgICAgICAgICAgbm9kZS5fZGlydHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIC8qKiByZXR1cm5zIGEgbGlzdCBvZiBtb2RpZmllZCBub2RlcyBmcm9tIHRoZWlyIG9yaWdpbmFsIHZhbHVlcyAqL1xyXG4gICAgZ2V0RGlydHlOb2Rlcyh2ZXJpZnkpIHtcclxuICAgICAgICAvLyBjb21wYXJlIG9yaWdpbmFsIHgseSx3LGggaW5zdGVhZCBhcyBfZGlydHkgY2FuIGJlIGEgdGVtcG9yYXJ5IHN0YXRlXHJcbiAgICAgICAgaWYgKHZlcmlmeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5maWx0ZXIobiA9PiBuLl9kaXJ0eSAmJiAhdXRpbHNfMS5VdGlscy5zYW1lUG9zKG4sIG4uX29yaWcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMuZmlsdGVyKG4gPT4gbi5fZGlydHkpO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCBjYWxsIHRoaXMgdG8gY2FsbCBvbkNoYW5nZSBjYWxsYmFjayB3aXRoIGRpcnR5IG5vZGVzIHNvIERPTSBjYW4gYmUgdXBkYXRlZCAqL1xyXG4gICAgX25vdGlmeShyZW1vdmVkTm9kZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5iYXRjaE1vZGUgfHwgIXRoaXMub25DaGFuZ2UpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIGxldCBkaXJ0eU5vZGVzID0gKHJlbW92ZWROb2RlcyB8fCBbXSkuY29uY2F0KHRoaXMuZ2V0RGlydHlOb2RlcygpKTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKGRpcnR5Tm9kZXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCByZW1vdmUgZGlydHkgYW5kIGxhc3QgdHJpZWQgaW5mbyAqL1xyXG4gICAgY2xlYW5Ob2RlcygpIHtcclxuICAgICAgICBpZiAodGhpcy5iYXRjaE1vZGUpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZXMuZm9yRWFjaChuID0+IHtcclxuICAgICAgICAgICAgZGVsZXRlIG4uX2RpcnR5O1xyXG4gICAgICAgICAgICBkZWxldGUgbi5fbGFzdFRyaWVkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCBjYWxsZWQgdG8gc2F2ZSBpbml0aWFsIHBvc2l0aW9uL3NpemUgdG8gdHJhY2sgcmVhbCBkaXJ0eSBzdGF0ZS5cclxuICAgICAqIE5vdGU6IHNob3VsZCBiZSBjYWxsZWQgcmlnaHQgYWZ0ZXIgd2UgY2FsbCBjaGFuZ2UgZXZlbnQgKHNvIG5leHQgQVBJIGlzIGNhbiBkZXRlY3QgY2hhbmdlcylcclxuICAgICAqIGFzIHdlbGwgYXMgcmlnaHQgYmVmb3JlIHdlIHN0YXJ0IG1vdmUvcmVzaXplL2VudGVyIChzbyB3ZSBjYW4gcmVzdG9yZSBpdGVtcyB0byBwcmV2IHZhbHVlcykgKi9cclxuICAgIHNhdmVJbml0aWFsKCkge1xyXG4gICAgICAgIHRoaXMubm9kZXMuZm9yRWFjaChuID0+IHtcclxuICAgICAgICAgICAgbi5fb3JpZyA9IHV0aWxzXzEuVXRpbHMuY29weVBvcyh7fSwgbik7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBuLl9kaXJ0eTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9oYXNMb2NrZWQgPSB0aGlzLm5vZGVzLnNvbWUobiA9PiBuLmxvY2tlZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIHJlc3RvcmUgYWxsIHRoZSBub2RlcyBiYWNrIHRvIGluaXRpYWwgdmFsdWVzIChjYWxsZWQgd2hlbiB3ZSBsZWF2ZSkgKi9cclxuICAgIHJlc3RvcmVJbml0aWFsKCkge1xyXG4gICAgICAgIHRoaXMubm9kZXMuZm9yRWFjaChuID0+IHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzXzEuVXRpbHMuc2FtZVBvcyhuLCBuLl9vcmlnKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdXRpbHNfMS5VdGlscy5jb3B5UG9zKG4sIG4uX29yaWcpO1xyXG4gICAgICAgICAgICBuLl9kaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbm90aWZ5KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogZmluZCB0aGUgZmlyc3QgYXZhaWxhYmxlIGVtcHR5IHNwb3QgZm9yIHRoZSBnaXZlbiBub2RlIHdpZHRoL2hlaWdodCwgdXBkYXRpbmcgdGhlIHgseSBhdHRyaWJ1dGVzLiByZXR1cm4gdHJ1ZSBpZiBmb3VuZC5cclxuICAgICAqIG9wdGlvbmFsbHkgeW91IGNhbiBwYXNzIHlvdXIgb3duIGV4aXN0aW5nIG5vZGUgbGlzdCBhbmQgY29sdW1uIGNvdW50LCBvdGhlcndpc2UgZGVmYXVsdHMgdG8gdGhhdCBlbmdpbmUgZGF0YS5cclxuICAgICAqL1xyXG4gICAgZmluZEVtcHR5UG9zaXRpb24obm9kZSwgbm9kZUxpc3QgPSB0aGlzLm5vZGVzLCBjb2x1bW4gPSB0aGlzLmNvbHVtbikge1xyXG4gICAgICAgIG5vZGVMaXN0ID0gdXRpbHNfMS5VdGlscy5zb3J0KG5vZGVMaXN0LCAtMSwgY29sdW1uKTtcclxuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgIWZvdW5kOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IHggPSBpICUgY29sdW1uO1xyXG4gICAgICAgICAgICBsZXQgeSA9IE1hdGguZmxvb3IoaSAvIGNvbHVtbik7XHJcbiAgICAgICAgICAgIGlmICh4ICsgbm9kZS53ID4gY29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYm94ID0geyB4LCB5LCB3OiBub2RlLncsIGg6IG5vZGUuaCB9O1xyXG4gICAgICAgICAgICBpZiAoIW5vZGVMaXN0LmZpbmQobiA9PiB1dGlsc18xLlV0aWxzLmlzSW50ZXJjZXB0ZWQoYm94LCBuKSkpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUueCA9IHg7XHJcbiAgICAgICAgICAgICAgICBub2RlLnkgPSB5O1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG5vZGUuYXV0b1Bvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuICAgIC8qKiBjYWxsIHRvIGFkZCB0aGUgZ2l2ZW4gbm9kZSB0byBvdXIgbGlzdCwgZml4aW5nIGNvbGxpc2lvbiBhbmQgcmUtcGFja2luZyAqL1xyXG4gICAgYWRkTm9kZShub2RlLCB0cmlnZ2VyQWRkRXZlbnQgPSBmYWxzZSkge1xyXG4gICAgICAgIGxldCBkdXAgPSB0aGlzLm5vZGVzLmZpbmQobiA9PiBuLl9pZCA9PT0gbm9kZS5faWQpO1xyXG4gICAgICAgIGlmIChkdXApXHJcbiAgICAgICAgICAgIHJldHVybiBkdXA7IC8vIHByZXZlbnQgaW5zZXJ0aW5nIHR3aWNlISByZXR1cm4gaXQgaW5zdGVhZC5cclxuICAgICAgICAvLyBza2lwIHByZXBhcmVOb2RlIGlmIHdlJ3JlIGluIG1pZGRsZSBvZiBjb2x1bW4gcmVzaXplIChub3QgbmV3KSBidXQgZG8gY2hlY2sgZm9yIGJvdW5kcyFcclxuICAgICAgICBub2RlID0gdGhpcy5faW5Db2x1bW5SZXNpemUgPyB0aGlzLm5vZGVCb3VuZEZpeChub2RlKSA6IHRoaXMucHJlcGFyZU5vZGUobm9kZSk7XHJcbiAgICAgICAgZGVsZXRlIG5vZGUuX3RlbXBvcmFyeVJlbW92ZWQ7XHJcbiAgICAgICAgZGVsZXRlIG5vZGUuX3JlbW92ZURPTTtcclxuICAgICAgICBpZiAobm9kZS5hdXRvUG9zaXRpb24gJiYgdGhpcy5maW5kRW1wdHlQb3NpdGlvbihub2RlKSkge1xyXG4gICAgICAgICAgICBkZWxldGUgbm9kZS5hdXRvUG9zaXRpb247IC8vIGZvdW5kIG91ciBzbG90XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICBpZiAodHJpZ2dlckFkZEV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkZWROb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9maXhDb2xsaXNpb25zKG5vZGUpO1xyXG4gICAgICAgIGlmICghdGhpcy5iYXRjaE1vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFja05vZGVzKCkuX25vdGlmeSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIHJlbW92ZU5vZGUobm9kZSwgcmVtb3ZlRE9NID0gdHJ1ZSwgdHJpZ2dlckV2ZW50ID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoIXRoaXMubm9kZXMuZmluZChuID0+IG4gPT09IG5vZGUpKSB7XHJcbiAgICAgICAgICAgIC8vIFRFU1QgY29uc29sZS5sb2coYEVycm9yOiBHcmlkU3RhY2tFbmdpbmUucmVtb3ZlTm9kZSgpIG5vZGUuX2lkPSR7bm9kZS5faWR9IG5vdCBmb3VuZCFgKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRyaWdnZXJFdmVudCkgeyAvLyB3ZSB3YWl0IHVudGlsIGZpbmFsIGRyb3AgdG8gbWFudWFsbHkgdHJhY2sgcmVtb3ZlZCBpdGVtcyAocmF0aGVyIHRoYW4gZHVyaW5nIGRyYWcpXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlZE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZW1vdmVET00pXHJcbiAgICAgICAgICAgIG5vZGUuX3JlbW92ZURPTSA9IHRydWU7IC8vIGxldCBDQiByZW1vdmUgYWN0dWFsIEhUTUwgKHVzZWQgdG8gc2V0IF9pZCB0byBudWxsLCBidXQgdGhlbiB3ZSBsb29zZSBsYXlvdXQgaW5mbylcclxuICAgICAgICAvLyBkb24ndCB1c2UgJ2Zhc3RlcicgLnNwbGljZShmaW5kSW5kZXgoKSwxKSBpbiBjYXNlIG5vZGUgaXNuJ3QgaW4gb3VyIGxpc3QsIG9yIGluIG11bHRpcGxlIHRpbWVzLlxyXG4gICAgICAgIHRoaXMubm9kZXMgPSB0aGlzLm5vZGVzLmZpbHRlcihuID0+IG4gIT09IG5vZGUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYWNrTm9kZXMoKVxyXG4gICAgICAgICAgICAuX25vdGlmeShbbm9kZV0pO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlQWxsKHJlbW92ZURPTSA9IHRydWUpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5fbGF5b3V0cztcclxuICAgICAgICBpZiAodGhpcy5ub2Rlcy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIHJlbW92ZURPTSAmJiB0aGlzLm5vZGVzLmZvckVhY2gobiA9PiBuLl9yZW1vdmVET00gPSB0cnVlKTsgLy8gbGV0IENCIHJlbW92ZSBhY3R1YWwgSFRNTCAodXNlZCB0byBzZXQgX2lkIHRvIG51bGwsIGJ1dCB0aGVuIHdlIGxvb3NlIGxheW91dCBpbmZvKVxyXG4gICAgICAgIHRoaXMucmVtb3ZlZE5vZGVzID0gdGhpcy5ub2RlcztcclxuICAgICAgICB0aGlzLm5vZGVzID0gW107XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vdGlmeSh0aGlzLnJlbW92ZWROb2Rlcyk7XHJcbiAgICB9XHJcbiAgICAvKiogY2hlY2tzIGlmIGl0ZW0gY2FuIGJlIG1vdmVkIChsYXlvdXQgY29uc3RyYWluKSB2cyBtb3ZlTm9kZSgpLCByZXR1cm5pbmcgdHJ1ZSBpZiB3YXMgYWJsZSB0byBtb3ZlLlxyXG4gICAgICogSW4gbW9yZSBjb21wbGljYXRlZCBjYXNlcyAobWF4Um93KSBpdCB3aWxsIGF0dGVtcHQgYXQgbW92aW5nIHRoZSBpdGVtIGFuZCBmaXhpbmdcclxuICAgICAqIG90aGVycyBpbiBhIGNsb25lIGZpcnN0LCB0aGVuIGFwcGx5IHRob3NlIGNoYW5nZXMgaWYgc3RpbGwgd2l0aGluIHNwZWNzLiAqL1xyXG4gICAgbW92ZU5vZGVDaGVjayhub2RlLCBvKSB7XHJcbiAgICAgICAgLy8gaWYgKG5vZGUubG9ja2VkKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoYW5nZWRQb3NDb25zdHJhaW4obm9kZSwgbykpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBvLnBhY2sgPSB0cnVlO1xyXG4gICAgICAgIC8vIHNpbXBsZXIgY2FzZTogbW92ZSBpdGVtIGRpcmVjdGx5Li4uXHJcbiAgICAgICAgaWYgKCF0aGlzLm1heFJvdykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3ZlTm9kZShub2RlLCBvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29tcGxleCBjYXNlOiBjcmVhdGUgYSBjbG9uZSB3aXRoIE5PIG1heFJvdyAod2lsbCBjaGVjayBmb3Igb3V0IG9mIGJvdW5kcyBhdCB0aGUgZW5kKVxyXG4gICAgICAgIGxldCBjbG9uZWROb2RlO1xyXG4gICAgICAgIGxldCBjbG9uZSA9IG5ldyBHcmlkU3RhY2tFbmdpbmUoe1xyXG4gICAgICAgICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxyXG4gICAgICAgICAgICBmbG9hdDogdGhpcy5mbG9hdCxcclxuICAgICAgICAgICAgbm9kZXM6IHRoaXMubm9kZXMubWFwKG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG4gPT09IG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbG9uZWROb2RlID0gT2JqZWN0LmFzc2lnbih7fSwgbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsb25lZE5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFjbG9uZWROb2RlKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgd2UncmUgY292ZXJpbmcgNTAlIGNvbGxpc2lvbiBhbmQgY291bGQgbW92ZVxyXG4gICAgICAgIGxldCBjYW5Nb3ZlID0gY2xvbmUubW92ZU5vZGUoY2xvbmVkTm9kZSwgbykgJiYgY2xvbmUuZ2V0Um93KCkgPD0gdGhpcy5tYXhSb3c7XHJcbiAgICAgICAgLy8gZWxzZSBjaGVjayBpZiB3ZSBjYW4gZm9yY2UgYSBzd2FwIChmbG9hdD10cnVlLCBvciBkaWZmZXJlbnQgc2hhcGVzKSBvbiBub24tcmVzaXplXHJcbiAgICAgICAgaWYgKCFjYW5Nb3ZlICYmICFvLnJlc2l6aW5nICYmIG8uY29sbGlkZSkge1xyXG4gICAgICAgICAgICBsZXQgY29sbGlkZSA9IG8uY29sbGlkZS5lbC5ncmlkc3RhY2tOb2RlOyAvLyBmaW5kIHRoZSBzb3VyY2Ugbm9kZSB0aGUgY2xvbmUgY29sbGlkZWQgd2l0aCBhdCA1MCVcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3dhcChub2RlLCBjb2xsaWRlKSkgeyAvLyBzd2FwcyBhbmQgbWFyayBkaXJ0eVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm90aWZ5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNhbk1vdmUpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyBpZiBjbG9uZSB3YXMgYWJsZSB0byBtb3ZlLCBjb3B5IHRob3NlIG1vZHMgb3ZlciB0byB1cyBub3cgaW5zdGVhZCBvZiBjYWxsZXIgdHJ5aW5nIHRvIGRvIHRoaXMgYWxsIG92ZXIhXHJcbiAgICAgICAgLy8gTm90ZTogd2UgY2FuJ3QgdXNlIHRoZSBsaXN0IGRpcmVjdGx5IGFzIGVsZW1lbnRzIGFuZCBvdGhlciBwYXJ0cyBwb2ludCB0byBhY3R1YWwgbm9kZSwgc28gY29weSBjb250ZW50XHJcbiAgICAgICAgY2xvbmUubm9kZXMuZmlsdGVyKG4gPT4gbi5fZGlydHkpLmZvckVhY2goYyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuID0gdGhpcy5ub2Rlcy5maW5kKGEgPT4gYS5faWQgPT09IGMuX2lkKTtcclxuICAgICAgICAgICAgaWYgKCFuKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB1dGlsc18xLlV0aWxzLmNvcHlQb3MobiwgYyk7XHJcbiAgICAgICAgICAgIG4uX2RpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9ub3RpZnkoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKiByZXR1cm4gdHJ1ZSBpZiBjYW4gZml0IGluIGdyaWQgaGVpZ2h0IGNvbnN0cmFpbiBvbmx5IChhbHdheXMgdHJ1ZSBpZiBubyBtYXhSb3cpICovXHJcbiAgICB3aWxsSXRGaXQobm9kZSkge1xyXG4gICAgICAgIGRlbGV0ZSBub2RlLl93aWxsRml0UG9zO1xyXG4gICAgICAgIGlmICghdGhpcy5tYXhSb3cpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vIGNyZWF0ZSBhIGNsb25lIHdpdGggTk8gbWF4Um93IGFuZCBjaGVjayBpZiBzdGlsbCB3aXRoaW4gc2l6ZVxyXG4gICAgICAgIGxldCBjbG9uZSA9IG5ldyBHcmlkU3RhY2tFbmdpbmUoe1xyXG4gICAgICAgICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxyXG4gICAgICAgICAgICBmbG9hdDogdGhpcy5mbG9hdCxcclxuICAgICAgICAgICAgbm9kZXM6IHRoaXMubm9kZXMubWFwKG4gPT4geyByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbik7IH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG4gPSBPYmplY3QuYXNzaWduKHt9LCBub2RlKTsgLy8gY2xvbmUgbm9kZSBzbyB3ZSBkb24ndCBtb2QgYW55IHNldHRpbmdzIG9uIGl0IGJ1dCBoYXZlIGZ1bGwgYXV0b1Bvc2l0aW9uIGFuZCBtaW4vbWF4IGFzIHdlbGwhICMxNjg3XHJcbiAgICAgICAgdGhpcy5jbGVhbnVwTm9kZShuKTtcclxuICAgICAgICBkZWxldGUgbi5lbDtcclxuICAgICAgICBkZWxldGUgbi5faWQ7XHJcbiAgICAgICAgZGVsZXRlIG4uY29udGVudDtcclxuICAgICAgICBkZWxldGUgbi5ncmlkO1xyXG4gICAgICAgIGNsb25lLmFkZE5vZGUobik7XHJcbiAgICAgICAgaWYgKGNsb25lLmdldFJvdygpIDw9IHRoaXMubWF4Um93KSB7XHJcbiAgICAgICAgICAgIG5vZGUuX3dpbGxGaXRQb3MgPSB1dGlsc18xLlV0aWxzLmNvcHlQb3Moe30sIG4pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLyoqIHRydWUgaWYgeCx5IG9yIHcsaCBhcmUgZGlmZmVyZW50IGFmdGVyIGNsYW1waW5nIHRvIG1pbi9tYXggKi9cclxuICAgIGNoYW5nZWRQb3NDb25zdHJhaW4obm9kZSwgcCkge1xyXG4gICAgICAgIC8vIGZpcnN0IG1ha2Ugc3VyZSB3LGggYXJlIHNldCBmb3IgY2FsbGVyXHJcbiAgICAgICAgcC53ID0gcC53IHx8IG5vZGUudztcclxuICAgICAgICBwLmggPSBwLmggfHwgbm9kZS5oO1xyXG4gICAgICAgIGlmIChub2RlLnggIT09IHAueCB8fCBub2RlLnkgIT09IHAueSlcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy8gY2hlY2sgY29uc3RyYWluZWQgdyxoXHJcbiAgICAgICAgaWYgKG5vZGUubWF4Vykge1xyXG4gICAgICAgICAgICBwLncgPSBNYXRoLm1pbihwLncsIG5vZGUubWF4Vyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLm1heEgpIHtcclxuICAgICAgICAgICAgcC5oID0gTWF0aC5taW4ocC5oLCBub2RlLm1heEgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9kZS5taW5XKSB7XHJcbiAgICAgICAgICAgIHAudyA9IE1hdGgubWF4KHAudywgbm9kZS5taW5XKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUubWluSCkge1xyXG4gICAgICAgICAgICBwLmggPSBNYXRoLm1heChwLmgsIG5vZGUubWluSCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAobm9kZS53ICE9PSBwLncgfHwgbm9kZS5oICE9PSBwLmgpO1xyXG4gICAgfVxyXG4gICAgLyoqIHJldHVybiB0cnVlIGlmIHRoZSBwYXNzZWQgaW4gbm9kZSB3YXMgYWN0dWFsbHkgbW92ZWQgKGNoZWNrcyBmb3Igbm8tb3AgYW5kIGxvY2tlZCkgKi9cclxuICAgIG1vdmVOb2RlKG5vZGUsIG8pIHtcclxuICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgIGlmICghbm9kZSB8fCAvKm5vZGUubG9ja2VkIHx8Ki8gIW8pXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBsZXQgd2FzVW5kZWZpbmVkUGFjaztcclxuICAgICAgICBpZiAoby5wYWNrID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgd2FzVW5kZWZpbmVkUGFjayA9IG8ucGFjayA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnN0cmFpbiB0aGUgcGFzc2VkIGluIHZhbHVlcyBhbmQgY2hlY2sgaWYgd2UncmUgc3RpbGwgY2hhbmdpbmcgb3VyIG5vZGVcclxuICAgICAgICBpZiAodHlwZW9mIG8ueCAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgby54ID0gbm9kZS54O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIG8ueSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgby55ID0gbm9kZS55O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIG8udyAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgby53ID0gbm9kZS53O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIG8uaCAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgby5oID0gbm9kZS5oO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzaXppbmcgPSAobm9kZS53ICE9PSBvLncgfHwgbm9kZS5oICE9PSBvLmgpO1xyXG4gICAgICAgIGxldCBubiA9IHV0aWxzXzEuVXRpbHMuY29weVBvcyh7fSwgbm9kZSwgdHJ1ZSk7IC8vIGdldCBtaW4vbWF4IG91dCBmaXJzdCwgdGhlbiBvcHQgcG9zaXRpb25zIG5leHRcclxuICAgICAgICB1dGlsc18xLlV0aWxzLmNvcHlQb3Mobm4sIG8pO1xyXG4gICAgICAgIG5uID0gdGhpcy5ub2RlQm91bmRGaXgobm4sIHJlc2l6aW5nKTtcclxuICAgICAgICB1dGlsc18xLlV0aWxzLmNvcHlQb3Mobywgbm4pO1xyXG4gICAgICAgIGlmICh1dGlsc18xLlV0aWxzLnNhbWVQb3Mobm9kZSwgbykpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBsZXQgcHJldlBvcyA9IHV0aWxzXzEuVXRpbHMuY29weVBvcyh7fSwgbm9kZSk7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgd2Ugd2lsbCBuZWVkIHRvIGZpeCBjb2xsaXNpb24gYXQgb3VyIG5ldyBsb2NhdGlvblxyXG4gICAgICAgIGxldCBjb2xsaWRlcyA9IHRoaXMuY29sbGlkZUFsbChub2RlLCBubiwgby5za2lwKTtcclxuICAgICAgICBsZXQgbmVlZFRvTW92ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKGNvbGxpZGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgYWN0aXZlRHJhZyA9IG5vZGUuX21vdmluZyAmJiAhby5uZXN0ZWQ7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIHRvIG1ha2Ugc3VyZSB3ZSBhY3R1YWxseSBjb2xsaWRlZCBvdmVyIDUwJSBzdXJmYWNlIGFyZWEgd2hpbGUgZHJhZ2dpbmdcclxuICAgICAgICAgICAgbGV0IGNvbGxpZGUgPSBhY3RpdmVEcmFnID8gdGhpcy5kaXJlY3Rpb25Db2xsaWRlQ292ZXJhZ2Uobm9kZSwgbywgY29sbGlkZXMpIDogY29sbGlkZXNbMF07XHJcbiAgICAgICAgICAgIC8vIGlmIHdlJ3JlIGVuYWJsaW5nIGNyZWF0aW9uIG9mIHN1Yi1ncmlkcyBvbiB0aGUgZmx5LCBzZWUgaWYgd2UncmUgY292ZXJpbmcgODAlIG9mIGVpdGhlciBvbmUsIGlmIHdlIGRpZG4ndCBhbHJlYWR5IGRvIHRoYXRcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZURyYWcgJiYgY29sbGlkZSAmJiAoKF9iID0gKF9hID0gbm9kZS5ncmlkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub3B0cykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnN1YkdyaWREeW5hbWljKSAmJiAhbm9kZS5ncmlkLl9pc1RlbXApIHtcclxuICAgICAgICAgICAgICAgIGxldCBvdmVyID0gdXRpbHNfMS5VdGlscy5hcmVhSW50ZXJjZXB0KG8ucmVjdCwgY29sbGlkZS5fcmVjdCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYTEgPSB1dGlsc18xLlV0aWxzLmFyZWEoby5yZWN0KTtcclxuICAgICAgICAgICAgICAgIGxldCBhMiA9IHV0aWxzXzEuVXRpbHMuYXJlYShjb2xsaWRlLl9yZWN0KTtcclxuICAgICAgICAgICAgICAgIGxldCBwZXJjID0gb3ZlciAvIChhMSA8IGEyID8gYTEgOiBhMik7XHJcbiAgICAgICAgICAgICAgICBpZiAocGVyYyA+IC44KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZS5ncmlkLm1ha2VTdWJHcmlkKGNvbGxpZGUuZWwsIHVuZGVmaW5lZCwgbm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29sbGlkZSkge1xyXG4gICAgICAgICAgICAgICAgbmVlZFRvTW92ZSA9ICF0aGlzLl9maXhDb2xsaXNpb25zKG5vZGUsIG5uLCBjb2xsaWRlLCBvKTsgLy8gY2hlY2sgaWYgYWxyZWFkeSBtb3ZlZC4uLlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmVlZFRvTW92ZSA9IGZhbHNlOyAvLyB3ZSBkaWRuJ3QgY292ZXIgPjUwJSBmb3IgYSBtb3ZlLCBza2lwLi4uXHJcbiAgICAgICAgICAgICAgICBpZiAod2FzVW5kZWZpbmVkUGFjaylcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgby5wYWNrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG5vdyBtb3ZlICh0byB0aGUgb3JpZ2luYWwgYXNrIHZzIHRoZSBjb2xsaXNpb24gdmVyc2lvbiB3aGljaCBtaWdodCBkaWZmZXIpIGFuZCByZXBhY2sgdGhpbmdzXHJcbiAgICAgICAgaWYgKG5lZWRUb01vdmUpIHtcclxuICAgICAgICAgICAgbm9kZS5fZGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICB1dGlsc18xLlV0aWxzLmNvcHlQb3Mobm9kZSwgbm4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoby5wYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhY2tOb2RlcygpXHJcbiAgICAgICAgICAgICAgICAuX25vdGlmeSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gIXV0aWxzXzEuVXRpbHMuc2FtZVBvcyhub2RlLCBwcmV2UG9zKTsgLy8gcGFjayBtaWdodCBoYXZlIG1vdmVkIHRoaW5ncyBiYWNrXHJcbiAgICB9XHJcbiAgICBnZXRSb3coKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMucmVkdWNlKChyb3csIG4pID0+IE1hdGgubWF4KHJvdywgbi55ICsgbi5oKSwgMCk7XHJcbiAgICB9XHJcbiAgICBiZWdpblVwZGF0ZShub2RlKSB7XHJcbiAgICAgICAgaWYgKCFub2RlLl91cGRhdGluZykge1xyXG4gICAgICAgICAgICBub2RlLl91cGRhdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBub2RlLl9za2lwRG93bjtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmJhdGNoTW9kZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUluaXRpYWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBlbmRVcGRhdGUoKSB7XHJcbiAgICAgICAgbGV0IG4gPSB0aGlzLm5vZGVzLmZpbmQobiA9PiBuLl91cGRhdGluZyk7XHJcbiAgICAgICAgaWYgKG4pIHtcclxuICAgICAgICAgICAgZGVsZXRlIG4uX3VwZGF0aW5nO1xyXG4gICAgICAgICAgICBkZWxldGUgbi5fc2tpcERvd247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIHNhdmVzIGEgY29weSBvZiB0aGUgbGFyZ2VzdCBjb2x1bW4gbGF5b3V0IChlZyAxMiBldmVuIHdoZW4gcmVuZGVyaW5nIG9uZUNvbHVtbk1vZGUpIHNvIHdlIGRvbid0IGxvb3NlIG9yaWcgbGF5b3V0LFxyXG4gICAgICogcmV0dXJuaW5nIGEgbGlzdCBvZiB3aWRnZXRzIGZvciBzZXJpYWxpemF0aW9uICovXHJcbiAgICBzYXZlKHNhdmVFbGVtZW50ID0gdHJ1ZSkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICAvLyB1c2UgdGhlIGhpZ2hlc3QgbGF5b3V0IGZvciBhbnkgc2F2ZWQgaW5mbyBzbyB3ZSBjYW4gaGF2ZSBmdWxsIGRldGFpbCBvbiByZWxvYWQgIzE4NDlcclxuICAgICAgICBsZXQgbGVuID0gKF9hID0gdGhpcy5fbGF5b3V0cykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aDtcclxuICAgICAgICBsZXQgbGF5b3V0ID0gbGVuICYmIHRoaXMuY29sdW1uICE9PSAobGVuIC0gMSkgPyB0aGlzLl9sYXlvdXRzW2xlbiAtIDFdIDogbnVsbDtcclxuICAgICAgICBsZXQgbGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuc29ydE5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5ub2Rlcy5mb3JFYWNoKG4gPT4ge1xyXG4gICAgICAgICAgICBsZXQgd2wgPSBsYXlvdXQgPT09IG51bGwgfHwgbGF5b3V0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsYXlvdXQuZmluZChsID0+IGwuX2lkID09PSBuLl9pZCk7XHJcbiAgICAgICAgICAgIGxldCB3ID0gT2JqZWN0LmFzc2lnbih7fSwgbik7XHJcbiAgICAgICAgICAgIC8vIHVzZSBsYXlvdXQgaW5mbyBpbnN0ZWFkIGlmIHNldFxyXG4gICAgICAgICAgICBpZiAod2wpIHtcclxuICAgICAgICAgICAgICAgIHcueCA9IHdsLng7XHJcbiAgICAgICAgICAgICAgICB3LnkgPSB3bC55O1xyXG4gICAgICAgICAgICAgICAgdy53ID0gd2wudztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dGlsc18xLlV0aWxzLnJlbW92ZUludGVybmFsRm9yU2F2ZSh3LCAhc2F2ZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICBsaXN0LnB1c2godyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIGNhbGxlZCB3aGVuZXZlciBhIG5vZGUgaXMgYWRkZWQgb3IgbW92ZWQgLSB1cGRhdGVzIHRoZSBjYWNoZWQgbGF5b3V0cyAqL1xyXG4gICAgbGF5b3V0c05vZGVzQ2hhbmdlKG5vZGVzKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9sYXlvdXRzIHx8IHRoaXMuX2luQ29sdW1uUmVzaXplKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAvLyByZW1vdmUgc21hbGxlciBsYXlvdXRzIC0gd2Ugd2lsbCByZS1nZW5lcmF0ZSB0aG9zZSBvbiB0aGUgZmx5Li4uIGxhcmdlciBvbmVzIG5lZWQgdG8gdXBkYXRlXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0cy5mb3JFYWNoKChsYXlvdXQsIGNvbHVtbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWxheW91dCB8fCBjb2x1bW4gPT09IHRoaXMuY29sdW1uKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChjb2x1bW4gPCB0aGlzLmNvbHVtbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0c1tjb2x1bW5dID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gd2Ugc2F2ZSB0aGUgb3JpZ2luYWwgeCx5LHcgKGggaXNuJ3QgY2FjaGVkKSB0byBzZWUgd2hhdCBhY3R1YWxseSBjaGFuZ2VkIHRvIHByb3BhZ2F0ZSBiZXR0ZXIuXHJcbiAgICAgICAgICAgICAgICAvLyBOT1RFOiB3ZSBkb24ndCBuZWVkIHRvIGNoZWNrIGFnYWluc3Qgb3V0IG9mIGJvdW5kIHNjYWxpbmcvbW92aW5nIGFzIHRoYXQgd2lsbCBiZSBkb25lIHdoZW4gdXNpbmcgdGhvc2UgY2FjaGUgdmFsdWVzLiAjMTc4NVxyXG4gICAgICAgICAgICAgICAgbGV0IHJhdGlvID0gY29sdW1uIC8gdGhpcy5jb2x1bW47XHJcbiAgICAgICAgICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbm9kZS5fb3JpZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBkaWRuJ3QgY2hhbmdlIChuZXdseSBhZGRlZCA/KVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuID0gbGF5b3V0LmZpbmQobCA9PiBsLl9pZCA9PT0gbm9kZS5faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBubyBjYWNoZSBmb3IgbmV3IG5vZGVzLiBXaWxsIHVzZSB0aG9zZSB2YWx1ZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gWSBjaGFuZ2VkLCBwdXNoIGRvd24gc2FtZSBhbW91bnRcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkZXRlY3QgZG9pbmcgaXRlbSAnc3dhcHMnIHdpbGwgaGVscCBpbnN0ZWFkIG9mIG1vdmUgKGVzcGVjaWFsbHkgaW4gMSBjb2x1bW4gbW9kZSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS55ICE9PSBub2RlLl9vcmlnLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbi55ICs9IChub2RlLnkgLSBub2RlLl9vcmlnLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBYIGNoYW5nZWQsIHNjYWxlIGZyb20gbmV3IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUueCAhPT0gbm9kZS5fb3JpZy54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4ueCA9IE1hdGgucm91bmQobm9kZS54ICogcmF0aW8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB3aWR0aCBjaGFuZ2VkLCBzY2FsZSBmcm9tIG5ldyB3aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLncgIT09IG5vZGUuX29yaWcudykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuLncgPSBNYXRoLnJvdW5kKG5vZGUudyAqIHJhdGlvKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLi4uaGVpZ2h0IGFsd2F5cyBjYXJyaWVzIG92ZXIgZnJvbSBjYWNoZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsIENhbGxlZCB0byBzY2FsZSB0aGUgd2lkZ2V0IHdpZHRoICYgcG9zaXRpb24gdXAvZG93biBiYXNlZCBvbiB0aGUgY29sdW1uIGNoYW5nZS5cclxuICAgICAqIE5vdGUgd2Ugc3RvcmUgcHJldmlvdXMgbGF5b3V0cyAoZXNwZWNpYWxseSBvcmlnaW5hbCBvbmVzKSB0byBtYWtlIGl0IHBvc3NpYmxlIHRvIGdvXHJcbiAgICAgKiBmcm9tIHNheSAxMiAtPiAxIC0+IDEyIGFuZCBnZXQgYmFjayB0byB3aGVyZSB3ZSB3ZXJlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwcmV2Q29sdW1uIHByZXZpb3VzIG51bWJlciBvZiBjb2x1bW5zXHJcbiAgICAgKiBAcGFyYW0gY29sdW1uICBuZXcgY29sdW1uIG51bWJlclxyXG4gICAgICogQHBhcmFtIG5vZGVzIGRpZmZlcmVudCBzb3J0ZWQgbGlzdCAoZXg6IERPTSBvcmRlcikgaW5zdGVhZCBvZiBjdXJyZW50IGxpc3RcclxuICAgICAqIEBwYXJhbSBsYXlvdXQgc3BlY2lmeSB0aGUgdHlwZSBvZiByZS1sYXlvdXQgdGhhdCB3aWxsIGhhcHBlbiAocG9zaXRpb24sIHNpemUsIGV0Yy4uLikuXHJcbiAgICAgKiBOb3RlOiBpdGVtcyB3aWxsIG5ldmVyIGJlIG91dHNpZGUgb2YgdGhlIGN1cnJlbnQgY29sdW1uIGJvdW5kYXJpZXMuIGRlZmF1bHQgKG1vdmVTY2FsZSkuIElnbm9yZWQgZm9yIDEgY29sdW1uXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZU5vZGVXaWR0aHMocHJldkNvbHVtbiwgY29sdW1uLCBub2RlcywgbGF5b3V0ID0gJ21vdmVTY2FsZScpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGVzLmxlbmd0aCB8fCAhY29sdW1uIHx8IHByZXZDb2x1bW4gPT09IGNvbHVtbilcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgLy8gY2FjaGUgdGhlIGN1cnJlbnQgbGF5b3V0IGluIGNhc2UgdGhleSB3YW50IHRvIGdvIGJhY2sgKGxpa2UgMTIgLT4gMSAtPiAxMikgYXMgaXQgcmVxdWlyZXMgb3JpZ2luYWwgZGF0YVxyXG4gICAgICAgIHRoaXMuY2FjaGVMYXlvdXQodGhpcy5ub2RlcywgcHJldkNvbHVtbik7XHJcbiAgICAgICAgdGhpcy5iYXRjaFVwZGF0ZSgpOyAvLyBkbyB0aGlzIEVBUkxZIGFzIGl0IHdpbGwgY2FsbCBzYXZlSW5pdGlhbCgpIHNvIHdlIGNhbiBkZXRlY3Qgd2hlcmUgd2Ugc3RhcnRlZCBmb3IgX2RpcnR5IGFuZCBjb2xsaXNpb25cclxuICAgICAgICBsZXQgbmV3Tm9kZXMgPSBbXTtcclxuICAgICAgICAvLyBpZiB3ZSdyZSBnb2luZyB0byAxIGNvbHVtbiBhbmQgdXNpbmcgRE9NIG9yZGVyIHJhdGhlciB0aGFuIGRlZmF1bHQgc29ydGluZywgdGhlbiBnZW5lcmF0ZSB0aGF0IGxheW91dFxyXG4gICAgICAgIGxldCBkb21PcmRlciA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChjb2x1bW4gPT09IDEgJiYgKG5vZGVzID09PSBudWxsIHx8IG5vZGVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBub2Rlcy5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgIGRvbU9yZGVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHRvcCA9IDA7XHJcbiAgICAgICAgICAgIG5vZGVzLmZvckVhY2gobiA9PiB7XHJcbiAgICAgICAgICAgICAgICBuLnggPSAwO1xyXG4gICAgICAgICAgICAgICAgbi53ID0gMTtcclxuICAgICAgICAgICAgICAgIG4ueSA9IE1hdGgubWF4KG4ueSwgdG9wKTtcclxuICAgICAgICAgICAgICAgIHRvcCA9IG4ueSArIG4uaDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG5ld05vZGVzID0gbm9kZXM7XHJcbiAgICAgICAgICAgIG5vZGVzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlcyA9IHV0aWxzXzEuVXRpbHMuc29ydCh0aGlzLm5vZGVzLCAtMSwgcHJldkNvbHVtbik7IC8vIGN1cnJlbnQgY29sdW1uIHJldmVyc2Ugc29ydGluZyBzbyB3ZSBjYW4gaW5zZXJ0IGxhc3QgdG8gZnJvbnQgKGxpbWl0IGNvbGxpc2lvbilcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2VlIGlmIHdlIGhhdmUgY2FjaGVkIHByZXZpb3VzIGxheW91dCBJRkYgd2UgYXJlIGdvaW5nIHVwIGluIHNpemUgKHJlc3RvcmUpIG90aGVyd2lzZSBhbHdheXNcclxuICAgICAgICAvLyBnZW5lcmF0ZSBuZXh0IHNpemUgZG93biBmcm9tIHdoZXJlIHdlIGFyZSAobG9va3MgbW9yZSBuYXR1cmFsIGFzIHlvdSBncmFkdWFsbHkgc2l6ZSBkb3duKS5cclxuICAgICAgICBsZXQgY2FjaGVOb2RlcyA9IFtdO1xyXG4gICAgICAgIGlmIChjb2x1bW4gPiBwcmV2Q29sdW1uKSB7XHJcbiAgICAgICAgICAgIGNhY2hlTm9kZXMgPSB0aGlzLl9sYXlvdXRzW2NvbHVtbl0gfHwgW107XHJcbiAgICAgICAgICAgIC8vIC4uLmlmIG5vdCwgc3RhcnQgd2l0aCB0aGUgbGFyZ2VzdCBsYXlvdXQgKGlmIG5vdCBhbHJlYWR5IHRoZXJlKSBhcyBkb3duLXNjYWxpbmcgaXMgbW9yZSBhY2N1cmF0ZVxyXG4gICAgICAgICAgICAvLyBieSBwcmV0ZW5kaW5nIHdlIGNhbWUgZnJvbSB0aGF0IGxhcmdlciBjb2x1bW4gYnkgYXNzaWduaW5nIHRob3NlIHZhbHVlcyBhcyBzdGFydGluZyBwb2ludFxyXG4gICAgICAgICAgICBsZXQgbGFzdEluZGV4ID0gdGhpcy5fbGF5b3V0cy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBpZiAoIWNhY2hlTm9kZXMubGVuZ3RoICYmIHByZXZDb2x1bW4gIT09IGxhc3RJbmRleCAmJiAoKF9hID0gdGhpcy5fbGF5b3V0c1tsYXN0SW5kZXhdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgcHJldkNvbHVtbiA9IGxhc3RJbmRleDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dHNbbGFzdEluZGV4XS5mb3JFYWNoKGNhY2hlTm9kZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG4gPSBub2Rlcy5maW5kKG4gPT4gbi5faWQgPT09IGNhY2hlTm9kZS5faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0aWxsIGN1cnJlbnQsIHVzZSBjYWNoZSBpbmZvIHBvc2l0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuLnggPSBjYWNoZU5vZGUueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbi55ID0gY2FjaGVOb2RlLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4udyA9IGNhY2hlTm9kZS53O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIHdlIGZvdW5kIGNhY2hlIHJlLXVzZSB0aG9zZSBub2RlcyB0aGF0IGFyZSBzdGlsbCBjdXJyZW50XHJcbiAgICAgICAgY2FjaGVOb2Rlcy5mb3JFYWNoKGNhY2hlTm9kZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBqID0gbm9kZXMuZmluZEluZGV4KG4gPT4gbi5faWQgPT09IGNhY2hlTm9kZS5faWQpO1xyXG4gICAgICAgICAgICBpZiAoaiAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0aWxsIGN1cnJlbnQsIHVzZSBjYWNoZSBpbmZvIHBvc2l0aW9uc1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlTm9kZS5hdXRvUG9zaXRpb24gfHwgaXNOYU4oY2FjaGVOb2RlLngpIHx8IGlzTmFOKGNhY2hlTm9kZS55KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEVtcHR5UG9zaXRpb24oY2FjaGVOb2RlLCBuZXdOb2Rlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNhY2hlTm9kZS5hdXRvUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBub2Rlc1tqXS54ID0gY2FjaGVOb2RlLng7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZXNbal0ueSA9IGNhY2hlTm9kZS55O1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVzW2pdLncgPSBjYWNoZU5vZGUudztcclxuICAgICAgICAgICAgICAgICAgICBuZXdOb2Rlcy5wdXNoKG5vZGVzW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vZGVzLnNwbGljZShqLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIC4uLmFuZCBhZGQgYW55IGV4dHJhIG5vbi1jYWNoZWQgb25lc1xyXG4gICAgICAgIGlmIChub2Rlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBsYXlvdXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGxheW91dChjb2x1bW4sIHByZXZDb2x1bW4sIG5ld05vZGVzLCBub2Rlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoIWRvbU9yZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmF0aW8gPSBjb2x1bW4gLyBwcmV2Q29sdW1uO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmUgPSAobGF5b3V0ID09PSAnbW92ZScgfHwgbGF5b3V0ID09PSAnbW92ZVNjYWxlJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGUgPSAobGF5b3V0ID09PSAnc2NhbGUnIHx8IGxheW91dCA9PT0gJ21vdmVTY2FsZScpO1xyXG4gICAgICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiB4ICsgdyBjb3VsZCBiZSBvdXRzaWRlIG9mIHRoZSBncmlkLCBidXQgYWRkTm9kZSgpIGJlbG93IHdpbGwgaGFuZGxlIHRoYXRcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnggPSAoY29sdW1uID09PSAxID8gMCA6IChtb3ZlID8gTWF0aC5yb3VuZChub2RlLnggKiByYXRpbykgOiBNYXRoLm1pbihub2RlLngsIGNvbHVtbiAtIDEpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS53ID0gKChjb2x1bW4gPT09IDEgfHwgcHJldkNvbHVtbiA9PT0gMSkgPyAxIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUgPyAoTWF0aC5yb3VuZChub2RlLncgKiByYXRpbykgfHwgMSkgOiAoTWF0aC5taW4obm9kZS53LCBjb2x1bW4pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbm9kZXMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmaW5hbGx5IHJlLWxheW91dCB0aGVtIGluIHJldmVyc2Ugb3JkZXIgKHRvIGdldCBjb3JyZWN0IHBsYWNlbWVudClcclxuICAgICAgICBpZiAoIWRvbU9yZGVyKVxyXG4gICAgICAgICAgICBuZXdOb2RlcyA9IHV0aWxzXzEuVXRpbHMuc29ydChuZXdOb2RlcywgLTEsIGNvbHVtbik7XHJcbiAgICAgICAgdGhpcy5faW5Db2x1bW5SZXNpemUgPSB0cnVlOyAvLyBwcmV2ZW50IGNhY2hlIHVwZGF0ZVxyXG4gICAgICAgIHRoaXMubm9kZXMgPSBbXTsgLy8gcHJldGVuZCB3ZSBoYXZlIG5vIG5vZGVzIHRvIHN0YXJ0IHdpdGggKGFkZCgpIHdpbGwgdXNlIHNhbWUgc3RydWN0dXJlcykgdG8gc2ltcGxpZnkgbGF5b3V0XHJcbiAgICAgICAgbmV3Tm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hZGROb2RlKG5vZGUsIGZhbHNlKTsgLy8gJ2ZhbHNlJyBmb3IgYWRkIGV2ZW50IHRyaWdnZXJcclxuICAgICAgICAgICAgZGVsZXRlIG5vZGUuX29yaWc7IC8vIG1ha2Ugc3VyZSB0aGUgY29tbWl0IGRvZXNuJ3QgdHJ5IHRvIHJlc3RvcmUgdGhpbmdzIGJhY2sgdG8gb3JpZ2luYWxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJhdGNoVXBkYXRlKGZhbHNlKTtcclxuICAgICAgICBkZWxldGUgdGhpcy5faW5Db2x1bW5SZXNpemU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGNhbGwgdG8gY2FjaGUgdGhlIGdpdmVuIGxheW91dCBpbnRlcm5hbGx5IHRvIHRoZSBnaXZlbiBsb2NhdGlvbiBzbyB3ZSBjYW4gcmVzdG9yZSBiYWNrIHdoZW4gY29sdW1uIGNoYW5nZXMgc2l6ZVxyXG4gICAgICogQHBhcmFtIG5vZGVzIGxpc3Qgb2Ygbm9kZXNcclxuICAgICAqIEBwYXJhbSBjb2x1bW4gY29ycmVzcG9uZGluZyBjb2x1bW4gaW5kZXggdG8gc2F2ZSBpdCB1bmRlclxyXG4gICAgICogQHBhcmFtIGNsZWFyIGlmIHRydWUsIHdpbGwgZm9yY2Ugb3RoZXIgY2FjaGVzIHRvIGJlIHJlbW92ZWQgKGRlZmF1bHQgZmFsc2UpXHJcbiAgICAgKi9cclxuICAgIGNhY2hlTGF5b3V0KG5vZGVzLCBjb2x1bW4sIGNsZWFyID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgY29weSA9IFtdO1xyXG4gICAgICAgIG5vZGVzLmZvckVhY2goKG4sIGkpID0+IHtcclxuICAgICAgICAgICAgbi5faWQgPSBuLl9pZCB8fCBHcmlkU3RhY2tFbmdpbmUuX2lkU2VxKys7IC8vIG1ha2Ugc3VyZSB3ZSBoYXZlIGFuIGlkIGluIGNhc2UgdGhpcyBpcyBuZXcgbGF5b3V0LCBlbHNlIHJlLXVzZSBpZCBhbHJlYWR5IHNldFxyXG4gICAgICAgICAgICBjb3B5W2ldID0geyB4OiBuLngsIHk6IG4ueSwgdzogbi53LCBfaWQ6IG4uX2lkIH07IC8vIG9ubHkgdGhpbmcgd2UgY2hhbmdlIGlzIHgseSx3IGFuZCBpZCB0byBmaW5kIGl0IGJhY2tcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRzID0gY2xlYXIgPyBbXSA6IHRoaXMuX2xheW91dHMgfHwgW107IC8vIHVzZSBhcnJheSB0byBmaW5kIGxhcmdlciBxdWlja1xyXG4gICAgICAgIHRoaXMuX2xheW91dHNbY29sdW1uXSA9IGNvcHk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGNhbGwgdG8gY2FjaGUgdGhlIGdpdmVuIG5vZGUgbGF5b3V0IGludGVybmFsbHkgdG8gdGhlIGdpdmVuIGxvY2F0aW9uIHNvIHdlIGNhbiByZXN0b3JlIGJhY2sgd2hlbiBjb2x1bW4gY2hhbmdlcyBzaXplXHJcbiAgICAgKiBAcGFyYW0gbm9kZSBzaW5nbGUgbm9kZSB0byBjYWNoZVxyXG4gICAgICogQHBhcmFtIGNvbHVtbiBjb3JyZXNwb25kaW5nIGNvbHVtbiBpbmRleCB0byBzYXZlIGl0IHVuZGVyXHJcbiAgICAgKi9cclxuICAgIGNhY2hlT25lTGF5b3V0KG4sIGNvbHVtbikge1xyXG4gICAgICAgIG4uX2lkID0gbi5faWQgfHwgR3JpZFN0YWNrRW5naW5lLl9pZFNlcSsrO1xyXG4gICAgICAgIGxldCBsID0geyB4OiBuLngsIHk6IG4ueSwgdzogbi53LCBfaWQ6IG4uX2lkIH07XHJcbiAgICAgICAgaWYgKG4uYXV0b1Bvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBsLng7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBsLnk7XHJcbiAgICAgICAgICAgIGwuYXV0b1Bvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0cyA9IHRoaXMuX2xheW91dHMgfHwgW107XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0c1tjb2x1bW5dID0gdGhpcy5fbGF5b3V0c1tjb2x1bW5dIHx8IFtdO1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmluZENhY2hlTGF5b3V0KG4sIGNvbHVtbik7XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSlcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0c1tjb2x1bW5dLnB1c2gobCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRzW2NvbHVtbl1baW5kZXhdID0gbDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGZpbmRDYWNoZUxheW91dChuLCBjb2x1bW4pIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgICAgICByZXR1cm4gKF9jID0gKF9iID0gKF9hID0gdGhpcy5fbGF5b3V0cykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW2NvbHVtbl0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5maW5kSW5kZXgobCA9PiBsLl9pZCA9PT0gbi5faWQpKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiAtMTtcclxuICAgIH1cclxuICAgIC8qKiBjYWxsZWQgdG8gcmVtb3ZlIGFsbCBpbnRlcm5hbCB2YWx1ZXMgYnV0IHRoZSBfaWQgKi9cclxuICAgIGNsZWFudXBOb2RlKG5vZGUpIHtcclxuICAgICAgICBmb3IgKGxldCBwcm9wIGluIG5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BbMF0gPT09ICdfJyAmJiBwcm9wICE9PSAnX2lkJylcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBub2RlW3Byb3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkdyaWRTdGFja0VuZ2luZSA9IEdyaWRTdGFja0VuZ2luZTtcclxuLyoqIEBpbnRlcm5hbCB1bmlxdWUgZ2xvYmFsIGludGVybmFsIF9pZCBjb3VudGVyIE5PVCBzdGFydGluZyBhdCAwICovXHJcbkdyaWRTdGFja0VuZ2luZS5faWRTZXEgPSAxO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1ncmlkc3RhY2stZW5naW5lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSkpO1xyXG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5HcmlkU3RhY2sgPSB2b2lkIDA7XHJcbi8qIVxyXG4gKiBHcmlkU3RhY2sgNy4zLjBcclxuICogaHR0cHM6Ly9ncmlkc3RhY2tqcy5jb20vXHJcbiAqXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMS0yMDIyIEFsYWluIER1bWVzbnlcclxuICogc2VlIHJvb3QgbGljZW5zZSBodHRwczovL2dpdGh1Yi5jb20vZ3JpZHN0YWNrL2dyaWRzdGFjay5qcy90cmVlL21hc3Rlci9MSUNFTlNFXHJcbiAqL1xyXG5jb25zdCBncmlkc3RhY2tfZW5naW5lXzEgPSByZXF1aXJlKFwiLi9ncmlkc3RhY2stZW5naW5lXCIpO1xyXG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XHJcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcclxuLypcclxuICogYW5kIGluY2x1ZGUgRCZEIGJ5IGRlZmF1bHRcclxuICogVE9ETzogd2hpbGUgd2UgY291bGQgZ2VuZXJhdGUgYSBncmlkc3RhY2stc3RhdGljLmpzIGF0IHNtYWxsZXIgc2l6ZSAtIHNhdmVzIGFib3V0IDMxayAoNDFrIC0+IDcyaylcclxuICogSSBkb24ndCBrbm93IGhvdyB0byBnZW5lcmF0ZSB0aGUgREQgb25seSBjb2RlIGF0IHRoZSByZW1haW5pbmcgMzFrIHRvIGRlbGF5IGxvYWQgYXMgY29kZSBkZXBlbmRzIG9uIEdyaWRzdGFjay50c1xyXG4gKiBhbHNvIGl0IGNhdXNlZCBsb2FkaW5nIGlzc3VlcyBpbiBwcm9kIC0gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmlkc3RhY2svZ3JpZHN0YWNrLmpzL2lzc3Vlcy8yMDM5XHJcbiAqL1xyXG5jb25zdCBkZF9ncmlkc3RhY2tfMSA9IHJlcXVpcmUoXCIuL2RkLWdyaWRzdGFja1wiKTtcclxuY29uc3QgZGRfdG91Y2hfMSA9IHJlcXVpcmUoXCIuL2RkLXRvdWNoXCIpO1xyXG5jb25zdCBkZF9tYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9kZC1tYW5hZ2VyXCIpO1xyXG4vKiogZ2xvYmFsIGluc3RhbmNlICovXHJcbmNvbnN0IGRkID0gbmV3IGRkX2dyaWRzdGFja18xLkRER3JpZFN0YWNrO1xyXG4vLyBleHBvcnQgYWxsIGRlcGVuZGVudCBmaWxlIGFzIHdlbGwgdG8gbWFrZSBpdCBlYXNpZXIgZm9yIHVzZXJzIHRvIGp1c3QgaW1wb3J0IHRoZSBtYWluIGZpbGVcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3R5cGVzXCIpLCBleHBvcnRzKTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3V0aWxzXCIpLCBleHBvcnRzKTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2dyaWRzdGFjay1lbmdpbmVcIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vZGQtZ3JpZHN0YWNrXCIpLCBleHBvcnRzKTtcclxuLyoqXHJcbiAqIE1haW4gZ3JpZHN0YWNrIGNsYXNzIC0geW91IHdpbGwgbmVlZCB0byBjYWxsIGBHcmlkU3RhY2suaW5pdCgpYCBmaXJzdCB0byBpbml0aWFsaXplIHlvdXIgZ3JpZC5cclxuICogTm90ZTogeW91ciBncmlkIGVsZW1lbnRzIE1VU1QgaGF2ZSB0aGUgZm9sbG93aW5nIGNsYXNzZXMgZm9yIHRoZSBDU1MgbGF5b3V0IHRvIHdvcms6XHJcbiAqIEBleGFtcGxlXHJcbiAqIDxkaXYgY2xhc3M9XCJncmlkLXN0YWNrXCI+XHJcbiAqICAgPGRpdiBjbGFzcz1cImdyaWQtc3RhY2staXRlbVwiPlxyXG4gKiAgICAgPGRpdiBjbGFzcz1cImdyaWQtc3RhY2staXRlbS1jb250ZW50XCI+SXRlbSAxPC9kaXY+XHJcbiAqICAgPC9kaXY+XHJcbiAqIDwvZGl2PlxyXG4gKi9cclxuY2xhc3MgR3JpZFN0YWNrIHtcclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0IGEgZ3JpZCBpdGVtIGZyb20gdGhlIGdpdmVuIGVsZW1lbnQgYW5kIG9wdGlvbnNcclxuICAgICAqIEBwYXJhbSBlbFxyXG4gICAgICogQHBhcmFtIG9wdHNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWwsIG9wdHMgPSB7fSkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgICAgIHRoaXMuX2dzRXZlbnRIYW5kbGVyID0ge307XHJcbiAgICAgICAgLyoqIEBpbnRlcm5hbCBleHRyYSByb3cgYWRkZWQgd2hlbiBkcmFnZ2luZyBhdCB0aGUgYm90dG9tIG9mIHRoZSBncmlkICovXHJcbiAgICAgICAgdGhpcy5fZXh0cmFEcmFnUm93ID0gMDtcclxuICAgICAgICB0aGlzLmVsID0gZWw7IC8vIGV4cG9zZWQgSFRNTCBlbGVtZW50IHRvIHRoZSB1c2VyXHJcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307IC8vIGhhbmRsZXMgbnVsbC91bmRlZmluZWQvMFxyXG4gICAgICAgIGlmICghZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLXN0YWNrJykpIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdncmlkLXN0YWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIHJvdyBwcm9wZXJ0eSBleGlzdHMsIHJlcGxhY2UgbWluUm93IGFuZCBtYXhSb3cgaW5zdGVhZFxyXG4gICAgICAgIGlmIChvcHRzLnJvdykge1xyXG4gICAgICAgICAgICBvcHRzLm1pblJvdyA9IG9wdHMubWF4Um93ID0gb3B0cy5yb3c7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRzLnJvdztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJvd0F0dHIgPSB1dGlsc18xLlV0aWxzLnRvTnVtYmVyKGVsLmdldEF0dHJpYnV0ZSgnZ3Mtcm93JykpO1xyXG4gICAgICAgIC8vIGZsYWcgb25seSB2YWxpZCBpbiBzdWItZ3JpZHMgKGhhbmRsZWQgYnkgcGFyZW50LCBub3QgaGVyZSlcclxuICAgICAgICBpZiAob3B0cy5jb2x1bW4gPT09ICdhdXRvJykge1xyXG4gICAgICAgICAgICBkZWxldGUgb3B0cy5jb2x1bW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vICdtaW5XaWR0aCcgbGVnYWN5IHN1cHBvcnQgaW4gNS4xXHJcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cclxuICAgICAgICBsZXQgYW55T3B0cyA9IG9wdHM7XHJcbiAgICAgICAgaWYgKGFueU9wdHMubWluV2lkdGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBvcHRzLm9uZUNvbHVtblNpemUgPSBvcHRzLm9uZUNvbHVtblNpemUgfHwgYW55T3B0cy5taW5XaWR0aDtcclxuICAgICAgICAgICAgZGVsZXRlIGFueU9wdHMubWluV2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNhdmUgb3JpZ2luYWwgc2V0dGluZyBzbyB3ZSBjYW4gcmVzdG9yZSBvbiBzYXZlXHJcbiAgICAgICAgaWYgKG9wdHMuYWx3YXlzU2hvd1Jlc2l6ZUhhbmRsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG9wdHMuX2Fsd2F5c1Nob3dSZXNpemVIYW5kbGUgPSBvcHRzLmFsd2F5c1Nob3dSZXNpemVIYW5kbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVsZW1lbnRzIERPTSBhdHRyaWJ1dGVzIG92ZXJyaWRlIGFueSBwYXNzZWQgb3B0aW9ucyAobGlrZSBDU1Mgc3R5bGUpIC0gbWVyZ2UgdGhlIHR3byB0b2dldGhlclxyXG4gICAgICAgIGxldCBkZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdXRpbHNfMS5VdGlscy5jbG9uZURlZXAodHlwZXNfMS5ncmlkRGVmYXVsdHMpKSwgeyBjb2x1bW46IHV0aWxzXzEuVXRpbHMudG9OdW1iZXIoZWwuZ2V0QXR0cmlidXRlKCdncy1jb2x1bW4nKSkgfHwgdHlwZXNfMS5ncmlkRGVmYXVsdHMuY29sdW1uLCBtaW5Sb3c6IHJvd0F0dHIgPyByb3dBdHRyIDogdXRpbHNfMS5VdGlscy50b051bWJlcihlbC5nZXRBdHRyaWJ1dGUoJ2dzLW1pbi1yb3cnKSkgfHwgdHlwZXNfMS5ncmlkRGVmYXVsdHMubWluUm93LCBtYXhSb3c6IHJvd0F0dHIgPyByb3dBdHRyIDogdXRpbHNfMS5VdGlscy50b051bWJlcihlbC5nZXRBdHRyaWJ1dGUoJ2dzLW1heC1yb3cnKSkgfHwgdHlwZXNfMS5ncmlkRGVmYXVsdHMubWF4Um93LCBzdGF0aWNHcmlkOiB1dGlsc18xLlV0aWxzLnRvQm9vbChlbC5nZXRBdHRyaWJ1dGUoJ2dzLXN0YXRpYycpKSB8fCB0eXBlc18xLmdyaWREZWZhdWx0cy5zdGF0aWNHcmlkLCBkcmFnZ2FibGU6IHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZTogKG9wdHMuaGFuZGxlQ2xhc3MgPyAnLicgKyBvcHRzLmhhbmRsZUNsYXNzIDogKG9wdHMuaGFuZGxlID8gb3B0cy5oYW5kbGUgOiAnJykpIHx8IHR5cGVzXzEuZ3JpZERlZmF1bHRzLmRyYWdnYWJsZS5oYW5kbGUsXHJcbiAgICAgICAgICAgIH0sIHJlbW92YWJsZU9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGFjY2VwdDogb3B0cy5pdGVtQ2xhc3MgPyAnLicgKyBvcHRzLml0ZW1DbGFzcyA6IHR5cGVzXzEuZ3JpZERlZmF1bHRzLnJlbW92YWJsZU9wdGlvbnMuYWNjZXB0LFxyXG4gICAgICAgICAgICB9IH0pO1xyXG4gICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2dzLWFuaW1hdGUnKSkgeyAvLyBkZWZhdWx0IHRvIHRydWUsIGJ1dCBpZiBzZXQgdG8gZmFsc2UgdXNlIHRoYXQgaW5zdGVhZFxyXG4gICAgICAgICAgICBkZWZhdWx0cy5hbmltYXRlID0gdXRpbHNfMS5VdGlscy50b0Jvb2woZWwuZ2V0QXR0cmlidXRlKCdncy1hbmltYXRlJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9wdHMgPSB1dGlsc18xLlV0aWxzLmRlZmF1bHRzKG9wdHMsIGRlZmF1bHRzKTtcclxuICAgICAgICBvcHRzID0gbnVsbDsgLy8gbWFrZSBzdXJlIHdlIHVzZSB0aGlzLm9wdHMgaW5zdGVhZFxyXG4gICAgICAgIHRoaXMuX2luaXRNYXJnaW4oKTsgLy8gcGFydCBvZiBzZXR0aW5ncyBkZWZhdWx0cy4uLlxyXG4gICAgICAgIC8vIE5vdyBjaGVjayBpZiB3ZSdyZSBsb2FkaW5nIGludG8gMSBjb2x1bW4gbW9kZSBGSVJTVCBzbyB3ZSBkb24ndCBkbyB1bi1uZWNlc3Nhcnkgd29yayAobGlrZSBjZWxsSGVpZ2h0ID0gd2lkdGggLyAxMiB0aGVuIGdvIDEgY29sdW1uKVxyXG4gICAgICAgIGlmICh0aGlzLm9wdHMuY29sdW1uICE9PSAxICYmICF0aGlzLm9wdHMuZGlzYWJsZU9uZUNvbHVtbk1vZGUgJiYgdGhpcy5fd2lkdGhPckNvbnRhaW5lcigpIDw9IHRoaXMub3B0cy5vbmVDb2x1bW5TaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ByZXZDb2x1bW4gPSB0aGlzLmdldENvbHVtbigpO1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMuY29sdW1uID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5ydGwgPT09ICdhdXRvJykge1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMucnRsID0gKGVsLnN0eWxlLmRpcmVjdGlvbiA9PT0gJ3J0bCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5vcHRzLnJ0bCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtc3RhY2stcnRsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHdlJ3JlIGJlZW4gbmVzdGVkLCBhbmQgaWYgc28gdXBkYXRlIG91ciBzdHlsZSBhbmQga2VlcCBwb2ludGVyIGFyb3VuZCAodXNlZCBkdXJpbmcgc2F2ZSlcclxuICAgICAgICBsZXQgcGFyZW50R3JpZEl0ZW0gPSAoX2EgPSB1dGlsc18xLlV0aWxzLmNsb3Nlc3RVcEJ5Q2xhc3ModGhpcy5lbCwgdHlwZXNfMS5ncmlkRGVmYXVsdHMuaXRlbUNsYXNzKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdyaWRzdGFja05vZGU7XHJcbiAgICAgICAgaWYgKHBhcmVudEdyaWRJdGVtKSB7XHJcbiAgICAgICAgICAgIHBhcmVudEdyaWRJdGVtLnN1YkdyaWQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudEdyaWRJdGVtID0gcGFyZW50R3JpZEl0ZW07XHJcbiAgICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1zdGFjay1uZXN0ZWQnKTtcclxuICAgICAgICAgICAgcGFyZW50R3JpZEl0ZW0uZWwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1zdGFjay1zdWItZ3JpZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9pc0F1dG9DZWxsSGVpZ2h0ID0gKHRoaXMub3B0cy5jZWxsSGVpZ2h0ID09PSAnYXV0bycpO1xyXG4gICAgICAgIGlmICh0aGlzLl9pc0F1dG9DZWxsSGVpZ2h0IHx8IHRoaXMub3B0cy5jZWxsSGVpZ2h0ID09PSAnaW5pdGlhbCcpIHtcclxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgY2VsbCBjb250ZW50IHNxdWFyZSBpbml0aWFsbHkgKHdpbGwgdXNlIHJlc2l6ZS9jb2x1bW4gZXZlbnQgdG8ga2VlcCBpdCBzcXVhcmUpXHJcbiAgICAgICAgICAgIHRoaXMuY2VsbEhlaWdodCh1bmRlZmluZWQsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB1bml0IGlmIGFueSBhcmUgc2V0XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRzLmNlbGxIZWlnaHQgPT0gJ251bWJlcicgJiYgdGhpcy5vcHRzLmNlbGxIZWlnaHRVbml0ICYmIHRoaXMub3B0cy5jZWxsSGVpZ2h0VW5pdCAhPT0gdHlwZXNfMS5ncmlkRGVmYXVsdHMuY2VsbEhlaWdodFVuaXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5jZWxsSGVpZ2h0ID0gdGhpcy5vcHRzLmNlbGxIZWlnaHQgKyB0aGlzLm9wdHMuY2VsbEhlaWdodFVuaXQ7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5vcHRzLmNlbGxIZWlnaHRVbml0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2VsbEhlaWdodCh0aGlzLm9wdHMuY2VsbEhlaWdodCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzZWUgaWYgd2UgbmVlZCB0byBhZGp1c3QgYXV0by1oaWRlXHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5hbHdheXNTaG93UmVzaXplSGFuZGxlID09PSAnbW9iaWxlJykge1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMuYWx3YXlzU2hvd1Jlc2l6ZUhhbmRsZSA9IGRkX3RvdWNoXzEuaXNUb3VjaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3R5bGVTaGVldENsYXNzID0gJ2dyaWQtc3RhY2staW5zdGFuY2UtJyArIGdyaWRzdGFja19lbmdpbmVfMS5HcmlkU3RhY2tFbmdpbmUuX2lkU2VxKys7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3N0eWxlU2hlZXRDbGFzcyk7XHJcbiAgICAgICAgdGhpcy5fc2V0U3RhdGljQ2xhc3MoKTtcclxuICAgICAgICBsZXQgZW5naW5lQ2xhc3MgPSB0aGlzLm9wdHMuZW5naW5lQ2xhc3MgfHwgR3JpZFN0YWNrLmVuZ2luZUNsYXNzIHx8IGdyaWRzdGFja19lbmdpbmVfMS5HcmlkU3RhY2tFbmdpbmU7XHJcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBuZXcgZW5naW5lQ2xhc3Moe1xyXG4gICAgICAgICAgICBjb2x1bW46IHRoaXMuZ2V0Q29sdW1uKCksXHJcbiAgICAgICAgICAgIGZsb2F0OiB0aGlzLm9wdHMuZmxvYXQsXHJcbiAgICAgICAgICAgIG1heFJvdzogdGhpcy5vcHRzLm1heFJvdyxcclxuICAgICAgICAgICAgb25DaGFuZ2U6IChjYk5vZGVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF4SCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5ub2Rlcy5mb3JFYWNoKG4gPT4geyBtYXhIID0gTWF0aC5tYXgobWF4SCwgbi55ICsgbi5oKTsgfSk7XHJcbiAgICAgICAgICAgICAgICBjYk5vZGVzLmZvckVhY2gobiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsID0gbi5lbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWVsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4uX3JlbW92ZURPTSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG4uX3JlbW92ZURPTTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dyaXRlUG9zQXR0cihlbCwgbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVTdHlsZXMoZmFsc2UsIG1heEgpOyAvLyBmYWxzZSA9IGRvbid0IHJlY3JlYXRlLCBqdXN0IGFwcGVuZCBpZiBuZWVkIGJlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5vcHRzLmF1dG8pIHtcclxuICAgICAgICAgICAgdGhpcy5iYXRjaFVwZGF0ZSgpOyAvLyBwcmV2ZW50IGluIGJldHdlZW4gcmUtbGF5b3V0ICMxNTM1IFRPRE86IHRoaXMgb25seSBzZXQgZmxvYXQ9dHJ1ZSwgbmVlZCB0byBwcmV2ZW50IGNvbGxpc2lvbiBjaGVjay4uLlxyXG4gICAgICAgICAgICB0aGlzLmdldEdyaWRJdGVtcygpLmZvckVhY2goZWwgPT4gdGhpcy5fcHJlcGFyZUVsZW1lbnQoZWwpKTtcclxuICAgICAgICAgICAgdGhpcy5iYXRjaFVwZGF0ZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxvYWQgYW55IHBhc3NlZCBpbiBjaGlsZHJlbiBhcyB3ZWxsLCB3aGljaCBvdmVycmlkZXMgYW55IERPTSBsYXlvdXQgZG9uZSBhYm92ZVxyXG4gICAgICAgIGlmICh0aGlzLm9wdHMuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5vcHRzLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5vcHRzLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkKGNoaWxkcmVuKTsgLy8gZG9uJ3QgbG9hZCBlbXB0eVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbih0aGlzLm9wdHMuYW5pbWF0ZSk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlU3R5bGVzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5jb2x1bW4gIT0gMTIpIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdncmlkLXN0YWNrLScgKyB0aGlzLm9wdHMuY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGVnYWN5IHN1cHBvcnQgdG8gYXBwZWFyICdwZXIgZ3JpZGAgb3B0aW9ucyB3aGVuIHJlYWxseSBnbG9iYWwuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5kcmFnSW4pXHJcbiAgICAgICAgICAgIEdyaWRTdGFjay5zZXR1cERyYWdJbih0aGlzLm9wdHMuZHJhZ0luLCB0aGlzLm9wdHMuZHJhZ0luT3B0aW9ucyk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMub3B0cy5kcmFnSW47XHJcbiAgICAgICAgZGVsZXRlIHRoaXMub3B0cy5kcmFnSW5PcHRpb25zO1xyXG4gICAgICAgIC8vIGR5bmFtaWMgZ3JpZHMgcmVxdWlyZSBwYXVzaW5nIGR1cmluZyBkcmFnIHRvIGRldGVjdCBvdmVyIHRvIG5lc3QgdnMgcHVzaFxyXG4gICAgICAgIGlmICh0aGlzLm9wdHMuc3ViR3JpZER5bmFtaWMgJiYgIWRkX21hbmFnZXJfMS5ERE1hbmFnZXIucGF1c2VEcmFnKVxyXG4gICAgICAgICAgICBkZF9tYW5hZ2VyXzEuRERNYW5hZ2VyLnBhdXNlRHJhZyA9IHRydWU7XHJcbiAgICAgICAgaWYgKCgoX2IgPSB0aGlzLm9wdHMuZHJhZ2dhYmxlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucGF1c2UpICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGRkX21hbmFnZXJfMS5ERE1hbmFnZXIucGF1c2VEcmFnID0gdGhpcy5vcHRzLmRyYWdnYWJsZS5wYXVzZTtcclxuICAgICAgICB0aGlzLl9zZXR1cFJlbW92ZURyb3AoKTtcclxuICAgICAgICB0aGlzLl9zZXR1cEFjY2VwdFdpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVdpbmRvd1Jlc2l6ZUV2ZW50KCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGluaXRpYWxpemluZyB0aGUgSFRNTCBlbGVtZW50LCBvciBzZWxlY3RvciBzdHJpbmcsIGludG8gYSBncmlkIHdpbGwgcmV0dXJuIHRoZSBncmlkLiBDYWxsaW5nIGl0IGFnYWluIHdpbGxcclxuICAgICAqIHNpbXBseSByZXR1cm4gdGhlIGV4aXN0aW5nIGluc3RhbmNlIChpZ25vcmUgYW55IHBhc3NlZCBvcHRpb25zKS4gVGhlcmUgaXMgYWxzbyBhbiBpbml0QWxsKCkgdmVyc2lvbiB0aGF0IHN1cHBvcnRcclxuICAgICAqIG11bHRpcGxlIGdyaWRzIGluaXRpYWxpemF0aW9uIGF0IG9uY2UuIE9yIHlvdSBjYW4gdXNlIGFkZEdyaWQoKSB0byBjcmVhdGUgdGhlIGVudGlyZSBncmlkIGZyb20gSlNPTi5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIGdyaWQgb3B0aW9ucyAob3B0aW9uYWwpXHJcbiAgICAgKiBAcGFyYW0gZWxPclN0cmluZyBlbGVtZW50IG9yIENTUyBzZWxlY3RvciAoZmlyc3Qgb25lIHVzZWQpIHRvIGNvbnZlcnQgdG8gYSBncmlkIChkZWZhdWx0IHRvICcuZ3JpZC1zdGFjaycgY2xhc3Mgc2VsZWN0b3IpXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGxldCBncmlkID0gR3JpZFN0YWNrLmluaXQoKTtcclxuICAgICAqXHJcbiAgICAgKiBOb3RlOiB0aGUgSFRNTEVsZW1lbnQgKG9mIHR5cGUgR3JpZEhUTUxFbGVtZW50KSB3aWxsIHN0b3JlIGEgYGdyaWRzdGFjazogR3JpZFN0YWNrYCB2YWx1ZSB0aGF0IGNhbiBiZSByZXRyaWV2ZSBsYXRlclxyXG4gICAgICogbGV0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZC1zdGFjaycpLmdyaWRzdGFjaztcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGluaXQob3B0aW9ucyA9IHt9LCBlbE9yU3RyaW5nID0gJy5ncmlkLXN0YWNrJykge1xyXG4gICAgICAgIGxldCBlbCA9IEdyaWRTdGFjay5nZXRHcmlkRWxlbWVudChlbE9yU3RyaW5nKTtcclxuICAgICAgICBpZiAoIWVsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZWxPclN0cmluZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0dyaWRTdGFjay5pbml0QWxsKCkgbm8gZ3JpZCB3YXMgZm91bmQgd2l0aCBzZWxlY3RvciBcIicgKyBlbE9yU3RyaW5nICsgJ1wiIC0gZWxlbWVudCBtaXNzaW5nIG9yIHdyb25nIHNlbGVjdG9yID8nICtcclxuICAgICAgICAgICAgICAgICAgICAnXFxuTm90ZTogXCIuZ3JpZC1zdGFja1wiIGlzIHJlcXVpcmVkIGZvciBwcm9wZXIgQ1NTIHN0eWxpbmcgYW5kIGRyYWcvZHJvcCwgYW5kIGlzIHRoZSBkZWZhdWx0IHNlbGVjdG9yLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignR3JpZFN0YWNrLmluaXQoKSBubyBncmlkIGVsZW1lbnQgd2FzIHBhc3NlZC4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFlbC5ncmlkc3RhY2spIHtcclxuICAgICAgICAgICAgZWwuZ3JpZHN0YWNrID0gbmV3IEdyaWRTdGFjayhlbCwgdXRpbHNfMS5VdGlscy5jbG9uZURlZXAob3B0aW9ucykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWwuZ3JpZHN0YWNrO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBXaWxsIGluaXRpYWxpemUgYSBsaXN0IG9mIGVsZW1lbnRzIChnaXZlbiBhIHNlbGVjdG9yKSBhbmQgcmV0dXJuIGFuIGFycmF5IG9mIGdyaWRzLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgZ3JpZCBvcHRpb25zIChvcHRpb25hbClcclxuICAgICAqIEBwYXJhbSBzZWxlY3RvciBlbGVtZW50cyBzZWxlY3RvciB0byBjb252ZXJ0IHRvIGdyaWRzIChkZWZhdWx0IHRvICcuZ3JpZC1zdGFjaycgY2xhc3Mgc2VsZWN0b3IpXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGxldCBncmlkcyA9IEdyaWRTdGFjay5pbml0QWxsKCk7XHJcbiAgICAgKiBncmlkcy5mb3JFYWNoKC4uLilcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGluaXRBbGwob3B0aW9ucyA9IHt9LCBzZWxlY3RvciA9ICcuZ3JpZC1zdGFjaycpIHtcclxuICAgICAgICBsZXQgZ3JpZHMgPSBbXTtcclxuICAgICAgICBHcmlkU3RhY2suZ2V0R3JpZEVsZW1lbnRzKHNlbGVjdG9yKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgaWYgKCFlbC5ncmlkc3RhY2spIHtcclxuICAgICAgICAgICAgICAgIGVsLmdyaWRzdGFjayA9IG5ldyBHcmlkU3RhY2soZWwsIHV0aWxzXzEuVXRpbHMuY2xvbmVEZWVwKG9wdGlvbnMpKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmRyYWdJbjtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmRyYWdJbk9wdGlvbnM7IC8vIG9ubHkgbmVlZCB0byBiZSBkb25lIG9uY2UgKHJlYWxseSBhIHN0YXRpYyBnbG9iYWwgdGhpbmcsIG5vdCBwZXIgZ3JpZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBncmlkcy5wdXNoKGVsLmdyaWRzdGFjayk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGdyaWRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdHcmlkU3RhY2suaW5pdEFsbCgpIG5vIGdyaWQgd2FzIGZvdW5kIHdpdGggc2VsZWN0b3IgXCInICsgc2VsZWN0b3IgKyAnXCIgLSBlbGVtZW50IG1pc3Npbmcgb3Igd3Jvbmcgc2VsZWN0b3IgPycgK1xyXG4gICAgICAgICAgICAgICAgJ1xcbk5vdGU6IFwiLmdyaWQtc3RhY2tcIiBpcyByZXF1aXJlZCBmb3IgcHJvcGVyIENTUyBzdHlsaW5nIGFuZCBkcmFnL2Ryb3AsIGFuZCBpcyB0aGUgZGVmYXVsdCBzZWxlY3Rvci4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdyaWRzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsIHRvIGNyZWF0ZSBhIGdyaWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucywgaW5jbHVkaW5nIGxvYWRpbmcgYW55IGNoaWxkcmVuIGZyb20gSlNPTiBzdHJ1Y3R1cmUuIFRoaXMgd2lsbCBjYWxsIEdyaWRTdGFjay5pbml0KCksIHRoZW5cclxuICAgICAqIGdyaWQubG9hZCgpIG9uIGFueSBwYXNzZWQgY2hpbGRyZW4gKHJlY3Vyc2l2ZWx5KS4gR3JlYXQgYWx0ZXJuYXRpdmUgdG8gY2FsbGluZyBpbml0KCkgaWYgeW91IHdhbnQgZW50aXJlIGdyaWQgdG8gY29tZSBmcm9tXHJcbiAgICAgKiBKU09OIHNlcmlhbGl6ZWQgZGF0YSwgaW5jbHVkaW5nIG9wdGlvbnMuXHJcbiAgICAgKiBAcGFyYW0gcGFyZW50IEhUTUwgZWxlbWVudCBwYXJlbnQgdG8gdGhlIGdyaWRcclxuICAgICAqIEBwYXJhbSBvcHQgZ3JpZHMgb3B0aW9ucyB1c2VkIHRvIGluaXRpYWxpemUgdGhlIGdyaWQsIGFuZCBsaXN0IG9mIGNoaWxkcmVuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhZGRHcmlkKHBhcmVudCwgb3B0ID0ge30pIHtcclxuICAgICAgICBpZiAoIXBhcmVudClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBncmlkIGVsZW1lbnQsIGJ1dCBjaGVjayBpZiB0aGUgcGFzc2VkICdwYXJlbnQnIGFscmVhZHkgaGFzIGdyaWQgc3R5bGluZyBhbmQgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZFxyXG4gICAgICAgIGxldCBlbCA9IHBhcmVudDtcclxuICAgICAgICBjb25zdCBwYXJlbnRJc0dyaWQgPSBwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLXN0YWNrJyk7XHJcbiAgICAgICAgaWYgKCFwYXJlbnRJc0dyaWQgfHwgb3B0LmFkZFJlbW92ZUNCKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHQuYWRkUmVtb3ZlQ0IpIHtcclxuICAgICAgICAgICAgICAgIGVsID0gb3B0LmFkZFJlbW92ZUNCKHBhcmVudCwgb3B0LCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBkb2MgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoJycpOyAvLyBJRSBuZWVkcyBhIHBhcmFtXHJcbiAgICAgICAgICAgICAgICBkb2MuYm9keS5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImdyaWQtc3RhY2sgJHtvcHQuY2xhc3MgfHwgJyd9XCI+PC9kaXY+YDtcclxuICAgICAgICAgICAgICAgIGVsID0gZG9jLmJvZHkuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNyZWF0ZSBncmlkIGNsYXNzIGFuZCBsb2FkIGFueSBjaGlsZHJlblxyXG4gICAgICAgIGxldCBncmlkID0gR3JpZFN0YWNrLmluaXQob3B0LCBlbCk7XHJcbiAgICAgICAgcmV0dXJuIGdyaWQ7XHJcbiAgICB9XHJcbiAgICAvKiogY2FsbCB0aGlzIG1ldGhvZCB0byByZWdpc3RlciB5b3VyIGVuZ2luZSBpbnN0ZWFkIG9mIHRoZSBkZWZhdWx0IG9uZS5cclxuICAgICAqIFNlZSBpbnN0ZWFkIGBHcmlkU3RhY2tPcHRpb25zLmVuZ2luZUNsYXNzYCBpZiB5b3Ugb25seSBuZWVkIHRvXHJcbiAgICAgKiByZXBsYWNlIGp1c3Qgb25lIGluc3RhbmNlLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVnaXN0ZXJFbmdpbmUoZW5naW5lQ2xhc3MpIHtcclxuICAgICAgICBHcmlkU3RhY2suZW5naW5lQ2xhc3MgPSBlbmdpbmVDbGFzcztcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgY3JlYXRlIHBsYWNlaG9sZGVyIERJViBhcyBuZWVkZWQgKi9cclxuICAgIGdldCBwbGFjZWhvbGRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYWNlaG9sZGVyKSB7XHJcbiAgICAgICAgICAgIGxldCBwbGFjZWhvbGRlckNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IC8vIGNoaWxkIHNvIHBhZGRpbmcgbWF0Y2ggaXRlbS1jb250ZW50XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyQ2hpbGQuY2xhc3NOYW1lID0gJ3BsYWNlaG9sZGVyLWNvbnRlbnQnO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnBsYWNlaG9sZGVyVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJDaGlsZC5pbm5lckhUTUwgPSB0aGlzLm9wdHMucGxhY2Vob2xkZXJUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyLmNsYXNzTGlzdC5hZGQodGhpcy5vcHRzLnBsYWNlaG9sZGVyQ2xhc3MsIHR5cGVzXzEuZ3JpZERlZmF1bHRzLml0ZW1DbGFzcywgdGhpcy5vcHRzLml0ZW1DbGFzcyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIuYXBwZW5kQ2hpbGQocGxhY2Vob2xkZXJDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlcjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGEgbmV3IHdpZGdldCBhbmQgcmV0dXJucyBpdC5cclxuICAgICAqXHJcbiAgICAgKiBXaWRnZXQgd2lsbCBiZSBhbHdheXMgcGxhY2VkIGV2ZW4gaWYgcmVzdWx0IGhlaWdodCBpcyBtb3JlIHRoYW4gYWN0dWFsIGdyaWQgaGVpZ2h0LlxyXG4gICAgICogWW91IG5lZWQgdG8gdXNlIGB3aWxsSXRGaXQoKWAgYmVmb3JlIGNhbGxpbmcgYWRkV2lkZ2V0IGZvciBhZGRpdGlvbmFsIGNoZWNrLlxyXG4gICAgICogU2VlIGFsc28gYG1ha2VXaWRnZXQoKWAuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGxldCBncmlkID0gR3JpZFN0YWNrLmluaXQoKTtcclxuICAgICAqIGdyaWQuYWRkV2lkZ2V0KHt3OiAzLCBjb250ZW50OiAnaGVsbG8nfSk7XHJcbiAgICAgKiBncmlkLmFkZFdpZGdldCgnPGRpdiBjbGFzcz1cImdyaWQtc3RhY2staXRlbVwiPjxkaXYgY2xhc3M9XCJncmlkLXN0YWNrLWl0ZW0tY29udGVudFwiPmhlbGxvPC9kaXY+PC9kaXY+Jywge3c6IDN9KTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZWwgIEdyaWRTdGFja1dpZGdldCAod2hpY2ggY2FuIGhhdmUgY29udGVudCBzdHJpbmcgYXMgd2VsbCksIGh0bWwgZWxlbWVudCwgb3Igc3RyaW5nIGRlZmluaXRpb24gdG8gYWRkXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyB3aWRnZXQgcG9zaXRpb24vc2l6ZSBvcHRpb25zIChvcHRpb25hbCwgYW5kIGlnbm9yZSBpZiBmaXJzdCBwYXJhbSBpcyBhbHJlYWR5IG9wdGlvbikgLSBzZWUgR3JpZFN0YWNrV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZFdpZGdldChlbHMsIG9wdGlvbnMpIHtcclxuICAgICAgICBmdW5jdGlvbiBpc0dyaWRTdGFja1dpZGdldCh3KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3LmVsICE9PSB1bmRlZmluZWQgfHwgdy54ICE9PSB1bmRlZmluZWQgfHwgdy55ICE9PSB1bmRlZmluZWQgfHwgdy53ICE9PSB1bmRlZmluZWQgfHwgdy5oICE9PSB1bmRlZmluZWQgfHwgdy5jb250ZW50ICE9PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlbDtcclxuICAgICAgICBsZXQgbm9kZTtcclxuICAgICAgICBpZiAodHlwZW9mIGVscyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgbGV0IGRvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnJyk7IC8vIElFIG5lZWRzIGEgcGFyYW1cclxuICAgICAgICAgICAgZG9jLmJvZHkuaW5uZXJIVE1MID0gZWxzO1xyXG4gICAgICAgICAgICBlbCA9IGRvYy5ib2R5LmNoaWxkcmVuWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgaXNHcmlkU3RhY2tXaWRnZXQoZWxzKSkge1xyXG4gICAgICAgICAgICBub2RlID0gb3B0aW9ucyA9IGVscztcclxuICAgICAgICAgICAgaWYgKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbm9kZS5lbCkge1xyXG4gICAgICAgICAgICAgICAgZWwgPSBub2RlLmVsOyAvLyByZS11c2UgZWxlbWVudCBzdG9yZWQgaW4gdGhlIG5vZGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLm9wdHMuYWRkUmVtb3ZlQ0IpIHtcclxuICAgICAgICAgICAgICAgIGVsID0gdGhpcy5vcHRzLmFkZFJlbW92ZUNCKHRoaXMuZWwsIG9wdGlvbnMsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jb250ZW50KSB8fCAnJztcclxuICAgICAgICAgICAgICAgIGxldCBkb2MgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoJycpOyAvLyBJRSBuZWVkcyBhIHBhcmFtXHJcbiAgICAgICAgICAgICAgICBkb2MuYm9keS5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImdyaWQtc3RhY2staXRlbSAke3RoaXMub3B0cy5pdGVtQ2xhc3MgfHwgJyd9XCI+PGRpdiBjbGFzcz1cImdyaWQtc3RhY2staXRlbS1jb250ZW50XCI+JHtjb250ZW50fTwvZGl2PjwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICBlbCA9IGRvYy5ib2R5LmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBlbCA9IGVscztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFlbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIFRlbXB0aW5nIHRvIGluaXRpYWxpemUgdGhlIHBhc3NlZCBpbiBvcHQgd2l0aCBkZWZhdWx0IGFuZCB2YWxpZCB2YWx1ZXMsIGJ1dCB0aGlzIGJyZWFrIGtub2Nrb3V0IGRlbW9zXHJcbiAgICAgICAgLy8gYXMgdGhlIGFjdHVhbCB2YWx1ZSBhcmUgZmlsbGVkIGluIHdoZW4gX3ByZXBhcmVFbGVtZW50KCkgY2FsbHMgZWwuZ2V0QXR0cmlidXRlKCdncy14eXonKSBiZWZvcmUgYWRkaW5nIHRoZSBub2RlLlxyXG4gICAgICAgIC8vIFNvIG1ha2Ugc3VyZSB3ZSBsb2FkIGFueSBET00gYXR0cmlidXRlcyB0aGF0IGFyZSBub3Qgc3BlY2lmaWVkIGluIHBhc3NlZCBpbiBvcHRpb25zICh3aGljaCBvdmVycmlkZSlcclxuICAgICAgICBsZXQgZG9tQXR0ciA9IHRoaXMuX3JlYWRBdHRyKGVsKTtcclxuICAgICAgICBvcHRpb25zID0gdXRpbHNfMS5VdGlscy5jbG9uZURlZXAob3B0aW9ucykgfHwge307IC8vIG1ha2UgYSBjb3B5IGJlZm9yZSB3ZSBtb2RpZnkgaW4gY2FzZSBjYWxsZXIgcmUtdXNlcyBpdFxyXG4gICAgICAgIHV0aWxzXzEuVXRpbHMuZGVmYXVsdHMob3B0aW9ucywgZG9tQXR0cik7XHJcbiAgICAgICAgbm9kZSA9IHRoaXMuZW5naW5lLnByZXBhcmVOb2RlKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3dyaXRlQXR0cihlbCwgb3B0aW9ucyk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luc2VydE5vdEFwcGVuZCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsLnByZXBlbmQoZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNpbWlsYXIgdG8gbWFrZVdpZGdldCgpIHRoYXQgZG9lc24ndCByZWFkIGF0dHIgYWdhaW4gYW5kIHdvcnNlIHJlLWNyZWF0ZSBhIG5ldyBub2RlIGFuZCBsb29zZSBhbnkgX2lkXHJcbiAgICAgICAgdGhpcy5fcHJlcGFyZUVsZW1lbnQoZWwsIHRydWUsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUNvbnRhaW5lckhlaWdodCgpO1xyXG4gICAgICAgIC8vIHNlZSBpZiB0aGVyZSBpcyBhIHN1Yi1ncmlkIHRvIGNyZWF0ZVxyXG4gICAgICAgIGlmIChub2RlLnN1YkdyaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tYWtlU3ViR3JpZChub2RlLmVsLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgZmFsc2UpOyAvL25vZGUuc3ViR3JpZCB3aWxsIGJlIHVzZWQgYXMgb3B0aW9uIGluIG1ldGhvZCwgbm8gbmVlZCB0byBwYXNzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIHdlJ3JlIGFkZGluZyBhbiBpdGVtIGludG8gMSBjb2x1bW4gKF9wcmV2Q29sdW1uIGlzIHNldCBvbmx5IHdoZW4gZ29pbmcgdG8gMSkgbWFrZSBzdXJlXHJcbiAgICAgICAgLy8gd2UgZG9uJ3Qgb3ZlcnJpZGUgdGhlIGxhcmdlciAxMiBjb2x1bW4gbGF5b3V0IHRoYXQgd2FzIGFscmVhZHkgc2F2ZWQuICMxOTg1XHJcbiAgICAgICAgaWYgKHRoaXMuX3ByZXZDb2x1bW4gJiYgdGhpcy5vcHRzLmNvbHVtbiA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pZ25vcmVMYXlvdXRzTm9kZUNoYW5nZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3RyaWdnZXJBZGRFdmVudCgpO1xyXG4gICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuZ2VFdmVudCgpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9pZ25vcmVMYXlvdXRzTm9kZUNoYW5nZTtcclxuICAgICAgICByZXR1cm4gZWw7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgYW4gZXhpc3RpbmcgZ3JpZEl0ZW0gZWxlbWVudCBpbnRvIGEgc3ViLWdyaWQgd2l0aCB0aGUgZ2l2ZW4gKG9wdGlvbmFsKSBvcHRpb25zLCBlbHNlIGluaGVyaXQgdGhlbVxyXG4gICAgICogZnJvbSB0aGUgcGFyZW50J3Mgc3ViR3JpZCBvcHRpb25zLlxyXG4gICAgICogQHBhcmFtIGVsIGdyaWRJdGVtIGVsZW1lbnQgdG8gY29udmVydFxyXG4gICAgICogQHBhcmFtIG9wcyAob3B0aW9uYWwpIHN1Yi1ncmlkIG9wdGlvbnMsIGVsc2UgZGVmYXVsdCB0byBub2RlLCB0aGVuIHBhcmVudCBzZXR0aW5ncywgZWxzZSBkZWZhdWx0c1xyXG4gICAgICogQHBhcmFtIG5vZGVUb0FkZCAob3B0aW9uYWwpIG5vZGUgdG8gYWRkIHRvIHRoZSBuZXdseSBjcmVhdGVkIHN1YiBncmlkICh1c2VkIHdoZW4gZHJhZ2dpbmcgb3ZlciBleGlzdGluZyByZWd1bGFyIGl0ZW0pXHJcbiAgICAgKiBAcmV0dXJucyBuZXdseSBjcmVhdGVkIGdyaWRcclxuICAgICAqL1xyXG4gICAgbWFrZVN1YkdyaWQoZWwsIG9wcywgbm9kZVRvQWRkLCBzYXZlQ29udGVudCA9IHRydWUpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgICAgICBsZXQgbm9kZSA9IGVsLmdyaWRzdGFja05vZGU7XHJcbiAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1ha2VXaWRnZXQoZWwpLmdyaWRzdGFja05vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoX2EgPSBub2RlLnN1YkdyaWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5lbClcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGUuc3ViR3JpZDsgLy8gYWxyZWFkeSBkb25lXHJcbiAgICAgICAgLy8gZmluZCB0aGUgdGVtcGxhdGUgc3ViR3JpZCBzdG9yZWQgb24gYSBwYXJlbnQgYXMgZmFsbGJhY2suLi5cclxuICAgICAgICBsZXQgc3ViR3JpZFRlbXBsYXRlOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXNcclxuICAgICAgICBsZXQgZ3JpZCA9IHRoaXM7XHJcbiAgICAgICAgd2hpbGUgKGdyaWQgJiYgIXN1YkdyaWRUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICBzdWJHcmlkVGVtcGxhdGUgPSAoX2IgPSBncmlkLm9wdHMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zdWJHcmlkO1xyXG4gICAgICAgICAgICBncmlkID0gKF9jID0gZ3JpZC5wYXJlbnRHcmlkSXRlbSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmdyaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLi4uIGFuZCBzZXQgdGhlIGNyZWF0ZSBvcHRpb25zXHJcbiAgICAgICAgb3BzID0gdXRpbHNfMS5VdGlscy5jbG9uZURlZXAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIChzdWJHcmlkVGVtcGxhdGUgfHwge30pKSwgeyBjaGlsZHJlbjogdW5kZWZpbmVkIH0pLCAob3BzIHx8IG5vZGUuc3ViR3JpZCkpKTtcclxuICAgICAgICBub2RlLnN1YkdyaWQgPSBvcHM7XHJcbiAgICAgICAgLy8gaWYgY29sdW1uIHNwZWNpYWwgY2FzZSBpdCBzZXQsIHJlbWVtYmVyIHRoYXQgZmxhZyBhbmQgc2V0IGRlZmF1bHRcclxuICAgICAgICBsZXQgYXV0b0NvbHVtbjtcclxuICAgICAgICBpZiAob3BzLmNvbHVtbiA9PT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgIGF1dG9Db2x1bW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBvcHMuY29sdW1uID0gTWF0aC5tYXgobm9kZS53IHx8IDEsIChub2RlVG9BZGQgPT09IG51bGwgfHwgbm9kZVRvQWRkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBub2RlVG9BZGQudykgfHwgMSk7XHJcbiAgICAgICAgICAgIG9wcy5kaXNhYmxlT25lQ29sdW1uTW9kZSA9IHRydWU7IC8vIGRyaXZlbiBieSBwYXJlbnRcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgd2UncmUgY29udmVydGluZyBhbiBleGlzdGluZyBmdWxsIGl0ZW0sIG1vdmUgb3ZlciB0aGUgY29udGVudCB0byBiZSB0aGUgZmlyc3Qgc3ViIGl0ZW0gaW4gdGhlIG5ldyBncmlkXHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBub2RlLmVsLnF1ZXJ5U2VsZWN0b3IoJy5ncmlkLXN0YWNrLWl0ZW0tY29udGVudCcpO1xyXG4gICAgICAgIGxldCBuZXdJdGVtO1xyXG4gICAgICAgIGxldCBuZXdJdGVtT3B0O1xyXG4gICAgICAgIGlmIChzYXZlQ29udGVudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVERChub2RlLmVsKTsgLy8gcmVtb3ZlIEQmRCBzaW5jZSBpdCdzIHNldCBvbiBjb250ZW50IGRpdlxyXG4gICAgICAgICAgICBuZXdJdGVtT3B0ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBub2RlKSwgeyB4OiAwLCB5OiAwIH0pO1xyXG4gICAgICAgICAgICB1dGlsc18xLlV0aWxzLnJlbW92ZUludGVybmFsRm9yU2F2ZShuZXdJdGVtT3B0KTtcclxuICAgICAgICAgICAgZGVsZXRlIG5ld0l0ZW1PcHQuc3ViR3JpZDtcclxuICAgICAgICAgICAgaWYgKG5vZGUuY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgbmV3SXRlbU9wdC5jb250ZW50ID0gbm9kZS5jb250ZW50O1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG5vZGUuY29udGVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmFkZFJlbW92ZUNCKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdJdGVtID0gdGhpcy5vcHRzLmFkZFJlbW92ZUNCKHRoaXMuZWwsIG5ld0l0ZW1PcHQsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBkb2MgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoJycpOyAvLyBJRSBuZWVkcyBhIHBhcmFtXHJcbiAgICAgICAgICAgICAgICBkb2MuYm9keS5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImdyaWQtc3RhY2staXRlbVwiPjwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICBuZXdJdGVtID0gZG9jLmJvZHkuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgICAgICAgICBuZXdJdGVtLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgZG9jLmJvZHkuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJncmlkLXN0YWNrLWl0ZW0tY29udGVudFwiPjwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gZG9jLmJvZHkuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgICAgICAgICBub2RlLmVsLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3ByZXBhcmVEcmFnRHJvcEJ5Tm9kZShub2RlKTsgLy8gLi4uIGFuZCByZXN0b3JlIG9yaWdpbmFsIEQmRFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiB3ZSdyZSBhZGRpbmcgYW4gYWRkaXRpb25hbCBpdGVtLCBtYWtlIHRoZSBjb250YWluZXIgbGFyZ2UgZW5vdWdoIHRvIGhhdmUgdGhlbSBib3RoXHJcbiAgICAgICAgaWYgKG5vZGVUb0FkZCkge1xyXG4gICAgICAgICAgICBsZXQgdyA9IGF1dG9Db2x1bW4gPyBvcHMuY29sdW1uIDogbm9kZS53O1xyXG4gICAgICAgICAgICBsZXQgaCA9IG5vZGUuaCArIG5vZGVUb0FkZC5oO1xyXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSBub2RlLmVsLnN0eWxlO1xyXG4gICAgICAgICAgICBzdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnOyAvLyBzaG93IHVwIGluc3RhbnRseSBzbyB3ZSBkb24ndCBzZWUgc2Nyb2xsYmFyIHdpdGggbm9kZVRvQWRkXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKG5vZGUuZWwsIHsgdywgaCB9KTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzdHlsZS50cmFuc2l0aW9uID0gbnVsbCk7IC8vIHJlY292ZXIgYW5pbWF0aW9uXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm9wdHMuYWRkUmVtb3ZlQ0IpIHtcclxuICAgICAgICAgICAgb3BzLmFkZFJlbW92ZUNCID0gb3BzLmFkZFJlbW92ZUNCIHx8IHRoaXMub3B0cy5hZGRSZW1vdmVDQjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN1YkdyaWQgPSBub2RlLnN1YkdyaWQgPSBHcmlkU3RhY2suYWRkR3JpZChjb250ZW50LCBvcHMpO1xyXG4gICAgICAgIGlmIChub2RlVG9BZGQgPT09IG51bGwgfHwgbm9kZVRvQWRkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBub2RlVG9BZGQuX21vdmluZylcclxuICAgICAgICAgICAgc3ViR3JpZC5faXNUZW1wID0gdHJ1ZTsgLy8gcHJldmVudCByZS1uZXN0aW5nIGFzIHdlIGFkZCBvdmVyXHJcbiAgICAgICAgaWYgKGF1dG9Db2x1bW4pXHJcbiAgICAgICAgICAgIHN1YkdyaWQuX2F1dG9Db2x1bW4gPSB0cnVlO1xyXG4gICAgICAgIC8vIGFkZCB0aGUgb3JpZ2luYWwgY29udGVudCBiYWNrIGFzIGEgY2hpbGQgb2YgaHRlIG5ld2x5IGNyZWF0ZWQgZ3JpZFxyXG4gICAgICAgIGlmIChzYXZlQ29udGVudCkge1xyXG4gICAgICAgICAgICBzdWJHcmlkLmFkZFdpZGdldChuZXdJdGVtLCBuZXdJdGVtT3B0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbm93IGFkZCBhbnkgYWRkaXRpb25hbCBub2RlXHJcbiAgICAgICAgaWYgKG5vZGVUb0FkZCkge1xyXG4gICAgICAgICAgICBpZiAobm9kZVRvQWRkLl9tb3ZpbmcpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBhbiBhcnRpZmljaWFsIGV2ZW50IGV2ZW4gZm9yIHRoZSBqdXN0IGNyZWF0ZWQgZ3JpZCB0byByZWNlaXZlIHRoaXMgaXRlbVxyXG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdXRpbHNfMS5VdGlscy5zaW11bGF0ZU1vdXNlRXZlbnQobm9kZVRvQWRkLl9ldmVudCwgJ21vdXNlZW50ZXInLCBzdWJHcmlkLmVsKSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdWJHcmlkLmFkZFdpZGdldChub2RlLmVsLCBub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3ViR3JpZDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogY2FsbGVkIHdoZW4gYW4gaXRlbSB3YXMgY29udmVydGVkIGludG8gYSBuZXN0ZWQgZ3JpZCB0byBhY2NvbW1vZGF0ZSBhIGRyYWdnZWQgb3ZlciBpdGVtLCBidXQgdGhlbiBpdGVtIGxlYXZlcyAtIHJldHVybiBiYWNrXHJcbiAgICAgKiB0byB0aGUgb3JpZ2luYWwgZ3JpZC1pdGVtLiBBbHNvIGNhbGxlZCB0byByZW1vdmUgZW1wdHkgc3ViLWdyaWRzIHdoZW4gbGFzdCBpdGVtIGlzIGRyYWdnZWQgb3V0IChzaW5jZSByZS1jcmVhdGluZyBpcyBzaW1wbGUpXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUFzU3ViR3JpZChub2RlVGhhdFJlbW92ZWQpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgbGV0IHBHcmlkID0gKF9hID0gdGhpcy5wYXJlbnRHcmlkSXRlbSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdyaWQ7XHJcbiAgICAgICAgaWYgKCFwR3JpZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHBHcmlkLmJhdGNoVXBkYXRlKCk7XHJcbiAgICAgICAgcEdyaWQucmVtb3ZlV2lkZ2V0KHRoaXMucGFyZW50R3JpZEl0ZW0uZWwsIHRydWUsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuZW5naW5lLm5vZGVzLmZvckVhY2gobiA9PiB7XHJcbiAgICAgICAgICAgIC8vIG1pZ3JhdGUgYW55IGNoaWxkcmVuIG92ZXIgYW5kIG9mZnNldHRpbmcgYnkgb3VyIGxvY2F0aW9uXHJcbiAgICAgICAgICAgIG4ueCArPSB0aGlzLnBhcmVudEdyaWRJdGVtLng7XHJcbiAgICAgICAgICAgIG4ueSArPSB0aGlzLnBhcmVudEdyaWRJdGVtLnk7XHJcbiAgICAgICAgICAgIHBHcmlkLmFkZFdpZGdldChuLmVsLCBuKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwR3JpZC5iYXRjaFVwZGF0ZShmYWxzZSk7XHJcbiAgICAgICAgaWYgKHRoaXMucGFyZW50R3JpZEl0ZW0pXHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnBhcmVudEdyaWRJdGVtLnN1YkdyaWQ7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMucGFyZW50R3JpZEl0ZW07XHJcbiAgICAgICAgLy8gY3JlYXRlIGFuIGFydGlmaWNpYWwgZXZlbnQgZm9yIHRoZSBvcmlnaW5hbCBncmlkIG5vdyB0aGF0IHRoaXMgb25lIGlzIGdvbmUgKGdvdCBhIGxlYXZlLCBidXQgd29uJ3QgZ2V0IGVudGVyKVxyXG4gICAgICAgIGlmIChub2RlVGhhdFJlbW92ZWQpIHtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdXRpbHNfMS5VdGlscy5zaW11bGF0ZU1vdXNlRXZlbnQobm9kZVRoYXRSZW1vdmVkLl9ldmVudCwgJ21vdXNlZW50ZXInLCBwR3JpZC5lbCksIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgLyoqXHJcbiAgICAgKiBzYXZlcyB0aGUgY3VycmVudCBsYXlvdXQgcmV0dXJuaW5nIGEgbGlzdCBvZiB3aWRnZXRzIGZvciBzZXJpYWxpemF0aW9uIHdoaWNoIG1pZ2h0IGluY2x1ZGUgYW55IG5lc3RlZCBncmlkcy5cclxuICAgICAqIEBwYXJhbSBzYXZlQ29udGVudCBpZiB0cnVlIChkZWZhdWx0KSB0aGUgbGF0ZXN0IGh0bWwgaW5zaWRlIC5ncmlkLXN0YWNrLWNvbnRlbnQgd2lsbCBiZSBzYXZlZCB0byBHcmlkU3RhY2tXaWRnZXQuY29udGVudCBmaWVsZCwgZWxzZSBpdCB3aWxsXHJcbiAgICAgKiBiZSByZW1vdmVkLlxyXG4gICAgICogQHBhcmFtIHNhdmVHcmlkT3B0IGlmIHRydWUgKGRlZmF1bHQgZmFsc2UpLCBzYXZlIHRoZSBncmlkIG9wdGlvbnMgaXRzZWxmLCBzbyB5b3UgY2FuIGNhbGwgdGhlIG5ldyBHcmlkU3RhY2suYWRkR3JpZCgpXHJcbiAgICAgKiB0byByZWNyZWF0ZSBldmVyeXRoaW5nIGZyb20gc2NyYXRjaC4gR3JpZFN0YWNrT3B0aW9ucy5jaGlsZHJlbiB3b3VsZCB0aGVuIGNvbnRhaW4gdGhlIHdpZGdldCBsaXN0IGluc3RlYWQuXHJcbiAgICAgKiBAcmV0dXJucyBsaXN0IG9mIHdpZGdldHMgb3IgZnVsbCBncmlkIG9wdGlvbiwgaW5jbHVkaW5nIC5jaGlsZHJlbiBsaXN0IG9mIHdpZGdldHNcclxuICAgICAqL1xyXG4gICAgc2F2ZShzYXZlQ29udGVudCA9IHRydWUsIHNhdmVHcmlkT3B0ID0gZmFsc2UpIHtcclxuICAgICAgICAvLyByZXR1cm4gY29waWVkIG5vZGVzIHdlIGNhbiBtb2RpZnkgYXQgd2lsbC4uLlxyXG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5lbmdpbmUuc2F2ZShzYXZlQ29udGVudCk7XHJcbiAgICAgICAgLy8gY2hlY2sgZm9yIEhUTUwgY29udGVudCBhbmQgbmVzdGVkIGdyaWRzXHJcbiAgICAgICAgbGlzdC5mb3JFYWNoKG4gPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIGlmIChzYXZlQ29udGVudCAmJiBuLmVsICYmICFuLnN1YkdyaWQpIHsgLy8gc3ViLWdyaWQgYXJlIHNhdmVkIGRpZmZlcmVudGx5LCBub3QgcGxhaW4gY29udGVudFxyXG4gICAgICAgICAgICAgICAgbGV0IHN1YiA9IG4uZWwucXVlcnlTZWxlY3RvcignLmdyaWQtc3RhY2staXRlbS1jb250ZW50Jyk7XHJcbiAgICAgICAgICAgICAgICBuLmNvbnRlbnQgPSBzdWIgPyBzdWIuaW5uZXJIVE1MIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFuLmNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG4uY29udGVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghc2F2ZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgbi5jb250ZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIG5lc3RlZCBncmlkXHJcbiAgICAgICAgICAgICAgICBpZiAoKF9hID0gbi5zdWJHcmlkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaXN0T3JPcHQgPSBuLnN1YkdyaWQuc2F2ZShzYXZlQ29udGVudCwgc2F2ZUdyaWRPcHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG4uc3ViR3JpZCA9IChzYXZlR3JpZE9wdCA/IGxpc3RPck9wdCA6IHsgY2hpbGRyZW46IGxpc3RPck9wdCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWxldGUgbi5lbDtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBjaGVjayBpZiBzYXZlIGVudGlyZSBncmlkIG9wdGlvbnMgKG5lZWRlZCBmb3IgcmVjdXJzaXZlKSArIGNoaWxkcmVuLi4uXHJcbiAgICAgICAgaWYgKHNhdmVHcmlkT3B0KSB7XHJcbiAgICAgICAgICAgIGxldCBvID0gdXRpbHNfMS5VdGlscy5jbG9uZURlZXAodGhpcy5vcHRzKTtcclxuICAgICAgICAgICAgLy8gZGVsZXRlIGRlZmF1bHQgdmFsdWVzIHRoYXQgd2lsbCBiZSByZWNyZWF0ZWQgb24gbGF1bmNoXHJcbiAgICAgICAgICAgIGlmIChvLm1hcmdpbkJvdHRvbSA9PT0gby5tYXJnaW5Ub3AgJiYgby5tYXJnaW5SaWdodCA9PT0gby5tYXJnaW5MZWZ0ICYmIG8ubWFyZ2luVG9wID09PSBvLm1hcmdpblJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBvLm1hcmdpbiA9IG8ubWFyZ2luVG9wO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG8ubWFyZ2luVG9wO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG8ubWFyZ2luUmlnaHQ7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgby5tYXJnaW5Cb3R0b207XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgby5tYXJnaW5MZWZ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvLnJ0bCA9PT0gKHRoaXMuZWwuc3R5bGUuZGlyZWN0aW9uID09PSAncnRsJykpIHtcclxuICAgICAgICAgICAgICAgIG8ucnRsID0gJ2F1dG8nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0F1dG9DZWxsSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBvLmNlbGxIZWlnaHQgPSAnYXV0byc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2F1dG9Db2x1bW4pIHtcclxuICAgICAgICAgICAgICAgIG8uY29sdW1uID0gJ2F1dG8nO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG8uZGlzYWJsZU9uZUNvbHVtbk1vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgb3JpZ1Nob3cgPSBvLl9hbHdheXNTaG93UmVzaXplSGFuZGxlO1xyXG4gICAgICAgICAgICBkZWxldGUgby5fYWx3YXlzU2hvd1Jlc2l6ZUhhbmRsZTtcclxuICAgICAgICAgICAgaWYgKG9yaWdTaG93ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG8uYWx3YXlzU2hvd1Jlc2l6ZUhhbmRsZSA9IG9yaWdTaG93O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG8uYWx3YXlzU2hvd1Jlc2l6ZUhhbmRsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dGlsc18xLlV0aWxzLnJlbW92ZUludGVybmFsQW5kU2FtZShvLCB0eXBlc18xLmdyaWREZWZhdWx0cyk7XHJcbiAgICAgICAgICAgIG8uY2hpbGRyZW4gPSBsaXN0O1xyXG4gICAgICAgICAgICByZXR1cm4gbztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGxvYWQgdGhlIHdpZGdldHMgZnJvbSBhIGxpc3QuIFRoaXMgd2lsbCBjYWxsIHVwZGF0ZSgpIG9uIGVhY2ggKG1hdGNoaW5nIGJ5IGlkKSBvciBhZGQvcmVtb3ZlIHdpZGdldHMgdGhhdCBhcmUgbm90IHRoZXJlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXlvdXQgbGlzdCBvZiB3aWRnZXRzIGRlZmluaXRpb24gdG8gdXBkYXRlL2NyZWF0ZVxyXG4gICAgICogQHBhcmFtIGFkZEFuZFJlbW92ZSBib29sZWFuIChkZWZhdWx0IHRydWUpIG9yIGNhbGxiYWNrIG1ldGhvZCBjYW4gYmUgcGFzc2VkIHRvIGNvbnRyb2wgaWYgYW5kIGhvdyBtaXNzaW5nIHdpZGdldHMgY2FuIGJlIGFkZGVkL3JlbW92ZWQsIGdpdmluZ1xyXG4gICAgICogdGhlIHVzZXIgY29udHJvbCBvZiBpbnNlcnRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHNlZSBodHRwOi8vZ3JpZHN0YWNranMuY29tL2RlbW8vc2VyaWFsaXphdGlvbi5odG1sXHJcbiAgICAgKiovXHJcbiAgICBsb2FkKGxheW91dCwgYWRkUmVtb3ZlID0gdGhpcy5vcHRzLmFkZFJlbW92ZUNCIHx8IHRydWUpIHtcclxuICAgICAgICBsZXQgaXRlbXMgPSBHcmlkU3RhY2suVXRpbHMuc29ydChbLi4ubGF5b3V0XSwgLTEsIHRoaXMuX3ByZXZDb2x1bW4gfHwgdGhpcy5nZXRDb2x1bW4oKSk7IC8vIG1ha2UgY29weSBiZWZvcmUgd2UgbW9kL3NvcnRcclxuICAgICAgICB0aGlzLl9pbnNlcnROb3RBcHBlbmQgPSB0cnVlOyAvLyBzaW5jZSBjcmVhdGUgaW4gcmV2ZXJzZSBvcmRlci4uLlxyXG4gICAgICAgIC8vIGlmIHdlJ3JlIGxvYWRpbmcgYSBsYXlvdXQgaW50byBmb3IgZXhhbXBsZSAxIGNvbHVtbiAoX3ByZXZDb2x1bW4gaXMgc2V0IG9ubHkgd2hlbiBnb2luZyB0byAxKSBhbmQgaXRlbXMgZG9uJ3QgZml0LCBtYWtlIHN1cmUgdG8gc2F2ZVxyXG4gICAgICAgIC8vIHRoZSBvcmlnaW5hbCB3YW50ZWQgbGF5b3V0IHNvIHdlIGNhbiBzY2FsZSBiYWNrIHVwIGNvcnJlY3RseSAjMTQ3MVxyXG4gICAgICAgIGlmICh0aGlzLl9wcmV2Q29sdW1uICYmIHRoaXMuX3ByZXZDb2x1bW4gIT09IHRoaXMub3B0cy5jb2x1bW4gJiYgaXRlbXMuc29tZShuID0+IChuLnggKyBuLncpID4gdGhpcy5vcHRzLmNvbHVtbikpIHtcclxuICAgICAgICAgICAgdGhpcy5faWdub3JlTGF5b3V0c05vZGVDaGFuZ2UgPSB0cnVlOyAvLyBza2lwIGxheW91dCB1cGRhdGVcclxuICAgICAgICAgICAgdGhpcy5lbmdpbmUuY2FjaGVMYXlvdXQoaXRlbXMsIHRoaXMuX3ByZXZDb2x1bW4sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiBnaXZlbiBhIGRpZmZlcmVudCBjYWxsYmFjaywgdGVtcG9yYWxseSBzZXQgaXQgYXMgZ2xvYmFsIG9wdGlvbiB0byBjcmVhdGluZyB3aWxsIHVzZSBpdFxyXG4gICAgICAgIGNvbnN0IHByZXZDQiA9IHRoaXMub3B0cy5hZGRSZW1vdmVDQjtcclxuICAgICAgICBpZiAodHlwZW9mIChhZGRSZW1vdmUpID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgICAgICB0aGlzLm9wdHMuYWRkUmVtb3ZlQ0IgPSBhZGRSZW1vdmU7XHJcbiAgICAgICAgbGV0IHJlbW92ZWQgPSBbXTtcclxuICAgICAgICB0aGlzLmJhdGNoVXBkYXRlKCk7XHJcbiAgICAgICAgLy8gc2VlIGlmIGFueSBpdGVtcyBhcmUgbWlzc2luZyBmcm9tIG5ldyBsYXlvdXQgYW5kIG5lZWQgdG8gYmUgcmVtb3ZlZCBmaXJzdFxyXG4gICAgICAgIGlmIChhZGRSZW1vdmUpIHtcclxuICAgICAgICAgICAgbGV0IGNvcHlOb2RlcyA9IFsuLi50aGlzLmVuZ2luZS5ub2Rlc107IC8vIGRvbid0IGxvb3AgdGhyb3VnaCBhcnJheSB5b3UgbW9kaWZ5XHJcbiAgICAgICAgICAgIGNvcHlOb2Rlcy5mb3JFYWNoKG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtcy5maW5kKHcgPT4gbi5pZCA9PT0gdy5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLmFkZFJlbW92ZUNCKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMuYWRkUmVtb3ZlQ0IodGhpcy5lbCwgbiwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVkLnB1c2gobik7IC8vIGJhdGNoIGtlZXAgdHJhY2tcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVdpZGdldChuLmVsLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBub3cgYWRkL3VwZGF0ZSB0aGUgd2lkZ2V0c1xyXG4gICAgICAgIGl0ZW1zLmZvckVhY2godyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gKHcuaWQgfHwgdy5pZCA9PT0gMCkgPyB0aGlzLmVuZ2luZS5ub2Rlcy5maW5kKG4gPT4gbi5pZCA9PT0gdy5pZCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShpdGVtLmVsLCB3KTtcclxuICAgICAgICAgICAgICAgIGlmICh3LnN1YkdyaWQgJiYgdy5zdWJHcmlkLmNoaWxkcmVuKSB7IC8vIHVwZGF0ZSBhbnkgc3ViIGdyaWQgYXMgd2VsbFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdWIgPSBpdGVtLmVsLnF1ZXJ5U2VsZWN0b3IoJy5ncmlkLXN0YWNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YiAmJiBzdWIuZ3JpZHN0YWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Yi5ncmlkc3RhY2subG9hZCh3LnN1YkdyaWQuY2hpbGRyZW4pOyAvLyBUT0RPOiBzdXBwb3J0IHVwZGF0aW5nIGdyaWQgb3B0aW9ucyA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luc2VydE5vdEFwcGVuZCA9IHRydWU7IC8vIGdvdCByZXNldCBieSBhYm92ZSBjYWxsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFkZFJlbW92ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRXaWRnZXQodyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmVuZ2luZS5yZW1vdmVkTm9kZXMgPSByZW1vdmVkO1xyXG4gICAgICAgIHRoaXMuYmF0Y2hVcGRhdGUoZmFsc2UpO1xyXG4gICAgICAgIC8vIGFmdGVyIGNvbW1pdCwgY2xlYXIgdGhhdCBmbGFnXHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2lnbm9yZUxheW91dHNOb2RlQ2hhbmdlO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9pbnNlcnROb3RBcHBlbmQ7XHJcbiAgICAgICAgcHJldkNCID8gdGhpcy5vcHRzLmFkZFJlbW92ZUNCID0gcHJldkNCIDogZGVsZXRlIHRoaXMub3B0cy5hZGRSZW1vdmVDQjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogdXNlIGJlZm9yZSBjYWxsaW5nIGEgYnVuY2ggb2YgYGFkZFdpZGdldCgpYCB0byBwcmV2ZW50IHVuLW5lY2Vzc2FyeSByZWxheW91dHMgaW4gYmV0d2VlbiAobW9yZSBlZmZpY2llbnQpXHJcbiAgICAgKiBhbmQgZ2V0IGEgc2luZ2xlIGV2ZW50IGNhbGxiYWNrLiBZb3Ugd2lsbCBzZWUgbm8gY2hhbmdlcyB1bnRpbCBgYmF0Y2hVcGRhdGUoZmFsc2UpYCBpcyBjYWxsZWQuXHJcbiAgICAgKi9cclxuICAgIGJhdGNoVXBkYXRlKGZsYWcgPSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5lbmdpbmUuYmF0Y2hVcGRhdGUoZmxhZyk7XHJcbiAgICAgICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJSZW1vdmVFdmVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyQWRkRXZlbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5nZUV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGN1cnJlbnQgY2VsbCBoZWlnaHQuXHJcbiAgICAgKi9cclxuICAgIGdldENlbGxIZWlnaHQoZm9yY2VQaXhlbCA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5jZWxsSGVpZ2h0ICYmIHRoaXMub3B0cy5jZWxsSGVpZ2h0ICE9PSAnYXV0bycgJiZcclxuICAgICAgICAgICAgKCFmb3JjZVBpeGVsIHx8ICF0aGlzLm9wdHMuY2VsbEhlaWdodFVuaXQgfHwgdGhpcy5vcHRzLmNlbGxIZWlnaHRVbml0ID09PSAncHgnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRzLmNlbGxIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVsc2UgZ2V0IGZpcnN0IGNlbGwgaGVpZ2h0XHJcbiAgICAgICAgbGV0IGVsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcuJyArIHRoaXMub3B0cy5pdGVtQ2xhc3MpO1xyXG4gICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gdXRpbHNfMS5VdGlscy50b051bWJlcihlbC5nZXRBdHRyaWJ1dGUoJ2dzLWgnKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKGVsLm9mZnNldEhlaWdodCAvIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVsc2UgZG8gZW50aXJlIGdyaWQgYW5kICMgb2Ygcm93cyAoYnV0IGRvZXNuJ3Qgd29yayBpZiBtaW4taGVpZ2h0IGlzIHRoZSBhY3R1YWwgY29uc3RyYWluKVxyXG4gICAgICAgIGxldCByb3dzID0gcGFyc2VJbnQodGhpcy5lbC5nZXRBdHRyaWJ1dGUoJ2dzLWN1cnJlbnQtcm93JykpO1xyXG4gICAgICAgIHJldHVybiByb3dzID8gTWF0aC5yb3VuZCh0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCAvIHJvd3MpIDogdGhpcy5vcHRzLmNlbGxIZWlnaHQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBjdXJyZW50IGNlbGwgaGVpZ2h0IC0gc2VlIGBHcmlkU3RhY2tPcHRpb25zLmNlbGxIZWlnaHRgIGZvciBmb3JtYXQuXHJcbiAgICAgKiBUaGlzIG1ldGhvZCByZWJ1aWxkcyBhbiBpbnRlcm5hbCBDU1Mgc3R5bGUgc2hlZXQuXHJcbiAgICAgKiBOb3RlOiBZb3UgY2FuIGV4cGVjdCBwZXJmb3JtYW5jZSBpc3N1ZXMgaWYgY2FsbCB0aGlzIG1ldGhvZCB0b28gb2Z0ZW4uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZhbCB0aGUgY2VsbCBoZWlnaHQuIElmIG5vdCBwYXNzZWQgKHVuZGVmaW5lZCksIGNlbGxzIGNvbnRlbnQgd2lsbCBiZSBtYWRlIHNxdWFyZSAobWF0Y2ggd2lkdGggbWludXMgbWFyZ2luKSxcclxuICAgICAqIGlmIHBhc3MgMCB0aGUgQ1NTIHdpbGwgYmUgZ2VuZXJhdGVkIGJ5IHRoZSBhcHBsaWNhdGlvbiBpbnN0ZWFkLlxyXG4gICAgICogQHBhcmFtIHVwZGF0ZSAoT3B0aW9uYWwpIGlmIGZhbHNlLCBzdHlsZXMgd2lsbCBub3QgYmUgdXBkYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBncmlkLmNlbGxIZWlnaHQoMTAwKTsgLy8gc2FtZSBhcyAxMDBweFxyXG4gICAgICogZ3JpZC5jZWxsSGVpZ2h0KCc3MHB4Jyk7XHJcbiAgICAgKiBncmlkLmNlbGxIZWlnaHQoZ3JpZC5jZWxsV2lkdGgoKSAqIDEuMik7XHJcbiAgICAgKi9cclxuICAgIGNlbGxIZWlnaHQodmFsLCB1cGRhdGUgPSB0cnVlKSB7XHJcbiAgICAgICAgLy8gaWYgbm90IGNhbGxlZCBpbnRlcm5hbGx5LCBjaGVjayBpZiB3ZSdyZSBjaGFuZ2luZyBtb2RlXHJcbiAgICAgICAgaWYgKHVwZGF0ZSAmJiB2YWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNBdXRvQ2VsbEhlaWdodCAhPT0gKHZhbCA9PT0gJ2F1dG8nKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNBdXRvQ2VsbEhlaWdodCA9ICh2YWwgPT09ICdhdXRvJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVXaW5kb3dSZXNpemVFdmVudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWwgPT09ICdpbml0aWFsJyB8fCB2YWwgPT09ICdhdXRvJykge1xyXG4gICAgICAgICAgICB2YWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG1ha2UgaXRlbSBjb250ZW50IGJlIHNxdWFyZVxyXG4gICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgbWFyZ2luRGlmZiA9IC10aGlzLm9wdHMubWFyZ2luUmlnaHQgLSB0aGlzLm9wdHMubWFyZ2luTGVmdFxyXG4gICAgICAgICAgICAgICAgKyB0aGlzLm9wdHMubWFyZ2luVG9wICsgdGhpcy5vcHRzLm1hcmdpbkJvdHRvbTtcclxuICAgICAgICAgICAgdmFsID0gdGhpcy5jZWxsV2lkdGgoKSArIG1hcmdpbkRpZmY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkYXRhID0gdXRpbHNfMS5VdGlscy5wYXJzZUhlaWdodCh2YWwpO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdHMuY2VsbEhlaWdodFVuaXQgPT09IGRhdGEudW5pdCAmJiB0aGlzLm9wdHMuY2VsbEhlaWdodCA9PT0gZGF0YS5oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9wdHMuY2VsbEhlaWdodFVuaXQgPSBkYXRhLnVuaXQ7XHJcbiAgICAgICAgdGhpcy5vcHRzLmNlbGxIZWlnaHQgPSBkYXRhLmg7XHJcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTdHlsZXModHJ1ZSk7IC8vIHRydWUgPSBmb3JjZSByZS1jcmVhdGUgZm9yIGN1cnJlbnQgIyBvZiByb3dzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEdldHMgY3VycmVudCBjZWxsIHdpZHRoLiAqL1xyXG4gICAgY2VsbFdpZHRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aE9yQ29udGFpbmVyKCkgLyB0aGlzLmdldENvbHVtbigpO1xyXG4gICAgfVxyXG4gICAgLyoqIHJldHVybiBvdXIgZXhwZWN0ZWQgd2lkdGggKG9yIHBhcmVudCkgZm9yIDEgY29sdW1uIGNoZWNrICovXHJcbiAgICBfd2lkdGhPckNvbnRhaW5lcigpIHtcclxuICAgICAgICAvLyB1c2UgYG9mZnNldFdpZHRoYCBvciBgY2xpZW50V2lkdGhgIChubyBzY3JvbGxiYXIpID9cclxuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMTA2NDEwMS91bmRlcnN0YW5kaW5nLW9mZnNldHdpZHRoLWNsaWVudHdpZHRoLXNjcm9sbHdpZHRoLWFuZC1oZWlnaHQtcmVzcGVjdGl2ZWx5XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmVsLmNsaWVudFdpZHRoIHx8IHRoaXMuZWwucGFyZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCB3aW5kb3cuaW5uZXJXaWR0aCk7XHJcbiAgICB9XHJcbiAgICAvKiogcmUtbGF5b3V0IGdyaWQgaXRlbXMgdG8gcmVjbGFpbSBhbnkgZW1wdHkgc3BhY2UgKi9cclxuICAgIGNvbXBhY3QoKSB7XHJcbiAgICAgICAgdGhpcy5lbmdpbmUuY29tcGFjdCgpO1xyXG4gICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuZ2VFdmVudCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdGhlIG51bWJlciBvZiBjb2x1bW5zIGluIHRoZSBncmlkLiBXaWxsIHVwZGF0ZSBleGlzdGluZyB3aWRnZXRzIHRvIGNvbmZvcm0gdG8gbmV3IG51bWJlciBvZiBjb2x1bW5zLFxyXG4gICAgICogYXMgd2VsbCBhcyBjYWNoZSB0aGUgb3JpZ2luYWwgbGF5b3V0IHNvIHlvdSBjYW4gcmV2ZXJ0IGJhY2sgdG8gcHJldmlvdXMgcG9zaXRpb25zIHdpdGhvdXQgbG9zcy5cclxuICAgICAqIFJlcXVpcmVzIGBncmlkc3RhY2stZXh0cmEuY3NzYCBvciBgZ3JpZHN0YWNrLWV4dHJhLm1pbi5jc3NgIGZvciBbMi0xMV0sXHJcbiAgICAgKiBlbHNlIHlvdSB3aWxsIG5lZWQgdG8gZ2VuZXJhdGUgY29ycmVjdCBDU1MgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vZ3JpZHN0YWNrL2dyaWRzdGFjay5qcyNjaGFuZ2UtZ3JpZC1jb2x1bW5zKVxyXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIEludGVnZXIgPiAwIChkZWZhdWx0IDEyKS5cclxuICAgICAqIEBwYXJhbSBsYXlvdXQgc3BlY2lmeSB0aGUgdHlwZSBvZiByZS1sYXlvdXQgdGhhdCB3aWxsIGhhcHBlbiAocG9zaXRpb24sIHNpemUsIGV0Yy4uLikuXHJcbiAgICAgKiBOb3RlOiBpdGVtcyB3aWxsIG5ldmVyIGJlIG91dHNpZGUgb2YgdGhlIGN1cnJlbnQgY29sdW1uIGJvdW5kYXJpZXMuIGRlZmF1bHQgKG1vdmVTY2FsZSkuIElnbm9yZWQgZm9yIDEgY29sdW1uXHJcbiAgICAgKi9cclxuICAgIGNvbHVtbihjb2x1bW4sIGxheW91dCA9ICdtb3ZlU2NhbGUnKSB7XHJcbiAgICAgICAgaWYgKGNvbHVtbiA8IDEgfHwgdGhpcy5vcHRzLmNvbHVtbiA9PT0gY29sdW1uKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICBsZXQgb2xkQ29sdW1uID0gdGhpcy5nZXRDb2x1bW4oKTtcclxuICAgICAgICAvLyBpZiB3ZSBnbyBpbnRvIDEgY29sdW1uIG1vZGUgKHdoaWNoIGhhcHBlbnMgaWYgd2UncmUgc2l6ZWQgbGVzcyB0aGFuIG1pblcgdW5sZXNzIGRpc2FibGVPbmVDb2x1bW5Nb2RlIGlzIG9uKVxyXG4gICAgICAgIC8vIHRoZW4gcmVtZW1iZXIgdGhlIG9yaWdpbmFsIGNvbHVtbnMgc28gd2UgY2FuIHJlc3RvcmUuXHJcbiAgICAgICAgaWYgKGNvbHVtbiA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wcmV2Q29sdW1uID0gb2xkQ29sdW1uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3ByZXZDb2x1bW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgnZ3JpZC1zdGFjay0nICsgb2xkQ29sdW1uKTtcclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtc3RhY2stJyArIGNvbHVtbik7XHJcbiAgICAgICAgdGhpcy5vcHRzLmNvbHVtbiA9IHRoaXMuZW5naW5lLmNvbHVtbiA9IGNvbHVtbjtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGl0ZW1zIG5vdyAtIHNlZSBpZiB0aGUgZG9tIG9yZGVyIG5vZGVzIHNob3VsZCBiZSBwYXNzZWQgaW5zdGVhZCAoZWxzZSBkZWZhdWx0IHRvIGN1cnJlbnQgbGlzdClcclxuICAgICAgICBsZXQgZG9tTm9kZXM7XHJcbiAgICAgICAgaWYgKGNvbHVtbiA9PT0gMSAmJiB0aGlzLm9wdHMub25lQ29sdW1uTW9kZURvbVNvcnQpIHtcclxuICAgICAgICAgICAgZG9tTm9kZXMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5nZXRHcmlkSXRlbXMoKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbC5ncmlkc3RhY2tOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tTm9kZXMucHVzaChlbC5ncmlkc3RhY2tOb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICghZG9tTm9kZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBkb21Ob2RlcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVuZ2luZS51cGRhdGVOb2RlV2lkdGhzKG9sZENvbHVtbiwgY29sdW1uLCBkb21Ob2RlcywgbGF5b3V0KTtcclxuICAgICAgICBpZiAodGhpcy5faXNBdXRvQ2VsbEhlaWdodClcclxuICAgICAgICAgICAgdGhpcy5jZWxsSGVpZ2h0KCk7XHJcbiAgICAgICAgLy8gYW5kIHRyaWdnZXIgb3VyIGV2ZW50IGxhc3QuLi5cclxuICAgICAgICB0aGlzLl9pZ25vcmVMYXlvdXRzTm9kZUNoYW5nZSA9IHRydWU7IC8vIHNraXAgbGF5b3V0IHVwZGF0ZVxyXG4gICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuZ2VFdmVudCgpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9pZ25vcmVMYXlvdXRzTm9kZUNoYW5nZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgZ3JpZCAoZGVmYXVsdCAxMilcclxuICAgICAqL1xyXG4gICAgZ2V0Q29sdW1uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdHMuY29sdW1uO1xyXG4gICAgfVxyXG4gICAgLyoqIHJldHVybnMgYW4gYXJyYXkgb2YgZ3JpZCBIVE1MIGVsZW1lbnRzIChubyBwbGFjZWhvbGRlcikgLSB1c2VkIHRvIGl0ZXJhdGUgdGhyb3VnaCBvdXIgY2hpbGRyZW4gaW4gRE9NIG9yZGVyICovXHJcbiAgICBnZXRHcmlkSXRlbXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5lbC5jaGlsZHJlbilcclxuICAgICAgICAgICAgLmZpbHRlcigoZWwpID0+IGVsLm1hdGNoZXMoJy4nICsgdGhpcy5vcHRzLml0ZW1DbGFzcykgJiYgIWVsLm1hdGNoZXMoJy4nICsgdGhpcy5vcHRzLnBsYWNlaG9sZGVyQ2xhc3MpKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRGVzdHJveXMgYSBncmlkIGluc3RhbmNlLiBETyBOT1QgQ0FMTCBhbnkgbWV0aG9kcyBvciBhY2Nlc3MgYW55IHZhcnMgYWZ0ZXIgdGhpcyBhcyBpdCB3aWxsIGZyZWUgdXAgbWVtYmVycy5cclxuICAgICAqIEBwYXJhbSByZW1vdmVET00gaWYgYGZhbHNlYCBncmlkIGFuZCBpdGVtcyBIVE1MIGVsZW1lbnRzIHdpbGwgbm90IGJlIHJlbW92ZWQgZnJvbSB0aGUgRE9NIChPcHRpb25hbC4gRGVmYXVsdCBgdHJ1ZWApLlxyXG4gICAgICovXHJcbiAgICBkZXN0cm95KHJlbW92ZURPTSA9IHRydWUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZWwpXHJcbiAgICAgICAgICAgIHJldHVybjsgLy8gcHJldmVudCBtdWx0aXBsZSBjYWxsc1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVdpbmRvd1Jlc2l6ZUV2ZW50KHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGljKHRydWUsIGZhbHNlKTsgLy8gcGVybWFuZW50bHkgcmVtb3ZlcyBERCBidXQgZG9uJ3Qgc2V0IENTUyBjbGFzcyAod2UncmUgZ29pbmcgYXdheSlcclxuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbihmYWxzZSk7XHJcbiAgICAgICAgaWYgKCFyZW1vdmVET00pIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGwocmVtb3ZlRE9NKTtcclxuICAgICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3N0eWxlU2hlZXRDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3JlbW92ZVN0eWxlc2hlZXQoKTtcclxuICAgICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSgnZ3MtY3VycmVudC1yb3cnKTtcclxuICAgICAgICBpZiAodGhpcy5wYXJlbnRHcmlkSXRlbSlcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMucGFyZW50R3JpZEl0ZW0uc3ViR3JpZDtcclxuICAgICAgICBkZWxldGUgdGhpcy5wYXJlbnRHcmlkSXRlbTtcclxuICAgICAgICBkZWxldGUgdGhpcy5vcHRzO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9wbGFjZWhvbGRlcjtcclxuICAgICAgICBkZWxldGUgdGhpcy5lbmdpbmU7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuZWwuZ3JpZHN0YWNrOyAvLyByZW1vdmUgY2lyY3VsYXIgZGVwZW5kZW5jeSB0aGF0IHdvdWxkIHByZXZlbnQgYSBmcmVlaW5nXHJcbiAgICAgICAgZGVsZXRlIHRoaXMuZWw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGVuYWJsZS9kaXNhYmxlIGZsb2F0aW5nIHdpZGdldHMgKGRlZmF1bHQ6IGBmYWxzZWApIFNlZSBbZXhhbXBsZV0oaHR0cDovL2dyaWRzdGFja2pzLmNvbS9kZW1vL2Zsb2F0Lmh0bWwpXHJcbiAgICAgKi9cclxuICAgIGZsb2F0KHZhbCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdHMuZmxvYXQgIT09IHZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMuZmxvYXQgPSB0aGlzLmVuZ2luZS5mbG9hdCA9IHZhbDtcclxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5nZUV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIGN1cnJlbnQgZmxvYXQgbW9kZVxyXG4gICAgICovXHJcbiAgICBnZXRGbG9hdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmdpbmUuZmxvYXQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgcG9zaXRpb24gb2YgdGhlIGNlbGwgdW5kZXIgYSBwaXhlbCBvbiBzY3JlZW4uXHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gdGhlIHBvc2l0aW9uIG9mIHRoZSBwaXhlbCB0byByZXNvbHZlIGluXHJcbiAgICAgKiBhYnNvbHV0ZSBjb29yZGluYXRlcywgYXMgYW4gb2JqZWN0IHdpdGggdG9wIGFuZCBsZWZ0IHByb3BlcnRpZXNcclxuICAgICAqIEBwYXJhbSB1c2VEb2NSZWxhdGl2ZSBpZiB0cnVlLCB2YWx1ZSB3aWxsIGJlIGJhc2VkIG9uIGRvY3VtZW50IHBvc2l0aW9uIHZzIHBhcmVudCBwb3NpdGlvbiAoT3B0aW9uYWwuIERlZmF1bHQgZmFsc2UpLlxyXG4gICAgICogVXNlZnVsIHdoZW4gZ3JpZCBpcyB3aXRoaW4gYHBvc2l0aW9uOiByZWxhdGl2ZWAgZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIFJldHVybnMgYW4gb2JqZWN0IHdpdGggcHJvcGVydGllcyBgeGAgYW5kIGB5YCBpLmUuIHRoZSBjb2x1bW4gYW5kIHJvdyBpbiB0aGUgZ3JpZC5cclxuICAgICAqL1xyXG4gICAgZ2V0Q2VsbEZyb21QaXhlbChwb3NpdGlvbiwgdXNlRG9jUmVsYXRpdmUgPSBmYWxzZSkge1xyXG4gICAgICAgIGxldCBib3ggPSB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBnZXRCb3VuZGluZ0NsaWVudFJlY3QgbGVmdDogJHtib3gubGVmdH0gdG9wOiAke2JveC50b3B9IHc6ICR7Ym94Lnd9IGg6ICR7Ym94Lmh9YClcclxuICAgICAgICBsZXQgY29udGFpbmVyUG9zO1xyXG4gICAgICAgIGlmICh1c2VEb2NSZWxhdGl2ZSkge1xyXG4gICAgICAgICAgICBjb250YWluZXJQb3MgPSB7IHRvcDogYm94LnRvcCArIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsIGxlZnQ6IGJveC5sZWZ0IH07XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBnZXRDZWxsRnJvbVBpeGVsIHNjcm9sbFRvcDogJHtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfWApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb250YWluZXJQb3MgPSB7IHRvcDogdGhpcy5lbC5vZmZzZXRUb3AsIGxlZnQ6IHRoaXMuZWwub2Zmc2V0TGVmdCB9O1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgZ2V0Q2VsbEZyb21QaXhlbCBvZmZzZXRUb3A6ICR7Y29udGFpbmVyUG9zLmxlZnR9IG9mZnNldExlZnQ6ICR7Y29udGFpbmVyUG9zLnRvcH1gKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVsYXRpdmVMZWZ0ID0gcG9zaXRpb24ubGVmdCAtIGNvbnRhaW5lclBvcy5sZWZ0O1xyXG4gICAgICAgIGxldCByZWxhdGl2ZVRvcCA9IHBvc2l0aW9uLnRvcCAtIGNvbnRhaW5lclBvcy50b3A7XHJcbiAgICAgICAgbGV0IGNvbHVtbldpZHRoID0gKGJveC53aWR0aCAvIHRoaXMuZ2V0Q29sdW1uKCkpO1xyXG4gICAgICAgIGxldCByb3dIZWlnaHQgPSAoYm94LmhlaWdodCAvIHBhcnNlSW50KHRoaXMuZWwuZ2V0QXR0cmlidXRlKCdncy1jdXJyZW50LXJvdycpKSk7XHJcbiAgICAgICAgcmV0dXJuIHsgeDogTWF0aC5mbG9vcihyZWxhdGl2ZUxlZnQgLyBjb2x1bW5XaWR0aCksIHk6IE1hdGguZmxvb3IocmVsYXRpdmVUb3AgLyByb3dIZWlnaHQpIH07XHJcbiAgICB9XHJcbiAgICAvKiogcmV0dXJucyB0aGUgY3VycmVudCBudW1iZXIgb2Ygcm93cywgd2hpY2ggd2lsbCBiZSBhdCBsZWFzdCBgbWluUm93YCBpZiBzZXQgKi9cclxuICAgIGdldFJvdygpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgodGhpcy5lbmdpbmUuZ2V0Um93KCksIHRoaXMub3B0cy5taW5Sb3cpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgc3BlY2lmaWVkIGFyZWEgaXMgZW1wdHkuXHJcbiAgICAgKiBAcGFyYW0geCB0aGUgcG9zaXRpb24geC5cclxuICAgICAqIEBwYXJhbSB5IHRoZSBwb3NpdGlvbiB5LlxyXG4gICAgICogQHBhcmFtIHcgdGhlIHdpZHRoIG9mIHRvIGNoZWNrXHJcbiAgICAgKiBAcGFyYW0gaCB0aGUgaGVpZ2h0IG9mIHRvIGNoZWNrXHJcbiAgICAgKi9cclxuICAgIGlzQXJlYUVtcHR5KHgsIHksIHcsIGgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmdpbmUuaXNBcmVhRW1wdHkoeCwgeSwgdywgaCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIElmIHlvdSBhZGQgZWxlbWVudHMgdG8geW91ciBncmlkIGJ5IGhhbmQsIHlvdSBoYXZlIHRvIHRlbGwgZ3JpZHN0YWNrIGFmdGVyd2FyZHMgdG8gbWFrZSB0aGVtIHdpZGdldHMuXHJcbiAgICAgKiBJZiB5b3Ugd2FudCBncmlkc3RhY2sgdG8gYWRkIHRoZSBlbGVtZW50cyBmb3IgeW91LCB1c2UgYGFkZFdpZGdldCgpYCBpbnN0ZWFkLlxyXG4gICAgICogTWFrZXMgdGhlIGdpdmVuIGVsZW1lbnQgYSB3aWRnZXQgYW5kIHJldHVybnMgaXQuXHJcbiAgICAgKiBAcGFyYW0gZWxzIHdpZGdldCBvciBzaW5nbGUgc2VsZWN0b3IgdG8gY29udmVydC5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogbGV0IGdyaWQgPSBHcmlkU3RhY2suaW5pdCgpO1xyXG4gICAgICogZ3JpZC5lbC5hcHBlbmRDaGlsZCgnPGRpdiBpZD1cImdzaS0xXCIgZ3Mtdz1cIjNcIj48L2Rpdj4nKTtcclxuICAgICAqIGdyaWQubWFrZVdpZGdldCgnI2dzaS0xJyk7XHJcbiAgICAgKi9cclxuICAgIG1ha2VXaWRnZXQoZWxzKSB7XHJcbiAgICAgICAgbGV0IGVsID0gR3JpZFN0YWNrLmdldEVsZW1lbnQoZWxzKTtcclxuICAgICAgICB0aGlzLl9wcmVwYXJlRWxlbWVudChlbCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQ29udGFpbmVySGVpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5fdHJpZ2dlckFkZEV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5nZUV2ZW50KCk7XHJcbiAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudCBoYW5kbGVyIHRoYXQgZXh0cmFjdHMgb3VyIEN1c3RvbUV2ZW50IGRhdGEgb3V0IGF1dG9tYXRpY2FsbHkgZm9yIHJlY2VpdmluZyBjdXN0b21cclxuICAgICAqIG5vdGlmaWNhdGlvbnMgKHNlZSBkb2MgZm9yIHN1cHBvcnRlZCBldmVudHMpXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBvZiB0aGUgZXZlbnQgKHNlZSBwb3NzaWJsZSB2YWx1ZXMpIG9yIGxpc3Qgb2YgbmFtZXMgc3BhY2Ugc2VwYXJhdGVkXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgZnVuY3Rpb24gY2FsbGVkIHdpdGggZXZlbnQgYW5kIG9wdGlvbmFsIHNlY29uZC90aGlyZCBwYXJhbVxyXG4gICAgICogKHNlZSBSRUFETUUgZG9jdW1lbnRhdGlvbiBmb3IgZWFjaCBzaWduYXR1cmUpLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBncmlkLm9uKCdhZGRlZCcsIGZ1bmN0aW9uKGUsIGl0ZW1zKSB7IGxvZygnYWRkZWQgJywgaXRlbXMpfSApO1xyXG4gICAgICogb3JcclxuICAgICAqIGdyaWQub24oJ2FkZGVkIHJlbW92ZWQgY2hhbmdlJywgZnVuY3Rpb24oZSwgaXRlbXMpIHsgbG9nKGUudHlwZSwgaXRlbXMpfSApO1xyXG4gICAgICpcclxuICAgICAqIE5vdGU6IGluIHNvbWUgY2FzZXMgaXQgaXMgdGhlIHNhbWUgYXMgY2FsbGluZyBuYXRpdmUgaGFuZGxlciBhbmQgcGFyc2luZyB0aGUgZXZlbnQuXHJcbiAgICAgKiBncmlkLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZGVkJywgZnVuY3Rpb24oZXZlbnQpIHsgbG9nKCdhZGRlZCAnLCBldmVudC5kZXRhaWwpfSApO1xyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgb24obmFtZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAvLyBjaGVjayBmb3IgYXJyYXkgb2YgbmFtZXMgYmVpbmcgcGFzc2VkIGluc3RlYWRcclxuICAgICAgICBpZiAobmFtZS5pbmRleE9mKCcgJykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lcyA9IG5hbWUuc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgbmFtZXMuZm9yRWFjaChuYW1lID0+IHRoaXMub24obmFtZSwgY2FsbGJhY2spKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lID09PSAnY2hhbmdlJyB8fCBuYW1lID09PSAnYWRkZWQnIHx8IG5hbWUgPT09ICdyZW1vdmVkJyB8fCBuYW1lID09PSAnZW5hYmxlJyB8fCBuYW1lID09PSAnZGlzYWJsZScpIHtcclxuICAgICAgICAgICAgLy8gbmF0aXZlIEN1c3RvbUV2ZW50IGhhbmRsZXJzIC0gY2FzaCB0aGUgZ2VuZXJpYyBoYW5kbGVycyBzbyB3ZSBjYW4gZWFzaWx5IHJlbW92ZVxyXG4gICAgICAgICAgICBsZXQgbm9EYXRhID0gKG5hbWUgPT09ICdlbmFibGUnIHx8IG5hbWUgPT09ICdkaXNhYmxlJyk7XHJcbiAgICAgICAgICAgIGlmIChub0RhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dzRXZlbnRIYW5kbGVyW25hbWVdID0gKGV2ZW50KSA9PiBjYWxsYmFjayhldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nc0V2ZW50SGFuZGxlcltuYW1lXSA9IChldmVudCkgPT4gY2FsbGJhY2soZXZlbnQsIGV2ZW50LmRldGFpbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKG5hbWUsIHRoaXMuX2dzRXZlbnRIYW5kbGVyW25hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJ2RyYWcnIHx8IG5hbWUgPT09ICdkcmFnc3RhcnQnIHx8IG5hbWUgPT09ICdkcmFnc3RvcCcgfHwgbmFtZSA9PT0gJ3Jlc2l6ZXN0YXJ0JyB8fCBuYW1lID09PSAncmVzaXplJyB8fCBuYW1lID09PSAncmVzaXplc3RvcCcgfHwgbmFtZSA9PT0gJ2Ryb3BwZWQnKSB7XHJcbiAgICAgICAgICAgIC8vIGRyYWcmZHJvcCBzdG9wIGV2ZW50cyBORUVEIHRvIGJlIGNhbGwgdGhlbSBBRlRFUiB3ZSB1cGRhdGUgbm9kZSBhdHRyaWJ1dGVzIHNvIGhhbmRsZSB0aGVtIG91cnNlbGYuXHJcbiAgICAgICAgICAgIC8vIGRvIHNhbWUgZm9yIHN0YXJ0IGV2ZW50IHRvIG1ha2UgaXQgZWFzaWVyLi4uXHJcbiAgICAgICAgICAgIHRoaXMuX2dzRXZlbnRIYW5kbGVyW25hbWVdID0gY2FsbGJhY2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR3JpZFN0YWNrLm9uKCcgKyBuYW1lICsgJykgZXZlbnQgbm90IHN1cHBvcnRlZCwgYnV0IHlvdSBjYW4gc3RpbGwgdXNlICQoXCIuZ3JpZC1zdGFja1wiKS5vbiguLi4pIHdoaWxlIGpxdWVyeS11aSBpcyBzdGlsbCB1c2VkIGludGVybmFsbHkuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiB1bnN1YnNjcmliZSBmcm9tIHRoZSAnb24nIGV2ZW50IGJlbG93XHJcbiAgICAgKiBAcGFyYW0gbmFtZSBvZiB0aGUgZXZlbnQgKHNlZSBwb3NzaWJsZSB2YWx1ZXMpXHJcbiAgICAgKi9cclxuICAgIG9mZihuYW1lKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgZm9yIGFycmF5IG9mIG5hbWVzIGJlaW5nIHBhc3NlZCBpbnN0ZWFkXHJcbiAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignICcpICE9PSAtMSkge1xyXG4gICAgICAgICAgICBsZXQgbmFtZXMgPSBuYW1lLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgIG5hbWVzLmZvckVhY2gobmFtZSA9PiB0aGlzLm9mZihuYW1lKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSA9PT0gJ2NoYW5nZScgfHwgbmFtZSA9PT0gJ2FkZGVkJyB8fCBuYW1lID09PSAncmVtb3ZlZCcgfHwgbmFtZSA9PT0gJ2VuYWJsZScgfHwgbmFtZSA9PT0gJ2Rpc2FibGUnKSB7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBuYXRpdmUgQ3VzdG9tRXZlbnQgaGFuZGxlcnNcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2dzRXZlbnRIYW5kbGVyW25hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgdGhpcy5fZ3NFdmVudEhhbmRsZXJbbmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9nc0V2ZW50SGFuZGxlcltuYW1lXTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB3aWRnZXQgZnJvbSB0aGUgZ3JpZC5cclxuICAgICAqIEBwYXJhbSBlbCAgd2lkZ2V0IG9yIHNlbGVjdG9yIHRvIG1vZGlmeVxyXG4gICAgICogQHBhcmFtIHJlbW92ZURPTSBpZiBgZmFsc2VgIERPTSBlbGVtZW50IHdvbid0IGJlIHJlbW92ZWQgZnJvbSB0aGUgdHJlZSAoRGVmYXVsdD8gdHJ1ZSkuXHJcbiAgICAgKiBAcGFyYW0gdHJpZ2dlckV2ZW50IGlmIGBmYWxzZWAgKHF1aWV0IG1vZGUpIGVsZW1lbnQgd2lsbCBub3QgYmUgYWRkZWQgdG8gcmVtb3ZlZCBsaXN0IGFuZCBubyAncmVtb3ZlZCcgY2FsbGJhY2tzIHdpbGwgYmUgY2FsbGVkIChEZWZhdWx0PyB0cnVlKS5cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlV2lkZ2V0KGVscywgcmVtb3ZlRE9NID0gdHJ1ZSwgdHJpZ2dlckV2ZW50ID0gdHJ1ZSkge1xyXG4gICAgICAgIEdyaWRTdGFjay5nZXRFbGVtZW50cyhlbHMpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWwucGFyZW50RWxlbWVudCAmJiBlbC5wYXJlbnRFbGVtZW50ICE9PSB0aGlzLmVsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBub3Qgb3VyIGNoaWxkIVxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGVsLmdyaWRzdGFja05vZGU7XHJcbiAgICAgICAgICAgIC8vIEZvciBNZXRlb3Igc3VwcG9ydDogaHR0cHM6Ly9naXRodWIuY29tL2dyaWRzdGFjay9ncmlkc3RhY2suanMvcHVsbC8yNzJcclxuICAgICAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5lbmdpbmUubm9kZXMuZmluZChuID0+IGVsID09PSBuLmVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIW5vZGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvdXIgRE9NIGRhdGEgKGNpcmN1bGFyIGxpbmspIGFuZCBkcmFnJmRyb3AgcGVybWFuZW50bHlcclxuICAgICAgICAgICAgZGVsZXRlIGVsLmdyaWRzdGFja05vZGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUREKGVsKTtcclxuICAgICAgICAgICAgdGhpcy5lbmdpbmUucmVtb3ZlTm9kZShub2RlLCByZW1vdmVET00sIHRyaWdnZXJFdmVudCk7XHJcbiAgICAgICAgICAgIGlmIChyZW1vdmVET00gJiYgZWwucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgZWwucmVtb3ZlKCk7IC8vIGluIGJhdGNoIG1vZGUgZW5naW5lLnJlbW92ZU5vZGUgZG9lc24ndCBjYWxsIGJhY2sgdG8gcmVtb3ZlIERPTVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRyaWdnZXJFdmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyUmVtb3ZlRXZlbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5nZUV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCB3aWRnZXRzIGZyb20gdGhlIGdyaWQuXHJcbiAgICAgKiBAcGFyYW0gcmVtb3ZlRE9NIGlmIGBmYWxzZWAgRE9NIGVsZW1lbnRzIHdvbid0IGJlIHJlbW92ZWQgZnJvbSB0aGUgdHJlZSAoRGVmYXVsdD8gYHRydWVgKS5cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQWxsKHJlbW92ZURPTSA9IHRydWUpIHtcclxuICAgICAgICAvLyBhbHdheXMgcmVtb3ZlIG91ciBET00gZGF0YSAoY2lyY3VsYXIgbGluaykgYmVmb3JlIGxpc3QgZ2V0cyBlbXB0aWVkIGFuZCBkcmFnJmRyb3AgcGVybWFuZW50bHlcclxuICAgICAgICB0aGlzLmVuZ2luZS5ub2Rlcy5mb3JFYWNoKG4gPT4ge1xyXG4gICAgICAgICAgICBkZWxldGUgbi5lbC5ncmlkc3RhY2tOb2RlO1xyXG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVERChuLmVsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmVuZ2luZS5yZW1vdmVBbGwocmVtb3ZlRE9NKTtcclxuICAgICAgICB0aGlzLl90cmlnZ2VyUmVtb3ZlRXZlbnQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlIHRoZSBncmlkIGFuaW1hdGlvbiBzdGF0ZS4gIFRvZ2dsZXMgdGhlIGBncmlkLXN0YWNrLWFuaW1hdGVgIGNsYXNzLlxyXG4gICAgICogQHBhcmFtIGRvQW5pbWF0ZSBpZiB0cnVlIHRoZSBncmlkIHdpbGwgYW5pbWF0ZS5cclxuICAgICAqL1xyXG4gICAgc2V0QW5pbWF0aW9uKGRvQW5pbWF0ZSkge1xyXG4gICAgICAgIGlmIChkb0FuaW1hdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdncmlkLXN0YWNrLWFuaW1hdGUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgnZ3JpZC1zdGFjay1hbmltYXRlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBUb2dnbGUgdGhlIGdyaWQgc3RhdGljIHN0YXRlLCB3aGljaCBwZXJtYW5lbnRseSByZW1vdmVzL2FkZCBEcmFnJkRyb3Agc3VwcG9ydCwgdW5saWtlIGRpc2FibGUoKS9lbmFibGUoKSB0aGF0IGp1c3QgdHVybnMgaXQgb2ZmL29uLlxyXG4gICAgICogQWxzbyB0b2dnbGUgdGhlIGdyaWQtc3RhY2stc3RhdGljIGNsYXNzLlxyXG4gICAgICogQHBhcmFtIHZhbCBpZiB0cnVlIHRoZSBncmlkIGJlY29tZSBzdGF0aWMuXHJcbiAgICAgKiBAcGFyYW0gdXBkYXRlQ2xhc3MgdHJ1ZSAoZGVmYXVsdCkgaWYgY3NzIGNsYXNzIGdldHMgdXBkYXRlZFxyXG4gICAgICogQHBhcmFtIHJlY3Vyc2UgdHJ1ZSAoZGVmYXVsdCkgaWYgc3ViLWdyaWRzIGFsc28gZ2V0IHVwZGF0ZWRcclxuICAgICAqL1xyXG4gICAgc2V0U3RhdGljKHZhbCwgdXBkYXRlQ2xhc3MgPSB0cnVlLCByZWN1cnNlID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdHMuc3RhdGljR3JpZCA9PT0gdmFsKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB0aGlzLm9wdHMuc3RhdGljR3JpZCA9IHZhbDtcclxuICAgICAgICB0aGlzLl9zZXR1cFJlbW92ZURyb3AoKTtcclxuICAgICAgICB0aGlzLl9zZXR1cEFjY2VwdFdpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuZW5naW5lLm5vZGVzLmZvckVhY2gobiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ByZXBhcmVEcmFnRHJvcEJ5Tm9kZShuKTsgLy8gZWl0aGVyIGRlbGV0ZSBvciBpbml0IERyYWcmZHJvcFxyXG4gICAgICAgICAgICBpZiAobi5zdWJHcmlkICYmIHJlY3Vyc2UpXHJcbiAgICAgICAgICAgICAgICBuLnN1YkdyaWQuc2V0U3RhdGljKHZhbCwgdXBkYXRlQ2xhc3MsIHJlY3Vyc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh1cGRhdGVDbGFzcykge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXRTdGF0aWNDbGFzcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB3aWRnZXQgcG9zaXRpb24vc2l6ZSBhbmQgb3RoZXIgaW5mby4gTm90ZTogaWYgeW91IG5lZWQgdG8gY2FsbCB0aGlzIG9uIGFsbCBub2RlcywgdXNlIGxvYWQoKSBpbnN0ZWFkIHdoaWNoIHdpbGwgdXBkYXRlIHdoYXQgY2hhbmdlZC5cclxuICAgICAqIEBwYXJhbSBlbHMgIHdpZGdldCBvciBzZWxlY3RvciBvZiBvYmplY3RzIHRvIG1vZGlmeSAobm90ZTogc2V0dGluZyB0aGUgc2FtZSB4LHkgZm9yIG11bHRpcGxlIGl0ZW1zIHdpbGwgYmUgaW5kZXRlcm1pbmlzdGljIGFuZCBsaWtlbHkgdW53YW50ZWQpXHJcbiAgICAgKiBAcGFyYW0gb3B0IG5ldyB3aWRnZXQgb3B0aW9ucyAoeCx5LHcsaCwgZXRjLi4pLiBPbmx5IHRob3NlIHNldCB3aWxsIGJlIHVwZGF0ZWQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZShlbHMsIG9wdCkge1xyXG4gICAgICAgIC8vIHN1cHBvcnQgbGVnYWN5IGNhbGwgZm9yIG5vdyA/XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignZ3JpZHN0YWNrLnRzOiBgdXBkYXRlKGVsLCB4LCB5LCB3LCBoKWAgaXMgZGVwcmVjYXRlZC4gVXNlIGB1cGRhdGUoZWwsIHt4LCB3LCBjb250ZW50LCAuLi59KWAuIEl0IHdpbGwgYmUgcmVtb3ZlZCBzb29uJyk7XHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItcmVzdC1wYXJhbXNcclxuICAgICAgICAgICAgbGV0IGEgPSBhcmd1bWVudHMsIGkgPSAxO1xyXG4gICAgICAgICAgICBvcHQgPSB7IHg6IGFbaSsrXSwgeTogYVtpKytdLCB3OiBhW2krK10sIGg6IGFbaSsrXSB9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGUoZWxzLCBvcHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHcmlkU3RhY2suZ2V0RWxlbWVudHMoZWxzKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgaWYgKCFlbCB8fCAhZWwuZ3JpZHN0YWNrTm9kZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IG4gPSBlbC5ncmlkc3RhY2tOb2RlO1xyXG4gICAgICAgICAgICBsZXQgdyA9IHV0aWxzXzEuVXRpbHMuY2xvbmVEZWVwKG9wdCk7IC8vIG1ha2UgYSBjb3B5IHdlIGNhbiBtb2RpZnkgaW4gY2FzZSB0aGV5IHJlLXVzZSBpdCBvciBtdWx0aXBsZSBpdGVtc1xyXG4gICAgICAgICAgICBkZWxldGUgdy5hdXRvUG9zaXRpb247XHJcbiAgICAgICAgICAgIC8vIG1vdmUvcmVzaXplIHdpZGdldCBpZiBhbnl0aGluZyBjaGFuZ2VkXHJcbiAgICAgICAgICAgIGxldCBrZXlzID0gWyd4JywgJ3knLCAndycsICdoJ107XHJcbiAgICAgICAgICAgIGxldCBtO1xyXG4gICAgICAgICAgICBpZiAoa2V5cy5zb21lKGsgPT4gd1trXSAhPT0gdW5kZWZpbmVkICYmIHdba10gIT09IG5ba10pKSB7XHJcbiAgICAgICAgICAgICAgICBtID0ge307XHJcbiAgICAgICAgICAgICAgICBrZXlzLmZvckVhY2goayA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbVtrXSA9ICh3W2tdICE9PSB1bmRlZmluZWQpID8gd1trXSA6IG5ba107XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHdba107XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBmb3IgYSBtb3ZlIGFzIHdlbGwgSUZGIHRoZXJlIGlzIGFueSBtaW4vbWF4IGZpZWxkcyBzZXRcclxuICAgICAgICAgICAgaWYgKCFtICYmICh3Lm1pblcgfHwgdy5taW5IIHx8IHcubWF4VyB8fCB3Lm1heEgpKSB7XHJcbiAgICAgICAgICAgICAgICBtID0ge307IC8vIHdpbGwgdXNlIG5vZGUgcG9zaXRpb24gYnV0IHZhbGlkYXRlIHZhbHVlc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciBjb250ZW50IGNoYW5naW5nXHJcbiAgICAgICAgICAgIGlmICh3LmNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdWIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuZ3JpZC1zdGFjay1pdGVtLWNvbnRlbnQnKTtcclxuICAgICAgICAgICAgICAgIGlmIChzdWIgJiYgc3ViLmlubmVySFRNTCAhPT0gdy5jb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViLmlubmVySFRNTCA9IHcuY29udGVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB3LmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gYW55IHJlbWFpbmluZyBmaWVsZHMgYXJlIGFzc2lnbmVkLCBidXQgY2hlY2sgZm9yIGRyYWdnaW5nIGNoYW5nZXMsIHJlc2l6ZSBjb25zdHJhaW5cclxuICAgICAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGRkQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB3KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5WzBdICE9PSAnXycgJiYgbltrZXldICE9PSB3W2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBuW2tleV0gPSB3W2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZGRDaGFuZ2VkID0gZGRDaGFuZ2VkIHx8ICghdGhpcy5vcHRzLnN0YXRpY0dyaWQgJiYgKGtleSA9PT0gJ25vUmVzaXplJyB8fCBrZXkgPT09ICdub01vdmUnIHx8IGtleSA9PT0gJ2xvY2tlZCcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBmaW5hbGx5IG1vdmUgdGhlIHdpZGdldFxyXG4gICAgICAgICAgICBpZiAobSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuY2xlYW5Ob2RlcygpXHJcbiAgICAgICAgICAgICAgICAgICAgLmJlZ2luVXBkYXRlKG4pXHJcbiAgICAgICAgICAgICAgICAgICAgLm1vdmVOb2RlKG4sIG0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29udGFpbmVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ2hhbmdlRXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLmVuZFVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7IC8vIG1vdmUgd2lsbCBvbmx5IHVwZGF0ZSB4LHksdyxoIHNvIHVwZGF0ZSB0aGUgcmVzdCB0b29cclxuICAgICAgICAgICAgICAgIHRoaXMuX3dyaXRlQXR0cihlbCwgbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRkQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJlcGFyZURyYWdEcm9wQnlOb2RlKG4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIG1hcmdpbnMgd2hpY2ggd2lsbCBzZXQgYWxsIDQgc2lkZXMgYXQgb25jZSAtIHNlZSBgR3JpZFN0YWNrT3B0aW9ucy5tYXJnaW5gIGZvciBmb3JtYXQgb3B0aW9ucyAoQ1NTIHN0cmluZyBmb3JtYXQgb2YgMSwyLDQgdmFsdWVzIG9yIHNpbmdsZSBudW1iZXIpLlxyXG4gICAgICogQHBhcmFtIHZhbHVlIG1hcmdpbiB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBtYXJnaW4odmFsdWUpIHtcclxuICAgICAgICBsZXQgaXNNdWx0aVZhbHVlID0gKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuc3BsaXQoJyAnKS5sZW5ndGggPiAxKTtcclxuICAgICAgICAvLyBjaGVjayBpZiB3ZSBjYW4gc2tpcCByZS1jcmVhdGluZyBvdXIgQ1NTIGZpbGUuLi4gd29uJ3QgY2hlY2sgaWYgbXVsdGkgdmFsdWVzICh0b28gbXVjaCBoYXNzbGUpXHJcbiAgICAgICAgaWYgKCFpc011bHRpVmFsdWUpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB1dGlsc18xLlV0aWxzLnBhcnNlSGVpZ2h0KHZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5tYXJnaW5Vbml0ID09PSBkYXRhLnVuaXQgJiYgdGhpcy5vcHRzLm1hcmdpbiA9PT0gZGF0YS5oKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZS11c2UgZXhpc3RpbmcgbWFyZ2luIGhhbmRsaW5nXHJcbiAgICAgICAgdGhpcy5vcHRzLm1hcmdpbiA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub3B0cy5tYXJnaW5Ub3AgPSB0aGlzLm9wdHMubWFyZ2luQm90dG9tID0gdGhpcy5vcHRzLm1hcmdpbkxlZnQgPSB0aGlzLm9wdHMubWFyZ2luUmlnaHQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5faW5pdE1hcmdpbigpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0eWxlcyh0cnVlKTsgLy8gdHJ1ZSA9IGZvcmNlIHJlLWNyZWF0ZVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIHJldHVybnMgY3VycmVudCBtYXJnaW4gbnVtYmVyIHZhbHVlICh1bmRlZmluZWQgaWYgNCBzaWRlcyBkb24ndCBtYXRjaCkgKi9cclxuICAgIGdldE1hcmdpbigpIHsgcmV0dXJuIHRoaXMub3B0cy5tYXJnaW47IH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBoZWlnaHQgb2YgdGhlIGdyaWQgd2lsbCBiZSBsZXNzIHRoYW4gdGhlIHZlcnRpY2FsXHJcbiAgICAgKiBjb25zdHJhaW50LiBBbHdheXMgcmV0dXJucyB0cnVlIGlmIGdyaWQgZG9lc24ndCBoYXZlIGhlaWdodCBjb25zdHJhaW50LlxyXG4gICAgICogQHBhcmFtIG5vZGUgY29udGFpbnMgeCx5LHcsaCxhdXRvLXBvc2l0aW9uIG9wdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogaWYgKGdyaWQud2lsbEl0Rml0KG5ld1dpZGdldCkpIHtcclxuICAgICAqICAgZ3JpZC5hZGRXaWRnZXQobmV3V2lkZ2V0KTtcclxuICAgICAqIH0gZWxzZSB7XHJcbiAgICAgKiAgIGFsZXJ0KCdOb3QgZW5vdWdoIGZyZWUgc3BhY2UgdG8gcGxhY2UgdGhlIHdpZGdldCcpO1xyXG4gICAgICogfVxyXG4gICAgICovXHJcbiAgICB3aWxsSXRGaXQobm9kZSkge1xyXG4gICAgICAgIC8vIHN1cHBvcnQgbGVnYWN5IGNhbGwgZm9yIG5vd1xyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ2dyaWRzdGFjay50czogYHdpbGxJdEZpdCh4LHksdyxoLGF1dG9Qb3NpdGlvbilgIGlzIGRlcHJlY2F0ZWQuIFVzZSBgd2lsbEl0Rml0KHt4LCB5LC4uLn0pYC4gSXQgd2lsbCBiZSByZW1vdmVkIHNvb24nKTtcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1yZXN0LXBhcmFtc1xyXG4gICAgICAgICAgICBsZXQgYSA9IGFyZ3VtZW50cywgaSA9IDAsIHcgPSB7IHg6IGFbaSsrXSwgeTogYVtpKytdLCB3OiBhW2krK10sIGg6IGFbaSsrXSwgYXV0b1Bvc2l0aW9uOiBhW2krK10gfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lsbEl0Rml0KHcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5lbmdpbmUud2lsbEl0Rml0KG5vZGUpO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgX3RyaWdnZXJDaGFuZ2VFdmVudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5lbmdpbmUuYmF0Y2hNb2RlKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICBsZXQgZWxlbWVudHMgPSB0aGlzLmVuZ2luZS5nZXREaXJ0eU5vZGVzKHRydWUpOyAvLyB2ZXJpZnkgdGhleSByZWFsbHkgY2hhbmdlZFxyXG4gICAgICAgIGlmIChlbGVtZW50cyAmJiBlbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9pZ25vcmVMYXlvdXRzTm9kZUNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUubGF5b3V0c05vZGVzQ2hhbmdlKGVsZW1lbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyRXZlbnQoJ2NoYW5nZScsIGVsZW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbmdpbmUuc2F2ZUluaXRpYWwoKTsgLy8gd2UgY2FsbGVkLCBub3cgcmVzZXQgaW5pdGlhbCB2YWx1ZXMgJiBkaXJ0eSBmbGFnc1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgX3RyaWdnZXJBZGRFdmVudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5lbmdpbmUuYmF0Y2hNb2RlKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICBpZiAodGhpcy5lbmdpbmUuYWRkZWROb2RlcyAmJiB0aGlzLmVuZ2luZS5hZGRlZE5vZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9pZ25vcmVMYXlvdXRzTm9kZUNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUubGF5b3V0c05vZGVzQ2hhbmdlKHRoaXMuZW5naW5lLmFkZGVkTm9kZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHByZXZlbnQgYWRkZWQgbm9kZXMgZnJvbSBhbHNvIHRyaWdnZXJpbmcgJ2NoYW5nZScgZXZlbnQgKHdoaWNoIGlzIGNhbGxlZCBuZXh0KVxyXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5hZGRlZE5vZGVzLmZvckVhY2gobiA9PiB7IGRlbGV0ZSBuLl9kaXJ0eTsgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFdmVudCgnYWRkZWQnLCB0aGlzLmVuZ2luZS5hZGRlZE5vZGVzKTtcclxuICAgICAgICAgICAgdGhpcy5lbmdpbmUuYWRkZWROb2RlcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIF90cmlnZ2VyUmVtb3ZlRXZlbnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5naW5lLmJhdGNoTW9kZSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5naW5lLnJlbW92ZWROb2RlcyAmJiB0aGlzLmVuZ2luZS5yZW1vdmVkTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyRXZlbnQoJ3JlbW92ZWQnLCB0aGlzLmVuZ2luZS5yZW1vdmVkTm9kZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5yZW1vdmVkTm9kZXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBfdHJpZ2dlckV2ZW50KHR5cGUsIGRhdGEpIHtcclxuICAgICAgICBsZXQgZXZlbnQgPSBkYXRhID8gbmV3IEN1c3RvbUV2ZW50KHR5cGUsIHsgYnViYmxlczogZmFsc2UsIGRldGFpbDogZGF0YSB9KSA6IG5ldyBFdmVudCh0eXBlKTtcclxuICAgICAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCBjYWxsZWQgdG8gZGVsZXRlIHRoZSBjdXJyZW50IGR5bmFtaWMgc3R5bGUgc2hlZXQgdXNlZCBmb3Igb3VyIGxheW91dCAqL1xyXG4gICAgX3JlbW92ZVN0eWxlc2hlZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0eWxlcykge1xyXG4gICAgICAgICAgICB1dGlsc18xLlV0aWxzLnJlbW92ZVN0eWxlc2hlZXQodGhpcy5fc3R5bGVTaGVldENsYXNzKTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3N0eWxlcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIHVwZGF0ZWQvY3JlYXRlIHRoZSBDU1Mgc3R5bGVzIGZvciByb3cgYmFzZWQgbGF5b3V0IGFuZCBpbml0aWFsIG1hcmdpbiBzZXR0aW5nICovXHJcbiAgICBfdXBkYXRlU3R5bGVzKGZvcmNlVXBkYXRlID0gZmFsc2UsIG1heEgpIHtcclxuICAgICAgICAvLyBjYWxsIHRvIGRlbGV0ZSBleGlzdGluZyBvbmUgaWYgd2UgY2hhbmdlIGNlbGxIZWlnaHQgLyBtYXJnaW5cclxuICAgICAgICBpZiAoZm9yY2VVcGRhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlU3R5bGVzaGVldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW1heEgpXHJcbiAgICAgICAgICAgIG1heEggPSB0aGlzLmdldFJvdygpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUNvbnRhaW5lckhlaWdodCgpO1xyXG4gICAgICAgIC8vIGlmIHVzZXIgaXMgdGVsbGluZyB1cyB0aGV5IHdpbGwgaGFuZGxlIHRoZSBDU1MgdGhlbXNlbHZlcyBieSBzZXR0aW5nIGhlaWdodHMgdG8gMC4gRG8gd2UgbmVlZCB0aGlzIG9wdHMgcmVhbGx5ID8/XHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5jZWxsSGVpZ2h0ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2VsbEhlaWdodCA9IHRoaXMub3B0cy5jZWxsSGVpZ2h0O1xyXG4gICAgICAgIGxldCBjZWxsSGVpZ2h0VW5pdCA9IHRoaXMub3B0cy5jZWxsSGVpZ2h0VW5pdDtcclxuICAgICAgICBsZXQgcHJlZml4ID0gYC4ke3RoaXMuX3N0eWxlU2hlZXRDbGFzc30gPiAuJHt0aGlzLm9wdHMuaXRlbUNsYXNzfWA7XHJcbiAgICAgICAgLy8gY3JlYXRlIG9uZSBhcyBuZWVkZWRcclxuICAgICAgICBpZiAoIXRoaXMuX3N0eWxlcykge1xyXG4gICAgICAgICAgICAvLyBpbnNlcnQgc3R5bGUgdG8gcGFyZW50IChpbnN0ZWFkIG9mICdoZWFkJyBieSBkZWZhdWx0KSB0byBzdXBwb3J0IFdlYkNvbXBvbmVudFxyXG4gICAgICAgICAgICBsZXQgc3R5bGVMb2NhdGlvbiA9IHRoaXMub3B0cy5zdHlsZUluSGVhZCA/IHVuZGVmaW5lZCA6IHRoaXMuZWwucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgdGhpcy5fc3R5bGVzID0gdXRpbHNfMS5VdGlscy5jcmVhdGVTdHlsZXNoZWV0KHRoaXMuX3N0eWxlU2hlZXRDbGFzcywgc3R5bGVMb2NhdGlvbiwge1xyXG4gICAgICAgICAgICAgICAgbm9uY2U6IHRoaXMub3B0cy5ub25jZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fc3R5bGVzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlcy5fbWF4ID0gMDtcclxuICAgICAgICAgICAgLy8gdGhlc2UgYXJlIGRvbmUgb25jZSBvbmx5XHJcbiAgICAgICAgICAgIHV0aWxzXzEuVXRpbHMuYWRkQ1NTUnVsZSh0aGlzLl9zdHlsZXMsIHByZWZpeCwgYG1pbi1oZWlnaHQ6ICR7Y2VsbEhlaWdodH0ke2NlbGxIZWlnaHRVbml0fWApO1xyXG4gICAgICAgICAgICAvLyBjb250ZW50IG1hcmdpbnNcclxuICAgICAgICAgICAgbGV0IHRvcCA9IHRoaXMub3B0cy5tYXJnaW5Ub3AgKyB0aGlzLm9wdHMubWFyZ2luVW5pdDtcclxuICAgICAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMub3B0cy5tYXJnaW5Cb3R0b20gKyB0aGlzLm9wdHMubWFyZ2luVW5pdDtcclxuICAgICAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5vcHRzLm1hcmdpblJpZ2h0ICsgdGhpcy5vcHRzLm1hcmdpblVuaXQ7XHJcbiAgICAgICAgICAgIGxldCBsZWZ0ID0gdGhpcy5vcHRzLm1hcmdpbkxlZnQgKyB0aGlzLm9wdHMubWFyZ2luVW5pdDtcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBgJHtwcmVmaXh9ID4gLmdyaWQtc3RhY2staXRlbS1jb250ZW50YDtcclxuICAgICAgICAgICAgbGV0IHBsYWNlaG9sZGVyID0gYC4ke3RoaXMuX3N0eWxlU2hlZXRDbGFzc30gPiAuZ3JpZC1zdGFjay1wbGFjZWhvbGRlciA+IC5wbGFjZWhvbGRlci1jb250ZW50YDtcclxuICAgICAgICAgICAgdXRpbHNfMS5VdGlscy5hZGRDU1NSdWxlKHRoaXMuX3N0eWxlcywgY29udGVudCwgYHRvcDogJHt0b3B9OyByaWdodDogJHtyaWdodH07IGJvdHRvbTogJHtib3R0b219OyBsZWZ0OiAke2xlZnR9O2ApO1xyXG4gICAgICAgICAgICB1dGlsc18xLlV0aWxzLmFkZENTU1J1bGUodGhpcy5fc3R5bGVzLCBwbGFjZWhvbGRlciwgYHRvcDogJHt0b3B9OyByaWdodDogJHtyaWdodH07IGJvdHRvbTogJHtib3R0b219OyBsZWZ0OiAke2xlZnR9O2ApO1xyXG4gICAgICAgICAgICAvLyByZXNpemUgaGFuZGxlcyBvZmZzZXQgKHRvIG1hdGNoIG1hcmdpbilcclxuICAgICAgICAgICAgdXRpbHNfMS5VdGlscy5hZGRDU1NSdWxlKHRoaXMuX3N0eWxlcywgYCR7cHJlZml4fSA+IC51aS1yZXNpemFibGUtbmVgLCBgcmlnaHQ6ICR7cmlnaHR9YCk7XHJcbiAgICAgICAgICAgIHV0aWxzXzEuVXRpbHMuYWRkQ1NTUnVsZSh0aGlzLl9zdHlsZXMsIGAke3ByZWZpeH0gPiAudWktcmVzaXphYmxlLWVgLCBgcmlnaHQ6ICR7cmlnaHR9YCk7XHJcbiAgICAgICAgICAgIHV0aWxzXzEuVXRpbHMuYWRkQ1NTUnVsZSh0aGlzLl9zdHlsZXMsIGAke3ByZWZpeH0gPiAudWktcmVzaXphYmxlLXNlYCwgYHJpZ2h0OiAke3JpZ2h0fTsgYm90dG9tOiAke2JvdHRvbX1gKTtcclxuICAgICAgICAgICAgdXRpbHNfMS5VdGlscy5hZGRDU1NSdWxlKHRoaXMuX3N0eWxlcywgYCR7cHJlZml4fSA+IC51aS1yZXNpemFibGUtbndgLCBgbGVmdDogJHtsZWZ0fWApO1xyXG4gICAgICAgICAgICB1dGlsc18xLlV0aWxzLmFkZENTU1J1bGUodGhpcy5fc3R5bGVzLCBgJHtwcmVmaXh9ID4gLnVpLXJlc2l6YWJsZS13YCwgYGxlZnQ6ICR7bGVmdH1gKTtcclxuICAgICAgICAgICAgdXRpbHNfMS5VdGlscy5hZGRDU1NSdWxlKHRoaXMuX3N0eWxlcywgYCR7cHJlZml4fSA+IC51aS1yZXNpemFibGUtc3dgLCBgbGVmdDogJHtsZWZ0fTsgYm90dG9tOiAke2JvdHRvbX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbm93IHVwZGF0ZSB0aGUgaGVpZ2h0IHNwZWNpZmljIGZpZWxkc1xyXG4gICAgICAgIG1heEggPSBtYXhIIHx8IHRoaXMuX3N0eWxlcy5fbWF4O1xyXG4gICAgICAgIGlmIChtYXhIID4gdGhpcy5fc3R5bGVzLl9tYXgpIHtcclxuICAgICAgICAgICAgbGV0IGdldEhlaWdodCA9IChyb3dzKSA9PiAoY2VsbEhlaWdodCAqIHJvd3MpICsgY2VsbEhlaWdodFVuaXQ7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9zdHlsZXMuX21heCArIDE7IGkgPD0gbWF4SDsgaSsrKSB7IC8vIHN0YXJ0IGF0IDFcclxuICAgICAgICAgICAgICAgIGxldCBoID0gZ2V0SGVpZ2h0KGkpO1xyXG4gICAgICAgICAgICAgICAgdXRpbHNfMS5VdGlscy5hZGRDU1NSdWxlKHRoaXMuX3N0eWxlcywgYCR7cHJlZml4fVtncy15PVwiJHtpIC0gMX1cIl1gLCBgdG9wOiAke2dldEhlaWdodChpIC0gMSl9YCk7IC8vIHN0YXJ0IGF0IDBcclxuICAgICAgICAgICAgICAgIHV0aWxzXzEuVXRpbHMuYWRkQ1NTUnVsZSh0aGlzLl9zdHlsZXMsIGAke3ByZWZpeH1bZ3MtaD1cIiR7aX1cIl1gLCBgaGVpZ2h0OiAke2h9YCk7XHJcbiAgICAgICAgICAgICAgICB1dGlsc18xLlV0aWxzLmFkZENTU1J1bGUodGhpcy5fc3R5bGVzLCBgJHtwcmVmaXh9W2dzLW1pbi1oPVwiJHtpfVwiXWAsIGBtaW4taGVpZ2h0OiAke2h9YCk7XHJcbiAgICAgICAgICAgICAgICB1dGlsc18xLlV0aWxzLmFkZENTU1J1bGUodGhpcy5fc3R5bGVzLCBgJHtwcmVmaXh9W2dzLW1heC1oPVwiJHtpfVwiXWAsIGBtYXgtaGVpZ2h0OiAke2h9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc3R5bGVzLl9tYXggPSBtYXhIO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIF91cGRhdGVDb250YWluZXJIZWlnaHQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmVuZ2luZSB8fCB0aGlzLmVuZ2luZS5iYXRjaE1vZGUpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIGxldCByb3cgPSB0aGlzLmdldFJvdygpICsgdGhpcy5fZXh0cmFEcmFnUm93OyAvLyBjaGVja3MgZm9yIG1pblJvdyBhbHJlYWR5XHJcbiAgICAgICAgLy8gY2hlY2sgZm9yIGNzcyBtaW4gaGVpZ2h0XHJcbiAgICAgICAgLy8gTm90ZTogd2UgZG9uJ3QgaGFuZGxlICUscmVtIGNvcnJlY3RseSBzbyBjb21tZW50IG91dCwgYmVzaWRlIHdlIGRvbid0IG5lZWQgbmVlZCB0byBjcmVhdGUgdW4tbmVjZXNzYXJ5XHJcbiAgICAgICAgLy8gcm93cyBhcyB0aGUgQ1NTIHdpbGwgbWFrZSB1cyBiaWdnZXIgdGhhbiBvdXIgc2V0IGhlaWdodCBpZiBuZWVkZWQuLi4gbm90IHN1cmUgd2h5IHdlIGhhZCB0aGlzLlxyXG4gICAgICAgIC8vIGxldCBjc3NNaW5IZWlnaHQgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWwpWydtaW4taGVpZ2h0J10pO1xyXG4gICAgICAgIC8vIGlmIChjc3NNaW5IZWlnaHQgPiAwKSB7XHJcbiAgICAgICAgLy8gICBsZXQgbWluUm93ID0gTWF0aC5yb3VuZChjc3NNaW5IZWlnaHQgLyB0aGlzLmdldENlbGxIZWlnaHQodHJ1ZSkpO1xyXG4gICAgICAgIC8vICAgaWYgKHJvdyA8IG1pblJvdykge1xyXG4gICAgICAgIC8vICAgICByb3cgPSBtaW5Sb3c7XHJcbiAgICAgICAgLy8gICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdncy1jdXJyZW50LXJvdycsIFN0cmluZyhyb3cpKTtcclxuICAgICAgICBpZiAocm93ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21pbi1oZWlnaHQnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjZWxsSGVpZ2h0ID0gdGhpcy5vcHRzLmNlbGxIZWlnaHQ7XHJcbiAgICAgICAgbGV0IHVuaXQgPSB0aGlzLm9wdHMuY2VsbEhlaWdodFVuaXQ7XHJcbiAgICAgICAgaWYgKCFjZWxsSGVpZ2h0KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLm1pbkhlaWdodCA9IHJvdyAqIGNlbGxIZWlnaHQgKyB1bml0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgX3ByZXBhcmVFbGVtZW50KGVsLCB0cmlnZ2VyQWRkRXZlbnQgPSBmYWxzZSwgbm9kZSkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQodGhpcy5vcHRzLml0ZW1DbGFzcyk7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUgfHwgdGhpcy5fcmVhZEF0dHIoZWwpO1xyXG4gICAgICAgIGVsLmdyaWRzdGFja05vZGUgPSBub2RlO1xyXG4gICAgICAgIG5vZGUuZWwgPSBlbDtcclxuICAgICAgICBub2RlLmdyaWQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjb3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgbm9kZSk7XHJcbiAgICAgICAgbm9kZSA9IHRoaXMuZW5naW5lLmFkZE5vZGUobm9kZSwgdHJpZ2dlckFkZEV2ZW50KTtcclxuICAgICAgICAvLyB3cml0ZSBub2RlIGF0dHIgYmFjayBpbiBjYXNlIHRoZXJlIHdhcyBjb2xsaXNpb24gb3Igd2UgaGF2ZSB0byBmaXggYmFkIHZhbHVlcyBkdXJpbmcgYWRkTm9kZSgpXHJcbiAgICAgICAgaWYgKCF1dGlsc18xLlV0aWxzLnNhbWUobm9kZSwgY29weSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fd3JpdGVBdHRyKGVsLCBub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcHJlcGFyZURyYWdEcm9wQnlOb2RlKG5vZGUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCBjYWxsIHRvIHdyaXRlIHBvc2l0aW9uIHgseSx3LGggYXR0cmlidXRlcyBiYWNrIHRvIGVsZW1lbnQgKi9cclxuICAgIF93cml0ZVBvc0F0dHIoZWwsIG4pIHtcclxuICAgICAgICBpZiAobi54ICE9PSB1bmRlZmluZWQgJiYgbi54ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZ3MteCcsIFN0cmluZyhuLngpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG4ueSAhPT0gdW5kZWZpbmVkICYmIG4ueSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2dzLXknLCBTdHJpbmcobi55KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuLncpIHtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdncy13JywgU3RyaW5nKG4udykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobi5oKSB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZ3MtaCcsIFN0cmluZyhuLmgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIGNhbGwgdG8gd3JpdGUgYW55IGRlZmF1bHQgYXR0cmlidXRlcyBiYWNrIHRvIGVsZW1lbnQgKi9cclxuICAgIF93cml0ZUF0dHIoZWwsIG5vZGUpIHtcclxuICAgICAgICBpZiAoIW5vZGUpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIHRoaXMuX3dyaXRlUG9zQXR0cihlbCwgbm9kZSk7XHJcbiAgICAgICAgbGV0IGF0dHJzIC8qOiBHcmlkU3RhY2tXaWRnZXQgYnV0IHN0cmluZ3MgKi8gPSB7XHJcbiAgICAgICAgICAgIGF1dG9Qb3NpdGlvbjogJ2dzLWF1dG8tcG9zaXRpb24nLFxyXG4gICAgICAgICAgICBtaW5XOiAnZ3MtbWluLXcnLFxyXG4gICAgICAgICAgICBtaW5IOiAnZ3MtbWluLWgnLFxyXG4gICAgICAgICAgICBtYXhXOiAnZ3MtbWF4LXcnLFxyXG4gICAgICAgICAgICBtYXhIOiAnZ3MtbWF4LWgnLFxyXG4gICAgICAgICAgICBub1Jlc2l6ZTogJ2dzLW5vLXJlc2l6ZScsXHJcbiAgICAgICAgICAgIG5vTW92ZTogJ2dzLW5vLW1vdmUnLFxyXG4gICAgICAgICAgICBsb2NrZWQ6ICdncy1sb2NrZWQnLFxyXG4gICAgICAgICAgICBpZDogJ2dzLWlkJyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJzKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlW2tleV0pIHsgLy8gMCBpcyB2YWxpZCBmb3IgeCx5IG9ubHkgYnV0IGRvbmUgYWJvdmUgYWxyZWFkeSBhbmQgbm90IGluIGxpc3QgYW55d2F5XHJcbiAgICAgICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0cnNba2V5XSwgU3RyaW5nKG5vZGVba2V5XSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGF0dHJzW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCBjYWxsIHRvIHJlYWQgYW55IGRlZmF1bHQgYXR0cmlidXRlcyBmcm9tIGVsZW1lbnQgKi9cclxuICAgIF9yZWFkQXR0cihlbCkge1xyXG4gICAgICAgIGxldCBub2RlID0ge307XHJcbiAgICAgICAgbm9kZS54ID0gdXRpbHNfMS5VdGlscy50b051bWJlcihlbC5nZXRBdHRyaWJ1dGUoJ2dzLXgnKSk7XHJcbiAgICAgICAgbm9kZS55ID0gdXRpbHNfMS5VdGlscy50b051bWJlcihlbC5nZXRBdHRyaWJ1dGUoJ2dzLXknKSk7XHJcbiAgICAgICAgbm9kZS53ID0gdXRpbHNfMS5VdGlscy50b051bWJlcihlbC5nZXRBdHRyaWJ1dGUoJ2dzLXcnKSk7XHJcbiAgICAgICAgbm9kZS5oID0gdXRpbHNfMS5VdGlscy50b051bWJlcihlbC5nZXRBdHRyaWJ1dGUoJ2dzLWgnKSk7XHJcbiAgICAgICAgbm9kZS5tYXhXID0gdXRpbHNfMS5VdGlscy50b051bWJlcihlbC5nZXRBdHRyaWJ1dGUoJ2dzLW1heC13JykpO1xyXG4gICAgICAgIG5vZGUubWluVyA9IHV0aWxzXzEuVXRpbHMudG9OdW1iZXIoZWwuZ2V0QXR0cmlidXRlKCdncy1taW4tdycpKTtcclxuICAgICAgICBub2RlLm1heEggPSB1dGlsc18xLlV0aWxzLnRvTnVtYmVyKGVsLmdldEF0dHJpYnV0ZSgnZ3MtbWF4LWgnKSk7XHJcbiAgICAgICAgbm9kZS5taW5IID0gdXRpbHNfMS5VdGlscy50b051bWJlcihlbC5nZXRBdHRyaWJ1dGUoJ2dzLW1pbi1oJykpO1xyXG4gICAgICAgIG5vZGUuYXV0b1Bvc2l0aW9uID0gdXRpbHNfMS5VdGlscy50b0Jvb2woZWwuZ2V0QXR0cmlidXRlKCdncy1hdXRvLXBvc2l0aW9uJykpO1xyXG4gICAgICAgIG5vZGUubm9SZXNpemUgPSB1dGlsc18xLlV0aWxzLnRvQm9vbChlbC5nZXRBdHRyaWJ1dGUoJ2dzLW5vLXJlc2l6ZScpKTtcclxuICAgICAgICBub2RlLm5vTW92ZSA9IHV0aWxzXzEuVXRpbHMudG9Cb29sKGVsLmdldEF0dHJpYnV0ZSgnZ3Mtbm8tbW92ZScpKTtcclxuICAgICAgICBub2RlLmxvY2tlZCA9IHV0aWxzXzEuVXRpbHMudG9Cb29sKGVsLmdldEF0dHJpYnV0ZSgnZ3MtbG9ja2VkJykpO1xyXG4gICAgICAgIG5vZGUuaWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2dzLWlkJyk7XHJcbiAgICAgICAgLy8gcmVtb3ZlIGFueSBrZXkgbm90IGZvdW5kIChudWxsIG9yIGZhbHNlIHdoaWNoIGlzIGRlZmF1bHQpXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbm9kZSkge1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUuaGFzT3duUHJvcGVydHkoa2V5KSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKCFub2RlW2tleV0gJiYgbm9kZVtrZXldICE9PSAwKSB7IC8vIDAgY2FuIGJlIHZhbGlkIHZhbHVlICh4LHkgb25seSByZWFsbHkpXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbm9kZVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgX3NldFN0YXRpY0NsYXNzKCkge1xyXG4gICAgICAgIGxldCBjbGFzc2VzID0gWydncmlkLXN0YWNrLXN0YXRpYyddO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdHMuc3RhdGljR3JpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdncy1zdGF0aWMnLCAndHJ1ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSgnZ3Mtc3RhdGljJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsZWQgd2hlbiB3ZSBhcmUgYmVpbmcgcmVzaXplZCBieSB0aGUgd2luZG93IC0gY2hlY2sgaWYgdGhlIG9uZSBDb2x1bW4gTW9kZSBuZWVkcyB0byBiZSB0dXJuZWQgb24vb2ZmXHJcbiAgICAgKiBhbmQgcmVtZW1iZXIgdGhlIHByZXYgY29sdW1ucyB3ZSB1c2VkLCBvciBnZXQgb3VyIGNvdW50IGZyb20gcGFyZW50LCBhcyB3ZWxsIGFzIGNoZWNrIGZvciBhdXRvIGNlbGwgaGVpZ2h0IChzcXVhcmUpXHJcbiAgICAgKi9cclxuICAgIG9uUGFyZW50UmVzaXplKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5lbCB8fCAhdGhpcy5lbC5jbGllbnRXaWR0aClcclxuICAgICAgICAgICAgcmV0dXJuOyAvLyByZXR1cm4gaWYgd2UncmUgZ29uZSBvciBubyBzaXplIHlldCAod2lsbCBnZXQgY2FsbGVkIGFnYWluKVxyXG4gICAgICAgIGxldCBjaGFuZ2VkQ29sdW1uID0gZmFsc2U7XHJcbiAgICAgICAgLy8gc2VlIGlmIHdlJ3JlIG5lc3RlZCBhbmQgdGFrZSBvdXIgY29sdW1uIGNvdW50IGZyb20gb3VyIHBhcmVudC4uLi5cclxuICAgICAgICBpZiAodGhpcy5fYXV0b0NvbHVtbiAmJiB0aGlzLnBhcmVudEdyaWRJdGVtKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuY29sdW1uICE9PSB0aGlzLnBhcmVudEdyaWRJdGVtLncpIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZWRDb2x1bW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW4odGhpcy5wYXJlbnRHcmlkSXRlbS53LCAnbm9uZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBlbHNlIGNoZWNrIGZvciAxIGNvbHVtbiBpbi9vdXQgYmVoYXZpb3JcclxuICAgICAgICAgICAgbGV0IG9uZUNvbHVtbiA9ICF0aGlzLm9wdHMuZGlzYWJsZU9uZUNvbHVtbk1vZGUgJiYgdGhpcy5lbC5jbGllbnRXaWR0aCA8PSB0aGlzLm9wdHMub25lQ29sdW1uU2l6ZTtcclxuICAgICAgICAgICAgaWYgKCh0aGlzLm9wdHMuY29sdW1uID09PSAxKSAhPT0gb25lQ29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VkQ29sdW1uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYW5pbWF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gLy8gMSA8LT4gMTIgaXMgdG9vIHJhZGljYWwsIHR1cm4gb2ZmIGFuaW1hdGlvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW4ob25lQ29sdW1uID8gMSA6IHRoaXMuX3ByZXZDb2x1bW4pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hbmltYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbWFrZSB0aGUgY2VsbHMgY29udGVudCBzcXVhcmUgYWdhaW5cclxuICAgICAgICBpZiAodGhpcy5faXNBdXRvQ2VsbEhlaWdodCkge1xyXG4gICAgICAgICAgICBpZiAoIWNoYW5nZWRDb2x1bW4gJiYgdGhpcy5vcHRzLmNlbGxIZWlnaHRUaHJvdHRsZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9jZWxsSGVpZ2h0VGhyb3R0bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZWxsSGVpZ2h0VGhyb3R0bGUgPSB1dGlsc18xLlV0aWxzLnRocm90dGxlKCgpID0+IHRoaXMuY2VsbEhlaWdodCgpLCB0aGlzLm9wdHMuY2VsbEhlaWdodFRocm90dGxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2NlbGxIZWlnaHRUaHJvdHRsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gaW1tZWRpYXRlIHVwZGF0ZSBpZiB3ZSd2ZSBjaGFuZ2VkIGNvbHVtbiBjb3VudCBvciBoYXZlIG5vIHRocmVzaG9sZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsSGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZmluYWxseSB1cGRhdGUgYW55IG5lc3RlZCBncmlkc1xyXG4gICAgICAgIHRoaXMuZW5naW5lLm5vZGVzLmZvckVhY2gobiA9PiB7XHJcbiAgICAgICAgICAgIGlmIChuLnN1YkdyaWQpIHtcclxuICAgICAgICAgICAgICAgIG4uc3ViR3JpZC5vblBhcmVudFJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogYWRkIG9yIHJlbW92ZSB0aGUgd2luZG93IHNpemUgZXZlbnQgaGFuZGxlciAqL1xyXG4gICAgX3VwZGF0ZVdpbmRvd1Jlc2l6ZUV2ZW50KGZvcmNlUmVtb3ZlID0gZmFsc2UpIHtcclxuICAgICAgICAvLyBvbmx5IGFkZCBldmVudCBpZiB3ZSdyZSBub3QgbmVzdGVkIChwYXJlbnQgd2lsbCBjYWxsIHVzKSBhbmQgd2UncmUgYXV0byBzaXppbmcgY2VsbHMgb3Igc3VwcG9ydGluZyBvbmVDb2x1bW4gKGkuZS4gZG9pbmcgd29yaylcclxuICAgICAgICBjb25zdCB3b3JrVG9kbyA9ICh0aGlzLl9pc0F1dG9DZWxsSGVpZ2h0IHx8ICF0aGlzLm9wdHMuZGlzYWJsZU9uZUNvbHVtbk1vZGUpICYmICF0aGlzLnBhcmVudEdyaWRJdGVtO1xyXG4gICAgICAgIGlmICghZm9yY2VSZW1vdmUgJiYgd29ya1RvZG8gJiYgIXRoaXMuX3dpbmRvd1Jlc2l6ZUJpbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5fd2luZG93UmVzaXplQmluZCA9IHRoaXMub25QYXJlbnRSZXNpemUuYmluZCh0aGlzKTsgLy8gc28gd2UgY2FuIHByb3Blcmx5IHJlbW92ZSBsYXRlclxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fd2luZG93UmVzaXplQmluZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKChmb3JjZVJlbW92ZSB8fCAhd29ya1RvZG8pICYmIHRoaXMuX3dpbmRvd1Jlc2l6ZUJpbmQpIHtcclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3dpbmRvd1Jlc2l6ZUJpbmQpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fd2luZG93UmVzaXplQmluZDsgLy8gcmVtb3ZlIGxpbmsgdG8gdXMgc28gd2UgY2FuIGZyZWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIGNvbnZlcnQgYSBwb3RlbnRpYWwgc2VsZWN0b3IgaW50byBhY3R1YWwgZWxlbWVudCAqL1xyXG4gICAgc3RhdGljIGdldEVsZW1lbnQoZWxzID0gJy5ncmlkLXN0YWNrLWl0ZW0nKSB7IHJldHVybiB1dGlsc18xLlV0aWxzLmdldEVsZW1lbnQoZWxzKTsgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgc3RhdGljIGdldEVsZW1lbnRzKGVscyA9ICcuZ3JpZC1zdGFjay1pdGVtJykgeyByZXR1cm4gdXRpbHNfMS5VdGlscy5nZXRFbGVtZW50cyhlbHMpOyB9XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBzdGF0aWMgZ2V0R3JpZEVsZW1lbnQoZWxzKSB7IHJldHVybiBHcmlkU3RhY2suZ2V0RWxlbWVudChlbHMpOyB9XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBzdGF0aWMgZ2V0R3JpZEVsZW1lbnRzKGVscykgeyByZXR1cm4gdXRpbHNfMS5VdGlscy5nZXRFbGVtZW50cyhlbHMpOyB9XHJcbiAgICAvKiogQGludGVybmFsIGluaXRpYWxpemUgbWFyZ2luIHRvcC9ib3R0b20vbGVmdC9yaWdodCBhbmQgdW5pdHMgKi9cclxuICAgIF9pbml0TWFyZ2luKCkge1xyXG4gICAgICAgIGxldCBkYXRhO1xyXG4gICAgICAgIGxldCBtYXJnaW4gPSAwO1xyXG4gICAgICAgIC8vIHN1cHBvcnQgcGFzc2luZyBtdWx0aXBsZSB2YWx1ZXMgbGlrZSBDU1MgKGV4OiAnNXB4IDEwcHggMCAyMHB4JylcclxuICAgICAgICBsZXQgbWFyZ2lucyA9IFtdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRzLm1hcmdpbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgbWFyZ2lucyA9IHRoaXMub3B0cy5tYXJnaW4uc3BsaXQoJyAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1hcmdpbnMubGVuZ3RoID09PSAyKSB7IC8vIHRvcC9ib3QsIGxlZnQvcmlnaHQgbGlrZSBDU1NcclxuICAgICAgICAgICAgdGhpcy5vcHRzLm1hcmdpblRvcCA9IHRoaXMub3B0cy5tYXJnaW5Cb3R0b20gPSBtYXJnaW5zWzBdO1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMubWFyZ2luTGVmdCA9IHRoaXMub3B0cy5tYXJnaW5SaWdodCA9IG1hcmdpbnNbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG1hcmdpbnMubGVuZ3RoID09PSA0KSB7IC8vIENsb2Nrd2lzZSBsaWtlIENTU1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMubWFyZ2luVG9wID0gbWFyZ2luc1swXTtcclxuICAgICAgICAgICAgdGhpcy5vcHRzLm1hcmdpblJpZ2h0ID0gbWFyZ2luc1sxXTtcclxuICAgICAgICAgICAgdGhpcy5vcHRzLm1hcmdpbkJvdHRvbSA9IG1hcmdpbnNbMl07XHJcbiAgICAgICAgICAgIHRoaXMub3B0cy5tYXJnaW5MZWZ0ID0gbWFyZ2luc1szXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB1dGlsc18xLlV0aWxzLnBhcnNlSGVpZ2h0KHRoaXMub3B0cy5tYXJnaW4pO1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMubWFyZ2luVW5pdCA9IGRhdGEudW5pdDtcclxuICAgICAgICAgICAgbWFyZ2luID0gdGhpcy5vcHRzLm1hcmdpbiA9IGRhdGEuaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2VlIGlmIHRvcC9ib3R0b20vbGVmdC9yaWdodCBuZWVkIHRvIGJlIHNldCBhcyB3ZWxsXHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5tYXJnaW5Ub3AgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMubWFyZ2luVG9wID0gbWFyZ2luO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGF0YSA9IHV0aWxzXzEuVXRpbHMucGFyc2VIZWlnaHQodGhpcy5vcHRzLm1hcmdpblRvcCk7XHJcbiAgICAgICAgICAgIHRoaXMub3B0cy5tYXJnaW5Ub3AgPSBkYXRhLmg7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm9wdHMubWFyZ2luO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5vcHRzLm1hcmdpbkJvdHRvbSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0cy5tYXJnaW5Cb3R0b20gPSBtYXJnaW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkYXRhID0gdXRpbHNfMS5VdGlscy5wYXJzZUhlaWdodCh0aGlzLm9wdHMubWFyZ2luQm90dG9tKTtcclxuICAgICAgICAgICAgdGhpcy5vcHRzLm1hcmdpbkJvdHRvbSA9IGRhdGEuaDtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMub3B0cy5tYXJnaW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm9wdHMubWFyZ2luUmlnaHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMubWFyZ2luUmlnaHQgPSBtYXJnaW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkYXRhID0gdXRpbHNfMS5VdGlscy5wYXJzZUhlaWdodCh0aGlzLm9wdHMubWFyZ2luUmlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMubWFyZ2luUmlnaHQgPSBkYXRhLmg7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm9wdHMubWFyZ2luO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5vcHRzLm1hcmdpbkxlZnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMubWFyZ2luTGVmdCA9IG1hcmdpbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB1dGlsc18xLlV0aWxzLnBhcnNlSGVpZ2h0KHRoaXMub3B0cy5tYXJnaW5MZWZ0KTtcclxuICAgICAgICAgICAgdGhpcy5vcHRzLm1hcmdpbkxlZnQgPSBkYXRhLmg7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm9wdHMubWFyZ2luO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9wdHMubWFyZ2luVW5pdCA9IGRhdGEudW5pdDsgLy8gaW4gY2FzZSBzaWRlIHdlcmUgc3BlbGxlZCBvdXQsIHVzZSB0aG9zZSB1bml0cyBpbnN0ZWFkLi4uXHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5tYXJnaW5Ub3AgPT09IHRoaXMub3B0cy5tYXJnaW5Cb3R0b20gJiYgdGhpcy5vcHRzLm1hcmdpbkxlZnQgPT09IHRoaXMub3B0cy5tYXJnaW5SaWdodCAmJiB0aGlzLm9wdHMubWFyZ2luVG9wID09PSB0aGlzLm9wdHMubWFyZ2luUmlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRzLm1hcmdpbiA9IHRoaXMub3B0cy5tYXJnaW5Ub3A7IC8vIG1ha2VzIGl0IGVhc2llciB0byBjaGVjayBmb3Igbm8tb3BzIGluIHNldE1hcmdpbigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICogZHJhZyZkcm9wIG1ldGhvZHMgdGhhdCB1c2VkIHRvIGJlIHN0dWJiZWQgb3V0IGFuZCBpbXBsZW1lbnRlZCBpbiBkZC1ncmlkc3RhY2sudHNcclxuICAgICAqIGJ1dCBjYXVzZWQgbG9hZGluZyBpc3N1ZXMgaW4gcHJvZCAtIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZ3JpZHN0YWNrL2dyaWRzdGFjay5qcy9pc3N1ZXMvMjAzOVxyXG4gICAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICovXHJcbiAgICAvKiogZ2V0IHRoZSBnbG9iYWwgKGJ1dCBzdGF0aWMgdG8gdGhpcyBjb2RlKSBERCBpbXBsZW1lbnRhdGlvbiAqL1xyXG4gICAgc3RhdGljIGdldEREKCkge1xyXG4gICAgICAgIHJldHVybiBkZDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogY2FsbCB0byBzZXR1cCBkcmFnZ2luZyBpbiBmcm9tIHRoZSBvdXRzaWRlIChzYXkgdG9vbGJhciksIGJ5IHNwZWNpZnlpbmcgdGhlIGNsYXNzIHNlbGVjdGlvbiBhbmQgb3B0aW9ucy5cclxuICAgICAqIENhbGxlZCBkdXJpbmcgR3JpZFN0YWNrLmluaXQoKSBhcyBvcHRpb25zLCBidXQgY2FuIGFsc28gYmUgY2FsbGVkIGRpcmVjdGx5IChsYXN0IHBhcmFtIGFyZSB1c2VkKSBpbiBjYXNlIHRoZSB0b29sYmFyXHJcbiAgICAgKiBpcyBkeW5hbWljYWxseSBjcmVhdGUgYW5kIG5lZWRzIHRvIGJlIHNldCBsYXRlci5cclxuICAgICAqIEBwYXJhbSBkcmFnSW4gc3RyaW5nIHNlbGVjdG9yIChleDogJy5zaWRlYmFyIC5ncmlkLXN0YWNrLWl0ZW0nKVxyXG4gICAgICogQHBhcmFtIGRyYWdJbk9wdGlvbnMgb3B0aW9ucyAtIHNlZSBERERyYWdJbk9wdC4gKGRlZmF1bHQ6IHtoYW5kbGU6ICcuZ3JpZC1zdGFjay1pdGVtLWNvbnRlbnQnLCBhcHBlbmRUbzogJ2JvZHknfVxyXG4gICAgICoqL1xyXG4gICAgc3RhdGljIHNldHVwRHJhZ0luKGRyYWdJbiwgZHJhZ0luT3B0aW9ucykge1xyXG4gICAgICAgIGlmICgoZHJhZ0luT3B0aW9ucyA9PT0gbnVsbCB8fCBkcmFnSW5PcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkcmFnSW5PcHRpb25zLnBhdXNlKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRkX21hbmFnZXJfMS5ERE1hbmFnZXIucGF1c2VEcmFnID0gZHJhZ0luT3B0aW9ucy5wYXVzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkcmFnSW4gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGRyYWdJbk9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHR5cGVzXzEuZHJhZ0luRGVmYXVsdE9wdGlvbnMpLCAoZHJhZ0luT3B0aW9ucyB8fCB7fSkpO1xyXG4gICAgICAgICAgICB1dGlsc18xLlV0aWxzLmdldEVsZW1lbnRzKGRyYWdJbikuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRkLmlzRHJhZ2dhYmxlKGVsKSlcclxuICAgICAgICAgICAgICAgICAgICBkZC5kcmFnSW4oZWwsIGRyYWdJbk9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEVuYWJsZXMvRGlzYWJsZXMgZHJhZ2dpbmcgYnkgdGhlIHVzZXIgb2Ygc3BlY2lmaWMgZ3JpZCBlbGVtZW50LiBJZiB5b3Ugd2FudCBhbGwgaXRlbXMsIGFuZCBoYXZlIGl0IGFmZmVjdCBmdXR1cmUgaXRlbXMsIHVzZSBlbmFibGVNb3ZlKCkgaW5zdGVhZC4gTm8tb3AgZm9yIHN0YXRpYyBncmlkcy5cclxuICAgICAqIElGIHlvdSBhcmUgbG9va2luZyB0byBwcmV2ZW50IGFuIGl0ZW0gZnJvbSBtb3ZpbmcgKGR1ZSB0byBiZWluZyBwdXNoZWQgYXJvdW5kIGJ5IGFub3RoZXIgZHVyaW5nIGNvbGxpc2lvbikgdXNlIGxvY2tlZCBwcm9wZXJ0eSBpbnN0ZWFkLlxyXG4gICAgICogQHBhcmFtIGVscyB3aWRnZXQgb3Igc2VsZWN0b3IgdG8gbW9kaWZ5LlxyXG4gICAgICogQHBhcmFtIHZhbCBpZiB0cnVlIHdpZGdldCB3aWxsIGJlIGRyYWdnYWJsZS5cclxuICAgICAqL1xyXG4gICAgbW92YWJsZShlbHMsIHZhbCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdHMuc3RhdGljR3JpZClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7IC8vIGNhbid0IG1vdmUgYSBzdGF0aWMgZ3JpZCFcclxuICAgICAgICBHcmlkU3RhY2suZ2V0RWxlbWVudHMoZWxzKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBlbC5ncmlkc3RhY2tOb2RlO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh2YWwpXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbm9kZS5ub01vdmU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG5vZGUubm9Nb3ZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcHJlcGFyZURyYWdEcm9wQnlOb2RlKG5vZGUpOyAvLyBpbml0IEREIGlmIG5lZWQgYmUsIGFuZCBhZGp1c3RcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRW5hYmxlcy9EaXNhYmxlcyB1c2VyIHJlc2l6aW5nIG9mIHNwZWNpZmljIGdyaWQgZWxlbWVudC4gSWYgeW91IHdhbnQgYWxsIGl0ZW1zLCBhbmQgaGF2ZSBpdCBhZmZlY3QgZnV0dXJlIGl0ZW1zLCB1c2UgZW5hYmxlUmVzaXplKCkgaW5zdGVhZC4gTm8tb3AgZm9yIHN0YXRpYyBncmlkcy5cclxuICAgICAqIEBwYXJhbSBlbHMgIHdpZGdldCBvciBzZWxlY3RvciB0byBtb2RpZnlcclxuICAgICAqIEBwYXJhbSB2YWwgIGlmIHRydWUgd2lkZ2V0IHdpbGwgYmUgcmVzaXphYmxlLlxyXG4gICAgICovXHJcbiAgICByZXNpemFibGUoZWxzLCB2YWwpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRzLnN0YXRpY0dyaWQpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzOyAvLyBjYW4ndCByZXNpemUgYSBzdGF0aWMgZ3JpZCFcclxuICAgICAgICBHcmlkU3RhY2suZ2V0RWxlbWVudHMoZWxzKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBlbC5ncmlkc3RhY2tOb2RlO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh2YWwpXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbm9kZS5ub1Jlc2l6ZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgbm9kZS5ub1Jlc2l6ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3ByZXBhcmVEcmFnRHJvcEJ5Tm9kZShub2RlKTsgLy8gaW5pdCBERCBpZiBuZWVkIGJlLCBhbmQgYWRqdXN0XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFRlbXBvcmFyaWx5IGRpc2FibGVzIHdpZGdldHMgbW92aW5nL3Jlc2l6aW5nLlxyXG4gICAgICogSWYgeW91IHdhbnQgYSBtb3JlIHBlcm1hbmVudCB3YXkgKHdoaWNoIGZyZWV6ZXMgdXAgcmVzb3VyY2VzKSB1c2UgYHNldFN0YXRpYyh0cnVlKWAgaW5zdGVhZC5cclxuICAgICAqIE5vdGU6IG5vLW9wIGZvciBzdGF0aWMgZ3JpZFxyXG4gICAgICogVGhpcyBpcyBhIHNob3J0Y3V0IGZvcjpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAgZ3JpZC5lbmFibGVNb3ZlKGZhbHNlKTtcclxuICAgICAqICBncmlkLmVuYWJsZVJlc2l6ZShmYWxzZSk7XHJcbiAgICAgKiBAcGFyYW0gcmVjdXJzZSB0cnVlIChkZWZhdWx0KSBpZiBzdWItZ3JpZHMgYWxzbyBnZXQgdXBkYXRlZFxyXG4gICAgICovXHJcbiAgICBkaXNhYmxlKHJlY3Vyc2UgPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5zdGF0aWNHcmlkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5lbmFibGVNb3ZlKGZhbHNlLCByZWN1cnNlKTtcclxuICAgICAgICB0aGlzLmVuYWJsZVJlc2l6ZShmYWxzZSwgcmVjdXJzZSk7IC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLl90cmlnZ2VyRXZlbnQoJ2Rpc2FibGUnKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmUtZW5hYmxlcyB3aWRnZXRzIG1vdmluZy9yZXNpemluZyAtIHNlZSBkaXNhYmxlKCkuXHJcbiAgICAgKiBOb3RlOiBuby1vcCBmb3Igc3RhdGljIGdyaWQuXHJcbiAgICAgKiBUaGlzIGlzIGEgc2hvcnRjdXQgZm9yOlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqICBncmlkLmVuYWJsZU1vdmUodHJ1ZSk7XHJcbiAgICAgKiAgZ3JpZC5lbmFibGVSZXNpemUodHJ1ZSk7XHJcbiAgICAgKiBAcGFyYW0gcmVjdXJzZSB0cnVlIChkZWZhdWx0KSBpZiBzdWItZ3JpZHMgYWxzbyBnZXQgdXBkYXRlZFxyXG4gICAgICovXHJcbiAgICBlbmFibGUocmVjdXJzZSA9IHRydWUpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRzLnN0YXRpY0dyaWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmVuYWJsZU1vdmUodHJ1ZSwgcmVjdXJzZSk7XHJcbiAgICAgICAgdGhpcy5lbmFibGVSZXNpemUodHJ1ZSwgcmVjdXJzZSk7IC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLl90cmlnZ2VyRXZlbnQoJ2VuYWJsZScpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmFibGVzL2Rpc2FibGVzIHdpZGdldCBtb3ZpbmcuIE5vLW9wIGZvciBzdGF0aWMgZ3JpZHMuXHJcbiAgICAgKiBAcGFyYW0gcmVjdXJzZSB0cnVlIChkZWZhdWx0KSBpZiBzdWItZ3JpZHMgYWxzbyBnZXQgdXBkYXRlZFxyXG4gICAgICovXHJcbiAgICBlbmFibGVNb3ZlKGRvRW5hYmxlLCByZWN1cnNlID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdHMuc3RhdGljR3JpZClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7IC8vIGNhbid0IG1vdmUgYSBzdGF0aWMgZ3JpZCFcclxuICAgICAgICB0aGlzLm9wdHMuZGlzYWJsZURyYWcgPSAhZG9FbmFibGU7IC8vIEZJUlNUIGJlZm9yZSB3ZSB1cGRhdGUgY2hpbGRyZW4gYXMgZ3JpZCBvdmVycmlkZXMgIzE2NThcclxuICAgICAgICB0aGlzLmVuZ2luZS5ub2Rlcy5mb3JFYWNoKG4gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmFibGUobi5lbCwgZG9FbmFibGUpO1xyXG4gICAgICAgICAgICBpZiAobi5zdWJHcmlkICYmIHJlY3Vyc2UpXHJcbiAgICAgICAgICAgICAgICBuLnN1YkdyaWQuZW5hYmxlTW92ZShkb0VuYWJsZSwgcmVjdXJzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEVuYWJsZXMvZGlzYWJsZXMgd2lkZ2V0IHJlc2l6aW5nLiBOby1vcCBmb3Igc3RhdGljIGdyaWRzLlxyXG4gICAgICogQHBhcmFtIHJlY3Vyc2UgdHJ1ZSAoZGVmYXVsdCkgaWYgc3ViLWdyaWRzIGFsc28gZ2V0IHVwZGF0ZWRcclxuICAgICAqL1xyXG4gICAgZW5hYmxlUmVzaXplKGRvRW5hYmxlLCByZWN1cnNlID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdHMuc3RhdGljR3JpZClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7IC8vIGNhbid0IHNpemUgYSBzdGF0aWMgZ3JpZCFcclxuICAgICAgICB0aGlzLm9wdHMuZGlzYWJsZVJlc2l6ZSA9ICFkb0VuYWJsZTsgLy8gRklSU1QgYmVmb3JlIHdlIHVwZGF0ZSBjaGlsZHJlbiBhcyBncmlkIG92ZXJyaWRlcyAjMTY1OFxyXG4gICAgICAgIHRoaXMuZW5naW5lLm5vZGVzLmZvckVhY2gobiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXphYmxlKG4uZWwsIGRvRW5hYmxlKTtcclxuICAgICAgICAgICAgaWYgKG4uc3ViR3JpZCAmJiByZWN1cnNlKVxyXG4gICAgICAgICAgICAgICAgbi5zdWJHcmlkLmVuYWJsZVJlc2l6ZShkb0VuYWJsZSwgcmVjdXJzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIHJlbW92ZXMgYW55IGRyYWcmZHJvcCBwcmVzZW50IChjYWxsZWQgZHVyaW5nIGRlc3Ryb3kpICovXHJcbiAgICBfcmVtb3ZlREQoZWwpIHtcclxuICAgICAgICBkZC5kcmFnZ2FibGUoZWwsICdkZXN0cm95JykucmVzaXphYmxlKGVsLCAnZGVzdHJveScpO1xyXG4gICAgICAgIGlmIChlbC5ncmlkc3RhY2tOb2RlKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBlbC5ncmlkc3RhY2tOb2RlLl9pbml0REQ7IC8vIHJlc2V0IG91ciBERCBpbml0IGZsYWdcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsZXRlIGVsLmRkRWxlbWVudDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgY2FsbGVkIHRvIGFkZCBkcmFnIG92ZXIgdG8gc3VwcG9ydCB3aWRnZXRzIGJlaW5nIGFkZGVkIGV4dGVybmFsbHkgKi9cclxuICAgIF9zZXR1cEFjY2VwdFdpZGdldCgpIHtcclxuICAgICAgICAvLyBjaGVjayBpZiB3ZSBuZWVkIHRvIGRpc2FibGUgdGhpbmdzXHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5zdGF0aWNHcmlkIHx8ICghdGhpcy5vcHRzLmFjY2VwdFdpZGdldHMgJiYgIXRoaXMub3B0cy5yZW1vdmFibGUpKSB7XHJcbiAgICAgICAgICAgIGRkLmRyb3BwYWJsZSh0aGlzLmVsLCAnZGVzdHJveScpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdmFycyBzaGFyZWQgYWNyb3NzIGFsbCBtZXRob2RzXHJcbiAgICAgICAgbGV0IGNlbGxIZWlnaHQsIGNlbGxXaWR0aDtcclxuICAgICAgICBsZXQgb25EcmFnID0gKGV2ZW50LCBlbCwgaGVscGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gZWwuZ3JpZHN0YWNrTm9kZTtcclxuICAgICAgICAgICAgaWYgKCFub2RlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBoZWxwZXIgPSBoZWxwZXIgfHwgZWw7XHJcbiAgICAgICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBsZXQgeyB0b3AsIGxlZnQgfSA9IGhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgbGVmdCAtPSBwYXJlbnQubGVmdDtcclxuICAgICAgICAgICAgdG9wIC09IHBhcmVudC50b3A7XHJcbiAgICAgICAgICAgIGxldCB1aSA9IHsgcG9zaXRpb246IHsgdG9wLCBsZWZ0IH0gfTtcclxuICAgICAgICAgICAgaWYgKG5vZGUuX3RlbXBvcmFyeVJlbW92ZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUueCA9IE1hdGgubWF4KDAsIE1hdGgucm91bmQobGVmdCAvIGNlbGxXaWR0aCkpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS55ID0gTWF0aC5tYXgoMCwgTWF0aC5yb3VuZCh0b3AgLyBjZWxsSGVpZ2h0KSk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbm9kZS5hdXRvUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5ub2RlQm91bmRGaXgobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBhY2NlcHQgKmluaXRpYWwqIGxvY2F0aW9uIGlmIGRvZXNuJ3QgZml0ICMxNDE5IChsb2NrZWQgZHJvcCByZWdpb24sIG9yIGNhbid0IGdyb3cpLCBidXQgbWF5YmUgdHJ5IGlmIGl0IHdpbGwgZ28gc29tZXdoZXJlXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZW5naW5lLndpbGxJdEZpdChub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuYXV0b1Bvc2l0aW9uID0gdHJ1ZTsgLy8gaWdub3JlIHgseSBhbmQgdHJ5IGZvciBhbnkgc2xvdC4uLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5lbmdpbmUud2lsbEl0Rml0KG5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRkLm9mZihlbCwgJ2RyYWcnKTsgLy8gc3RvcCBjYWxsaW5nIHVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjsgLy8gZnVsbCBncmlkIG9yIGNhbid0IGdyb3dcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuX3dpbGxGaXRQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHRoZSBhdXRvIHBvc2l0aW9uIGluc3RlYWQgIzE2ODdcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHNfMS5VdGlscy5jb3B5UG9zKG5vZGUsIG5vZGUuX3dpbGxGaXRQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbm9kZS5fd2lsbEZpdFBvcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyByZS11c2UgdGhlIGV4aXN0aW5nIG5vZGUgZHJhZ2dpbmcgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vblN0YXJ0TW92aW5nKGhlbHBlciwgZXZlbnQsIHVpLCBub2RlLCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcmUtdXNlIHRoZSBleGlzdGluZyBub2RlIGRyYWdnaW5nIHRoYXQgZG9lcyBzbyBtdWNoIG9mIHRoZSBjb2xsaXNpb24gZGV0ZWN0aW9uXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmFnT3JSZXNpemUoaGVscGVyLCBldmVudCwgdWksIG5vZGUsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGRkLmRyb3BwYWJsZSh0aGlzLmVsLCB7XHJcbiAgICAgICAgICAgIGFjY2VwdDogKGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGVsLmdyaWRzdGFja05vZGU7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgYWNjZXB0IGRyb3AgdG8gdHJ1ZSBvbiBvdXJzZWxmICh3aGljaCB3ZSBpZ25vcmUpIHNvIHdlIGRvbid0IGdldCBcImNhbid0IGRyb3BcIiBpY29uIGluIEhUTUw1IG1vZGUgd2hpbGUgbW92aW5nXHJcbiAgICAgICAgICAgICAgICBpZiAoKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbm9kZS5ncmlkKSA9PT0gdGhpcylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLmFjY2VwdFdpZGdldHMpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIGFjY2VwdCBtZXRob2Qgb3IgY2xhc3MgbWF0Y2hpbmdcclxuICAgICAgICAgICAgICAgIGxldCBjYW5BY2NlcHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdHMuYWNjZXB0V2lkZ2V0cyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbkFjY2VwdCA9IHRoaXMub3B0cy5hY2NlcHRXaWRnZXRzKGVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RvciA9ICh0aGlzLm9wdHMuYWNjZXB0V2lkZ2V0cyA9PT0gdHJ1ZSA/ICcuZ3JpZC1zdGFjay1pdGVtJyA6IHRoaXMub3B0cy5hY2NlcHRXaWRnZXRzKTtcclxuICAgICAgICAgICAgICAgICAgICBjYW5BY2NlcHQgPSBlbC5tYXRjaGVzKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGZpbmFsbHkgY2hlY2sgdG8gbWFrZSBzdXJlIHdlIGFjdHVhbGx5IGhhdmUgc3BhY2UgbGVmdCAjMTU3MVxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbkFjY2VwdCAmJiBub2RlICYmIHRoaXMub3B0cy5tYXhSb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbiA9IHsgdzogbm9kZS53LCBoOiBub2RlLmgsIG1pblc6IG5vZGUubWluVywgbWluSDogbm9kZS5taW5IIH07IC8vIG9ubHkgd2lkdGgvaGVpZ2h0IG1hdHRlcnMgYW5kIGF1dG9Qb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGNhbkFjY2VwdCA9IHRoaXMuZW5naW5lLndpbGxJdEZpdChuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjYW5BY2NlcHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogZW50ZXJpbmcgb3VyIGdyaWQgYXJlYVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgLm9uKHRoaXMuZWwsICdkcm9wb3ZlcicsIChldmVudCwgZWwsIGhlbHBlcikgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgb3ZlciAke3RoaXMuZWwuZ3JpZHN0YWNrLm9wdHMuaWR9ICR7Y291bnQrK31gKTsgLy8gVEVTVFxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGVsLmdyaWRzdGFja05vZGU7XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZSBkcm9wIGVudGVyIG9uIG91cnNlbGYgKHVubGVzcyB3ZSB0ZW1wb3JhcmlseSByZW1vdmVkKSB3aGljaCBoYXBwZW5zIG9uIGEgc2ltcGxlIGRyYWcgb2Ygb3VyIGl0ZW1cclxuICAgICAgICAgICAgaWYgKChub2RlID09PSBudWxsIHx8IG5vZGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5vZGUuZ3JpZCkgPT09IHRoaXMgJiYgIW5vZGUuX3RlbXBvcmFyeVJlbW92ZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGRlbGV0ZSBub2RlLl9hZGRlZDsgLy8gcmVzZXQgdGhpcyB0byB0cmFjayBwbGFjZWhvbGRlciBhZ2FpbiBpbiBjYXNlIHdlIHdlcmUgb3ZlciBvdGhlciBncmlkICMxNDg0IChkcm9wb3V0IGRvZXNuJ3QgYWx3YXlzIGNsZWFyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBwcmV2ZW50IHBhcmVudCBmcm9tIHJlY2VpdmluZyBtc2cgKHdoaWNoIG1heSBiZSBhIGdyaWQgYXMgd2VsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBmaXggIzE1Nzggd2hlbiBkcmFnZ2luZyBmYXN0LCB3ZSBtYXkgbm90IGdldCBhIGxlYXZlIG9uIHRoZSBwcmV2aW91cyBncmlkIHNvIGZvcmNlIG9uZSBub3dcclxuICAgICAgICAgICAgaWYgKChub2RlID09PSBudWxsIHx8IG5vZGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5vZGUuZ3JpZCkgJiYgbm9kZS5ncmlkICE9PSB0aGlzICYmICFub2RlLl90ZW1wb3JhcnlSZW1vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZHJvcG92ZXIgd2l0aG91dCBsZWF2ZScpOyAvLyBURVNUXHJcbiAgICAgICAgICAgICAgICBsZXQgb3RoZXJHcmlkID0gbm9kZS5ncmlkO1xyXG4gICAgICAgICAgICAgICAgb3RoZXJHcmlkLl9sZWF2ZShlbCwgaGVscGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjYWNoZSBjZWxsIGRpbWVuc2lvbnMgKHdoaWNoIGRvbid0IGNoYW5nZSksIHBvc2l0aW9uIGNhbiBhbmltYXRlIGlmIHdlIHJlbW92ZWQgYW4gaXRlbSBpbiBvdGhlckdyaWQgdGhhdCBhZmZlY3RzIHVzLi4uXHJcbiAgICAgICAgICAgIGNlbGxXaWR0aCA9IHRoaXMuY2VsbFdpZHRoKCk7XHJcbiAgICAgICAgICAgIGNlbGxIZWlnaHQgPSB0aGlzLmdldENlbGxIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIGxvYWQgYW55IGVsZW1lbnQgYXR0cmlidXRlcyBpZiB3ZSBkb24ndCBoYXZlIGEgbm9kZVxyXG4gICAgICAgICAgICBpZiAoIW5vZGUpIHsgLy8gQHRzLWlnbm9yZSBwcml2YXRlIHJlYWQgb25seSBvbiBvdXJzZWxmXHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5fcmVhZEF0dHIoZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghbm9kZS5ncmlkKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLl9pc0V4dGVybmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGVsLmdyaWRzdGFja05vZGUgPSBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgZ3JpZCBzaXplIGJhc2VkIG9uIGVsZW1lbnQgb3V0ZXIgc2l6ZVxyXG4gICAgICAgICAgICBoZWxwZXIgPSBoZWxwZXIgfHwgZWw7XHJcbiAgICAgICAgICAgIGxldCB3ID0gbm9kZS53IHx8IE1hdGgucm91bmQoaGVscGVyLm9mZnNldFdpZHRoIC8gY2VsbFdpZHRoKSB8fCAxO1xyXG4gICAgICAgICAgICBsZXQgaCA9IG5vZGUuaCB8fCBNYXRoLnJvdW5kKGhlbHBlci5vZmZzZXRIZWlnaHQgLyBjZWxsSGVpZ2h0KSB8fCAxO1xyXG4gICAgICAgICAgICAvLyBpZiB0aGUgaXRlbSBjYW1lIGZyb20gYW5vdGhlciBncmlkLCBtYWtlIGEgY29weSBhbmQgc2F2ZSB0aGUgb3JpZ2luYWwgaW5mbyBpbiBjYXNlIHdlIGdvIGJhY2sgdGhlcmVcclxuICAgICAgICAgICAgaWYgKG5vZGUuZ3JpZCAmJiBub2RlLmdyaWQgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvcHkgdGhlIG5vZGUgb3JpZ2luYWwgdmFsdWVzIChtaW4vbWF4L2lkL2V0Yy4uLikgYnV0IG92ZXJyaWRlIHdpZHRoL2hlaWdodC9vdGhlciBmbGFncyB3aGljaCBhcmUgdGhpcyBncmlkIHNwZWNpZmljXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZHJvcG92ZXIgY2xvbmluZyBub2RlJyk7IC8vIFRFU1RcclxuICAgICAgICAgICAgICAgIGlmICghZWwuX2dyaWRzdGFja05vZGVPcmlnKVxyXG4gICAgICAgICAgICAgICAgICAgIGVsLl9ncmlkc3RhY2tOb2RlT3JpZyA9IG5vZGU7IC8vIHNob3VsZG4ndCBoYXZlIG11bHRpcGxlIG5lc3RlZCFcclxuICAgICAgICAgICAgICAgIGVsLmdyaWRzdGFja05vZGUgPSBub2RlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBub2RlKSwgeyB3LCBoLCBncmlkOiB0aGlzIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuY2xlYW51cE5vZGUobm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAubm9kZUJvdW5kRml4KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgLy8gcmVzdG9yZSBzb21lIGludGVybmFsIGZpZWxkcyB3ZSBuZWVkIGFmdGVyIGNsZWFyaW5nIHRoZW0gYWxsXHJcbiAgICAgICAgICAgICAgICBub2RlLl9pbml0REQgPVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuX2lzRXh0ZXJuYWwgPSAvLyBET00gbmVlZHMgdG8gYmUgcmUtcGFyZW50ZWQgb24gYSBkcm9wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuX3RlbXBvcmFyeVJlbW92ZWQgPSB0cnVlOyAvLyBzbyBpdCBjYW4gYmUgaW5zZXJ0ZWQgb25EcmFnIGJlbG93XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLncgPSB3O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5oID0gaDtcclxuICAgICAgICAgICAgICAgIG5vZGUuX3RlbXBvcmFyeVJlbW92ZWQgPSB0cnVlOyAvLyBzbyB3ZSBjYW4gaW5zZXJ0IGl0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2xlYXIgYW55IG1hcmtlZCBmb3IgY29tcGxldGUgcmVtb3ZhbCAoTm90ZTogZG9uJ3QgY2hlY2sgX2lzQWJvdXRUb1JlbW92ZSBhcyB0aGF0IGlzIGNsZWFyZWQgYWJvdmUgLSBqdXN0IGRvIGl0KVxyXG4gICAgICAgICAgICB0aGlzLl9pdGVtUmVtb3Zpbmcobm9kZS5lbCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBkZC5vbihlbCwgJ2RyYWcnLCBvbkRyYWcpO1xyXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhpcyBpcyBjYWxsZWQgYXQgbGVhc3Qgb25jZSB3aGVuIGdvaW5nIGZhc3QgIzE1NzhcclxuICAgICAgICAgICAgb25EcmFnKGV2ZW50LCBlbCwgaGVscGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBwcmV2ZW50IHBhcmVudCBmcm9tIHJlY2VpdmluZyBtc2cgKHdoaWNoIG1heSBiZSBhIGdyaWQgYXMgd2VsbClcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogTGVhdmluZyBvdXIgZ3JpZCBhcmVhLi4uXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAub24odGhpcy5lbCwgJ2Ryb3BvdXQnLCAoZXZlbnQsIGVsLCBoZWxwZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYG91dCAke3RoaXMuZWwuZ3JpZHN0YWNrLm9wdHMuaWR9ICR7Y291bnQrK31gKTsgLy8gVEVTVFxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGVsLmdyaWRzdGFja05vZGU7XHJcbiAgICAgICAgICAgIGlmICghbm9kZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgLy8gZml4ICMxNTc4IHdoZW4gZHJhZ2dpbmcgZmFzdCwgd2UgbWlnaHQgZ2V0IGxlYXZlIGFmdGVyIG90aGVyIGdyaWQgZ2V0cyBlbnRlciAod2hpY2ggY2FsbHMgdXMgdG8gY2xlYW4pXHJcbiAgICAgICAgICAgIC8vIHNvIHNraXAgdGhpcyBvbmUgaWYgd2UncmUgbm90IHRoZSBhY3RpdmUgZ3JpZCByZWFsbHkuLlxyXG4gICAgICAgICAgICBpZiAoIW5vZGUuZ3JpZCB8fCBub2RlLmdyaWQgPT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xlYXZlKGVsLCBoZWxwZXIpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgd2Ugd2VyZSBjcmVhdGVkIGFzIHRlbXBvcmFyeSBuZXN0ZWQgZ3JpZCwgZ28gYmFjayB0byBiZWZvcmUgc3RhdGVcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1RlbXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFzU3ViR3JpZChub2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHByZXZlbnQgcGFyZW50IGZyb20gcmVjZWl2aW5nIG1zZyAod2hpY2ggbWF5IGJlIGdyaWQgYXMgd2VsbClcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogZW5kIC0gcmVsZWFzaW5nIHRoZSBtb3VzZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgLm9uKHRoaXMuZWwsICdkcm9wJywgKGV2ZW50LCBlbCwgaGVscGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gZWwuZ3JpZHN0YWNrTm9kZTtcclxuICAgICAgICAgICAgLy8gaWdub3JlIGRyb3Agb24gb3Vyc2VsZiBmcm9tIG91cnNlbGYgdGhhdCBkaWRuJ3QgY29tZSBmcm9tIHRoZSBvdXRzaWRlIC0gZHJhZ2VuZCB3aWxsIGhhbmRsZSB0aGUgc2ltcGxlIG1vdmUgaW5zdGVhZFxyXG4gICAgICAgICAgICBpZiAoKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbm9kZS5ncmlkKSA9PT0gdGhpcyAmJiAhbm9kZS5faXNFeHRlcm5hbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHdhc0FkZGVkID0gISF0aGlzLnBsYWNlaG9sZGVyLnBhcmVudEVsZW1lbnQ7IC8vIHNraXAgaXRlbXMgbm90IGFjdHVhbGx5IGFkZGVkIHRvIHVzIGJlY2F1c2Ugb2YgY29uc3RyYWlucywgYnV0IGRvIGNsZWFudXAgIzE0MTlcclxuICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgLy8gbm90aWZ5IHByZXZpb3VzIGdyaWQgb2YgcmVtb3ZhbFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZHJvcCBkZWxldGUgX2dyaWRzdGFja05vZGVPcmlnJykgLy8gVEVTVFxyXG4gICAgICAgICAgICBsZXQgb3JpZ05vZGUgPSBlbC5fZ3JpZHN0YWNrTm9kZU9yaWc7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBlbC5fZ3JpZHN0YWNrTm9kZU9yaWc7XHJcbiAgICAgICAgICAgIGlmICh3YXNBZGRlZCAmJiAob3JpZ05vZGUgPT09IG51bGwgfHwgb3JpZ05vZGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9yaWdOb2RlLmdyaWQpICYmIG9yaWdOb2RlLmdyaWQgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvR3JpZCA9IG9yaWdOb2RlLmdyaWQ7XHJcbiAgICAgICAgICAgICAgICBvR3JpZC5lbmdpbmUucmVtb3ZlZE5vZGVzLnB1c2gob3JpZ05vZGUpO1xyXG4gICAgICAgICAgICAgICAgb0dyaWQuX3RyaWdnZXJSZW1vdmVFdmVudCgpLl90cmlnZ2VyQ2hhbmdlRXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIGl0J3MgYW4gZW1wdHkgc3ViLWdyaWQgdGhhdCBnb3QgYXV0by1jcmVhdGVkLCBudWtlIGl0XHJcbiAgICAgICAgICAgICAgICBpZiAob0dyaWQucGFyZW50R3JpZEl0ZW0gJiYgIW9HcmlkLmVuZ2luZS5ub2Rlcy5sZW5ndGggJiYgb0dyaWQub3B0cy5zdWJHcmlkRHluYW1pYykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9HcmlkLnJlbW92ZUFzU3ViR3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghbm9kZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgLy8gdXNlIGV4aXN0aW5nIHBsYWNlaG9sZGVyIG5vZGUgYXMgaXQncyBhbHJlYWR5IGluIG91ciBsaXN0IHdpdGggZHJvcCBsb2NhdGlvblxyXG4gICAgICAgICAgICBpZiAod2FzQWRkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLmNsZWFudXBOb2RlKG5vZGUpOyAvLyByZW1vdmVzIGFsbCBpbnRlcm5hbCBfeHl6IHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgbm9kZS5ncmlkID0gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZC5vZmYoZWwsICdkcmFnJyk7XHJcbiAgICAgICAgICAgIC8vIGlmIHdlIG1hZGUgYSBjb3B5ICgnaGVscGVyJyB3aGljaCBpcyB0ZW1wKSBvZiB0aGUgb3JpZ2luYWwgbm9kZSB0aGVuIGluc2VydCBhIGNvcHksIGVsc2Ugd2UgbW92ZSB0aGUgb3JpZ2luYWwgbm9kZSAoIzExMDIpXHJcbiAgICAgICAgICAgIC8vIGFzIHRoZSBoZWxwZXIgd2lsbCBiZSBudWtlZCBieSBqcXVlcnktdWkgb3RoZXJ3aXNlLiBUT0RPOiB1cGRhdGUgb2xkIGNvZGUgcGF0aFxyXG4gICAgICAgICAgICBpZiAoaGVscGVyICE9PSBlbCkge1xyXG4gICAgICAgICAgICAgICAgaGVscGVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgZWwuZ3JpZHN0YWNrTm9kZSA9IG9yaWdOb2RlOyAvLyBvcmlnaW5hbCBpdGVtIChsZWZ0IGJlaGluZCkgaXMgcmUtc3RvcmVkIHRvIHByZSBkcmFnZ2luZyBhcyB0aGUgbm9kZSBub3cgaGFzIGRyb3AgaW5mb1xyXG4gICAgICAgICAgICAgICAgaWYgKHdhc0FkZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwgPSBlbC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbC5yZW1vdmUoKTsgLy8gcmVkdWNlIGZsaWNrZXIgYXMgd2UgY2hhbmdlIGRlcHRoIGhlcmUsIGFuZCBzaXplIGZ1cnRoZXIgZG93blxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlREQoZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghd2FzQWRkZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsLmdyaWRzdGFja05vZGUgPSBub2RlO1xyXG4gICAgICAgICAgICBub2RlLmVsID0gZWw7XHJcbiAgICAgICAgICAgIGxldCBzdWJHcmlkID0gKF9iID0gKF9hID0gbm9kZS5zdWJHcmlkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZWwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5ncmlkc3RhY2s7IC8vIHNldCB3aGVuIGFjdHVhbCBzdWItZ3JpZCBwcmVzZW50XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdXRpbHNfMS5VdGlscy5jb3B5UG9zKG5vZGUsIHRoaXMuX3JlYWRBdHRyKHRoaXMucGxhY2Vob2xkZXIpKTsgLy8gcGxhY2Vob2xkZXIgdmFsdWVzIGFzIG1vdmluZyBWRVJZIGZhc3QgY2FuIHRocm93IHRoaW5ncyBvZmYgIzE1NzhcclxuICAgICAgICAgICAgdXRpbHNfMS5VdGlscy5yZW1vdmVQb3NpdGlvbmluZ1N0eWxlcyhlbCk7IC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy5fd3JpdGVBdHRyKGVsLCBub2RlKTtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCh0eXBlc18xLmdyaWREZWZhdWx0cy5pdGVtQ2xhc3MsIHRoaXMub3B0cy5pdGVtQ2xhc3MpO1xyXG4gICAgICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKGVsKTsgLy8gQHRzLWlnbm9yZSAvLyBUT0RPOiBub3cgd291bGQgYmUgaWRlYWwgdGltZSB0byBfcmVtb3ZlSGVscGVyU3R5bGUoKSBvdmVycmlkaW5nIGZsb2F0aW5nIHN0eWxlcyAobmF0aXZlIG9ubHkpXHJcbiAgICAgICAgICAgIGlmIChzdWJHcmlkKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJHcmlkLnBhcmVudEdyaWRJdGVtID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIGlmICghc3ViR3JpZC5vcHRzLnN0eWxlSW5IZWFkKVxyXG4gICAgICAgICAgICAgICAgICAgIHN1YkdyaWQuX3VwZGF0ZVN0eWxlcyh0cnVlKTsgLy8gcmUtY3JlYXRlIHN1Yi1ncmlkIHN0eWxlcyBub3cgdGhhdCB3ZSd2ZSBtb3ZlZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvbnRhaW5lckhlaWdodCgpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5hZGRlZE5vZGVzLnB1c2gobm9kZSk7IC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckFkZEV2ZW50KCk7IC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5nZUV2ZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLmVuZFVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZ3NFdmVudEhhbmRsZXJbJ2Ryb3BwZWQnXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ3NFdmVudEhhbmRsZXJbJ2Ryb3BwZWQnXShPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGV2ZW50KSwgeyB0eXBlOiAnZHJvcHBlZCcgfSksIG9yaWdOb2RlICYmIG9yaWdOb2RlLmdyaWQgPyBvcmlnTm9kZSA6IHVuZGVmaW5lZCwgbm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gd2FpdCB0aWxsIHdlIHJldHVybiBvdXQgb2YgdGhlIGRyYWcgY2FsbGJhY2sgdG8gc2V0IHRoZSBuZXcgZHJhZyZyZXNpemUgaGFuZGxlciBvciB0aGV5IG1heSBnZXQgbWVzc2VkIHVwXHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIElGRiB3ZSBhcmUgc3RpbGwgdGhlcmUgKHNvbWUgYXBwbGljYXRpb24gd2lsbCB1c2UgYXMgcGxhY2Vob2xkZXIgYW5kIGluc2VydCB0aGVpciByZWFsIHdpZGdldCBpbnN0ZWFkIGFuZCBiZXR0ZXIgY2FsbCBtYWtlV2lkZ2V0KCkpXHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5lbCAmJiBub2RlLmVsLnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcmVwYXJlRHJhZ0Ryb3BCeU5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5yZW1vdmVOb2RlKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG5vZGUuZ3JpZC5faXNUZW1wO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBwcmV2ZW50IHBhcmVudCBmcm9tIHJlY2VpdmluZyBtc2cgKHdoaWNoIG1heSBiZSBncmlkIGFzIHdlbGwpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIG1hcmsgaXRlbSBmb3IgcmVtb3ZhbCAqL1xyXG4gICAgX2l0ZW1SZW1vdmluZyhlbCwgcmVtb3ZlKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBlbCA/IGVsLmdyaWRzdGFja05vZGUgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKCFub2RlIHx8ICFub2RlLmdyaWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICByZW1vdmUgPyBub2RlLl9pc0Fib3V0VG9SZW1vdmUgPSB0cnVlIDogZGVsZXRlIG5vZGUuX2lzQWJvdXRUb1JlbW92ZTtcclxuICAgICAgICByZW1vdmUgPyBlbC5jbGFzc0xpc3QuYWRkKCdncmlkLXN0YWNrLWl0ZW0tcmVtb3ZpbmcnKSA6IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2dyaWQtc3RhY2staXRlbS1yZW1vdmluZycpO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCBjYWxsZWQgdG8gc2V0dXAgYSB0cmFzaCBkcm9wIHpvbmUgaWYgdGhlIHVzZXIgc3BlY2lmaWVzIGl0ICovXHJcbiAgICBfc2V0dXBSZW1vdmVEcm9wKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5vcHRzLnN0YXRpY0dyaWQgJiYgdHlwZW9mIHRoaXMub3B0cy5yZW1vdmFibGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmFzaEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm9wdHMucmVtb3ZhYmxlKTtcclxuICAgICAgICAgICAgaWYgKCF0cmFzaEVsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIC8vIG9ubHkgcmVnaXN0ZXIgT05FIGRyb3Atb3Zlci9kcm9wb3V0IGNhbGxiYWNrIGZvciB0aGUgJ3RyYXNoJywgYW5kIGl0IHdpbGxcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBwYXNzZWQgaW4gaXRlbSBhbmQgcGFyZW50IGdyaWQgYmVjYXVzZSB0aGUgJ3RyYXNoJyBpcyBhIHNoYXJlZCByZXNvdXJjZSBhbnl3YXksXHJcbiAgICAgICAgICAgIC8vIGFuZCBOYXRpdmUgREQgb25seSBoYXMgMSBldmVudCBDQiAoaGF2aW5nIGEgbGlzdCBhbmQgdGVjaG5pY2FsbHkgYSBwZXIgZ3JpZCByZW1vdmFibGVPcHRpb25zIGNvbXBsaWNhdGVzIHRoaW5ncyBncmVhdGx5KVxyXG4gICAgICAgICAgICBpZiAoIWRkLmlzRHJvcHBhYmxlKHRyYXNoRWwpKSB7XHJcbiAgICAgICAgICAgICAgICBkZC5kcm9wcGFibGUodHJhc2hFbCwgdGhpcy5vcHRzLnJlbW92YWJsZU9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKHRyYXNoRWwsICdkcm9wb3ZlcicsIChldmVudCwgZWwpID0+IHRoaXMuX2l0ZW1SZW1vdmluZyhlbCwgdHJ1ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKHRyYXNoRWwsICdkcm9wb3V0JywgKGV2ZW50LCBlbCkgPT4gdGhpcy5faXRlbVJlbW92aW5nKGVsLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCBwcmVwYXJlcyB0aGUgZWxlbWVudCBmb3IgZHJhZyZkcm9wICoqL1xyXG4gICAgX3ByZXBhcmVEcmFnRHJvcEJ5Tm9kZShub2RlKSB7XHJcbiAgICAgICAgbGV0IGVsID0gbm9kZS5lbDtcclxuICAgICAgICBjb25zdCBub01vdmUgPSBub2RlLm5vTW92ZSB8fCB0aGlzLm9wdHMuZGlzYWJsZURyYWc7XHJcbiAgICAgICAgY29uc3Qgbm9SZXNpemUgPSBub2RlLm5vUmVzaXplIHx8IHRoaXMub3B0cy5kaXNhYmxlUmVzaXplO1xyXG4gICAgICAgIC8vIGNoZWNrIGZvciBkaXNhYmxlZCBncmlkIGZpcnN0XHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5zdGF0aWNHcmlkIHx8IChub01vdmUgJiYgbm9SZXNpemUpKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLl9pbml0REQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUREKGVsKTsgLy8gbnVrZXMgZXZlcnl0aGluZyBpbnN0ZWFkIG9mIGp1c3QgZGlzYWJsZSwgd2lsbCBhZGQgc29tZSBzdHlsZXMgYmFjayBuZXh0XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbm9kZS5faW5pdEREO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3VpLWRyYWdnYWJsZS1kaXNhYmxlZCcsICd1aS1yZXNpemFibGUtZGlzYWJsZWQnKTsgLy8gYWRkIHN0eWxlcyBvbmUgbWlnaHQgZGVwZW5kIG9uICMxNDM1XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW5vZGUuX2luaXRERCkge1xyXG4gICAgICAgICAgICAvLyB2YXJpYWJsZXMgdXNlZC9jYXNoZWQgYmV0d2VlbiB0aGUgMyBzdGFydC9tb3ZlL2VuZCBtZXRob2RzLCBpbiBhZGRpdGlvbiB0byBub2RlIHBhc3NlZCBhYm92ZVxyXG4gICAgICAgICAgICBsZXQgY2VsbFdpZHRoO1xyXG4gICAgICAgICAgICBsZXQgY2VsbEhlaWdodDtcclxuICAgICAgICAgICAgLyoqIGNhbGxlZCB3aGVuIGl0ZW0gc3RhcnRzIG1vdmluZy9yZXNpemluZyAqL1xyXG4gICAgICAgICAgICBsZXQgb25TdGFydE1vdmluZyA9IChldmVudCwgdWkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgYW55ICdkcmFnc3RhcnQnIC8gJ3Jlc2l6ZXN0YXJ0JyBtYW51YWxseVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dzRXZlbnRIYW5kbGVyW2V2ZW50LnR5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ3NFdmVudEhhbmRsZXJbZXZlbnQudHlwZV0oZXZlbnQsIGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjZWxsV2lkdGggPSB0aGlzLmNlbGxXaWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgY2VsbEhlaWdodCA9IHRoaXMuZ2V0Q2VsbEhlaWdodCh0cnVlKTsgLy8gZm9yY2UgcGl4ZWxzIGZvciBjYWxjdWxhdGlvbnNcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uU3RhcnRNb3ZpbmcoZWwsIGV2ZW50LCB1aSwgbm9kZSwgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLyoqIGNhbGxlZCB3aGVuIGl0ZW0gaXMgYmVpbmcgZHJhZ2dlZC9yZXNpemVkICovXHJcbiAgICAgICAgICAgIGxldCBkcmFnT3JSZXNpemUgPSAoZXZlbnQsIHVpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmFnT3JSZXNpemUoZWwsIGV2ZW50LCB1aSwgbm9kZSwgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLyoqIGNhbGxlZCB3aGVuIHRoZSBpdGVtIHN0b3BzIG1vdmluZy9yZXNpemluZyAqL1xyXG4gICAgICAgICAgICBsZXQgb25FbmRNb3ZpbmcgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbm9kZS5fbW92aW5nO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG5vZGUuX2V2ZW50O1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG5vZGUuX2xhc3RUcmllZDtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBpdGVtIGhhcyBtb3ZlZCB0byBhbm90aGVyIGdyaWQsIHdlJ3JlIGRvbmUgaGVyZVxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0LmdyaWRzdGFja05vZGUgfHwgdGFyZ2V0LmdyaWRzdGFja05vZGUuZ3JpZCAhPT0gdGhpcylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBub2RlLmVsID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuX2lzQWJvdXRUb1JlbW92ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncmlkVG9Ob3RpZnkgPSBlbC5ncmlkc3RhY2tOb2RlLmdyaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWRUb05vdGlmeS5fZ3NFdmVudEhhbmRsZXJbZXZlbnQudHlwZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFRvTm90aWZ5Ll9nc0V2ZW50SGFuZGxlcltldmVudC50eXBlXShldmVudCwgdGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlREQoZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUb05vdGlmeS5lbmdpbmUucmVtb3ZlZE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRvTm90aWZ5Ll90cmlnZ2VyUmVtb3ZlRXZlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBicmVhayBjaXJjdWxhciBsaW5rcyBhbmQgcmVtb3ZlIERPTVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlbC5ncmlkc3RhY2tOb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBub2RlLmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHNfMS5VdGlscy5yZW1vdmVQb3NpdGlvbmluZ1N0eWxlcyh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLl90ZW1wb3JhcnlSZW1vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdvdCByZW1vdmVkIC0gcmVzdG9yZSBpdGVtIGJhY2sgdG8gYmVmb3JlIGRyYWdnaW5nIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzXzEuVXRpbHMuY29weVBvcyhub2RlLCBub2RlLl9vcmlnKTsgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93cml0ZVBvc0F0dHIodGFyZ2V0LCBub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuYWRkTm9kZShub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgdG8gbmV3IHBsYWNlaG9sZGVyIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dyaXRlUG9zQXR0cih0YXJnZXQsIG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ3NFdmVudEhhbmRsZXJbZXZlbnQudHlwZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ3NFdmVudEhhbmRsZXJbZXZlbnQudHlwZV0oZXZlbnQsIHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZXh0cmFEcmFnUm93ID0gMDsgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29udGFpbmVySGVpZ2h0KCk7IC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuZ2VFdmVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuZW5kVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRkLmRyYWdnYWJsZShlbCwge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IG9uU3RhcnRNb3ZpbmcsXHJcbiAgICAgICAgICAgICAgICBzdG9wOiBvbkVuZE1vdmluZyxcclxuICAgICAgICAgICAgICAgIGRyYWc6IGRyYWdPclJlc2l6ZVxyXG4gICAgICAgICAgICB9KS5yZXNpemFibGUoZWwsIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBvblN0YXJ0TW92aW5nLFxyXG4gICAgICAgICAgICAgICAgc3RvcDogb25FbmRNb3ZpbmcsXHJcbiAgICAgICAgICAgICAgICByZXNpemU6IGRyYWdPclJlc2l6ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbm9kZS5faW5pdEREID0gdHJ1ZTsgLy8gd2UndmUgc2V0IEREIHN1cHBvcnQgbm93XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGZpbmFsbHkgZmluZSB0dW5lIG1vdmUgdnMgcmVzaXplIGJ5IGRpc2FibGluZyBhbnkgcGFydC4uLlxyXG4gICAgICAgIGRkLmRyYWdnYWJsZShlbCwgbm9Nb3ZlID8gJ2Rpc2FibGUnIDogJ2VuYWJsZScpXHJcbiAgICAgICAgICAgIC5yZXNpemFibGUoZWwsIG5vUmVzaXplID8gJ2Rpc2FibGUnIDogJ2VuYWJsZScpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbnRlcm5hbCBoYW5kbGVzIGFjdHVhbCBkcmFnL3Jlc2l6ZSBzdGFydCAqKi9cclxuICAgIF9vblN0YXJ0TW92aW5nKGVsLCBldmVudCwgdWksIG5vZGUsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCkge1xyXG4gICAgICAgIHRoaXMuZW5naW5lLmNsZWFuTm9kZXMoKVxyXG4gICAgICAgICAgICAuYmVnaW5VcGRhdGUobm9kZSk7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuX3dyaXRlUG9zQXR0cih0aGlzLnBsYWNlaG9sZGVyLCBub2RlKTtcclxuICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMucGxhY2Vob2xkZXIpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdfb25TdGFydE1vdmluZyBwbGFjZWhvbGRlcicpIC8vIFRFU1RcclxuICAgICAgICBub2RlLmVsID0gdGhpcy5wbGFjZWhvbGRlcjtcclxuICAgICAgICBub2RlLl9sYXN0VWlQb3NpdGlvbiA9IHVpLnBvc2l0aW9uO1xyXG4gICAgICAgIG5vZGUuX3ByZXZZUGl4ID0gdWkucG9zaXRpb24udG9wO1xyXG4gICAgICAgIG5vZGUuX21vdmluZyA9IChldmVudC50eXBlID09PSAnZHJhZ3N0YXJ0Jyk7IC8vICdkcm9wb3ZlcicgYXJlIG5vdCBpbml0aWFsbHkgbW92aW5nIHNvIHRoZXkgY2FuIGdvIGV4YWN0bHkgd2hlcmUgdGhleSBlbnRlciAod2lsbCBwdXNoIHN0dWZmIG91dCBvZiB0aGUgd2F5KVxyXG4gICAgICAgIGRlbGV0ZSBub2RlLl9sYXN0VHJpZWQ7XHJcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkcm9wb3ZlcicgJiYgbm9kZS5fdGVtcG9yYXJ5UmVtb3ZlZCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZW5naW5lLmFkZE5vZGUgeD0nICsgbm9kZS54KTsgLy8gVEVTVFxyXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5hZGROb2RlKG5vZGUpOyAvLyB3aWxsIGFkZCwgZml4IGNvbGxpc2lvbnMsIHVwZGF0ZSBhdHRyIGFuZCBjbGVhciBfdGVtcG9yYXJ5UmVtb3ZlZFxyXG4gICAgICAgICAgICBub2RlLl9tb3ZpbmcgPSB0cnVlOyAvLyBBRlRFUiwgbWFyayBhcyBtb3Zpbmcgb2JqZWN0ICh3YW50ZWQgZml4IGxvY2F0aW9uIGJlZm9yZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2V0IHRoZSBtaW4vbWF4IHJlc2l6ZSBpbmZvXHJcbiAgICAgICAgdGhpcy5lbmdpbmUuY2FjaGVSZWN0cyhjZWxsV2lkdGgsIGNlbGxIZWlnaHQsIHRoaXMub3B0cy5tYXJnaW5Ub3AsIHRoaXMub3B0cy5tYXJnaW5SaWdodCwgdGhpcy5vcHRzLm1hcmdpbkJvdHRvbSwgdGhpcy5vcHRzLm1hcmdpbkxlZnQpO1xyXG4gICAgICAgIGlmIChldmVudC50eXBlID09PSAncmVzaXplc3RhcnQnKSB7XHJcbiAgICAgICAgICAgIGRkLnJlc2l6YWJsZShlbCwgJ29wdGlvbicsICdtaW5XaWR0aCcsIGNlbGxXaWR0aCAqIChub2RlLm1pblcgfHwgMSkpXHJcbiAgICAgICAgICAgICAgICAucmVzaXphYmxlKGVsLCAnb3B0aW9uJywgJ21pbkhlaWdodCcsIGNlbGxIZWlnaHQgKiAobm9kZS5taW5IIHx8IDEpKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUubWF4Vykge1xyXG4gICAgICAgICAgICAgICAgZGQucmVzaXphYmxlKGVsLCAnb3B0aW9uJywgJ21heFdpZHRoJywgY2VsbFdpZHRoICogbm9kZS5tYXhXKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS5tYXhIKSB7XHJcbiAgICAgICAgICAgICAgICBkZC5yZXNpemFibGUoZWwsICdvcHRpb24nLCAnbWF4SGVpZ2h0JywgY2VsbEhlaWdodCAqIG5vZGUubWF4SCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIGhhbmRsZXMgYWN0dWFsIGRyYWcvcmVzaXplICoqL1xyXG4gICAgX2RyYWdPclJlc2l6ZShlbCwgZXZlbnQsIHVpLCBub2RlLCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQpIHtcclxuICAgICAgICBsZXQgcCA9IE9iamVjdC5hc3NpZ24oe30sIG5vZGUuX29yaWcpOyAvLyBjb3VsZCBiZSB1bmRlZmluZWQgKF9pc0V4dGVybmFsKSB3aGljaCBpcyBvayAoZHJhZyBvbmx5IHNldCB4LHkgYW5kIHcsaCB3aWxsIGRlZmF1bHQgdG8gbm9kZSB2YWx1ZSlcclxuICAgICAgICBsZXQgcmVzaXppbmc7XHJcbiAgICAgICAgbGV0IG1MZWZ0ID0gdGhpcy5vcHRzLm1hcmdpbkxlZnQsIG1SaWdodCA9IHRoaXMub3B0cy5tYXJnaW5SaWdodCwgbVRvcCA9IHRoaXMub3B0cy5tYXJnaW5Ub3AsIG1Cb3R0b20gPSB0aGlzLm9wdHMubWFyZ2luQm90dG9tO1xyXG4gICAgICAgIC8vIGlmIG1hcmdpbnMgKHdoaWNoIGFyZSB1c2VkIHRvIHBhc3MgbWlkIHBvaW50IGJ5KSBhcmUgbGFyZ2UgcmVsYXRpdmUgdG8gY2VsbCBoZWlnaHQvd2lkdGgsIHJlZHVjZSB0aGVtIGRvd24gIzE4NTVcclxuICAgICAgICBsZXQgbUhlaWdodCA9IE1hdGgucm91bmQoY2VsbEhlaWdodCAqIDAuMSksIG1XaWR0aCA9IE1hdGgucm91bmQoY2VsbFdpZHRoICogMC4xKTtcclxuICAgICAgICBtTGVmdCA9IE1hdGgubWluKG1MZWZ0LCBtV2lkdGgpO1xyXG4gICAgICAgIG1SaWdodCA9IE1hdGgubWluKG1SaWdodCwgbVdpZHRoKTtcclxuICAgICAgICBtVG9wID0gTWF0aC5taW4obVRvcCwgbUhlaWdodCk7XHJcbiAgICAgICAgbUJvdHRvbSA9IE1hdGgubWluKG1Cb3R0b20sIG1IZWlnaHQpO1xyXG4gICAgICAgIGlmIChldmVudC50eXBlID09PSAnZHJhZycpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUuX3RlbXBvcmFyeVJlbW92ZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGhhbmRsZWQgYnkgZHJvcG92ZXJcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gdWkucG9zaXRpb24udG9wIC0gbm9kZS5fcHJldllQaXg7XHJcbiAgICAgICAgICAgIG5vZGUuX3ByZXZZUGl4ID0gdWkucG9zaXRpb24udG9wO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmRyYWdnYWJsZS5zY3JvbGwgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlsc18xLlV0aWxzLnVwZGF0ZVNjcm9sbFBvc2l0aW9uKGVsLCB1aS5wb3NpdGlvbiwgZGlzdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGdldCBuZXcgcG9zaXRpb24gdGFraW5nIGludG8gYWNjb3VudCB0aGUgbWFyZ2luIGluIHRoZSBkaXJlY3Rpb24gd2UgYXJlIG1vdmluZyEgKG5lZWQgdG8gcGFzcyBtaWQgcG9pbnQgYnkgbWFyZ2luKVxyXG4gICAgICAgICAgICBsZXQgbGVmdCA9IHVpLnBvc2l0aW9uLmxlZnQgKyAodWkucG9zaXRpb24ubGVmdCA+IG5vZGUuX2xhc3RVaVBvc2l0aW9uLmxlZnQgPyAtbVJpZ2h0IDogbUxlZnQpO1xyXG4gICAgICAgICAgICBsZXQgdG9wID0gdWkucG9zaXRpb24udG9wICsgKHVpLnBvc2l0aW9uLnRvcCA+IG5vZGUuX2xhc3RVaVBvc2l0aW9uLnRvcCA/IC1tQm90dG9tIDogbVRvcCk7XHJcbiAgICAgICAgICAgIHAueCA9IE1hdGgucm91bmQobGVmdCAvIGNlbGxXaWR0aCk7XHJcbiAgICAgICAgICAgIHAueSA9IE1hdGgucm91bmQodG9wIC8gY2VsbEhlaWdodCk7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUvLyBpZiB3ZSdyZSBhdCB0aGUgYm90dG9tIGhpdHRpbmcgc29tZXRoaW5nIGVsc2UsIGdyb3cgdGhlIGdyaWQgc28gY3Vyc29yIGRvZXNuJ3QgbGVhdmUgd2hlbiB0cnlpbmcgdG8gcGxhY2UgYmVsb3cgb3RoZXJzXHJcbiAgICAgICAgICAgIGxldCBwcmV2ID0gdGhpcy5fZXh0cmFEcmFnUm93O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5lbmdpbmUuY29sbGlkZShub2RlLCBwKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ2V0Um93KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXh0cmEgPSBNYXRoLm1heCgwLCAocC55ICsgbm9kZS5oKSAtIHJvdyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLm1heFJvdyAmJiByb3cgKyBleHRyYSA+IHRoaXMub3B0cy5tYXhSb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICBleHRyYSA9IE1hdGgubWF4KDAsIHRoaXMub3B0cy5tYXhSb3cgLSByb3cpO1xyXG4gICAgICAgICAgICAgICAgfSAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9leHRyYURyYWdSb3cgPSBleHRyYTsgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX2V4dHJhRHJhZ1JvdyA9IDA7IC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2V4dHJhRHJhZ1JvdyAhPT0gcHJldilcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvbnRhaW5lckhlaWdodCgpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS54ID09PSBwLnggJiYgbm9kZS55ID09PSBwLnkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHNraXAgc2FtZVxyXG4gICAgICAgICAgICAvLyBET04nVCBza2lwIG9uZSB3ZSB0cmllZCBhcyB3ZSBtaWdodCBoYXZlIGZhaWxlZCBiZWNhdXNlIG9mIGNvdmVyYWdlIDw1MCUgYmVmb3JlXHJcbiAgICAgICAgICAgIC8vIGlmIChub2RlLl9sYXN0VHJpZWQgJiYgbm9kZS5fbGFzdFRyaWVkLnggPT09IHggJiYgbm9kZS5fbGFzdFRyaWVkLnkgPT09IHkpIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gJ3Jlc2l6ZScpIHtcclxuICAgICAgICAgICAgaWYgKHAueCA8IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIFNjcm9sbGluZyBwYWdlIGlmIG5lZWRlZFxyXG4gICAgICAgICAgICB1dGlsc18xLlV0aWxzLnVwZGF0ZVNjcm9sbFJlc2l6ZShldmVudCwgZWwsIGNlbGxIZWlnaHQpO1xyXG4gICAgICAgICAgICAvLyBnZXQgbmV3IHNpemVcclxuICAgICAgICAgICAgcC53ID0gTWF0aC5yb3VuZCgodWkuc2l6ZS53aWR0aCAtIG1MZWZ0KSAvIGNlbGxXaWR0aCk7XHJcbiAgICAgICAgICAgIHAuaCA9IE1hdGgucm91bmQoKHVpLnNpemUuaGVpZ2h0IC0gbVRvcCkgLyBjZWxsSGVpZ2h0KTtcclxuICAgICAgICAgICAgaWYgKG5vZGUudyA9PT0gcC53ICYmIG5vZGUuaCA9PT0gcC5oKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5fbGFzdFRyaWVkICYmIG5vZGUuX2xhc3RUcmllZC53ID09PSBwLncgJiYgbm9kZS5fbGFzdFRyaWVkLmggPT09IHAuaClcclxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gc2tpcCBvbmUgd2UgdHJpZWQgKGJ1dCBmYWlsZWQpXHJcbiAgICAgICAgICAgIC8vIGlmIHdlIHNpemUgb24gbGVmdC90b3Agc2lkZSB0aGlzIG1pZ2h0IG1vdmUgdXMsIHNvIGdldCBwb3NzaWJsZSBuZXcgcG9zaXRpb24gYXMgd2VsbFxyXG4gICAgICAgICAgICBsZXQgbGVmdCA9IHVpLnBvc2l0aW9uLmxlZnQgKyBtTGVmdDtcclxuICAgICAgICAgICAgbGV0IHRvcCA9IHVpLnBvc2l0aW9uLnRvcCArIG1Ub3A7XHJcbiAgICAgICAgICAgIHAueCA9IE1hdGgucm91bmQobGVmdCAvIGNlbGxXaWR0aCk7XHJcbiAgICAgICAgICAgIHAueSA9IE1hdGgucm91bmQodG9wIC8gY2VsbEhlaWdodCk7XHJcbiAgICAgICAgICAgIHJlc2l6aW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZS5fZXZlbnQgPSBldmVudDtcclxuICAgICAgICBub2RlLl9sYXN0VHJpZWQgPSBwOyAvLyBzZXQgYXMgbGFzdCB0cmllZCAod2lsbCBudWtlIGlmIHdlIGdvIHRoZXJlKVxyXG4gICAgICAgIGxldCByZWN0ID0ge1xyXG4gICAgICAgICAgICB4OiB1aS5wb3NpdGlvbi5sZWZ0ICsgbUxlZnQsXHJcbiAgICAgICAgICAgIHk6IHVpLnBvc2l0aW9uLnRvcCArIG1Ub3AsXHJcbiAgICAgICAgICAgIHc6ICh1aS5zaXplID8gdWkuc2l6ZS53aWR0aCA6IG5vZGUudyAqIGNlbGxXaWR0aCkgLSBtTGVmdCAtIG1SaWdodCxcclxuICAgICAgICAgICAgaDogKHVpLnNpemUgPyB1aS5zaXplLmhlaWdodCA6IG5vZGUuaCAqIGNlbGxIZWlnaHQpIC0gbVRvcCAtIG1Cb3R0b21cclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0aGlzLmVuZ2luZS5tb3ZlTm9kZUNoZWNrKG5vZGUsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcCksIHsgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCByZWN0LCByZXNpemluZyB9KSkpIHtcclxuICAgICAgICAgICAgbm9kZS5fbGFzdFVpUG9zaXRpb24gPSB1aS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5lbmdpbmUuY2FjaGVSZWN0cyhjZWxsV2lkdGgsIGNlbGxIZWlnaHQsIG1Ub3AsIG1SaWdodCwgbUJvdHRvbSwgbUxlZnQpO1xyXG4gICAgICAgICAgICBkZWxldGUgbm9kZS5fc2tpcERvd247XHJcbiAgICAgICAgICAgIGlmIChyZXNpemluZyAmJiBub2RlLnN1YkdyaWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuc3ViR3JpZC5vblBhcmVudFJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9IC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy5fZXh0cmFEcmFnUm93ID0gMDsgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDb250YWluZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDsgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0aGlzLl93cml0ZVBvc0F0dHIodGFyZ2V0LCBub2RlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2dzRXZlbnRIYW5kbGVyW2V2ZW50LnR5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nc0V2ZW50SGFuZGxlcltldmVudC50eXBlXShldmVudCwgdGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgY2FsbGVkIHdoZW4gaXRlbSBsZWF2aW5nIG91ciBhcmVhIGJ5IGVpdGhlciBjdXJzb3IgZHJvcG91dCBldmVudFxyXG4gICAgICogb3Igc2hhcGUgaXMgb3V0c2lkZSBvdXIgYm91bmRhcmllcy4gcmVtb3ZlIGl0IGZyb20gdXMsIGFuZCBtYXJrIHRlbXBvcmFyeSBpZiB0aGlzIHdhc1xyXG4gICAgICogb3VyIGl0ZW0gdG8gc3RhcnQgd2l0aCBlbHNlIHJlc3RvcmUgcHJldiBub2RlIHZhbHVlcyBmcm9tIHByZXYgZ3JpZCBpdCBjYW1lIGZyb20uXHJcbiAgICAgKiovXHJcbiAgICBfbGVhdmUoZWwsIGhlbHBlcikge1xyXG4gICAgICAgIGxldCBub2RlID0gZWwuZ3JpZHN0YWNrTm9kZTtcclxuICAgICAgICBpZiAoIW5vZGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBkZC5vZmYoZWwsICdkcmFnJyk7IC8vIG5vIG5lZWQgdG8gdHJhY2sgd2hpbGUgYmVpbmcgb3V0c2lkZVxyXG4gICAgICAgIC8vIHRoaXMgZ2V0cyBjYWxsZWQgd2hlbiBjdXJzb3IgbGVhdmVzIGFuZCBzaGFwZSBpcyBvdXRzaWRlLCBzbyBvbmx5IGRvIHRoaXMgb25jZVxyXG4gICAgICAgIGlmIChub2RlLl90ZW1wb3JhcnlSZW1vdmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbm9kZS5fdGVtcG9yYXJ5UmVtb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbmdpbmUucmVtb3ZlTm9kZShub2RlKTsgLy8gcmVtb3ZlIHBsYWNlaG9sZGVyIGFzIHdlbGwsIG90aGVyd2lzZSBpdCdzIGEgc2lnbiBub2RlIGlzIG5vdCBpbiBvdXIgbGlzdCwgd2hpY2ggaXMgYSBiaWdnZXIgaXNzdWVcclxuICAgICAgICBub2RlLmVsID0gbm9kZS5faXNFeHRlcm5hbCAmJiBoZWxwZXIgPyBoZWxwZXIgOiBlbDsgLy8gcG9pbnQgYmFjayB0byByZWFsIGl0ZW0gYmVpbmcgZHJhZ2dlZFxyXG4gICAgICAgIGlmICh0aGlzLm9wdHMucmVtb3ZhYmxlID09PSB0cnVlKSB7IC8vIGJvb2xlYW4gdnMgYSBjbGFzcyBzdHJpbmdcclxuICAgICAgICAgICAgLy8gaXRlbSBsZWF2aW5nIHVzIGFuZCB3ZSBhcmUgc3VwcG9zZWQgdG8gcmVtb3ZlIG9uIGxlYXZlIChubyBuZWVkIHRvIGRyYWcgb250byB0cmFzaCkgbWFyayBpdCBzb1xyXG4gICAgICAgICAgICB0aGlzLl9pdGVtUmVtb3ZpbmcoZWwsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmaW5hbGx5IGlmIGl0ZW0gb3JpZ2luYWxseSBjYW1lIGZyb20gYW5vdGhlciBncmlkLCBidXQgbGVmdCB1cywgcmVzdG9yZSB0aGluZ3MgYmFjayB0byBwcmV2IGluZm9cclxuICAgICAgICBpZiAoZWwuX2dyaWRzdGFja05vZGVPcmlnKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdsZWF2ZSBkZWxldGUgX2dyaWRzdGFja05vZGVPcmlnJykgLy8gVEVTVFxyXG4gICAgICAgICAgICBlbC5ncmlkc3RhY2tOb2RlID0gZWwuX2dyaWRzdGFja05vZGVPcmlnO1xyXG4gICAgICAgICAgICBkZWxldGUgZWwuX2dyaWRzdGFja05vZGVPcmlnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChub2RlLl9pc0V4dGVybmFsKSB7XHJcbiAgICAgICAgICAgIC8vIGl0ZW0gY2FtZSBmcm9tIG91dHNpZGUgKGxpa2UgYSB0b29sYmFyKSBzbyBudWtlIGFueSBub2RlIGluZm9cclxuICAgICAgICAgICAgZGVsZXRlIG5vZGUuZWw7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBlbC5ncmlkc3RhY2tOb2RlO1xyXG4gICAgICAgICAgICAvLyBhbmQgcmVzdG9yZSBhbGwgbm9kZXMgYmFjayB0byBvcmlnaW5hbFxyXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5yZXN0b3JlSW5pdGlhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGxlZ2FjeSBtZXRob2QgcmVtb3ZlZFxyXG4gICAgY29tbWl0KCkgeyB1dGlsc18xLm9ic29sZXRlKHRoaXMsIHRoaXMuYmF0Y2hVcGRhdGUoZmFsc2UpLCAnY29tbWl0JywgJ2JhdGNoVXBkYXRlJywgJzUuMicpOyByZXR1cm4gdGhpczsgfVxyXG59XHJcbmV4cG9ydHMuR3JpZFN0YWNrID0gR3JpZFN0YWNrO1xyXG4vKiogc2NvcGluZyBzbyB1c2VycyBjYW4gY2FsbCBHcmlkU3RhY2suVXRpbHMuc29ydCgpIGZvciBleGFtcGxlICovXHJcbkdyaWRTdGFjay5VdGlscyA9IHV0aWxzXzEuVXRpbHM7XHJcbi8qKiBzY29waW5nIHNvIHVzZXJzIGNhbiBjYWxsIG5ldyBHcmlkU3RhY2suRW5naW5lKDEyKSBmb3IgZXhhbXBsZSAqL1xyXG5HcmlkU3RhY2suRW5naW5lID0gZ3JpZHN0YWNrX2VuZ2luZV8xLkdyaWRTdGFja0VuZ2luZTtcclxuR3JpZFN0YWNrLkdEUmV2ID0gJzcuMy4wJztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z3JpZHN0YWNrLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG4vKipcclxuICogdHlwZXMudHMgNy4zLjBcclxuICogQ29weXJpZ2h0IChjKSAyMDIxIEFsYWluIER1bWVzbnkgLSBzZWUgR3JpZFN0YWNrIHJvb3QgbGljZW5zZVxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRyYWdJbkRlZmF1bHRPcHRpb25zID0gZXhwb3J0cy5ncmlkRGVmYXVsdHMgPSB2b2lkIDA7XHJcbi8vIGRlZmF1bHQgdmFsdWVzIGZvciBncmlkIG9wdGlvbnMgLSB1c2VkIGR1cmluZyBpbml0IGFuZCB3aGVuIHNhdmluZyBvdXRcclxuZXhwb3J0cy5ncmlkRGVmYXVsdHMgPSB7XHJcbiAgICBhbHdheXNTaG93UmVzaXplSGFuZGxlOiAnbW9iaWxlJyxcclxuICAgIGFuaW1hdGU6IHRydWUsXHJcbiAgICBhdXRvOiB0cnVlLFxyXG4gICAgY2VsbEhlaWdodDogJ2F1dG8nLFxyXG4gICAgY2VsbEhlaWdodFRocm90dGxlOiAxMDAsXHJcbiAgICBjZWxsSGVpZ2h0VW5pdDogJ3B4JyxcclxuICAgIGNvbHVtbjogMTIsXHJcbiAgICBkcmFnZ2FibGU6IHsgaGFuZGxlOiAnLmdyaWQtc3RhY2staXRlbS1jb250ZW50JywgYXBwZW5kVG86ICdib2R5Jywgc2Nyb2xsOiB0cnVlIH0sXHJcbiAgICBoYW5kbGU6ICcuZ3JpZC1zdGFjay1pdGVtLWNvbnRlbnQnLFxyXG4gICAgaXRlbUNsYXNzOiAnZ3JpZC1zdGFjay1pdGVtJyxcclxuICAgIG1hcmdpbjogMTAsXHJcbiAgICBtYXJnaW5Vbml0OiAncHgnLFxyXG4gICAgbWF4Um93OiAwLFxyXG4gICAgbWluUm93OiAwLFxyXG4gICAgb25lQ29sdW1uU2l6ZTogNzY4LFxyXG4gICAgcGxhY2Vob2xkZXJDbGFzczogJ2dyaWQtc3RhY2stcGxhY2Vob2xkZXInLFxyXG4gICAgcGxhY2Vob2xkZXJUZXh0OiAnJyxcclxuICAgIHJlbW92YWJsZU9wdGlvbnM6IHsgYWNjZXB0OiAnLmdyaWQtc3RhY2staXRlbScgfSxcclxuICAgIHJlc2l6YWJsZTogeyBoYW5kbGVzOiAnc2UnIH0sXHJcbiAgICBydGw6ICdhdXRvJyxcclxufTtcclxuLyoqIGRlZmF1bHQgZHJhZ0luIG9wdGlvbnMgKi9cclxuZXhwb3J0cy5kcmFnSW5EZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgIGhhbmRsZTogJy5ncmlkLXN0YWNrLWl0ZW0tY29udGVudCcsXHJcbiAgICBhcHBlbmRUbzogJ2JvZHknLFxyXG59O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuLyoqXHJcbiAqIHV0aWxzLnRzIDcuMy4wXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMSBBbGFpbiBEdW1lc255IC0gc2VlIEdyaWRTdGFjayByb290IGxpY2Vuc2VcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5VdGlscyA9IGV4cG9ydHMub2Jzb2xldGVBdHRyID0gZXhwb3J0cy5vYnNvbGV0ZU9wdHNEZWwgPSBleHBvcnRzLm9ic29sZXRlT3B0cyA9IGV4cG9ydHMub2Jzb2xldGUgPSB2b2lkIDA7XHJcbi8qKiBjaGVja3MgZm9yIG9ic29sZXRlIG1ldGhvZCBuYW1lcyAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuZnVuY3Rpb24gb2Jzb2xldGUoc2VsZiwgZiwgb2xkTmFtZSwgbmV3TmFtZSwgcmV2KSB7XHJcbiAgICBsZXQgd3JhcHBlciA9ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdncmlkc3RhY2suanM6IEZ1bmN0aW9uIGAnICsgb2xkTmFtZSArICdgIGlzIGRlcHJlY2F0ZWQgaW4gJyArIHJldiArICcgYW5kIGhhcyBiZWVuIHJlcGxhY2VkICcgK1xyXG4gICAgICAgICAgICAnd2l0aCBgJyArIG5ld05hbWUgKyAnYC4gSXQgd2lsbCBiZSAqKnJlbW92ZWQqKiBpbiBhIGZ1dHVyZSByZWxlYXNlJyk7XHJcbiAgICAgICAgcmV0dXJuIGYuYXBwbHkoc2VsZiwgYXJncyk7XHJcbiAgICB9O1xyXG4gICAgd3JhcHBlci5wcm90b3R5cGUgPSBmLnByb3RvdHlwZTtcclxuICAgIHJldHVybiB3cmFwcGVyO1xyXG59XHJcbmV4cG9ydHMub2Jzb2xldGUgPSBvYnNvbGV0ZTtcclxuLyoqIGNoZWNrcyBmb3Igb2Jzb2xldGUgZ3JpZCBvcHRpb25zIChjYW4gYmUgdXNlZCBmb3IgYW55IGZpZWxkcywgYnV0IG1zZyBpcyBhYm91dCBvcHRpb25zKSAqL1xyXG5mdW5jdGlvbiBvYnNvbGV0ZU9wdHMob3B0cywgb2xkTmFtZSwgbmV3TmFtZSwgcmV2KSB7XHJcbiAgICBpZiAob3B0c1tvbGROYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgb3B0c1tuZXdOYW1lXSA9IG9wdHNbb2xkTmFtZV07XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdncmlkc3RhY2suanM6IE9wdGlvbiBgJyArIG9sZE5hbWUgKyAnYCBpcyBkZXByZWNhdGVkIGluICcgKyByZXYgKyAnIGFuZCBoYXMgYmVlbiByZXBsYWNlZCB3aXRoIGAnICtcclxuICAgICAgICAgICAgbmV3TmFtZSArICdgLiBJdCB3aWxsIGJlICoqcmVtb3ZlZCoqIGluIGEgZnV0dXJlIHJlbGVhc2UnKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLm9ic29sZXRlT3B0cyA9IG9ic29sZXRlT3B0cztcclxuLyoqIGNoZWNrcyBmb3Igb2Jzb2xldGUgZ3JpZCBvcHRpb25zIHdoaWNoIGFyZSBnb25lICovXHJcbmZ1bmN0aW9uIG9ic29sZXRlT3B0c0RlbChvcHRzLCBvbGROYW1lLCByZXYsIGluZm8pIHtcclxuICAgIGlmIChvcHRzW29sZE5hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ2dyaWRzdGFjay5qczogT3B0aW9uIGAnICsgb2xkTmFtZSArICdgIGlzIGRlcHJlY2F0ZWQgaW4gJyArIHJldiArIGluZm8pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMub2Jzb2xldGVPcHRzRGVsID0gb2Jzb2xldGVPcHRzRGVsO1xyXG4vKiogY2hlY2tzIGZvciBvYnNvbGV0ZSBKcXVlcnkgZWxlbWVudCBhdHRyaWJ1dGVzICovXHJcbmZ1bmN0aW9uIG9ic29sZXRlQXR0cihlbCwgb2xkTmFtZSwgbmV3TmFtZSwgcmV2KSB7XHJcbiAgICBsZXQgb2xkQXR0ciA9IGVsLmdldEF0dHJpYnV0ZShvbGROYW1lKTtcclxuICAgIGlmIChvbGRBdHRyICE9PSBudWxsKSB7XHJcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKG5ld05hbWUsIG9sZEF0dHIpO1xyXG4gICAgICAgIGNvbnNvbGUud2FybignZ3JpZHN0YWNrLmpzOiBhdHRyaWJ1dGUgYCcgKyBvbGROYW1lICsgJ2A9JyArIG9sZEF0dHIgKyAnIGlzIGRlcHJlY2F0ZWQgb24gdGhpcyBvYmplY3QgaW4gJyArIHJldiArICcgYW5kIGhhcyBiZWVuIHJlcGxhY2VkIHdpdGggYCcgK1xyXG4gICAgICAgICAgICBuZXdOYW1lICsgJ2AuIEl0IHdpbGwgYmUgKipyZW1vdmVkKiogaW4gYSBmdXR1cmUgcmVsZWFzZScpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMub2Jzb2xldGVBdHRyID0gb2Jzb2xldGVBdHRyO1xyXG4vKipcclxuICogVXRpbGl0eSBtZXRob2RzXHJcbiAqL1xyXG5jbGFzcyBVdGlscyB7XHJcbiAgICAvKiogY29udmVydCBhIHBvdGVudGlhbCBzZWxlY3RvciBpbnRvIGFjdHVhbCBsaXN0IG9mIGh0bWwgZWxlbWVudHMgKi9cclxuICAgIHN0YXRpYyBnZXRFbGVtZW50cyhlbHMpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGVscyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVscyk7XHJcbiAgICAgICAgICAgIGlmICghbGlzdC5sZW5ndGggJiYgZWxzWzBdICE9PSAnLicgJiYgZWxzWzBdICE9PSAnIycpIHtcclxuICAgICAgICAgICAgICAgIGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIGVscyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyMnICsgZWxzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtlbHNdO1xyXG4gICAgfVxyXG4gICAgLyoqIGNvbnZlcnQgYSBwb3RlbnRpYWwgc2VsZWN0b3IgaW50byBhY3R1YWwgc2luZ2xlIGVsZW1lbnQgKi9cclxuICAgIHN0YXRpYyBnZXRFbGVtZW50KGVscykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZWxzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBpZiAoIWVscy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgaWYgKGVsc1swXSA9PT0gJyMnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxzLnN1YnN0cmluZygxKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsc1swXSA9PT0gJy4nIHx8IGVsc1swXSA9PT0gJ1snKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlmIHdlIHN0YXJ0IHdpdGggYSBkaWdpdCwgYXNzdW1lIGl0J3MgYW4gaWQgKGVycm9yIGNhbGxpbmcgcXVlcnlTZWxlY3RvcignIzEnKSkgYXMgY2xhc3MgYXJlIG5vdCB2YWxpZCBDU1NcclxuICAgICAgICAgICAgaWYgKCFpc05hTigrZWxzWzBdKSkgeyAvLyBzdGFydCB3aXRoIGRpZ2l0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBmaW5hbGx5IHRyeSBzdHJpbmcsIHRoZW4gaWQgdGhlbiBjbGFzc1xyXG4gICAgICAgICAgICBsZXQgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVscyk7XHJcbiAgICAgICAgICAgIGlmICghZWwpIHtcclxuICAgICAgICAgICAgICAgIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWVsKSB7XHJcbiAgICAgICAgICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgZWxzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbHM7XHJcbiAgICB9XHJcbiAgICAvKiogcmV0dXJucyB0cnVlIGlmIGEgYW5kIGIgb3ZlcmxhcCAqL1xyXG4gICAgc3RhdGljIGlzSW50ZXJjZXB0ZWQoYSwgYikge1xyXG4gICAgICAgIHJldHVybiAhKGEueSA+PSBiLnkgKyBiLmggfHwgYS55ICsgYS5oIDw9IGIueSB8fCBhLnggKyBhLncgPD0gYi54IHx8IGEueCA+PSBiLnggKyBiLncpO1xyXG4gICAgfVxyXG4gICAgLyoqIHJldHVybnMgdHJ1ZSBpZiBhIGFuZCBiIHRvdWNoIGVkZ2VzIG9yIGNvcm5lcnMgKi9cclxuICAgIHN0YXRpYyBpc1RvdWNoaW5nKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gVXRpbHMuaXNJbnRlcmNlcHRlZChhLCB7IHg6IGIueCAtIDAuNSwgeTogYi55IC0gMC41LCB3OiBiLncgKyAxLCBoOiBiLmggKyAxIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqIHJldHVybnMgdGhlIGFyZWEgYSBhbmQgYiBvdmVybGFwICovXHJcbiAgICBzdGF0aWMgYXJlYUludGVyY2VwdChhLCBiKSB7XHJcbiAgICAgICAgbGV0IHgwID0gKGEueCA+IGIueCkgPyBhLnggOiBiLng7XHJcbiAgICAgICAgbGV0IHgxID0gKGEueCArIGEudyA8IGIueCArIGIudykgPyBhLnggKyBhLncgOiBiLnggKyBiLnc7XHJcbiAgICAgICAgaWYgKHgxIDw9IHgwKVxyXG4gICAgICAgICAgICByZXR1cm4gMDsgLy8gbm8gb3ZlcmxhcFxyXG4gICAgICAgIGxldCB5MCA9IChhLnkgPiBiLnkpID8gYS55IDogYi55O1xyXG4gICAgICAgIGxldCB5MSA9IChhLnkgKyBhLmggPCBiLnkgKyBiLmgpID8gYS55ICsgYS5oIDogYi55ICsgYi5oO1xyXG4gICAgICAgIGlmICh5MSA8PSB5MClcclxuICAgICAgICAgICAgcmV0dXJuIDA7IC8vIG5vIG92ZXJsYXBcclxuICAgICAgICByZXR1cm4gKHgxIC0geDApICogKHkxIC0geTApO1xyXG4gICAgfVxyXG4gICAgLyoqIHJldHVybnMgdGhlIGFyZWEgKi9cclxuICAgIHN0YXRpYyBhcmVhKGEpIHtcclxuICAgICAgICByZXR1cm4gYS53ICogYS5oO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTb3J0cyBhcnJheSBvZiBub2Rlc1xyXG4gICAgICogQHBhcmFtIG5vZGVzIGFycmF5IHRvIHNvcnRcclxuICAgICAqIEBwYXJhbSBkaXIgMSBmb3IgYXNjLCAtMSBmb3IgZGVzYyAob3B0aW9uYWwpXHJcbiAgICAgKiBAcGFyYW0gd2lkdGggd2lkdGggb2YgdGhlIGdyaWQuIElmIHVuZGVmaW5lZCB0aGUgd2lkdGggd2lsbCBiZSBjYWxjdWxhdGVkIGF1dG9tYXRpY2FsbHkgKG9wdGlvbmFsKS5cclxuICAgICAqKi9cclxuICAgIHN0YXRpYyBzb3J0KG5vZGVzLCBkaXIsIGNvbHVtbikge1xyXG4gICAgICAgIGNvbHVtbiA9IGNvbHVtbiB8fCBub2Rlcy5yZWR1Y2UoKGNvbCwgbikgPT4gTWF0aC5tYXgobi54ICsgbi53LCBjb2wpLCAwKSB8fCAxMjtcclxuICAgICAgICBpZiAoZGlyID09PSAtMSlcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVzLnNvcnQoKGEsIGIpID0+IChiLnggKyBiLnkgKiBjb2x1bW4pIC0gKGEueCArIGEueSAqIGNvbHVtbikpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVzLnNvcnQoKGIsIGEpID0+IChiLnggKyBiLnkgKiBjb2x1bW4pIC0gKGEueCArIGEueSAqIGNvbHVtbikpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGEgc3R5bGUgc2hlZXQgd2l0aCBzdHlsZSBpZCB1bmRlciBnaXZlbiBwYXJlbnRcclxuICAgICAqIEBwYXJhbSBpZCB3aWxsIHNldCB0aGUgJ2dzLXN0eWxlLWlkJyBhdHRyaWJ1dGUgdG8gdGhhdCBpZFxyXG4gICAgICogQHBhcmFtIHBhcmVudCB0byBpbnNlcnQgdGhlIHN0eWxlc2hlZXQgYXMgZmlyc3QgY2hpbGQsXHJcbiAgICAgKiBpZiBub25lIHN1cHBsaWVkIGl0IHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGRvY3VtZW50IGhlYWQgaW5zdGVhZC5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZVN0eWxlc2hlZXQoaWQsIHBhcmVudCwgb3B0aW9ucykge1xyXG4gICAgICAgIGxldCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICAgICAgY29uc3Qgbm9uY2UgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubm9uY2U7XHJcbiAgICAgICAgaWYgKG5vbmNlKVxyXG4gICAgICAgICAgICBzdHlsZS5ub25jZSA9IG5vbmNlO1xyXG4gICAgICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xyXG4gICAgICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnZ3Mtc3R5bGUtaWQnLCBpZCk7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkgeyAvLyBUT0RPOiBvbmx5IENTU0ltcG9ydFJ1bGUgaGF2ZSB0aGF0IGFuZCBkaWZmZXJlbnQgYmVhc3QgPz9cclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpOyAvLyBXZWJLaXQgaGFja1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXBhcmVudCkge1xyXG4gICAgICAgICAgICAvLyBkZWZhdWx0IHRvIGhlYWRcclxuICAgICAgICAgICAgcGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHN0eWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoc3R5bGUsIHBhcmVudC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlLnNoZWV0O1xyXG4gICAgfVxyXG4gICAgLyoqIHJlbW92ZWQgdGhlIGdpdmVuIHN0eWxlc2hlZXQgaWQgKi9cclxuICAgIHN0YXRpYyByZW1vdmVTdHlsZXNoZWV0KGlkKSB7XHJcbiAgICAgICAgbGV0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignU1RZTEVbZ3Mtc3R5bGUtaWQ9JyArIGlkICsgJ10nKTtcclxuICAgICAgICBpZiAoZWwgJiYgZWwucGFyZW50Tm9kZSlcclxuICAgICAgICAgICAgZWwucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgICAvKiogaW5zZXJ0cyBhIENTUyBydWxlICovXHJcbiAgICBzdGF0aWMgYWRkQ1NTUnVsZShzaGVldCwgc2VsZWN0b3IsIHJ1bGVzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzaGVldC5hZGRSdWxlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHNoZWV0LmFkZFJ1bGUoc2VsZWN0b3IsIHJ1bGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHNoZWV0Lmluc2VydFJ1bGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgc2hlZXQuaW5zZXJ0UnVsZShgJHtzZWxlY3Rvcn17JHtydWxlc319YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIHN0YXRpYyB0b0Jvb2wodikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHYgPSB2LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiAhKHYgPT09ICcnIHx8IHYgPT09ICdubycgfHwgdiA9PT0gJ2ZhbHNlJyB8fCB2ID09PSAnMCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQm9vbGVhbih2KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyB0b051bWJlcih2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUubGVuZ3RoID09PSAwKSA/IHVuZGVmaW5lZCA6IE51bWJlcih2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgcGFyc2VIZWlnaHQodmFsKSB7XHJcbiAgICAgICAgbGV0IGg7XHJcbiAgICAgICAgbGV0IHVuaXQgPSAncHgnO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSB2YWwubWF0Y2goL14oLVswLTldK1xcLlswLTldK3xbMC05XSpcXC5bMC05XSt8LVswLTldK3xbMC05XSspKHB4fGVtfHJlbXx2aHx2d3wlKT8kLyk7XHJcbiAgICAgICAgICAgIGlmICghbWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBoZWlnaHQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1bml0ID0gbWF0Y2hbMl0gfHwgJ3B4JztcclxuICAgICAgICAgICAgaCA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaCA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgaCwgdW5pdCB9O1xyXG4gICAgfVxyXG4gICAgLyoqIGNvcGllcyB1bnNldCBmaWVsZHMgaW4gdGFyZ2V0IHRvIHVzZSB0aGUgZ2l2ZW4gZGVmYXVsdCBzb3VyY2VzIHZhbHVlcyAqL1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICBzdGF0aWMgZGVmYXVsdHModGFyZ2V0LCAuLi5zb3VyY2VzKSB7XHJcbiAgICAgICAgc291cmNlcy5mb3JFYWNoKHNvdXJjZSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0W2tleV0gPT09IG51bGwgfHwgdGFyZ2V0W2tleV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc291cmNlW2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB0YXJnZXRba2V5XSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwcm9wZXJ0eSBpcyBhbiBvYmplY3QsIHJlY3Vyc2l2ZWx5IGFkZCBpdCdzIGZpZWxkIG92ZXIuLi4gIzEzNzNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRzKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfVxyXG4gICAgLyoqIGdpdmVuIDIgb2JqZWN0cyByZXR1cm4gdHJ1ZSBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgdmFsdWVzLiBDaGVja3MgZm9yIE9iamVjdCB7fSBoYXZpbmcgc2FtZSBmaWVsZHMgYW5kIHZhbHVlcyAoanVzdCAxIGxldmVsIGRvd24pICovXHJcbiAgICBzdGF0aWMgc2FtZShhLCBiKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhICE9PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgcmV0dXJuIGEgPT0gYjtcclxuICAgICAgICBpZiAodHlwZW9mIGEgIT09IHR5cGVvZiBiKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gZWxzZSB3ZSBoYXZlIG9iamVjdCwgY2hlY2sganVzdCAxIGxldmVsIGRlZXAgZm9yIGJlaW5nIHNhbWUgdGhpbmdzLi4uXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGEpLmxlbmd0aCAhPT0gT2JqZWN0LmtleXMoYikubGVuZ3RoKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gYSkge1xyXG4gICAgICAgICAgICBpZiAoYVtrZXldICE9PSBiW2tleV0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqIGNvcGllcyBvdmVyIGIgc2l6ZSAmIHBvc2l0aW9uIChHcmlkU3RhY2tQb3NpdGlvbiksIGFuZCBvcHRpb25hbGx5IG1pbi9tYXggYXMgd2VsbCAqL1xyXG4gICAgc3RhdGljIGNvcHlQb3MoYSwgYiwgZG9NaW5NYXggPSBmYWxzZSkge1xyXG4gICAgICAgIGEueCA9IGIueDtcclxuICAgICAgICBhLnkgPSBiLnk7XHJcbiAgICAgICAgYS53ID0gYi53O1xyXG4gICAgICAgIGEuaCA9IGIuaDtcclxuICAgICAgICBpZiAoZG9NaW5NYXgpIHtcclxuICAgICAgICAgICAgaWYgKGIubWluVylcclxuICAgICAgICAgICAgICAgIGEubWluVyA9IGIubWluVztcclxuICAgICAgICAgICAgaWYgKGIubWluSClcclxuICAgICAgICAgICAgICAgIGEubWluSCA9IGIubWluSDtcclxuICAgICAgICAgICAgaWYgKGIubWF4VylcclxuICAgICAgICAgICAgICAgIGEubWF4VyA9IGIubWF4VztcclxuICAgICAgICAgICAgaWYgKGIubWF4SClcclxuICAgICAgICAgICAgICAgIGEubWF4SCA9IGIubWF4SDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcbiAgICAvKiogdHJ1ZSBpZiBhIGFuZCBiIGhhcyBzYW1lIHNpemUgJiBwb3NpdGlvbiAqL1xyXG4gICAgc3RhdGljIHNhbWVQb3MoYSwgYikge1xyXG4gICAgICAgIHJldHVybiBhICYmIGIgJiYgYS54ID09PSBiLnggJiYgYS55ID09PSBiLnkgJiYgYS53ID09PSBiLncgJiYgYS5oID09PSBiLmg7XHJcbiAgICB9XHJcbiAgICAvKiogcmVtb3ZlcyBmaWVsZCBmcm9tIHRoZSBmaXJzdCBvYmplY3QgaWYgc2FtZSBhcyB0aGUgc2Vjb25kIG9iamVjdHMgKGxpa2UgZGlmZmluZykgYW5kIGludGVybmFsICdfJyBmb3Igc2F2aW5nICovXHJcbiAgICBzdGF0aWMgcmVtb3ZlSW50ZXJuYWxBbmRTYW1lKGEsIGIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGEgIT09ICdvYmplY3QnIHx8IHR5cGVvZiBiICE9PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWwgPSBhW2tleV07XHJcbiAgICAgICAgICAgIGlmIChrZXlbMF0gPT09ICdfJyB8fCB2YWwgPT09IGJba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGFba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgYltrZXldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbFtpXSA9PT0gYltrZXldW2ldIHx8IGlbMF0gPT09ICdfJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdmFsW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghT2JqZWN0LmtleXModmFsKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYVtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqIHJlbW92ZXMgaW50ZXJuYWwgZmllbGRzICdfJyBhbmQgZGVmYXVsdCB2YWx1ZXMgZm9yIHNhdmluZyAqL1xyXG4gICAgc3RhdGljIHJlbW92ZUludGVybmFsRm9yU2F2ZShuLCByZW1vdmVFbCA9IHRydWUpIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbikge1xyXG4gICAgICAgICAgICBpZiAoa2V5WzBdID09PSAnXycgfHwgbltrZXldID09PSBudWxsIHx8IG5ba2V5XSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG5ba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsZXRlIG4uZ3JpZDtcclxuICAgICAgICBpZiAocmVtb3ZlRWwpXHJcbiAgICAgICAgICAgIGRlbGV0ZSBuLmVsO1xyXG4gICAgICAgIC8vIGRlbGV0ZSBkZWZhdWx0IHZhbHVlcyAod2lsbCBiZSByZS1jcmVhdGVkIG9uIHJlYWQpXHJcbiAgICAgICAgaWYgKCFuLmF1dG9Qb3NpdGlvbilcclxuICAgICAgICAgICAgZGVsZXRlIG4uYXV0b1Bvc2l0aW9uO1xyXG4gICAgICAgIGlmICghbi5ub1Jlc2l6ZSlcclxuICAgICAgICAgICAgZGVsZXRlIG4ubm9SZXNpemU7XHJcbiAgICAgICAgaWYgKCFuLm5vTW92ZSlcclxuICAgICAgICAgICAgZGVsZXRlIG4ubm9Nb3ZlO1xyXG4gICAgICAgIGlmICghbi5sb2NrZWQpXHJcbiAgICAgICAgICAgIGRlbGV0ZSBuLmxvY2tlZDtcclxuICAgICAgICBpZiAobi53ID09PSAxIHx8IG4udyA9PT0gbi5taW5XKVxyXG4gICAgICAgICAgICBkZWxldGUgbi53O1xyXG4gICAgICAgIGlmIChuLmggPT09IDEgfHwgbi5oID09PSBuLm1pbkgpXHJcbiAgICAgICAgICAgIGRlbGV0ZSBuLmg7XHJcbiAgICB9XHJcbiAgICAvKiogcmV0dXJuIHRoZSBjbG9zZXN0IHBhcmVudCAob3IgaXRzZWxmKSBtYXRjaGluZyB0aGUgZ2l2ZW4gY2xhc3MgKi9cclxuICAgIHN0YXRpYyBjbG9zZXN0VXBCeUNsYXNzKGVsLCBuYW1lKSB7XHJcbiAgICAgICAgd2hpbGUgKGVsKSB7XHJcbiAgICAgICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XHJcbiAgICAgICAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICAvKiogZGVsYXkgY2FsbGluZyB0aGUgZ2l2ZW4gZnVuY3Rpb24gZm9yIGdpdmVuIGRlbGF5LCBwcmV2ZW50aW5nIG5ldyBjYWxscyBmcm9tIGhhcHBlbmluZyB3aGlsZSB3YWl0aW5nICovXHJcbiAgICBzdGF0aWMgdGhyb3R0bGUoZnVuYywgZGVsYXkpIHtcclxuICAgICAgICBsZXQgaXNXYWl0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaXNXYWl0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpc1dhaXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IGZ1bmMoLi4uYXJncyk7IGlzV2FpdGluZyA9IGZhbHNlOyB9LCBkZWxheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHJlbW92ZVBvc2l0aW9uaW5nU3R5bGVzKGVsKSB7XHJcbiAgICAgICAgbGV0IHN0eWxlID0gZWwuc3R5bGU7XHJcbiAgICAgICAgaWYgKHN0eWxlLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHN0eWxlLnJlbW92ZVByb3BlcnR5KCdwb3NpdGlvbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3R5bGUubGVmdCkge1xyXG4gICAgICAgICAgICBzdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbGVmdCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3R5bGUudG9wKSB7XHJcbiAgICAgICAgICAgIHN0eWxlLnJlbW92ZVByb3BlcnR5KCd0b3AnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0eWxlLndpZHRoKSB7XHJcbiAgICAgICAgICAgIHN0eWxlLnJlbW92ZVByb3BlcnR5KCd3aWR0aCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3R5bGUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHN0eWxlLnJlbW92ZVByb3BlcnR5KCdoZWlnaHQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsIHJldHVybnMgdGhlIHBhc3NlZCBlbGVtZW50IGlmIHNjcm9sbGFibGUsIGVsc2UgdGhlIGNsb3Nlc3QgcGFyZW50IHRoYXQgd2lsbCwgdXAgdG8gdGhlIGVudGlyZSBkb2N1bWVudCBzY3JvbGxpbmcgZWxlbWVudCAqL1xyXG4gICAgc3RhdGljIGdldFNjcm9sbEVsZW1lbnQoZWwpIHtcclxuICAgICAgICBpZiAoIWVsKVxyXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IC8vIElFIHN1cHBvcnRcclxuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xyXG4gICAgICAgIGNvbnN0IG92ZXJmbG93UmVnZXggPSAvKGF1dG98c2Nyb2xsKS87XHJcbiAgICAgICAgaWYgKG92ZXJmbG93UmVnZXgudGVzdChzdHlsZS5vdmVyZmxvdyArIHN0eWxlLm92ZXJmbG93WSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2Nyb2xsRWxlbWVudChlbC5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBzdGF0aWMgdXBkYXRlU2Nyb2xsUG9zaXRpb24oZWwsIHBvc2l0aW9uLCBkaXN0YW5jZSkge1xyXG4gICAgICAgIC8vIGlzIHdpZGdldCBpbiB2aWV3P1xyXG4gICAgICAgIGxldCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgbGV0IGlubmVySGVpZ2h0T3JDbGllbnRIZWlnaHQgPSAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpO1xyXG4gICAgICAgIGlmIChyZWN0LnRvcCA8IDAgfHxcclxuICAgICAgICAgICAgcmVjdC5ib3R0b20gPiBpbm5lckhlaWdodE9yQ2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIC8vIHNldCBzY3JvbGxUb3Agb2YgZmlyc3QgcGFyZW50IHRoYXQgc2Nyb2xsc1xyXG4gICAgICAgICAgICAvLyBpZiBwYXJlbnQgaXMgbGFyZ2VyIHRoYW4gZWwsIHNldCBhcyBsb3cgYXMgcG9zc2libGVcclxuICAgICAgICAgICAgLy8gdG8gZ2V0IGVudGlyZSB3aWRnZXQgb24gc2NyZWVuXHJcbiAgICAgICAgICAgIGxldCBvZmZzZXREaWZmRG93biA9IHJlY3QuYm90dG9tIC0gaW5uZXJIZWlnaHRPckNsaWVudEhlaWdodDtcclxuICAgICAgICAgICAgbGV0IG9mZnNldERpZmZVcCA9IHJlY3QudG9wO1xyXG4gICAgICAgICAgICBsZXQgc2Nyb2xsRWwgPSB0aGlzLmdldFNjcm9sbEVsZW1lbnQoZWwpO1xyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsRWwgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwcmV2U2Nyb2xsID0gc2Nyb2xsRWwuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlY3QudG9wIDwgMCAmJiBkaXN0YW5jZSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBtb3ZpbmcgdXBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwub2Zmc2V0SGVpZ2h0ID4gaW5uZXJIZWlnaHRPckNsaWVudEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxFbC5zY3JvbGxUb3AgKz0gZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxFbC5zY3JvbGxUb3AgKz0gTWF0aC5hYnMob2Zmc2V0RGlmZlVwKSA+IE1hdGguYWJzKGRpc3RhbmNlKSA/IGRpc3RhbmNlIDogb2Zmc2V0RGlmZlVwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRpc3RhbmNlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmluZyBkb3duXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsLm9mZnNldEhlaWdodCA+IGlubmVySGVpZ2h0T3JDbGllbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsRWwuc2Nyb2xsVG9wICs9IGRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsRWwuc2Nyb2xsVG9wICs9IG9mZnNldERpZmZEb3duID4gZGlzdGFuY2UgPyBkaXN0YW5jZSA6IG9mZnNldERpZmZEb3duO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIG1vdmUgd2lkZ2V0IHkgYnkgYW1vdW50IHNjcm9sbGVkXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi50b3AgKz0gc2Nyb2xsRWwuc2Nyb2xsVG9wIC0gcHJldlNjcm9sbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsIEZ1bmN0aW9uIHVzZWQgdG8gc2Nyb2xsIHRoZSBwYWdlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudCBgTW91c2VFdmVudGAgdGhhdCB0cmlnZ2VycyB0aGUgcmVzaXplXHJcbiAgICAgKiBAcGFyYW0gZWwgYEhUTUxFbGVtZW50YCB0aGF0J3MgYmVpbmcgcmVzaXplZFxyXG4gICAgICogQHBhcmFtIGRpc3RhbmNlIERpc3RhbmNlIGZyb20gdGhlIFYgZWRnZXMgdG8gc3RhcnQgc2Nyb2xsaW5nXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB1cGRhdGVTY3JvbGxSZXNpemUoZXZlbnQsIGVsLCBkaXN0YW5jZSkge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbEVsID0gdGhpcy5nZXRTY3JvbGxFbGVtZW50KGVsKTtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSBzY3JvbGxFbC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgLy8gIzE3MjcgZXZlbnQuY2xpZW50WSBpcyByZWxhdGl2ZSB0byB2aWV3cG9ydCwgc28gbXVzdCBjb21wYXJlIHRoaXMgYWdhaW5zdCBwb3NpdGlvbiBvZiBzY3JvbGxFbCBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcclxuICAgICAgICAvLyAjMTc0NSBTcGVjaWFsIHNpdHVhdGlvbiBpZiBzY3JvbGxFbCBpcyBkb2N1bWVudCAnaHRtbCc6IGhlcmUgYnJvd3NlciBzcGVjIHN0YXRlcyB0aGF0XHJcbiAgICAgICAgLy8gY2xpZW50SGVpZ2h0IGlzIGhlaWdodCBvZiB2aWV3cG9ydCwgYnV0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIGlzIHJlY3RhbmdsZSBvZiBodG1sIGVsZW1lbnQ7XHJcbiAgICAgICAgLy8gdGhpcyBkaXNjcmVwYW5jeSBhcmlzZXMgYmVjYXVzZSBpbiByZWFsaXR5IHNjcm9sbGJhciBpcyBhdHRhY2hlZCB0byB2aWV3cG9ydCwgbm90IGh0bWwgZWxlbWVudCBpdHNlbGYuXHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0VG9wID0gKHNjcm9sbEVsID09PSB0aGlzLmdldFNjcm9sbEVsZW1lbnQoKSkgPyAwIDogc2Nyb2xsRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG4gICAgICAgIGNvbnN0IHBvaW50ZXJQb3NZID0gZXZlbnQuY2xpZW50WSAtIG9mZnNldFRvcDtcclxuICAgICAgICBjb25zdCB0b3AgPSBwb2ludGVyUG9zWSA8IGRpc3RhbmNlO1xyXG4gICAgICAgIGNvbnN0IGJvdHRvbSA9IHBvaW50ZXJQb3NZID4gaGVpZ2h0IC0gZGlzdGFuY2U7XHJcbiAgICAgICAgaWYgKHRvcCkge1xyXG4gICAgICAgICAgICAvLyBUaGlzIGFsc28gY2FuIGJlIGRvbmUgd2l0aCBhIHRpbWVvdXQgdG8ga2VlcCBzY3JvbGxpbmcgd2hpbGUgdGhlIG1vdXNlIGlzXHJcbiAgICAgICAgICAgIC8vIGluIHRoZSBzY3JvbGxpbmcgem9uZS4gKHdpbGwgaGF2ZSBzbW9vdGhlciBiZWhhdmlvcilcclxuICAgICAgICAgICAgc2Nyb2xsRWwuc2Nyb2xsQnkoeyBiZWhhdmlvcjogJ3Ntb290aCcsIHRvcDogcG9pbnRlclBvc1kgLSBkaXN0YW5jZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYm90dG9tKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbEVsLnNjcm9sbEJ5KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCB0b3A6IGRpc3RhbmNlIC0gKGhlaWdodCAtIHBvaW50ZXJQb3NZKSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiogc2luZ2xlIGxldmVsIGNsb25lLCByZXR1cm5pbmcgYSBuZXcgb2JqZWN0IHdpdGggc2FtZSB0b3AgZmllbGRzLiBUaGlzIHdpbGwgc2hhcmUgc3ViIG9iamVjdHMgYW5kIGFycmF5cyAqL1xyXG4gICAgc3RhdGljIGNsb25lKG9iaikge1xyXG4gICAgICAgIGlmIChvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIChvYmopICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgb2JqKTtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgcmV0dXJuIFsuLi5vYmpdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgb2JqKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVjdXJzaXZlIGNsb25lIHZlcnNpb24gdGhhdCByZXR1cm5zIGEgZnVsbCBjb3B5LCBjaGVja2luZyBmb3IgbmVzdGVkIG9iamVjdHMgYW5kIGFycmF5cyBPTkxZLlxyXG4gICAgICogTm90ZTogdGhpcyB3aWxsIHVzZSBhcy1pcyBhbnkga2V5IHN0YXJ0aW5nIHdpdGggZG91YmxlIF9fIChhbmQgbm90IGNvcHkgaW5zaWRlKSBzb21lIGxpYiBoYXZlIGNpcmN1bGFyIGRlcGVuZGVuY2llcy5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNsb25lRGVlcChvYmopIHtcclxuICAgICAgICAvLyBsaXN0IG9mIGZpZWxkcyB3ZSB3aWxsIHNraXAgZHVyaW5nIGNsb25lRGVlcCAobmVzdGVkIG9iamVjdHMsIG90aGVyIGludGVybmFsKVxyXG4gICAgICAgIGNvbnN0IHNraXBGaWVsZHMgPSBbJ3BhcmVudEdyaWQnLCAnZWwnLCAnZ3JpZCcsICdzdWJHcmlkJywgJ2VuZ2luZSddO1xyXG4gICAgICAgIC8vIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpOyAvLyBkb2Vzbid0IHdvcmsgd2l0aCBkYXRlIGZvcm1hdCA/XHJcbiAgICAgICAgY29uc3QgcmV0ID0gVXRpbHMuY2xvbmUob2JqKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiByZXQpIHtcclxuICAgICAgICAgICAgLy8gTk9URTogd2UgZG9uJ3Qgc3VwcG9ydCBmdW5jdGlvbi9jaXJjdWxhciBkZXBlbmRlbmNpZXMgc28gc2tpcCB0aG9zZSBwcm9wZXJ0aWVzIGZvciBub3cuLi5cclxuICAgICAgICAgICAgaWYgKHJldC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHR5cGVvZiAocmV0W2tleV0pID09PSAnb2JqZWN0JyAmJiBrZXkuc3Vic3RyaW5nKDAsIDIpICE9PSAnX18nICYmICFza2lwRmllbGRzLmZpbmQoayA9PiBrID09PSBrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXRba2V5XSA9IFV0aWxzLmNsb25lRGVlcChvYmpba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIC8qKiBkZWVwIGNsb25lIHRoZSBnaXZlbiBIVE1MIG5vZGUsIHJlbW92aW5nIHRlaCB1bmlxdWUgaWQgZmllbGQgKi9cclxuICAgIHN0YXRpYyBjbG9uZU5vZGUoZWwpIHtcclxuICAgICAgICBjb25zdCBub2RlID0gZWwuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGFwcGVuZFRvKGVsLCBwYXJlbnQpIHtcclxuICAgICAgICBsZXQgcGFyZW50Tm9kZTtcclxuICAgICAgICBpZiAodHlwZW9mIHBhcmVudCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcGFyZW50Tm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBhcmVudE5vZGUgPSBwYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHB1YmxpYyBzdGF0aWMgc2V0UG9zaXRpb25SZWxhdGl2ZShlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIC8vICAgaWYgKCEoL14oPzpyfGF8ZikvKS50ZXN0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5wb3NpdGlvbikpIHtcclxuICAgIC8vICAgICBlbC5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfVxyXG4gICAgc3RhdGljIGFkZEVsU3R5bGVzKGVsLCBzdHlsZXMpIHtcclxuICAgICAgICBpZiAoc3R5bGVzIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcyBpbiBzdHlsZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdHlsZXMuaGFzT3duUHJvcGVydHkocykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZXNbc10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN1cHBvcnQgZmFsbGJhY2sgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzW3NdLmZvckVhY2godmFsID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlW3NdID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlW3NdID0gc3R5bGVzW3NdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyBpbml0RXZlbnQoZSwgaW5mbykge1xyXG4gICAgICAgIGNvbnN0IGV2dCA9IHsgdHlwZTogaW5mby50eXBlIH07XHJcbiAgICAgICAgY29uc3Qgb2JqID0ge1xyXG4gICAgICAgICAgICBidXR0b246IDAsXHJcbiAgICAgICAgICAgIHdoaWNoOiAwLFxyXG4gICAgICAgICAgICBidXR0b25zOiAxLFxyXG4gICAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0YXJnZXQ6IGluZm8udGFyZ2V0ID8gaW5mby50YXJnZXQgOiBlLnRhcmdldFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gZG9uJ3QgY2hlY2sgZm9yIGBpbnN0YW5jZW9mIERyYWdFdmVudGAgYXMgU2FmYXJpIHVzZSBNb3VzZUV2ZW50ICMxNTQwXHJcbiAgICAgICAgaWYgKGUuZGF0YVRyYW5zZmVyKSB7XHJcbiAgICAgICAgICAgIGV2dFsnZGF0YVRyYW5zZmVyJ10gPSBlLmRhdGFUcmFuc2ZlcjsgLy8gd29ya2Fyb3VuZCAncmVhZG9ubHknIGZpZWxkLlxyXG4gICAgICAgIH1cclxuICAgICAgICBbJ2FsdEtleScsICdjdHJsS2V5JywgJ21ldGFLZXknLCAnc2hpZnRLZXknXS5mb3JFYWNoKHAgPT4gZXZ0W3BdID0gZVtwXSk7IC8vIGtleXNcclxuICAgICAgICBbJ3BhZ2VYJywgJ3BhZ2VZJywgJ2NsaWVudFgnLCAnY2xpZW50WScsICdzY3JlZW5YJywgJ3NjcmVlblknXS5mb3JFYWNoKHAgPT4gZXZ0W3BdID0gZVtwXSk7IC8vIHBvaW50IGluZm9cclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBldnQpLCBvYmopO1xyXG4gICAgfVxyXG4gICAgLyoqIGNvcGllcyB0aGUgTW91c2VFdmVudCBwcm9wZXJ0aWVzIGFuZCBzZW5kcyBpdCBhcyBhbm90aGVyIGV2ZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQgKi9cclxuICAgIHN0YXRpYyBzaW11bGF0ZU1vdXNlRXZlbnQoZSwgc2ltdWxhdGVkVHlwZSwgdGFyZ2V0KSB7XHJcbiAgICAgICAgY29uc3Qgc2ltdWxhdGVkRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcclxuICAgICAgICBzaW11bGF0ZWRFdmVudC5pbml0TW91c2VFdmVudChzaW11bGF0ZWRUeXBlLCAvLyB0eXBlXHJcbiAgICAgICAgdHJ1ZSwgLy8gYnViYmxlc1xyXG4gICAgICAgIHRydWUsIC8vIGNhbmNlbGFibGVcclxuICAgICAgICB3aW5kb3csIC8vIHZpZXdcclxuICAgICAgICAxLCAvLyBkZXRhaWxcclxuICAgICAgICBlLnNjcmVlblgsIC8vIHNjcmVlblhcclxuICAgICAgICBlLnNjcmVlblksIC8vIHNjcmVlbllcclxuICAgICAgICBlLmNsaWVudFgsIC8vIGNsaWVudFhcclxuICAgICAgICBlLmNsaWVudFksIC8vIGNsaWVudFlcclxuICAgICAgICBlLmN0cmxLZXksIC8vIGN0cmxLZXlcclxuICAgICAgICBlLmFsdEtleSwgLy8gYWx0S2V5XHJcbiAgICAgICAgZS5zaGlmdEtleSwgLy8gc2hpZnRLZXlcclxuICAgICAgICBlLm1ldGFLZXksIC8vIG1ldGFLZXlcclxuICAgICAgICAwLCAvLyBidXR0b25cclxuICAgICAgICBlLnRhcmdldCAvLyByZWxhdGVkVGFyZ2V0XHJcbiAgICAgICAgKTtcclxuICAgICAgICAodGFyZ2V0IHx8IGUudGFyZ2V0KS5kaXNwYXRjaEV2ZW50KHNpbXVsYXRlZEV2ZW50KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlV0aWxzID0gVXRpbHM7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWxzLmpzLm1hcCJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiR3JpZFN0YWNrIiwiZ2xvYmFsIl0sInNvdXJjZVJvb3QiOiIifQ==