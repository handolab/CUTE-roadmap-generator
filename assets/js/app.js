/*
Template Name: Adminto - Responsive Bootstrap 4 Admin Dashboard
Author: CoderThemes
Website: https://coderthemes.com/
Contact: support@coderthemes.com
File: Main Js File
*/

!(function ($) {
    'use strict';

    var Components = function () {};

    //initializing tooltip
    (Components.prototype.initTooltipPlugin = function () {
        $.fn.tooltip && $('[data-toggle="tooltip"]').tooltip();
    }),
        //initializing popover
        (Components.prototype.initPopoverPlugin = function () {
            $.fn.popover && $('[data-toggle="popover"]').popover();
        }),
        //initializing Slimscroll
        (Components.prototype.initSlimScrollPlugin = function () {
            //You can change the color of scroll bar here
            $.fn.slimScroll &&
                $('.slimscroll').slimScroll({
                    height: 'auto',
                    position: 'right',
                    size: '8px',
                    touchScrollStep: 20,
                    color: '#9ea5ab'
                });
        }),
        //initializing form validation
        (Components.prototype.initFormValidation = function () {
            $('.needs-validation').on('submit', function (event) {
                $(this).addClass('was-validated');
                if ($(this)[0].checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
                return true;
            });
        }),
        //initializing custom modal
        (Components.prototype.initCustomModalPlugin = function () {
            $('[data-plugin="custommodal"]').on('click', function (e) {
                e.preventDefault();
                var modal = new Custombox.modal({
                    content: {
                        target: $(this).attr('href'),
                        effect: $(this).attr('data-animation')
                    },
                    overlay: {
                        color: $(this).attr('data-overlayColor')
                    }
                });
                // Open
                modal.open();
            });
        }),
        // Counterup
        (Components.prototype.initCounterUp = function () {
            var delay = $(this).attr('data-delay')
                ? $(this).attr('data-delay')
                : 100; //default is 100
            var time = $(this).attr('data-time')
                ? $(this).attr('data-time')
                : 1200; //default is 1200
            $('[data-plugin="counterup"]').each(function (idx, obj) {
                $(this).counterUp({
                    delay: 100,
                    time: 1200
                });
            });
        }),
        //peity charts
        (Components.prototype.initPeityCharts = function () {
            $('[data-plugin="peity-pie"]').each(function (idx, obj) {
                var colors = $(this).attr('data-colors')
                    ? $(this).attr('data-colors').split(',')
                    : [];
                var width = $(this).attr('data-width')
                    ? $(this).attr('data-width')
                    : 20; //default is 20
                var height = $(this).attr('data-height')
                    ? $(this).attr('data-height')
                    : 20; //default is 20
                $(this).peity('pie', {
                    fill: colors,
                    width: width,
                    height: height
                });
            });
            //donut
            $('[data-plugin="peity-donut"]').each(function (idx, obj) {
                var colors = $(this).attr('data-colors')
                    ? $(this).attr('data-colors').split(',')
                    : [];
                var width = $(this).attr('data-width')
                    ? $(this).attr('data-width')
                    : 20; //default is 20
                var height = $(this).attr('data-height')
                    ? $(this).attr('data-height')
                    : 20; //default is 20
                $(this).peity('donut', {
                    fill: colors,
                    width: width,
                    height: height
                });
            });

            $('[data-plugin="peity-donut-alt"]').each(function (idx, obj) {
                $(this).peity('donut');
            });

            // line
            $('[data-plugin="peity-line"]').each(function (idx, obj) {
                $(this).peity('line', $(this).data());
            });

            // bar
            $('[data-plugin="peity-bar"]').each(function (idx, obj) {
                var colors = $(this).attr('data-colors')
                    ? $(this).attr('data-colors').split(',')
                    : [];
                var width = $(this).attr('data-width')
                    ? $(this).attr('data-width')
                    : 20; //default is 20
                var height = $(this).attr('data-height')
                    ? $(this).attr('data-height')
                    : 20; //default is 20
                $(this).peity('bar', {
                    fill: colors,
                    width: width,
                    height: height
                });
            });
        }),
        (Components.prototype.initKnob = function () {
            $('[data-plugin="knob"]').each(function (idx, obj) {
                $(this).knob();
            });
        }),
        (Components.prototype.initTippyTooltips = function () {
            if ($('[data-plugin="tippy"]').length > 0)
                tippy('[data-plugin="tippy"]');
        }),
        //initilizing
        (Components.prototype.init = function () {
            var $this = this;
            this.initTooltipPlugin(),
                this.initPopoverPlugin(),
                this.initSlimScrollPlugin(),
                this.initFormValidation(),
                this.initCustomModalPlugin(),
                this.initCounterUp(),
                this.initPeityCharts(),
                this.initKnob();
            this.initTippyTooltips();
        }),
        ($.Components = new Components()),
        ($.Components.Constructor = Components);
})(window.jQuery),
    (function ($) {
        'use strict';

        /**
    Portlet Widget
    */
        var Portlet = function () {
            (this.$body = $('body')),
                (this.$portletIdentifier = '.card'),
                (this.$portletCloser = '.card a[data-toggle="remove"]'),
                (this.$portletRefresher = '.card a[data-toggle="reload"]');
        };

        //on init
        (Portlet.prototype.init = function () {
            // Panel closest
            var $this = this;
            $(document).on('click', this.$portletCloser, function (ev) {
                ev.preventDefault();
                var $portlet = $(this).closest($this.$portletIdentifier);
                var $portlet_parent = $portlet.parent();
                $portlet.remove();
                if ($portlet_parent.children().length == 0) {
                    $portlet_parent.remove();
                }
            });

            // Panel Reload
            $(document).on('click', this.$portletRefresher, function (ev) {
                ev.preventDefault();
                var $portlet = $(this).closest($this.$portletIdentifier);
                // This is just a simulation, nothing is going to be reloaded
                $portlet.append(
                    '<div class="card-disabled"><div class="card-portlets-loader"></div></div>'
                );
                var $pd = $portlet.find('.card-disabled');
                setTimeout(function () {
                    $pd.fadeOut('fast', function () {
                        $pd.remove();
                    });
                }, 500 + 300 * (Math.random() * 5));
            });
        }),
            //
            ($.Portlet = new Portlet()),
            ($.Portlet.Constructor = Portlet);
    })(window.jQuery),
    (function ($) {
        'use strict';

        var RightSidebar = function () {
            (this.$bootstrapStylesheet = $('#bootstrap-stylesheet')),
                (this.$appStylesheet = $('#app-stylesheet')),
                (this.$originalBSStylesheet = $('#bootstrap-stylesheet').attr(
                    'href'
                )),
                (this.$originalAppStylesheet =
                    $('#app-stylesheet').attr('href'));
        };

        (RightSidebar.prototype.init = function () {
            var self = this;

            $('#light-mode-switch').on('change', function () {
                if (this.checked) {
                    self.$bootstrapStylesheet.attr(
                        'href',
                        self.$originalBSStylesheet
                    );
                    self.$appStylesheet.attr(
                        'href',
                        self.$originalAppStylesheet
                    );

                    $('#dark-mode-switch').prop('checked', false);
                    $('#rtl-mode-switch').prop('checked', false);
                    $('#dark-rtl-mode-switch').prop('checked', false);
                }
            });

            $('#dark-mode-switch').on('change', function () {
                if (this.checked) {
                    self.$bootstrapStylesheet.attr(
                        'href',
                        $(this).data('bsstyle')
                    );
                    self.$appStylesheet.attr('href', $(this).data('appstyle'));

                    $('#light-mode-switch').prop('checked', false);
                    $('#rtl-mode-switch').prop('checked', false);
                    $('#dark-rtl-mode-switch').prop('checked', false);
                }
            });

            $('#rtl-mode-switch').on('change', function () {
                if (this.checked) {
                    self.$bootstrapStylesheet.attr(
                        'href',
                        self.$originalBSStylesheet
                    );
                    self.$appStylesheet.attr('href', $(this).data('appstyle'));

                    $('#light-mode-switch').prop('checked', false);
                    $('#dark-mode-switch').prop('checked', false);
                    $('#dark-rtl-mode-switch').prop('checked', false);
                }
            });

            $('#dark-rtl-mode-switch').on('change', function () {
                if (this.checked) {
                    self.$bootstrapStylesheet.attr(
                        'href',
                        $(this).data('bsstyle')
                    );
                    self.$appStylesheet.attr('href', $(this).data('appstyle'));

                    $('#light-mode-switch').prop('checked', false);
                    $('#rtl-mode-switch').prop('checked', false);
                    $('#dark-mode-switch').prop('checked', false);
                }
            });
        }),
            ($.RightSidebar = new RightSidebar()),
            ($.RightSidebar.Constructor = RightSidebar);
    })(window.jQuery),
    (function ($) {
        'use strict';

        var App = function () {
            (this.$body = $('body')), (this.$window = $(window));
        };

        /**
    Resets the scroll
    */
        (App.prototype._resetSidebarScroll = function () {
            // sidebar - scroll container
            $('.slimscroll-menu').slimscroll({
                height: 'auto',
                position: 'right',
                size: '8px',
                color: '#9ea5ab',
                wheelStep: 5,
                touchScrollStep: 20
            });
        }),
            /**
             * Initlizes the menu - top and sidebar
             */
            (App.prototype.initMenu = function () {
                var $this = this;

                // Left menu collapse
                $('.button-menu-mobile').on('click', function (event) {
                    event.preventDefault();
                    $this.$body.toggleClass('sidebar-enable');
                    if ($this.$window.width() >= 768) {
                        $this.$body.toggleClass('enlarged');
                    } else {
                        $this.$body.removeClass('enlarged');
                    }

                    // sidebar - scroll container
                    $this._resetSidebarScroll();
                });

                // sidebar - main menu
                $('#side-menu').metisMenu();

                // sidebar - scroll container
                $this._resetSidebarScroll();

                // right side-bar toggle
                $('.right-bar-toggle').on('click', function (e) {
                    $('body').toggleClass('right-bar-enabled');
                });

                $(document).on('click', 'body', function (e) {
                    if (
                        $(e.target).closest('.right-bar-toggle, .right-bar')
                            .length > 0
                    ) {
                        return;
                    }

                    if (
                        $(e.target).closest('.left-side-menu, .side-nav')
                            .length > 0 ||
                        $(e.target).hasClass('button-menu-mobile') ||
                        $(e.target).closest('.button-menu-mobile').length > 0
                    ) {
                        return;
                    }

                    $('body').removeClass('right-bar-enabled');
                    $('body').removeClass('sidebar-enable');
                    return;
                });

                // activate the menu in left side bar based on url
                $('#side-menu a').each(function () {
                    var pageUrl = window.location.href.split(/[?#]/)[0];
                    if (this.href == pageUrl) {
                        $(this).addClass('active');
                        $(this).parent().addClass('mm-active'); // add active to li of the current link
                        $(this).parent().parent().addClass('mm-show');
                        $(this).parent().parent().prev().addClass('active'); // add active class to an anchor
                        $(this)
                            .parent()
                            .parent()
                            .parent()
                            .addClass('mm-active');
                        $(this)
                            .parent()
                            .parent()
                            .parent()
                            .parent()
                            .addClass('mm-show'); // add active to li of the current link
                        $(this)
                            .parent()
                            .parent()
                            .parent()
                            .parent()
                            .parent()
                            .addClass('mm-active');
                    }
                });

                $('.navigation-menu a').each(function () {
                    var pageUrl = window.location.href.split(/[?#]/)[0];
                    if (this.href == pageUrl) {
                        $(this).addClass('active');
                        $(this).parent().addClass('active'); // add active to li of the current link
                        $(this).parent().parent().addClass('in');
                        $(this).parent().parent().prev().addClass('active'); // add active class to an anchor
                        $(this).parent().parent().parent().addClass('active');
                        $(this)
                            .parent()
                            .parent()
                            .parent()
                            .parent()
                            .addClass('in'); // add active to li of the current link
                        $(this)
                            .parent()
                            .parent()
                            .parent()
                            .parent()
                            .parent()
                            .addClass('active');
                    }
                });

                // Topbar - main menu
                $('.navbar-toggle').on('click', function (event) {
                    $(this).toggleClass('open');
                    $('#navigation').slideToggle(400);
                });

                $('.navigation-menu>li').slice(-2).addClass('last-elements');

                $('.navigation-menu li.has-submenu a[href="#"]').on(
                    'click',
                    function (e) {
                        if ($(window).width() < 992) {
                            e.preventDefault();
                            $(this)
                                .parent('li')
                                .toggleClass('open')
                                .find('.submenu:first')
                                .toggleClass('open');
                        }
                    }
                );

                // Preloader
                $(window).on('load', function () {
                    $('#status').fadeOut();
                    $('#preloader').delay(350).fadeOut('slow');
                });
            }),
            /**
             * Init the layout - with broad sidebar or compact side bar
             */
            (App.prototype.initLayout = function () {
                // in case of small size, add class enlarge to have minimal menu
                if (
                    this.$window.width() >= 768 &&
                    this.$window.width() <= 1028
                ) {
                    this.$body.addClass('enlarged');
                } else {
                    if (this.$body.data('keep-enlarged') != true) {
                        this.$body.removeClass('enlarged');
                    }
                }
            }),
            //initilizing
            (App.prototype.init = function () {
                var $this = this;
                this.initLayout();
                $.Portlet.init();
                this.initMenu();
                $.Components.init();

                // right sidebar
                $.RightSidebar.init();

                // on window resize, make menu flipped automatically
                $this.$window.on('resize', function (e) {
                    e.preventDefault();
                    $this.initLayout();
                    $this._resetSidebarScroll();
                });
            }),
            ($.App = new App()),
            ($.App.Constructor = App);
    })(window.jQuery),
    //initializing main application module
    (function ($) {
        'use strict';
        $.App.init();
    })(window.jQuery);

// Waves Effect
Waves.init();

const actionName = document.getElementById('actionname');
const actionNumber = document.getElementById('number');
const priorities = document.getElementById('priorities-select');
const altPriority = document.getElementById('alt-priority');
let selectedValue = '';
const people = document.getElementById('people-textarea');
const timeScale = document.getElementsByClassName('time-scale');
const additionalScale = document.getElementById('scale-textarea');
const impact = document.getElementsByClassName('impact');
const additionalImpact = document.getElementById('impact-textarea');
const goals = document.getElementsByClassName('goals');
const additionalGoals = document.getElementById('goals-textarea');
const progress = document.getElementById('snow-editor');
const affected = document.getElementsByClassName('affected');
const altAffected = document.getElementsByClassName('alt-affected');
const plan = document.getElementById('plan-textarea');
const observation = document.getElementById('observation-textarea');
const saveButton = document.getElementById('save-button');
const thanksText = document.getElementById('thanks');
const exportButton = document.getElementById('export-button');
const counter = document.getElementById('counter-span');
const uploadInput = document.getElementById('file-upload');
const uploadAnchor = document.getElementById('upload-opener');

let jsonObjects = [];
var imported = false;
const traverseButtons = document.getElementsByClassName('json-traverse');
if (!imported) {
    traverseButtons[0].style.display = 'none';
    traverseButtons[1].style.display = 'none';
}
var actualIndex = 0;

counter.innerText =
    jsonObjects.length === 0 ? 'ACTIONS: 0' : `ACTIONS: ${jsonObjects.length}`;

const saveHandler = () => {
    let jsonAction = {};
    jsonAction['Número Ficha'] = actionNumber.value;
    jsonAction['Name'] = actionName.value;
    jsonAction['Priorities'] = [];
    jsonAction['Priorities'].push(
        priorities.options[priorities.selectedIndex]
            ? priorities.options[priorities.selectedIndex].value
            : altPriority.value
    );
    jsonAction['Texto Libre'] = people.value;
    jsonAction['Time Scale'] = [];
    for (let i = 0; i < timeScale.length; i++) {
        if (timeScale[i].checked) {
            if (timeScale[i].value === 'Short term (1-6 months)') {
                jsonAction['Time Scale'].push('S');
            } else if (
                timeScale[i].value === 'Medium term (6 months to 1 year)'
            ) {
                jsonAction['Time Scale'].push('M');
            } else {
                jsonAction['Time Scale'].push('L');
            }
        }
    }
    jsonAction['Texto Libre #2'] = additionalScale.value;
    jsonAction['Impact'] = [];
    for (let i = 0; i < impact.length; i++) {
        if (impact[i].checked) {
            if (
                impact[i].value ===
                'Small scale (single practice, small group, single discipline, etc.)'
            ) {
                jsonAction['Impact'].push('S');
            } else if (
                impact[i].value ===
                'Large scale (at a College or institutional level)'
            ) {
                jsonAction['Impact'].push('L');
            } else {
                console.log(impact[i].value);
                jsonAction['Impact'].push('T');
            }
        }
    }
    jsonAction['Texto Libre #3'] = additionalImpact.value;
    jsonAction['Goals'] = [];
    for (let i = 0; i < goals.length; i++) {
        if (goals[i].checked) {
            jsonAction['Goals'].push(impact[i].value);
        }
    }
    jsonAction['Texto Libre #4'] = additionalGoals.value;
    jsonAction['Indicators'] = progress.__quill.root.innerText;
    jsonAction['Area'] = [];
    for (let i = 0; i < affected.length; i++) {
        if (affected[i].checked) {
            jsonAction['Area'].push(affected[i].value);
        }
    }
    jsonAction['Con-Partner'] = [];
    for (let i = 0; i < altAffected.length; i++) {
        if (altAffected[i].checked) {
            jsonAction['Con-Partner'].push(altAffected[i].value);
        }
    }
    jsonAction['Texto Libre #5'] = plan.value;
    jsonAction['Texto Libre #6'] = observation.value;
    console.log('Saved!');
    thanksText.innerText =
        'If you want to add another action go to step 1, repeat the process and save. Otherwise click EXPORT button';
    actualIndex++;
    jsonObjects.push(jsonAction);
    counter.innerText =
        jsonObjects.length === 0 ? '0' : `ACTIONS: ${jsonObjects.length}`;
    console.log(jsonObjects);

    actionNumber.value = '';
    actionName.value = '';
    altPriority.value = '';
    people.value = '';
    for (let i = 0; i < timeScale.length; i++) {
        if (timeScale[i].checked) {
            timeScale[i].checked = false;
        }
    }
    additionalScale.value = '';
    for (let i = 0; i < impact.length; i++) {
        if (impact[i].checked) {
            impact[i].checked = false;
        }
    }
    additionalImpact.value = '';
    for (let i = 0; i < goals.length; i++) {
        if (goals[i].checked) {
            goals[i].checked = false;
        }
    }
    additionalGoals.value = '';
    progress.__quill.root.innerText = '';
    for (let i = 0; i < affected.length; i++) {
        if (affected[i].checked) {
            affected[i].checked = false;
        }
    }
    for (let i = 0; i < altAffected.length; i++) {
        if (altAffected[i].checked) {
            altAffected[i].checked = false;
        }
    }
    plan.value = '';
    observation.value = '';
};

saveButton.addEventListener('click', saveHandler);

exportButton.addEventListener('click', () => {
    let dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(jsonObjects));
    var dlAnchorElem = document.getElementById('download-anchor');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'Actions.json');
    dlAnchorElem.click();
});

uploadAnchor.addEventListener('click', () => {
    uploadInput.click();
});

uploadInput.addEventListener('change', () => {
    let file = uploadInput.files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = function (evt) {
            jsonObjects = JSON.parse(evt.target.result);
            console.log('Uploaded', jsonObjects);
            imported = true;
            traverseButtons[0].style.display = 'initial';
            traverseButtons[1].style.display = 'initial';
            counter.innerText =
                jsonObjects.length === 0
                    ? 'ACTIONS: 0'
                    : `ACTIONS: ${actualIndex + 1}/${jsonObjects.length}`;
            saveButton.removeEventListener('click', saveHandler);
            saveButton.addEventListener('click', () => {
                jsonObjects[actualIndex]['Número Ficha'] = actionNumber.value;
                jsonObjects[actualIndex]['Name'] = actionName.value;
                jsonObjects[actualIndex]['Priorities'] = [];
                jsonObjects[actualIndex]['Priorities'].push(
                    priorities.options[priorities.selectedIndex]
                        ? priorities.options[priorities.selectedIndex].value
                        : altPriority.value
                );
                jsonObjects[actualIndex]['Texto Libre'] = people.value;
                jsonObjects[actualIndex]['Time Scale'] = [];
                for (let i = 0; i < timeScale.length; i++) {
                    if (timeScale[i].checked) {
                        if (timeScale[i].value === 'Short term (1-6 months)') {
                            jsonObjects[actualIndex]['Time Scale'].push('S');
                        } else if (
                            timeScale[i].value ===
                            'Medium term (6 months to 1 year)'
                        ) {
                            jsonObjects[actualIndex]['Time Scale'].push('M');
                        } else {
                            jsonObjects[actualIndex]['Time Scale'].push('L');
                        }
                    }
                }
                jsonObjects[actualIndex]['Texto Libre #2'] =
                    additionalScale.value;
                jsonObjects[actualIndex]['Impact'] = [];
                for (let i = 0; i < impact.length; i++) {
                    if (impact[i].checked) {
                        if (
                            impact[i].value ===
                            'Small scale (single practice, small group, single discipline, etc.)'
                        ) {
                            jsonObjects[actualIndex]['Impact'].push('S');
                        } else if (
                            impact[i].value ===
                            'Large scale (at a College or institutional level)'
                        ) {
                            jsonObjects[actualIndex]['Impact'].push('L');
                        } else {
                            jsonObjects[actualIndex]['Impact'].push('T');
                        }
                    }
                }
                jsonObjects[actualIndex]['Texto Libre #3'] =
                    additionalImpact.value;
                jsonObjects[actualIndex]['Goals'] = [];
                for (let i = 0; i < goals.length; i++) {
                    if (goals[i].checked) {
                        jsonObjects[actualIndex]['Goals'].push(impact[i].value);
                    }
                }
                jsonObjects[actualIndex]['Texto Libre #4'] =
                    additionalGoals.value;
                jsonObjects[actualIndex]['Indicators'] =
                    progress.__quill.root.innerText;
                jsonObjects[actualIndex]['Area'] = [];
                for (let i = 0; i < affected.length; i++) {
                    if (affected[i].checked) {
                        jsonObjects[actualIndex]['Area'].push(
                            affected[i].value
                        );
                    }
                }
                jsonObjects[actualIndex]['Con-Partner'] = [];
                for (let i = 0; i < altAffected.length; i++) {
                    if (altAffected[i].checked) {
                        jsonObjects[actualIndex]['Con-Partner'].push(
                            altAffected[i].value
                        );
                    }
                }
                jsonObjects[actualIndex]['Texto Libre #5'] = plan.value;
                jsonObjects[actualIndex]['Texto Libre #6'] = observation.value;
                console.log('Guardado!');
                thanksText.innerText =
                    'Saved changes, you can continue modifying the file or export the result';
            });
            actionNumber.value = jsonObjects[actualIndex]['Número Ficha'];
            actionName.value = jsonObjects[actualIndex]['Name'];
            altPriority.value = jsonObjects[actualIndex]['Priorities'][0];
            people.value = jsonObjects[actualIndex]['Texto Libre'];
            for (
                let i = 0;
                i < jsonObjects[actualIndex]['Time Scale'].length;
                i++
            ) {
                if (jsonObjects[actualIndex]['Time Scale'][i] === 'S') {
                    timeScale[0].checked = true;
                } else if (jsonObjects[actualIndex]['Time Scale'][i] === 'M') {
                    timeScale[1].checked = true;
                } else if (jsonObjects[actualIndex]['Time Scale'][i] === 'L') {
                    timeScale[2].checked = true;
                }
            }
            additionalScale.value = jsonObjects[actualIndex]['Texto Libre #2'];
            for (
                let i = 0;
                i < jsonObjects[actualIndex]['Impact'].length;
                i++
            ) {
                if (jsonObjects[actualIndex]['Impact'][i] === 'S') {
                    impact[0].checked = true;
                } else if (jsonObjects[actualIndex]['Impact'][i] === 'L') {
                    impact[1].checked = true;
                } else if (jsonObjects[actualIndex]['Impact'][i] === 'T') {
                    impact[2].checked = true;
                }
            }
            additionalImpact.value = jsonObjects[actualIndex]['Texto Libre #3'];
            for (let i = 0; i < jsonObjects[actualIndex]['Goals'].length; i++) {
                if (
                    jsonObjects[actualIndex]['Goals'][i] ===
                    'Strategic Level (related to the institutional mission, vision, and high-level goals, often long term, less tangible, but very important)'
                ) {
                    goals[0].checked = true;
                } else if (
                    jsonObjects[actualIndex]['Goals'][i] ===
                    'Operational Level (close-distance focused, related to small groups or changes, short term, often easy to measure and quantify)'
                ) {
                    goals[1].checked = true;
                }
            }
            additionalGoals.value = jsonObjects[actualIndex]['Texto Libre #4'];
            progress.__quill.root.innerText =
                jsonObjects[actualIndex]['Indicators'];
            for (let i = 0; i < jsonObjects[actualIndex]['Area'].length; i++) {
                if (
                    jsonObjects[actualIndex]['Area'][i] ===
                    'Empowering Learners'
                ) {
                    affected[0].checked = true;
                } else if (
                    jsonObjects[actualIndex]['Area'][i] ===
                    "Facilitating Learner's Digital Competence"
                ) {
                    affected[1].checked = true;
                } else if (
                    jsonObjects[actualIndex]['Area'][i] === 'Assessment'
                ) {
                    affected[2].checked = true;
                } else if (
                    jsonObjects[actualIndex]['Area'][i] ===
                    'Teaching and Learning'
                ) {
                    affected[3].checked = true;
                } else if (
                    jsonObjects[actualIndex]['Area'][i] === 'Digital Resources'
                ) {
                    affected[4].checked = true;
                } else if (
                    jsonObjects[actualIndex]['Area'][i] ===
                    'Professional Engagement'
                ) {
                    affected[5].checked = true;
                }
            }
            for (
                let i = 0;
                i < jsonObjects[actualIndex]['Con-Partner'].length;
                i++
            ) {
                if (jsonObjects[actualIndex]['Con-Partner'][i] === 'No') {
                    altAffected[0].checked = true;
                } else if (
                    jsonObjects[actualIndex]['Con-Partner'][i] === 'UCPH'
                ) {
                    altAffected[1].checked = true;
                } else if (
                    jsonObjects[actualIndex]['Con-Partner'][i] === 'NUI Galway'
                ) {
                    altAffected[2].checked = true;
                } else if (
                    jsonObjects[actualIndex]['Con-Partner'][i] === 'PHOÖ'
                ) {
                    altAffected[3].checked = true;
                } else if (
                    jsonObjects[actualIndex]['Con-Partner'][i] === 'AGH'
                ) {
                    altAffected[4].checked = true;
                } else if (
                    jsonObjects[actualIndex]['Con-Partner'][i] === 'UNAK'
                ) {
                    altAffected[5].checked = true;
                } else if (
                    jsonObjects[actualIndex]['Con-Partner'][i] === 'UM'
                ) {
                    altAffected[6].checked = true;
                }
            }
            plan.value = jsonObjects[actualIndex]['Texto Libre #5'];
            observation.value = jsonObjects[actualIndex]['Texto Libre #6'];

            traverseButtons[0].addEventListener('click', () => {
                if (actualIndex > 0) {
                    actualIndex--;
                    counter.innerText =
                        jsonObjects.length === 0
                            ? 'ACTIONS: 0'
                            : `ACTIONS: ${actualIndex + 1}/${
                                  jsonObjects.length
                              }`;
                    actionNumber.value =
                        jsonObjects[actualIndex]['Número Ficha'];
                    actionName.value = jsonObjects[actualIndex]['Name'];
                    altPriority.value =
                        jsonObjects[actualIndex]['Priorities'][0];
                    people.value = jsonObjects[actualIndex]['Texto Libre'];
                    for (
                        let i = 0;
                        i < jsonObjects[actualIndex]['Time Scale'].length;
                        i++
                    ) {
                        if (jsonObjects[actualIndex]['Time Scale'][i] === 'S') {
                            timeScale[0].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Time Scale'][i] === 'M'
                        ) {
                            timeScale[1].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Time Scale'][i] === 'L'
                        ) {
                            timeScale[2].checked = true;
                        }
                    }
                    additionalScale.value =
                        jsonObjects[actualIndex]['Texto Libre #2'];
                    for (
                        let i = 0;
                        i < jsonObjects[actualIndex]['Impact'].length;
                        i++
                    ) {
                        if (jsonObjects[actualIndex]['Impact'][i] === 'S') {
                            impact[0].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Impact'][i] === 'L'
                        ) {
                            impact[1].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Impact'][i] === 'T'
                        ) {
                            impact[2].checked = true;
                        }
                    }
                    additionalImpact.value =
                        jsonObjects[actualIndex]['Texto Libre #3'];
                    for (
                        let i = 0;
                        i < jsonObjects[actualIndex]['Goals'].length;
                        i++
                    ) {
                        if (
                            jsonObjects[actualIndex]['Goals'][i] ===
                            'Strategic Level (related to the institutional mission, vision, and high-level goals, often long term, less tangible, but very important)'
                        ) {
                            goals[0].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Goals'][i] ===
                            'Operational Level (close-distance focused, related to small groups or changes, short term, often easy to measure and quantify)'
                        ) {
                            goals[1].checked = true;
                        }
                    }
                    additionalGoals.value =
                        jsonObjects[actualIndex]['Texto Libre #4'];
                    progress.__quill.root.innerText =
                        jsonObjects[actualIndex]['Indicators'];
                    for (
                        let i = 0;
                        i < jsonObjects[actualIndex]['Area'].length;
                        i++
                    ) {
                        if (
                            jsonObjects[actualIndex]['Area'][i] ===
                            'Empowering Learners'
                        ) {
                            affected[0].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Area'][i] ===
                            "Facilitating Learner's Digital Competence"
                        ) {
                            affected[1].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Area'][i] === 'Assessment'
                        ) {
                            affected[2].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Area'][i] ===
                            'Teaching and Learning'
                        ) {
                            affected[3].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Area'][i] ===
                            'Digital Resources'
                        ) {
                            affected[4].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Area'][i] ===
                            'Professional Engagement'
                        ) {
                            affected[5].checked = true;
                        }
                    }
                    for (
                        let i = 0;
                        i < jsonObjects[actualIndex]['Con-Partner'].length;
                        i++
                    ) {
                        if (
                            jsonObjects[actualIndex]['Con-Partner'][i] === 'No'
                        ) {
                            altAffected[0].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Con-Partner'][i] ===
                            'UCPH'
                        ) {
                            altAffected[1].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Con-Partner'][i] ===
                            'NUI Galway'
                        ) {
                            altAffected[2].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Con-Partner'][i] ===
                            'PHOÖ'
                        ) {
                            altAffected[3].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Con-Partner'][i] === 'AGH'
                        ) {
                            altAffected[4].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Con-Partner'][i] ===
                            'UNAK'
                        ) {
                            altAffected[5].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Con-Partner'][i] === 'UM'
                        ) {
                            altAffected[6].checked = true;
                        }
                    }
                    plan.value = jsonObjects[actualIndex]['Texto Libre #5'];
                    observation.value =
                        jsonObjects[actualIndex]['Texto Libre #6'];
                }
            });
            traverseButtons[1].addEventListener('click', () => {
                if (actualIndex < jsonObjects.length - 1) {
                    actualIndex++;
                    counter.innerText =
                        jsonObjects.length === 0
                            ? 'ACTIONS: 0'
                            : `ACTIONS: ${actualIndex + 1}/${
                                  jsonObjects.length
                              }`;
                    actionNumber.value =
                        jsonObjects[actualIndex]['Número Ficha'];
                    actionName.value = jsonObjects[actualIndex]['Name'];
                    altPriority.value =
                        jsonObjects[actualIndex]['Priorities'][0];
                    people.value = jsonObjects[actualIndex]['Texto Libre'];
                    for (
                        let i = 0;
                        i < jsonObjects[actualIndex]['Time Scale'].length;
                        i++
                    ) {
                        if (jsonObjects[actualIndex]['Time Scale'][i] === 'S') {
                            timeScale[0].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Time Scale'][i] === 'M'
                        ) {
                            timeScale[1].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Time Scale'][i] === 'L'
                        ) {
                            timeScale[2].checked = true;
                        }
                    }
                    additionalScale.value =
                        jsonObjects[actualIndex]['Texto Libre #2'];
                    for (
                        let i = 0;
                        i < jsonObjects[actualIndex]['Impact'].length;
                        i++
                    ) {
                        if (jsonObjects[actualIndex]['Impact'][i] === 'S') {
                            impact[0].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Impact'][i] === 'L'
                        ) {
                            impact[1].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Impact'][i] === 'T'
                        ) {
                            impact[2].checked = true;
                        }
                    }
                    additionalImpact.value =
                        jsonObjects[actualIndex]['Texto Libre #3'];
                    for (
                        let i = 0;
                        i < jsonObjects[actualIndex]['Goals'].length;
                        i++
                    ) {
                        if (
                            jsonObjects[actualIndex]['Goals'][i] ===
                            'Strategic Level (related to the institutional mission, vision, and high-level goals, often long term, less tangible, but very important)'
                        ) {
                            goals[0].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Goals'][i] ===
                            'Operational Level (close-distance focused, related to small groups or changes, short term, often easy to measure and quantify)'
                        ) {
                            goals[1].checked = true;
                        }
                    }
                    additionalGoals.value =
                        jsonObjects[actualIndex]['Texto Libre #4'];
                    progress.__quill.root.innerText =
                        jsonObjects[actualIndex]['Indicators'];
                    for (
                        let i = 0;
                        i < jsonObjects[actualIndex]['Area'].length;
                        i++
                    ) {
                        if (
                            jsonObjects[actualIndex]['Area'][i] ===
                            'Empowering Learners'
                        ) {
                            affected[0].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Area'][i] ===
                            "Facilitating Learner's Digital Competence"
                        ) {
                            affected[1].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Area'][i] === 'Assessment'
                        ) {
                            affected[2].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Area'][i] ===
                            'Teaching and Learning'
                        ) {
                            affected[3].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Area'][i] ===
                            'Digital Resources'
                        ) {
                            affected[4].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Area'][i] ===
                            'Professional Engagement'
                        ) {
                            affected[5].checked = true;
                        }
                    }
                    for (
                        let i = 0;
                        i < jsonObjects[actualIndex]['Con-Partner'].length;
                        i++
                    ) {
                        if (
                            jsonObjects[actualIndex]['Con-Partner'][i] === 'No'
                        ) {
                            altAffected[0].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Con-Partner'][i] ===
                            'UCPH'
                        ) {
                            altAffected[1].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Con-Partner'][i] ===
                            'NUI Galway'
                        ) {
                            altAffected[2].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Con-Partner'][i] ===
                            'PHOÖ'
                        ) {
                            altAffected[3].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Con-Partner'][i] === 'AGH'
                        ) {
                            altAffected[4].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Con-Partner'][i] ===
                            'UNAK'
                        ) {
                            altAffected[5].checked = true;
                        } else if (
                            jsonObjects[actualIndex]['Con-Partner'][i] === 'UM'
                        ) {
                            altAffected[6].checked = true;
                        }
                    }
                    plan.value = jsonObjects[actualIndex]['Texto Libre #5'];
                    observation.value =
                        jsonObjects[actualIndex]['Texto Libre #6'];
                }
            });
        };
        reader.onerror = function (evt) {
            alert('Error reading the file');
        };
    }
});
