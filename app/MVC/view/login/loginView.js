import Marionette from 'backbone.marionette';
import template from './templates/login-template.jst';
import './templates/login.css';
import captain from '../../../img/captain.png';
import config from '../../controller/appConfig';

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
        let nickname = this.$('#nickname-input').val();
        this.$('#helper').html('');
        if (nickname) {
            console.log('yes')
        } else {
            this.$('#helper').html('Enter your username');
        }
    }
})