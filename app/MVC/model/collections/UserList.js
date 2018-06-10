import Backbone from 'backbone';
import User from '../models/User';
import eosController from '../../controller/appEosController';

export default Backbone.Collection.extend({
    model: User,
})