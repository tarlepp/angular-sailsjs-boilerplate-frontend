/* jshint strict:false, globalstrict:false */
/* global describe, it, beforeEach, inject, module */
describe('ChatController', function() {
  var ChatController;
  var scope;
  var timeout;
  var localStorage;
  var MessageService;
  var MessageModel;
  var _messages;
  var sandbox;

  beforeEach(module('frontend'));

  beforeEach(inject(function($injector) {
    scope = $injector.get('$rootScope');
    timeout = $injector.get('$timeout');
    localStorage = $injector.get('$localStorage');
    MessageService = $injector.get('MessageService');
    MessageModel = $injector.get('MessageModel');
    _messages = [];
    sandbox = sinon.sandbox.create();

    ChatController = function() {
      return $injector.get('$controller')('ChatController', {
        $scope: scope,
        $timeout: timeout,
        $localStorage: localStorage,
        MessageService: MessageService,
        MessageModel: MessageModel,
        _messages: _messages
      });
    };
  }));

  afterEach(function() {
    sandbox.restore();
  });

  it('should have specified defaults', function() {
    ChatController();

    expect(scope.messages).to.be.an('array');
    expect(scope.nick).equal('');
    expect(scope.message.nick).equal('');
    expect(scope.message.message).equal('');
  });

  describe('When entering chat', function() {
    it('with nick', function() {
      ChatController();

      scope.nick = 'test nick';
      scope.enterToChat();

      expect(scope.message.nick).equal('test nick');
    });

    it('without nick', function() {
      ChatController();

      sandbox.stub(MessageService, 'error');

      scope.nick = '';
      scope.enterToChat();

      expect(MessageService.error.calledOnce).to.equal(true);
    });
  });
});
