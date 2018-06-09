import './styles/application.css';
import 'bootstrap';
import 'font-awesome-webpack';
import router from './MVC/controller/appRouter';

document.addEventListener('DOMContentLoaded', () => {
  new router();
  Backbone.history.start({
    pushState: true,
    root: '/'
  })
});
