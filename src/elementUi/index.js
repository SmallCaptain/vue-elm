import { Aside, Button,Container, Footer, Header, Main } from 'element-ui';

const element = {
    install: function (Vue) {
      Vue.use(Button);
      Vue.use(Container);
      Vue.use(Header);
      Vue.use(Aside);
      Vue.use(Main);
      Vue.use(Footer);
    }
  }

export default element;
