'use strict';

angular.module('tgdashboard.version', [
  'tgdashboard.version.interpolate-filter',
  'tgdashboard.version.version-directive'
])

.value('version', '0.1');
