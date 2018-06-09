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
        'click #login-btn' : 'login'
    },
    login: function(){
        let self = this;
        let nickname = this.$('#nickname-input').val();
        this.$('#helper').html('');
        if (nickname) {
            workshop.signUp(nickname).then(result => {
                if (result.success) Backbone.history.navigate('/', {trigger: true});
                else self.$('#helper').html('Error occures');
            })
        } else {
            this.$('#helper').html('Enter your username');
        }
    }
})