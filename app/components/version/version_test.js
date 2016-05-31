'use strict';

describe('tgdashboard.version module', function() {
  beforeEach(module('tgdashboard.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
