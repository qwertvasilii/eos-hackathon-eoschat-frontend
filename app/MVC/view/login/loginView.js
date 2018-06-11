import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import template from './templates/login-template.jst';
import './templates/login.css';
import captain from '../../../img/captain.png';
import config from '../../controller/appConfig';
import workshop from '../../controller/appWorkshop';

export default Marionette.View.extend({
    template: template,
    className: 'container',
    attributes: {
        id: 'login-form'
    },
    templateContext: {
        captain: captain,
        platformName: config.platformName
    },
    events: {
        'click #login-btn' : 'login',
        'keyup #nickname-input': 'keyup'
    },
    keyup: function(e){
        if (e.keyCode === 13) this.login()
    },
    login: function(){
        let self = this;
        let nickname = this.$('#nickname-input').val();
        this.$('#helper').html('');
        if (nickname) {
            this.$('#login-btn').addClass('disabled').html('Sign in <i class="fa fa-spinner fa-pulse"></i>')
            setTimeout(() => { //bycicle to prevent eosjs to freeze screen
                workshop.signUp(nickname).then(result => {
                    if (!result.success) throw 'Invalid name or this nickname already exists';
                    return workshop.contractSignUp();
                }).then(() => {
                    Backbone.history.navigate('/', {trigger: true});
                }).catch(err => {
                    self.$('#login-btn').removeClass('disabled').html('Sign in')
                    self.$('#helper').html(err);
                })
            }, 100);
        } else {
            this.$('#helper').html('Enter your username');
        }
    }
})