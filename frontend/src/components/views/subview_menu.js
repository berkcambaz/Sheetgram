import { lucid } from "../../libs/lucid";

export const Component_SubView_Menu = lucid.component({
  attributes: function () { return { class: "" } },
  methods: {
    transitionend: function () {
      if (this.attributes.class === "transition__slide--left") lucid.remove(this.id, this.key);
    }
  },
  render: function () {
    return `<div class="menu transition__slide {{attributes.class}}" ontransitionend="{{methods.transitionend}}"></div>`;
  },
  hooks: {
    connected: function () {
      //this.refs["container"].addEventListener("transitionend", (ev) => {
      //  if (this.attributes.class === "menu__slide--left") lucid.remove(this.id, this.key);
      //})

      setTimeout(() => {
        this.attributes.class = "transition__slide--right";
        this.setState();
      }, 1);
    }
  },
  watch: {
    class: function (oldClass, newClass) {
      switch (oldClass) {
        case "transition__slide--right": this.attributes.class = "transition__slide--left"; break;
        case "transition__slide--left": this.attributes.class = "transition__slide--right"; break;
      }
      this.setState();
    }
  }
});