// Action Button Factory
// =====================================================================================================================
(function () {

	var actionButtonFactoryFunc = function () {
		var _buttons = {};
		var _actionDefaults = {
			title: 'ACTION_TITLE',
			action: null,
			callback: null,
			errorCallback: null
		};

		return {
			// Add Button
			addButton: function (name) {
				_buttons[name] = [];
			},

			// Add action to Factory
			addAction: function (button, actionObj) {
				var action = _.pick(_.defaults(actionObj, _actionDefaults), _.keys(_actionDefaults));
				_buttons[button].push(action);
			},

			// Get all avaliable actions
			getActions: function (button) {
				return _buttons[button];
			},

			// clear actions
			clearActions: function (button) {
				if (_buttons[button]) {
					_buttons[button] = [];
				}
			}
		};

	};

	angular.module('atActionButton').factory('$actionButton', [actionButtonFactoryFunc]);
})();