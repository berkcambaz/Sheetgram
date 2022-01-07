import { lucid } from "../../libs/lucid";

export const Component_Icon_Bookmarks = lucid.component({
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
      <svg class="{{attributes.class}}" onclick="{{methods.onclick}}" width="32" height="32" viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M13 7a2 2 0 0 1 2 2v12l-5 -3l-5 3v-12a2 2 0 0 1 2 -2h6z" />
        <path d="M9.265 4a2 2 0 0 1 1.735 -1h6a2 2 0 0 1 2 2v12l-1 -.6" />
      </svg>
    `;
  },
  watch: {
    class: function (oldClass, newClass) {
      this.setState();
    }
  }
});