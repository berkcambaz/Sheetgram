import { lucid } from "../../libs/lucid";

import { Component_Icon_X } from "../icons/icon_x";
import { Component_Icon_Send } from "../icons/icon_send";

import { storePost, POST_ACTS } from "../../stores/store_post";

import { detectClick } from "../../core/utility";

export const Component_SubView_PostCreate = lucid.component({
  attributes: function () { return { limit: 256 } },
  state: function () { return { removeListener: undefined, length: 0 } },
  methods: {
    getTextLength: function () {
      return this.state.length + "/" + this.attributes.limit;
    },
    oninput: function () {
      const element = this.refs["input"];
      element.style.height = "0px";
      element.style.height = element.scrollHeight + "px";
      element.value = element.value.substr(0, this.attributes.limit);
      this.setState({ length: element.value.length });
    },
    post: function () {
      const element = this.refs["input"];

      // If text is empty, don't do anything
      if (element.value.length === 0) return;

      // Commit to the store with the content of the post
      storePost.commit(POST_ACTS.POST_POST, element.value);

      element.value = "";
      this.methods.oninput();
    },
    cancel: function () {
      this.state.removeListener();
      lucid.remove(Component_SubView_PostCreate, this.key);
    }
  },
  render: function () {
    return `
      <div>
        <div class="effect--blur"></div>
        <div class="post-create" lucid-ref="post-create">
          <div class="post-create__container" lucid-ref="container">
            <textarea 
              class="post-create__input" 
              lucid-ref="input" 
              oninput="{{methods.oninput}}"
              placeholder="What's on your mind?">
            </textarea>
            <div class="post-create__bottom" lucid-ref="bottom">
              <div class="post-create__text-length">{{methods.getTextLength}}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      this.methods.oninput();

      lucid.render(this.refs["container"], Component_Icon_X, this.key, {
        class: "post-create__icon top",
        onclick: () => { this.methods.cancel() }
      }, { first: true });

      lucid.render(this.refs["bottom"], Component_Icon_Send, this.key, {
        class: "post-create__icon bottom",
        onclick: () => { this.methods.post() }
      }, { first: true });

      setTimeout(() => {
        this.state.removeListener = detectClick(this.refs["post-create"],
          (ev) => {

          },
          (ev) => { this.methods.cancel() }
        );
      }, 1);
    }
  }
});