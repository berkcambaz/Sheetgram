import { lucid } from "./libs/lucid";
import { superpage } from "./libs/superpage";

import "./index.scss";

import { Component_App } from "./components/app";

lucid.render(document.getElementById("app"), Component_App, 0);