import { Input,Aside, Avatar, Button,Container, Footer, Header, Main,Upload } from 'element-ui';

const element = {
    install: function (Vue) {
      Vue.use(Button);
      Vue.use(Container);
      Vue.use(Header);
      Vue.use(Aside);
      Vue.use(Main);
      Vue.use(Footer);
      Vue.use(Upload)
      Vue.use(Avatar);
      Vue.use(Input);
    }
  }

export default element;
