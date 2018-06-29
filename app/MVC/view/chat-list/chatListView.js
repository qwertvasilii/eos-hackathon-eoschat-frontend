import Marionette from 'backbone.marionette';
import ChatView from './chatView';
import config from '../../controller/appConfig';
import workshop from '../../controller/appWorkshop';

export default Marionette.CollectionView.extend({
    childView: ChatView,
    className: 'container col-md-9',
    attributes: {
        id: 'chat-box'
    },
    initialize: function(){
        this.collection.on('add', this.added, this);
    },
    added: function(){
        if (this.waitingHandshake) {
            let self = this;
            let state = JSON.parse(localStorage.getItem(config.localStorageChatKeysPrefix + localStorage.getItem('selected-chat-user')));
            if (state && !state.sessionKey) {
                workshop.checkKeys(this.getOption('user')).then(function() {
                    self.waitingHandshake = false;
                    self.$el.html('');
                    self.render();
                })
            }
        }
        
    },
    onChildviewChatScroll: function(){
        this.scroll();
    },
    scroll: function(){
        this.$el.scrollTop(this.$el.prop('scrollHeight'))
    },
    onRender: function(){
        this.scroll();
        let state = JSON.parse(localStorage.getItem(config.localStorageChatKeysPrefix + localStorage.getItem('selected-chat-user')));
        if (state) {
            if (state.sessionKey) {
                this.trigger('unblock');
            } else {
                this.waitingHandshake = true;
                this.$el.html('Waiting for handshake');
                this.trigger('block')
            }
        }
    },
    onAttach: function(){
        $('#tool').css('display','flex');
        this.$el.animate({
            scrollTop: this.$el.prop('scrollHeight')
        }, 700)
    }
})