import { lucid } from "../../libs/lucid";

export const Component_Icon_User = lucid.component({
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
        <circle cx="12" cy="7" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      </svg>
    `;
  },
  watch: {
    class: function (oldClass, newClass) {
      this.setState();
    }
  }
});