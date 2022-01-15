import { lucid } from "../../../libs/lucid";

import { COMPONENT_ICON } from "../../common/icon_factory";

import { storePost, POST_GETTERS } from "../../../stores/store_post";
import { storeUser, USER_GETTERS } from "../../../stores/store_user";

import { fullDate, monthYearDate } from "../../../core/date_utility";
import { clampNumber } from "../../../core/utility";

export const Component_User = lucid.component({
  attributes: function () { return { user: undefined } },
  methods: {
    getLongDate: function () {
      return fullDate(this.attributes.user.date);
    },
    getShortDate: function () {
      return monthYearDate(this.attributes.user.date);
    },
    getFollowerCount: function () {
      return clampNumber(this.attributes.user.followers);
    },
    getFollowingCount: function () {
      return clampNumber(this.attributes.user.following);
    }
  },
  render: function () {
    return `
      <div class="user">
        <div class="user__username">{{attributes.user.username}}</div>
        <div class="user__usertag">@{{attributes.user.usertag}}</div>
        <div>{{attributes.user.bio}}</div>
        <div class="user__date" lucid-ref="date">
          <div title="{{methods.getLongDate}}">{{methods.getShortDate}}</div>
        </div>
        <div>
          <div class="user__followers" title="{{attributes.user.followers}} followers">Followers {{methods.getFollowerCount}}</div>
          <div class="user__following" title="{{attributes.user.following}} following">Following {{methods.getFollowingCount}}</div>
        </div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      lucid.render(this.refs["date"], COMPONENT_ICON.CALENDAR, 0, undefined, { first: true });
    }
  }
});