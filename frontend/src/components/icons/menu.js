import { lucid } from "../../libs/lucid";

export const Component_Icon_Menu = lucid.component({
  attributes: function () {
    return { class: "", onclick: function (ev) { } }
  },
  methods: {
    onclick: function (ev) {
      this.attributes.onclick && this.attributes.onclick(ev);
    }
  },
  render: function () {
    return `
      <svg class="{{attributes.class}}" onclick="{{methods.onclick}}" width="32" height="32" viewBox="0 0 24 24" stroke-width="1" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
       <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
       <line x1="4" y1="6" x2="20" y2="6" />
       <line x1="4" y1="12" x2="20" y2="12" />
       <line x1="4" y1="18" x2="20" y2="18" />
      </svg>
    `;
  },
  watch: {
    class: function (oldClass, newClass) {
      this.setState();
    }
  }
});